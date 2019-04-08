import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { WebSocketLink } from 'apollo-link-ws';
import { SubscriptionClient } from 'subscriptions-transport-ws';
import { split } from 'apollo-link';
import fetch from 'isomorphic-unfetch';
import { getMainDefinition } from 'apollo-utilities';
// import { onError } from 'apollo-link-error';

// https://github.com/zeit/next.js/blob/master/examples/with-apollo-and-redux/lib/initApollo.js

let apolloClient = null;
const isBrowser = () => !!process.browser;

// Polyfill fetch() on the server (used by apollo-client)
if (!isBrowser()) {
  global.fetch = fetch;
}

function create(initialState) {
  const httpLink = new HttpLink({
    uri: process.env.GRAPHQL_HTTPS_URL, // Server URL (must be absolute)
    credentials: 'same-origin', // Additional fetch() options like `credentials` or `headers`
  });

  let link;
  if (isBrowser()) {
    const client = new SubscriptionClient(process.env.GRAPHQL_WS_URL, {
      reconnect: true,
    });

    const wsLink = new WebSocketLink(client);

    // using the ability to split links, you can send data to each link
    // depending on what kind of operation is being sent
    link = split(
      // split based on operation type
      ({ query }) => {
        const { kind, operation } = getMainDefinition(query);
        return kind === 'OperationDefinition' && operation === 'subscription';
      },
      wsLink,
      httpLink
    );
  } else {
    link = httpLink;
  }

  // Check out https://github.com/zeit/next.js/pull/4611 if you want to use the AWSAppSyncClient
  return new ApolloClient({
    connectToDevTools: isBrowser(),
    ssrMode: !isBrowser(), // Disables forceFetch on the server (so queries are only run once)
    link,
    cache: new InMemoryCache().restore(initialState || {}),
  });
}

export default function initApollo(initialState) {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (!isBrowser()) {
    return create(initialState);
  }

  // Reuse client on the client-side
  if (!apolloClient) {
    apolloClient = create(initialState);
  }

  return apolloClient;
}
