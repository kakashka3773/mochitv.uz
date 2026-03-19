import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "")
}

function generateSiteMap(animes = []) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">

<url>
<loc>https://www.mochitv.uz</loc>
</url>

${animes.map(({ title }) => `
<url>
<loc>https://www.mochitv.uz/anime/${slugify(title)}</loc>
</url>
`).join("")}

</urlset>`
}

export async function getServerSideProps({ res }) {

  const { data } = await supabase
    .from('anime_cards')
    .select('title')

  const sitemap = generateSiteMap(data || [])

  res.setHeader('Content-Type', 'text/xml')
  res.write(sitemap)
  res.end()

  return { props: {} }
}

export default function SiteMap() {
  return null
}