// pages/character/test/test.js
var util = require('../../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '',
    stitle: '',
    MBTI_TYPE: '',
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.id == 1) {
      this.setData({
        title: '简单版',
        stitle: 'simple',
      })
      const data = {
        MBTI_TYPE: 'g57h70o2c8'
      }
      util.sendRequest("/plant/character/api/simple_begin", data, "POST", false, (res) => {
        if (res.hasErrors) {
          console.log(res.errorMessage);
          return false;
        }
        console.log(res)
      })
    } else if (options.id == 2) {
      this.setData({
        title: '专业版',
        stitle: 'pro',
        MBTI_TYPE: 'g57h70o2c8',
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})