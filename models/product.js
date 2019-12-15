import Http from '../utils/http.js'
import {config} from '../config.js'

class Product extends Http {

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
}

export default new Product()
