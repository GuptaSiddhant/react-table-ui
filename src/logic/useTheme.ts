import type { ThemeOptions } from '../types'
import useStylesheet from '../utilities/useStylesheet'
import { pxToEm } from '../styles/theme'
import deepMerge from '../utilities/deepMerge'
import { commonClassName } from '../utilities/createClassName'

const accent = {
  default: '#096ED1',
  lighter: '#F2F9FF',
  darker: ''
}

const defaultThemeOptions: ThemeOptions = {
  colors: {
    accent,
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
      selected: accent.lighter,
      inverse: '#000000',
      none: 'transparent'
    },
    border: {
      primary: '#bfbfbf',
      selected: accent.default,
      inverse: '#1a1a1a',
      none: 'transparent'
    }
  },
  roundedCorners: true,
  spacing: {
    none: 0,
    xs: 2,
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16
  }
}

const useTheme = (options: ThemeOptions = {}) => {
  const mergedThemeOptions = deepMerge(defaultThemeOptions, options)

  // Colors
  let colorsCSS = ''
  Object.entries(mergedThemeOptions.colors || {}).forEach(
    ([category, colors]) => {
      Object.entries(colors || {}).forEach(([name, color]) => {
        if (color) {
          colorsCSS += `--color-${category}-${name}: ${color};\n`
        }
      })
    }
  )

  // Spacing
  let spacingCSS = ''
  const disableRadius = !mergedThemeOptions.roundedCorners
  Object.entries(mergedThemeOptions.spacing || {}).forEach(([type, val]) => {
    if (val) {
      spacingCSS += `--spacing-${type}: ${pxToEm(val)};\n`
      spacingCSS += `--radius-${type}: ${disableRadius ? 0 : pxToEm(val)};\n`
    }
  })

  const themeCSS = `.${commonClassName} {
    ${colorsCSS}
    ${spacingCSS}
  }`

  useStylesheet(themeCSS)
}

export default useTheme
