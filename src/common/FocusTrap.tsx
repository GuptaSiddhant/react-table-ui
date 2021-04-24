import * as React from 'react'

/** List of `css` selectors for elements that can be focussed. */
const focusableElementSelectors = [
  'button',
  '[href]',
  'input',
  'select',
  'textarea',
  '[tabindex]:not([tabindex="-1"])'
]

type FocusTrapElement = HTMLElement

type UseFocusTrapParam = React.RefObject<FocusTrapElement>

/**
 * Hook to trap focus between two elements.
 * @param firstElementRef Reference for first focusable element.
 * @param lastElementRef Reference for last focusable element.
 * @param autoFocusFirstElement Focus the first element when it is visible (default: true)
 *
 * @author Siddhant Gupta <siddhant.gupta.ext@hmdglobal.com>
 */
const useFocusTrap = (
  firstElementRef: UseFocusTrapParam,
  lastElementRef: UseFocusTrapParam,
  autoFocusFirstElement: boolean = true
) => {
  const firstElement = firstElementRef.current
  const lastElement = lastElementRef.current

  const isFirstElementVisible = useOnScreen(firstElementRef, {})

  const handleKeyDown = React.useCallback(
    (e: KeyboardEvent) => {
      const isTabPressed = e.key === 'Tab'
      const isShiftPressed = e.shiftKey
      if (!firstElement) {
        console.warn('No element found with firstElementRef.')
        return
      }
      if (!lastElement) {
        console.warn('No element found with lastElementRef')
        return
      }
      // Cycle focus from first to last element
      if (
        isTabPressed &&
        isShiftPressed &&
        document.activeElement === firstElement
      ) {
        e.preventDefault()
        lastElement?.focus()
      }
      // Cycle focus from last to first element
      if (
        isTabPressed &&
        !isShiftPressed &&
        document.activeElement === lastElement
      ) {
        e.preventDefault()
        firstElement?.focus()
      }
    },
    [firstElement, lastElement]
  )
  React.useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  React.useEffect(() => {
    autoFocusFirstElement && isFirstElementVisible && firstElement?.focus()
  }, [autoFocusFirstElement, isFirstElementVisible])
}

/** Type definition for props supported by FocusTrap component. */
export interface FocusTrapProps<T = FocusTrapElement>
  extends React.HTMLAttributes<T> {
  /** Render FocusTrap as different HTML element. @default 'div' */
  element?: keyof JSX.IntrinsicElements
  /** Add additional CSS selectors to query focusable children. */
  selectors?: string[]
  /** Focus the first element when it is visible. @default true */
  autoFocusFirstElement?: boolean
}

/**
 * FocusTrap
 * ---
 * Wrapper to trap focus among its children.
 * Can be used as a base for Styled components.
 *
 * @author Siddhant Gupta <siddhant.gupta.ext@hmdglobal.com>
 */
const FocusTrap: React.FC<FocusTrapProps> = ({
  element = 'div',
  selectors = [],
  autoFocusFirstElement,
  children,
  ...props
}) => {
  const containerRef = React.useRef<FocusTrapElement>(null)
  const firstElementRef = React.useRef<FocusTrapElement>()
  const lastElementRef = React.useRef<FocusTrapElement>()

  React.useEffect(() => {
    const focusableElements = containerRef.current?.querySelectorAll(
      [...focusableElementSelectors, ...selectors].join(', ')
    )
    firstElementRef.current = focusableElements?.item(0) as FocusTrapElement
    lastElementRef.current = focusableElements?.item(
      focusableElements.length - 1
    ) as FocusTrapElement
  }, [containerRef.current, children, selectors])

  useFocusTrap(
    firstElementRef as React.RefObject<FocusTrapElement>,
    lastElementRef as React.RefObject<FocusTrapElement>,
    autoFocusFirstElement
  )

  const Element = element as React.ElementType
  return (
    <Element {...props} ref={containerRef}>
      {children}
    </Element>
  )
}

export default FocusTrap

function useOnScreen(
  ref: React.RefObject<HTMLElement>,
  options: any,
  screenSizeLimit = 960
) {
  const [visible, setVisible] = React.useState(false)

  React.useEffect(() => {
    if (window.innerWidth >= screenSizeLimit) {
      const observer = new IntersectionObserver(([entry]) => {
        setVisible(entry.isIntersecting)
      }, options)

      if (ref.current) {
        observer.observe(ref.current)
      }

      return () => {
        if (ref.current) {
          observer.unobserve(ref.current)
        }
      }
    }
    return
  }, [ref, options])

  return visible
}
