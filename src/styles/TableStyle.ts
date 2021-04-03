import styled from '../utilities/styled'

export default styled.table`
  & .table {
    height: 100%;
    min-width: 100%;
    overflow: scroll;
    border: 1px solid #ddd;
  }

  & .loader {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
  }

  & .tbody {
    height: max-content;
  }

  & .subComponent {
    box-shadow: inset 0 0 8px 0 #0002;
    padding: 8px;
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
`
