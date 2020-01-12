import orderModel from "../../models/order.js";
import { isNotEmptyArray } from "../../utils/util.js"
import paginate from "../../behaviors/paginate.js"

Component({
  behaviors: [paginate],
  properties: {
    more: String,
    activeKey: {
      type: String,
      value: 'ALL',
    }
  },

  observers: {
    async more() {
      if (this._isLocked()) {
        return
      }
      if (this._hasMore()) {
        this._lock(true)
        const start = this._getCurrentStart()
        let res = null
        const activeKey = this.data.activeKey
        if (activeKey === 'ALL') {
          res = await orderModel.getPaginate(start).catch(() => {})
        } else {
          res = await orderModel.getPaginateByStatus(this.data.orderStatus[activeKey], start).catch(() => {})
        }
        if (res && res.models) {
          this._setMoreData(res.models)
        }
        this._lock(false)
      } else {
        this._noMoreData()
      }
    },
  },

  data: {
    tabs: [{
      tab: '全部',
      key: 'ALL',
    }, {
      tab: '待付款',
      key: 'UNPAID',
    }, {
      tab: '待发货',
      key: 'UNDELIVERED',
    }, {
      tab: '待收货',
      key: 'UNRECEIPTED',
    }, {
      tab: '已完成',
      key: 'DONE',
    }],
    orderStatus: {
      UNPAID: orderModel.UNPAID,
      UNDELIVERED: orderModel.UNDELIVERED,
      UNRECEIPTED: orderModel.UNRECEIPTED,
      DONE: orderModel.DONE,
      CANCEL: orderModel.CANCEL,
    },
    loading: false,
  },

  lifetimes: {
    attached() {
      this.init()
    },
  },

  methods: {
    init() {
      this.getData()
    },

    changeTab(e) {
      const { activeKey } = e.detail
      this.properties.activeKey = activeKey
      this.getData(activeKey)
    },

    async getData() {
      this._initPaginate()
      this._loading(true)
      let res = null
      const activeKey = this.properties.activeKey
      if (activeKey === 'ALL') {
        res = await orderModel.getPaginate().catch(() => {})
      } else {
        res = await orderModel.getPaginateByStatus(this.data.orderStatus[activeKey]).catch(() => {})
      }
      if (res && isNotEmptyArray(res.models)) {
        this._setMoreData(res.models)
        this._setTotal(res.total)
      } else {
        this._setNoResult(true)
      }
      this._loading(false)
    },

    payOrder(e) {
      const { id } = e.currentTarget.dataset
      this._showToast('此小程序用于测试, 不能支付')

    },

    async cancelOrder(e) {
      const { id } = e.currentTarget.dataset
      const res = await orderModel.cancel(id).catch(() => {})
      if (res && res.msg) {
        this._showToast(res.msg)
        this.getData()
      }
    },

    async confirmOrder(e) {
      const { id } = e.currentTarget.dataset
      const res = await orderModel.confirm(id).catch(() => {})
      if (res && res.msg) {
        this._showToast(res.msg)
        this.getData()
      }
    },

    async countDownEnd(e) {
      this.cancelOrder(e)
    },

    _loading(loading) {
      this.setData({ loading })
    },

    _showToast(text) {
      wx.showToast({
        title: text,
        icon: 'none',
      })
    }
  }
})
