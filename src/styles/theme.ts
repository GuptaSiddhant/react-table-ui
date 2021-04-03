const accent = {
  default: '#096ED1',
  light: '#F2F9FF',
  dark: ''
}

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

export const border = {
  default: `1px solid ${color.border.default}`
} as const

export const radius = {
  none: '0px',
  xs: '2px',
  sm: '4px',
  md: '8px',
  lg: '12px',
  xl: '16px'
} as const

export const typography = {} as const
