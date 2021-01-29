import * as React from 'react'
import { createClassName } from '../utilities'
import type { DataType, TableContext } from '../utilities/interface'

const stylesStatus: React.CSSProperties = {
  position: 'relative',
  zIndex: 0,
  width: '100%',
  padding: '4px',
  borderTop: '1px solid'
}

const Status = <Data extends DataType>({
  tableProps,
  tableInstance
}: TableContext<Data>): JSX.Element | null => {
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
  return status !== '' ? (
    <div className={createClassName('status')} style={stylesStatus}>
      {status}
    </div>
  ) : null
}

export default Status
