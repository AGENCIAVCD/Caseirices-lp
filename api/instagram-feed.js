const DEFAULT_USERNAME = 'caseiricesjundiai'
const DEFAULT_LIMIT = 9

function toPositiveInt(value, fallback) {
  const parsed = Number.parseInt(value, 10)
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback
}

export default async function handler(req, res) {
  const username = (req.query.username || DEFAULT_USERNAME).toString().trim()
  const limit = Math.min(toPositiveInt(req.query.limit, DEFAULT_LIMIT), 12)

  try {
    const response = await fetch(
      `https://www.instagram.com/api/v1/users/web_profile_info/?username=${encodeURIComponent(username)}`,
      {
        headers: {
          'x-ig-app-id': '936619743392459',
          'x-requested-with': 'XMLHttpRequest',
          'user-agent':
            'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
          accept: 'application/json',
          origin: 'https://www.instagram.com',
          referer: `https://www.instagram.com/${username}/`,
          'sec-fetch-site': 'same-origin',
          'sec-fetch-mode': 'cors',
          'sec-fetch-dest': 'empty',
        },
      },
    )

    if (!response.ok) {
      return res.status(response.status).json({
        ok: false,
        message: `Instagram retornou status ${response.status}`,
      })
    }

    const payload = await response.json()
    const edges = payload?.data?.user?.edge_owner_to_timeline_media?.edges ?? []

    const items = edges.slice(0, limit).map(({ node }) => ({
      id: node.id,
      image: node.thumbnail_src || node.display_url,
      permalink: `https://www.instagram.com/p/${node.shortcode}/`,
      isVideo: Boolean(node.is_video),
      caption: node?.edge_media_to_caption?.edges?.[0]?.node?.text ?? '',
    }))

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
