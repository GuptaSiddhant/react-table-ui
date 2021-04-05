import * as React from 'react'

interface ScrollPosition {
  x: number
  y: number
}

export const useScrollPosition = () => {
  const elementRef = React.useRef<HTMLDivElement>(null)
  const [scrollPosition, setScrollPosition] = React.useState<ScrollPosition>({
    y: 0,
    x: 0
  })

  const handleElementScroll = React.useCallback(() => {
    const element = elementRef.current
    const newScrollPos: ScrollPosition = {
      y: element?.scrollTop || 0,
      x: element?.scrollLeft || 0
    }
    setScrollPosition(newScrollPos)
  }, [])

  React.useEffect(() => {
    elementRef.current?.addEventListener('scroll', handleElementScroll)

    return () =>
      elementRef.current?.removeEventListener('scroll', handleElementScroll)
  }, [handleElementScroll])

  return [
    elementRef,
    {
      scrollPosY: scrollPosition.y,
      scrollPosX: scrollPosition.x
    }
  ] as const
}

export default useScrollPosition
