// import type { FC } from 'react'
import type {
  UseRowStateOptions,
  UseRowStateState,
  UseRowStateLocalState,
  Row,
  Cell
} from './ReactTable'
import type { DataType, StateChangeHandler } from './DataType'

/** Type interface for RowState options.
 * @category Options */
export interface RowStateOptions<Data extends DataType>
  extends UseRowStateOptions<Data> {
  /** Initial settings of row-select.
   * @example 
   * ```
   * { rowState: { [rowId]: { cellState: { [columnId]: {} } } } }
   * ```
   */
  initialState?: Partial<UseRowStateState<Data>>

  /** Callback executed when rows are selected or deselected.
   *  The function must be wrapped in useCallback hook. */
  onStateChange?: StateChangeHandler<UseRowStateState<Data>>

  /** This function should return the initial state for a row.
   *  @default row => ({}) */
  initialRowStateAccessor?: (row: Row<Data>) => UseRowStateLocalState<Data>

  /** This function should return the initial state for a cell.
   *  @default cell => ({}) */
  initialCellStateAccessor?: (cell: Cell<Data>) => UseRowStateLocalState<Data>

  /** Disable row-state management table.
   * @default false */
  disableRowState?: boolean

  /** Reset row-state when data changes.
   * @default true */
  autoResetRowState?: boolean

  // getResetRowStateDeps: (instance: TableInstance<Data>) => any[]
}

export default RowStateOptions
