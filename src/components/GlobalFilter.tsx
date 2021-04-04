import * as React from 'react'
import { useAsyncDebounce } from 'react-table'
import type { UseGlobalFiltersInstanceProps } from 'react-table'
import { TableContext, DataType } from '../types'
import IconButton from '../common/IconButton'
// import createClassName from '../utilities/createClassName'

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
  const { globalFilterOptions = {}, title = 'Table' } = context.tableProps

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

  return (
    <div className='titleSearch'>
      {isGlobalFilterVisible ? (
        <React.Fragment>
          <CustomGlobalFilter {...globalFilterProps} />
          <IconButton title={searchText} onClick={hideGlobalFilterComponent}>
            ✕
          </IconButton>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Title />
          {!disableGlobalFilter && (
            <IconButton title={searchText} onClick={showGlobalFilterComponent}>
              🔍
            </IconButton>
          )}
        </React.Fragment>
      )}
    </div>
  )
}

export default GlobalFilter