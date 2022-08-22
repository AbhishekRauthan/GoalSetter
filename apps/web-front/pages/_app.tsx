import { AppProps } from 'next/app';
import Header from '../components/Header';
import { ChakraProvider } from '@chakra-ui/react';
import Head from 'next/head';
import { theme } from '../theme';

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <style>
          @import
          url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700&display=swap');
        </style>
      </Head>
      <ChakraProvider resetCSS theme={theme}>
        <Header />
        <main className="app">
          <Component {...pageProps} />
        </main>
      </ChakraProvider>
    </>
  );
}

export default CustomApp;
