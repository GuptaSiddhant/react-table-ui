import type { UseTableOptions, TableState } from 'react-table'

import type { DataType, StateChangeHandler } from './DataType'

/** Type interface of Table specific options. 
 * @category Options */
export interface TableOptions<Data extends DataType>
  extends Omit<UseTableOptions<Data>, 'columns' | 'data'> {
  /** Callback executed when table's state is updated.
   *  The function must be wrapped in useCallback hook. */
  onStateChange?: StateChangeHandler<TableState<Data>>

  /** The table is rendered without border styling. 
   *  Good for embedding in other containers. 
   *  @default false */
  borderless?: boolean
}

export default TableOptions
