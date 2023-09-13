var app = getApp();
var api = require('../../../utils/api.js');
Page({
  data: {
    motto: '面相(五官)分析',
    result: [],
    images: {},
    eye:null,
    eyebrow: null,
    face: null,
    faceFortune: null,
    face_shape: null,
    fortune:null,
    faceMessage:null,
    lips: null,
    nose: null,
    skin_color: null,
    img: '',
    color: ['#e54d42', '#f37b1d', '#fbbd08', '#8dc63f', '#39b54a', '#1cbbb4', '#0081ff', '#6739b6', '#9c26b0', '#e03997', '#a5673f', '#8799a3', '#aaaaaa', '#333333', '#ffffff']
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
      title: '面相(五官)分析',
      path: '/pages/bizz/faceorgans/faceorgans'
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
          that.generalDetect(res.tempFiles[0].path);
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
          that.generalDetect(res.tempFilePaths[0]);
        }
      },
    })
  },
  //面相识别
  generalDetect(file){
    var that = this;
    that.setData({
      img: file
    }),
    wx.showLoading({
      title: "面相分析中...",
      mask: true
    }),
    api.faceOrgansRequest(file, app.globalData.userId,{
      success(result){
        var resultJ = JSON.parse(result)
        wx.hideLoading();
        if (resultJ.code==200){
          that.setData({
            eye: resultJ.eye,
            eyebrow: resultJ.eyebrow,
            face: resultJ.face,
            faceFortune: resultJ.faceFortune,
            face_shape: resultJ.face_shape,
            lips: resultJ.lips,
            nose: resultJ.nose,
            skin_color: resultJ.skin_color,
            fortune: resultJ.fortune,
            faceMessage: resultJ.faceMessage
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
