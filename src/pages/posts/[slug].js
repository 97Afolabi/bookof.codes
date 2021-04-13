import { useEffect } from 'react';
import { getAllSlugs, getPostBySlug } from '../../lib/api';
import Prism from 'prismjs';
export default function Post({ post }) {
  useEffect(() => {
    Prism.highlightAll();
  }, []);
  return (
    <div className='container'>
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
    </div>
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
