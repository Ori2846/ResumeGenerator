// pages/_app.js
import '../styles/globals.css';
import Head from 'next/head';
import '../polyfills.mjs';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Engr Resumes</title>
        <meta name="description" content="Need a resume?" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
