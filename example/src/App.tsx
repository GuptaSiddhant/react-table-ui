import React from 'react'
import { Column } from 'react-table'
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
          title='Test table'
          data={data}
          columns={columns}
          loadingOptions={{ isLoading }}
          tableSetterRef={tableSetterRef}
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
      </div>
      <button onClick={() => setLoading((s) => !s)}>Load</button>
    </React.Fragment>
  )
}

export default App
