import * as React from 'react'
import createClassName from '../utilities/createClassName'
import type { DataType, TableContext } from '../types'
import Button from '../common/Button'
import generateStatus from '../utilities/generateStatus'
import Icon from '../common/Icon'

/**
 * StatusBar
 * @category Component
 */
const StatusBar = <Data extends DataType>(
  context: TableContext<Data>
): JSX.Element | null => {
  const { statusBar = true } = context.tableProps.styleOptions || {}
  const {
    Component,
    firstPageIndicator = <Icon name='chevrons-left' />,
    previousPageIndicator = <Icon name='chevron-left' />,
    nextPageIndicator = <Icon name='chevron-right' />,
    lastPageIndicator = <Icon name='chevrons-right' />
  } = context.tableProps.paginationOptions || {}
  const status = generateStatus(context)
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
  } = context.tableInstance

  const loading: boolean = !!context.tableProps.loadingOptions?.loading

  const showPagination = pageOptions.length > 1

  if (!statusBar) return null
  return (
    <div className={createClassName('StatusBar', loading ? 'loading' : '')}>
      {status && <div className='Status'>{status}</div>}
      <div className='spacer' />
      {showPagination ? (
        Component ? (
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
              loading
            }}
          />
        ) : (
          <div className='Pagination'>
            <Button
              onClick={() => gotoPage(0)}
              disabled={!canPreviousPage}
              title='First page'
            >
              {firstPageIndicator}
            </Button>
            <Button
              onClick={() => previousPage()}
              disabled={!canPreviousPage}
              title='Previous page'
            >
              {previousPageIndicator}
            </Button>
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
            <Button
              onClick={() => nextPage()}
              disabled={!canNextPage}
              title='Next page'
            >
              {nextPageIndicator}
            </Button>
            <Button
              onClick={() => gotoPage(pageCount - 1)}
              disabled={!canNextPage}
              title='Last page'
            >
              {lastPageIndicator}
            </Button>
          </div>
        )
      ) : null}
    </div>
  )
}

export default StatusBar
