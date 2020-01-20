// 日期相关
const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const dateStrAddSeconds = function (datetimestr, seconds) {
  const date = new Date(datetimestr);
  const addSeconds = date.getSeconds() + seconds
  date.setSeconds(addSeconds)
  return formatTime(date)
}

// 判断类型
const type = function (obj) {
  const { toString } = Object.prototype
  const map = {
    '[object Boolean]': 'boolean',
    '[object Number]': 'number',
    '[object String]': 'string',
    '[object Function]': 'function',
    '[object Array]': 'array',
    '[object Date]': 'date',
    '[object RegExp]': 'regExp',
    '[object Undefined]': 'undefined',
    '[object Null]': 'null',
    '[object Object]': 'object',
  }
  return map[toString.call(obj)]
}

// 数字相关
// 保留指定位数的小数(四舍五入)
const zround = (n, decimals = 0) => {
  return Number(`${Math.round(`${n}e${decimals}`)}e-${decimals}`)
}

// 小数位补0(货币)
const num2money = (num, count = 2) => {
  if (typeof num !== 'number') {
    console.error('要补0的值不是有效数字')
    return
  }
  let numArr = zround(num, 2).toString().split('.')
  if (numArr.length === 1) {
    return numArr[0] + '.00'
  }
  if (numArr.length === 2) {
    let [i, d] = numArr
    if (d.length === 0) {
      return i + '.00'
    }
    if (d.length === 1) {
      return i + '.' + d + '0'
    }
    if (d.length === 2) {
      return i + '.' + d
    }
  }
  if (numArr.length > 2) {
    console.error('要补0的值不是有效数字')
    return
  }
}

// 判断两个对象的内容是否相等(浅对象)
const isObjEqual = function(oobj, dobj) {
  if (type(oobj) !== 'object' || type(dobj) !== 'object') {
    return false
  }
  return Object.keys(oobj).every(key => oobj[key] === dobj[key])
}

// 判断两个数组的内容是否一样(数组元素为对象, 对象比较为浅对象))
const isArrEqual = function (oArr, dArr) {
  if (Array.isArray(oArr) && Array.isArray(dArr)) {
    if (oArr.length !== dArr.length) {
      return false
    }
    return oArr.every((item, index) => {
      return isObjEqual(item, dArr[index])
    })
  }
  return false
}

const isEmptyArray = function (arr) {
  return Array.isArray(arr) && arr.length === 0
}

const isNotEmptyArray = function (arr) {
  return Array.isArray(arr) && arr.length > 0
}

// 回调函数 promise 化
const promisic = function (func) {
  return function ({...args}={}) {
    return new Promise((resolve, reject) => {
      const params = Object.assign(args, {
        success(res) {
          resolve(res)
        },
        fail(err) {
          reject(err)
        }
      })
      func(params)
    })
  }
}

// 登录相关
const accessTokenKey = 'accessToken'
const refreshTokenKey = 'refreshToken'
const loginStatusKey = 'loginStatus'

const setTokensToStorage = function(accessToken, refreshToken) {
  wx.setStorageSync(accessTokenKey, `Bearer ${accessToken}`)
  wx.setStorageSync(refreshTokenKey, `Bearer ${refreshToken}`)
}

const getAccessTokenFromStorage = function() {
  return wx.getStorageSync(accessTokenKey) || null
}
const getRefreshTokenFromStorage = function() {
  return wx.getStorageSync(refreshTokenKey) || null
}

const setLoginStatusToStorage = function(status) {
  wx.setStorageSync(loginStatusKey, status)
}

const getLoginStatusOfStorage = function() {
  return wx.getStorageSync(loginStatusKey) || false
}

export {
  dateStrAddSeconds,
  type,
  isObjEqual,
  isArrEqual,
  isEmptyArray,
  isNotEmptyArray,
  formatTime,
  zround,
  num2money,
  promisic,
  setTokensToStorage,
  getAccessTokenFromStorage,
  getRefreshTokenFromStorage,
  setLoginStatusToStorage,
  getLoginStatusOfStorage,
}
