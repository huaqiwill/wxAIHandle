var app = getApp();
var api = require('../../../utils/api.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    img: '',
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
      title: '一键秃头',
      path: '/pages/bizz/baldness/baldness'
    }
  },
   //从聊天页面选择图片
   chooseMessage:function(){
    var that = this;
    wx.chooseMessageFile({
      count: 1,
      sizeType: ['compressed'],
      type:'image',
      success(res){
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
            sourcePath:res.tempFiles[0].path
          })
          that.faceFlowerDetect(res.tempFiles[0].path);
        }
      }
    })
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
            sourcePath:res.tempFilePaths[0]
          })
          that.hairLineEdit(res.tempFilePaths[0]);
        }
      },
    })
  },
  //发际线编辑
  hairLineEdit(file){
    var that = this;
    that.setData({
      img: file
    }),
    wx.showLoading({
      title: "秃头中...",
      mask: true
    }),
    api.hairLineEditRequest(file, app.globalData.userId,0, {
      success(result) {
        var resultJ = JSON.parse(result)
        console.info(resultJ)
        wx.hideLoading();
        if (resultJ.code == 200) {
          that.setData({
            img: 'data:image/jpg;base64,' + resultJ.data_flower.image_base64
          })
        } else {
          if (resultJ.code == 87014) {
            wx.hideLoading();
            wx.showModal({
              content: '存在敏感内容，请更换图片',
              showCancel: false,
              confirmText: '明白了'
            })
            that.setData({
              img: null
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
 * 点击查看图片，可以进行保存
 */
preview(e) {
  var that = this;
  wx.previewImage({
    urls: [that.data.img],
    current: that.data.img
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