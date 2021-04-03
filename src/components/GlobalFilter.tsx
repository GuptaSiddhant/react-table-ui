import * as React from 'react'
import { useAsyncDebounce } from 'react-table'
import type { UseGlobalFiltersInstanceProps } from 'react-table'
import { TableContext, DataType } from '../types'
import IconButton from './IconButton'
import createClassName from '../utilities/createClassName'

// Define a default UI for filtering
export const DefaultGlobalFilter = <Data extends DataType>({
  preGlobalFilteredRows,
  globalFilterValue,
  setGlobalFilter
}: UseGlobalFiltersInstanceProps<Data> & { globalFilterValue: string }) => {
  const count = preGlobalFilteredRows.length
  const [value, setValue] = React.useState(globalFilterValue)
  const onChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined)
  }, 200)

  return (
    <input
      value={value || ''}
      autoFocus
      onChange={(e) => {
        setValue(e.target.value)
        onChange(e.target.value)
      }}
      placeholder={`${count} records...`}
      style={{
        fontSize: '1.1rem',
        border: '0'
      }}
    />
  )
}

const GlobalFilter = <Data extends DataType>(context: TableContext<Data>) => {
  const {
    rows,
    state: { globalFilter },
    setGlobalFilter,
    flatRows,
    globalFilteredFlatRows,
    globalFilteredRows,
    globalFilteredRowsById,
    preGlobalFilteredFlatRows,
    preGlobalFilteredRows,
    preGlobalFilteredRowsById,
    rowsById
  } = context.tableInstance
  const { globalFilterOptions = {}, title = 'Table' } = context.tableProps

  const {
    Component: CustomGlobalFilter = DefaultGlobalFilter,
    disableGlobalFilter = false
  } = globalFilterOptions

  const globalFilterProps: UseGlobalFiltersInstanceProps<Data> & {
    globalFilterValue: string
  } = {
    globalFilterValue: globalFilter,
    flatRows,
    globalFilteredFlatRows,
    globalFilteredRows,
    globalFilteredRowsById,
    preGlobalFilteredFlatRows,
    preGlobalFilteredRows,
    preGlobalFilteredRowsById,
    rows,
    rowsById,
    setGlobalFilter
  }

  const [isGlobalFilterVisible, setIsGlobalFilterComponent] = React.useState(
    false
  )

  const showGlobalFilterComponent = React.useCallback(
    () => setIsGlobalFilterComponent(true),
    []
  )
  const hideGlobalFilterComponent = React.useCallback(
    () => setIsGlobalFilterComponent(false),
    []
  )

  const searchText = `Search ${title}`

  const Title = () => <div className='title'>{title}</div>

  return disableGlobalFilter ? (
    <Title />
  ) : (
    <React.Fragment>
      <div className='Search'>
        {isGlobalFilterVisible ? (
          <div className={createClassName('GlobalFilter')}>
            <IconButton title={searchText} onClick={hideGlobalFilterComponent}>
              ❌
            </IconButton>
            <CustomGlobalFilter {...globalFilterProps} />
          </div>
        ) : (
          <IconButton title={searchText} onClick={showGlobalFilterComponent}>
            🔍
          </IconButton>
        )}
      </div>

      {isGlobalFilterVisible ? null : <div className='title'>{title}</div>}
    </React.Fragment>
  )
}

export default GlobalFilter
