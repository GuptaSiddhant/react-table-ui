import * as React from 'react'
import { createClassName, addStylesheet } from '../utilities'
import type { DataType, ElementRef, TableContext } from '../utilities/interface'
import Head from '../components/Head'
import Body from '../components/Body'
import Foot from '../components/Foot'

const cssString = `
  .table * {
    box-sizing: border-box;
  }

  [data-sticky-td] {
    position: sticky;
  }

  [data-sticky-last-left-td] {
    box-shadow: 2px 0px 3px #ccc;
  }

  [data-sticky-first-right-td] {
    box-shadow: -2px 0px 3px #ccc;
  }
`

const Loader: React.FC = () => (
  <div
    className='loader'
    style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      height: '100%'
    }}
  >
    Loading...
  </div>
)

const Table = <Data extends DataType>(
  props: TableContext<Data>,
  ref: ElementRef
): JSX.Element | null => {
  const { getTableProps, rows } = props.tableInstance
  const { loadingOptions = {}, data = [] } = props.tableProps
  const {
    isLoading = false,
    loadingIndicator = <Loader />,
    backgroundLoading = true
  } = loadingOptions

  const showLoading = backgroundLoading
    ? data.length === 0
      ? isLoading
      : false
    : isLoading

  addStylesheet(cssString)

  return (
    <div
      ref={ref}
      className={createClassName('table sticky')}
      {...getTableProps()}
      aria-rowcount={rows.length}
      style={{
        height: '100%',
        minWidth: '100%',
        overflow: 'scroll',
        border: '1px solid #ddd',
        boxSizing: 'border-box'
      }}
    >
      {showLoading ? (
        loadingIndicator
      ) : (
        <React.Fragment>
          <Head {...props} />
          <Body {...props} />
          <Foot {...props} />
        </React.Fragment>
      )}
    </div>
  )
}

export default React.forwardRef<HTMLDivElement, any>(Table)
