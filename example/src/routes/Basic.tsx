import React from 'react'
import ReactTableUI from 'react-table-ui'
import type { TableInstance, DataType } from 'react-table-ui'

/** Structure of data provided foe each row. */
interface User extends DataType {
  name: string
  age: number
}

export default function App() {
  const data: User[] = React.useMemo(
    () => [
      { name: 'Abc Xyx', age: 20 },
      { name: 'Def Uvw', age: 25 },
      { name: 'Ghi Rst', age: 23 },
      { name: 'Jklm Nopq', age: 30 }
    ],
    []
  )

  // Create an instance ref that will hold the reference to React Table instance.
  const tableInstanceRef = React.useRef<TableInstance<User>>(null)

  return (
    <ReactTableUI
      title='Basic table example'
      data={data}
      tableInstanceRef={tableInstanceRef}
    />
  )
}
