const RSS = require('rss');
const { join } = require('path');
const fs = require('fs');
const matter = require('gray-matter');

const postsDirectory = join(process.cwd(), '_posts');

const getPosts = (shallow = false) => {
  const slugs = fs.readdirSync(postsDirectory);
  const posts = slugs.map((slug) => {
    const actualSlug = slug.replace(/\.md$/, '');
    const slugPath = join(postsDirectory, slug);
    const raw = fs.readFileSync(slugPath, 'utf-8');
    const { data } = matter(raw);
    data['slug'] = actualSlug;

    if (shallow) {
      return { title: data.title, slug: actualSlug };
    }

    return data;
  });

  return posts;
};

const genRss = () => {
  const feed = new RSS({
    title: `Uchechukwu's blog feeds`,
    description: 'A collection of "How To".',
    feed_url: `https://bookof.codes/rss`,
    site_url: `https://bookof.codes`,
    managingEditor: 'Uche Noel',
    webMaster: 'Uche Noel',
    copyright: `2020 bookof.codes`,
    language: 'en',
    pubDate: new Date().toLocaleString(),
    ttl: '60',
  });
  const posts = getPosts();

  posts.forEach(({ date, title, excerpt, slug }) => {
    feed.item({
      title,
      description: excerpt,
      url: `https://bookof.codes/posts/${slug}`,
      author: 'uchenoel',
      date,
    });
  });

  const rss = feed.xml({ indent: true });
  fs.writeFileSync('./public/rss.xml', rss);
};

genRss();
