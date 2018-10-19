// pages/teacher/teacher.js
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputShowed: false,
    inputVal: "",
    hidden:false,
    role:"",
    tabs: ["查看问题", "预约专家"],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,
    //banner图
    consultation: util.setStaticUrl("/static/ymplant/ldq-img/wx_zjwd.jpg"),
    ex_list: []
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    util.ldqCheckLogin()
		var userInfo = wx.getStorageSync('userInfo')
		util.sendRequest("/wechat/applet/expert/api/askpro_datas", {}, "POST", false, (res) => {
			console.log(res)
			if (res.hasErrors) {
				console.log(res.errorMessage);
				return false;
			}
			console.log(userInfo)
			res.data.forEach(item => {
				item.HEADURL_PRO = util.setStaticUrl(item.HEADURL_PRO)
				item.HEADURL_STU = util.setStaticUrl(item.HEADURL_STU)
			})
			this.setData({
				vip: userInfo.VIP,
				role: userInfo.ROLE_ID,
				result: res.data
			})
		})
  },
	bindContent: function (e) {
		this.setData({
			content: e.detail.value,
			ind: e.target.id
		})
	},
	postAnswer: function (e) {
		var that = this
		// 避免点击的按钮与输入框获取的内容不同
		if (e.target.id != this.data.ind) {
			return false
		}
		if (!this.data.content) {
			wx.showModal({
				content: '内容不得为空',
				showCancel: false,
				success: function (res) {
					if (res.confirm) {
						return false
					}
				}
			})
			return false
		}
		if (this.data.content.length > 255) {
			wx.showModal({
				content: '长度不得超过255字符',
				showCancel: false,
				success: function (res) {
					if (res.confirm) {
						return false
					}
				}
			})
			return false
		}
		var userInfo = wx.getStorageSync('userInfo')
		var data = {
			ANSWER_CONTENT: this.data.content,
			NICKNAME_PRO: userInfo.NICKNAME,
			HEADURL_PRO: userInfo.HEADURL,
			ASKS_ANSWERS_ID: e.currentTarget.dataset.pid,
			CODE: '1'
		}
		console.log(data)
		util.sendRequest("/wechat/applet/expert/api/pro_answer_stu", data, "POST", true, function (res) {
			if (res.hasErrors) {
				console.log(res.errorMessage);
				return false;
			}
			if (res.data == 10011) {
				wx.showModal({
					content: '回复成功',
					showCancel: false,
					success: function (res) {
						if (res.confirm) {
							util.sendRequest("/wechat/applet/expert/api/askpro_datas", {}, "POST", false, (res) => {
								if (res.hasErrors) {
									console.log(res.errorMessage);
									return false;
								}
								res.data.forEach(item => {
									item.HEADURL_PRO = util.setStaticUrl(item.HEADURL_PRO)
									item.HEADURL_STU = util.setStaticUrl(item.HEADURL_STU)
								})
								that.setData({
									result: res.data
								})
							})
						}
					}
				})
			}
		})
	},
	toDto: function (list) {
		if (!list) return list;
		list.forEach(function (obj) {
			if (obj.HEADURL) {
				obj.HEADURL = util.setStaticUrl(obj.HEADURL);
			}
			if (obj.CREATETIME) {
				obj.CREATETIME = util.formatDate(new Date(obj.CREATETIME));
			}
		});
		return list;
	},
	tabClick: function (e) {
    if (e.currentTarget.id == 1) {
      util.sendRequest("wechat/applet/expert/api/getExpertList", {}, "POST", true, (res) => {
        if (res.hasErrors) {
          console.log(res.errorMessage);
          return false;
        }
        console.log(res)
        res.data.forEach(item => {
          item.headurl = util.setStaticUrl(item.HEADURL)
        })
        this.setData({
          ex_list: res.data
        })
      })
    }
		this.setData({
			activeIndex: e.currentTarget.id
		});
	},
  topay: function (e) {
    console.log(e)
  },
  toPay:function (e) {
    console.log(e)
    util.ldqCheckLogin()
    var userInfo = wx.getStorageSync('userInfo')
    if (userInfo.ROLE_ID != "sja4gc59bg") {
      wx.showModal({
        content: '该功能只有学生可以使用',
        showCancel: false,
        success: function (res) {
          if (res.confirm) {
          }
        }
      })
      return false
    }
    var id = e.currentTarget.id
    util.navigateTo("/pages/teacher/introduce/introduce", { id: id, headurl: e.currentTarget.dataset.headurl, nickname: e.currentTarget.dataset.nickname })
  },
  showInput: function () {
    this.setData({
      inputShowed: true
    });
  },
  hideInput: function () {
    var that = this;
    var result = that.data.result;
    result.forEach(function (element) {
      element.checked = false;
    })
    that.setData({
      result: result,
      inputVal: "",
      inputShowed: false
    })
  },
  clearInput: function () {
    var that = this;
    var result = that.data.result;
    result.forEach(function (element) {
      element.checked = false;
    })
    that.setData({
      result: result,
      inputVal: "",
      inputShowed: false
    })
  },
  inputTyping: function (e) {
    var that = this;
    this.setData({
      inputVal: e.detail.value
    });
    var result = that.data.result;
    for (var i = 0; i < result.length; i++) {
      if (result[i].CONTENT.indexOf(that.data.inputVal) >= 0) {
        result[i].checked = false;
      }
      else {
        result[i].checked = true;
      }
    }

    that.setData({
      result: result
    });
  },
  // order:function(){
  //   utils.navigateTo("/pages/teacher/content/content")
  // },
  issue:function(e){
    var id = e.currentTarget.id;
		util.navigateTo("/pages/teacher/issue_content/issue_content", { ASKS_ANSWERS_ID:id})
  },
  quiz:function(){
		var userInfo = wx.getStorageSync('userInfo')
		if (!userInfo.VIP) {
			wx.showModal({
				content: '该功能仅限会员使用',
				showCancel: false,
				success: function (res) {
					if (res.confirm) {
						util.navigateTo("/pages/person/improve/improve", { id: '3', user_id: userInfo.USER_ID })
					}
				}
			})
			return false
		}
		if (this.data.role != 'sja4gc59bg'){
			util.showError("仅有学生身份才能提问！")
		}else{
			util.navigateTo("/pages/teacher/ask/ask")
		}
  },
  expertContent:function(e){
    var id = e.currentTarget.id;
    util.navigateTo("/pages/teacher/introduce/introduce",{id:id})
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
    var that = this;
    // util.sendRequest("/wechat/applet/expert/api/expert_home", {}, "POST", false, function (res) {
    //   that.setData({
    //     result: that.toDto(res.data)
    //   })
    // });
    // util.sendRequest("wechat/applet/expert/api/all_experts", {}, "POST", false, function (res) {
    //   that.setData({
    //     experts:that.toDto(res.data)
    //   })
    // })
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