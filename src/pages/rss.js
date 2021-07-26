import { getPosts } from '../lib/api';
import { getRss } from '../lib/rss';

export default function Rss() {
  return <div></div>;
}

export async function getServerSideProps(context) {
  const res = context.res;
  if (!res) {
    return;
  }

  const posts = await getPosts();
  const blogFeed = getRss(posts);
  res.setHeader('Content-Type', 'text/xml');
  res.write(blogFeed);
  res.end();
  return {
    props: {},
  };
}
