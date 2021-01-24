// import * as React from 'react'
import styled from 'styled-components'
import { createClassName } from '../utilities'

const Cell = styled.div.attrs(() => ({
  className: createClassName('td')
}))`
  padding: 4px;
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

  .loader {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
  }
`

export default Cell
