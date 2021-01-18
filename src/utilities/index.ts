import { DataType, ReactTableUIProps } from 'utilities/interface'

export const createClassName = (className: string) => '' + className

export const createDefaultColumns = <Data extends DataType>(data: Data[]) => {
  const uniqueKeys = Object.keys(Object.assign({}, ...data))
  const columns: ReactTableUIProps<Data>['columns'] = uniqueKeys
    .filter((key) => key !== 'subRows')
    .map((key) => ({
      accessor: key,
      Header: key
    }))
  return columns
}
