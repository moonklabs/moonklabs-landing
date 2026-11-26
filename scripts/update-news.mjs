// Refreshes src/content/news.json from the 장사왕 blog RSS feed.
// Runs before every build. If the feed cannot be read or looks wrong, the
// committed snapshot is kept so a feed outage never breaks a deploy.
import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const FEED_URL = "https://www.sellerking.io/blog/rss";
const OUTPUT_PATH = fileURLToPath(new URL("../src/content/news.json", import.meta.url));
const MAX_POSTS = 6;
const FETCH_TIMEOUT_MS = 10_000;
const ALLOWED_LINK_PREFIX = "https://www.sellerking.io/blog/";
const ALLOWED_IMAGE_PREFIX = "https://image.inblog.dev";

const ENTITIES = { "&amp;": "&", "&lt;": "<", "&gt;": ">", "&quot;": '"', "&#39;": "'", "&apos;": "'" };

function decode(text) {
  return text
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/&(amp|lt|gt|quot|#39|apos);/g, (entity) => ENTITIES[entity])
    .replace(/\s+/g, " ")
    .trim();
}

function readTag(block, tag) {
  const match = block.match(new RegExp(`<${tag}>([\\s\\S]*?)</${tag}>`));
  return match ? decode(match[1]) : "";
}

function parseItem(block) {
  const title = readTag(block, "title");
  const link = readTag(block, "link");
  const published = new Date(readTag(block, "pubDate"));
  const image = decode(block.match(/<enclosure[^>]*\burl="([^"]+)"/)?.[1] ?? "");

  if (!title || !link.startsWith(ALLOWED_LINK_PREFIX) || Number.isNaN(published.getTime())) return null;
  return {
    title,
    summary: readTag(block, "description"),
    url: encodeURI(link),
    category: readTag(block, "category"),
    publishedAt: published.toISOString(),
    image: image.startsWith(ALLOWED_IMAGE_PREFIX) ? image : null,
  };
}

async function fetchPosts() {
  const response = await fetch(FEED_URL, { signal: AbortSignal.timeout(FETCH_TIMEOUT_MS) });
  if (!response.ok) throw new Error(`feed responded with ${response.status}`);
  const xml = await response.text();
  const posts = [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)]
    .map((match) => parseItem(match[1]))
    .filter((post) => post !== null)
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
    .slice(0, MAX_POSTS);
  if (posts.length === 0) throw new Error("feed contained no usable posts");
  return posts;
}

async function readSnapshot() {
  try {
    return JSON.parse(await readFile(OUTPUT_PATH, "utf8"));
  } catch {
    return null;
  }
}

try {
  const posts = await fetchPosts();
  const snapshot = await readSnapshot();
  if (JSON.stringify(snapshot?.posts) === JSON.stringify(posts)) {
    console.warn(`[news] up to date (${posts.length} posts)`);
  } else {
    await writeFile(OUTPUT_PATH, `${JSON.stringify({ source: FEED_URL, posts }, null, 2)}\n`);
    console.warn(`[news] wrote ${posts.length} posts`);
  }
} catch (error) {
  const reason = error instanceof Error ? error.message : String(error);
  const snapshot = await readSnapshot();
  if (!snapshot) {
    console.error(`[news] feed unavailable (${reason}) and no snapshot exists`);
    process.exit(1);
  }
  console.warn(`[news] feed unavailable (${reason}); keeping the existing snapshot`);
}
