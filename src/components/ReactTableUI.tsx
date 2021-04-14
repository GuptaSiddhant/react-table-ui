import * as React from 'react'
import { TableInstance } from 'react-table'

import useReactTableUI from '../logic/useReactTableUI'
import useTheme from '../logic/useTheme'
import createClassName, { commonClassName } from '../utilities/createClassName'
import { DataType, ReactTableUIProps } from '../types'

import TitleBar from './TitleBar'
import Table from './Table'
import Pagination from './Pagination'

/**
 * React Table UI
 * ---
 *
 * Styled table with all things configured.
 *
 * @category Component
 */
const ReactTableUI = <Data extends DataType>({
  tableInstanceRef,
  ...tableProps
}: ReactTableUIProps<Data> & {
  tableInstanceRef?: React.RefObject<TableInstance<Data>>
}): JSX.Element => {
  // Internal ref for table
  const tableRef = React.useRef<HTMLDivElement>(null)

  // Add styles to DOM
  useTheme(tableProps.themeOptions)

  // Create Table's context
  const context = useReactTableUI(tableProps, tableRef)

  // Set TableInstance to tableInstanceRef
  React.useImperativeHandle(tableInstanceRef, () => context.tableInstance)

  const { borderless = false } = context.tableProps.tableOptions || {}

  return (
    <div
      ref={tableRef}
      className={createClassName(
        commonClassName,
        borderless ? '' : 'withBorder'
      )}
    >
      <TitleBar {...context} />
      <Table {...context} />
      <Pagination {...context} />
    </div>
  )
}

export default ReactTableUI
