import { useEffect, useRef, useLayoutEffect, RefObject } from 'react'

// Tùy chọn sử dụng useLayoutEffect hay useEffect tùy thuộc môi trường
const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect
// Generic để đảm bảo đúng kiểu sự kiện
type EventListener<K extends keyof HTMLElementEventMap> = (event: HTMLElementEventMap[K]) => void
interface UseEventListenerOptions extends AddEventListenerOptions {
  element?: RefObject<HTMLElement | null> | HTMLElement | Window
}

function useEventListener<K extends keyof HTMLElementEventMap>(
  eventName: K,
  handler: EventListener<K>,
  { element = window, ...options }: UseEventListenerOptions = {}
) {
  const savedHandler = useRef<EventListener<K>>(handler)
  // Cập nhật ref khi handler thay đổi
  useIsomorphicLayoutEffect(() => {
    savedHandler.current = handler
  }, [handler])

  useEffect(() => {
    const targetElement = (element && 'current' in element ? element.current : element) || window
    if (!(targetElement && targetElement.addEventListener)) return
    const eventListener: EventListener<K> = (event) => savedHandler.current(event)
    targetElement.addEventListener(eventName, eventListener as EventListenerOrEventListenerObject, options)
    return () => {
      targetElement.removeEventListener(eventName, eventListener as EventListenerOrEventListenerObject)
    }
  }, [eventName, element, options])
}

export default useEventListener
