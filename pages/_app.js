import React from 'react';
import App, { Container } from 'next/app';
import { Provider } from 'react-redux';
import withRedux from 'next-redux-wrapper';
import initStore from '../lib/initStore';
import { ThemeProvider, createGlobalStyle } from 'styled-components';
import theme from '../lib/theme';
import { compose } from 'recompose';
import withApollo from '../lib/withApollo';

const GlobalStyle = createGlobalStyle`
  * {
    font-family: Menlo, Monaco, "Lucida Console", "Liberation Mono", "DejaVu Sans Mono", "Bitstream Vera Sans Mono", "Courier New", monospace, serif;
    box-sizing: border-box;
  }
  body {
    margin: 0;
    padding: 0;
  }
`;

class MyApp extends App {
  render() {
    const { Component, pageProps, store } = this.props;
    return (
      <Container>
        <GlobalStyle />
        <ThemeProvider theme={theme}>
          <Provider store={store}>
            <Component {...pageProps} />
          </Provider>
        </ThemeProvider>
      </Container>
    );
  }
}

export default compose(
  withApollo,
  withRedux(initStore, { debug: true })
)(MyApp);
