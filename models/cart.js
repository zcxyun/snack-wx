import Http from '../utils/http.js'
import { isArrEqual } from "../utils/util.js";
const app = getApp()

class Cart extends Http {
  cartKey = 'cart'

  async getProducts() {
    let cart = null
    if (!app.state.refreshCartStorage) {
      cart = this.getCartOfStorage()
      if (cart) {
        return cart
      }
    }
    cart = await this.request({ url: 'cart/products', loginRequired: false })
    if (cart) {
      this.setCartToStorage(cart)
      app.state.refreshCartStorage = false
      return cart
    }
  }

  async getTotalCount() {
    const res = await this.request({
      url: 'cart/products/count',
      loginRequired: false,
    })
    return res
  }

  async edit(product_id, count, selected = true) {
    const res = await this.request({
      url: `cart`,
      method: 'POST',
      data: { product_id, count, selected }
    })
    if (res) {
      app.state.refreshCartStorage = true
    }
    return res
  }

  async editAll(data) {
    if (!Array.isArray(data)) {
      return false
    }
    data.forEach((item) => { delete item.slideClose })
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

  setCartToStorage(cart) {
    wx.setStorageSync(this.cartKey, cart)
  }

  getCartOfStorage() {
    return wx.getStorageSync(this.cartKey)
  }
}

export default new Cart()
