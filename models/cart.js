import Http from '../utils/http.js'
import { isArrEqual } from "../utils/util.js";

class Cart extends Http {
  cartKey = 'cart'
  noRefreshCartStorageKey = 'noRefreshCartStorage'
  canSettleKey = 'canSettle'

  async getProducts() {
    let cart = null
    if (this.getNoRefreshCartStorage()) {
      cart = this.getCartOfStorage()
      if (cart) {
        return cart
      }
    }
    cart = await this.request({ url: 'cart/products' })
    if (cart) {
      this.setCartToStorage(cart)
      this.setNoRefreshCartStorage(true)
      return cart
    }
  }

  getTotalCount() {
    return this.request({
      url: 'cart/products/count'
    })
  }

  async edit(product_id, count, selected = true) {
    const res = await this.request({
      url: `cart`,
      method: 'POST',
      data: { product_id, count, selected }
    })
    if (res) {
      this.setNoRefreshCartStorage(false)
    }
    return res
  }

  async editAll(data) {
    if (!Array.isArray(data)) {
      return false
    }
    let cart = this.getCartOfStorage()
    if (cart) {
      if (isArrEqual(data, cart)) {
        return true
      }
    }
    const defineData = data.map((item) => {
      return {
        product_id: item.id,
        count: item.count,
        selected: item.selected,
      }
    })
    const res = await this.request({
      url: 'cart/all',
      method: 'POST',
      data: defineData,
    })
    if (res) {
      this.setCartToStorage(data)
    }
    return res
  }

  async clear() {
    const res = await this.request({
      url: 'cart',
      method: 'DELETE'
    })
    if (res) {
      this.setCartToStorage([])
    }
    return res
  }

  getNoRefreshCartStorage() {
    return wx.getStorageSync(this.noRefreshCartStorageKey)
  }

  setNoRefreshCartStorage(refresh) {
    wx.setStorageSync(this.noRefreshCartStorageKey, refresh)
    // wx.setStorage({
    //   key: this.noRefreshCartStorageKey,
    //   data: refresh,
    // })
  }

  setCartToStorage(cart) {
    wx.setStorageSync(this.cartKey, cart)
    // wx.setStorage({
    //   key: this.cartKey,
    //   data: cart,
    // })
  }

  getCartOfStorage() {
    return wx.getStorageSync(this.cartKey)
  }

  getCanSettleAccount() {
    return wx.getStorageSync(this.canSettleKey)
  }

  setCanSettleAccount(can) {
    wx.setStorageSync(this.canSettleKey, can)
  }

}

export default new Cart()
