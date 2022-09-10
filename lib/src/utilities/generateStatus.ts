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
  const locale = tableProps.localeOptions?.locale
  const {
    loading: loadingText = 'Loading',
    noRecords: noRecordsText = 'No records',
    total: totalText = 'Total',
    records: recordsText = 'records',
    showing: showingText = 'Showing',
    of: ofText = 'of'
  } = tableProps.localeOptions?.text || {}

  const selectedRowCount = Object.keys(selectedFlatRows).length

  if (showLoadingStatus && loading) return loadingText + '...'

  const statuses: string[] = []

  // row count
  let rowCountStatus = ''
  if (rows.length === 0) {
    rowCountStatus = noRecordsText
  } else if (disablePagination) {
    rowCountStatus = `${totalText} ${rows.length.toLocaleString(
      locale
    )} ${recordsText}`
  } else {
    const totalResults = manualPagination
      ? recordCount?.toLocaleString(locale) ||
        `~${(pageCount * pageSize).toLocaleString(locale)}`
      : rows.length.toLocaleString(locale)
    const startRow = (pageIndex * pageSize + 1).toLocaleString(locale)
    const endRow = (manualPagination
      ? (pageIndex + 1) * pageSize
      : pageIndex * pageSize + page.length
    ).toLocaleString(locale)

    rowCountStatus = `${showingText} ${startRow}-${endRow} ${ofText} ${totalResults} ${recordsText}`
  }
  statuses.push(rowCountStatus)

  if (selectedRowCount > 0) {
    statuses.push(`${selectedRowCount} selected`)
  }

  return statuses.join(' • ')
}

export default generateStatus
