import Http from "../utils/http";

class Order extends Http {

  place (data) {
    return this.request({
      url: 'order/place',
      method: 'POST',
      data,
    })
  }

  confirm (oid) {
    return this.request({
      url: `order/${oid}/confirm`,
      method: 'POST',
    })
  }

  cancel (oid) {
    return this.request({
      url: `order/${oid}/cancel`,
      method: 'POST',
    })
  }
}
