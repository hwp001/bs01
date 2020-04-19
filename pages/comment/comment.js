// pages/comment/comment.js
import {
  headURL
} from '../../service/tool.js'
import {
  getCommentById
} from '../../service/comment.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    commentList: {},
    orderList: {},
    headURL: headURL
  },
  onLoad(){
    const openId = wx.getStorageSync('openId')
    getCommentById({openId:openId}).then(res => {
      if (res.statu == 1) {
        console.log(res)
        this.setData({
          orderList: res.data
        })
      } else {
        wx.showToast({
          title: '获取数据失败',
        })
      }
    })
  }

})