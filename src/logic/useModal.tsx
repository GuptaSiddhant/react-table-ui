import * as React from 'react'
import { ensurePluginOrder } from 'react-table'
import type { ModalProps } from 'react-table'

import type {
  DataType,
  Hooks,
  ReducerTableState,
  TableState,
  ActionType,
  TableInstance
} from '../types'

const pluginName = 'useModal'

const actions = {
  init: 'init',
  setModal: 'setModal',
  resetModal: 'resetModal'
}

const reducer = <Data extends DataType>(
  state: TableState<Data>,
  action: ActionType,
  _previousState?: TableState<Data>,
  instance?: TableInstance<Data>
): ReducerTableState<Data> => {
  switch (action.type) {
    case actions.init:
      return {
        modal: instance?.initialState?.modal,
        ...state
      }
    case actions.resetModal:
      return {
        ...state,
        modal: undefined
      }

    case actions.setModal:
      return {
        ...state,
        modal: action['modal']
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

  const setModal = React.useCallback(
    (modal: ModalProps) => {
      dispatch({ type: actions.setModal, modal })
    },
    [dispatch]
  )

  const resetModal = React.useCallback(() => {
    dispatch({ type: actions.resetModal })
  }, [dispatch])

  Object.assign(instance, {
    setModal,
    resetModal
  })
}

function useModal<Data extends DataType>(hooks: Hooks<Data>): void {
  hooks.stateReducers.push(reducer)
  hooks.useInstance.push(useInstance)
}

useModal.pluginName = pluginName

export default useModal
