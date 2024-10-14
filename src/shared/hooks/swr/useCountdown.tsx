import { useEffect, useState } from 'react'

interface Props {
  targetDate: string
  type?: 'increase' | 'decrease'
}

interface Res {
  days: number
  hours: number
  minutes: number
  seconds: number
}

function getReturnValues(countDown: number): Res {
  // calculate time left
  const days = Math.floor(countDown / (1000 * 60 * 60 * 24))
  const hours = Math.floor((countDown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((countDown % (1000 * 60)) / 1000)

  if (Number.isNaN(seconds)) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    }
  }

  return {
    days: days <= 0 ? 0 : days,
    hours: hours <= 0 ? 0 : hours,
    minutes: minutes <= 0 ? 0 : minutes,
    seconds: seconds <= 0 ? 0 : seconds,
  }
}

export const useCountdown = ({ targetDate, type = 'decrease' }: Props): Res => {
  const countDownDate = new Date(targetDate).getTime()
  const [countDown, setCountDown] = useState(countDownDate - new Date().getTime())

  useEffect(() => {
    const interval = setInterval(() => {
      setCountDown(
        type === 'decrease'
          ? countDownDate - new Date().getTime()
          : countDownDate + new Date().getTime()
      )
    }, 1000)

    return () => clearInterval(interval)
  }, [countDownDate])

  return getReturnValues(countDown)
}
