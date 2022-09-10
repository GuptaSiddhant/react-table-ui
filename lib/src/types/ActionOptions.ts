import type { ReactNode } from 'react'

import type { TableContext, DataType, Row } from '.'

/** Type interface of actions in table.
 * @category Options */
export interface ActionOptions<Data extends DataType> {
  /** Actions available for each row. */
  singleRowActions?: SingleRowAction<Data>[]

  /** Actions available when multiple rows are selected. */
  multiRowActions?: MultiRowAction<Data>[]

  /** Actions available for the whole table. */
  tableActions?: TableAction<Data>[]

  /** Action to take table in fullscreen mode.
   * @default true */
  fullscreenAction?:
    | boolean
    | {
        /** Indicator when fullscreen can be requested for table.
         * @category Component */
        enterFullscreenIndicator?: ReactNode
        /** Indicator when table can exit the fullscreen mode.
         * @category Component */
        exitFullscreenIndicator?: ReactNode
      }
}

interface CommonTableAction {
  /** Unique ID of each action. */
  id: string
  /** Content of the action. Preferably an icon / icon+label / label. */
  children: ReactNode
  /** Tooltip of the action */
  tooltip?: string
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
}

export default ActionOptions
