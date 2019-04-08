import React from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import Viewer from '../components/Viewer';

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
      <Viewer />
    </Main>
  </>
);

export default Index;
