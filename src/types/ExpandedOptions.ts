import type { ReactNode } from 'react'
import type { UseExpandedOptions, UseExpandedState, IdType } from 'react-table'
import type DataType from './DataType'

/** Type interface for expanded rows options. */
export interface ExpandedOptions<Data extends DataType>
  extends UseExpandedOptions<Data> {
  /** Initial settings of expanded rows. */
  initialState?: Partial<UseExpandedState<Data>>

  /** This string is used as the key to detect
   * manual expanded state on any given row.
   * @default 'expanded'.
   * This row with ('expanded': true) will always be expanded. */
  manualExpandedKey?: IdType<Data>

  /** Count expanded sub-rows while calculating rows on a page.
   *  @default true  */
  paginateExpandedRows?: boolean

  /** Expanded rows are rendered like normal rows. @default true */
  expandSubRows?: boolean

  /** Reset expanded rows when data changes. @default true */
  autoResetExpanded?: boolean

  /** Custom method to extract sub-rows from a given row. */
  getSubRows?: (rowData: Data, relativeIndex: number) => Data[]

  // ----------
  // Components

  /** Indicator for collapsed row. @default '→' */
  collapsedIndicator?: ReactNode

  /** Indicator for expanded row. @default '↓' */
  expandedIndicator?: ReactNode
}

export default ExpandedOptions
