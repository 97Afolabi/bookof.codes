import Link from 'next/link';
import Layout from '../components/Layout';
import { getPosts } from '../lib/api';

export default function Home({ allPosts }) {
  return (
    <Layout pageTitle='Home' description='A tiny collection of code stuff.'>
      <main>
        <div className='intro'>
          <h1>About</h1>
          <p>
            This site is a collection of things i’ve had to search on google and
            stackoverflow over the course of my career so it’s more like a
            memory cache of “How To”. I hope you find what you need to help you
            figure out whatever it is that lead you here. For any sugestions or
            enquiries you can reach me on
            <Link href='/'>
              <a>twitter</a>
            </Link>
            .
          </p>
        </div>

        <section>
          <h1>Posts</h1>
          {allPosts.map((post) => {
            return (
              <article key={post.title}>
                <div id='date-tag'>{post.date}</div>
                <div id='post-card'>
                  <Link href={`/posts/${post.slug}`}>
                    <a>{post.title}</a>
                  </Link>

                  <p>{post.excerpt}</p>
                </div>
              </article>
            );
          })}
        </section>
      </main>
    </Layout>
  );
}

export async function getStaticProps() {
  const posts = await getPosts();

  return {
    props: { allPosts: [...posts] },
  };
}
