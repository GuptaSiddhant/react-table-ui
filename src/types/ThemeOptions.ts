// import type { UseTableOptions, TableState } from 'react-table'

type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>
}

/** Type interface of Theme specific options. This overrides the internal CSS.
 * @category Options */
export interface ThemeOptions {
  /** Colors for the Table */
  colors?: DeepPartial<ThemeColors>
  /** Spacing used throughout the table
   * to determine padding, margins and radii. */
  spacing?: Partial<ThemeSpacing>
  /** If enabled, table and its components will have
   * rounded corners calculated from theme's spacing.
   * @default true */
  roundedCorners?: boolean
}

export default ThemeOptions

export interface ThemeColors {
  text: ThemeColor
  background: ThemeColor
  border: ThemeColor
  accent: {
    default: string
    lighter: string
    darker: string
  }
}

export interface ThemeColor {
  primary: string
  secondary: string
  disabled: string
  inverse: string
  selected: string
  none: string
}

export interface ThemeSpacing<T = number> {
  /** @default 0 */
  none: T
  /** @default 2 */
  xs: T
  /** @default 4 */
  sm: T
  /** @default 8 */
  md: T
  /** @default 12 */
  lg: T
  /** @default 16 */
  xl: T
}
