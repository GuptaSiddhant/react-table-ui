// import type { UseTableOptions, TableState } from 'react-table'

import type ThemeOptions from './ThemeOptions'

/** Type interface of Table specific options.
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
