var app = getApp();
var api = require('../../../utils/api.js');
var imgUrl = 'https://wximage-1251091977.cos.ap-beijing.myqcloud.com/facemergesml/';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    motto: '人脸融合',
    result: [],
    images: {},
    img: '',
    templateId: '1',
    windowWidth: 0,
    tempFilePath: null,
    currentIndex: 0,
    facemergeData: [
      { "id": "1", "url": imgUrl + "1s.png", "text": "奇迹" },
      { "id": "2", "url": imgUrl + "2s.png", "text": "压岁钱" },
      { "id": "3", "url": imgUrl + "3s.png", "text": "范蠡(lí)" },
      { "id": "4", "url": imgUrl + "4s.png", "text": "李白" },
      { "id": "10", "url": imgUrl + "10s.png", "text": "凤九" }]
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
      title: '人脸融合',
      path: '/pages/bizz/facemerge/facemerge'
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
            tempFilePath: res.tempFiles[0].path
          })
          wx.showLoading({
            title: "效果生成中...",
            mask: true
          }),
          that.faceMerge();
        }
      }
    })
  },
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
            title: "效果生成中...",
            mask: true
          }),
          that.setData({
            img: res.tempFilePaths[0]
          })
          that.faceMerge();
        }
      },
    })
  },
  //模板修改
  onFaceMerge: function (e) {
    var that = this;
    that.data.templateId = e.currentTarget.dataset.id;
    if (that.data.img == '') {
      wx.showModal({
        content: '未选择图片哦',
        showCancel: false,
        confirmText: '明白了'
      })
    } else {
      that.setData({
        currentIndex: e.currentTarget.dataset.index
      })
      wx.showLoading({
        title: "效果生成中...",
        mask: true
      }),
      that.faceMerge();
    }
  },
  //人脸融合
  faceMerge: function () {
    var that = this;
    api.mergeRequest(that.data.tempFilePath, app.globalData.userId, that.data.templateId, {
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
})
