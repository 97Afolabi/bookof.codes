const RSS = require('rss');

export const getRss = (posts) => {
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

  posts.forEach(({ date, title, excerpt, slug }) => {
    feed.item({
      title,
      description: excerpt,
      url: `https://bookof.codes/posts/${slug}`,
      author: 'uchenoel',
      date,
    });
  });

  return feed.xml();
};
