const class2Type = {},
  toString = class2Type.toString,
  hasOwn = class2Type.hasOwnProperty,
  isArray = Array.isArray

const toType = function toType(val: any) {
  if (val == null) return val + ''
  const reg = /^\[object ([\w\W]+)\]$/
  return typeof val === 'object' || typeof val === 'function'
    ? reg.exec(toString.call(val))[1].toLocaleLowerCase()
    : typeof val
}

const isFunction = function isFunction(val: any) {
  return (
    typeof val === 'function' && typeof val.nodeType !== 'number' && typeof val.item !== 'function'
  )
}

const isWindow = function isWindow(val: any) {
  return val != null && typeof val === 'object' && val === val.window
}

// 判断是否为一个类数组
const isArrayLike = function isArrayLike(val: any) {
  const length = val?.length
  const type = toType(val)
  if (isFunction(val) || isWindow(val)) return false
  return (
    type === 'array' ||
    length === 0 ||
    (typeof length === 'number' && length > 0 && length - 1 in val)
  )
}

// 判断是否是有值数组
const isNotEmptyArray = function isEmptyArray(val: any) {
  return isArray(val) && val.length > 0
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
  let keys: any[] = Object.getOwnPropertyNames(val)
  if (typeof Symbol !== 'undefined') {
    keys = keys.concat(Object.getOwnPropertySymbols(val))
  }
  return keys
}

// 检测是否为空对象
const isEmptyObject = function isEmptyObject(val: any) {
  if (!isPlainObject(val)) throw new TypeError(`The ${val} must be an object`)
  const objKeys = getObjectKeys(val)
  return objKeys.length === 0
}

// 判断是否是一个有效数字, 支持字符串例如: '123'
const isNumberic = function isNumberic(val: any) {
  const type = toType(val)
  return (type === 'string' || type === 'number') && !isNaN(val - parseFloat(val))
}

// 数组和对象的合并, 以及支持类数组
const mergeArrayOrObject = function mergeArrayOrObject(first: any, second: any) {
  /**
   * 1. 判断first和second的值
   */
  if (typeof first === 'string') first = Object(first)
  if (typeof second === 'string') second = Object(second)
  if (!isArrayLike(first)) first = []
  if (!isArrayLike(second)) second = []
  let len = second.length,
    j = 0,
    i = first.length
  for (; j < len; j++) {
    first[i++] = second[j]
  }
  first.length = i
  return first
}

// 循环迭代方法
const each = function each(listOrObj: any, callback: Function) {
  if (!isFunction(callback)) throw new TypeError(`${callback} is not a function`)
  const isArrayType = isArray(listOrObj),
    isObjectType = isPlainObject(listOrObj)
  if (!isArrayType && !isObjectType)
    throw new TypeError(`${listOrObj} must be a array or likeArray or plainObject`)
  if (isArrayType) {
    for (let i = 0; i < listOrObj.length; i++) {
      const item = listOrObj[i],
        index = i
      if (callback.call(item, item, index) === false) break
    }
    return listOrObj
  }
  const objKeys = getObjectKeys(listOrObj)
  for (let i = 0; i < objKeys.length; i++) {
    const key = objKeys[i],
      value = listOrObj[key]
    if (callback.call(value, value, key) === false) break
  }
  return listOrObj
}

/**
 * * 实现数组和对象的深浅合并
 * 1. merge(obj1)  不合并
 * 2. merge(obj1,obj2) 浅合并
 * 3. merge(true, obj1, obj2) 深合并
 * @param params
 */
const merge = function merge(...params: any[]) {
  let options,
    target = params[0],
    i = 1,
    length = params.length,
    deep = false,
    treated = params[length - 1]
  // 处理是深合并还是浅合并
  if (typeof target === 'boolean') {
    deep = target
    target = params[i]
    i++
  }
  // 用来解决死递归, 循环引用的问题
  if (toType(treated) === 'set' && treated.saveHandle) {
    // 最后一项无需处理
    length--
  } else {
    treated = new Set()
    treated.saveHandle = true
  }
  // 必须保证被替换项是一个对象
  if (target == null || (typeof target !== 'object' && !isFunction(target))) target = {}
  // 迭代传递剩下的对象依次替换
  for (; i < length; i++) {
    options = params[i]
    if (options == null) continue
    if (treated.has(options)) {
      return options
    } else {
      treated.add(options)
    }

    each(options, (copyValue: any, keyOrIndex: string | number | symbol) => {
      let copyIsArray = isArray(copyValue),
        copyIsObject = isPlainObject(copyValue),
        src = target[keyOrIndex]

      if (deep && copyValue && (copyIsArray || copyIsObject)) {
        if (copyIsArray && !isArray(src)) src = []
        if (copyIsObject && !isPlainObject(src)) src = {}
        target[keyOrIndex] = merge(deep, src, copyValue, treated)
      } else if (copyValue != undefined) {
        target[keyOrIndex] = copyValue
      }
    })
  }
  return target
}

export const util = {
  toType,
  isFunction,
  isWindow,
  isArray,
  isArrayLike,
  isPlainObject,
  getObjectKeys,
  isEmptyObject,
  isNotEmptyArray,
  isNumberic,
  mergeArrayOrObject,
  each,
  merge,
}
