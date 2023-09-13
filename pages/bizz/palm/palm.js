var app = getApp();
var api = require('../../../utils/api.js');
Page({
  data: {
    motto: '手相分析',
    result: [],
    images: {},
    score: null,//手相评分
    ping_fen: null,//纹理评分
    shou_xiang: null,//手相描述
    tag: null,//手相标签
    zhang_wen: null,//掌纹分析
    zhi_xiang: null,//指相分析
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
      title: '手相分析',
      path: '/pages/bizz/palm/palm'
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
  //手相识别
  generalDetect(file){
    var that = this;
    that.setData({
      img: file
    }),
    wx.showLoading({
      title: "手相分析中...",
      mask: true
    }),
    api.generalRequest(file, app.globalData.userId, api.palm_url, {
      success(result) {
        var resultJ = JSON.parse(result)
        wx.hideLoading();
        if (resultJ.code == 200) {
          that.setData({
            score: resultJ.data.score,//手相评分
            ping_fen: resultJ.data.ping_fen,//纹理评分
            shou_xiang: resultJ.data.shou_xiang,//手相描述
            tag: resultJ.data.tag,//手相标签
            zhang_wen: resultJ.data.zhang_wen,//掌纹分析
            zhi_xiang: resultJ.data.zhi_xiang,//手指分析
            img: 'data:image/png;base64,'+resultJ.data.image_base64
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
