// pages/order/list/order.js
import {
  getOrder,
  cancelOrder
} from "../../../service/order.js"
Page({
  data: {
    titles: ['未签收','已签收','已取消'],
    index: 0,
    allOrder: []
  },
  onLoad(){
    const openId = wx.getStorageSync('openId')
    this._getOrder({ openId: openId })
  },
  //获取订单
  _getOrder(data){
    getOrder(data).then(res => {
      if (res.statu == 1) {
        this.setData({
          allOrder: res.data
        })
      } else {
        wx.showToast({
          title: '订单数据获取失败，请联系管理员',
        })
      }

    })
  },
  //获得tab 的 index
  tabclick(e){
    console.log(e)
    const index = e.detail.index
    this.setData({
      index:index
    })
  },
  delItem(e){
    const id = e.currentTarget.dataset.id
    const openId = wx.getStorageSync('openId')

    wx.showModal({
      title: '提示',
      content: '确定要取消订单',
      success(res) {
        if (res.confirm) {
              cancelOrder({ id: id, openId: openId }).then(res => {
                if (res.statu == 1) {
                  wx.showToast({
                    title: '订单取消成功',
                  })
                  setTimeout(function () {
                    wx.reLaunch({
                      url: '/pages/order/list/order'
                    })
                  }, 1000)
                } else {
                  wx.showToast({
                    title: res.err,
                  })
                }
              })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })


  }
})