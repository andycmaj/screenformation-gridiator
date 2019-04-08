export default ({ vertical: [vStart, vEnd], horizontal: [hStart, hEnd] }) => ({
  rowStart: Math.abs(vEnd),
  rowSpan: Math.abs(vStart) - Math.abs(vEnd),
  colStart: hStart,
  colSpan: hEnd - hStart,
});
