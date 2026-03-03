const DEFAULT_USERNAME = 'caseiricesjundiai'
const DEFAULT_LIMIT = 9

function toPositiveInt(value, fallback) {
  const parsed = Number.parseInt(value, 10)
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback
}

export default async function handler(req, res) {
  const username = (req.query.username || DEFAULT_USERNAME).toString().trim()
  const limit = Math.min(toPositiveInt(req.query.limit, DEFAULT_LIMIT), 12)

  function parseEmbedFeed(html, maxItems) {
    const normalized = html
      .replace(/\\u0026/g, '&')
      .replace(/\\\//g, '/')
      .replace(/\\\\u0025/g, '%')

    const regex =
      /"node":\{"id":"([^"]+)".*?"thumbnail_src":"([^"]+)".*?"shortcode":"([^"]+)".*?"is_video":(true|false)/g
    const items = []
    let match

    while ((match = regex.exec(normalized)) !== null && items.length < maxItems) {
      const [, id, image, shortcode, isVideo] = match
      items.push({
        id,
        image,
        permalink: `https://www.instagram.com/p/${shortcode}/`,
        isVideo: isVideo === 'true',
      })
    }

    return items
  }

  try {
    const response = await fetch(`https://www.instagram.com/${encodeURIComponent(username)}/embed`, {
      headers: {
        'user-agent':
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
        accept: 'text/html,application/xhtml+xml',
      },
    })

    if (!response.ok) {
      return res.status(response.status).json({
        ok: false,
        message: `Instagram embed retornou status ${response.status}`,
      })
    }

    const html = await response.text()
    const items = parseEmbedFeed(html, limit)

    if (!items.length) {
      return res.status(502).json({
        ok: false,
        message: 'Nao foi possivel extrair posts do embed do Instagram',
      })
    }

    return res.status(200).json({
      ok: true,
      username,
      items,
      fetchedAt: new Date().toISOString(),
    })
  } catch (error) {
    return res.status(500).json({
      ok: false,
      message: 'Falha ao buscar feed do Instagram',
      error: error instanceof Error ? error.message : 'Erro desconhecido',
    })
  }
}
