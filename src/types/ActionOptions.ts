import { ReactNode } from 'react'
import type {} from 'react-table'

import { DataType } from './DataType'

/** Type interface of actions in table.
 * @category Options */
export interface ActionOptions<Data extends DataType> {
  /** Actions available for each row. */
  singleRowActions?: TableAction<Data>[]
}

export interface TableAction<Data extends DataType> {
  /** Unique ID of each action. */
  id: string
  /** Content of the action */
  children: ReactNode
  /** Callback executed when action is clicked. */
  onClick: (data: Data) => void
}

export default ActionOptions
