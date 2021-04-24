import * as React from 'react'

import type { DataType, TableContext } from '../../types'
import Button, { IconButtonProps } from '../../common/Button'
import Icon from '../../common/Icon'

const defaultEnterFullscreenIndicator = <Icon name="maximise" />
const defaultExitFullscreenIndicator = <Icon name="minimise" />

const FullscreenAction = <Data extends DataType>({
  tableRef,
  tableProps
}: TableContext<Data>): JSX.Element | null => {
  const { actionOptions: { fullscreenAction = true } = {} } = tableProps
  const [isFullscreen, setIsFullscreen] = React.useState(false)

  const handleEnterFullscreen = React.useCallback(() => {
    tableRef?.current?.requestFullscreen()
    setIsFullscreen(true)
  }, [tableRef])

  const handleExitFullscreen = React.useCallback(() => {
    if (!!window.document.fullscreenElement) window.document.exitFullscreen()
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

  const iconButtonProps: IconButtonProps | null = fullscreenAction
    ? {
        title: 'Toggle fullscreen',
        onClick: isFullscreen ? handleExitFullscreen : handleEnterFullscreen,
        children: isFullscreen ? exitIndicator : enterIndicator
      }
    : null

  return iconButtonProps && <Button key='fullscreen' {...iconButtonProps} />
}

export default FullscreenAction
