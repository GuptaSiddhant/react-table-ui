import styled from '../utilities/styled'
import { border, CenterStyle, color, pxToEm, spacing } from './theme'

const THeadStyle = styled('THead')`
  & {
    position: relative;
    z-index: 5;
    width: 100%;
    top: 0;
  }

  &.sticky {
    position: sticky;
  }

  & .Row {
    min-height: ${pxToEm(48)};
    background-color: ${color.background.secondary};
  }

  .Table.scrollY .THead .Row {
    box-shadow: 0px 2px 8px 0 rgba(0, 0, 0, 0.2);
  }

  & .Cell {
    cursor: inherit;
    display: flex;    
    align-items: center;
    background-color: inherit;
    gap: ${spacing.md};
    border-bottom: ${border.default};
    color: ${color.text.secondary}
  }

  & .Sort {
    visibility: hidden;
  }

  & .Cell:hover .Sort {
    visibility: visible;
  }

  & .Filter {
    width: 100%;
  }

  & .FilterRow {
    height: ${pxToEm(48)};
    background-color: ${color.background.disabled};
  }

  & .Filter input {
    position: relative;
    width: calc(100% + ${spacing.xl});
    padding: ${spacing.sm} ${spacing.md};
    left: -${spacing.md};
    font-weight: normal;
  }

  & .resizer {
    display: inline-block;
    background: ${color.border.default};
    width: 2px;
    height: ${pxToEm(24)};
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    z-index: 1;
    touch-action: none;
  }
  & .resizer:hover,
  & .resizer.isResizing {
    background: ${color.border.selected};
  }
`

const TBodyStyle = styled('TBody')`
  & {
    height: max-content;
    position: relative;
    z-index: 0;
  }

  & .Row {
    min-height: ${pxToEm(48)};
    background: ${color.background.primary};
  }

  & .Row.selected {
    background: ${color.background.selected};
  }

  & .Cell {
    display: flex;
    align-items: center;
    background-color: inherit;
    border-bottom: ${border.default};
  }

  & .subComponent {
    box-shadow: inset 0 0 8px 0 #0002;
  }
  & .subComponent .content {
    position: sticky;
    left: 0px;
    width: max-content; /* TODO */
    padding: ${pxToEm(16)};
  }
`

export default styled.table`
  & {
    height: 100%;
    min-width: 100%;
    overflow: auto;
  }

  ${THeadStyle}
  ${TBodyStyle}

  & .RowSelectCheckbox {
    ${CenterStyle}
  }

  & [data-sticky-td] {
    position: sticky;
  }

  &.scrollX [data-sticky-last-left-td] {
    box-shadow: 1px 0px 2px ${color.border.default};
  }

  &.scrollX [data-sticky-first-right-td] {
    box-shadow: -1px 0px 2px ${color.border.default};
  }

  & .Cell {
    padding: ${spacing.md} ${spacing.xl};
  }

  & .Cell.noSpacing {
    flex-direction: row;
    align-items: center;
    padding: 0;
  }

  & .loader {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
  }

  & .TFoot {
    position: sticky;
    bottom: 0;
    z-index: 5;
    width: 100%;
    background: ${color.background.secondary};
  }
`
