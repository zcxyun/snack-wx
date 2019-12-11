import Http from '../utils/http.js'

class Banner extends Http {
  idMap = {
    '首页置顶': 5
  }

  get(bid) {
    // const bid = this.idMap[name]
    return this.request({
      url: `banner/${bid}/banner-item`,
    })
  }

}

export default new Banner()
