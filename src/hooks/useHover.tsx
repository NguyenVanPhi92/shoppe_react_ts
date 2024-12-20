import { useEffect, useRef, useState } from 'react'

// how use
// example: const { hovered, nodeRef } = useHover<HTMLDivElement>()
export default function useHover<T extends HTMLElement>() {
  const [hovered, setHovered] = useState(false)
  const nodeRef = useRef<T | null>(null)

  useEffect(() => {
    const handleMouseOver = () => setHovered(true)
    const handleMouseOut = () => setHovered(false)

    const dom = nodeRef.current
    if (dom) {
      dom.addEventListener('mouseover', handleMouseOver)
      dom.addEventListener('mouseout', handleMouseOut)
    }

    // Dọn dẹp khi component unmount
    return () => {
      if (dom) {
        dom.removeEventListener('mouseover', handleMouseOver)
        dom.removeEventListener('mouseout', handleMouseOut)
      }
    }
  }, [])

  return {
    hovered,
    nodeRef
  }
}
