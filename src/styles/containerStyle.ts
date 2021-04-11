import styled from '../utilities/styled'
import { border, pxToEm, radius, spacing, color } from './theme'

export default styled.div`
  &,
  & * {
    box-sizing: border-box;
    font-size: 16px;
    line-height: 1.5;
  }

  & {
    display: grid;
    grid-template-rows: max-content 1fr max-content;
    height: 100%;
    width: 100%;
  }

  &.withBorder {
    border: ${border.default};
    border-radius: ${radius.md};
    overflow: hidden;
  }

  & .Pagination {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    min-height: ${pxToEm(56)};
    width: 100%;
    border-top: ${border.default};
    background-color: ${color.background.primary};
  }

  & .Pagination .Status {
    flex-basis: 1;
    flex-grow: 1;
    min-height: ${pxToEm(40)};
    padding: 0 ${spacing.xl};
    display: flex;
    justify-content: center;
    align-items: center;
    min-width: max-content;
    max-width: 100%;
  }

  & .Pagination .spacer {
    flex-basis: 1;
    flex-grow: 999;
  }

  & .Pagination .Pager {
    display: flex;
    flex-basis: 1;
    flex-grow: 1;
    align-items: center;
    justify-content: space-between;
    min-width: max-content;
    max-width: 100%;
  }
  & .Pagination .Pager input {
    margin: 0 ${spacing.md};
    text-align: center;
  }
`
