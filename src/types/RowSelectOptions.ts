import type { FC } from 'react'
import type {
  UseRowSelectOptions,
  UseRowSelectState,
  TableToggleCommonProps,
  IdType
} from 'react-table'
import type DataType from './DataType'

/** Type interface for RowSelect options. */
export interface RowSelectOptions<Data extends DataType>
  extends UseRowSelectOptions<Data> {
  /** Initial settings of row-select.
   * @example { selectedRowIds: { [rowId]: boolean } }
   */
  initialState?: Partial<UseRowSelectState<Data>>

  /** Disable row selection. @default false */
  disableRowSelect?: boolean

  /** Key is found on the original data row, and it is true,
   *  this row will be manually selected. @default 'isSelected' */
  manualRowSelectedKey?: IdType<Data>

  /** Reset row-selection when data changes. @default true */
  autoResetSelectedRows?: boolean

  /** Allow sub-rows to be selected. @default true */
  selectSubRows?: boolean

  // ----------
  // Components

  /** Component to render to denote row selection */
  Component?: RowSelectComponent
}

export type RowSelectComponent = FC<TableToggleCommonProps>

export default RowSelectOptions
