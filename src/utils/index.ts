/**
 *
 * @param {*} all
 * @returns 类型String
 */
const Typeing = (item: any): string => {
  return Object.prototype.toString.call(item).slice(8, -1).toLowerCase()
}
