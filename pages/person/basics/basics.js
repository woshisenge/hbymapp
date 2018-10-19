// pages/person/basics/basics.js
var util = require('../../../utils/util')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user_name: '',
		nickname: '',
		sexs: [{key: '11', val: '男'}, {key: '12', val: '女'}],
		thisSex: {key: '', val: '请选择性别'}
  },
  // bindPickerChange: function (e) {
  //   this.setData({
  //     sexIndex: e.detail.value
  //   })
  // },
  // bindDateChange: function (e) {
  //   this.setData({
  //     birthday: e.detail.value
  //   })
  // },
  // formSubmit: function (e) {
  //   e.detail.value.SEX = this.data.sexObjs[e.detail.value.SEX].DIC_ID;
  //   util.sendRequest("/wechat/applet/user/tocomplete", e.detail.value, "POST", true, function(res){
     
  //     wx.navigateBack({
  //       delta: 1
  //     });
  //   });
  // },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
		var userInfo = wx.getStorageSync('userInfo')
    // 判断是否登录
    util.ldqCheckLogin()
		this.setData({
			user_name: userInfo.USER_NAME,
			nickname: userInfo.NICKNAME,
		})
		if (userInfo.SEX == 11) {
			this.setData({
				thisSex: { key: '11', val: '男' }
			})
		}
		if (userInfo.SEX == 12) {
			this.setData({
				thisSex: { key: '12', val: '女' }
			})
		}
  },
	formSubmit: function (e) {
		var data = e.detail.value
		data.SEX = this.data.thisSex.key
		// console.log(data)
		util.sendRequest('/wechat/applet/user/tocompletebasicnew', data, "POST", true, function (res) {
			// 更新session
			wx.setStorageSync('userInfo', res)
			wx.showModal({
				content: '保存成功',
				showCancel: false,
				success: function (res) {
					if (res.confirm) {
						// 跳转
						wx.switchTab({
							url: '/pages/person/person'
						})
					}
				}
			})
		})
	},
	changeSex: function (e) {
		var that = this
		that.setData({
			thisSex: { key: that.data.sexs[e.detail.value].key, val: that.data.sexs[e.detail.value].val}
		})
		// console.log(that.data.thisSex)
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