import React from 'react';
import Head from 'next/head';

export default function Layout({ children }) {
  return (
    <div style={{}}>
      <Head>
        <link rel='icon' href='/favicon.ico' />
        <meta
          name='description'
          content='Learn how to build a personal website using Next.js'
        />

        <meta name='og:title' content='bookof.codes' />
        <meta name='twitter:card' content='summary_large_image' />
      </Head>
      <header></header>

      {children}
    </div>
  );
}
