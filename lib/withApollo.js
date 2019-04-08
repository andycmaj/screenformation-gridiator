import React from 'react';
import PropTypes from 'prop-types';
import {
  getMarkupFromTree,
  ApolloProvider as ApolloHooksProvider,
} from 'react-apollo-hooks';
import { renderToString } from 'react-dom/server';
import Head from 'next/head';
import initApollo from './initApollo';
import { ApolloProvider } from 'react-apollo';

// ref: https://github.com/govinu/govinu/blob/00553d5cc898338aa89686529fa2140a03fa412f/client/pages/_app.jsx
export default App => {
  return class WithData extends React.Component {
    static displayName = `WithData(${App.displayName})`;
    static propTypes = {
      apolloState: PropTypes.object.isRequired,
    };

    static async getInitialProps(ctx) {
      const { Component, router } = ctx;
      const apollo = initApollo({});

      let appProps = {};
      if (App.getInitialProps) {
        appProps = await App.getInitialProps(ctx);
      }

      if (!process.browser) {
        // Run all graphql queries in the component tree
        // and extract the resulting data
        try {
          // Run all GraphQL queries
          await getMarkupFromTree({
            renderFunction: renderToString,
            tree: (
              <ApolloProvider client={apollo}>
                <ApolloHooksProvider client={apollo}>
                  <App
                    {...appProps}
                    Component={Component}
                    router={router}
                    apolloClient={apollo}
                  />
                </ApolloHooksProvider>
              </ApolloProvider>
            ),
          });
        } catch (error) {
          // Prevent Apollo Client GraphQL errors from crashing SSR.
          // Handle them in components via the data.error prop:
          // https://www.apollographql.com/docs/react/api/react-apollo.html#graphql-query-data-error
          console.error('Error while running `getDataFromTree`', error);
        }

        // getDataFromTree does not call componentWillUnmount
        // head side effect therefore need to be cleared manually
        Head.rewind();
      }

      // Extract query data from the Apollo's store
      const apolloState = apollo.cache.extract();

      return {
        ...appProps,
        apolloState,
      };
    }

    constructor(props) {
      super(props);
      // `getDataFromTree` renders the component first, the client is passed off as a property.
      // After that rendering is done using Next's normal rendering pipeline
      this.apolloClient = initApollo(props.apolloState);
    }

    render() {
      return (
        <ApolloProvider client={this.apolloClient}>
          <ApolloHooksProvider client={this.apolloClient}>
            <App {...this.props} />
          </ApolloHooksProvider>
        </ApolloProvider>
      );
    }
  };
};
