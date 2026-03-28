const DEFAULT_USERNAME = 'caseiricesjundiai'
const DEFAULT_LIMIT = 9
const CACHE_CONTROL = 's-maxage=900, stale-while-revalidate=43200'

function toPositiveInt(value, fallback) {
  const parsed = Number.parseInt(value, 10)
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback
}

export default async function handler(req, res) {
  res.setHeader('Cache-Control', CACHE_CONTROL)

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

  async function fetchFromWebProfileInfo() {
    const response = await fetch(
      `https://www.instagram.com/api/v1/users/web_profile_info/?username=${encodeURIComponent(username)}`,
      {
        headers: {
          'user-agent':
            'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
          accept: '*/*',
          'x-ig-app-id': '936619743392459',
          referer: `https://www.instagram.com/${encodeURIComponent(username)}/`,
        },
      },
    )

    if (!response.ok) {
      throw new Error(`web_profile_info status ${response.status}`)
    }

    const payload = await response.json()
    const edges = payload?.data?.user?.edge_owner_to_timeline_media?.edges

    if (!Array.isArray(edges) || edges.length === 0) {
      throw new Error('web_profile_info sem edges')
    }

    return edges.slice(0, limit).map((edge) => {
      const node = edge?.node ?? {}
      const shortcode = node.shortcode
      return {
        id: node.id ?? shortcode,
        image: node.display_url,
        permalink: `https://www.instagram.com/p/${shortcode}/`,
        isVideo: Boolean(node.is_video),
      }
    })
  }

  async function fetchFromEmbedFallback() {
    const response = await fetch(`https://www.instagram.com/${encodeURIComponent(username)}/embed`, {
      headers: {
        'user-agent':
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
        accept: 'text/html,application/xhtml+xml',
      },
    })

    if (!response.ok) {
      throw new Error(`embed status ${response.status}`)
    }

    const html = await response.text()
    const items = parseEmbedFeed(html, limit)
    if (!items.length) throw new Error('embed sem posts')
    return items
  }

  try {
    let items = []
    let source = 'web_profile_info'
    let degraded = false
    let warning = null

    try {
      items = await fetchFromWebProfileInfo()
    } catch (webProfileError) {
      source = 'embed'
      try {
        items = await fetchFromEmbedFallback()
      } catch (embedError) {
        source = 'none'
        degraded = true
        warning =
          embedError instanceof Error
            ? embedError.message
            : webProfileError instanceof Error
              ? webProfileError.message
              : 'instagram-unavailable'
        items = []
      }
    }

    return res.status(200).json({
      ok: true,
      username,
      items,
      source,
      degraded,
      warning,
      fetchedAt: new Date().toISOString(),
    })
  } catch (error) {
    return res.status(200).json({
      ok: true,
      username,
      items: [],
      source: 'none',
      degraded: true,
      warning: error instanceof Error ? error.message : 'Erro desconhecido',
      fetchedAt: new Date().toISOString(),
    })
  }
}
