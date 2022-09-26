import { AppProps } from 'next/app';
import Header from '../components/Header';
import { ChakraProvider, Spinner } from '@chakra-ui/react';
import Head from 'next/head';
import { theme } from '../theme';
import { useEffect, useState } from 'react';
import { useAuthStore } from '../feature/store';
import router from 'next/router';
import { CenterCon } from '../components/Container';

function CustomApp({ Component, pageProps }: AppProps) {
  const { setUser } = useAuthStore();
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const localUser = localStorage.getItem('user_token');
      localUser ? setUser(JSON.parse(localUser)) : router.push('/login');
    }
  }, []);

  const [loading, setLoading] = useState(false);
  router.events.on('routeChangeStart', () => setLoading(true));
  router.events.on('routeChangeComplete', () => setLoading(false));

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
        {loading ? (
          <CenterCon>
            <Spinner size="lg" />
          </CenterCon>
        ) : (
          <Component {...pageProps} />
        )}
      </ChakraProvider>
    </>
  );
}

export default CustomApp;
