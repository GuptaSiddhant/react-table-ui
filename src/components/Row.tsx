import styled from 'styled-components'
import { createClassName } from '../utilities'

const Row = styled.div.attrs((props) => ({
  className: createClassName('tr'),
  ...props
}))`
  :last-child {
    .td {
      border-bottom: 0;
    }
  }
`

export default Row
