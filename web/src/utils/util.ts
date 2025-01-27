const class2Type = {},
  toString = class2Type.toString,
  hasOwn = class2Type.hasOwnProperty,
  isArray = Array.isArray

const toType = function toType(val: any) {
  if (val == null) return val + ''
  const reg = /^\[object ([\w\W]+)\]$/
  return typeof val === 'object' || typeof val === 'function' ? reg.exec(toString.call(val))[1].toLocaleLowerCase() : typeof val
}

const isFunction = function isFunction(val: any) {
  return typeof val === 'function' && typeof val.nodeType !== 'number' && typeof val.item !== 'function'
}

const isWindow = function isWindow(val: any) {
  return val != null && typeof val === 'object' && val === val.window
}

// 判断是否为一个类数组
const isArrayLike = function isArrayLike(val: any) {
  const length = val?.length
  const type = toType(val)
  if (isFunction(val) || isWindow(val)) return false
  return type === 'array' || length === 0 || (typeof length === 'number' && length > 0 && length - 1 in val)
}

const isPlainObject = function isPlainObject(val: any) {
  if (!val || toType(val) !== 'object') return false
  let proto: any, Ctor: any
  proto = Object.getPrototypeOf(val)
  // * 特殊情况: Object.create(null)
  if (!proto) return true
  Ctor = hasOwn.call(proto, 'constructor') && proto.constructor
  return typeof Ctor === 'function' && Ctor === Object
}

// 获取对象的所有属性, 包含不可枚举以及Symbol
const getObjectKeys = function getObjectKeys(val: any) {
  if (!isPlainObject(val)) return []
  let keys = Object.getOwnPropertyNames(val)
  if (typeof Symbol !== 'undefined') {
    // keys = keys.concat(Object.getOwnPropertySymbols(val))
  }
  return keys
}

// 检测是否为空对象
const isEmptyObject = function isEmptyObject(val: any) {}

export const util = {
  toType,
  isFunction,
  isWindow,
  isArray,
  isArrayLike,
  isPlainObject,
}
