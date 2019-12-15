import Http from '../utils/http.js'

class Keyword extends Http {
  maxLength = 8
  historyKeys = 'historyKeys'
  getHotKeys() {
    return this.request({
      url: 'keyword/hots'
    })
  }
  setHotKey(key) {
    return this.request({
      url: 'keyword',
      method: 'POST',
      data: {key}
    })
  }
  getHistoryKeys() {
    return wx.getStorageSync(this.historyKeys) || []
  }
  setHistoryKey(key) {
    const keys = this.getHistoryKeys()
    if (!keys.includes(key)) {
      keys.unshift(key)
      if (keys.length > this.maxLength) {
        keys.pop()
      }
      wx.setStorageSync(this.historyKeys, keys)
    }
    return keys
  }
}

export default new Keyword()
