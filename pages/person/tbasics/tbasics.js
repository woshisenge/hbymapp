// pages/person/basics/basics.js
var util = require('../../../utils/util')
Page({
  /**
   * 页面的初始数据
   */
  data: {
		nickname: '',
		school_name: '',
		jobdate: '',
		sexs: [{ key: '11', val: '男' }, { key: '12', val: '女' }],
		thisSex: { key: '', val: '请选择性别' },
		jobyears: [
			{ key: 'l7gru49ll3', val: '1年以内'},
			{ key: 'q9q70meulf', val: '1-3年'},
			{ key: 'g21h56sllq', val: '3-5年'},
			{ key: 'lfs1lmt901', val: '5-10年'},
			{ key: 'o5ayni47vh', val: '10年以上'},
		],
		thisJobyear: { key: '', val: '请选择工作年限' }
  },
  bindPickerChange: function (e) {
    this.setData({
      sexIndex: e.detail.value
    })
  },
  bindDateChange: function (e) {
    this.setData({
      birthday: e.detail.value
    })
  },
  formSubmit: function (e) {
		var data = e.detail.value
		data.SEX = this.data.thisSex.key
		data.JOBDATE = this.data.thisJobyear.key
		console.log(data)
		util.sendRequest("/plant/teacher/api/basic_new", data, "POST", true, function (res) {
			if (res.hasErrors) {
				showError(res.errorMessage)
				return false
			}
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
		var userInfo = wx.getStorageSync('userInfo')
		// 判断是否登录
		util.checkLogin()
		this.setData({
			nickname: userInfo.NICKNAME,
			school_name: userInfo.SCHOOL_NAME,
			jobdate: userInfo.JOBDATE
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
		if(userInfo.JOBDATE == 'l7gru49ll3') {
			this.setData({
				thisJobyear: { key: 'l7gru49ll3', val: '1年以内' }
			})
		}
		if (userInfo.JOBDATE == 'q9q70meulf') {
			this.setData({
				thisJobyear: { key: 'q9q70meulf', val: '1-3年' }
			})
		}
		if (userInfo.JOBDATE == 'g21h56sllq') {
			this.setData({
				thisJobyear: { key: 'g21h56sllq', val: '3-5年' }
			})
		}
		if (userInfo.JOBDATE == 'lfs1lmt901') {
			this.setData({
				thisJobyear: { key: 'lfs1lmt901', val: '5-10年' }
			})
		}
		if (userInfo.JOBDATE == 'o5ayni47vh') {
			this.setData({
				thisJobyear: { key: 'o5ayni47vh', val: '10年以上' }
			})
		}
  },
	changeSex: function (e) {
		var that = this
		that.setData({
			thisSex: { key: that.data.sexs[e.detail.value].key, val: that.data.sexs[e.detail.value].val }
		})
		// console.log(that.data.thisSex)
	},
	changeJobyear: function (e) {
		var that = this
		that.setData({
			thisJobyear: { key: that.data.jobyears[e.detail.value].key, val: that.data.jobyears[e.detail.value].val }
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