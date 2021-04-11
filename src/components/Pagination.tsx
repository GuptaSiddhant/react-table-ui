import * as React from 'react'
import createClassName from '../utilities/createClassName'
import type { DataType, TableContext } from '../types'
import IconButton from '../common/IconButton'
import generateStatus from '../utilities/generateStatus'

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
    lastPageIndicator = '⏭️'
  } = props.tableProps.paginationOptions || {}
  const status = generateStatus(props)
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
