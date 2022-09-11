import * as React from 'react'

import clsx from '../utilities/clsx'
import Cell from '../common/Cell'
import type { DataType, TableContext, HeaderGroup } from '../types'

export default function Foot<Data extends DataType>(
  props: TableContext<Data>
): JSX.Element | null {
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
      className={clsx('TFoot', 'footer', freezeFoot ? 'sticky' : '')}
      role='rowgroup'
    >
      {showFooter &&
        footerGroups.map((group) => {
          const rowHasFooter = group.headers.some(({ Footer }) =>
            typeof Footer === 'function'
              ? (Footer as any).name !== 'emptyRenderer'
              : !!Footer
          )
          return rowHasFooter ? (
            <div {...group.getHeaderGroupProps()} className={clsx('tr')}>
              {group.headers.map((column) => (
                <Cell {...column.getHeaderProps()} key={column.id}>
                  {renderFooterCellContent<Data>(column)}
                </Cell>
              ))}
            </div>
          ) : null
        })}
    </div>
  )
}

function renderFooterCellContent<Data extends DataType>(
  column: HeaderGroup<Data>
): React.ReactNode {
  try {
    return column.render('Footer') as React.ReactNode
  } catch {
    return null
  }
}
