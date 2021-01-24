import * as React from 'react'
import styled from 'styled-components'
import { createClassName } from '../utilities'
import type { DataType, ElementRef, TableContext } from '../utilities/interface'
import Head from '../components/Head'
import Body from '../components/Body'
import Foot from '../components/Foot'

const StyledTable = styled.div`
  height: 100%;
  min-width: 100%;
  overflow: scroll;
  border: 1px solid #ddd;
  &,
  > * {
    box-sizing: border-box;
  }

  .loader {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
  }
`

const Loader: React.FC = () => <div className='loader'>Loading...</div>

const Table = <Data extends DataType>(
  props: TableContext<Data>,
  ref: ElementRef
): JSX.Element | null => {
  const { getTableProps } = props.tableInstance
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

  return (
    <StyledTable
      ref={ref}
      className={createClassName('table sticky')}
      {...getTableProps()}
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
    </StyledTable>
  )
}

export default React.forwardRef<HTMLDivElement, any>(Table)
