// -----------------

// Import components
import ReactTableUI from './components/ReactTableUI'
import Table from './components/Table'
import Pagination from './components/Pagination'

// Import helpers
import useReactTableUI from './logic/useReactTableUI'
import { useTableSetterRef } from './logic/useTableSetterRef'

// Import types
import type { UseTableSetterRefProps } from './logic/useTableSetterRef'

// -----------------

// Export components
export default ReactTableUI
export { Table, Pagination }

// Export helpers
export { useReactTableUI, useTableSetterRef }

// Export types
export * from './types'
export type { UseTableSetterRefProps }

// -----------------
