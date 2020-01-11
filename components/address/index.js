import addressModel from "../../models/address.js"
import { promisic } from '../../utils/util.js'

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    readOnly: {
      type: Boolean,
      value: false,
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    address: null,
    showSettingDialog: false,
  },

  lifetimes: {
    async attached() {
      const address = await addressModel.get()
      if (address) {
        this.setData({ address })
      }
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onAddress() {
      if (this.properties.readOnly) {
        return
      }
      const that = this
      promisic(wx.authorize)({ scope: 'scope.address' }).then(async () => {
        const address = await promisic(wx.chooseAddress)().catch(() => { })
        if (address) {
          const res = await addressModel.edit(address)
          if (res) {
            that.setData({ address })
          }
        }
      }).catch(() => {
        this.setData({ showSettingDialog: true })
      })
    },

    onConfirm() {
      this.setData({ showSettingDialog: false })
      wx.openSetting()
    },
  }
})
