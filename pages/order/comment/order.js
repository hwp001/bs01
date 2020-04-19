// pages/order/order.js
import {
  getOrderById,
  addComment
} from '../../../service/order.js'
import {
  headURL,
  uploadImg
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
    commentList: [],
    radioItem: [{
        name: 1,
        value: 1
      },
      {
        name: 2,
        value: 2
      },
      {
        name: 3,
        value: 3
      },
      {
        name: 4,
        value: 4
      },
      {
        name: 5,
        value: 5
      }
    ],
  },
  // //替换图片
  replaceImage(e) {
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
        for (let item of commentList) {
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
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        for (let item of commentList) {
          if (item.id == id) {
              //上传
              for (let a of res.tempFilePaths) {
                //判断 长度 是否超过 3
                if ((item.img.length + res.tempFilePaths.length) > 3) {
                  wx.showToast({
                    title: '最多只能为三张'
                  })
                  break;
                }
                //若是不超过3张则先添加，因为存入服务器有延迟
                item.img.push(a)
                wx.uploadFile({
                  url: uploadImg,
                  header: {
                    'content-type': 'multipart/form-data'
                  },
                  filePath: a,
                  name: 'commentImg',
                  success: res => {
                    console.log(res)
                    if (res.data) {
                      console.log('移动成功')
                      //移动成功 则将路径放入 item.img中
                      //先将提前存入取出，随后将存入服务器的放入
                      item.img.pop()
                      item.img.push(headURL + res.data)                  
                    } else {
                      console.log('移动失败')
                    }
                  }
                })
              }
              that.setData({
                commentList: commentList
              });
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
    for (let item of commentList) {
      if (item.id == id) {
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
    for (let item of id) {
      for (let i = 0; i < goodList.length; i++) {
        if (item == goodList[i].id) {
          //构建评论列表数据
          goodArr.push({
            id: goodList[i].id,
            gid: goodList[i].gid,
            star: 5,
            description: '真的好',
            title: goodList[i].title,
            img: []
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
    getOrderById({
      id: id,
      openId: openId
    }).then(res => {
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
  common(e, a) {
    const id = e.currentTarget.dataset.id
    const commentList = this.data.commentList
    for (let item of commentList) {
      if (item.id == id) {
        switch (a) {
          //评论
          case 1:
            item.description = e.detail.value;
            break;
            //评分
          case 2:
            item.star = e.detail.value;
            break;
        }
      }
    }
    console.log(e.detail.value)
  },
  //商品评论
  bindTextAreaBlur(e) {
    this.common(e, 1)
  },
  //商品打分
  radioClick(e) {
    this.common(e, 2)
  },
  //提交商品
  submitForm(e) {
    const openId = wx.getStorageSync('openId')
    const orderNum = this.data.orderList.orderNum
    const commentList = this.data.commentList
    addComment({
      openId: openId,
      orderNum: orderNum,
      commentList: commentList
    }).then(res => {
      console.log(res)
    })
  }
})