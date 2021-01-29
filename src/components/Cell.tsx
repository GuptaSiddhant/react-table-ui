import * as React from 'react'
import { createClassName } from '../utilities'

const style: React.CSSProperties = {
  padding: '4px',
  background: 'white',
  overflow: 'hidden'
}

const Cell = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>((props, ref) => {
  return (
    <div
      className={createClassName('td')}
      {...props}
      style={{ ...style, ...props.style }}
      ref={ref}
    />
  )
})

export default Cell
