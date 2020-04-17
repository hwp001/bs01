// pages/order/order.js
import {
  getOrderById,
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
    commentList:[],
    files: [],
    radioItem: [
      { name: 1, value: 1 },
      { name: 2, value: 2 },
      { name: 3, value: 3 },
      { name: 4, value: 4 },
      { name: 5, value: 5 }
    ]
  },
  //替换图片
  replaceImage(e){
    //图片id
    const id = parseInt(e.currentTarget.id) 
    const files = this.data.files
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: res => {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        //重新覆盖地址
        files[id] = res.tempFilePaths
        this.setData({
          files: files
        });
      }
    })
  },
  //选择照片
  chooseImage(e) {
    //先判断 files 是否长度为 3
    const files = this.data.files
    const that = this
    if (files.length == 3) {
      wx.showToast({
        title: '最多只能有三张图片',
      })
      return false
    } else {
        wx.chooseImage({
          count: 3,
          sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
          sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
          success: function (res) {
            // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
            that.setData({
              files: that.data.files.concat(res.tempFilePaths)
            });
          }
        })
    }

  },
  // 预览照片
  previewImage: function (e) {
    wx.previewImage({
      current: e.currentTarget.id, // 当前显示图片的http链接
      urls: this.data.files // 需要预览的图片http链接列表
    })
  },

  //选择checkbox
    checkboxChange(e) {
      console.log('checkbox发生change事件，携带value值为：', e.detail.value)
      const id = e.detail.value
      const goodList = this.data.goodList
      let goodArr = []
      for(let item of id){
        console.log(item)
        for (let i = 0; i < goodList.length; i++) {
          console.log(goodList[i])
          if (item == goodList[i].id) {
              goodArr[i] = goodList[i] 
          }
        }
      }

      this.setData({
        commentList: goodArr
      })
    },

  onLoad(e) {
    console.log(e)
    const id = e.id
    const openId = wx.getStorageSync('openId')
    getOrderById({ id: id, openId: openId }).then(res => {
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