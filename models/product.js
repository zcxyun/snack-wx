import Http from '../utils/http.js'
import {config} from '../config.js'

class Product extends Http {

  get(id) {
    return this.request({
      url: `product/${id}`
    })
  }

  getForPreOrder(id) {
    return this.request({
      url: `product/${id}/for/pre_order`
    })
  }

  getPaginate(start = 0, count = config.pageSize) {
    const page = start / count
    const data = {page, count}
    return this.request({
      url: 'product/paginate',
      data,
    })
  }
  search (q, start = 0, count = config.pageSize) {
    const page = start / count
    const data = {page, count, q}
    return this.request({
      url: 'product/paginate',
      data,
    })
  }
  getRecent() {
    return this.request({
      url: 'product/recent'
    })
  }
  getPaginateByTheme(tid, start = 0, count = config.pageSize) {
    const page = start / count
    const data = {page, count}
    return this.request({
      url: `product/paginate/by/theme/${tid}`,
      data,
    })
  }
  getPaginateByCategory(cid, start = 0, count = config.pageSize) {
    const page = start / count
    const data = { page, count }
    return this.request({
      url: `product/paginate/by/category/${cid}`,
      data,
    })
  }
  checkStock(product_id, count) {
    return this.request({
      url: 'product/stock/check',
      method: 'POST',
      data: { product_id, count },
    })
  }
}

export default new Product()
