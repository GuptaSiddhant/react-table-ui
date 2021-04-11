import styled from '../utilities/styled'
import { border, color, mediaQueries, pxToEm, spacing } from './theme'

/* TitleBar */
export default styled('TitleBar')`
  & {
    width: 100%;
    height: 3.5em;

    display: grid;
    grid-template-columns: 1fr max-content;
    grid-template-rows: 1fr max-content;
    grid-template-areas: 'titleSearch actions systemActions';
    align-items: center;

    border-bottom: ${border.default};
    background-color: ${color.background.primary};
  }
  
  ${mediaQueries.mobile} {
    & {
      height: 6em;
      grid-template-areas: 'titleSearch systemActions' 'actions actions';
    }
  }

  & .titleSearch {
    grid-area: titleSearch;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-inline-start: 0.5em;
    gap: 0.5em;
  }
  & .systemActions {
    grid-area: systemActions;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }

  & .TableActions {
    grid-area: actions;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }

  & .title {
    font-weight: 700;
    max-height: 3.5em;
    width: 100%;
    padding-inline-start: 0.5em;
    text-align: left;
    text-align: start;
  }

  & .Search {
    width: 100%;
  }

  & .titleSearch input {
    min-height: ${pxToEm(32)};
    padding: ${spacing.sm} ${spacing.md};
  }

  & .titleSearch input::placeholder {
    font-weight: bold;
  }
`
