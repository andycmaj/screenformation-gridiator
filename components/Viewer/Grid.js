import styled, { css } from 'styled-components';

export const Cell = styled.div`
  grid-column-start: ${({ colStart }) => colStart};
  grid-column-end: ${({ colStart, colSpan }) => colStart + colSpan};
  grid-row-start: ${({ rowStart }) => rowStart};
  grid-row-end: ${({ rowStart, rowSpan }) => rowStart + rowSpan};
  box-sizing: border-box;
  outline: none;
  position: relative;
`;

export const Content = styled.div`
  height: 100%;
  min-width: 100px;
  background-color: #bdd8f5;
  border: 1px solid #aa8c48;
`;

export const Grid = styled.div`
  height: 100%;
  display: grid;
  grid-template-columns: repeat(${({ colCount }) => colCount}, 1fr);
  grid-auto-rows: 50%;
  box-sizing: border-box;
`;
