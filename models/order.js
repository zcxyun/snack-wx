import Http from "../utils/http";
import { config } from "../config.js"

class Order extends Http {
  UNPAID = 0
  UNDELIVERED = 1
  UNRECEIPTED = 2
  DONE = 3
  CANCEL = -1

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

  getPaginate(start = 0, count = config.orderPageSize) {
    const page = start / count
    const data = { page, count }
    return this.request({
      url: 'order/paginate',
      data,
    })
  }

  getPaginateByStatus(status, start = 0, count = config.orderPageSize) {
    const page = start / count
    const data = { page, count }
    return this.request({
      url: `order/paginate/status/${status}`,
      data,
    })
  }
}

export default new Order()
