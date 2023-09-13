const app = getApp()
var api = require('../../../utils/api.js');
var util = require('../../../utils/util.js');
Page({
  data: {
    InputBottom: 0,
    text:null,
    title:'和小跟班对话',
    chatRecord: [{
      text:'嗨～快来跟我聊天吧~ \n 小跟班 Always Online~',
      type:'1',
      date:util.formatTime(new Date())
    },{
      text:'有问题可以找我的主人哦~ \n 我的-联系小帅',
      type:'1',
      date:util.formatTime(new Date())
    }],
    inputValue:null,
    bstatus:false
  },
  InputFocus(e) {
    this.setData({
      InputBottom: e.detail.height
    })
  },
  InputBlur(e) {
    this.setData({
      InputBottom: 0
    })
  },
  undev(){
    wx.showToast({
      title: '敬请期待...',
      mask:true,
      icon:'none',
      duration:1000
    })
  },
  //进来加载
  onLoad: function () {
  },
  //发送按钮
  sendMsg(){
    var that = this;
    that.sendChatMsg();
  },
  //发送后台请求
  sendChatMsg(){
    var that = this;
    var text = that.data.inputValue;
    if(text==''||text==null){
      wx.showToast({
        title: '发送内容不可为空',
        mask:true,
        icon:'none',
        duration:1000
      })
    }else{
      that.setData({
        msg: {
          text:text,
          type:'2',
          date:util.formatTime(new Date())
        },
      })
      that.pageScrollToBottom();
      var length = that.data.chatRecord.push(that.data.msg);
      that.setData({
        inputValue:null,
        chatRecord:that.data.chatRecord,
        title:'小跟班正在输入...',
        bstatus:true
      })
      api.chatRequest(text,app.globalData.userId,{
        success(result) {
            if(result.code==200){
              that.setData({
                msg: {
                  text:result.data.answer,
                  type:'1'
                },
                bstatus:false
              })
              that.data.chatRecord.push(that.data.msg);
              that.setData({
                inputValue:null,
                title:'和小跟班对话',
                chatRecord:that.data.chatRecord
              })
              that.pageScrollToBottom();
            } else {
              that.pageScrollToBottom();
              that.setData({
                bstatus:false,
                title:'和小跟班对话',
              })
              if(result.code==87014){
                wx.showModal({
                  content: '内容违规,请更换',
                  showCancel: false,
                  confirmText: '好的',
                  success (res) {
                    if (res.confirm) {
                      that.data.chatRecord.splice(length-1,1)
                      that.setData({
                        chatRecord:that.data.chatRecord
                      })
                    }
                  }
                })
              }else{
                wx.showModal({
                  content: result.msg_zh,
                  showCancel: false,
                  confirmText: '好的'
                })
              }
            }
        }
      })
    }
  },
      /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var that = this;
    that.pageScrollToBottom();
},
  // 滚动到页面底部
  pageScrollToBottom: function() {
    let that = this;
    wx.createSelectorQuery().select('#chatBox').boundingClientRect(function(rect) {
      console.log(rect)
      wx.pageScrollTo({
        scrollTop: rect.height,
        duration: 100
      })
    }).exec()
  },
})
