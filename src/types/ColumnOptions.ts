import type {
  IdType,
  UseColumnOrderState,
  UseResizeColumnsOptions,
  UseResizeColumnsState
} from 'react-table'
import type { DataType, StateChangeHandler } from './DataType'

/** Type interface for Column options. */
export interface ColumnOptions<Data extends DataType>
  extends UseResizeColumnsOptions<Data> {
  /** Initial settings of row-select. */
  initialState?: Partial<ColumnState<Data>>

  /** Disable columns ordering. @default false */
  disableOrdering?: boolean

  /** Disable columns resizing. @default false */
  disableResizing?: boolean

  /** Reset hidden columns when columns is changed. @default true */
  autoResetHiddenColumns?: boolean

  /** Callback executed when rows are selected or deselected.
   *  The function must be wrapped in useCallback hook. */
  onStateChange?: StateChangeHandler<ColumnState<Data>>

  // ----------
  // Components
}

/** Type interface for Column options state 
 * {
 *  columnResizing: {
        startX?: number;
        columnWidth: number;
        headerIdWidths: Record<string, number>;
        columnWidths: any;
        isResizingColumn?: string;
    },
    columnOrder: Array<IdType<D>>,
    hiddenColumns: Array<IdType<D>>,
 * }   
 */
export interface ColumnState<Data extends DataType>
  extends UseColumnOrderState<Data>,
    UseResizeColumnsState<Data> {
  /** Hide columns by providing column's ID in an array. */
  hiddenColumns: IdType<Data>[]
}

export default ColumnOptions
