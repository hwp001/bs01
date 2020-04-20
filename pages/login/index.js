//index.js
import {
  baseURL
} from '../../service/config.js'

//获取应用实例
const app = getApp()
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    //登录态 存在则更新 增加信息
    this.updateUserInfo()
    const logged = wx.getStorageSync('logged');
    console.log(logged)
    if(logged){
      this.timeToNavi()
    }
  },
  //页面跳转
  timeToNavi(){
    const hasUserInfo = this.data.hasUserInfo
    const canIUse = this.data.canIUse
    setTimeout(function (hasUserInfo, canIUse) {
      if (!(!hasUserInfo && canIUse)) {
        //暂时先跳转到地址页 //后面在跳转到主页
        wx.switchTab({
          url: '/pages/home/home',
        })
      }
    }, 1000);
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
                url: baseURL + '/api/decode',//自己的服务接口地址
                method: 'post',
                header: {
                  'content-type': 'application/x-www-form-urlencoded'
                },
                data: { encryptedData: res.encryptedData, iv: res.iv, code: code },
                success: res => {
                  console.log('11111', res)
                  //4.解密成功后 获取自己服务器返回的结果 并保存到本地
                  console.log(res.data.statu)
                  if (res.data.statu == 1) {
                    var userInfo_ = res.data.userInfo[0];
                    console.log(userInfo_)
                    app.globalData.userInfo = userInfo_
                    console.log('--------',app.globalData.userInfo)
                    this.setData({
                      userInfo: userInfo_,
                      hasUserInfo: true,
                    })
                    wx.setStorageSync('logged', true)
                    wx.setStorageSync('openId', userInfo_.wx_openid)
                    //跳转页面
                    //跳转到主页
                    wx.switchTab({
                      url: '/pages/home/home',
                    })
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
  //用户信息更新
  updateUserInfo() {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true,
      })
    }
    //防止私自获取向微信服务器获取信息
    // } else if (this.data.canIUse) {
    //   // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //   // 所以此处加入 callback 以防止这种情况
    //   app.userInfoReadyCallback = res => {
    //     this.setData({
    //       userInfo: res.userInfo,
    //       hasUserInfo: true,
    //     })
    //   }
    // } 
    // else {
    //   // 在没有 open-type=getUserInfo 版本的兼容处理
    //   wx.getUserInfo({
    //     success: res => {
    //       app.globalData.userInfo = res.userInfo
    //       this.setData({
    //         userInfo: res.userInfo,
    //         hasUserInfo: true,
    //       })
    //     },
    //   })

    // }

  },

})
