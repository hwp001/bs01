// pages/good/childCpn/w-bottom-bar/w-bottom-bar.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    buyState:{
      type:String,
      value:'购买'
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
    onAddCart() {
      this.triggerEvent('addcart', {}, {})
    }
  }
})
