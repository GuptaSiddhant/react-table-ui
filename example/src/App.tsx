import React from 'react'
import ReactTableUI from 'react-table-ui'
import makeData from './makeData'

const App = () => {
  const data = React.useMemo(() => makeData(100, 10), [])
  const columns = React.useMemo(
    () => [
      {
        Header: 'Name',
        sticky: 'left',
        Footer: 'Foot',
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
        accessor: 'age'
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
  return (
    <div
      style={{
        width: '100%',
        height: '500px',
        border: '2px solid black',
        overflow: 'hidden'
      }}
    >
      <ReactTableUI<object>
        data={data}
        columns={columns}
        sortByOptions={{
          disableSortBy: false
        }}
      />
    </div>
  )
}

export default App
