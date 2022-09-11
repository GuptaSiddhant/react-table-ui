import React, { ButtonHTMLAttributes, forwardRef } from 'react'
import clsx from '../utilities/clsx'
import styled from '../utilities/styled'
import { color, radius, spacing, pxToEm } from '../utilities/theme'

export interface IconButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {}

export const ButtonStyle = styled('Button')`
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

function Button(
  { children, className = '', ...props }: IconButtonProps,
  ref: React.ForwardedRef<HTMLButtonElement>
) {
  return (
    <button {...props} className={clsx('Button', className)} ref={ref}>
      <div className='button-content'>{children}</div>
    </button>
  )
}

export default forwardRef(Button)
