import { useMemo } from 'react'
import type { Column } from 'react-table'
import type { DataType } from '../types'

const useCreateDefaultColumns = <Data extends DataType>(
  data: Data[]
): Column<Data>[] =>
  useMemo(() => {
    const uniqueKeys = Object.keys(Object.assign({}, ...data))
    return uniqueKeys
      .filter((key) => !['subRows', 'subComponent'].includes(key))
      .map((key) => ({
        accessor: key,
        Header: key
      }))
  }, [data])

export default useCreateDefaultColumns;