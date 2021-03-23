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
  const { disablePagination, fetchData, manualPagination } = paginationOptions
  React.useEffect(() => {
    if (!disablePagination && manualPagination && fetchData)
      fetchData({ pageIndex, pageSize })
  }, [fetchData, pageIndex, pageSize, disablePagination, manualPagination])
}

export default useManualPagination
