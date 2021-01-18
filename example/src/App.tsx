import React from 'react'

import ExampleComponent from 'react-table-ui'

const data = [
  {
    col1: 'Hello',
    col2: 'World'
  },
  {
    col1: 'react-table',
    col2: 'rocks'
  },
  {
    col1: 'whatever',
    col2: 'you want'
  },
  {
    col1: 'Hello',
    col2: 'World'
  },
  {
    col1: 'react-table',
    col2: 'rocks'
  },
  {
    col1: 'whatever',
    col2: 'you want'
  },
  {
    col1: 'Hello',
    col2: 'World'
  },
  {
    col1: 'react-table',
    col2: 'rocks'
  },
  {
    col1: 'whatever',
    col2: 'you want'
  },
  {
    col1: 'Hello',
    col2: 'World'
  },
  {
    col1: 'react-table',
    col2: 'rocks'
  },
  {
    col1: 'whatever',
    col2: 'you want'
  },
  {
    col1: 'Hello',
    col2: 'World'
  },
  {
    col1: 'react-table',
    col2: 'rocks'
  },
  {
    col1: 'whatever',
    col2: 'you want'
  },
  {
    col1: 'Hello',
    col2: 'World'
  },
  {
    col1: 'react-table',
    col2: 'rocks'
  },
  {
    col1: 'whatever',
    col2: 'you want'
  }
]

const columns = [
  {
    Header: 'Column 1',
    accessor: 'col1',
    sticky: 'left'
  },
  {
    Header: 'Column 2',
    accessor: 'col2'
  },
  {
    Header: 'Column 1',
    accessor: 'col3' // accessor is the "key" in the data
  },
  {
    Header: 'Column 2',
    accessor: 'col4'
  },
  {
    Header: 'Column 1',
    accessor: 'col5' // accessor is the "key" in the data
  },
  {
    Header: 'Column 2',
    accessor: 'col6'
  },
  {
    id: '12',
    Header: 'Column 1',
    accessor: 'col1' // accessor is the "key" in the data
  },
  {
    id: '13',
    Header: 'Column 2',
    accessor: 'col2',
    sticky: 'right'
  }
]

const App = () => {
  return (
    <div
      style={{
        width: '100%',
        height: '500px',
        border: '2px solid black',
        overflow: 'hidden'
      }}
    >
      <ExampleComponent data={data} columns={columns} />
    </div>
  )
}

export default App
