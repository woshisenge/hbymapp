//app.js
var utils = require('utils/util.js');
App({
  onLaunch: function () {
    // utils.login()
  },
  globalData: {
    socketFlag: false,
    globalSocket: null
  },
  startSocket: function() {
    var that = this;
    if(!that.globalData.socketFlag){
      that.globalData.socketFlag = true;
      that.globalData.globalSocket = wx.connectSocket({
        url: 'wss://www.gaokgh.com.cn/plant/chat/' + utils.getInfoFromStorage("user_id"),
        header: {
          'content-type': 'application/json',
          'Cookie': 'new.cookie.id=' + utils.getSessionId()
        },
        method: "GET"
      });

      wx.onSocketOpen(function (res) {
        console.log('app-WebSocket连接已打开！')
      });

      wx.onSocketError(function (res) {
        console.log('app-WebSocket连接打开失败，请检查！')
      });

      wx.onSocketClose(function (res) {
        console.log('app-WebSocket 已关闭！')
      });

      wx.onSocketMessage(function (res) {
        console.log('收到服务器内容：' + res.data)
      })
    }
  }
})