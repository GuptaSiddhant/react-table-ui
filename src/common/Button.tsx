import React, { FC, ButtonHTMLAttributes } from 'react'
import createClassName from '../utilities/createClassName'
import styled from '../utilities/styled'
import { color, radius, spacing, pxToEm } from '../utilities/theme'

export interface IconButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {}

export const ButtonStyle = styled('IconButton')`
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
    min-width: ${pxToEm(40)};
    min-height: ${pxToEm(40)};
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


  & .iconWithLabel {
    display: grid;
    align-items: center;
    grid-template-columns: max-content max-content;
    gap: ${spacing.md};
    padding: 0 ${spacing.md};
  }
`

const Button: FC<IconButtonProps> = ({
  children,
  className = '',
  ...props
}) => (
  <button {...props} className={createClassName('IconButton', className)}>
    <div className='button-content'>{children}</div>
  </button>
)

export default Button
