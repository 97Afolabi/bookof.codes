import React from 'react';
import Link from 'next/link';

export default function Layout({ children }) {
  return (
    <div className='container'>
      <header className='main-header'>
        <Link href='/'>
          <a>
            <h1>bookofcodes</h1>
          </a>
        </Link>
      </header>

      <main>{children}</main>
      <footer>
        <Link href='/'>
          <a>github</a>
        </Link>

        <Link href='/'>
          <a>twitter</a>
        </Link>

        <Link href='/'>
          <a>rss</a>
        </Link>
      </footer>
    </div>
  );
}
