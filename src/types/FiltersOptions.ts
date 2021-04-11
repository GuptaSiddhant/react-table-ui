import type { FC, ReactNode } from 'react'
import type {
  UseFiltersOptions,
  UseFiltersState,
  FilterType,
  HeaderProps
} from 'react-table'
import type { DataType, StateChangeHandler } from './DataType'

/** Type interface for filtering options. 
 * @category Options */
export interface FiltersOptions<Data extends DataType>
  extends UseFiltersOptions<Data> {
  /** Initial settings of filters.
   *  List of objects containing column id and value.
   *  @example 
   * ```
   * { filters: [{ id: 'columnsId', value: 'filterValue' }], visible: true }
   * ``` */
  initialState?: FiltersState<Data>

  /** Callback executed when columns are sorted.
   *  The function must be wrapped in useCallback hook. */
  onStateChange?: StateChangeHandler<FiltersState<Data>>

  /** Disable column filtering for table. 
   * @default false */
  disableFilters?: boolean

  /** Enable filtering for all columns,
   * regardless if they have a valid accessor. 
   * @default false */
  defaultCanFilter?: boolean

  /** Reset filtering when data is changed. 
   * @default true */
  autoResetFilters?: boolean

  /** Filters are always visible. Removes the button to show/hide filters. 
   * @default false */
  alwaysShowFilters?: boolean

  /** Manual filtering with custom logic, eg. server-side.
   * @default false */
  manualFilters?: boolean

  /** Allows overriding or adding additional filter types for columns to use.
   *  If a column's filter type isn't found on this object,
   *  it will default to using the built-in filter types. Must be memoised. */
  filterTypes?: Record<string, FilterType<Data>>

  // ----------
  // Components

  /** Default filter component rendered for columns.
   *  This overrides the fallback text-input-field.
   *  Column specific components will override this component.
   * @category Custom Component  */
  DefaultComponent?: FilterComponent<Data>

  /** Indicator/icon used for action/button to show the Filters Row. 
   * @default 👁️
   * @category Custom Component */
  showFiltersActionIndicator?: ReactNode

  /** Indicator/icon used for action/button to hide the Filters Row. 
   * @default 👀
   * @category Custom Component */
  hideFiltersActionIndicator?: ReactNode
}

export type FilterComponent<Data extends DataType> = FC<HeaderProps<Data>>

/** @category State */
export interface FiltersState<Data extends DataType>
  extends Partial<UseFiltersState<Data>> {
  /** Set visibility of filters in the table. 
   * @default false */
  filtersVisible?: boolean
}

export default FiltersOptions
