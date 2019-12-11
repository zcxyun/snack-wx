import Http from "../utils/http.js";

class Theme extends Http {

  getAll() {
    return this.request({
      url: 'theme/all'
    })
  }
}

export default new Theme()
