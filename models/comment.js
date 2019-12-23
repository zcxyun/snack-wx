import Http from "../utils/http";

class Comment extends Http {
  getByProduct(id) {
    return this.request({
      url: `comment/product/${id}`
    })
  }

  add(product_id, content) {
    return this.request({
      url: `comment`,
      method: 'POST',
      data: {
        product_id,
        content,
      }
    })
  }
}

export default new Comment()
