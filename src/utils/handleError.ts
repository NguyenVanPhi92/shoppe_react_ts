import { notification } from 'antd'
import { ErrorInfo } from 'react'

interface ExtendedErrorInfo extends ErrorInfo {
  priority?: 'low' | 'medium' | 'high'
  from?: string
}

export const handleError = (error: Error, info: ExtendedErrorInfo, shouldThrow = false): void => {
  // Log the error to console
  console.error(`Error caught by handleError from ${info?.from || 'unknown source'}:`, error)
  console.error('Additional info:', info)
  if (process.env.NODE_ENV === 'development') console.error('Error stack:', error.stack)
  if (process.env.NODE_ENV !== 'development') sendErrorToTrackingService(error, info)

  switch (info.priority) {
    case 'high':
      showUserNotification(
        'error',
        'Error',
        `An important error occurred in ${
          info?.from ? info.from.toUpperCase() : 'AN UNKNOWN SOURCE'
        }. Our team has been notified.`
      )
      break
    case 'medium':
      showUserNotification(
        'error',
        'Warning',
        `An issue occurred in ${info?.from ? info.from.toUpperCase() : 'AN UNKNOWN SOURCE'}. We're looking into it.`
      )
      break
    case 'low':
      break
    default:
      showUserNotification(
        'warning',
        'Warning',
        `An unexpected issue occurred in ${info?.from ? info.from.toUpperCase() : 'AN UNKNOWN SOURCE'}.`
      )
  }

  // If shouldThrow is true, we rethrow the error
  // This can be useful if you want to let it bubble up to an Error Boundary
  if (shouldThrow) throw error
}

// Function for sending errors to a tracking service
const sendErrorToTrackingService = (error: Error, info: ExtendedErrorInfo): void => {
  // Implementation would depend on your chosen error tracking service
  // For example, if using Sentry:
  // Sentry.captureException(error, { extra: info })
  console.log('Error sent to tracking service:', error, info)
}

// Function for showing a notification to the user using Ant Design's notification system
const showUserNotification = (
  type: 'info' | 'success' | 'warning' | 'error',
  message: string,
  description: string
): void => {
  notification[type]({
    message,
    description,
    duration: 3,
    closable: false
  })
}
