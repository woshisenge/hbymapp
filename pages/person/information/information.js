// pages/person/information/information.js
var util = require('../../../utils/util')
Page({
  /**
   * 页面的初始数据
   */
  data: {
    majortype: '',
		city: '',
		county: '',
		school_name: '',
		examyear: '',
		examscore: '',
    countries: ["本科一批", "本科二批"],
    countryIndex: 0,
    difference:0,
  },
  formSubmit: function(e) {
    var data = e.detail.value
    var userInfo = wx.getStorageSync('userInfo')
    if (data.DIFFERENCE != 0 ) {
      if (userInfo.MAJORTYPE == 'r6j4mh69be' && data.COUNTRYINDEX == 0) {
        this.setData({
          examscore: Number(511) + Number(data.DIFFERENCE)
        })
        userInfo.EXAMSCORE = Number(511) + Number(data.DIFFERENCE)//本一理科
      } else if (userInfo.MAJORTYPE == 'gjv044girc' && data.COUNTRYINDEX == 0) {
        this.setData({
          examscore: Number(559) + Number(data.DIFFERENCE)
        })
        userInfo.EXAMSCORE = Number(559) + Number(data.DIFFERENCE)//本一文科
      } else if (userInfo.MAJORTYPE == 'r6j4mh69be' && data.COUNTRYINDEX == 1) {
        this.setData({
          examscore: Number(358) + Number(data.DIFFERENCE)
        })
        userInfo.EXAMSCORE = Number(358) + Number(data.DIFFERENCE)//本二理科
      } else if (userInfo.MAJORTYPE == 'gjv044girc' && data.COUNTRYINDEX == 1) {
        this.setData({
          examscore: Number(441) + Number(data.DIFFERENCE)
        })
        userInfo.EXAMSCORE = Number(441) + Number(data.DIFFERENCE)//本二文科
      }
    }
      if (data.EXAMSCORE > 750 || data.EXAMSCORE < 200) {
        wx.showModal({
          content: '分数不得超过750分, 或低于200分',
          showCancel: false,
          success: function (res) {
            if (res.confirm) {
            }
          }
        })
        return false
      }
      // console.log("ls1:",userInfo)
      // console.log("ls:",data);
      util.sendRequest('/plant/user/api/xiancha', userInfo, "POST", true, function (res) {
        console.log(333, res)
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
		// console.log(userInfo)
		// 判断是否登录
		util.ldqCheckLogin()
		this.setData({
			city: userInfo.CITY_VALUE,
			county: userInfo.COUNTY_VALUE,
			school_name: userInfo.SCHOOL_NAME,
			examscore: userInfo.EXAMSCORE
		})
		if (userInfo.MAJORTYPE == 'gjv044girc') {
			this.setData({
				majortype: '文科'
			})
		}
		if (userInfo.MAJORTYPE == 'r6j4mh69be') {
			this.setData({
				majortype: '理科'
			})
		}
		if (userInfo.EXAMYEAR == 'twh405jq9y') {
			this.setData({
				examyear: '2019'
			})
		}
		if (userInfo.EXAMYEAR == 'r6cemag3kh') {
			this.setData({
				examyear: '2020'
			})
		}
		if (userInfo.EXAMYEAR == 'nlpxbkwn47') {
			this.setData({
				examyear: '2021'
			})
		}
    console.log(123,this.majortype)
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