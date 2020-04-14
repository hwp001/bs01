// components/w-goods-item/w-goods-item.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    goodsItem: {
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
    itemClick(e){
      //1、获取商品id
      const goodId = this.data.goodsItem.id
      //2、跳转到对应的路径
      wx.navigateTo({
        url: '/pages/good/good?goodId=' + goodId,
      })
    }
  }
})
