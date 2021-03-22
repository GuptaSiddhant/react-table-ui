import { commonClassName, styled } from './createClassName'

const stylesheet = styled('')`
  .${commonClassName}.table {
    height: 100%;
    min-width: 100%;
    overflow: scroll;
    border: 1px solid #ddd;
    box-sizing: border-box;
  }

  .${commonClassName}.table * {
    box-sizing: border-box;
  }

  .${commonClassName}.table .loader {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
  }

  [data-sticky-td] {
    position: sticky;
  }

  [data-sticky-last-left-td] {
    box-shadow: 2px 0px 3px #ccc;
  }

  [data-sticky-first-right-td] {
    box-shadow: -2px 0px 3px #ccc;
  }
`

export default stylesheet
