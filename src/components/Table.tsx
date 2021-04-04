import * as React from 'react'
import createClassName from '../utilities/createClassName'
import type { DataType, TableContext } from '../types'
import Head from '../components/Head'
import Body from '../components/Body'
import Foot from '../components/Foot'

const Loader: React.FC = () => <div className='loader'>Loading...</div>

const Table = <Data extends DataType>(
  props: TableContext<Data> & React.HTMLAttributes<HTMLDivElement>
) => {
  const { tableInstance, tableProps, className = '', ...htmlAttributes } = props

  const { getTableProps, rows } = tableInstance
  const { loadingOptions = {}, data = [] } = tableProps

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

  return (
    <div
      {...getTableProps()}
      {...htmlAttributes}
      aria-rowcount={rows.length}
      className={createClassName('Table', 'sticky', className)}
    >
      {showLoading ? (
        LoadingComponent
      ) : (
        <React.Fragment>
          <Head {...{ tableProps, tableInstance }} />
          <Body {...{ tableProps, tableInstance }} />
          <Foot {...{ tableProps, tableInstance }} />
        </React.Fragment>
      )}
    </div>
  )
}

export default Table
