import React from 'react'
import { Column } from 'react-table'
import { ReactTableUI, useTableInstanceRef } from 'react-table-ui'
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
        Header: 'Name',
        sticky: 'left',
        columns: [
          {
            Header: 'First Name',
            accessor: 'firstName',
            sticky: 'left'
          },
          {
            Header: 'Last Name',
            accessor: 'lastName'
          }
        ]
      },
      {
        Header: 'Info',
        columns: [
          {
            Header: 'Age',
            accessor: 'age',
            disableFilters: true
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
            accessor: 'progress',
            align: 'right',
            width: 200
          }
        ]
      }
    ],
    []
  )

  const [isLoading, setLoading] = React.useState(false)
  const tableInstanceRef = useTableInstanceRef<User>()

  return (
    <React.Fragment>
      <div
        style={{
          width: '100vw',
          height: '100vh',
          overflow: 'hidden',
          padding: '20px',
          background: 'lightGrey'
        }}
      >
        <ReactTableUI
          title='Test table'
          data={data}
          columns={columns}
          loadingOptions={{ isLoading }}
          tableInstanceRef={tableInstanceRef}
          filtersOptions={
            {
              // disableFilters: true,
              // alwaysShowFilters:true,
              // initialState: { filtersVisible: true },
              // toggleFiltersVisibleActionIndicator: <div>L</div>
            }
          }
          // columnOptions={{initialState:{columnOrder: ['name', 'age', 'age2']}}}
          // globalFilterOptions={{disableGlobalFilter: true}}
        />
        <button onClick={() => setLoading((s) => !s)}>Load</button>
      </div>
    </React.Fragment>
  )
}

export default App
