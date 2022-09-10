// Column order
// Left sticky // Table columns // Right sticky
// -4 -3 -2 -1 // 0 0 0 0 0 0 0 // 1 2 3 4 5 6

import { Column, HeaderGroup, IdType } from 'react-table'
import { DataType } from '../types'

interface SystemColumn {
  id: string
  order: number
}

const selectionColumn: SystemColumn = {
  id: 'selection',
  order: -2
}
const expanderColumn: SystemColumn = {
  id: 'expander',
  order: -1
}
const actionColumn: SystemColumn = {
  id: 'action',
  order: 1
}

const systemColumns = {
  selection: selectionColumn,
  expander: expanderColumn,
  action: actionColumn
} as const

const allSystemColumnsId = Object.values(systemColumns).map((col) => col.id)

const leftSystemColumnsId = Object.values(systemColumns)
  .filter(({ order }) => order < 0)
  .sort((a, b) => a.order - b.order)
  .map(({ id }) => id)

const rightSystemColumnsId = Object.values(systemColumns)
  .filter(({ order }) => order > 0)
  .sort((a, b) => a.order - b.order)
  .map(({ id }) => id)

export const checkIfSystemColumn = <Data extends DataType>(
  column: HeaderGroup<Data> | string
) =>
  allSystemColumnsId.includes(
    typeof column === 'string' ? column : column.placeholderOf?.id || column.id
  )

export const fixColumnOrder = <Data extends DataType>(
  columnOrder: IdType<Data>[] = [],
  allColumns: Column<Data>[]
): IdType<Data>[] => {
  const middleColumnsId = columnOrder.filter(
    (id) => !allSystemColumnsId.includes(id)
  )
  const missingColumnId = allColumns
    .filter(
      ({ id, accessor }) =>
        !middleColumnsId.some((cId) => cId === id || cId === accessor)
    )
    .map(({ id, accessor }) => id || accessor) as string[]

  return [
    ...leftSystemColumnsId,
    ...middleColumnsId,
    ...missingColumnId,
    ...rightSystemColumnsId
  ]
}

export default systemColumns
