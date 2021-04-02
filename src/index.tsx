import useReactTableUI from './logic/useReactTableUI'

import {
  useTableSetterRef,
  UseTableSetterRefProps
} from './logic/useTableSetterRef'

import ReactTableUI from './components/ReactTableUI'
import Table from './components/Table'
import Pagination from './components/Pagination'

// Export components
export default ReactTableUI
export { Table, Pagination }

// Export helpers
export { useReactTableUI, useTableSetterRef }

// Export types
export * from './types'
export type { UseTableSetterRefProps }
