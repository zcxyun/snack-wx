import Http from "../utils/http";
import { config } from "../config.js"
import { promisic } from "../utils/util.js";

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

  async pay (oid) {
    const res = await this.request({
      url: `order/${oid}/pay`,
      method: 'POST',
    })
    if (res) {
      await promisic(wx.requestPayment)({
        'timeStamp': res.timeStamp,
        'nonceStr': res.nonceStr,
        'package': res.package,
        'signType': 'MD5',
        'paySign': res.paySign,
      }).catch(() => {
        wx.showToast({
          title: '对不起, 支付失败',
          icon: 'none',
        })
        return false
      })
      return true
    }
    return false
  }

  get(id) {
    return this.request({
      url: `order/${id}`
    })
  }

  getPaginate(start = 0, count = config.orderPageSize) {
    const page = start / count
    const data = { page, count }
    return this.request({
      url: 'order/paginate',
      data,
      showErr: false,
    })
  }

  getPaginateByStatus(status, start = 0, count = config.orderPageSize) {
    const page = start / count
    const data = { page, count }
    return this.request({
      url: `order/paginate/status/${status}`,
      data,
      showErr: false,
    })
  }
}

export default new Order()
