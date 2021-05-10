import Link from 'next/link';

import Layout from '../components/Layout';
import { getPosts } from '../lib/api';

export default function Home({ allPosts }) {
  return (
    <Layout pageTitle='bookof.codes' description='Personal Blog By Uche'>
      <div class='flex mb-14 items-center border p-1 rounded-md'>
        <img src='/avatar.jpg' class='rounded-full h-14 w-14 mr-3.5' />
        <p class='text-sm font-body leading-5 dark:text-mgrey'>
          Hey 👋🏼, Welcome to my personal code blog. <br />
          Here i write about things i learn and work with everyday.
        </p>
      </div>
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
