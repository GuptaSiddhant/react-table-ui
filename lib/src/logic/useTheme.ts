import type { ReactTableUIProps, ThemeOptions, DataType } from '../types'
import useStylesheet from '../utilities/useStylesheet'
import { pxToEm } from '../utilities/theme'
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
  spacing: {
    none: 0,
    xs: 2,
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16
  }
}

const useTheme = <Data extends DataType>({
  styleOptions: { roundedCorners = true, theme: themeOptions = {} } = {}
}: ReactTableUIProps<Data>) => {
  const mergedThemeOptions = deepMerge(defaultThemeOptions, themeOptions)

  // Colors
  let colorsCSS = ''
  Object.entries(mergedThemeOptions.colors || {}).forEach(
    ([category, colors]) => {
      Object.entries(colors || {}).forEach(([name, color]) => {
        if (color) {
          colorsCSS += `--${commonClassName}-color-${category}-${name}: ${color};\n`
        }
      })
    }
  )

  // Spacing
  let spacingCSS = ''
  const disableRadius = !roundedCorners
  Object.entries(mergedThemeOptions.spacing || {}).forEach(([type, val]) => {
    if (val) {
      spacingCSS += `--${commonClassName}-spacing-${type}: ${pxToEm(val)};\n`
      spacingCSS += `--${commonClassName}-radius-${type}: ${
        disableRadius ? 0 : pxToEm(val)
      };\n`
    }
  })

  const themeCSS = `:root {
    ${colorsCSS}
    ${spacingCSS}
  }`

  useStylesheet(themeCSS)
}

export default useTheme
