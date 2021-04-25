import React from 'react';
import Link from 'next/link';
import Head from 'next/head';
export default function Layout({ children, pageTitle, description, slugPage }) {
  return (
    <>
      <Head>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <meta charSet='utf-8' />
        <meta name='description' content={description} />

        <meta property='og:title' content={pageTitle} key='ogtitle' />
        <meta property='og:description' content={description} key='ogdesc' />

        <title>{pageTitle}</title>
      </Head>

      <div className='container'>
        <header className={`main-header ${slugPage ? 'sl-head' : ''}`}>
          <Link href='/'>
            <a>
              <h1>bookofcodes</h1>
            </a>
          </Link>
        </header>

        <main>{children}</main>
        <footer>
          <Link href='https://github.com/uchenoel'>
            <a>github</a>
          </Link>

          <Link href='https://twitter.com/cybernuel'>
            <a>twitter</a>
          </Link>
        </footer>
      </div>
    </>
  );
}
