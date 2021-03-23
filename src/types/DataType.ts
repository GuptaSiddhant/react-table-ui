import type { ReactNode } from 'react'

export interface DataType extends Record<string, any> {
  /** Select data-row by default. */
  isSelected?: boolean

  /** Always expanded data-row, regardless of state. */
  expanded?: boolean

  /** Sub rows visible when expanded. */
  subRows?: DataType[]

  /** Custom component shown when row is expanded. */
  subComponent?: ReactNode
}

export default DataType
