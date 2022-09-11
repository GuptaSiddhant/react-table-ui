import * as React from 'react'
import clsx from '../utilities/clsx'
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
export default function Table<Data extends DataType>(
  props: TableContext<Data> & React.HTMLAttributes<HTMLDivElement>
) {
  const { tableInstance, tableProps, className = '' } = props
  const { getTableProps, rows } = tableInstance
  const {
    loadingOptions = {},
    data = [],
    localeOptions: { text } = {}
  } = tableProps

  const {
    loading = false,
    Component: LoadingComponent = <Loader text={text?.loading} />,
    backgroundLoading = true
  } = loadingOptions

  const showLoading = React.useMemo(
    () => (backgroundLoading ? (data.length === 0 ? loading : false) : loading),
    [data, loading, backgroundLoading]
  )

  const [ref, { scrollPosX, scrollPosY }] = useScrollPosition()

  return (
    <div
      {...getTableProps()}
      aria-rowcount={rows.length}
      className={clsx(
        'Table',
        'sticky',
        className,
        scrollPosX > 0 && 'scrollX',
        scrollPosY > 0 && 'scrollY'
      )}
      ref={ref}
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

function Loader({ text }: { text?: string }) {
  return <div className='loader'>{text || 'Loading'}...</div>
}
