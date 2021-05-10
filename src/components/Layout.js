import React from 'react';
import Link from 'next/link';
import { useTheme } from 'next-themes';

import Toggle from 'react-toggle';

export default function Layout({ children, pageTitle, description, slugPage }) {
  const { theme, setTheme } = useTheme();
  return (
    <>
      <div class='p-7'>
        <header class='flex justify-between mb-8 items-center'>
          <h1 class='font-heads font-black text-2xl dark:text-tomato'>
            <Link href='/'>
              <a>Bookofcodes</a>
            </Link>
          </h1>

          <div>
            <Toggle
              defaultChecked={true}
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className='custom-classname'
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

        <main>
          {children}

          <footer class='mt-16 pt-8 dark:text-tomato flex justify-center w-full'>
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
        </main>
      </div>
    </>
  );
}
