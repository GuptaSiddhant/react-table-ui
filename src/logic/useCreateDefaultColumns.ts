import { useMemo } from 'react'
import type { DataType, Column } from '../types'

const toTitleCase = (str: string) =>
  str.slice(0, 1).toUpperCase() + str.slice(1)

const useCreateDefaultColumns = <Data extends DataType>(
  data: Data[]
): Column<Data>[] =>
  useMemo(() => {
    const uniqueKeys = Object.keys(Object.assign({}, ...data))
    return uniqueKeys
      .filter((key) => !['subRows', 'subComponent'].includes(key))
      .map((key) => ({
        accessor: key,
        Header: toTitleCase(key)
      }))
  }, [data])

export default useCreateDefaultColumns
