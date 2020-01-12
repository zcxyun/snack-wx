import Http from '../utils/http.js'
import {config} from '../config.js'

class Like extends Http {

  async like(id) {
    const res = await this.request({
      url: `like/product/${id}`,
      method: 'PUT',
    })
    return res
  }
  async unlike(id) {
  const res = await this.request({
    url: `like/cancel/product/${id}`,
    method: 'PUT',
  })
  return res
  }
  async getFavor(id) {
    const res = await this.request({
      url: `like/info/product/${id}`,
      loginRequired: false,
    })
    return res
  }
  getLikeCount() {
    return this.request({
      url: 'like/count'
    })
  }
  getLikeProducts(start = 0, count = config.pageSize) {
     const page = start / count
     const data = { page, count }
     return this.request({
       url: 'like/products',
       data,
     })
   }
 }

 export default new Like()
