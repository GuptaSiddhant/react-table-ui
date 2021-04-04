import * as React from 'react'

import useReactTableUI from '../logic/useReactTableUI'
import {
  useHandleTableSetterRef,
  UseTableSetterRefProps
} from '../logic/useTableSetterRef'

import createClassName, { commonClassName } from '../utilities/createClassName'
import useStyleSheet from '../utilities/useStylesheet'
import { DataType, ReactTableUIProps } from '../types'

import TitleBar from './TitleBar'
import Table from './Table'
import Pagination from './Pagination'

const ReactTableUI = <Data extends DataType>({
  tableSetterRef,
  ...tableProps
}: ReactTableUIProps<Data> & {
  tableSetterRef?: React.RefObject<UseTableSetterRefProps<Data>>
}): JSX.Element => {
  // Create Table's context
  const context = useReactTableUI(tableProps)
  // Add styles to DOM
  useStyleSheet()
  // Add setters to ref
  useHandleTableSetterRef(context, tableSetterRef)

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
