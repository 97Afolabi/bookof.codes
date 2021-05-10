import 'react-toggle/style.css';
import './styles.css';
import { ThemeProvider } from 'next-themes';
import { DefaultSeo } from 'next-seo';

export default function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider attribute='class'>
      <DefaultSeo
        openGraph={{
          type: 'website',
          locale: 'en_IE',
          url: 'https://bookof.codes/',
          site_name: 'BookofCodes',
        }}
      />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
