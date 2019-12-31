import Http from '../utils/http.js'

class Like extends Http {
   async like(id) {
     const res = await this.request({
       url: `like/product/${id}`,
       method: 'PUT',
     })
     if (res === this.authFail) {
       return this.dealAuthFail()
     }
     return res
   }
   async unlike(id) {
    const res = await this.request({
      url: `like/cancel/product/${id}`,
      method: 'PUT',
    })
    if (res === this.authFail) {
      return this.dealAuthFail()
    }
    return res
   }
   async getFavor(id) {
     const res = await this.request({
        url: `like/info/product/${id}`
     })
     if (res === this.authFail) {
       return false
     }
     return res
   }
 }

 export default new Like()
