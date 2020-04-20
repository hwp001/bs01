// pages/profile/childCpn/w-list-view/w-list-view.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    infos: {
      type: Array,
      value: []
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
    itemcilck(e){
      console.log(e)
      //获取地址
      const addr = e.currentTarget.dataset.addr
      if (addr == '0'){
        wx.makePhoneCall({
          phoneNumber: '1340000', 
          success:res => {
            console.log('联系客服成功')
          },
          fail:res => {
            console.log('联系客服失败')
          }
        })
      }else if(addr == '/pages/cart/cart') {
        wx.switchTab({
          url: addr,
        })
      } else {
        wx.navigateTo({
          url: addr,
        })
      }
    }
  }
})
