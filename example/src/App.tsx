import React from 'react'
import { Column } from 'react-table'
import ReactTableUI, { useTableInstanceRef } from 'react-table-ui'
import type {
  DataType,
  TableAction,
  SingleRowAction,
  MultiRowAction
} from 'react-table-ui'
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

  const singleRowActions: SingleRowAction<User>[] = [
    {
      id: 'log',
      tooltip: 'Console log',
      onClick: console.log,
      children: <div>🪵 Console log</div>
    }
  ]

  const multiRowActions: MultiRowAction<User>[] = [
    {
      id: 'log',
      tooltip: 'Console log',
      onClick: console.log,
      children: '🪵'
    }
  ]

  const tableActions: TableAction<User>[] = [
    {
      id: 'load',
      tooltip: 'Load',
      onClick: () => setLoading((s) => !s),
      children: '🔄'
    }
  ]

  return (
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
        tableInstanceRef={tableInstanceRef}
        loadingOptions={{ isLoading }}
        actionOptions={{ singleRowActions, multiRowActions, tableActions }}
      />
    </div>
  )
}

export default App
