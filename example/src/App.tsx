import React from 'react'
import { HeaderProps, Column } from 'react-table'
import ReactTableUI, {
  useReactTableUI,
  Table,
  Pagination
} from 'react-table-ui'
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
  const data: User[] = React.useMemo(() => makeData(5), [])
  const columns: Column<User>[] = React.useMemo(
    () => [
      {
        Header: 'First Name',
        accessor: 'firstName'
      },
      {
        Header: 'Last Name',
        accessor: 'lastName'
      },
      {
        Header: 'Age',
        accessor: 'age',
        disableSortBy: true,
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
  const context = useReactTableUI({
    data,
    columns,
    loadingOptions: { isLoading },
    paginationOptions: { Component: ({ status }) => <div>{status}</div> }
    // rowSelectOptions: { disableRowSelect: true }
    // paginationOptions: { paginateExpandedRows: false }
  })

  return (
    <>
      <div
        style={{
          width: '100%',
          height: 'calc(100vh - 500px)',
          border: '2px solid black',
          overflow: 'hidden'
        }}
      >
        <ReactTableUI
          data={data}
          columns={columns}
          loadingOptions={{ isLoading }}
          sortByOptions={{
            initialState: { sortBy: [{ id: 'age', desc: true }] }
          }}
        />
      </div>
      <Table {...context} />
      <Pagination {...context} />
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          width: '100%'
        }}
      >
        {/* <Pagination {...state} /> */}
        <button onClick={() => setLoading((s) => !s)}>Load</button>
      </div>
    </>
  )
}

export default App
