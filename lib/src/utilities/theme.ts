import type { ThemeColors, ThemeColor, ThemeSpacing } from '../types'
import { commonClassName } from './createClassName'

const getThemeColorObject = (category: Omit<keyof ThemeColors, 'accent'>) =>
  ['primary', 'secondary', 'disabled', 'inverse', 'selected', 'none'].reduce(
    (obj, name) => ({
      ...obj,
      [name]: `var(--${commonClassName}-color-${category}-${name})`
    }),
    {} as ThemeColor
  )

const getThemeSpacingObject = (category: string) =>
  ['none', 'xs', 'sm', 'md', 'lg', 'xl'].reduce(
    (obj, name) => ({
      ...obj,
      [name]: `var(--${commonClassName}-${category}-${name})`
    }),
    {} as ThemeSpacing<string>
  )

export const pxToEm = (px: number) => px / 16 + 'em'

export const color: ThemeColors = {
  text: getThemeColorObject('text'),
  background: getThemeColorObject('background'),
  border: getThemeColorObject('border'),
  accent: {
    default: `var(--${commonClassName}-color-accent-default)`,
    lighter: `var(--${commonClassName}-color-accent-lighter)`,
    darker: `var(--${commonClassName}-color-accent-darker)`,
  }
} as const

export const spacing = getThemeSpacingObject('spacing')

export const radius = getThemeSpacingObject('radius')

export const mediaQueries = {
  mobile: `@media (max-width: 600px)`
}

export const border = {
  default: `1px solid ${color.border.primary}`
} as const

export const CenterStyle = `
width: 100%;
height: 100%;
display: flex;
align-items: center;
justify-content: center;
`
