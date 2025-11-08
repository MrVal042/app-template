import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import isToday from 'dayjs/plugin/isToday'
import isYesterday from 'dayjs/plugin/isYesterday'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)
dayjs.extend(isToday)
dayjs.extend(isYesterday)
dayjs.extend(customParseFormat)

type DayKeys = 'year' | 'month' | 'day' | 'date' | 'dateTime' | 'month-full'

export const getToday = (type: DayKeys) => {
  switch (type) {
    case 'year':
      return dayjs().format('YYYY')
    case 'month':
      return dayjs().format('MMM')
    case 'month-full':
      return dayjs().format('MMMM')
    case 'day':
      return dayjs().format('DD')
    case 'date':
      return dayjs().format('YYYY-MM-DD')
    default:
      return dayjs().format('MMM DD, YYYY: hh:mm A')
  }
}

export const checkDateDiff = ({
  dateStr,
}: {
  dateStr: string | null
}): { status: boolean; newDate: string } => {
  const now = dayjs()

  // If null, treat as first login or force update
  if (!dateStr) {
    const newDate = getToday('dateTime')
    return { status: true, newDate }
  }

  const diffInDays = now.diff(dayjs(dateStr), 'day')

  if (diffInDays > 0) {
    const newDate = getToday('dateTime')
    return { status: true, newDate }
  }

  return { status: false, newDate: dateStr }
}

export const formatChatTimestamp = (dateStr: string | null) => {
  // Check if string is an ISO date or embedded inside a sentence
  let parsed: dayjs.Dayjs
  if (!dateStr) return 'NA'

  // Case 1: Raw ISO string like "2025-07-25T12:51:23.957009+00:00"
  if (dayjs(dateStr).isValid()) {
    parsed = dayjs(dateStr)
  } else {
    // Case 2: Embedded date like "last seen: 25/07/2025 14:04"
    const match = dateStr.match(/(\d{2}\/\d{2}\/\d{4} \d{2}:\d{2})/)
    if (!match) return dateStr
    parsed = dayjs(match[1], 'DD/MM/YYYY HH:mm')
  }

  if (!parsed.isValid()) return dateStr

  if (parsed.isToday()) return parsed.format('hh:mm A') // e.g. "02:04 PM"
  if (parsed.isYesterday()) return 'Yesterday'
  return parsed.format('MMM DD hh:mm A') // e.g. "Jul 25 12:51 PM"
}

type ReturnTypes =
  | '2 day ago'
  | 'June, 2025'
  | '22-07-2025'
  | '2025-07-22'
  | '2025/07/22'
  | '22/07/2025'
  | '15'
  | '2025'
  | 'June'
  | 'Friday'
  | 'Friday, June 18'
  | 'Fri, 18 Jun 2025'
  | 'Jun 12, 2025'
  | 'Jun 12, 2025: 10:00 AM'

export const formatDate = (date: string | null, returnType?: ReturnTypes) => {
  if (!date || date === null) return 'NA'

  switch (returnType) {
    case '2 day ago':
      return dayjs(date).fromNow() // e.g., "2 days ago"
    case '15':
      return dayjs(date).format('DD')
    case 'June':
      return dayjs(date).format('MMMM')
    case '2025':
      return dayjs(date).format('YYYY')
    case 'Friday, June 18':
      return dayjs(date).format('dddd, MMMM DD')
    case 'Fri, 18 Jun 2025':
      return dayjs(date).format('ddd, DD MMM YYYY')
    case 'Friday':
      return dayjs(date).format('dddd')
    case '22-07-2025':
      return dayjs(date).format('DD-MM-YYYY')
    case '2025-07-22':
      return dayjs(date).format('YYYY-MM-DD')
    case '2025/07/22':
      return dayjs(date).format('YYYY/MM/DD')
    case '22/07/2025':
      return dayjs(date).format('DD/MM/YYYY')
    case 'Jun 12, 2025':
      return dayjs(date).format('MMM DD, YYYY')
    case 'Jun 12, 2025: 10:00 AM':
      return dayjs(date).format('MMM DD, YYYY: hh:mm A')
    default:
      return dayjs(date).format('MMM DD, YYYY')
  }
}

export const formatTimeRange = (
  start_time: string | null, // e.g., "11:00 AM"
  duration_minutes: number | null // e.g., 120
): string => {
  if (!start_time || !duration_minutes) return 'NA'
  const parseTime = (time: string) => {
    return dayjs(time, 'hh:mm A')
  }
  const start = parseTime(start_time)
  const end = start.add(duration_minutes, 'minute')

  return `${start.format('hh:mm a')} - ${end.format('hh:mm a')}`
}

export const formatDuration = (duration_minutes: number | null): string => {
  if (!duration_minutes) return 'NA'
  const hours = Math.floor(duration_minutes / 60)
  const minutes = duration_minutes % 60

  const hoursPart = hours > 0 ? `${hours} hr${hours > 1 ? 's' : ''}` : ''
  const minutesPart =
    minutes > 0 ? `${minutes} min${minutes > 1 ? 's' : ''}` : ''
  if (hoursPart && minutesPart) return `${hoursPart} : ${minutesPart}`
  return hoursPart || minutesPart || '0 mins'
}
