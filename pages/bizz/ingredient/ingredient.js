var app = getApp();
var api = require('../../../utils/api.js');
Page({
  data: {
    motto: '食材识别',
    result: [],
    images: {},
    resultData: null,
    img: '',
    modalName: '',
    modalTitle: null,
    modalContent: null
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
      title: '食材识别',
      path: '/pages/bizz/ingredient/ingredient'
    }
  },
  //打开详情介绍
  showDetail: function (e) {
    var that = this;
    var description = e.target.dataset.description;
    var name = e.target.dataset.name;
    if (description == undefined) {
      wx.showToast({
        title: '暂无介绍内容',
        icon: 'none',
        duration: 2000,
        mask: true
      })
    } else {
      if (description.length > 0) {
        wx.showModal({
          title: name,
          content: description,
          showCancel: false,
          confirmText: '关闭介绍',
          confirmColor: '#02A0E7'
        })
      } else {
        wx.showToast({
          title: '暂无介绍内容',
          icon: 'none',
          duration: 2000,
          mask: true
        })
      }
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
            img: res.tempFiles[0].path
          })
          that.icrDetect(res.tempFiles[0].path);
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
          that.icrDetect(res.tempFilePaths[0]);
        }

      },
    })
  },
  //食材识别
  icrDetect(file){
    var that = this;
    that.setData({
      img: file
    }),
    wx.showLoading({
      title: "食材识别中...",
      mask: true
    }),
    api.icrRequest(file, app.globalData.userId, 'ingredient', {
      success(result) {
        var resultJ = JSON.parse(result)
        wx.hideLoading();
        if (resultJ.code == 200) {
          that.setData({
            resultData: resultJ.result
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
  onLoad: function () {
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
  }
});
