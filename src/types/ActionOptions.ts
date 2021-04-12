import type { ReactNode } from 'react'
import type { Row } from 'react-table'

import type { TableContext, DataType } from '.'

/** Type interface of actions in table.
 * @category Options */
export interface ActionOptions<Data extends DataType> {
  /** Actions available for each row. */
  singleRowActions?: SingleRowAction<Data>[]

  /** Actions available when multiple rows are selected. */
  multiRowActions?: MultiRowAction<Data>[]

  /** Actions available for the whole table. */
  tableActions?: TableAction<Data>[]
}

interface CommonTableAction {
  /** Unique ID of each action. */
  id: string
  /** Content of the action */
  label: string
  /** Icon representing the action. */
  icon?: ReactNode
  /** Action is disabled.
   * @default false */
  disabled?: boolean
}
export interface SingleRowAction<Data extends DataType>
  extends CommonTableAction {
  /** Callback executed when action is clicked. */
  onClick: (data: Data, row: Row<Data>) => void
}

export interface MultiRowAction<Data extends DataType>
  extends CommonTableAction {
  /** Callback executed when action is clicked. */
  onClick: (data: Data[], rows: Row<Data>[]) => void
}

export interface TableAction<Data extends DataType> extends CommonTableAction {
  /** Callback executed when action is clicked. */
  onClick: (instance: TableContext<Data>) => void
  icon: ReactNode
}

export default ActionOptions
