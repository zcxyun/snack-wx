Component({

  properties: {
    comments: Array,
  },

  data: {
    postTip: '',
  },

  observers: {
    comments(value) {
      if (value.length) {
        this.setPostTip('可点击下列标签快速评论')
      } else {
        this.setPostTip('暂无短评')
      }
    }
  },

  methods: {
    setPostTip(text) {
      this.setData({
        postTip: text
      })
    },
    onTag(e) {
      this.triggerEvent('click-tag', e.detail)
    },
    onConfirm(e) {
      this.triggerEvent('input-confirm', e.detail)
    }
  }
})
