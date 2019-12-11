import Http from '../utils/http.js'

class Member extends Http {

  getInfo() {
    return this.request({
      url: 'member/get'
    })
  }

  updateInfo(memberInfo) {
    return this.request({
      url: 'member/update',
      method: 'POST',
      data: memberInfo
    })
  }
}

export default new Member()
