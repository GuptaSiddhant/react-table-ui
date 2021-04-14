import type { ThemeColors, ThemeColor, ThemeSpacing } from '../types'

const getThemeColorObject = (category: Omit<keyof ThemeColors, 'accent'>) =>
  ['primary', 'secondary', 'disabled', 'inverse', 'selected', 'none'].reduce(
    (obj, name) => ({ ...obj, [name]: `var(--color-${category}-${name})` }),
    {} as ThemeColor
  )

const getThemeSpacingObject = (category: string) =>
  ['none', 'xs', 'sm', 'md', 'lg', 'xl'].reduce(
    (obj, name) => ({ ...obj, [name]: `var(--${category}-${name})` }),
    {} as ThemeSpacing<string>
  )

export const pxToEm = (px: number) => px / 16 + 'em'

export const color: ThemeColors = {
  text: getThemeColorObject('text'),
  background: getThemeColorObject('background'),
  border: getThemeColorObject('border'),
  accent: {
    default: 'var(--color-accent-default)',
    lighter: 'var(--color-accent-lighter)',
    darker: 'var(--color-accent-darker)'
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
