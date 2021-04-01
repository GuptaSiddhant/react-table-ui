import type { FC } from 'react'
import type {
  UseGlobalFiltersOptions,
  UseGlobalFiltersState,
  FilterType,
  Row,
  IdType,
  UseGlobalFiltersInstanceProps
} from 'react-table'
import type { DataType, StateChangeHandler } from './DataType'

/** Type interface for filtering options. */
export interface GlobalFilterOptions<Data extends DataType>
  extends UseGlobalFiltersOptions<Data> {
  /** Initial settings of global filter.
   *  @example { globalFilter: {} } */
  initialState?: UseGlobalFiltersState<Data>

  /** Callback executed when columns are sorted.
   *  The function must be wrapped in useCallback hook. */
  onStateChange?: StateChangeHandler<UseGlobalFiltersState<Data>>

  /** Disable global filtering for table. @default false */
  disableGlobalFilter?: boolean

  /** Reset filtering when data is changed. @default true */
  autoResetGlobalFilter?: boolean

  /** Manual filtering with custom logic, eg. server-side.
   * Enables filter detection functionality,
   * but does not automatically perform row filtering
   * @default false */
  manualGlobalFilter?: boolean

  /** Allows overriding or adding additional filter types.
   *  If "globalFilter" type isn't found on this object,
   *  it will default to using the built-in filter types. Must be memoised. */
  filterTypes?: Record<string, FilterType<Data>>

  /** @default 'text' */
  globalFilter?:
    | string
    | ((
        rows: Row<Data>[],
        columnIds: IdType<Data>[],
        globalFilterValue: string
      ) => Row<Data>[])

  // ----------
  // Components

  /** Global filter component rendered for in table.
   *  This overrides the fallback text-input-field. */
  Component?: GlobalFilterComponent<Data>
}

export type GlobalFilterComponent<Data extends DataType> = FC<
  UseGlobalFiltersInstanceProps<Data> & { globalFilterValue: string }
>

export default GlobalFilterOptions
