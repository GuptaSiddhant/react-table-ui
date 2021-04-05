import styled from '../utilities/styled'
import { border, pxToEm, spacing } from './theme'

/* TitleBar */
export default styled('TitleBar')`
  & {
    width: 100%;
    height: 3.5em;

    display: grid;
    grid-template-columns: 1fr max-content;
    grid-template-areas: 'titleSearch end';
    align-items: center;

    border-bottom: ${border.default};
  }

  & .titleSearch {
    grid-area: titleSearch;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-inline-start: 1em;
    gap: 0.5em;
  }
  & .end {
    grid-area: end;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }

  & .title {
    font-weight: 700;
    max-height: 3.5em;
    width: 100%;
  }

  & .Search {
    width: 100%;
  }

  & .titleSearch input {
    min-height: ${pxToEm(32)};
    position: relative;
    width: calc(100% + ${spacing.xl});
    padding: ${spacing.sm} ${spacing.md};
    left: -${spacing.md};
  }

  & .titleSearch input::placeholder {
    font-weight: bold;
  }
`
