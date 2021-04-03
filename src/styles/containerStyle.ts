import styled from '../utilities/styled'
import { border, color, radius } from './theme'

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
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
  }

  & .pagination {
    display: flex;
    justify-content: space-between;
  }

  & input {
    width: 100%;
  }

  & .IconButton {
    background: none;
    border: none;
    line-height: 1;
    padding: 1em;
    border-radius: ${radius.sm};
    cursor: pointer;
  }

  & .IconButton:hover {
    background: ${color.background.selected};
  }
  & .IconButton:disabled {
    cursor: not-allowed;
    background: none;
  }
`
