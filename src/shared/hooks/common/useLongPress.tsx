import { MouseEvent, useRef, useState } from "react"

export function useLongPress() {
  const [action, setAction] = useState<"click" | "longpress" | undefined>()

  const timerRef = useRef<any>()
  const isLongPress = useRef<boolean>()

  function startPressTimer() {
    isLongPress.current = false
    timerRef.current = setTimeout(() => {
      isLongPress.current = true
      setAction("longpress")
      navigator.vibrate(200)
    }, 500)
  }

  function handleOnClick(e: MouseEvent<HTMLDivElement, MouseEvent>) {
    if (isLongPress.current) {
      return
    }
    setAction("click")
  }

  function handleOnMouseDown() {
    startPressTimer()
  }

  function handleOnMouseUp() {
    clearTimeout(timerRef.current)
  }

  function handleOnTouchStart() {
    startPressTimer()
  }

  function handleOnTouchEnd() {
    if (action === "longpress") return
    clearTimeout(timerRef.current)
  }

  return {
    setAction,
    action,
    handlers: {
      onClick: handleOnClick,
      onMouseDown: handleOnMouseDown,
      onMouseUp: handleOnMouseUp,
      onTouchStart: handleOnTouchStart,
      onTouchEnd: handleOnTouchEnd,
    },
  }
}
