import React from 'react';
import styled, { css } from 'styled-components';
import ResponsiveEmbed from 'react-responsive-embed';
import { Icon } from '@blueprintjs/core';
import he from 'he';
import Helmet from 'react-helmet';

import { CONTENT_TYPE } from './store';
import PaneControls from './PaneControls';
import { Cell, Content } from './Grid';

const maybeZoomContent = ({ zoom }) =>
  !!zoom &&
  css`
    width: ${100 / zoom}% !important;
    height: ${100 / zoom}% !important;
    transform-origin: 0 0;
    transform: scale(${zoom});
  `;

const Embed = styled.iframe`
  height: 100%;
  width: 100%;

  ${maybeZoomContent};
`;

const EmptyPaneContent = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Pane = ({ id, content, ...dimensions }) => (
  <Cell {...dimensions}>
    {content.requiredScripts && (
      <Helmet>
        {content.requiredScripts.map(src => (
          <script key={src} src={src} />
        ))}
      </Helmet>
    )}
    <PaneControls paneId={id} content={content} dimensions={dimensions} />
    <Content>
      {content.type === CONTENT_TYPE.empty ? (
        <EmptyPaneContent>
          <Icon icon="new-grid-item" iconSize={50} intent="primary" />
        </EmptyPaneContent>
      ) : content.type === CONTENT_TYPE.youtubeFrame ? (
        <ResponsiveEmbed
          allowFullScreen
          src={content.url}
          title={content.title}
        />
      ) : content.type === CONTENT_TYPE.embedSnippet ? (
        <div dangerouslySetInnerHTML={{ __html: he.decode(content.snippet) }} />
      ) : (
        <Embed src={content.url} title={content.title} zoom={content.zoom} />
      )}
    </Content>
  </Cell>
);

export default Pane;
