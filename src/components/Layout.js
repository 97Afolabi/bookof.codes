import React from 'react';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import Head from 'next/head';

import Toggle from 'react-toggle';

export default function Layout({ children, pageTitle, description, slugPage }) {
  const { theme, setTheme } = useTheme();
  return (
    <>
      <Head>
        <title>bookof.codes | {pageTitle}</title>
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
        <meta name='description' content={description}></meta>
      </Head>
      <div className='p-7 sp-container'>
        <header className='flex justify-between mb-8 items-center main-nav'>
          <h1 className='font-heads font-black text-2xl dark:text-tomato'>
            <Link href='/'>
              <a>Bookofcodes</a>
            </Link>
          </h1>

          <div>
            <Toggle
              defaultChecked={true}
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className='custom-classname'
              aria-label='Switch between Dark and Light mode'
              icons={{
                checked: (
                  <img
                    src='/sun.png'
                    width='16'
                    height='16'
                    role='presentation'
                    style={{ pointerEvents: 'none' }}
                  />
                ),
                unchecked: (
                  <img
                    src='/moon.png'
                    width='16'
                    height='16'
                    role='presentation'
                    style={{ pointerEvents: 'none' }}
                  />
                ),
              }}
            />
          </div>
        </header>

        <main className=''>{children}</main>
        <footer className='mt-16 pt-8 dark:text-tomato flex justify-center w-full'>
          <Link href='https://github.com/uchenoel'>
            <a target='_blank' rel='noreferrer'>
              github
            </a>
          </Link>{' '}
          ・{' '}
          <Link href='https://twitter.com/cybernuel'>
            <a target='_blank' rel='noreferrer'>
              twitter
            </a>
          </Link>
        </footer>
      </div>
    </>
  );
}
