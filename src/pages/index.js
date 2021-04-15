import Link from 'next/link';
import Bio from '../components/Bio';
import Layout from '../components/Layout';
import { getPosts } from '../lib/api';

export default function Home({ allPosts }) {
  return (
    <Layout>
      {allPosts.map((post) => {
        return (
          <article key={post.title}>
            <header>
              <Link href={`posts/${post.slug}`}>
                <a>
                  <h2>{post.title}</h2>
                </a>
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
