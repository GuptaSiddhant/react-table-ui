import 'regenerator-runtime/runtime'
import * as React from 'react'
import { useAsyncDebounce } from 'react-table'

import Button from '../../common/Button'
import Icon from '../../common/Icon'
import type { DataType, UseGlobalFiltersInstanceProps } from '../../types'
import useTableContext from '../../context'

export default function GlobalFilter<Data extends DataType>(): JSX.Element {
  const context = useTableContext<Data>()
  const {
    globalFilterOptions = {},
    title = 'Table',
    localeOptions: { text } = {}
  } = context.tableProps

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
    disableGlobalFilter = false,
    defaultVisibleGlobalFilter = false
  } = globalFilterOptions

  const [isGlobalFilterVisible, setIsGlobalFilterComponent] = React.useState(
    defaultVisibleGlobalFilter
  )

  const showGlobalFilterComponent = React.useCallback(
    () => setIsGlobalFilterComponent(true),
    []
  )
  const hideGlobalFilterComponent = React.useCallback(() => {
    setGlobalFilter(undefined)
    setIsGlobalFilterComponent(false)
  }, [])

  const searchText = `${text?.search || 'Search'} ${
    typeof title === 'string' ? title : ''
  }`

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
          <Button
            title={text?.closeSearch || 'Close search'}
            onClick={hideGlobalFilterComponent}
          >
            <Icon name='x' />
          </Button>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <div className='title'>{title}</div>
          {!disableGlobalFilter && (
            <Button title={searchText} onClick={showGlobalFilterComponent}>
              <Icon name='search' />
            </Button>
          )}
        </React.Fragment>
      )}
      <div className='separator' />
    </div>
  )
}

export interface GlobalFilterProps<Data extends DataType>
  extends UseGlobalFiltersInstanceProps<Data> {
  globalFilterValue: string
  placeholder: string
}

// Define a default UI for filtering
export function DefaultGlobalFilter<Data extends DataType>({
  globalFilterValue = '',
  setGlobalFilter,
  placeholder
}: GlobalFilterProps<Data>) {
  const onChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined)
  }, 200)

  return (
    <input
      type='search'
      value={globalFilterValue}
      autoFocus
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
    />
  )
}
