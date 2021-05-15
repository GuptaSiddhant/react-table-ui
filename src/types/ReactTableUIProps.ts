import type { ReactNode } from 'react'
import type { Column } from './ReactTable'
import type DataType from './DataType'
import type SortingOptions from './SortingOptions'
import type FiltersOptions from './FiltersOptions'
import type GlobalFilterOptions from './GlobalFilterOptions'
import type ExpandedOptions from './ExpandedOptions'
import type RowSelectOptions from './RowSelectOptions'
import type PaginationOptions from './PaginationOptions'
import type ColumnOptions from './ColumnOptions'
import type RowStateOptions from './RowStateOptions'
import type TableOptions from './TableOptions'
import type ActionOptions from './ActionOptions'
import type StyleOptions from './StyleOptions'
import type { LoadingOptions, FreezeOptions } from './OtherOptions'

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

  /** Add and manage actions in that Table. */
  actionOptions?: ActionOptions<Data>

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

  /** Manage all style preferences related options. */
  styleOptions?: StyleOptions
}

export default ReactTableUIProps
