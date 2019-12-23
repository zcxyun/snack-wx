import Http from '../utils/http.js'

class Like extends Http {
   like(id) {
     return this.request({
       url: `like/product/${id}`,
       method: 'PUT',
     })
   }
   unlike(id) {
    return this.request({
      url: `like/cancel/product/${id}`,
      method: 'PUT',
    })
   }
   getFavor(id) {
     return this.request({
        url: `like/info/product/${id}`
     })
   }
 }

 export default new Like()
