// Ex: formatTimes("2023-12-13T04:00:30.065246") => 1 days ago
// Ex: formatTimes("2023-12-13T04:00:30.065246", "dateMonth") => 13/12
// Ex: formatTimes("2023-12-13T04:00:30.065246", "dateMonthYear") => 13/12/2023
// Ex: formatTimes("2023-12-13T04:00:30.065246", "dateFull") => Wednesday, 13 December 2023, 4:00 PM
// Ex: formatTimes("2023-12-13T04:00:30.065246", "dateHourDateMonthYear") => 4:00 13/12/2023

import {
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  differenceInMonths,
  differenceInWeeks,
  differenceInYears,
  format,
} from 'date-fns';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
/* Version Minh Trung */

const formatTimes = (data: string, formatType?: string) => {
  // Initial value of the difference in time
  let result = ``;

  // Convert data to type Date
  const inputDate = new Date(data);
  const currentDate = new Date();

  // Format date strings
  const typeDateMonth = format(inputDate, 'dd/MM');
  const typeMonthDateYear = format(inputDate, 'dd MMM, yyyy');
  const typeDateMonthYear = format(inputDate, 'dd/MM/yyyy');
  const typeDateFull = format(inputDate, 'EEEE, d MMMM yyyy, h:mm a');
  const typeHourDateMonthYear = format(inputDate, 'HH:mm dd/MM/yyyy');

  // Calculate time differences
  const diffMinutes = differenceInMinutes(currentDate, inputDate);
  const diffHours = differenceInHours(currentDate, inputDate);
  const diffDays = differenceInDays(currentDate, inputDate);
  const diffWeeks = differenceInWeeks(currentDate, inputDate);
  const diffMonths = differenceInMonths(currentDate, inputDate);
  const diffYears = differenceInYears(currentDate, inputDate);

  // Check if input data is available
  if (!data) {
    result = `No data`;
  } else {
    switch (true) {
      case formatType === `dateMonth`:
        result = typeDateMonth;
        break;
      case formatType === `monthDateYear`:
        result = typeMonthDateYear;
        break;
      case formatType === `dateMonthYear`:
        result = typeDateMonthYear;
        break;
      case formatType === `dateFull`:
        result = typeDateFull;
        break;
      case formatType === `dateHourDateMonthYear`:
        result = typeHourDateMonthYear;
        break;
      case diffMinutes < 0:
        result = `Invalid data`;
        break;
      case diffMinutes >= 0 && diffMinutes < 1:
        result = `Just now`;
        break;
      case diffMinutes >= 1 && diffMinutes < 60:
        result = `${diffMinutes} minutes ago`;
        break;
      case diffHours >= 1 && diffHours < 24:
        result = `${diffHours} hours ago`;
        break;
      case diffDays >= 1 && diffDays < 7:
        result = `${diffDays} days ago`;
        break;
      case diffDays >= 7 && diffDays < 31:
        result = `${diffWeeks} weeks ago`;
        break;
      case diffMonths >= 1 && diffMonths < 12:
        result = `${diffMonths} months ago`;
        break;
      default:
        result = `${diffYears} years ago`;
        break;
    }
  }
  return result;
};

export default formatTimes;


// Cần thêm plugin relativeTime vào dayjs
dayjs.extend(relativeTime);

/**
 * Formats the given date into a relative time string (e.g., "1 hour ago", "2 days ago").
 *
 * @param date - The date to be formatted (either a Date object, string, or number).
 * @returns A relative time string describing how long ago the date was.
 *
 * @example
 * ```typescript
 * formatDate(new Date()); // "just now"
 * formatDate('2023-09-15T15:00:00Z'); // "2 days ago"
 * ```
 */
export function formatTimesInstant(date: Date | string | number): string {
  return dayjs(date).fromNow(); // Sử dụng dayjs để tính thời gian tương đối
}



