import { useEffect } from 'react'
import { createClassName } from './createClassName'
import styles from '../styles'

/**  Place Styles in DOM */
const useStylesheet = (cssString: string = styles): void => {
  useEffect(() => {
    const styleTagID = createClassName('styles')
    const existingStyleTag = document.getElementById(
      styleTagID
    ) as HTMLStyleElement | null

    const newStyleTag = document.createElement('style')
    newStyleTag.id = styleTagID

    const styleTag: HTMLStyleElement = existingStyleTag || newStyleTag
    styleTag.innerHTML = cssString

    if (!existingStyleTag)
      document.head.insertAdjacentElement('afterbegin', styleTag)

    return () => {
      if (styleTag) document.head.removeChild(styleTag)
    }
  }, [])
}

export default useStylesheet
