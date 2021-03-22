import * as React from 'react'
import type { DataType, TableContext } from '../types'

/** Execute callback to fetch data
 * when working with manual pagination */
const useManualPagination = <Data extends DataType>({
  tableInstance: {
    state: { pageSize, pageIndex }
  },
  tableProps: { paginationOptions = {} }
}: TableContext<Data>) => {
  const {
    disablePagination,
    fetchMoreData,
    manualPagination
  } = paginationOptions
  React.useEffect(() => {
    if (!disablePagination && manualPagination && fetchMoreData)
      fetchMoreData({ pageIndex, pageSize })
  }, [fetchMoreData, pageIndex, pageSize, disablePagination, manualPagination])
}

export default useManualPagination
