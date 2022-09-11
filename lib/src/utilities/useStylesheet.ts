import { useInsertionEffect } from 'react'
import clsx from './clsx'
import styles from '../styles'

/**  Place Styles in DOM */
const useStylesheet = (cssString: string = ''): void => {
  useInsertionEffect(() => {
    const styleTagID = clsx('styles')
    const existingStyleTag = document.getElementById(
      styleTagID
    ) as HTMLStyleElement | null

    const newStyleTag = document.createElement('style')
    newStyleTag.id = styleTagID

    const styleTag: HTMLStyleElement = existingStyleTag || newStyleTag
    styleTag.innerHTML = cssString + ' ' + styles

    if (!existingStyleTag)
      document.head.insertAdjacentElement('afterbegin', styleTag)

    return () => {
      if (styleTag) document.head.removeChild(styleTag)
    }
  }, [cssString])
}

export default useStylesheet
