import * as React from 'react'
import { createClassName } from '../utilities'
import type { DataType, ElementRef, TableContext } from '../utilities/interface'

const stylesPagination: React.CSSProperties = {
  height: '100%',
  width: '100%',
  border: '1px solid #ddd',
  boxSizing: 'border-box'
}

const Pagination = <Data extends DataType>(
  props: TableContext<Data>,
  ref: ElementRef
): JSX.Element => {
  const {
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
  const isLoading = props.tableProps.loadingOptions?.isLoading
  return (
    <div
      ref={ref}
      className={createClassName('pagination' + (isLoading ? ' loading' : ''))}
      style={stylesPagination}
    >
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

export default React.forwardRef<HTMLDivElement, any>(Pagination)
