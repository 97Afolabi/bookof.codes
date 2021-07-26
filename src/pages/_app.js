import 'react-toggle/style.css';
import './styles.css';

import { DefaultSeo } from 'next-seo';

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <DefaultSeo
        openGraph={{
          type: 'website',
          locale: 'en_IE',
          url: 'https://bookof.codes/',
          site_name: 'bookof.codes',
        }}
      />
      <Component {...pageProps} />
    </>
  );
}
