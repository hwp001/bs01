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
    radioItem: [
      { name: 1, value: 1 },
      { name: 2, value: 2 },
      { name: 3, value: 3 },
      { name: 4, value: 4 },
      { name: 5, value: 5 }
    ],
    commentMain:[],
    goodComment:[]
  },
  // //替换图片
  replaceImage(e){
    //图片索引
    const index = e.currentTarget.dataset.index
    //图片所属集合id 
    const id = e.currentTarget.dataset.id
    const commentList = this.data.commentList
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: res => {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        //重新覆盖地址
        for (let item of commentList){
          if (item.id == id) {
            item.img[index] = res.tempFilePaths
          }
        }
        this.setData({
          commentList: commentList
        });
      }
    })
  },
  //选择照片
  chooseImage(e) {
    const id = e.currentTarget.dataset.id
    let commentList = this.data.commentList
    var that = this;
    let img = []
      wx.chooseImage({
        count: 3,
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success: function (res) {
          // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
          for (let item of commentList){
              //先预存原本img 如果超过三张重定义
            if (item.id == id){
              img.push(item.img)
              for(let a of res.tempFilePaths) {
                item.img.push(a)
              }
            //先判断 files 是否长度为 3
              if (item.img.length > 3) {
                wx.showToast({
                  title: '最多只能三张',
                })
                //若长度超过 3张 则重定义
                item.img.length = 3
              } else {
                that.setData({
                  commentList: commentList
                });
              }
            }
          }

        },
        fail: err => {
          console.log('fafafafa')
        }
      })
    
  },
  // 预览照片
  previewImage: function (e) {
    let id = e.currentTarget.dataset.id
    let index = e.currentTarget.dataset.index
    const commentList = this.data.commentList
    let imgUrl = []
    for (let item of commentList){
      if (item.id == id){
        imgUrl = item.img
      }
    }
    wx.previewImage({
      current: index, // 当前显示图片的http链接
      urls: imgUrl // 需要预览的图片http链接列表
    })
  },
  //选择checkbox
    checkboxChange(e) {
      console.log('checkbox发生change事件，携带value值为：', e.detail.value)
      const id = e.detail.value
      const goodList = this.data.goodList
      let goodArr = []
      for(let item of id){
        for (let i = 0; i < goodList.length; i++) {
          if (item == goodList[i].id) {
             //构建评论列表数据
              goodArr.push({
                  id: goodList[i].id,
                  gid: goodList[i].gid,
                  title: goodList[i].title,img:[]
                }) 

          }
        }
      }
      this.setData({
        commentList: goodArr,
      })
    },

  onLoad(e) {
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
  //共同事件
  common(e){
    const id = e.currentTarget.dataset.id
    const commentList = this.data.commentList
    for (let item of commentList) {
      if (item.id == id) {
        item.star = e.detail.value
      }
    }
    console.log(e.detail.value)
  },
  //商品评论
  bindTextAreaBlur(e){
    this.common(e)
  },
  //商品打分
  radioClick(e){
    this.common(e)
  },
  //提交商品
  submitForm(e){
    console.log(e)
  }
})