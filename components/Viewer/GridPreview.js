import React from 'react';
import styled, { css } from 'styled-components';
import { Button } from '@blueprintjs/core';
import theme from '../../lib/theme';
import { Grid, Cell as OriginalCell } from './Grid';

const aspectRatio = 16 / 9;

const Root = styled.div`
  margin: 55px 0;
  background-color: ${theme.colors.darkBackground};
  height: ${({ height }) => height}px;
  width: ${({ height }) => height * aspectRatio}px;
`;

const Cell = styled(OriginalCell)`
  background-color: ${theme.colors.maskBlue};
`;

const SaveButton = styled(Button)`
  color: ${theme.colors.darkBackground};
`;

const GridPreview = ({ dimensions, colCount, rowCount }) => (
  <Root height={rowCount * 75}>
    <Grid colCount={colCount}>
      <Cell {...dimensions} />
    </Grid>
    {/* <SaveButton fill minimal>
      SAVE
    </SaveButton> */}
  </Root>
);

export default GridPreview;
