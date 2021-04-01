import * as React from 'react'
import type { UseGlobalFiltersInstanceProps } from 'react-table'
import { useStylesheet } from '../utilities'
import createClassName from '../utilities/createClassName'
import type { DataType, TableContext } from '../types'
import Head from '../components/Head'
import Body from '../components/Body'
import Foot from '../components/Foot'
import { DefaultGlobalFilter } from './Filters'

const Loader: React.FC = () => <div className='loader'>Loading...</div>

const Table = <Data extends DataType>(
  props: TableContext<Data> & React.HTMLAttributes<HTMLDivElement>
) => {
  useStylesheet()
  const { tableInstance, tableProps, className = '', ...htmlAttributes } = props

  const {
    getTableProps,
    rows,
    state: { globalFilter },
    setGlobalFilter,
    flatRows,
    globalFilteredFlatRows,
    globalFilteredRows,
    globalFilteredRowsById,
    preGlobalFilteredFlatRows,
    preGlobalFilteredRows,
    preGlobalFilteredRowsById,
    rowsById
  } = tableInstance
  const {
    loadingOptions = {},
    data = [],
    globalFilterOptions = {}
  } = tableProps

  const {
    isLoading = false,
    Component: LoadingComponent = <Loader />,
    backgroundLoading = true
  } = loadingOptions

  const showLoading = React.useMemo(
    () =>
      backgroundLoading ? (data.length === 0 ? isLoading : false) : isLoading,
    [data, isLoading, backgroundLoading]
  )

  const {
    Component: GlobalFilter = DefaultGlobalFilter,
    disableGlobalFilter
  } = globalFilterOptions

  const globalFilterProps: UseGlobalFiltersInstanceProps<Data> & {
    globalFilterValue: string
  } = {
    globalFilterValue: globalFilter,
    flatRows,
    globalFilteredFlatRows,
    globalFilteredRows,
    globalFilteredRowsById,
    preGlobalFilteredFlatRows,
    preGlobalFilteredRows,
    preGlobalFilteredRowsById,
    rows,
    rowsById,
    setGlobalFilter
  }

  return (
    <div
      {...getTableProps()}
      {...htmlAttributes}
      aria-rowcount={rows.length}
      className={createClassName('table', 'sticky', className)}
    >
      {showLoading ? (
        LoadingComponent
      ) : (
        <React.Fragment>
          {!disableGlobalFilter && <GlobalFilter {...globalFilterProps} />}
          <Head {...{ tableProps, tableInstance }} />
          <Body {...{ tableProps, tableInstance }} />
          <Foot {...{ tableProps, tableInstance }} />
        </React.Fragment>
      )}
    </div>
  )
}

export default Table
