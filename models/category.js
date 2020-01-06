import Http from '../utils/http.js'

class Category extends Http {

  productKey = 'category-'

  get(id) {
    return this.request({
      url: `category/${id}`
    })
  }

  getAll() {
    return this.request({
      url: 'category/all'
    })
  }

  getAllWithMiniImg() {
    return this.request({
      url: 'category/all/with/mini_img'
    })
  }

  async getWithProducts(cid) {
    // let products = this.getProductsFromStorage(cid)
    // if (!products) {
    const products = await this.request({
      url: `category/${cid}/products`
    })
      // if (products) {
      //   this.setProductsToStorage(cid, products)
      //   return products
      // }
    // }
    return products
  }
  // getProductsFromStorage(cid) {
  //   return wx.getStorageSync(this.productKey + cid)
  // }
  // setProductsToStorage(cid, products) {
  //   wx.setStorageSync(this.productKey + cid, products)
  // }
}

export default new Category()
