import * as React from 'react'
import styled from 'styled-components'
import { createClassName } from '../utilities'
import type { DataType, TableContext } from '../utilities/interface'

const StyledStatus = styled.div`
  position: relative;
  z-index: 0;
  width: 100%;
  padding: 4px;
  border-top: 1px solid;
`

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
      if (manualPagination) {
        status = `Showing ${page.length} of ~${pageCount * pageSize} results`
      } else {
        const totalResults = rows.length.toLocaleString()
        const startRow = pageIndex * pageSize + 1
        const endRow = pageIndex * pageSize + page.length
        status = `Showing ${startRow}-${endRow} of ${totalResults} results`
      }
    }
  }
  return status !== '' ? (
    <StyledStatus className={createClassName('status')}>{status}</StyledStatus>
  ) : null
}

export default Status
