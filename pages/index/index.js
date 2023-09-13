//获取应用实例
const app = getApp()
var weatherApi = require('../../utils/weather.js');
var api = require('../../utils/api.js');
Page({
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    wx.showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage', 'shareTimeline']
    })
    return {
      title: '趣玩AI',
      path: '/pages/index/index'
    }
  },
  //用户点击右上角分享朋友圈
  onShareTimeline: function () {
    return {
      title: '趣玩AI'
    }
  },
  data: {
    cardCur: 0,
    aboveText:'小帅AI',
    belowText:'代码开源',
    elements: [{
      title: 'AI颜值',
      name: 'beauty',
      color: 'cyan',
      dir:'aiindex',
      icon: 'emoji'
    },
    {
      title: 'AI健康',
      name: 'health',
      color: 'blue',
      dir:'aiindex',
      icon: 'like'
    },
    {
      title: 'AI恢复',
      name: 'recovery',
      color: 'red',
      dir:'aiindex',
      icon: 'refresh'
    },
    {
      title: 'AI审核 ',
      name: 'examine',
      color: 'orange',
      dir:'aiindex',
      icon: 'filter'
    },
    {
      title: 'AI处理',
      name: 'handle',
      color: 'olive',
      dir:'aiindex',
      icon: 'repair'
    },
    {
      title: 'NAI',
      name: 'nai',
      color: 'green',
      dir:'aiindex',
      icon: 'usefull'
    },
    {
      title: 'AI闲聊',
      name: 'chatbot',
      color: 'brown',
      dir:'bizz',
      icon: 'messagefill'
    }
    ],
    swiperList: [],
  },
  onReady: function () {
  },
  onLoad: function () {
    // 初始化towerSwiper 传已有的数组名即可
    this.towerSwiper('swiperList');
    // 初始化天气预报
    this.getLocation();
    // 获取轮播图
    this.getRotary();
    // 获取刷新内容
    this.getCopyWrite();
  },
  DotStyle(e) {
    this.setData({
      DotStyle: e.detail.value
    })
  },
  // cardSwiper
  cardSwiper(e) {
    this.setData({
      cardCur: e.detail.current
    })
  },
  // towerSwiper
  // 初始化towerSwiper
  towerSwiper(name) {
    let list = this.data[name];
    for (let i = 0; i < list.length; i++) {
      list[i].zIndex = parseInt(list.length / 2) + 1 - Math.abs(i - parseInt(list.length / 2))
      list[i].mLeft = i - parseInt(list.length / 2)
    }
    this.setData({
      swiperList: list
    })
  },
  // towerSwiper触摸开始
  towerStart(e) {
    this.setData({
      towerStart: e.touches[0].pageX
    })
  },
  // towerSwiper计算方向
  towerMove(e) {
    this.setData({
      direction: e.touches[0].pageX - this.data.towerStart > 0 ? 'right' : 'left'
    })
  },
  // towerSwiper计算滚动
  towerEnd(e) {
    let direction = this.data.direction;
    let list = this.data.swiperList;
    if (direction == 'right') {
      let mLeft = list[0].mLeft;
      let zIndex = list[0].zIndex;
      for (let i = 1; i < list.length; i++) {
        list[i - 1].mLeft = list[i].mLeft
        list[i - 1].zIndex = list[i].zIndex
      }
      list[list.length - 1].mLeft = mLeft;
      list[list.length - 1].zIndex = zIndex;
      this.setData({
        swiperList: list
      })
    } else {
      let mLeft = list[list.length - 1].mLeft;
      let zIndex = list[list.length - 1].zIndex;
      for (let i = list.length - 1; i > 0; i--) {
        list[i].mLeft = list[i - 1].mLeft
        list[i].zIndex = list[i - 1].zIndex
      }
      list[0].mLeft = mLeft;
      list[0].zIndex = zIndex;
      this.setData({
        swiperList: list
      })
    }
  },
  //下拉刷新
  onPullDownRefresh: function () {
    var that = this;
    //在标题栏中显示加载                                                                                               
    wx.showNavigationBarLoading();
    wx.showToast({
      title: that.data.aboveText,
      //自定一个图片
      image: '../../images/copy.png',
      mask: true
    })
    //模拟加载
    setTimeout(function () {
      //在标题栏中隐藏加载
      wx.hideNavigationBarLoading();
      //停止下拉刷新
      wx.stopPullDownRefresh();
    }, 1500)
  },
  //获取轮播图片列表
  getRotary:function(){
    var that = this;
    wx.request({
      url: api.rotary_url,
      success:function(res){
        if (res.data.code==200){
          that.setData({
            swiperList: res.data.data
          })
        }
      },
      fail:function(res){
        that.setData({
          swiperList: [{
            id: 0,
            type: 'image',
            imgUrl: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg'
          }, {
            id: 1,
            type: 'image',
            imgUrl: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84001.jpg',
          }, {
            id: 2,
            type: 'image',
            imgUrl: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big39000.jpg'
          }, {
            id: 3,
            type: 'image',
            imgUrl: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg'
          }, {
            id: 4,
            type: 'image',
            imgUrl: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big25011.jpg'
          }, {
            id: 5,
            type: 'image',
            imgUrl: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big21016.jpg'
          }, {
            id: 6,
            type: 'image',
            imgUrl: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big99008.jpg'
          }]
        })
      }
    })
  },
  //获取刷新内容
  getCopyWrite: function () {
    var that = this;
    wx.request({
      url: api.copywrite_url,
      success: function (res) {
        console.info(res)
        if (res.data.code == 200) {
          that.setData({
            aboveText: res.data.data.aboveText,
            belowText: res.data.data.belowText
          })
        }
      }
    })
  },
  //获取经纬度方法
  getLocation: function () {
    var that = this;
    let weatherIconURL = "https://xai-1251091977.cos.ap-chengdu.myqcloud.com/weather/";
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        var latitude = res.latitude
        var longitude = res.longitude
        console.log("lat:" + latitude + " lon:" + longitude);
        weatherApi.weatherRequest(longitude, latitude, {
          success(res) {
            that.setData({
              weather: res,
              weatherIcon: weatherIconURL + res.now.cond_code + 'd.png'
            })
          }
        });
      },
    })
  }
})
