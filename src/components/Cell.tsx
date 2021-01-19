import * as React from 'react'
import styled from 'styled-components'
import { createClassName } from 'utilities'

const StyledCell = styled.div`
  padding: 5px;
  border-bottom: 1px solid #ddd;
  border-right: 1px solid #ddd;
  background-color: #fff;
  overflow: hidden;
  :last-child {
    border-right: 0;
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

const HeaderCell: React.FC = ({ children, ...props }) => (
  <StyledCell className={createClassName('th')} {...props}>
    {children}
  </StyledCell>
)

const Cell: React.FC & { Header: React.FC } = ({ children, ...props }) => (
  <StyledCell className={createClassName('td')} {...props}>
    {children}
  </StyledCell>
)

Cell.Header = HeaderCell

export default Cell
