// pages/good/childCpn/w-bottom-right/w-bottom-right.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

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
    clickItem() {
      wx.switchTab({
        url: '/pages/profile/home/profile',
      })
    }
  }
})
