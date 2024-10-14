import { useEffect, useState } from "react"

const useDetectWindowFocus = (): boolean => {
  const [chatFocus, setChatFocus] = useState(true)

  useEffect(() => {
    const handleActivityFalse = () => {
      setChatFocus(false)
    }

    const handleActivityTrue = () => {
      setChatFocus(true)
    }

    window.addEventListener("focus", handleActivityTrue)
    window.addEventListener("blur", handleActivityFalse)

    return () => {
      window.removeEventListener("focus", handleActivityTrue)
      window.removeEventListener("blur", handleActivityFalse)
    }
  }, [chatFocus])

  return chatFocus
}

export { useDetectWindowFocus }
