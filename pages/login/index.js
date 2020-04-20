//index.js
import {
  loggedUserInfo
} from '../../service/login.js'
import {
  headURL,
  decode
} from '../../service/tool.js'
//获取应用实例
const app = getApp()
Page({
  data: {
    userInfo: {},
    logged: false,
    headURL: headURL
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    //获取登录态 存在则更新 增加信息
    this.updateUserInfo()
  },
  //登录并且获取用户权限
  getUserInfo(){
    //获取登录态,并提交信息到服务器
    this.getLoainStatu()
  },
  //获取登录态
  getLoainStatu() {
    //获取登录态
    wx.login({
      success: res => {
        // 登录凭证
        var code = res.code
        if (code) {
          //换取登录态
          //2、调用获取用户信息接口
          wx.getUserInfo({
            success: res => {
              console.log({ encryptedData: res.encryptedData, iv: res.iv, code: code })
              //3.请求自己的服务器，解密用户信息 获取unionId等加密信息
              wx.request({
                url: decode,//自己的服务接口地址
                method: 'post',
                header: {
                  'content-type': 'application/x-www-form-urlencoded'
                },
                data: { encryptedData: res.encryptedData, iv: res.iv, code: code },
                success: res => {
                  //4.解密成功后 获取自己服务器返回的结果 并保存到本地
                  if (res.data.statu == 1) {
                    var userInfo_ = res.data.userInfo[0];
                    app.globalData.userInfo = userInfo_
                    this.setData({
                      userInfo: userInfo_,
                      hasUserInfo: true,
                    })
                    wx.setStorageSync('logged', true)
                    wx.setStorageSync('openId', userInfo_.wx_openid)
                    //跳转页面
                    wx.showToast({
                      title: '登录成功',
                    })
                    //跳转到主页
                    setTimeout(function(){
                      wx.switchTab({
                        url: '/pages/home/home',
                      })
                    }, 2000)
                  } else {
                    console.log('解密失败')
                    wx.showToast({
                      title: res.data.err,
                    })
                  }
                },
                fail: function () {
                  console.log('系统错误')
                }
              })
            },
            fail: function () {
              console.log('获取用户信息失败')
            }
          })
        } else {
          console.log('获取用户登录态失败！' + res.errMsg)
        }
      }
    })
  },
  //用户登录过，则直接向后台获取信息
  updateUserInfo() {
   const logged = wx.getStorageSync('logged')
   console.log(logged)
    const openId = wx.getStorageSync('openId')
   //获取登录态 若为true 则直接向后台拿取用户信息
    if (logged == true) {
      console.log(logged)
      loggedUserInfo({openId:openId}).then(res => {
        console.log(333,res)
        if (res.statu == 1) {
          app.globalData.userInfo = res.userInfo[0]
          this.setData({
            userInfo: res.userInfo[0],
            logged: logged
          })
          //界面跳转
          setTimeout(function(){
            wx.switchTab({
              url: '/pages/home/home',
            })
          },2000)
        } else {
          wx.showToast({
            title: res.err,
          })
        }
      })
    }
  },

})
