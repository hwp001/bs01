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
    ],
    commentMain:[]
  },
  // //替换图片
  // replaceImage(e){
  //   //图片id
  //   const id = parseInt(e.currentTarget.id) 
  //   const files = this.data.files
  //   wx.chooseImage({
  //     count: 1,
  //     sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
  //     sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
  //     success: res => {
  //       // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
  //       //重新覆盖地址
  //       files[id] = res.tempFilePaths
  //       this.setData({
  //         files: files
  //       });
  //     }
  //   })
  // },
  //选择照片
  chooseImage(e) {
    console.log(e)
    const id = e.currentTarget.dataset.id
    let files = this.data.files
    var that = this;
    //先判断 files 是否长度为 3
        wx.chooseImage({
          count: 3,
          sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
          sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
          success: function (res) {
            // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
          for (var i=0; i<files.length; i++){
            console.log(11,files[i])
            if (files[i].id == id) {
              for (let item of res.tempFilePaths) {
                files[i].img.push(item)
              }
            }
          }
          console.log(files)
            that.setData({
              files: files
            });
          }
        })
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
      let files = []
      for(let item of id){
        for (let i = 0; i < goodList.length; i++) {
          if (item == goodList[i].id) {
              goodArr.push(goodList[i]) 
              files[i] = { id: goodList[i].id, img: [] }
          }
        }
      }
      this.setData({
        commentList: goodArr,
        files: files
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