// pages/character/character.js
var util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
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
    util.ldqCheckLogin();
    util.sendRequest("/plant/character/api/clean_character_begin", {}, "POST", true, (res) => {
      if (res.hasErrors) {
        console.log(res.errorMessage);
        return false;
      }
    })
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
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})