import Http from '../utils/http.js'

class Like extends Http {
   like(id, type, isLike) {
     return this.request({
       url: isLike ? 'like' : 'like/cancel',
       method: 'POST',
       data: {
         art_id: id,
         type
       }
     })
   }
   getFavor(type, id) {
     return this.request({
       url: `classic/${type}/${id}/favor`
     })
   }
 }

 export default new Like()
