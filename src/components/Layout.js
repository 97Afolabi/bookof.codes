import React from 'react';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import Head from 'next/head';

export default function Layout({ children, pageTitle, description }) {
  return (
    <>
      <Head>
        <title>bookof.codes | {pageTitle}</title>
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
        <meta name='description' content={description}></meta>
      </Head>
      <div className='container'>
        <header>
          <Link href='/'>
            <a>
              <h1>bookof.codes</h1>
            </a>
          </Link>

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

        {children}
      </div>
    </>
  );
}
