import dynamic from 'next/dynamic';

import { getAllSlugs, getPostBySlug } from '../../lib/api';
import ReactMarkdown from 'react-markdown';
import Link from 'next/link';
const Layout = dynamic(import('../../components/Layout'));
const CodeBlock = dynamic(import('../../components/CodeBlock'));

export default function Post({ post }) {
  return (
    <Layout pageTitle={post.title} description={post.excerpt}>
      <main className='post'>
        <header id='post-header'>
          <h1 id='post-title'>{post.title}</h1>
          <div id='post-date'>- {post.date}</div>
        </header>

        <ReactMarkdown source={post.content} renderers={{ code: CodeBlock }} />
      </main>

      <div className='flex justify-between border mt-12 border-gray-200 rounded-md py-6 blog-foot px-3 '>
        {post.prevPost && (
          <Link href={`/posts/${post.prevPost.slug}`}>
            <a className='dark:text-tomato w-1/2'>
              &larr;{post.prevPost.title}
            </a>
          </Link>
        )}
        {post.nextPost && (
          <Link href={`/posts/${post.nextPost.slug}`}>
            <a className='dark:text-tomato '>{post.nextPost.title} &rarr;</a>
          </Link>
        )}
      </div>
    </Layout>
  );
}

export async function getStaticPaths() {
  const posts = await getAllSlugs();
  return {
    paths: posts.map((post) => ({
      params: { slug: post },
    })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const post = await getPostBySlug(params.slug);

  return {
    props: { post },
  };
}
