import React from 'react'
import { HeaderProps } from 'react-table'
import {
  ReactTableUI,
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
  const data: User[] = React.useMemo(() => makeData(100, 10), [])
  const columns: ReactTableUIProps<User>['columns'] = React.useMemo(
    () => [
      {
        Header: 'Name',
        sticky: 'left',
        // Footer: 'Foot',
        columns: [
          {
            Header: 'First Name',
            accessor: 'firstName',
            Footer: 'Foot'
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

  const state = useReactTableUI({ data, columns })
  return (
    <div
      style={{
        width: '100%',
        height: '500px',
        border: '2px solid black',
        overflow: 'hidden'
      }}
    >
      <ReactTableUI {...state} />
    </div>
  )
}

export default App
