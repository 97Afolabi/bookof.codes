import Link from 'next/link';
import { getPosts } from '../lib/api';

export default function Home({ allPosts }) {
  console.log(allPosts);
  return (
    <div className='container'>
      <header className='main-header'>
        <Link href='/'>
          <a>
            <h1>bookofcodes</h1>
          </a>
        </Link>
      </header>

      <aside className='intro-card'>
        <div className='bio-card'>
          <p>
            Personal code book by
            <Link href='https://twitter.com/cybernuel'>
              <a>Uchechukwu Noel.</a>
            </Link>
          </p>
        </div>
      </aside>

      <main>
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
              </header>
              <p>What i learnt from working with go.</p>
            </article>
          );
        })}
      </main>
      <footer>
        <Link href='/'>
          <a>github</a>
        </Link>

        <Link href='/'>
          <a>twitter</a>
        </Link>

        <Link href='/'>
          <a>rss</a>
        </Link>
      </footer>
    </div>
  );
}

export async function getStaticProps() {
  const posts = await getPosts();

  return {
    props: { allPosts: [...posts] },
  };
}
