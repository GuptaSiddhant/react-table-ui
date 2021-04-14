import styled from '../utilities/styled'
import { border, color, radius } from './theme'

export default styled.div`
  & input[type='search'] {
    font: inherit;
    width: 100%;
    border-radius: ${radius.xs};
    border: ${border.default};
    padding: ${radius.sm} ${radius.md};
    color: ${color.text.primary};
  }

  & input[type='search'] {
    -webkit-appearance: none;
  }

  & input[type='search']::-webkit-search-decoration {
    -webkit-appearance: none;
  }
`
