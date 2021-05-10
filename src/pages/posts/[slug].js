import { getAllSlugs, getPostBySlug } from '../../lib/api';
import ReactMarkdown from 'react-markdown';
import CodeBlock from '../../components/CodeBlock';
import Layout from '../../components/Layout';
import Link from 'next/link';

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

      <div class='flex justify-between border mt-12 border-gray-200 rounded-md py-6 blog-foot px-3 '>
        {post.prevPost && (
          <Link href={`/posts/${post.prevPost.slug}`}>
            <a class='dark:text-tomato w-1/2'>&larr;{post.prevPost.title}</a>
          </Link>
        )}
        {post.nextPost && (
          <Link href={`/posts/${post.nextPost.slug}`}>
            <a class='dark:text-tomato '>{post.nextPost.title} &rarr;</a>
          </Link>
        )}
      </div>

      <div class='flex mb-14 mt-16 items-center border p-1 rounded-md'>
        <img
          src='/avatar.jpg'
          alt='profile image'
          width='50'
          height='50'
          class='rounded-full  mr-3.5'
        />
        <p class='text-sm font-body leading-5 dark:text-mgrey'>
          Hey 👋🏼, Welcome to my personal code blog. <br />
          Here i write about things i learn and work with everyday.
        </p>
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
