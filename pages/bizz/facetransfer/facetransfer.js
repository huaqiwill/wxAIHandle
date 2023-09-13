var app = getApp();
var api = require('../../../utils/api.js');
var facecosmeticUrl = 'https://wximage-1251091977.cos.ap-beijing.myqcloud.com/facecosmetic/';
var facedecorationUrl = 'https://wximage-1251091977.cos.ap-beijing.myqcloud.com/facedecoration/';
Page({
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
      title: '虚拟换妆',
      path: '/pages/bizz/facetransfer/facetransfer'
    }
  },
  data: {
    motto: '虚拟换妆',
    result: [],
    images: {},
    img: '',
    templateId: '1',
    windowWidth: 0,
    tempFilePath: null,
    currentIndex: 0,
    currentTab: 1,
    TabCur: 1,
    styleData: [
      { "id": "1", "name": "变妆" },
      { "id": "2", "name": "美妆" }
    ],
    //美妆
    facecosmeticData: [
      { "id": "1", "url": facecosmeticUrl + "1.png", "text": "芭比粉" },
      { "id": "2", "url": facecosmeticUrl + "2.png", "text": "清透" },
      { "id": "3", "url": facecosmeticUrl + "3.png", "text": "烟灰" },
      { "id": "4", "url": facecosmeticUrl + "4.png", "text": "自然" },
      { "id": "5", "url": facecosmeticUrl + "5.png", "text": "樱花粉" },
      { "id": "6", "url": facecosmeticUrl + "6.png", "text": "原宿红" },
      { "id": "7", "url": facecosmeticUrl + "7.png", "text": "闪亮" },
      { "id": "8", "url": facecosmeticUrl + "8.png", "text": "粉紫" },
      { "id": "9", "url": facecosmeticUrl + "9.png", "text": "粉嫩" },
      { "id": "10", "url": facecosmeticUrl + "10.png", "text": "自然" },
      { "id": "11", "url": facecosmeticUrl + "11.png", "text": "清透" },
      { "id": "12", "url": facecosmeticUrl + "12.png", "text": "大地色" },
      { "id": "13", "url": facecosmeticUrl + "13.png", "text": "玫瑰" },
      { "id": "14", "url": facecosmeticUrl + "14.png", "text": "自然" },
      { "id": "15", "url": facecosmeticUrl + "15.png", "text": "清透" },
      { "id": "16", "url": facecosmeticUrl + "16.png", "text": "桃粉" },
      { "id": "17", "url": facecosmeticUrl + "17.png", "text": "橘粉" },
      { "id": "18", "url": facecosmeticUrl + "18.png", "text": "春夏" },
      { "id": "19", "url": facecosmeticUrl + "19.png", "text": "秋冬" },
      { "id": "20", "url": facecosmeticUrl + "20.png", "text": "经典复古" },
      { "id": "21", "url": facecosmeticUrl + "21.png", "text": "性感混血" },
      { "id": "22", "url": facecosmeticUrl + "22.png", "text": "炫彩明眸" },
      { "id": "23", "url": facecosmeticUrl + "23.png", "text": "紫色魅惑" }],
    //变装
    facedecorationData: [
      { "id": "1", "url": facedecorationUrl + "1.jpg", "text": "埃及妆" },
      { "id": "2", "url": facedecorationUrl + "2.jpg", "text": "巴西土著妆" },
      { "id": "3", "url": facedecorationUrl + "3.jpg", "text": "灰姑娘妆" },
      { "id": "4", "url": facedecorationUrl + "4.jpg", "text": "恶魔妆" },
      { "id": "5", "url": facedecorationUrl + "5.jpg", "text": "武媚娘妆" },
      { "id": "6", "url": facedecorationUrl + "6.jpg", "text": "星光薰衣草" },
      { "id": "7", "url": facedecorationUrl + "7.jpg", "text": "花千骨" },
      { "id": "8", "url": facedecorationUrl + "8.jpg", "text": "僵尸妆" },
      { "id": "9", "url": facedecorationUrl + "9.jpg", "text": "爱国妆" },
      { "id": "10", "url": facedecorationUrl + "10.jpg", "text": "小胡子妆" },
      { "id": "11", "url": facedecorationUrl + "11.jpg", "text": "美羊羊妆" },
      { "id": "12", "url": facedecorationUrl + "12.jpg", "text": "火影鸣人妆" },
      { "id": "13", "url": facedecorationUrl + "13.jpg", "text": "刀马旦妆" },
      { "id": "14", "url": facedecorationUrl + "14.jpg", "text": "泡泡妆" },
      { "id": "15", "url": facedecorationUrl + "15.jpg", "text": "桃花妆" },
      { "id": "16", "url": facedecorationUrl + "16.jpg", "text": "女皇妆" },
      { "id": "17", "url": facedecorationUrl + "17.jpg", "text": "权志龙" },
      { "id": "18", "url": facedecorationUrl + "18.jpg", "text": "撩妹妆" },
      { "id": "19", "url": facedecorationUrl + "19.jpg", "text": "印第安妆" },
      { "id": "20", "url": facedecorationUrl + "20.jpg", "text": "印度妆" },
      { "id": "21", "url": facedecorationUrl + "21.jpg", "text": "萌兔妆" },
      { "id": "22", "url": facedecorationUrl + "22.jpg", "text": "大圣妆" }],
  },
  //点击切换
  clickTab: function (e) {
    var that = this;
    that.setData({
      TabCur: e.currentTarget.dataset.id,
      currentTab: e.currentTarget.dataset.id,
      currentIndex: 0
    })
  },
  //模板修改
  onFaceTransfer: function (e) {
    console.log(e)
    console.log('发生change事件，携带的value值为：', e.currentTarget.dataset.id)
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
      that.faceTransfer();
    }
  },

  clear: function (event) {
    console.info(event);
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
          }),
          wx.showLoading({
            title: "虚拟换妆中...",
            mask: true
          }),
          that.faceTransfer();
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
            title: "虚拟换妆中...",
            mask: true
          }),
          that.setData({
            img: res.tempFilePaths[0]
          })
          that.faceTransfer();
        }
      },
    })
  },
  //虚拟换妆
  faceTransfer: function () {
    var that = this;
    api.transferRequest(that.data.tempFilePath, app.globalData.userId, that.data.templateId,that.data.currentTab, {
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
