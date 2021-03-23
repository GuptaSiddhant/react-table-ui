import type { ReactNode } from 'react'

/** Type interface for loading options. */
export interface LoadingOptions {
  /** Loading state. @default false */
  isLoading?: boolean

  /** If true, loading is done in background.
   * Loading indicator is not shown if there is data on screen.
   * @default true */
  backgroundLoading?: boolean

  /** Loading status is shown in status bar @default true */
  showLoadingStatus?: boolean

  // ----------
  // Components

  /** Component rendered during loading. @default Spinner */
  Component?: ReactNode
}

export interface FreezeOptions {
  /** @default true */
  header?: boolean

  /** @default true */
  footer?: boolean
}
