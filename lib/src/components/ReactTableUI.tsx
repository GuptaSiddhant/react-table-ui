import * as React from 'react'

import useReactTableUI from '../logic/useReactTableUI'
import useTheme from '../logic/useTheme'
import createClassName, { commonClassName } from '../utilities/createClassName'
import type { DataType, ReactTableUIProps, TableInstance } from '../types'

import TitleBar from './TitleBar'
import Table from './Table'
import StatusBar from './StatusBar'
import Modal from './Modal'

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
  useTheme(tableProps)

  // Create Table's context
  const context = useReactTableUI(tableProps, tableRef)

  // Set TableInstance to tableInstanceRef
  React.useImperativeHandle(tableInstanceRef, () => context.tableInstance)

  const { borderless = false } = context.tableProps.styleOptions || {}

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
      <StatusBar {...context} />
      <Modal {...context} />
    </div>
  )
}

export default ReactTableUI
