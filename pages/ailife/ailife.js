// pages/plaza/plaza.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    gridCol: 4,
    skin: false,
    //垃圾分类
    garbageList: [{
      icon: '../../images/ailife/shanghai.png',
      color: 'blue',
      badge: 20,
      id: 310000,
      name: '上海垃圾分类'
    },
    {
      icon: '../../images/ailife/ningbo.png',
      color: 'red',
      badge: 20,
      id: 330200,
      name: '宁波垃圾分类'
    }, {
      icon: '../../images/ailife/xian.png',
      color: 'blue',
      badge: 20,
      id: 610100,
      name: '西安垃圾分类'
    }, {
      icon: '../../images/ailife/shenzhen.png',
      color: 'red',
      badge: 20,
      id: 440300,
      name: '深圳垃圾分类'
    },
    {
      icon: '../../images/ailife/beijing.png',
      color: 'blue',
      badge: 20,
      id: 110000,
      name: '北京垃圾分类'
    }],
    //图像识别
    icrList: [{
      icon: '../../images/ailife/dish.png',
      color: 'red',
      badge: 20,
      id: 1,
      name: '菜品识别'
    },
    {
      icon: '../../images/ailife/car.png',
      color: 'red',
      badge: 20,
      id: 2,
      name: '车型识别'
    }, {
      icon: '../../images/ailife/plant.png',
      color: 'red',
      badge: 20,
      id: 3,
      name: '植物识别'
    }, {
      icon: '../../images/ailife/flower.png',
      color: 'red',
      badge: 20,
      id: 4,
      name: '花卉识别'
    },
    {
      icon: '../../images/ailife/redwine.png',
      color: 'red',
      badge: 20,
      id: 5,
      name: '红酒识别'
    },
    {
      icon: '../../images/ailife/landmark.png',
      color: 'red',
      badge: 20,
      id: 6,
      name: '景区识别'
    }, {
      icon: '../../images/ailife/animal.png',
      color: 'red',
      badge: 20,
      id: 7,
      name: '动物识别'
    },
    {
      icon: '../../images/ailife/logo.png',
      color: 'red',
      badge: 20,
      id: 8,
      name: 'LOGO识别'
    }, {
      icon: '../../images/ailife/ingredient.png',
      color: 'red',
      badge: 20,
      id: 9,
      name: '食材识别'
      }, {
        icon: '../../images/ailife/currency.png',
        color: 'red',
        badge: 20,
        id: 10,
        name: '货币识别'
      }, {
        icon: '../../images/ailife/chinesehm.png',
        color: 'red',
        badge: 20,
        id: 11,
        name: '中草药识别'
      }, {
        icon: '../../images/ailife/watch.png',
        color: 'red',
        badge: 20,
        id: 12,
        name: '小表帝(手表识别)'
      }, {
        icon: '../../images/ailife/clothing.png',
        color: 'red',
        badge: 20,
        id: 13,
        name: '穿衣搭配'
      }, {
        icon: '../../images/ailife/color.png',
        color: 'red',
        badge: 20,
        id: 14,
        name: '颜色识别'
      }, {
        icon: '../../images/ailife/schoolbadge.png',
        color: 'red',
        badge: 20,
        id: 15,
        name: '校徽识别'
      }],
    //文字识别
    ocrList: [{
      icon: '../../images/ailife/ocr.png',
      color: 'red',
      badge: 20,
      id: 1,
      name: '通用识别'
    },
    // {
    //   icon: '../../images/ailife/bankcard.png',
    //   color: 'red',
    //   badge: 20,
    //   id: 2,
    //   name: '银行卡识别'
    // },
    {
      icon: '../../images/ailife/handwrite.png',
      color: 'red',
      badge: 20,
      id: 3,
      name: '手写字识别'
    }
    // {
    //   icon: '../../images/ailife/idcard.png',
    //   color: 'red',
    //   badge: 20,
    //   id: 3,
    //   name: '证件识别'
    // }
    ],
    //人体识别
    bodyList: [{
      icon: '../../images/ailife/gesture.png',
      color: 'red',
      badge: 20,
      id: 1,
      name: '手势识别'
    }]
  },
  //用户点击右上角分享朋友圈
  onShareTimeline: function () {
  },
  //用户点击右上角分享朋友|朋友圈
  onShareAppMessage: function () {
    wx.showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage', 'shareTimeline']
    })
    return {
      title: 'AI生活',
      path: '/pages/ailife/ailife'
    }
  },
  //页面跳转
  toPageICR: function (event) {
    var route = event.currentTarget.id;
    if (route == 11) {
      wx.navigateToMiniProgram({
        appId: 'wxa68d018535a3f2ae'
      })
    }
    if (route == 1) {
      wx.navigateTo({
        url: '/pages/bizz/dish/dish',
      })
    }
    if (route == 2) {
      wx.navigateTo({
        url: '/pages/bizz/car/car',
      })
    }
    if (route == 3) {
      wx.navigateTo({
        url: '/pages/bizz/plant/plant',
      })
    }
    if (route == 4) {
      wx.navigateTo({
        url: '/pages/bizz/flower/flower',
      })
    }
    if (route == 5) {
      wx.navigateTo({
        url: '/pages/bizz/redwine/redwine',
      })
    }
    if (route == 6) {
      wx.navigateTo({
        url: '/pages/bizz/landmark/landmark',
      })
    }
    if (route==7){
      wx.navigateTo({
        url: '/pages/bizz/animal/animal',
      })
    }
    if (route == 8) {
      wx.navigateTo({
        url: '/pages/bizz/logo/logo',
      })
    }
    if (route == 9) {
      wx.navigateTo({
        url: '/pages/bizz/ingredient/ingredient',
      })
    }
    if (route == 10) {
      wx.navigateTo({
        url: '/pages/bizz/currency/currency',
      })
    }
    if (route == 12) {
      wx.navigateTo({
        url: '/pages/bizz/watch/watch',
      })
    }
    if (route == 13) {
      wx.navigateTo({
        url: '/pages/bizz/clothing/clothing',
      })
    }
    if (route == 14) {
      wx.navigateTo({
        url: '/pages/bizz/color/color',
      })
    }
    if (route == 15) {
      wx.navigateTo({
        url: '/pages/bizz/schoolbadge/schoolbadge',
      })
    }
  },
  toPageGarbage:function(event){
    var route = event.currentTarget.id;
    wx.navigateTo({
      url: '/pages/bizz/garbage/garbage?cityId=' + route,
    })
  },
  toPageOCR:function(event){
    wx.showToast({
      title: '功能陆续开放中...',
      mask: true,
      duration: 1500,
      icon: 'none'
    })
  },
  toPageBODY: function(event) {
    var route = event.currentTarget.id;
    if(route==1){
      wx.showToast({
        title: '暂未接入...',
        mask: true,
        duration: 1500,
        icon: 'none'
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },
})
