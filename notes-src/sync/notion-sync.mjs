// Download the Robotics notes from Notion into the same flat layout as Notion's
// "Markdown & CSV" export, so convert.py can turn either one into Quartz content.
//
// Usage: NOTION_TOKEN=... node notion-sync.mjs <root-page-id> <out-folder>
//
// Output: "<Title> <id>.md" per page (child pages linked as "[Title](<Title> <id>.md)"),
// downloaded images next to them, and _meta.json with each page's dates.
import { Client } from "@notionhq/client"
import { NotionToMarkdown } from "notion-to-md"
import fs from "node:fs/promises"
import path from "node:path"

const [rootArg, outDir] = process.argv.slice(2)
if (!process.env.NOTION_TOKEN || !rootArg || !outDir) {
  console.error("usage: NOTION_TOKEN=... node notion-sync.mjs <root-page-id> <out-folder>")
  process.exit(1)
}

const notion = new Client({ auth: process.env.NOTION_TOKEN, baseUrl: process.env.NOTION_BASE_URL })
// parseChildPages must stay on: with it off, notion-to-md drops child_page blocks before our transformer sees them
const n2m = new NotionToMarkdown({ notionClient: notion })

const plainId = (id) => id.replace(/-/g, "")
const queue = [plainId(rootArg)]
const seen = new Set()
const titles = new Map()
const meta = { root: plainId(rootArg), pages: {} }

// Notion export file names: title with path-unsafe characters removed, max 50 characters
const fileTitle = (title) => title.replace(/[\\/:*?"<>|#^\[\]\n]/g, "").trim().slice(0, 50).trim() || "Untitled"
const fileName = (id) => `${fileTitle(titles.get(id) ?? "Untitled")} ${id}.md`
const mdLink = (id) => `[${titles.get(id) ?? "Untitled"}](${encodeURI(fileName(id))})`

async function pageTitle(id) {
  if (titles.has(id)) return titles.get(id)
  const page = await notion.pages.retrieve({ page_id: id })
  const prop = Object.values(page.properties).find((p) => p.type === "title")
  const title = prop?.title.map((t) => t.plain_text).join("") || "Untitled"
  titles.set(id, title)
  meta.pages[id] = { created: page.created_time, modified: page.last_edited_time }
  return title
}

async function enqueue(id) {
  id = plainId(id)
  await pageTitle(id)
  if (!seen.has(id) && !queue.includes(id)) queue.push(id)
  return mdLink(id)
}

async function download(url, name) {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`image download failed (${res.status}): ${name}`)
  await fs.writeFile(path.join(outDir, name), Buffer.from(await res.arrayBuffer()))
}

n2m.setCustomTransformer("child_page", async (block) => enqueue(block.id))

n2m.setCustomTransformer("link_to_page", async (block) => {
  const target = block.link_to_page
  return target.type === "page_id" ? enqueue(target.page_id) : false
})

n2m.setCustomTransformer("child_database", async (block) => {
  const links = []
  let cursor
  do {
    const res = await notion.databases.query({ database_id: block.id, start_cursor: cursor })
    for (const row of res.results) links.push(await enqueue(row.id))
    cursor = res.has_more ? res.next_cursor : undefined
  } while (cursor)
  return links.join("\n\n")
})

n2m.setCustomTransformer("image", async (block) => {
  const img = block.image
  const url = img.type === "external" ? img.external.url : img.file.url
  const ext = (new URL(url).pathname.match(/\.(png|jpe?g|gif|webp|svg)$/i) || [".png"])[0].toLowerCase()
  // Notion file URLs expire after about an hour, so keep a local copy named after the block
  const name = `image-${plainId(block.id)}${ext}`
  await download(url, name)
  const caption = img.caption.map((t) => t.plain_text).join("")
  return `![${caption}](${name})`
})

for (const type of ["pdf", "file"]) {
  n2m.setCustomTransformer(type, async (block) => {
    const f = block[type]
    const name = f.name || decodeURIComponent(path.basename(new URL(f.type === "external" ? f.external.url : f.file.url).pathname))
    return `[${name}](${encodeURI(name.endsWith(".pdf") ? name : name + ".pdf")})`
  })
}

await fs.rm(outDir, { recursive: true, force: true })
await fs.mkdir(outDir, { recursive: true })
await pageTitle(queue[0])

while (queue.length) {
  const id = queue.shift()
  if (seen.has(id)) continue
  seen.add(id)
  const blocks = await n2m.pageToMarkdown(id)
  // toMarkdownString() treats child_page entries as nested pages and drops their text, so render our links as paragraphs
  const flatten = (list) => list.forEach((b) => {
    if (b.type === "child_page") Object.assign(b, { type: "paragraph", children: [] })
    else flatten(b.children)
  })
  flatten(blocks)
  let body = n2m.toMarkdownString(blocks).parent ?? ""
  // inline @-mentions of other pages come out as notion.so links; point them at the local file
  for (const m of body.matchAll(/\]\((https:\/\/(?:www\.)?notion\.so\/[^)]*?([0-9a-f]{32}))\)/g)) {
    try {
      const link = await enqueue(m[2])
      body = body.replace(m[1], link.slice(link.indexOf("](") + 2, -1))
    } catch {
      // a mentioned page outside the shared tree stays a notion.so link
    }
  }
  await fs.writeFile(path.join(outDir, fileName(id)), `# ${titles.get(id)}\n\n${body}\n`)
  console.log(`saved ${titles.get(id)}`)
}

await fs.writeFile(path.join(outDir, "_meta.json"), JSON.stringify(meta, null, 2))
console.log(`done: ${seen.size} pages`)
