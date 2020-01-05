import Http from "../utils/http.js";

class Address extends Http {

  get() {
    return this.request({
      url: 'address'
    })
  }

  edit(data) {
    return this.request({
      url: 'address',
      method: 'POST',
      data,
    })
  }
}

export default new Address()
