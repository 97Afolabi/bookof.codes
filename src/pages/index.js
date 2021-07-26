import Link from 'next/link';
import Bio from '../components/Bio';

import Layout from '../components/Layout';
import { getPosts } from '../lib/api';

export default function Home({ allPosts }) {
  return (
    <div className='container'>
      <header>
        <h1>bookof.codes</h1>
        <nav>
          <Link href='/'>
            <a>github</a>
          </Link>
          <Link href='/'>
            <a>twitter</a>
          </Link>
          <Link href='/'>
            <a>rss</a>
          </Link>
        </nav>
      </header>
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
          <article>
            <div id='date-tag'>20-20-29</div>
            <div id='post-card'>
              <Link href='/'>
                <a>Serving Static Files in golang</a>
              </Link>

              <p>How to serve static files in go web servers.</p>
            </div>
          </article>

          <article>
            <div id='date-tag'>20-20-29</div>
            <div id='post-card'>
              <h2>Serving Static Files in golang </h2>
              <p>How to serve static files in go web servers.</p>
            </div>
          </article>

          <article>
            <div id='date-tag'>20-20-29</div>
            <div id='post-card'>
              <h2>Serving Static Files in golang </h2>
              <p>How to serve static files in go web servers.</p>
            </div>
          </article>

          <article>
            <div id='date-tag'>18, July 2020</div>
            <div id='post-card'>
              <h2>Serving Static Files in golang </h2>
              <p>How to serve static files in go web servers.</p>
            </div>
          </article>
        </section>
      </main>
    </div>
  );
}

export async function getStaticProps() {
  const posts = await getPosts();

  return {
    props: { allPosts: [...posts] },
  };
}
