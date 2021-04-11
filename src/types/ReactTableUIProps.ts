import type { ReactNode } from 'react'
import type { Column } from 'react-table'
import { DataType } from './DataType'
import SortingOptions from './SortingOptions'
import FiltersOptions from './FiltersOptions'
import GlobalFilterOptions from './GlobalFilterOptions'
import ExpandedOptions from './ExpandedOptions'
import RowSelectOptions from './RowSelectOptions'
import PaginationOptions from './PaginationOptions'
import { LoadingOptions, FreezeOptions } from './OtherOptions'
import ColumnOptions from './ColumnOptions'
import RowStateOptions from './RowStateOptions'
import TableOptions from './TableOptions'

/** Props supported by React Table UI. */
export interface ReactTableUIProps<Data extends DataType> {
  /** Memoised data-array of the table.
   * The data object should always extends {@link DataType} interface. */
  data: Data[]

  /** Memoised column definitions of the table. (Optional, can be generated from keys in `data` object).
   * Each column object can define its data accessor, properties and behavior.
   * Optional - Columns can be auto-generated based on provided dataset. */
  columns?: Column<Data>[]

  /** Title of the table. 
   * @default 'Table' */
  title?: ReactNode

  /** Manage loading state of table. */
  loadingOptions?: LoadingOptions

  /** useTable Table options
   * @see [RT useTable API - Table options](https://react-table.tanstack.com/docs/api/useTable#table-options) */
  tableOptions?: TableOptions<Data>

  /** Manages sorting of the table columns.
   * @see [RT useSortBy API - Table options](https://react-table.tanstack.com/docs/api/useSortBy#table-options) */
  sortByOptions?: SortingOptions<Data>

  /** Manages filtering of the table columns.
   * @see [RT useFilters API - Table options](https://react-table.tanstack.com/docs/api/useFilters#table-options) */
  filtersOptions?: FiltersOptions<Data>

  /** Manages global filtering of the table.
   * @see [RT useGlobalFilter API - Table options](https://react-table.tanstack.com/docs/api/useGlobalFilter#table-options) */
  globalFilterOptions?: GlobalFilterOptions<Data>

  /** Manages pagination of the table.
   * @see [RT usePagination API - Table options](https://react-table.tanstack.com/docs/api/usePagination#table-options) */
  paginationOptions?: PaginationOptions<Data>

  /** Manages pagination of the table.
   * @see [RT usePagination API - Table options](https://react-table.tanstack.com/docs/api/usePagination#table-options) */
  expandedOptions?: ExpandedOptions<Data>

  /** Manages row-selection of the table.
   * @see [RT useRowSelect API - Table options](https://react-table.tanstack.com/docs/api/useRowSelect#table-options) */
  rowSelectOptions?: RowSelectOptions<Data>

  /** Manage options for column order, resize and visibility.
   * @see [RT useColumnOrder API - Table options](https://react-table.tanstack.com/docs/api/useColumnOrder#table-options)
   * @see [RT useResizeColumns API - Table options](https://react-table.tanstack.com/docs/api/useResizeColumns#table-options) */
  columnOptions?: ColumnOptions<Data>

  /** Manage options for row state.
   * @see [RT useRowState API - Table options](https://react-table.tanstack.com/docs/api/useRowState#table-options) */
  rowStateOptions?: RowStateOptions<Data>

  /** Freeze headers to the top and footers to the bottom while scrolling. */
  freezeOptions?: FreezeOptions
}

export default ReactTableUIProps
