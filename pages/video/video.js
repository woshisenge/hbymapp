var util = require("../../utils/util")
Page({
  // onReady: function (res) {
  //   this.videoContext = wx.createVideoContext('myVideo')
  // },
  // inputValue: '',
  data: {
    src: '',
    //banner图
    consultation: util.setStaticUrl("/static/ymplant/ldq-img/wx_banner01.jpg"),
  },
	play: function (e) {
		var userInfo = wx.getStorageSync('userInfo')
		console.log(userInfo)
		if (userInfo.VIP != '体验版会员' || userInfo.VIP != '初级会员' || userInfo.VIP != '高级会员' || userInfo.VIP != '预约专家') {
			if (e.currentTarget.dataset.isfree == '1') {
				var userInfo = wx.getStorageSync('userInfo')
				if (!userInfo.VIP) {
					wx.showModal({
						content: '该视频仅限会员观看',
						showCancel: false,
						success: function (res) {
							if (res.confirm) {
								util.navigateTo("/pages/person/improve/improve", { id: '3', user_id: userInfo.USER_ID })
							}
						}
					})
					return false
				}
			}
		}
    var id = e.currentTarget.id
    util.navigateTo("/pages/video/play/play",{id:id})
  },
  toDto: function (list) {
    if (!list) return list;
    list.forEach(function (obj) {
      if (obj.IMGURL) {
        obj.IMGURL = util.setStaticUrl(obj.IMGURL);
      }
      if (obj.MODIFYTIME) {
        obj.MODIFYTIME = util.formatDate(new Date(obj.MODIFYTIME));
      }
    });
    return list;
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    util.ldqCheckLogin()
		var data = {
			SUBTITLE: "专家视频"
		}
		util.sendRequest("/wechat/applet/news/expertvideo", data, "POST", true, (res) => {
			if (res.hasErrors) {
				if (res.errorMessage == 'relogin') {
					wx.showModal({
						content: '请重新登录',
						showCancel: false,
						success: function (res) {
							if (res.confirm) {
								wx.redirectTo({
									url: '/pages/login/login'
								})
							}
						}
					})
					return false
				}
				console.log(res.errorMessage)
				return false
			}
			if (res.data == '10012') {
				wx.showModal({
					content: '请重新登录',
					showCancel: false,
					success: function (res) {
						if (res.confirm) {
							wx.redirectTo({
								url: '/pages/login/login'
							})
						}
					}
				})
				return false
			}
			console.log(res)
			this.setData({
				video: this.toDto(res.data)
			})
		})
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