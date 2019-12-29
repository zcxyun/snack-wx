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

// 判断类型
function type(obj) {
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

// 判断一个两个数组的内容是否一样(数组元素为对象))
const isArrEqual = function (oArr, dArr) {
  if (Array.isArray(oArr) && Array.isArray(dArr)) {
    if (oArr.length !== dArr.length) {
      return false
    }
    return oArr.every((item, index) => {
      const { toString } = Object.prototype
      const objDes = '[object Object]'
      if (toString.call(item) !== objDes || toString.call(dArr[index]) !== objDes) {
        return false
      }
      return Object.keys(item).every(key => item[key] === dArr[index][key])
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
