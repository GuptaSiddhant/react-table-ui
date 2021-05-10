# React-Table UI

[![NPM](https://img.shields.io/npm/v/react-table-ui.svg)](https://www.npmjs.com/package/react-table-ui)

Out-of-the-box UI for [React-Table 7](https://github.com/tannerlinsley/react-table).

- Customisable UI with custom theme and components.
- Build with Typescript. Extends community types for React-Table.
- Supports accessibility and keyboard interaction.
- Allows all native React-Table configurations and extends on it.

> The project is dedicated to the awesome work done at React-Table by [Tanner Linsley](https://twitter.com/tannerlinsley) as it wouldn't have been possible without his great library. I have personally use the library and wanted to contribute back to it somehow.

![RTUI](https://raw.githubusercontent.com/GuptaSiddhant/react-table-ui/main/typedoc/RTUI.jpg)

---

## Get started

### Install

```bash
npm install react-table-ui
---
yarn add react-table-ui
```

### Usage

```tsx
import ReactTableUI from 'react-table-ui'
import { useMemo, useRef } from 'react'
import type { TableInstance } from 'react-table'

interface User {
  name: string
  age: number
}

const App = () => {
  // Provide data for the table
  const data: User[] = useMemo(
    () => [
      { name: 'Abc Xyx', age: 20 },
      { name: 'Def Uvw', age: 25 },
      { name: 'Ghi Rst', age: 23 },
      { name: 'Jklm Nopq', age: 30 }
    ],
    []
  )

  // Create an instance ref that will hold the reference to React Table instance.
  const tableInstanceRef = useRef<TableInstance<User>>()

  return (
    <ReactTableUI
      title='My Table'
      data={data}
      tableInstanceRef={tableInstanceRef}
    />
  )
}
```

### API Documentation

All options and properties available for ReactTableUI component are listed [here](https://react-table-ui.js.org/interfaces/reacttableuiprops.html).

### Examples

- [Server pagination](https://codesandbox.io/s/react-table-ui-basic-8ukxd)

## License

MIT © [GuptaSiddhant](https://github.com/GuptaSiddhant)
