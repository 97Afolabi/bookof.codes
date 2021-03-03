import fs from 'fs';
import { join } from 'path';
import matter from 'gray-matter';
import remark from 'remark';
import html from 'remark-html';
import TimeAgo from 'javascript-time-ago';

// English.
import en from 'javascript-time-ago/locale/en';

TimeAgo.addDefaultLocale(en);

// Create formatter (English).
const timeAgo = new TimeAgo('en-US');

const postsDirectory = join(process.cwd(), '_posts');

export function getPostSlugs() {
  return fs.readdirSync(postsDirectory);
}

export function getPostBySlug(slug, fields = []) {
  const realSlug = slug.replace(/\.md$/, '');
  const fullPath = join(postsDirectory, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  const items = {};

  // Ensure only the minimal needed data is exposed
  fields.forEach((field) => {
    if (field === 'slug') {
      items[field] = realSlug;
    }
    if (field === 'content') {
      items[field] = content;
    }

    if (data[field]) {
      items[field] = data[field];
    }
  });

  return items;
}

export function getAllPosts(fields = []) {
  const slugs = getPostSlugs();
  const posts = slugs
    .map((slug) => getPostBySlug(slug, fields))
    // sort posts by date in descending order
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1))
    // transform date object to 'Time ago' format
    .map((post) => {
      post.date = timeAgo.format(new Date(post.date));
      return post;
    });
  return posts;
}

export default async function markdownToHtml(markdown) {
  const result = await remark().use(html).process(markdown);
  return result.toString();
}
