import * as React from 'react'
import createClassName from '../utilities/createClassName'
import type { DataType, TableContext } from '../types'
import IconButton from '../common/IconButton'

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
    state: { pageSize, pageIndex, selectedRowIds }
  } = tableInstance

  const selectedRowCount = Object.keys(selectedRowIds).length

  if (showLoadingStatus && isLoading) return 'Loading...'

  const statuses: string[] = []

  // row count
  let rowCountStatus = ''
  if (disablePagination) rowCountStatus = `Total ${rows.length} rows`
  else {
    if (rows.length === 0) {
      rowCountStatus = 'No records'
    } else {
      if (manualPagination) {
        rowCountStatus = `Showing ${page.length} of ~${
          pageCount * pageSize
        } records`
      } else {
        const totalResults = rows.length.toLocaleString()
        const startRow = pageIndex * pageSize + 1
        const endRow = pageIndex * pageSize + page.length
        rowCountStatus = `Showing ${startRow}-${endRow} of ${totalResults} records`
      }
    }
  }
  statuses.push(rowCountStatus)

  if (selectedRowCount > 0) {
    statuses.push(`${selectedRowCount} selected`)
  }

  return showLoadingStatus && isLoading ? 'Loading...' : statuses.join(' • ')
}

/**
 * Pagination
 * 
 * @category Component
 */
const Pagination = <Data extends DataType>(
  props: TableContext<Data>
): JSX.Element => {
  const {
    Component,
    firstPageIndicator = '⏮️',
    previousPageIndicator = '◀️',
    nextPageIndicator = '▶️',
    lastPageIndicator = '⏭️',
  } = props.tableProps.paginationOptions || {}
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

  const isLoading: boolean = !!props.tableProps.loadingOptions?.isLoading

  const showPager = pageOptions.length > 1

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
      className={createClassName('Pagination' + (isLoading ? ' loading' : ''))}
    >
      {status && <div className='Status'>{status}</div>}
      <div className='spacer' />
      {showPager && (
        <div className='Pager'>
          <IconButton
            onClick={() => gotoPage(0)}
            disabled={!canPreviousPage}
            title='First page'
          >
            {firstPageIndicator}
          </IconButton>
          <IconButton
            onClick={() => previousPage()}
            disabled={!canPreviousPage}
            title='Previous page'
          >
            {previousPageIndicator}
          </IconButton>
          <div>
            <span>Page</span>
            <input
              type='number'
              value={pageIndex + 1}
              onChange={(e) => {
                const page = e.target.value ? Number(e.target.value) - 1 : 0
                gotoPage(page)
              }}
              style={{ width: '60px' }}
              disabled={pageOptions.length <= 1}
            />
            <span>of {pageOptions.length}</span>{' '}
            {/* <select
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
          </select> */}
          </div>
          <IconButton
            onClick={() => nextPage()}
            disabled={!canNextPage}
            title='Next page'
          >
            {nextPageIndicator}
          </IconButton>
          <IconButton
            onClick={() => gotoPage(pageCount - 1)}
            disabled={!canNextPage}
            title='Last page'
          >
            {lastPageIndicator}
          </IconButton>
        </div>
      )}
    </div>
  )
}

export default Pagination
