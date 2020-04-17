// pages/order/order.js
import {
  getOrderById,
  recoverOrder,
  signOrder
} from '../../../service/order.js'
import {
  headURL
} from '../../../service/tool.js'

const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    orderList: {},
    goodList: {},
    cargoList: {},
    
  },
  onLoad(e){
    console.log(e)
    const id = e.id
    const openId = wx.getStorageSync('openId')
    getOrderById({id:id,openId:openId}).then(res => {
      if (res.statu == 1) {
        console.log(res.data)
        const goodList = res.data[0].goodDetail.map(item => {
          item.img[0] = headURL + item.img[0]
          return item
        })
        console.log(goodList)
        this.setData({
          orderList: res.data[0],
          goodList: goodList,
          cargoList: res.data[0].cargo
        }) 
      } else {
        wx.showToast({
          title: res.err,
        })
      }
    })
  },
  //签收订单
  sign(e) {
    const id = e.currentTarget.dataset.id
    const openId = wx.getStorageSync('openId')
    wx.showModal({
      title: '提示',
      content: '确定签收订单',
      success(res) {
        if (res.confirm) {
          signOrder({ id: id, openId: openId }).then(res => {
            if (res.statu == 1) {
              wx.showToast({
                title: '订单签收成功',
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
          console.log(1111)
        }
      }
    })
  },
  //恢复订单
  recover(e) {
    const id = e.currentTarget.dataset.id
    const openId = wx.getStorageSync('openId')
    wx.showModal({
      title: '提示',
      content: '确定恢复订单',
      success(res) {
        if (res.confirm) {
          recoverOrder({ id: id, openId: openId }).then(res => {
            if (res.statu == 1) {
              wx.showToast({
                title: '订单恢复成功',
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
          console.log(1111)
        }
      }
    })
  },
  //商品评论
  comment(e){
    const id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/order/comment/order?id='+id,
    })
    
  }

})