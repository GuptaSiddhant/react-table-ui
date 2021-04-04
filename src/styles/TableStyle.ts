import styled from '../utilities/styled'
import { color } from './theme'

export default styled.table`
  & {
    height: 100%;
    min-width: 100%;
    overflow: scroll;
    border: 1px solid #ddd;
  }

  & .Thead {
    position: relative;
    z-index: 5;
    width: 100%;
    top: 0;
  }

  & .Thead.sticky {
    position: sticky;
  }

  & .Thead .th {
    cursor: inherit;
    font-weight: bold;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  & .loader {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
  }

  & .TBody {
    height: max-content;
    position: relative;
    z-index: 0;
  }

  & .subComponent {
    box-shadow: inset 0 0 8px 0 #0002;
  }
  & .subComponent .content {
    padding: 8px;
    position: sticky;
    left: 0px;
    width: max-content; /* TODO */
  }

  & [data-sticky-td] {
    position: sticky;
  }

  & [data-sticky-last-left-td] {
    box-shadow: 2px 0px 3px #ccc;
  }

  & [data-sticky-first-right-td] {
    box-shadow: -2px 0px 3px #ccc;
  }

  & .resizer {
    display: inline-block;
    background: black;
    width: 4px;
    height: 100%;
    position: absolute;
    right: 0;
    top: 0;
    transform: translateX(50%);
    z-index: 1;
    touch-action: none;
    opacity: 0.5;
  }
  & .resizer:hover,
  & .resizer.isResizing {
    opacity: 1;
    width: 6px;
  }

  & .TFoot {
    position: sticky;
    bottom: 0;
    z-index: 5;
    width: 100%;
    background: ${color.background.secondary};
  }
`
