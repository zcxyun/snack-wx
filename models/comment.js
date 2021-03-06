import Http from "../utils/http";

class Comment extends Http {
  getByProduct(id) {
    return this.request({
      url: `comment/product/${id}`
    })
  }

  async add(product_id, content) {
    const res = this.request({
      url: `comment`,
      method: 'POST',
      data: {
        product_id,
        content,
      }
    })
    return res
  }
}

export default new Comment()
