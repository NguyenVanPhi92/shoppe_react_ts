import moment from 'moment'

export function formatDateResponse(date: string | Date) {
  return moment(date).add(7, 'hours')?.toDate()
}

export function getSecondsDiff(startDate: number, endDate: number) {
  const msInSecond = 1000

  return Math.round(Math.abs(endDate - startDate) / msInSecond)
}

export function getSecondsFromDate({
  startDate,
  endDate,
}: {
  startDate?: Date | string
  endDate?: string | Date
}) {
  const msInSecond = 1000
  return Math.round(
    Math.abs(
      formatDateResponse(endDate || new Date()).getTime() -
        formatDateResponse(startDate || new Date()).getTime()
    ) / msInSecond
  )
}
