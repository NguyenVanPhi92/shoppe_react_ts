import { useEffect, useRef, useState } from 'react'

export default function useHover() {
  // event js: mouseover, mouseout
  const [hovered, setHovered] = useState(false)
  const nodeRef = useRef(null)
  useEffect(() => {
    const handleMouseOver = () => setHovered(true)
    const handleMouseOut = () => setHovered(false)
    const dom = nodeRef.current
    if (dom) {
      dom.addEventListener('mouseover', handleMouseOver)
      dom.addEventListener('mouseout', handleMouseOut)
    }
    return () => {
      dom && dom.removeEventListener('mouseover', handleMouseOver)
      dom && dom.removeEventListener('mouseout', handleMouseOut)
    }
  }, [])
  return {
    hovered,
    nodeRef
  }
}
