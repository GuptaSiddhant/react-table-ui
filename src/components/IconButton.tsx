import React, { FC, ButtonHTMLAttributes } from 'react'
import createClassName from '../utilities/createClassName'

export interface IconButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {}

const IconButton: FC<IconButtonProps> = ({
  children,
  className = '',
  ...props
}) => (
  <button {...props} className={createClassName('IconButton', className)}>
    {children}
  </button>
)

export default IconButton
