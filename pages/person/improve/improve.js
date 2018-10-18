// pages/person/improve/improve.js
var util = require('../../../utils/util')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user_id:"",
    OUT_TRADE_NO:"",
    PHONE1:"",
    PHONE2:"",
		banner: util.setStaticUrl("/static/ymplant/img/sye/banner/15.png"),
		single1: util.setStaticUrl("/static/ymplant/img/sye/banner/banner-pay01.jpg"),
		single2: util.setStaticUrl("/static/ymplant/img/sye/banner/banner-pay02.jpg"),
		single3: util.setStaticUrl("/static/ymplant/img/sye/banner/banner-pay03.jpg"),
		NUMBER: '',
		PASSWORD: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    util.ldqCheckLogin()
		// console.log('111' ,options)
		var that = this;
		that.setData({
			user_id:options.user_id,
			id:options.id,
		});
  },
	cardUp: function (e) {
		var data = e.detail.value
		if (data.NUMBER.length != 15) {
			wx.showModal({
				content: '请输入15位卡号',
				showCancel: false,
				success: function (res) {
					if (res.confirm) {
					}
				}
			})
			return false
		}
		util.sendRequest("/wechat/applet/user/vip_new", data, "POST", true, (res) => {
			if (res.hasErrors) {
				console.log(res.errorMessage)
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
				wx.showModal({
					content: res.errorMessage,
					showCancel: false,
					success: function (res) {
						if (res.confirm) {
						}
					}
				})
				return false
			}
			wx.setStorageSync('userInfo', res)
			wx.showModal({
				content: '激活成功',
				showCancel: false,
				success: function (res) {
					if (res.confirm) {
						wx.redirectTo({
							url: '/pages/index/index'
						})
					}
				}
			})
		})
	},
  pay:function(e){
    var that = this;
    var a = e.currentTarget.id
		console.log(a)
		util.sendRequest("/plant/wxrecharge/addUnPayOrder", { TOTAL: a }, "POST", true, function (res) {
			console.log(res)
			if (res.errorMessage == "请君登录账号！") {
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
			}
			// return false
			var OUT_TRADE_NO = res.OUT_TRADE_NO
			var nonceStr = res.prePayReSign.nonceStr;
			var packageStr = res.prePayReSign.packageStr;
			var paySign = res.prePayReSign.paySign;
			var signType = res.prePayReSign.signType;
			var timeStamp = res.prePayReSign.timeStamp;
			wx.requestPayment({
				timeStamp: timeStamp,
				nonceStr: nonceStr,
				package: packageStr,
				signType: signType,
				paySign: paySign,
				success: function (obj) {
					util.sendRequest("/wechat/applet/user/activate", { USER_ID: that.data.user_id, OUT_TRADE_NO: OUT_TRADE_NO }, "POST", false, function (obj) {
						wx.showModal({
							content: '支付完成',
							showCancel: false,
							confirmText: "确定",
							success: function (res) {
								// util.sendRequest("/wechat/applet/user/activate_lsVSldq", {}, "POST", false, function (ldqRes) {
								// 	if (ldqRes.hasErrors) {
								// 		showError(ldqRes.errorMessage);
								// 		return false;
								// 	}
								// 	console.log(ldqRes)
								// })
								// 更新session
								var userInfo = wx.getStorageSync('userInfo')
								if (a == '13600') {
									userInfo.VIP = '初级会员'
								}
								if (a == '29800') {
									userInfo.VIP = '高级会员'
								}
								wx.setStorageSync('userInfo', userInfo)
								if (res.confirm) {
									wx.navigateBack({
										delta: 1,
									})
								}
							}
						})
					});
				},
			})
		},
		function(res){
			console.log(res)
		})
  },
  bindPhone1:function(e){
    this.setData({
      PHONE1:e.detail.value
    })
  },
  bindPhone2:function(e){
    this.setData({
      PHONE2: e.detail.value
    })
  },
  bindSubmit:function(e){
    var that = this;
    var a = e.currentTarget.id;
    console.log(that.data.PHONE1)
    console.log(that.data.PHONE2)
    console.log(that.data.user_id)
    if (that.data.PHONE1 == "" || that.data.PHONE2 == ""){
      util.showError("手机号不能为空！")
    } 
    else{
      wx.showModal({
        title: '提示',
        content: '本系统付费功能仅供河北考生使用，请确认是否为河北考生？（虚拟商品一经售出概不退换）',
        success: function (res) {
          if (res.confirm) {
            util.sendRequest("/plant/wxrecharge/preferentialActivitie_CheckPhone", {PHONE1:that.data.PHONE1,PHONE2:that.data.PHONE2},"POST",true,function(res){
            util.sendRequest("/plant/wxrecharge/addUnPayOrder_ForTwo", { TOTAL: a }, "POST", true, function (res) {
              var OUT_TRADE_NO = res.OUT_TRADE_NO;
              var nonceStr = res.prePayReSign.nonceStr;
              var packageStr = res.prePayReSign.packageStr;
              var paySign = res.prePayReSign.paySign;
              var signType = res.prePayReSign.signType;
              var timeStamp = res.prePayReSign.timeStamp;
              wx.requestPayment({
                timeStamp: timeStamp,
                nonceStr: nonceStr,
                package: packageStr,
                signType: signType,
                paySign: paySign,
                success: function (obj) {
                  util.sendRequest("/wechat/applet/user/activate_fortwo", { PHONE1: that.data.PHONE1,PHONE2:that.data.PHONE2, OUT_TRADE_NO: OUT_TRADE_NO,USER_ID:that.data.user_id }, "POST", false, function (obj) {
                    wx.showModal({
                      content: '支付完成',
                      showCancel: false,
                      confirmText: "确定",
                      success: function (res) {
                        if (res.confirm) {
                          wx.navigateBack({
                            delta: 1,
                          })
                        }
                      }
                    })
                })
                }
            })
          
        })
    })
          }
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