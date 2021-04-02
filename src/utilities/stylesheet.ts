import { commonClassName, styled } from './createClassName'

const stylesheet = styled('')`
  .${commonClassName} {
    display: grid;
    grid-template-rows: max-content 1fr max-content;
    height: 100%;
    box-sizing: border-box;
  }

  .${commonClassName} * {
    box-sizing: border-box;
  }

  .${commonClassName}.table {
    height: 100%;
    min-width: 100%;
    overflow: scroll;
    border: 1px solid #ddd;
  }

  .${commonClassName}.table .loader {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
  }

  .${commonClassName}.body {
    height: max-content;
  }
  
  .${commonClassName}.subComponent {
    box-shadow: inset 0 0 8px 0 #0002;
    padding: 8px;
  }

  .${commonClassName} [data-sticky-td] {
    position: sticky;
  }

  .${commonClassName} [data-sticky-last-left-td] {
    box-shadow: 2px 0px 3px #ccc;
  }

  .${commonClassName} [data-sticky-first-right-td] {
    box-shadow: -2px 0px 3px #ccc;
  }

  .${commonClassName}.pagination {
    display: flex;
    justify-content: space-between;
  }

  .${commonClassName}.globalFilter {
    display: flex;
    width: 100%;
    height: 40px;
    align-items: center;
    padding: 8px;
    gap: 4px;
  }

  .${commonClassName} input {
    width: 100%;
  }

  .${commonClassName}.resizer {
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
  .${commonClassName}.resizer:hover, .${commonClassName}.resizer.isResizing {
    opacity: 1;
    width: 6px;
  }
`

export default stylesheet
