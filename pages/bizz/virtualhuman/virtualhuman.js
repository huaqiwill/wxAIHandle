var app = getApp();
var api = require('../../../utils/api.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    motto: '蚂蚁呀嘿',
    content:null,
    result: [],
    images: {},
    resultData: null,
    img: null,
    faceNum: 0,
    modalName: '',
    modalTitle: null,
    modalContent: null
  },
  getContent: function (e) {
    var that = this;
    this.setData({
      content: e.detail.value
    })
  },
  //再次提交
  reCommit:function(){
    var that = this;
    console.info(that.data.img)
    that.virtualHuman(that.data.img);
  },
  //请求方法
  uploads: function () {
    var that = this
    var takephonewidth
    var takephoneheight
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        wx.getImageInfo({
          src: res.tempFilePaths[0],
          success(res) {
            takephonewidth = res.width,
              takephoneheight = res.height
          }
        })
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        if (res.tempFiles[0].size > (4096 * 1024)) {
          wx.showToast({
            title: '图片文件过大哦',
            icon: 'none',
            mask: true,
            duration: 1500
          })
        } else {
          that.setData({
            img: res.tempFilePaths[0],
            sourcePath: res.tempFilePaths[0]
          })
          that.virtualHuman(res.tempFilePaths[0]);
        }
      },
    })
  },
  //从聊天页面选择图片
  chooseMessage: function () {
    var that = this;
    wx.chooseMessageFile({
      count: 1,
      sizeType: ['compressed'],
      type: 'image',
      success(res) {
        if (res.tempFiles[0].size > (4096 * 1024)) {
          wx.showToast({
            title: '图片文件过大哦',
            icon: 'none',
            mask: true,
            duration: 1500
          })
        } else {
          that.setData({
            img: res.tempFiles[0].path,
            sourcePath: res.tempFiles[0].path
          })
          that.virtualHuman(res.tempFiles[0].path);
        }
      }
    })
  },

  //拟真视频
  virtualHuman(file) {
    var that = this;
    var content = that.data.content;
      wx.showLoading({
        title: "任务创建中...",
        mask: true
      }),
      api.virtualHumanRequest(file, app.globalData.userId,content, {
        success(result) {
          var resultJ = JSON.parse(result)
          if (resultJ.code == 200) {
            wx.hideLoading();
            wx.showModal({
              content: '创建成功,稍后我的-我的记录查询',
              showCancel: false,
              confirmText: '明白了'
            })
          } else {
            if (resultJ.code == 87014) {
              wx.hideLoading();
              wx.showModal({
                content: '存在敏感内容，请更换图片或内容',
                showCancel: false,
                confirmText: '明白了'
              })
              that.setData({
                img: null,
                content:null
              })
            } else {
              wx.hideLoading();
              wx.showModal({
                content: resultJ.msg_zh,
                showCancel: false,
                confirmText: '明白了'
              })
            }
          }
        }
      })
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
    this.videoContext = wx.createVideoContext('myVideo')
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
  onShareTimeline: function () {},
  //用户点击右上角分享朋友|朋友圈
  onShareAppMessage: function () {
    wx.showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage', 'shareTimeline']
    })
    return {
      title: '拟真视频',
      path: '/pages/bizz/virtualhuman/virtualhuman'
    }
  },
})