import Head from 'next/head';
import Link from 'next/link';
import { getAllPosts } from '../lib/api';
import Image from 'next/image';
import styles from './index.module.css';

export default function Home({ allPosts }) {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Head>
          <title>My page title</title>
          <meta
            name='viewport'
            content='initial-scale=1.0, width=device-width'
          />
        </Head>

        <nav className={styles.nav}>
          <Image
            src='/logolight.svg'
            alt='Picture of the author'
            width={200}
            height={100}
          />
        </nav>
      </header>

      <main>
        <section className={styles.posts}>
          <ul className={styles.sessions}>
            {allPosts &&
              allPosts.map((post) => {
                return (
                  <li className={styles.post} key={post.slug}>
                    <div className={styles.time}>{post.date}</div>
                    <Link href='#'>
                      <a className={styles.title}>{post.title}</a>
                    </Link>
                  </li>
                );
              })}
          </ul>
        </section>
      </main>

      <footer></footer>
    </div>
  );
}

export async function getStaticProps() {
  const allPosts = getAllPosts(['title', 'date', 'slug']);

  return {
    props: { allPosts },
  };
}
