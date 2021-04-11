const accent = {
  default: '#096ED1',
  light: '#F2F9FF',
  dark: ''
}

export const typography = {} as const

export const color = {
  text: {
    primary: '#1a1a1a',
    secondary: '#404040',
    disabled: '#808080',
    inverse: '#ffffff',
    selected: accent.default,
    none: 'transparent'
  },
  background: {
    primary: '#ffffff',
    secondary: '#f7f7f7',
    disabled: '#eeeeee',
    selected: accent.light,
    inverse: '#000000',
    none: 'transparent'
  },
  border: {
    default: '#bfbfbf',
    selected: accent.default,
    none: 'transparent'
  }
} as const

export const pxToEm = (px: number) => px / 16 + 'em'

export const border = {
  default: `1px solid ${color.border.default}`
} as const

export const spacing = {
  none: pxToEm(0),
  xs: pxToEm(2),
  sm: pxToEm(4),
  md: pxToEm(8),
  lg: pxToEm(12),
  xl: pxToEm(16)
} as const

export const radius = spacing

export const CenterStyle = `
width: 100%;
height: 100%;
display: flex;
align-items: center;
justify-content: center;
`

export const mediaQueries = {
  mobile: '@media (max-width: 600px)'
}
