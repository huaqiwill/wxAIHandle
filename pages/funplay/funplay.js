// pages/plaza/plaza.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    gridCol: 4,
    skin: false,
    iconList: [{
      icon: '../../images/aifunplay/facemerge.png',
      color: 'red',
      badge: 20,
      id: 1,
      name: '人脸融合'
    },
    {
      icon: '../../images/aifunplay/facedecoration.png',
      color: 'red',
      badge: 20,
      id: 2,
      name: '虚拟换妆'
    }, {
      icon: '../../images/aifunplay/old.png',
      color: 'red',
      badge: 20,
      id: 3,
      name: '人脸变老人'
    }, {
      icon: '../../images/aifunplay/child.png',
      color: 'red',
      badge: 20,
      id: 4,
      name: '人脸变儿童'
    }, {
      icon: '../../images/aifunplay/gender.png',
      color: 'red',
      badge: 20,
      id: 5,
      name: '性别转换'
    }, {
      icon: '../../images/aifunplay/baldness.png',
      color: 'red',
      badge: 20,
      id: 6,
      name: '一键秃头'
    }, {
      icon: '../../images/aifunplay/hair.png',
      color: 'red',
      badge: 20,
      id: 7,
      name: '一键生发'
    }],
    iconListLab:[{
      icon: '../../images/aifunplay/faceflower.png',
      color: 'red',
      badge: 20,
      id: 1,
      name: '送你一朵小红花'
    },{
      icon: '../../images/aifunplay/drive.png',
      color: 'red',
      badge: 20,
      id: 2,
      name: '蚂蚁呀嘿'
    },{
      icon: '../../images/aifunplay/human.png',
      color: 'red',
      badge: 20,
      id: 3,
      name: '虚拟真人'
    }]
  },
    //页面跳转
    toPagelab: function (event) {
      var route = event.currentTarget.id;
      if (route == 1) {
        wx.navigateTo({
          url: '/pages/bizz/faceflower/faceflower',
        })
      }else if(route == 2){
        wx.navigateTo({
          url: '/pages/bizz/facedrive/facedrive',
        })
      }else if(route == 3){
        wx.navigateTo({
          url: '/pages/bizz/virtualhuman/virtualhuman',
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
  //页面跳转
  toPage: function (event) {
    var route = event.currentTarget.id;
    if (route == 1) {
      wx.navigateTo({
        url: '/pages/bizz/facemerge/facemerge',
      })
    }else if (route == 2) {
      wx.navigateTo({
        url: '/pages/bizz/facetransfer/facetransfer',
      })
    }else if (route == 6) {
      wx.navigateTo({
        url: '/pages/bizz/baldness/baldness',
      })
    }else if (route == 7) {
      wx.navigateTo({
        url: '/pages/bizz/hair/hair',
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
      title: 'AI趣玩',
      path: '/pages/funplay/funplay'
    }
  },
})