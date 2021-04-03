import styled from '../utilities/styled'
// import { border, radius } from './theme'

/* Title */
export default styled.div`
  & .Title {
    display: flex;
    width: 100%;
    height: 3.5em;
    gap: 1em;
    align-items: center;
    justify-content: space-between;
  }

  & .start {
    display: flex;
    flex-direction: flex-start;
    align-items: center;
  }
  & .end {
    display: flex;
    flex-direction: flex-end;
    align-items: center;
  }

  & .Title .title {
    padding-inline-start: 1em;
    font-weight: 700;
    max-height: 3.5em;
  }

  /* Global Filter */
  & .GlobalFilter {
    display: flex;
    width: max-content;
    height: 40px;
    align-items: center;
    padding: 0 1em;
    gap: 0.5em;
  }
`
