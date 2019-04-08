import React from 'react';
import { ThemeProvider } from 'emotion-theming';
import { StringsProvider } from '../utils/strings';
import { FlagsProvider } from '../utils/featureFlags';

import theme from '../utils/theme';
import styled from '@emotion/styled';

// Main container locks to all edges of the screen
const Main = styled.main`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`;

const Layout = ({ children }) => (
  <ThemeProvider theme={theme}>
    <FlagsProvider>
      <StringsProvider>
        {/* <ApolloProvider client={apolloClient}> */}
        <Main>{children}</Main>
        {/* </ApolloProvider> */}
      </StringsProvider>
    </FlagsProvider>
  </ThemeProvider>
);

export default Layout;
