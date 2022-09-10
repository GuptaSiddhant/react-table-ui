import * as React from 'react'
import createClassName from '../utilities/createClassName'
import type { DataType, TableContext } from '../types'
import Head from '../components/Head'
import Body from '../components/Body'
import Foot from '../components/Foot'
import useScrollPosition from '../logic/useScrollPosition'

/**
 * Table
 *
 * @category Component
 */
const Table = <Data extends DataType>(
  props: TableContext<Data> & React.HTMLAttributes<HTMLDivElement>
) => {
  const { tableInstance, tableProps, className = '', ...htmlAttributes } = props
  const { getTableProps, rows } = tableInstance
  const {
    loadingOptions = {},
    data = [],
    localeOptions: { text } = {}
  } = tableProps

  const Loader: React.FC = () => (
    <div className='loader'>{text?.loading || 'Loading'}...</div>
  )

  const {
    loading = false,
    Component: LoadingComponent = Loader,
    backgroundLoading = true
  } = loadingOptions

  const showLoading = React.useMemo(
    () => (backgroundLoading ? (data.length === 0 ? loading : false) : loading),
    [data, loading, backgroundLoading]
  )

  const [tableRef, { scrollPosX, scrollPosY }] = useScrollPosition()

  return (
    <div
      {...getTableProps()}
      {...htmlAttributes}
      aria-rowcount={rows.length}
      className={createClassName(
        'Table',
        'sticky',
        className,
        scrollPosX > 0 ? 'scrollX' : '',
        scrollPosY > 0 ? 'scrollY' : ''
      )}
      ref={tableRef}
    >
      {showLoading ? (
        <>{LoadingComponent}</>
      ) : (
        <>
          <Head {...{ tableProps, tableInstance }} />
          <Body {...{ tableProps, tableInstance }} />
          <Foot {...{ tableProps, tableInstance }} />
        </>
      )}
    </div>
  )
}

export default Table
