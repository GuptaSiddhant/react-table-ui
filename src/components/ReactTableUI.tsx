import * as React from 'react'
import { TableInstance } from 'react-table'

import useReactTableUI from '../logic/useReactTableUI'
import createClassName, { commonClassName } from '../utilities/createClassName'
import useStyleSheet from '../utilities/useStylesheet'
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
  // Add styles to DOM
  useStyleSheet()
  // Create Table's context
  const context = useReactTableUI(tableProps)

  // Set TableInstance to tableInstanceRef
  React.useImperativeHandle(tableInstanceRef, () => context.tableInstance)

  const { borderless = false } = context.tableProps.tableOptions || {}

  return (
    <div
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
