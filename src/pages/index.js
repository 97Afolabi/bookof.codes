import Link from 'next/link';

import Layout from '../components/Layout';
import { getPosts } from '../lib/api';

export default function Home({ allPosts }) {
  return (
    <Layout pageTitle='bookof.codes' description='Personal Blog By Uche'>
      {allPosts.map((post) => {
        return (
          <article key={post.title}>
            <header>
              <Link href={`/posts/${post.slug}`}>
                <a>{post.title}</a>
              </Link>

              <small>{post.date}</small>
              <p>What i learnt from working with go.</p>
            </header>
          </article>
        );
      })}
    </Layout>
  );
}

export async function getStaticProps() {
  const posts = await getPosts();

  return {
    props: { allPosts: [...posts] },
  };
}
