import * as React from 'react'
import { color, spacing } from '../styles/theme'
import createClassName from '../utilities/createClassName'
import styled from '../utilities/styled'

export const CellStyle = styled('td')`
  &, .th {
    padding: ${spacing.sm} ${spacing.md}; 
    background: ${color.background.primary};
    overflow: hidden;
  }
`

const Cell = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>((props, ref) => {
  return (
    <div
      className={createClassName('td')}
      {...props}
      style={props.style}
      ref={ref}
    />
  )
})

export default Cell
