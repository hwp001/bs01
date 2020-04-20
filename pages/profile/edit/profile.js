// pages/profile/edit/profile.js
import {
  checkPhone,
  checkName,
  headURL
} from '../../../service/tool.js'
import {
  editUserInfo
} from '../../../service/profile.js'
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {}
  },
  onLoad(){
    const userInfo = app.globalData.userInfo
    if (userInfo){
      this.setData({
        userInfo: userInfo
      })
    } else {
      wx.showToast({
        title: '用户未登录',
      })
    }
  },
  //提交信息
  submitForm(e){
    const info = e.detail.value
    const Nbool = checkName(info.name)
    const openId = wx.getStorageSync('openId');
    if (Nbool) {
      const Pbool = checkPhone(info.phone)
      if (Pbool){
        editUserInfo({
          openId:openId,
          name: info.name,
          phone: info.phone,
          email: info.email,
          decs: info.decs
        }).then(res => {
          console.log(res)
          if (res.statu == 1) {
            wx.showToast({
              title: '资料更新成功'
            })
            //资料更新成功后，重新从数据库获取资料覆盖
            const userInfo = res.userInfo[0]
            userInfo.avatar = headURL + userInfo.avatar
            app.globalData.userInfo = userInfo
            setTimeout(function(){
              wx.reLaunch({
                url: '/pages/profile/home/profile'
              })
            },1000)
          } else {
            wx.showToast({
              title: '资料更新失败'
            })
          }
        })
      } else {
        wx.showToast({
          title:"手机号格式不正确"
        })
      }
    } else {
      wx.showToast({
        title:"姓名格式不正确"
      })
    }
  }

})