var app = getApp();
var api = require('../../../utils/api.js');
Page({
  data: {
    motto: '图片背景色修改',
    result: [],
    images: {},
    color:'red',
    tempFilePath: null,
    img: ''
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
      title: '图片背景色修改',
      path: '/pages/bizz/idphoto/idphoto'
    }
  },
  //单选修改
  radiochange: function (e) {
    var that = this;
    that.data.color = e.detail.value;
    if (that.data.img == '') {
      wx.showModal({
        content: '未选择图片哦',
        showCancel: false,
        confirmText: '好的'
      })
    } else {
      wx.showLoading({
        title: "修改中...",
        mask: true
      }),
      that.bgColor();
    }
  },
  clear: function (event) {
    wx.clearStorage();
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
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
            tempFilePath: res.tempFiles[0].path
          })
          wx.showLoading({
            title: "修改中...",
            mask: true
          }),
          that.bgColor();
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
        that.setData({
          tempFilePath: res.tempFilePaths[0]
        })
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
          wx.showLoading({
            title: "修改中...",
            mask: true
          }),
          that.setData({
            img: res.tempFilePaths[0]
          })
          that.bgColor();
        }
      },
    })
  },
  //照片背景色变化
  bgColor:function(){
    var that = this;
    api.idphotoRequest(that.data.tempFilePath, app.globalData.userId, that.data.color, {
      success(result) {
        var resultJ = JSON.parse(result)
        wx.hideLoading();
        if (resultJ.code == 200) {
          that.setData({
            img: 'data:image/jpg;base64,' + resultJ.data.image_base64
          })
        } else {
          if (resultJ.code == 87014) {
            wx.hideLoading();
            wx.showModal({
              content: '存在敏感内容，请更换图片',
              showCancel: false,
              confirmText: '好的'
            })
            that.setData({
              img: null
            })
          } else {
            wx.hideLoading();
            wx.showModal({
              content: resultJ.msg_zh,
              showCancel: false,
              confirmText: '好的'
            })
          }
        }
      }
    })
  },
  onLoad: function () {

  },
  /**
 * 点击查看图片，可以进行保存
 */
  preview(e) {
    var that = this;
    if (null == that.data.img || that.data.img == '') {
      wx.showModal({
        title: '温馨提示',
        content: '未选择任何图片',
        showCancel: false,
        confirmText: '好的'
      })
    } else {
      wx.previewImage({
        urls: [that.data.img],
        current: that.data.img
      })
    }
  }
});
