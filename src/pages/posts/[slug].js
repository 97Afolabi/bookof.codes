import { getAllSlugs, getPostBySlug } from '../../lib/api';
import ReactMarkdown from 'react-markdown';
import CodeBlock from '../../components/CodeBlock';
import Layout from '../../components/Layout';

export default function Post({ post }) {
  return (
    <Layout pageTitle={post.title} description={post.excerpt} slugPage={true}>
      <header className='post-head'>
        <h1>{post.title}</h1>
        <small>{post.date}</small>
      </header>

      <ReactMarkdown source={post.content} renderers={{ code: CodeBlock }} />
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
