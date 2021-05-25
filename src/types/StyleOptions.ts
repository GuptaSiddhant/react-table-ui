/** Type interface of Table-style specific options.
 * @category Options */
export interface StyleOptions {
  /** All theme related options like colors and spacing */
  theme?: ThemeOptions

  /** The table is rendered without border styling.
   *  Good for embedding in other containers.
   *  @default false */
  borderless?: boolean

  /** If enabled, table and its components will have
   * rounded corners calculated from theme's spacing.
   * @default true */
  roundedCorners?: boolean

  /** Settings for title bar (top bar).
   * Set to false, to hide the title bar.
   * @default true */
  titleBar?: boolean

  /** Settings for status bar (bottom bar).
   * Set to false, to hide the status bar.
   * @default true */
  statusBar?: boolean
}

export default StyleOptions

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
}

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
