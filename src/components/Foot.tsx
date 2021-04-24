import * as React from 'react'
import { HeaderGroup } from 'react-table'
import createClassName from '../utilities/createClassName'
import type { DataType, TableContext } from '../types'
import Cell from '../common/Cell'

const renderFooterCellContent = <Data extends DataType>(
  column: HeaderGroup<Data>
): React.ReactNode => {
  try {
    const render = column.render('Footer')
    return render
  } catch {
    return null
  }
}

const Foot = <Data extends DataType>(
  props: TableContext<Data>
): JSX.Element | null => {
  const {
    tableInstance,
    tableProps: { freezeOptions, columns }
  } = props

  const showFooter = columns?.some(function hasFooter(column): boolean {
    return !!column.Footer || !!column.columns?.some((c) => hasFooter(c))
  })

  const { headerGroups } = tableInstance
  const footerGroups = headerGroups.slice().reverse()

  const freezeFoot = freezeOptions?.footer !== false

  return (
    <div
      className={createClassName('TFoot', 'footer', freezeFoot ? 'sticky' : '')}
      role='rowgroup'
    >
      {showFooter &&
        footerGroups.map((group) => {
          const rowHasFooter = group.headers.some(({ Footer }) =>
            typeof Footer === 'function'
              ? Footer.name !== 'emptyRenderer'
              : !!Footer
          )
          return rowHasFooter ? (
            <div
              {...group.getHeaderGroupProps()}
              className={createClassName('tr')}
            >
              {group.headers.map((column) => (
                <Cell {...column.getHeaderProps()}>
                  {renderFooterCellContent<Data>(column)}
                </Cell>
              ))}
            </div>
          ) : null
        })}
    </div>
  )
}

export default Foot
