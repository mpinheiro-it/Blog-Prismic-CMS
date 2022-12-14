export function calculateReadingTime(contentAll: string[]): number {
  return contentAll.reduce((prev, content) => {
    const text = content.split(' ')
    const minutes = (text.length) / 200
    return prev + Math.ceil(minutes)
  }, 0)
}