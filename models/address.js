import Http from "../utils/http.js";
import { isObjEqual } from "../utils/util.js"

class Address extends Http {
  addressKey = 'address'

  async get() {
    let address = this._getAddressOfStorage()
    if (address) {
      return address
    }
    address = await this.request({ url: 'address', loginRequired: false })
    if (address) {
      this._setAddressToStorage(address)
    }
    return address
  }

  async edit(data) {
    const address = this._getAddressOfStorage()
    if (address) {
      if (isObjEqual(address, data)) {
        return true
      }
    }
    const res = await this.request({
      url: 'address',
      method: 'POST',
      data,
    })
    if (res) {
      this._setAddressToStorage(data)
    }
    return res
  }

  _getAddressOfStorage() {
    return wx.getStorageSync(this.addressKey)
  }

  _setAddressToStorage(data) {
    wx.setStorageSync(this.addressKey, data)
  }
}

export default new Address()
