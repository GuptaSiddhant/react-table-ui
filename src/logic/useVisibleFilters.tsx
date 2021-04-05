import * as React from 'react'
import { ensurePluginOrder } from 'react-table'
import type {
  Hooks,
  ReducerTableState,
  TableState,
  ActionType,
  TableInstance
} from 'react-table'
import type { DataType } from '../types'

const pluginName = 'useFiltersVisible'

const actions = {
  init: 'init',
  setFiltersVisible: 'setFiltersVisible',
  resetFiltersVisible: 'resetFiltersVisible',
  toggleFiltersVisible: 'toggleFiltersVisible'
}

const reducer = <Data extends DataType>(
  state: TableState<Data>,
  action: ActionType,
  previousState?: TableState<Data>,
  instance?: TableInstance<Data>
): ReducerTableState<Data> => {
  if (instance?.disableFilters)
    return {
      ...state,
      filtersVisible: false
    }

  if (instance?.alwaysShowFilters)
    return {
      ...state,
      filtersVisible: true
    }

  switch (action.type) {
    case actions.init:
    case actions.resetFiltersVisible:
      return {
        filtersVisible: instance?.initialState?.filtersVisible || false,
        ...state
      }

    case actions.setFiltersVisible:
      return {
        ...state,
        filtersVisible: !!action['filtersVisible']
      }

    case actions.toggleFiltersVisible:
      return {
        ...state,
        filtersVisible: !previousState?.filtersVisible
      }

    default:
      return state
  }
}

const useInstance = <Data extends DataType>(
  instance: TableInstance<Data>
): void => {
  const { dispatch, plugins } = instance

  ensurePluginOrder(plugins, ['useFilters'], pluginName)

  const setFiltersVisible = React.useCallback(
    (filtersVisible: boolean) => {
      dispatch({ type: actions.setFiltersVisible, filtersVisible })
      dispatch({ type: 'resetFilters' })
    },
    [dispatch]
  )

  const resetFiltersVisible = React.useCallback(() => {
    dispatch({ type: actions.resetFiltersVisible })
    dispatch({ type: 'resetFilters' })
  }, [dispatch])

  const toggleFiltersVisible = React.useCallback(() => {
    dispatch({ type: actions.toggleFiltersVisible })
    dispatch({ type: 'resetFilters' })
  }, [dispatch])

  Object.assign(instance, {
    setFiltersVisible,
    resetFiltersVisible,
    toggleFiltersVisible
  })
}

function useFiltersVisible<Data extends DataType>(hooks: Hooks<Data>): void {
  hooks.stateReducers.push(reducer)
  hooks.useInstance.push(useInstance)
}

useFiltersVisible.pluginName = pluginName

export default useFiltersVisible
