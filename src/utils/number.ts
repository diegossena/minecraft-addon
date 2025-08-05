export function clamp(value: number, lower: number, higher: number) {
  return Math.min(Math.max(value, lower), higher)
}
export function number_abbreviate(number: any): string {
  const units = ['k', 'M', 'B', 'T']
  for (let i = units.length - 1; i >= 0; i--) {
    const size = Math.pow(10, (i + 1) * 3)
    if (size <= number) {
      return (
        (number < 0 ? '-' : '')
        + (Math.round(number * 10 / size) / 10).toFixed(1)
        + units[i]
      )
    }
  }
}