import * as React from 'react'

import useReactTableUI from '../logic/useReactTableUI'
import useGlobalFilterComponent from '../logic/useGlobalFilterComponent'
import {
  useHandleTableSetterRef,
  UseTableSetterRefProps
} from '../logic/useTableSetterRef'

import createClassName from '../utilities/createClassName'
import useStyleSheet from '../styles/useStylesheet'
import { DataType, ReactTableUIProps } from '../types'

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
  // Get instance of GlobalFilter
  const globalFilterComponent = useGlobalFilterComponent(context)

  return (
    <div className={createClassName()}>
      {globalFilterComponent}
      <Table {...context} />
      <Pagination {...context} />
    </div>
  )
}

export default ReactTableUI
