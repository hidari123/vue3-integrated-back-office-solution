/**
 * 判断是否为外部资源
 */
export const isExternal = (path) => {
  return /^(http?:|mailto:|tel:)/.test(path)
}
