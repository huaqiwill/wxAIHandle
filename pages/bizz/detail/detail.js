// pages/bizz/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    videoUrl:null,
    copyContent:null
  },
 copyVideoUrl(){
   var that = this;
    wx.setClipboardData({
      data: that.data.videoUrl,
      success: res => {
        wx.showToast({
          title: '链接已复制',
          duration: 1000,
        })
      }
    })
 },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    if(undefined==options.videoUrl){
      wx.redirectTo({
        url: '/pages/bizz/myrecord/myrecord',
      })
    }else{
      that.setData({
        videoUrl:decodeURIComponent(options.videoUrl)
      })
    }
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