import React from 'react'
import { HeaderProps, Column } from 'react-table'
import ReactTableUI, { useTableSetterRef } from 'react-table-ui'
import type { DataType } from 'react-table-ui'
import makeData from './makeData'

interface User extends DataType {
  firstName: string
  lastName: string
  age: number
  visits: number
  status: string
  progress: number
}

const App = () => {
  const data: User[] = React.useMemo(() => makeData(100, 3), [])
  const columns: Column<User>[] = React.useMemo(
    () => [
      {
        Header: 'First Name',
        accessor: 'firstName',
sticky: 'left'
      },
      {
        Header: 'Last Name',
        accessor: 'lastName'
      },
      {
        Header: 'Age',
        accessor: 'age',
        Filter: (_: HeaderProps<User>) => null
      },
      {
        Header: 'Visits',
        accessor: 'visits'
      },
      {
        Header: 'Status',
        accessor: 'status'
      },
      {
        Header: 'Profile Progress',
        accessor: 'progress'
      }
    ],
    []
  )

  const [isLoading, setLoading] = React.useState(false)

  const tableSetterRef = useTableSetterRef<User>()

  return (
    <React.Fragment>
      <div
        style={{
          width: '100%',
          height: 'calc(100vh - 100px)',          
          overflow: 'hidden',
          padding: '20px'
        }}
      >
        <ReactTableUI
        title="Test table"
          data={data}
          columns={columns}
          loadingOptions={{ isLoading }}
          tableSetterRef={tableSetterRef}
          // globalFilterOptions={{disableGlobalFilter: true}}
          // paginationOptions={{paginateExpandedRows: false}}
        />
      </div>
      <button onClick={() => setLoading((s) => !s)}>Load</button>
    </React.Fragment>
  )
}

export default App
