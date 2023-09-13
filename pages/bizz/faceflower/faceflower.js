var app = getApp();
var api = require('../../../utils/api.js');
Page({
  data: {
    motto: '送你一朵小红花',
    result: [],
    images: {},
    resultData: null,
    img: '',
    modalName: '',
    modalTitle: null,
    modalContent: null,
    direction:'right',
    sourcePath:null
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
      title: '送你一朵小红花',
      path: '/pages/bizz/faceflower/faceflower'
    }
  },
  //用户切换了左右
  switchFace: function (e) {
    var that = this;
    console.info(that.data.sourcePath)
    var value = e.detail.value
    var result = 'right'
    if(value){
      result = 'left'
    }else{
      result ='right'
    }
    that.setData({
      direction: result
    });
    if(null==that.data.sourcePath){
      wx.showToast({
        title: '未选择图片哦',
        icon: 'none',
        mask: true,
        duration: 1500
      })
    }else{
      that.faceFlowerDetect(that.data.sourcePath);
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
          that.faceFlowerDetect(res.tempFilePaths[0]);
        }
      },
    })
  },
  //小红花
  faceFlowerDetect(file){
    var that = this;
    that.setData({
      img: file
    }),
    wx.showLoading({
      title: "小红花贴图中...",
      mask: true
    }),
    api.faceFlowerRequest(file, app.globalData.userId,that.data.direction, {
      success(result) {
        var resultJ = JSON.parse(result)
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
