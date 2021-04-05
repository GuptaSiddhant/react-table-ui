import styled from '../utilities/styled'
import { border, radius } from './theme'

export default styled.div`
  & input[type='search'] {
    font: inherit;
    width: 100%;
    border-radius: ${radius.xs};
    border: ${border.default};
    padding: ${radius.sm} ${radius.md};
  }

  & input[type='search'] {
    -webkit-appearance: none;
  }

  & input[type='search']::-webkit-search-decoration {
    -webkit-appearance: none;
  }
`
