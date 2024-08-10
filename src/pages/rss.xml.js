import { getAllPosts } from "@/lib/post";
import rss from "@astrojs/rss";
import sanitizeHtml from "sanitize-html";
import MarkdownIt from "markdown-it";
const parser = new MarkdownIt();

export async function GET(context) {
  const posts = await getAllPosts();

  return rss({
    title: "Today I Learned | kmkkiii",
    description: "その日学んだことの記録",
    site: context.site,
    items: posts.map((post) => ({
      title: post.title,
      link: `/til/${post.slug}`,
      pubDate: new Date(post.date),
      description: post.tags.join(", "),
      content: sanitizeHtml(parser.render(post.body)),
    })),
    stylesheet: "/til/rss/pretty-feed-v3.xsl",
  });
}
