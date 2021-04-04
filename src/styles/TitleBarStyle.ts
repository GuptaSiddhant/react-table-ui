import styled from '../utilities/styled'
import { border } from './theme'
// import { border, radius } from './theme'

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

  /* Global Filter */
  & .GlobalFilter {
    display: flex;
    width: 100%;
    height: 40px;
    align-items: center;
    padding: 0 1em;
    gap: 0.5em;
  }
`
