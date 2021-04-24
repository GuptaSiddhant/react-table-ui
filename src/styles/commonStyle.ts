import styled from '../utilities/styled'
import { border, color, radius, pxToEm } from '../utilities/theme'

const checkboxStyle = styled('checkbox')`
  & {
    height: 1em;
    width: 1em;
    -webkit-appearance: none;
    -moz-appearance: none;
    -o-appearance: none;
    appearance: none;

    outline: none;
    border: 1px solid ${color.border.primary};
    border-radius: ${radius.sm};
    background-color: ${color.background.primary};
    cursor: pointer;
  }

  &:hover,
  &:focus {
    outline: 1px solid ${color.accent.default};
  }

  &:checked,
  &:indeterminate {
    border-color: ${color.accent.default};
    background-color: ${color.accent.default};
    box-shadow: inset 0 0 0 2px ${color.background.primary};
  }

  &:indeterminate {
    box-shadow: inset 0 ${pxToEm(4)} 0 2px ${color.background.primary},
      inset 0 -${pxToEm(4)} 0 2px ${color.background.primary};
  }
`

export default styled.div`
  & input[type='search'],
  & input[type='text'],
  & input[type='number'],
  & input[type='checkbox'] {
    font: inherit;
    border-radius: ${radius.xs};
    border: ${border.default};
    color: ${color.text.primary};
  }

  & input[type='search'],
  & input[type='text'] {
    width: 100%;
    padding: ${radius.sm} ${radius.md};
  }

  & input[type='search'] {
    -webkit-appearance: none;
  }

  & input[type='search']::-webkit-search-decoration {
    -webkit-appearance: none;
  }

  ${checkboxStyle}
`
