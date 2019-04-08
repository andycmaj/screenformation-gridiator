import React from 'react';
import Head from 'next/head';
import { compose } from 'recompose';
import styled from 'styled-components';
import Controller from '../components/Controller';
import withApollo from '../lib/withApollo';

// Main container locks to all edges of the screen
const Main = styled.main`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`;

const Index = props => (
  <>
    <Head>
      <title>ALL THE SCREENS</title>
    </Head>
    <Main>
      <Controller />
    </Main>
  </>
);

export default compose(withApollo)(Index);
