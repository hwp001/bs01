// pages/home/home.js
import {
  getHomeData,
  getData
} from '../../service/home.js';
import {
  headURL
} from '../../service/tool.js';

const TOP_DISTANCE = 1000;
const types = ['pop', 'new', 'sell'];

Page({
  data: {
    showBackTop: false,
    inputShowed: false,
    inputVal: "",
    imageList: [],
    recommandList: [],
    currentIndex: 0,
    currentType: 'pop',
    good_title: ['热销','活动', '推荐'],
    goods: {
      pop: {
        list: []
      },
      new: {
        list: []
      },
      sell: {
        list: []
      }
    }
  },

  //监听页面请求
  onLoad() {
    //求 轮播图 和 推荐 数据
    this._getHomeData();

    //获取 优惠 和 推荐 的数据
    this._getData();
  },

  //获取 轮播图 和 推荐 数据
  _getHomeData(){
    getHomeData().then(res => {
      const imageList = res.imageList.map(item => {
        return headURL + item.ImgUrl;
      });
      const recommandList = res.recommandList.map(item => {
        item.ImgUrl = headURL + item.ImgUrl;
        return item;
      });
      this.setData({
        imageList: imageList,
        recommandList: recommandList
      });
    })
  },

  //获得优惠 推荐的数据
  _getData(){
    getData().then(res => {
      console.log(res);
      for (var i=0; i<3; i++){
        res[types[i]].map(item => {
          item.img = headURL + item.img[0]
          return item;
        });
      }
     this.setData({
       'goods.new.list' : res.new,
       'goods.pop.list' : res.pop,
       'goods.sell.list' : res.sell
     });
    });
  },

  //热销 优惠 推荐 标题
  handleGoodTitle(option) {
    const index = option.currentTarget.dataset.index;
    const type = types[index];
    this.setData({
      currentIndex: index,
      currentType: type
    });
  },

  //组件标题
  tabClick(e) {
    //1、根据当前点击赋值最新的currentType
    let currentType = '';
    switch (e.detail.index){
      case 0:
        currentType = 'pop'
        break
      case 1:
        currentType = 'new'
        break
      case 2:
        currentType = 'sell'
        break
    }
    this.setData({
      currentType: currentType
    })
  },
  // 回到顶部
  handleBackTop() {
    wx.pageScrollTo({
      scrollTop: 0,
    })
  },
  //获取页面页码
  onPageScroll(option) {
    //1、取出页码
    const distance = option.scrollTop;
    //2、超过页码显示回到顶部
    const flag = distance >= TOP_DISTANCE;
    if(flag != this.data.scrollTop){
      this.setData({
        showBackTop: flag
      })
    }

  },


})