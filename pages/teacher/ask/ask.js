// pages/teacher/ask/ask.js
const util = require('../../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    content:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
		if (wx.getStorageSync('userInfo').VIP == '无') {
			wx.showModal({
				content: '该功能只有会员才能使用',
				showCancel: false,
				success: function (res) {
					if (res.confirm) {
						util.navigateTo("/pages/teacher/teacher")
					}
				}
			})
		}
  },
  bindContent:function(e){
    this.setData({
      content:e.detail.value
    })
  },
  showTopTips:function(){
		var userInfo = wx.getStorageSync('userInfo')
    var data = {
			CODE: 1,
			NICKNAME_STU: userInfo.NICKNAME,
			HEADURL_STU: userInfo.HEADURL,
			ASK_CONTENT: this.data.content
		}
		if (data.ASK_CONTENT == '') {
			util.showError("问题不能为空")
			return false
		}
		console.log(data)
		util.sendRequest("/wechat/applet/expert/api/stu_ask_pro", data,"POST",true,function(res){
			if (res.hasErrors) {
				console.log(res.errorMessage);
				return false;
			}
			if (res.data == 10010) {
				wx.showModal({
					content: '提问成功',
					showCancel: false,
					success: function (res) {
						if (res.confirm) {
              // 返回上一页
              wx.navigateBack(-1)
							// util.navigateTo("/pages/teacher/teacher")
						}
					}
				})
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