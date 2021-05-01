# React-Table UI

[![NPM](https://img.shields.io/npm/v/react-table-ui.svg)](https://www.npmjs.com/package/react-table-ui)

Out-of-the-box UI for [React-Table 7](https://github.com/tannerlinsley/react-table).

- Customisable UI with custom theme and components.
- Build with Typescript. Extends community types for React-Table.
- Supports accessibility and keyboard interaction.
- Allows all native React-Table configurations and extends on it.

> The project is dedicated to the awesome work done at React-Table by [Tanner Linsley](https://twitter.com/tannerlinsley) as it wouldn't have been possible without his great library. I have personally use the library and wanted to contribute back to it somehow.

![RTUI](https://github.com/GuptaSiddhant/react-table-ui/blob/main/typedoc/RTUI.jpg)

---

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
