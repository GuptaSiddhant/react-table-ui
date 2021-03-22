import * as React from 'react'
import createClassName from '../utilities/createClassName'
import type { DataType, TableContext } from '../types'

const stylesPagination: React.CSSProperties = {
  height: '100%',
  width: '100%',
  border: '1px solid #ddd',
  boxSizing: 'border-box'
}

const getStatus = <Data extends DataType>({
  tableProps,
  tableInstance
}: TableContext<Data>) => {
  const { isLoading = false, showLoadingStatus = true } =
    tableProps.loadingOptions || {}
  const { disablePagination = false, manualPagination = false } =
    tableProps.paginationOptions || {}
  const {
    page,
    rows,
    pageCount,
    state: { pageSize, pageIndex }
  } = tableInstance
  let status = ''
  if (showLoadingStatus && isLoading) status = 'Loading...'
  else {
    if (disablePagination) status = `Total ${rows.length} rows`
    else {
      if (rows.length === 0) {
        status = 'No records'
      } else {
        if (manualPagination) {
          status = `Showing ${page.length} of ~${pageCount * pageSize} records`
        } else {
          const totalResults = rows.length.toLocaleString()
          const startRow = pageIndex * pageSize + 1
          const endRow = pageIndex * pageSize + page.length
          status = `Showing ${startRow}-${endRow} of ${totalResults} records`
        }
      }
    }
  }
  return status
}

const Pagination = <Data extends DataType>(
  props: TableContext<Data>
): JSX.Element => {
  const Component = props.tableProps.paginationOptions?.Component
  const status = getStatus(props)
  const {
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize }
  } = props.tableInstance

  const isLoading: boolean = !!(props.tableProps.loadingOptions?.isLoading)

  return Component ? (
    <Component
      {...{
        page,
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        pageIndex,
        pageSize,
        isLoading,
        status
      }}
    />
  ) : (
    <div
      className={createClassName('pagination' + (isLoading ? ' loading' : ''))}
      style={stylesPagination}
    >
      {status && <span>{status}</span>}
      <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
        {'<<'}
      </button>{' '}
      <button onClick={() => previousPage()} disabled={!canPreviousPage}>
        {'<'}
      </button>{' '}
      <button onClick={() => nextPage()} disabled={!canNextPage}>
        {'>'}
      </button>{' '}
      <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
        {'>>'}
      </button>{' '}
      <span>
        Page{' '}
        <strong>
          {pageIndex + 1} of {pageOptions.length}
        </strong>{' '}
      </span>
      <span>
        | Go to page:{' '}
        <input
          type='number'
          value={pageIndex + 1}
          onChange={(e) => {
            const page = e.target.value ? Number(e.target.value) - 1 : 0
            gotoPage(page)
          }}
          style={{ width: '100px' }}
        />
      </span>{' '}
      <select
        value={pageSize}
        onChange={(e) => {
          setPageSize(Number(e.target.value))
        }}
      >
        {[10, 20, 30, 40, 50, 100].map((pageSize) => (
          <option key={pageSize} value={pageSize}>
            Show {pageSize}
          </option>
        ))}
      </select>
    </div>
  )
}

export default Pagination
