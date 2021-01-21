import type { Column } from 'react-table'
import type { DataType } from './interface'

export const createClassName = (className: string) => '' + className

export const createDefaultColumns = <Data extends DataType>(
  data: Data[]
): Column<Data>[] => {
  const uniqueKeys = Object.keys(Object.assign({}, ...data))
  const columns: Column<Data>[] = uniqueKeys
    .filter((key) => key !== 'subRows')
    .map((key) => ({
      accessor: key,
      Header: key
    }))
  return columns
}
