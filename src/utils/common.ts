import { jwtDecode, JwtPayload } from 'jwt-decode'
import { TGService } from '@/types/common.ts'

/**
 * Capitalizes the first letter of the given string.
 *
 * @param {string} string - The string to be capitalized.
 * @returns {string} - The string with the first letter capitalized.
 *                     If the input is not a string or is an empty string, the original input is returned.
 */
export function capitalizeFirstLetter(string: string) {
  if (string.length === 0) return string
  return string.charAt(0).toUpperCase() + string.slice(1)
}

/**
 * Counts the number of occurrences of a character in a string.
 * @param {string} str - The string to search within.
 * @param {string} char - The character to count.
 * @returns {number} The number of occurrences of the character in the string.
 */
export const countOccurrences = (str: string, char: string) => {
  let count = 0
  for (let i = 0; i < str.length; i++) {
    if (str[i] === char) count++
  }
  return count
}

/**
 * Deep comparison function that uses loose equality (==) instead of strict equality (===).
 *
 * @param value - The first value to compare.
 * @param other - The second value to compare.
 * @returns Returns true if the values are equal, false otherwise.
 */
export function isEqualLoose(value: never, other: never): boolean {
  if (value == other) return true
  if (typeof value !== 'object' || typeof other !== 'object' || value === null || other === null) {
    return value == other
  }
  const valueKeys = Object.keys(value)
  const otherKeys = Object.keys(other)
  if (valueKeys.length !== otherKeys.length) return false
  for (const key of valueKeys) {
    if (!isEqualLoose(value[key], other[key])) return false
  }
  return true
}

/**
 * Converts a file from a given URL into a File object with a specified filename.
 * @param {string} url - The URL of the file to fetch.
 * @param {string} filename - The desired filename for the resulting File object.
 * @returns {Promise<File>} A Promise that resolves to a File object representing the fetched file.
 * @throws {Error} If there is an error during fetching or creating the File object.
 */
export async function convertUrlToFile(url: string, filename: string) {
  const response = await fetch(url)
  const blob = await response.blob()
  return new File([blob], filename, { type: blob.type })
}

/**
 * Checks if a JWT is valid and has not expired.
 *
 * @param {string} token - The JWT to be checked.
 * @returns {boolean} - Returns true if the JWT has expired, false otherwise.
 */
export function checkJWTExpire(token: string) {
  try {
    const decoded: JwtPayload = jwtDecode(token)
    return (decoded.exp ?? 1) * 1000 > Date.now()
  } catch (error) {
    return false
  }
}

type Schedule = { id: number; day: string; start: string; end: string; user_id: string }
type Change = { from: string | number; to: string | number }
type ChangedObject = { id: number; changes: { [key: string]: Change } }

/**
 * Compares two arrays of Schedule objects and returns the objects that have changed.
 *
 * @param {Schedule[]} array1 - The first array of Schedule objects.
 * @param {Schedule[]} array2 - The second array of Schedule objects.
 * @returns {ChangedObject[]} An array of objects with the id and the changes.
 * @throws {Error} If the arrays have different lengths.
 */
export function compareArrays(array1: Schedule[], array2: Schedule[]): ChangedObject[] {
  if (array1.length !== array2.length) throw new Error('Arrays have different lengths')
  const changedObjects: ChangedObject[] = []
  array1.forEach((obj1, index) => {
    const obj2 = array2[index]
    const changes: { [key: string]: Change } = {}
    Object.keys(obj1).forEach((key) => {
      if (obj1[key as keyof Schedule] !== obj2[key as keyof Schedule]) {
        changes[key] = { from: obj1[key as keyof Schedule], to: obj2[key as keyof Schedule] }
      }
    })
    if (Object.keys(changes).length > 0) changedObjects.push({ id: obj1.id, changes })
  })

  return changedObjects
}

type ScheduleArray = { id: number; day: string; start: string; end: string; user_id: string }

/**
 * Compares two arrays of Schedule objects and returns the objects from the first array that have changed.
 *
 * @param {Schedule[]} array1 - The first array of Schedule objects.
 * @param {Schedule[]} array2 - The second array of Schedule objects.
 * @returns {Schedule[]} An array of Schedule objects from the first array that have changed.
 * @throws {Error} If the arrays have different lengths.
 */
export function getChangedFromArrays(array1: ScheduleArray[], array2: ScheduleArray[]): ScheduleArray[] {
  if (array1.length !== array2.length) throw new Error('Arrays have different lengths')
  const changedObjects: ScheduleArray[] = []
  array1.forEach((obj1, index) => {
    const obj2 = array2[index]
    for (const key in obj1) {
      if (obj1[key as keyof ScheduleArray] !== obj2[key as keyof ScheduleArray]) {
        changedObjects.push(obj1)
        break
      }
    }
  })

  return changedObjects
}

/**
 * Sort Array By Field Name
 *
 * @param {array} array - The  array  objects.
 * @param {string} fieldName - The  array  objects.
 * @returns {array} An array was ordered by field fieldName.
 * @throws {Error} If the arrays have different lengths.
 */
export function sortByFieldName<T>(array: T[], fieldName: keyof T) {
  return array.sort((a, b) => {
    const fieldA = a[fieldName]
    const fieldB = b[fieldName]
    if (typeof fieldA === 'number' && typeof fieldB === 'number') return fieldA - fieldB
    if (typeof fieldA === 'string' && typeof fieldB === 'string') return fieldA.localeCompare(fieldB)
    return 0
  })
}

/**
 * Generates a random integer between the specified minimum and maximum values, inclusive.
 *
 * @param {number} min - The minimum value (inclusive).
 * @param {number} max - The maximum value (inclusive).
 * @returns {number} A random integer between min and max, inclusive.
 */
export function getRandomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

/**
 * Generates a random ID consisting of alphanumeric characters.
 *
 * @param {number} length - The length of the generated ID.
 * @returns {string} A random alphanumeric ID.
 */
export function getRandomID(length: number): string {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let result = ''
  for (let i = 0; i < length; i++) {
    const randomIndex = getRandomNumber(0, characters.length - 1)
    result += characters[randomIndex]
  }
  return result
}

/**
 * Checks if a given file name can be viewed in a web browser.
 *
 * @param {string} fileName - The name of the file to check.
 * @returns {boolean} - Returns true if the file can be viewed in a web browser, otherwise false.
 */
export function canViewFileInBrowser(fileName: string): boolean {
  // List of common file extensions that can be viewed in a web browser
  const viewableExtensions = [
    '.html',
    '.htm',
    '.txt',
    '.pdf',
    '.jpg',
    '.jpeg',
    '.png',
    '.gif',
    '.svg',
    '.webp',
    '.bmp',
    '.ico',
    '.tiff',
    '.mp4',
    '.webm',
    '.ogg',
    '.mp3',
    '.wav',
    '.ogv',
    '.json'
  ]

  // Extract the file extension from the file name
  const fileExtension = fileName.slice(fileName.lastIndexOf('.')).toLowerCase()

  // Check if the file extension is in the list of viewable extensions
  return viewableExtensions.includes(fileExtension)
}

/**
 * Convert bytes to a human-readable string with appropriate units (KB, MB, GB).
 * If the value is less than 3 MB, return in KB. If it is between 3 MB and 3 GB, return in MB.
 * Otherwise, return in GB.
 *
 * @param {number} bytes - The number of bytes to convert.
 * @param {number} [decimals=2] - The number of decimal places to use in the result.
 * @returns {string} The formatted string with appropriate units.
 */
export function formatBytes(bytes: number, decimals = 2): string {
  const k = 1024
  const dm = decimals < 0 ? 0 : decimals

  if (bytes < Math.pow(k, 2)) {
    // Less than 1 MB, return in KB
    return parseFloat((bytes / k).toFixed(dm)) + ' KB'
  } else if (bytes < 3 * Math.pow(k, 3)) {
    // Less than 3 GB, return in MB
    return parseFloat((bytes / Math.pow(k, 2)).toFixed(dm)) + ' MB'
  } else {
    // 3 GB or more, return in GB
    return parseFloat((bytes / Math.pow(k, 3)).toFixed(dm)) + ' GB'
  }
}

/**
 * Returns an array of elements from array2 that do not have matching ids in array1.
 *
 * @param {any[]} array1 - The first array of objects with id property.
 * @param {any[]} array2 - The second array of objects with id property.
 * @returns {any[]} - An array of objects from array2 whose ids are not found in array1.
 */
export function getChangedValueInArray(array1: any[], array2: any[]): any[] {
  return array2.filter((item2) => !array1.some((item1) => item1.id === item2.id))
}

export function getLabelFromService(serviceArray: TGService[], names: string[]): string {
  const labels = serviceArray.filter((service) => names.includes(service.name)).map((service) => service.label)
  return labels.join(', ')
}

/**
 * Formats a number into a currency string with commas as thousands separators and a dollar sign ($).
 *
 * @param amount - The number to be formatted as currency.
 * @param locale - Optional locale string to define the number format (default is 'en-US').
 * @param currencySymbol - Optional currency symbol (default is '$').
 * @returns The formatted currency string.
 *
 * @example
 * ```typescript
 * formatCurrency(1234567.89); // "$1,234,567.89"
 * formatCurrency(1234567.89, 'de-DE', '€'); // "1.234.567,89 €"
 * ```
 */
function formatCurrency(amount: number, locale = 'en-AU'): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: 'AUD', // Australian Dollar
    minimumFractionDigits: 2
  })
    .format(amount)
    .replace('A$', '') // Removes the 'A$' symbol from the formatted string
}

export default formatCurrency

/**
 * Formats the number of days based on whether it's singular or plural.
 *
 * @param days - The number of days to format.
 * @returns A formatted string with "day" or "days" based on the number of days.
 */
export function formatPluralDays(days: number): string {
  const pluralRules = new Intl.PluralRules('en-US')
  const dayLabel = pluralRules.select(days) === 'one' ? 'day' : 'days'
  return `${days} ${dayLabel}`
}
