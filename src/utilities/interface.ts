import type { ReactNode } from 'react'
import type { Column, TableInstance, UseSortByOptions } from 'react-table'

export type DataType = Record<string, any>

/** Props supported by React Table UI */
export interface ReactTableUIProps<Data extends DataType> {
  /** Memoised data-array of the table.
   * The data object should be structured as column:value pair. */
  data: Data[]

  /** Memoised column definitions of the table. (Optional, can be generated from keys in `data` object).
   * Each column object can define its data accessor, properties and behavior. */
  columns?: Column<Data>[]

  /** Stick headers to the top and footers to the bottom while scrolling. @default true */
  stickyHeaders?: boolean | { header?: boolean; footer?: boolean }

  /** Manages sorting of the table.
   * @see [RT useSortBy API - Table options](https://react-table.tanstack.com/docs/api/useSortBy#table-options) */
  sortByOptions?: UseSortByOptions<Data> & SortingOptions
}

export interface TableContext<Data extends DataType> {
  tableInstance: TableInstance<Data>
  tableProps: ReactTableUIProps<Data>
}

export type ElementRef<E extends Element = HTMLDivElement> =
  | ((instance: E | null) => void)
  | React.RefObject<E>
  | null
  | undefined

interface SortingOptions {
  defaultIndicator?: ReactNode
  ascendingIndicator?: ReactNode
  descendingIndicator?: ReactNode
}
