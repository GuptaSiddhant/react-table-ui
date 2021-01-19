import * as React from 'react'
import type {
  DataType,
  ReactTableUIProps,
  ElementRef
} from 'utilities/interface'
import useReactTableUI from 'utilities/useReactTableUI'

const ReactTableUI = <Data extends DataType>(
  tableProps: ReactTableUIProps<Data>,
  ref: ElementRef
): JSX.Element => {
  const { TableWrapper, Table } = useReactTableUI(tableProps)

  return (
    <TableWrapper>
      <Table ref={ref} />
    </TableWrapper>
  )
}

export { useReactTableUI, ReactTableUIProps }

export default React.forwardRef<HTMLDivElement, ReactTableUIProps<DataType>>(
  ReactTableUI
)
