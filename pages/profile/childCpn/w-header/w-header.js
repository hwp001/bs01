// pages/profile/childCpn/w-header/w-header.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    userInfo:{
      type: Object,
      value: {}
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    edit(){
      wx.navigateTo({
        url: '/pages/profile/edit/profile'
      })
    }
  }
})
