// pages/plaza/plaza.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    gridCol: 4,
    skin: false,
    iconList: [{
      icon: '../../../images/recovery/colourize.png',
      color: 'red',
      badge: 20,
      id: 1,
      name: '图像上色'
    }, {
        icon: '../../../images/recovery/definition.png',
      color: 'red',
      badge: 20,
      id: 2,
      name: '图像清晰度增强'
    }, {
        icon: '../../../images/recovery/color.png',
      color: 'red',
      badge: 20,
      id: 3,
      name: '图像色彩增强'
    }]
  },
  /**
 * 用户点击右上角分享
 */
  onShareAppMessage: function () {
    wx.showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage', 'shareTimeline']
    })
    return {
      title: 'AI恢复',
      path: '/pages/aiindex/recovery/recovery'
    }
  },
  //用户点击右上角分享朋友圈
  onShareTimeline: function () {
    return {
      title: 'AI恢复'
    }
  },
  //页面跳转
  toPage: function (event) {
    var route = event.currentTarget.id;
    if (route==1){
      wx.navigateTo({
        url: '/pages/bizz/colourize/colourize',
      })
    }else{
      wx.showToast({
        title: '功能陆续开放中...',
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})