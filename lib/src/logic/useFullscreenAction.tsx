import * as React from 'react'

import type { DataType, TableContext } from '../types'
import Icon from '../common/Icon'

const defaultEnterFullscreenIndicator = <Icon name='maximise' />
const defaultExitFullscreenIndicator = <Icon name='minimise' />

export default function useFullscreenAction<Data extends DataType>({
  tableRef,
  tableProps
}: TableContext<Data>): {
  title: string
  onClick: () => void
  children: React.ReactNode
} | null {
  const {
    actionOptions: { fullscreenAction = true } = {},
    localeOptions: { text } = {}
  } = tableProps
  const [isFullscreen, setIsFullscreen] = React.useState(false)

  const handleEnterFullscreen = React.useCallback(() => {
    setIsFullscreen(true)
    if (tableRef?.current) tableRef.current.requestFullscreen()
  }, [tableRef])

  const handleExitFullscreen = React.useCallback(() => {
    if (window.document.fullscreenElement) window.document.exitFullscreen()
    setIsFullscreen(false)
  }, [])

  const enterIndicator: React.ReactNode =
    (typeof fullscreenAction !== 'boolean' &&
      fullscreenAction.enterFullscreenIndicator) ||
    defaultEnterFullscreenIndicator

  const exitIndicator: React.ReactNode =
    (typeof fullscreenAction !== 'boolean' &&
      fullscreenAction.exitFullscreenIndicator) ||
    defaultExitFullscreenIndicator

  const iconButtonProps = fullscreenAction
    ? {
        title: text?.toggleFullscreen || 'Toggle fullscreen',
        onClick: isFullscreen ? handleExitFullscreen : handleEnterFullscreen,
        children: isFullscreen ? exitIndicator : enterIndicator
      }
    : null

  return iconButtonProps
}
