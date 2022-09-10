import styled from '../utilities/styled'
import { border, pxToEm, spacing, color } from '../utilities/theme'

export default styled('StatusBar')`
  & {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    min-height: ${pxToEm(56)};
    width: 100%;
    border-top: ${border.default};
    background-color: ${color.background.primary};
  }

  & .Status {
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

  & .spacer {
    flex-basis: 1;
    flex-grow: 999;
  }

  & .Pagination {
    display: flex;
    flex-basis: 1;
    flex-grow: 1;
    align-items: center;
    justify-content: space-between;
    min-width: max-content;
    max-width: 100%;
  }
  & .Pagination input {
    margin: 0 ${spacing.md};
    text-align: center;
  }
`
