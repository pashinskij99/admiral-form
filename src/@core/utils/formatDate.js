export const formatDate = (inputDate) => {
  const date = new Date(inputDate)

  return ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate())) + '.' + (((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '.' + date.getFullYear())
}
