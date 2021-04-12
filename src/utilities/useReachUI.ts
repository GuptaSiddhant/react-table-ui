import { useState, useEffect } from 'react'

const useReachUI = (type: 'menu') => {
  const [reach, setReach] = useState<object | null>(null)

  useEffect(() => {
    let isMounted = true
    const handleSetReach = (mod: any) => isMounted && setReach(mod)
    switch (type) {
      case 'menu':
        import('@reach/menu-button').then(handleSetReach).catch(console.error)
        break
    }

    return () => {
      isMounted = false
    }
  }, [type])

  switch (type) {
    case 'menu':
      return reach as typeof import('@reach/menu-button/dist/declarations/src')
    default:
      return null
  }
}

export default useReachUI
