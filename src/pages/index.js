import Link from 'next/link';
import Bio from '../components/Bio';

import Layout from '../components/Layout';
import { getPosts } from '../lib/api';

export default function Home({ allPosts }) {
  return (
    <Layout pageTitle='Home' description='Personal Code  Blog By Uchechukwu'>
      <Bio />
      {allPosts.map((post) => {
        return (
          <article key={post.title} className='mb-16'>
            <header>
              <h3 className='font-heads font-black text-2xl leading-7 dark:text-tomato'>
                <Link href={`/posts/${post.slug}`}>
                  <a>{post.title}</a>
                </Link>
              </h3>
              <small className='dark:text-mgrey'>{post.date}</small>

            </header>
            <p className='font-body dark:text-mgrey'>{post.excerpt}</p>
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
