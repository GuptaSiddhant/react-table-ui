import type { FC } from 'react'
import type {
  UseFiltersOptions,
  UseFiltersState,
  FilterType,
  HeaderProps
} from 'react-table'
import type { DataType, StateChangeHandler } from './DataType'

/** Type interface for filtering options. */
export interface FiltersOptions<Data extends DataType>
  extends UseFiltersOptions<Data> {
  /** Initial settings of filters.
   *  List of objects containing column id and value.
   *  @example { filters: [{ id: 'columnsId', value: 'filterValue' }] } */
  initialState?: UseFiltersState<Data>

  /** Callback executed when columns are sorted.
   *  The function must be wrapped in useCallback hook. */
  onStateChange?: StateChangeHandler<UseFiltersState<Data>>

  /** Disable column filtering for table. @default false */
  disableFilters?: boolean

  /** Enable filtering for all columns,
   * regardless if they have a valid accessor. @default false */
  defaultCanFilter?: boolean

  /** Reset filtering when data is changed. @default true */
  autoResetFilters?: boolean

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
   *  Column specific components will override this component. */
  DefaultComponent?: FilterComponent<Data>
}

export type FilterComponent<Data extends DataType> = FC<HeaderProps<Data>>

export default FiltersOptions
