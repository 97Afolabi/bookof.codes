import remark from 'remark';
import html from 'remark-html';
import { join } from 'path';
import fs from 'fs';
import matter from 'gray-matter';

const postsDirectory = join(process.cwd(), '_posts');

export async function markdownToHtml(markdown) {
  const result = await remark().use(html).process(markdown);
  return result.toString();
}

// Fetch the title , excerpt and date for home page
export async function getPosts() {
  const slugs = fs.readdirSync(postsDirectory);
  const posts = slugs.map((slug) => {
    const actualSlug = slug.replace(/\.md$/, '');
    const slugPath = join(postsDirectory, slug);
    const raw = fs.readFileSync(slugPath, 'utf-8');
    const { data } = matter(raw);
    data['slug'] = actualSlug;
    return data;
  });

  return posts;
}

// Get post by [slug] param
export async function getPostBySlug(slug) {
  // const realSlug = slug.replace(/\.md$/, '')
  const postPath = join(postsDirectory, `${slug}.md`);
  const fileContent = fs.readFileSync(postPath, 'utf-8');
  const { data, content } = matter(fileContent);
  const htmlContent = await markdownToHtml(content);
  return { ...data, content: htmlContent };
}
// posts.forEach((post) => {
//   let d = new Date(post.date);
//   let args = { day: 'numeric', month: 'long', year: 'numeric' };
//   post.date = d.toLocaleDateString(undefined, args);
// });

// Get all available post slugs for getStaticPath
export async function getAllSlugs() {
  const rawSlugs = fs.readdirSync(postsDirectory);
  const slugs = rawSlugs.map((slug) => {
    const s = slug.replace(/\.md$/, '');
    return s;
  });

  return slugs;
}
