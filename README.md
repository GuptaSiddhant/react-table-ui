# React-Table UI

UI for React-Table 7

[![NPM](https://img.shields.io/npm/v/react-table-ui.svg)](https://www.npmjs.com/package/react-table-ui)

## Install

```bash
npm install react-table-ui
```

```bash
yarn add react-table-ui
```

## Usage

```tsx
import ReactTableUI from 'react-table-ui'
import { useMemo } from 'react'

const App = () => {
  const data = useMemo(
    () => [
      { name: 'Abc Xyx', age: 20 },
      { name: 'Def Uvw', age: 25 },
      { name: 'Ghi Rst', age: 23 },
      { name: 'Jklm Nopq', age: 30 }
    ],
    []
  )

  return <ReactTableUI data={data} />
}
```

## License

MIT © [GuptaSiddhant](https://github.com/GuptaSiddhant)
