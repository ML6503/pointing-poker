import { createContext, FC, useEffect, useState } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import { AppProps } from 'next/app';
import Head from 'next/head';
import theme from '@styles/theme';
import { Footer } from 'components/Footer/footer';
import '../styles/globals.css';
import { io } from 'socket.io-client';
import Router from "next/router";
import AppContext, { appStore } from 'store/store';
import { useReducer } from 'react';
import { appReducer } from 'store/reducer';
import { Loader } from 'components/Loader/loader';
import Error from "next/error";

const MyApp: FC<AppProps> = ({ Component, pageProps }: AppProps) => {
  const [ state, dispatch ] = useReducer(appReducer, appStore);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles?.parentElement?.removeChild(jssStyles);
    }
    const start = () => {
      setIsLoading(true);
    };
    const end = () => {
      setIsLoading(false);
    };
    Router.events.on("routeChangeStart", start);
    Router.events.on("routeChangeComplete", end);
    Router.events.on("routeChangeError", end);
    return () => {
      Router.events.off("routeChangeStart", start);
      Router.events.off("routeChangeComplete", end);
      Router.events.off("routeChangeError", end);
    };

  }, []);

  return (
    <>
      <Head>
        <title>Pointing Poker</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <ThemeProvider theme={theme}>
        <AppContext.Provider value={{ state, dispatch }}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          {/* {pageProps.error ? <Error statusCode={pageProps.error.statusCode} title={pageProps.error.message} /> : } */}
          {isLoading ? <Loader /> : (
            <>
              <Component {...pageProps} />
              <Footer />
          </>
          )}
        </AppContext.Provider>
      </ThemeProvider>
    </>
  );
};

export default MyApp;
