import Http from '../utils/http.js'
import { type } from '../utils/util.js'

class Member extends Http {
  memberInfoKey = 'memberInfo'

  async getInfo() {
    let memberInfo = this.getMemberInfoOfStorage()
    if (memberInfo) {
      return memberInfo
    }
    memberInfo = await this.request({
      url: 'member/get'
    })
    if (memberInfo === this.authFail) {
      return this.dealAuthFail()
    }
    if (memberInfo) {
      this.setMemberInfoToStorage(memberInfo)
    }
    return memberInfo
  }

  async updateInfo(memberInfo, userInfo) {
    if (type(memberInfo) !== 'object' || type(userInfo) !== 'object') {
      return false
    }
    const isNotSame = this.equalInfo(memberInfo, userInfo)
    if (isNotSame) {
      const res = await this.request({
        url: 'member/update',
        method: 'POST',
        data: userInfo,
      })
      if (res === this.authFail) {
        return this.dealAuthFail()
      }
      if (res) {
        this.setMemberInfoToStorage(userInfo)
      }
      return res
    }
    return true
  }

  equalInfo (memberInfo, userInfo) {
    const res = Object.keys(memberInfo).some(key => memberInfo[key] !== userInfo[key])
    return res
  }

  getMemberInfoOfStorage() {
    return wx.getStorageSync(this.memberInfoKey)
  }

  setMemberInfoToStorage(memberInfo) {
    wx.setStorage({
      key: this.memberInfoKey,
      data: memberInfo,
    })
  }
}

export default new Member()
