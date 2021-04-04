import React, { FC, ButtonHTMLAttributes } from 'react'
import createClassName from '../utilities/createClassName'
import styled from '../utilities/styled'
import { color, radius, spacing, pxToEm } from '../styles/theme'

export interface IconButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {}

export const IconButtonStyle = styled('IconButton')`
  & {
    background: none;
    border: none;
    line-height: 1;
    border-radius: ${radius.sm};
    cursor: pointer;
    padding: ${spacing.none};
  }

  & .button-content {
    background: none;
    margin: ${spacing.sm};
    padding: ${spacing.sm};
    width: ${pxToEm(40)};
    height: ${pxToEm(40)};
    border-radius: ${radius.xs};

    display: flex;
    align-items: center;
    justify-content: center;
  }

  &:hover .button-content {
    background: ${color.background.selected};
  }

  &:disabled,
  &:disabled .button-content {
    cursor: not-allowed;
    background: none;
  }
`

const IconButton: FC<IconButtonProps> = ({
  children,
  className = '',
  ...props
}) => (
  <button {...props} className={createClassName('IconButton', className)}>
    <div className='button-content'>{children}</div>
  </button>
)

export default IconButton
