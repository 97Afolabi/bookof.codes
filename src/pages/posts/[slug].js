import { getAllSlugs, getPostBySlug } from '../../lib/api';
import ReactMarkdown from 'react-markdown';
import CodeBlock from '../../components/CodeBlock';
import Layout from '../../components/Layout';
import Link from 'next/link';
import Bio from '../../components/Bio';

export default function Post({ post }) {
  return (
    <Layout pageTitle={post.title} description={post.excerpt}>
      <header className='post-head my-10'>
        <h1 className='font-heads font-black text-3xl dark:text-mgrey'>
          {post.title}
        </h1>
        <small className='dark:text-mgrey'>{post.date}</small>
      </header>

      <ReactMarkdown
        source={post.content}
        renderers={{ code: CodeBlock }}
        className='prose lg:prose-xl dark:text-mgrey content'
      />

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

  let d = new Date(post.date);
  let args = { day: 'numeric', month: 'long', year: 'numeric' };
  post.date = d.toLocaleDateString(undefined, args);
  return {
    props: { post },
  };
}
