export const isArry = Array.isArray
export const isNotEmptyArray = (val: any) => isArry(val) && val.length > 0

export function generateRandomString(length = 5) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let result = ''
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length)
    result += chars[randomIndex]
  }
  return result
}

export function mapLabelValue(list: any[], labelKey: string, valueKey: string) {
  return list.map((item) => ({
    label: item[labelKey],
    value: item[valueKey],
  }))
}

export function formatBytes(bytes: number) {
  const units = ['B', 'KB', 'MB', 'GB']; // 定义单位数组
  let unitIndex = 0
  while(bytes >= 1024 && unitIndex < units.length - 1) {
    bytes = bytes / 1024
    unitIndex ++
  }
  return bytes.toFixed(2) + units[unitIndex]
}


export function generateUniqueId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
}
