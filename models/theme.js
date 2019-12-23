import Http from "../utils/http.js";

class Theme extends Http {

  get(id) {
    return this.request({
      url: `theme/${id}`
    })
  }
  getAll() {
    return this.request({
      url: 'theme/all'
    })
  }
}

export default new Theme()
