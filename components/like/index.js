// components/like/like.js
// import {getLoginStatusOfStorage} from '../../utils/util.js'

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    likeStatus: Boolean,
    likeCount: Number,
    readOnly: Boolean
  },

  /**
   * 组件的初始数据
   */
  data: {
    likeSrc: "images/like.png",
    disLikeSrc: "images/like@dis.png"
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onLike(e) {
      // if (!getLoginStatusOfStorage()) {
      //   wx.showModal({
      //     title: '提示',
      //     content: '请先登录',
      //     success(res) {
      //       if (res.confirm) {
      //         wx.switchTab({
      //           url: '/pages/my/my'
      //         })
      //       }
      //     }
      //   })
      //   return
      // }
      if (this.properties.readOnly) {
        return
      }
      let like = this.properties.likeStatus
      let count = this.properties.likeCount
      count = like ? count-1 : count+1
      this.setData({
        likeStatus: !like,
        likeCount: count
      })
      const isLike = this.properties.likeStatus
      this.triggerEvent('like', {isLike})
    }
  }
})
