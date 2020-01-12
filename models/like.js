import Http from '../utils/http.js'

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
 }

 export default new Like()
