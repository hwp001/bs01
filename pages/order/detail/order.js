// pages/order/order.js
import {
  getOrderById
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
    cargoList: {}
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

})