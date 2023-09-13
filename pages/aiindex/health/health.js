// pages/plaza/plaza.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    gridCol: 4,
    skin: false,
    iconList: [{
      icon: '../../../images/health/skin.png',
      color: 'red',
      badge: 20,
      id: 1,
      name: '肤质分析'
    }],
    ymtxList: [
      {
        icon: '../../../images/health/hyqyd.png',
        color: 'red',
        badge: 20,
        id: 1,
        name: '黑眼圈眼袋检测'
      }, {
        icon: '../../../images/health/zw.png',
        color: 'red',
        badge: 20,
        id: 2,
        name: '皱纹检测'
      }, {
        icon: '../../../images/health/gh.png',
        color: 'red',
        badge: 20,
        id: 3,
        name: '皮肤光滑度分析'
      },
      {
        icon: '../../../images/health/bdz.png',
        color: 'red',
        badge: 20,
        id: 4,
        name: '痘斑痣检测'
      },
      {
        icon: '../../../images/health/skin_color.png',
        color: 'red',
        badge: 20,
        id: 5,
        name: '肤色分析'
      }
    ]
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
      title: 'AI健康',
      path: '/pages/aiindex/health/health'
    }
  },
  //用户点击右上角分享朋友圈
  onShareTimeline: function () {
    return {
      title: 'AI健康'
    }
  },
  //页面跳转
  toPageFace: function (event) {
    wx.showToast({
      title: '功能陆续开放中...',
      mask: true,
      duration: 1500,
      icon: 'none'
    })
  },
  //页面跳转
  toPageMedical: function (event) {
    var route = event.currentTarget.id;
    if (route == 1) {
      wx.navigateTo({
        url: '/pages/bizz/eyesattr/eyesattr',
      })
    }
    if (route == 2) {
      wx.navigateTo({
        url: '/pages/bizz/facewrinkle/facewrinkle',
      })
    }
    if (route == 3) {
      wx.navigateTo({
        url: '/pages/bizz/skinsmooth/skinsmooth',
      })
    }
    if (route == 4) {
      wx.navigateTo({
        url: '/pages/bizz/acnespotmole/acnespotmole',
      })
    }
    if (route == 5) {
      wx.navigateTo({
        url: '/pages/bizz/skincolor/skincolor',
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