import Link from 'next/link';

import Layout from '../components/Layout';
import { getPosts } from '../lib/api';

export default function Home({ allPosts }) {
  return (
    <Layout pageTitle='bookof.codes' description='Personal Blog By Uche'>
      {allPosts.map((post) => {
        return (
          <article key={post.title} class='mb-16'>
            <header>
              <h3 class='font-heads font-black text-2xl leading-7 dark:text-tomato'>
                <Link href={`/posts/${post.slug}`}>
                  <a>{post.title}</a>
                </Link>
              </h3>
              <small class='dark:text-mgrey'>{post.date}</small>
            </header>
            <p class='font-body dark:text-mgrey'>{post.excerpt}</p>
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
