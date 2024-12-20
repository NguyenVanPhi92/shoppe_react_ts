import { useEffect, useRef, useState } from 'react'

// how use
// example:  const { show, setShow, nodeRef } = useClickOutside(".toggle-button");
export default function useClickOutside(dom = 'button') {
  const [show, setShow] = useState<boolean>(false)
  const nodeRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      const target = e.target as HTMLElement

      if (nodeRef.current && !nodeRef.current.contains(target) && !target.matches(dom)) {
        setShow(false)
      }
    }

    document.addEventListener('click', handleClickOutside)

    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [dom])

  return {
    show,
    setShow,
    nodeRef
  }
}
