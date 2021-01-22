import * as React from 'react'
import type { Column } from 'react-table'
import { DataType } from './interface'

type ColumnFilter = Column<DataType>['Filter']

export const DefaultColumnFilter: ColumnFilter = ({
  column: { filterValue, preFilteredRows, setFilter }
}) => {
  return (
    <input
      style={{ width: '100%' }}
      value={filterValue || ''}
      onChange={(e) => {
        setFilter(e.target.value || undefined) // Set undefined to remove the filter entirely
      }}
      placeholder={`Search ${preFilteredRows.length} records...`}
    />
  )
}
