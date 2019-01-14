// pages/character/character.js
var util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showDialog: false,
    src: util.setStaticUrl("/static/ymplant/ldq-img/character.jpg")
  },
  test:function(){
    util.navigateTo("/pages/character/test/test")
  },
  simple: function (e) {
    util.navigateTo("/pages/character/test/test", { id: e.target.id})
  },
  pro: function (e) {
    util.navigateTo("/pages/character/test/test", { id: e.target.id })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    util.ldqCheckLogin()
    var that = this;
    var userInfo = wx.getStorageSync('userInfo')
    util.sendRequest("/plant/character/api/clean_character_begin", {}, "POST", true, (res) => {
      if (res.hasErrors) {
        console.log(res.errorMessage);
        return false;
      }
    })
    // 监测是否是VIP是VIP去除弹窗
    //LS：高级体验会员 也得每日一次转发一次才能 使用开源的 信息2019.1.8
    if ((!userInfo.VIP || userInfo.VIP == '高级体验会员') && userInfo.ROLE_ID == 'sja4gc59bg') {
      var USER_ID = userInfo.USER_ID
      util.sendRequest('/wechat/applet/api/wethereShare', { USER_ID: USER_ID }, "POST", true, (res) => {
        if (res.hasErrors) {
          console.log(res.errorMessage)
          return false
        }
        var showDialog = true
        if (res.data == '10000') {
          that.setData({
            showDialog: false
          })
        } else {
          that.setData({
            showDialog: true
          })
        }
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
  console.log(123)
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
   * 用户点击右上角分享
   */
  onShareAppMessage: util.gdForward
})