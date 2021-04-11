// -----------------
import { useRef } from 'react'
import type { TableInstance } from 'react-table'

// Import components
import ReactTableUI from './components/ReactTableUI'
import Table from './components/Table'
import Pagination from './components/Pagination'

// Import helpers
import useReactTableUI from './logic/useReactTableUI'

// Import types
import { DataType } from './types'

/**
 * Hook to generate a table ref which can be passed to ReactTableUI component.
 * This current prop of ref holds the table's instance.
 * {@link TableInstance}
 */
const useTableInstanceRef = <Data extends DataType>() =>
  useRef<TableInstance<Data>>(null)

// -----------------

// Export components

export { ReactTableUI, Table, Pagination }

// Export helpers
export { useReactTableUI, useTableInstanceRef }

// Export types
export * from './types'

// -----------------
