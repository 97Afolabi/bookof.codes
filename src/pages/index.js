import Link from 'next/link';
import fs from 'fs';
import { join } from 'path';
import matter from 'gray-matter';

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
                <Link href={'posts/' + post.slug}>
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
  const postsDirectory = join(process.cwd(), '_posts');
  const slugs = fs.readdirSync(postsDirectory);
  const posts = slugs.map((slug) => {
    const slugPath = join(postsDirectory, slug);
    const raw = fs.readFileSync(slugPath, 'utf-8');
    const { data } = matter(raw);
    return data;
  });

  posts.forEach((post) => {
    let d = new Date(post.date);
    let args = { day: 'numeric', month: 'long', year: 'numeric' };
    post.date = d.toLocaleDateString(undefined, args);
  });

  return {
    props: { allPosts: [...posts] },
  };
}
