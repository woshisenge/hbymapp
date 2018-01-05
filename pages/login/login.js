//logs.js
const util = require('../../utils/util.js')

Page({
  data: {
    logs: [],
    username:'',
    password:''
  },
  onLoad: function () {
    
  },
  start:function(){
    util.navigateTo("../register/register");
  },
  bindUsername: function(e) {
    this.setData({
      username: e.detail.value
    });
  },
  bindPassword: function (e) {
    this.setData({
      password: e.detail.value
    });
  },
  showTopTips:function(){
    util.sendRequest('/wechat/applet/api/relation', { USERNAME: this.data.username, PASSWORD: this.data.password }, "POST", true, function (){
      util.login();
    });
  }
})
