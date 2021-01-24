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
  const data: User[] = React.useMemo(() => makeData(5, 5, 5), [])
  const columns: ReactTableUIProps<User>['columns'] = React.useMemo(
    () => [
      {
        Header: 'Name',

        columns: [
          {
            Header: 'First Name',
            accessor: 'firstName'
          },
          {
            Header: 'Last Name',
            accessor: 'lastName'
          }
        ]
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

  const state = useReactTableUI({
    data,
    columns,
    paginationOptions: { paginateExpandedRows: false }
    // loadingOptions: { isLoading: true, backgroundLoading: false }
  } as any)

  return (
    <>
      <div
        style={{
          width: '100%',
          height: '500px',
          border: '2px solid black',
          overflow: 'hidden'
        }}
      >
        <Table {...state} />
      </div>
      <Pagination {...state} />
    </>
  )
}

export default App
