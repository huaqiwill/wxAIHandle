var app = getApp();
var api = require('../../../utils/api.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    logTypeCur: null,
    emptyRecord:true,
    //记录数据
    recordList: [],
    //接口类型
    logType: [{
        name: '全部',
        range: null
      },
      {
        name: '蚂蚁雅黑',
        range: 72056
      },
      {
        name: '虚拟真人',
        range: 72057
      }
    ]
  },
 /**
   * 详情记录
   */
  toDetail(e){
    var detail = e.currentTarget.dataset.detail;
    if(detail.taskStatus=='success'){
      wx.navigateTo({
        url: '/pages/bizz/detail/detail?videoUrl='+encodeURIComponent(detail.videoUrl),
      })
    } else {
      wx.showModal({
        content: '暂无视频路径，无法查看详',
        showCancel: false,
        confirmText: '好的'
      })
    }
  },
  /**
   * 更改选择
   */
  tabSelect(e) {
    var that = this;
    let range = e.currentTarget.dataset.range;
    that.setData({
      logTypeCur: e.currentTarget.dataset.id
    })
    //重新加载
    that.getMyRecord(range)
  },
  /**
   * 获取记录
   */
  getMyRecord: function (status) {
    var that = this;
    wx.showLoading({
      title: '数据加载中...',
      mask: true
    })
    api.faceDynamicListRequest(app.globalData.userId, status, {
      success(result) {
        if (result.code == 200) {
          wx.hideLoading();
          if(result.data.total==0){
            that.setData({
              emptyRecord: true,
              recordList:[]
            })
          }else{
            that.setData({
              emptyRecord: false,
              recordList: result.data.records
            })
          }
        } else {
          wx.hideLoading();
          that.setData({
            emptyRecord: true,
            recordList:[]
          })
          wx.showModal({
            content: result.msg_zh,
            showCancel: false,
            confirmText: '明白了'
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    //加载数据
    that.getMyRecord(null)
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
    var that = this;
    //加载数据
    that.getMyRecord(null);
    that.setData({
      logTypeCur:null
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var that = this;
    //加载数据
    that.getMyRecord(null);
    that.setData({
      logTypeCur:null
    })
  }
})