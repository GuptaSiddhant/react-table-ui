import type { Column } from 'react-table'
import type { DataType } from './interface'

export const createClassName = (className: string) => 'RTUI ' + className

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

/**  Place Styles in DOM */
export const addStylesheet = (cssString: string): void => {
  const styleTagID = createClassName('styles')
  const existingStyleTag = document.getElementById(
    styleTagID
  ) as HTMLStyleElement | null

  const newStyleTag = document.createElement('style')
  newStyleTag.id = styleTagID

  const styleTag: HTMLStyleElement = existingStyleTag || newStyleTag
  styleTag.innerHTML = cssString

  if (!existingStyleTag)
    document.head.insertAdjacentElement('beforeend', styleTag)
}
