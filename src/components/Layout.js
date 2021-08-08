import React from 'react';

import Link from 'next/link';
import Head from 'next/head';
import { NextSeo } from 'next-seo';

export default function Layout({ children, pageTitle, description, lnk }) {
  return (
    <>
      <NextSeo
        title={`bookof.codes | ${pageTitle}`}
        description={description}
        canonical={`https://bookof.codes${lnk !== '' ? '/posts/' + lnk : ''}`}
        openGraph={{
          url: `https://bookof.codes${lnk !== '' ? '/posts/' + lnk : ''}`,
          title: `bookof.codes | ${pageTitle}`,
          description,
          site_name: 'bookof.codes',
        }}
        twitter={{
          handle: '@asenwibor',
          site: '@asenswibor',
          cardType: 'summary',
        }}
      />
      <Head>
        <title>bookof.codes | {pageTitle}</title>
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      </Head>
      <div className='container'>
        <header>
          <Link href='/'>
            <a>
              <h1>bookof.codes</h1>
            </a>
          </Link>

          <nav>
            <Link href='https://github.com/uchenoel/bookof.codes'>
              <a>github</a>
            </Link>
            <Link href='https://twitter.com/asenwibor'>
              <a>twitter</a>
            </Link>
            <Link href='/rss.xml'>
              <a>rss</a>
            </Link>
          </nav>
        </header>

        {children}
      </div>
    </>
  );
}
