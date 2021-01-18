import type { Column, TableInstance } from 'react-table'

export type DataType = Record<string, any>

/** Props supported by React Table UI */
export interface ReactTableUIProps<Data extends DataType> {
  /** Memoised data-array of the table.
   * The data object should be structured as column:value pair. */
  data: Data[]

  /** Memoised column definitions of the table. (Optional, can be generated from keys in `data` object).
   * Each column object can define its data accessor, properties and behavior. */
  columns?: Column<DataType>[]

  /**  */
}

export interface TableComponentProps<Data extends DataType> {
  tableInstance: TableInstance<Data>
  tableProps: ReactTableUIProps<Data>
}
