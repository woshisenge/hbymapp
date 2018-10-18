//app.js
var utils = require('utils/util.js');
App({
  onLaunch: function () {
    //  utils.login()
  },
	
  globalData: {
		userInfo: null,
    socketFlag: false,
    globalSocket: null
  },
  startSocket: function() {
    var that = this;
    if(!that.globalData.socketFlag){
      that.globalData.socketFlag = true;
      var userInfo = wx.getStorageSync('userInfo')
      // console.log(userInfo.USER_ID)
      that.globalData.globalSocket = wx.connectSocket({
        url: 'wss://www.gaokgh.com.cn/plant/chat/' + userInfo.USER_ID,
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