export default function formatDate(inputDate: string): string {
  const date = new Date(inputDate)
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'short',
    month: 'short',
    day: '2-digit',
    year: 'numeric'
  }
  return date.toLocaleDateString('en-US', options)
}
