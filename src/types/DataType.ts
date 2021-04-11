import type { ReactNode } from 'react'

export interface DataType extends Record<string, any> {
  /** Select data-row by default. */
  isSelected?: boolean

  /** Always expanded data-row, regardless of state. */
  expanded?: boolean

  /** Sub rows visible when expanded. */
  subRows?: DataType[]

  /** Custom component shown when row is expanded.
   * @category Custom Component  */
  subComponent?: ReactNode
}

export type StateChangeHandler<State> = (state: State) => void

export default DataType
