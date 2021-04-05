import * as React from 'react'
import { useAsyncDebounce } from 'react-table'
import type { UseGlobalFiltersInstanceProps } from 'react-table'
import { TableContext, DataType } from '../types'
import IconButton from '../common/IconButton'

interface GlobalFilterProps<Data extends DataType>
  extends UseGlobalFiltersInstanceProps<Data> {
  globalFilterValue: string
  placeholder: string
}

// Define a default UI for filtering
export const DefaultGlobalFilter = <Data extends DataType>({
  globalFilterValue,
  setGlobalFilter,
  placeholder
}: GlobalFilterProps<Data>) => {
  const [value, setValue] = React.useState(globalFilterValue)
  const onChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined)
  }, 200)

  return (
    <input
      type='search'
      value={value || ''}
      autoFocus
      onChange={(e) => {
        setValue(e.target.value)
        onChange(e.target.value)
      }}
      placeholder={placeholder}
    />
  )
}

const GlobalFilter = <Data extends DataType>(context: TableContext<Data>) => {
  const { globalFilterOptions = {}, title } = context.tableProps

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

  const [isGlobalFilterVisible, setIsGlobalFilterComponent] = React.useState(
    false
  )

  const showGlobalFilterComponent = React.useCallback(
    () => setIsGlobalFilterComponent(true),
    []
  )
  const hideGlobalFilterComponent = React.useCallback(() => {
    setGlobalFilter(undefined)
    setIsGlobalFilterComponent(false)
  }, [])

  const searchText = `Search ${title || 'Table'}`

  const globalFilterProps: GlobalFilterProps<Data> = {
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
    setGlobalFilter,
    placeholder: searchText
  }

  return (
    <div className='titleSearch'>
      {isGlobalFilterVisible ? (
        <React.Fragment>
          <CustomGlobalFilter {...globalFilterProps} />
          <IconButton
            title={'Close search'}
            onClick={hideGlobalFilterComponent}
          >
            ✕
          </IconButton>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <div className='title'>{title}</div>
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
