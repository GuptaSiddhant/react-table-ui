import React from 'react'
import { HeaderProps } from 'react-table'
import {
  Table,
  Pagination,
  useReactTableUI,
  ReactTableUIProps
} from 'react-table-ui'
import makeData from './makeData'

interface User {
  firstName: string
  lastName: string
  age: number
  visits: number
  status: string
  progress: number
}

const App = () => {
  const data: User[] = React.useMemo(() => makeData(5), [])
  const columns: ReactTableUIProps<User>['columns'] = React.useMemo(
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
  const state = useReactTableUI({
    data,
    columns,
    loadingOptions: { isLoading }
    // rowSelectOptions: { disableRowSelect: true }
    // paginationOptions: { paginateExpandedRows: false }
  })

  return (
    <>
      <div
        style={{
          width: '100%',
          height: 'calc(100vh - 40px)',
          border: '2px solid black',
          overflow: 'hidden'
        }}
      >
        <Table {...state} />
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          width: '100%'
        }}
      >
        <Pagination {...state} />
        <button onClick={() => setLoading((s) => !s)}>Load</button>
      </div>
    </>
  )
}

export default App
