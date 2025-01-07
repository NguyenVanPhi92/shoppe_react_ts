export const correctEmail = (value: string) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value)
export const correctPassword = (value: string) => {
  return /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/.test(value)
}
export const isVietnamesePhoneNumberValid = (num: string) => /(((\+|)84)|0)(3|5|7|8|9)+([0-9]{8})\b/.test(num)
export const checkNumberPhone = (number: string) => {
  ;/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(number)
}
// eslint-disable-next-line @typescript-eslint/ban-types
export const onScrollBottom = (callBack: Function) => {
  window.onscroll = function (event) {
    if (window.innerHeight + window.scrollY > document.body.offsetHeight) callBack(event)
  }
}
export const getHoursName = (hours: number): string => {
  const hoursVal = ((hours % 1) * 10 * 6).toFixed(0)
  if (hours < 1) return `${hoursVal} Phút`
  return `${hours | 0} Giờ ${hoursVal} Phút`
}
export function isValidHttpUrl(string: string): boolean {
  let url
  try {
    url = new URL(string)
  } catch (_) {
    return false
  }
  return url.protocol === 'http:' || url.protocol === 'https:'
}
export const spliceArray = (arr: Array<any>, start: number, end: number) => [...arr].splice(start, end)
export const FormatNumber = (money: number, separator = ',') => {
  if (!money) return '0'
  return (money + '').replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1' + separator)
}
export function formatMoneyVND(num: number | string, format = 'đ'): string {
  if (typeof num == 'number') {
    num = Math.floor(num)
    return `${num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')} ${format}`
  } else if (typeof num == 'string') {
    return `${num.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')} ${format}`
  }
  return ''
}
export const toFirstUpperCase = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase()
}
export const toFirstLowerCase = (string: string) => string.charAt(0).toLowerCase() + string.slice(1)
export function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window
  return { width, height }
}
export const getFromLocalStorage: any = (key: string) => {
  let value
  try {
    if (typeof window === undefined) return
    value = JSON.parse(window.localStorage.getItem(key) as any)
  } catch (error) {}
  return value
}
export const setToLocalStorage: any = (key: string, value: any) => {
  if (typeof window === undefined) return
  window.localStorage.setItem(key, JSON.stringify(value))
}
export const getFromSessionStorage: any = (key: string) => {
  let value
  try {
    if (typeof window === undefined) return
    value = JSON.parse(window.sessionStorage.getItem(key) as any)
  } catch (error) {}
  return value
}
export const setToSessionStorage = (key: string, value: any) => {
  if (typeof window === undefined) return
  window.sessionStorage.setItem(key, JSON.stringify(value))
}
export function convertBase64(file: File) {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader()
    fileReader.readAsDataURL(file)
    fileReader.onload = () => resolve(fileReader.result)
    fileReader.onerror = (error) => reject(error)
  })
}
export function convertViToEn(str: string, toUpperCase = false) {
  str = str.toLowerCase()
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a')
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e')
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i')
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o')
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u')
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y')
  str = str.replace(/đ/g, 'd')
  // Some system encode vietnamese combining accent as individual utf-8 characters
  str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, '') // Huyền sắc hỏi ngã nặng
  str = str.replace(/\u02C6|\u0306|\u031B/g, '') // Â, Ê, Ă, Ơ, Ư
  return toUpperCase ? str.toUpperCase() : str
}

// export const formatTimeType = (time: TIME_TYPE): string => {
//   switch (time) {
//     case "day":
//       return "ngày"
//     case "hour":
//       return "giờ"
//     case "minute":
//       return "phút"
//     case "month":
//       return "tháng"
//     case "second":
//       return "giây"
//     case "week":
//       return "tuần"
//     case "year":
//       return "năm"
//     default:
//       break
//   }
//   return "giây"
// }

// export const formatGroupTimeType = (date: GroupTimeType): string => {
//   const type = date.time_type

//   if (type === "date") {
//     return `${date.date_value}`
//   }

//   if (type === "day") {
//     return `${date.date_duration || 1} Ngày trước`
//   }

//   if (type === "today") {
//     return `${date.hour_value} Hôm nay`
//   }

//   if (type === "year") {
//     return `${date.date_value}`
//   }

//   if (type === "yesterday") {
//     return `${date.hour_value} Hôm qua`
//   }

//   return ""
// }

export const calculateElapsedTime = (timeCreated: string) => {
  const created = new Date(timeCreated).getTime()
  const periods: any = {
    year: 365 * 30 * 24 * 60 * 60 * 1000,
    month: 30 * 24 * 60 * 60 * 1000,
    week: 7 * 24 * 60 * 60 * 1000,
    day: 24 * 60 * 60 * 1000,
    hour: 60 * 60 * 1000,
    minute: 60 * 1000
  }
  const diff = Date.now() - created
  for (const key in periods) {
    if (diff >= periods[key]) {
      const result = Math.floor(diff / periods[key])
      return `${result} ${result === 1 ? key : key + 's'} ago`
    }
  }

  return 'Just now'
}
export const toggleBodyOverflow = (status: 'hidden' | 'unset') => {
  const body = document.body
  if (body) {
    status === 'hidden' ? body.classList.add('body-hidden') : body.classList.remove('body-hidden')
  }
}
export const convertToEnNoSpaceAndSpecialCharacter = (address: string) => address.replace(/\W/g, '')
export const formatMoneyVndString = (number: number): string => {
  if (number < 1000000) return formatMoneyVND(number)
  if (number < 1000000000) return (number / 1000000).toFixed(0) + ' triệu'
  return (number / 1000000000).toFixed(0) + ' tỷ'
}
export const toImageUrl = (url: string) => `${process.env.NEXT_PUBLIC_API_URL}${url}`
export const getActiveStringOrListString = (a: string[] | string, b: string[] | string): boolean => {
  if (typeof a !== typeof b) return false
  if (typeof a === 'string') {
    return a === b
  }
  if (typeof a === 'object') {
    return a.length === b.length && a.every((item, index) => item === b[index])
  }
  return false
}
