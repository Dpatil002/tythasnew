import { config, collection, fields } from "@keystatic/core";

export const CATEGORIES = [
  { label: "AI Search", value: "AI Search" },
  { label: "Websites", value: "Websites" },
  { label: "Founders", value: "Founders" },
  { label: "SEO", value: "SEO" },
  { label: "Ads", value: "Ads" },
  { label: "Design", value: "Design" },
  { label: "Automation", value: "Automation" },
  { label: "Growth", value: "Growth" },
] as const;

/**
 * Blog CMS. Editors open /keystatic on the live site, sign in with GitHub and publish.
 * Every save is committed to the GitHub repo, which redeploys the site.
 */
export default config({
  // GitHub mode turns on once the Keystatic GitHub App env vars are set in Vercel (see README).
  // Until then (and always in local development) posts are read and saved as local files.
  storage:
    process.env.NODE_ENV !== "development" && process.env.NEXT_PUBLIC_KEYSTATIC_GITHUB_APP_SLUG
      ? { kind: "github", repo: { owner: "Dpatil002", name: "tythasnew" } }
      : { kind: "local" },
  ui: {
    brand: { name: "Tythas Blog" },
  },
  collections: {
    posts: collection({
      label: "Blog posts",
      slugField: "title",
      path: "content/posts/*",
      format: { contentField: "content" },
      entryLayout: "content",
      columns: ["title", "date"],
      schema: {
        title: fields.slug({
          name: { label: "Title", validation: { isRequired: true } },
          slug: { label: "URL slug", description: "Becomes tythas.com/blog/<slug>. Keep it short." },
        }),
        excerpt: fields.text({
          label: "Excerpt",
          description: "One or two sentences shown on blog cards and in Google results.",
          multiline: true,
          validation: { isRequired: true, length: { max: 220 } },
        }),
        category: fields.select({ label: "Category", options: [...CATEGORIES], defaultValue: "Growth" }),
        date: fields.date({ label: "Publish date", defaultValue: { kind: "today" }, validation: { isRequired: true } }),
        readMins: fields.integer({ label: "Reading time (minutes)", defaultValue: 5, validation: { min: 1, max: 60 } }),
        cover: fields.image({
          label: "Cover image (optional)",
          description: "1600×700 works best. Leave empty to use the branded gradient cover.",
          directory: "public/images/blog",
          publicPath: "/images/blog/",
        }),
        coverAlt: fields.text({ label: "Cover image description (alt text)" }),
        author: fields.text({ label: "Author", defaultValue: "Tythas team" }),
        seoTitle: fields.text({ label: "SEO title (optional)", description: "Overrides the title in Google. Max ~60 characters." }),
        draft: fields.checkbox({ label: "Draft", description: "Drafts are saved but not shown on the site.", defaultValue: false }),
        content: fields.markdoc({
          label: "Article",
          options: {
            heading: [2, 3],
            image: { directory: "public/images/blog", publicPath: "/images/blog/" },
          },
        }),
      },
    }),
  },
});
