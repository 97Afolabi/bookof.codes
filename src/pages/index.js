import Head from 'next/head';
import Link from 'next/link';
import { getAllPosts } from '../lib/api';
import Image from 'next/image';
import Layout from '../components/Layout';

export default function Home({ allPosts }) {
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
        <article>
          <header>
            <Link href='/'>
              <a>
                <h2>Cuncurrent Go!</h2>
              </a>
            </Link>

            <small>Feb 23, 2021</small>
          </header>
          <p>What i learnt from working with go.</p>
        </article>

        <article>
          <header>
            <Link href='/'>
              <a>
                <h2>Cuncurrent Go! Yes!</h2>
              </a>
            </Link>

            <small>Feb 23, 2021</small>
          </header>
          <p>What i learnt from working with go.</p>
        </article>

        <article>
          <header>
            <Link href='/'>
              <a>
                <h2>Cuncurrent Go! You should try it</h2>
              </a>
            </Link>

            <small>Feb 23, 2021</small>
          </header>
          <p>What i learnt from working with go.</p>
        </article>

        <article>
          <header>
            <Link href='/'>
              <a>
                <h2>Cuncurrent Go! Why not?</h2>
              </a>
            </Link>

            <small>Feb 23, 2021</small>
          </header>
          <p>What i learnt from working with go.</p>
        </article>
      </main>
      <footer>
        <Link href=''>
          <a>github</a>
        </Link>

        <Link href=''>
          <a>twitter</a>
        </Link>

        <Link href=''>
          <a>rss</a>
        </Link>
      </footer>
    </div>
  );
}

export async function getStaticProps() {
  const allPosts = getAllPosts(['title', 'date', 'slug']);

  return {
    props: { allPosts },
  };
}
