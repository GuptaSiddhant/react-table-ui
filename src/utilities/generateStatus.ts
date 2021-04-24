import type { DataType, TableContext } from '../types'

const generateStatus = <Data extends DataType>({
  tableProps,
  tableInstance
}: TableContext<Data>) => {
  const { loading = false, showLoadingStatus = true } =
    tableProps.loadingOptions || {}
  const { disablePagination = false, manualPagination = false, recordCount } =
    tableProps.paginationOptions || {}
  const {
    page,
    rows,
    pageCount,
    selectedFlatRows,
    state: { pageSize, pageIndex }
  } = tableInstance

  const selectedRowCount = Object.keys(selectedFlatRows).length

  if (showLoadingStatus && loading) return 'Loading...'

  const statuses: string[] = []

  // row count
  let rowCountStatus = ''
  if (rows.length === 0) {
    rowCountStatus = 'No records.'
  } else if (disablePagination) {
    rowCountStatus = `Total ${rows.length} rows`
  } else if (manualPagination) {
    const totalResults = recordCount || `~${pageCount * pageSize}`
    const startRow = pageIndex * pageSize + 1
    const endRow = (pageIndex + 1) * pageSize
    rowCountStatus = `Showing ${startRow}-${endRow} of ${totalResults} records`
  } else {
    const totalResults = rows.length.toLocaleString()
    const startRow = pageIndex * pageSize + 1
    const endRow = pageIndex * pageSize + page.length
    rowCountStatus = `Showing ${startRow}-${endRow} of ${totalResults} records`
  }
  statuses.push(rowCountStatus)

  if (selectedRowCount > 0) {
    statuses.push(`${selectedRowCount} selected`)
  }

  return showLoadingStatus && loading ? 'Loading...' : statuses.join(' • ')
}

export default generateStatus
