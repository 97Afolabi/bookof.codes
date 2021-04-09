import Head from 'next/head';
import Link from 'next/link';
import { getAllPosts } from '../lib/api';
import Image from 'next/image';
import styles from './index.module.css';
import ReactTimeAgo from 'react-time-ago';
import Layout from '../components/Layout';

export default function Home({ allPosts }) {
  return (
    <Layout>
      <p>the beginning of something great!</p>
    </Layout>
  );
}

export async function getStaticProps() {
  const allPosts = getAllPosts(['title', 'date', 'slug']);

  return {
    props: { allPosts },
  };
}
