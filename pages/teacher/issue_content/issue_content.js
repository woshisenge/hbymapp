// pages/teacher/issue_content/issue_content.js
var utils = require('../../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hidden:true,
		list: '',
		text: ''
  },
  introduce:function(e){
    var id = e.currentTarget.id;
    utils.navigateTo("/pages/teacher/introduce/introduce",{id:id})
  },
  answer:function(){
    utils.navigateTo("/pages/teacher/answer/answer",{id:this.data.id})
  },
  toDto: function (list) {
    if (!list) return list;
    list.forEach(function (obj) {
      if (obj.HEADURL) {
        obj.HEADURL = utils.setStaticUrl(obj.HEADURL);
      }
      if (obj.CREATETIME) {
        obj.CREATETIME = utils.formatDate(new Date(obj.CREATETIME));
      }
    });
    return list;
  },
  // 修改回答
  modify:function(){
    const data={
      ASKS_ANSWERS_ID: this.data.list[this.data.list.length - 1].ASKS_ANSWERS_ID,
      ANSWER_ID: this.data.list[this.data.list.length - 1].ANSWER_ID,
      STU_ID: this.data.list[this.data.list.length - 1].STU_ID,
      ANSWER_CONTENT:'测试错误',
    }
    console.log(data)
    console.log(this.data.list)
    // return false;
    utils.sendRequest("/plant/expert/api/updatepro_answer", data, "POST", true, (res) => {
      console.log(res)
      if (res.hasErrors) {
        console.log(res.errorMessage);
        return false;
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
	onLoad: function (options) {
		var userInfo = wx.getStorageSync('userInfo')
		console.log(userInfo)
		utils.sendRequest("wechat/applet/expert/api/getOneAll", options, "POST", true, (res) => {
      console.log(res)
			if (res.hasErrors) {
				console.log(res.errorMessage);
				return false;
			}
			res.data.forEach(item => {
				item.HEADURL_PRO = utils.setStaticUrl(item.HEADURL_PRO)
				item.HEADURL_STU = utils.setStaticUrl(item.HEADURL_STU)
			})
			console.log(res.data)
			this.setData({
				list: res.data,
				userId: userInfo.USER_ID,
				vip: userInfo.VIP,
				role: userInfo.ROLE_ID,
				nickname: userInfo.NICKNAME,
				headurl: userInfo.HEADURL,
				id: options.ASKS_ANSWERS_ID
			})
		})
		// return false
    // var that = this;
    // utils.sendRequest("/wechat/applet/user/getrole", {}, "POST", false, function (res) {
    //   var hidden = that.data.hidden;
    //   if (res.data == 3) {
    //     hidden = false
    //   }
    //   that.setData({
    //     hidden: hidden
    //   })
    // })
    // utils.sendRequest("/wechat/applet/expert/api/forumbyid",{ASK_ID:options.id},"POST",false,function(res){
    //   that.setData({
    //     ask:that.toDto(res.ask),
    //     answer:that.toDto(res.answers)
    //   })
    // })
    // that.setData({
    //   id:options.id,
    //   options:options
    // })
  },
	bindContent: function (e) {
		this.setData({
			text: e.detail.value
		})
	},
	postQuestionAgain: function () {
		var that = this
		if (this.data.text == '') {
			wx.showModal({
				content: '问题不得为空',
				showCancel: false,
				success: function (res) {
					if (res.confirm) {
					}
				}
			})
			return false
		}
		if (this.data.text.length > 255) {
			wx.showModal({
				content: '长度不得超过255字符',
				showCancel: false,
				success: function (res) {
					if (res.confirm) {
					}
				}
			})
			return false
		}
		var data = {
			ASK_CONTENT: this.data.text,
			CODE: this.data.list[this.data.list.length - 1].CODE + 1,
			FATHER_ID: this.data.id,
			HEADURL_STU: this.data.headurl,
			NICKNAME_STU: this.data.nickname
		}
		utils.sendRequest("wechat/applet/expert/api/stu_ask_pro", data, "POST", true, (res) => {
			if (res.hasErrors) {
				console.log(res.errorMessage);
				return false;
			}
			if (res.data == 10010) {
				wx.showModal({
					content: '追问成功',
					showCancel: false,
					success: function (res) {
						if (res.confirm) {
							utils.sendRequest("wechat/applet/expert/api/getOneAll", { ASKS_ANSWERS_ID: data.FATHER_ID}, "POST", true, (res) => {
								if (res.hasErrors) {
									console.log(res.errorMessage);
									return false;
								}
								res.data.forEach(item => {
									item.HEADURL_PRO = utils.setStaticUrl(item.HEADURL_PRO)
									item.HEADURL_STU = utils.setStaticUrl(item.HEADURL_STU)
								})
								that.setData({
									list: res.data,
								})
							})
						}
					}
				})
			}
		})
	},
	postAnswerAgain: function () {
		var that = this
		if (this.data.text == '') {
			wx.showModal({
				content: '问题不得为空',
				showCancel: false,
				success: function (res) {
					if (res.confirm) {
					}
				}
			})
			return false
		}
		if (this.data.text.length > 255) {
			wx.showModal({
				content: '长度不得超过255字符',
				showCancel: false,
				success: function (res) {
					if (res.confirm) {
					}
				}
			})
			return false
		}
		var data = {
			ANSWER_CONTENT: this.data.text,
			NICKNAME_PRO: this.data.nickname,
			HEADURL_PRO: this.data.headurl,
			ASKS_ANSWERS_ID: this.data.list[this.data.list.length - 1].ASKS_ANSWERS_ID,
			CODE: this.data.list[this.data.list.length - 1].CODE
		}
		utils.sendRequest("wechat/applet/expert/api/pro_answer_stu", data, "POST", true, (res) => {
			if (res.hasErrors) {
				console.log(res.errorMessage);
				return false;
			}
			console.log(res)
			if (res.data == 10011) {
				wx.showModal({
					content: '追答成功',
					showCancel: false,
					success: function (res) {
						if (res.confirm) {
							utils.sendRequest("wechat/applet/expert/api/getOneAll", { ASKS_ANSWERS_ID: that.data.id }, "POST", true, (res) => {
								if (res.hasErrors) {
									console.log(res.errorMessage);
									return false;
								}
								res.data.forEach(item => {
									item.HEADURL_PRO = utils.setStaticUrl(item.HEADURL_PRO)
									item.HEADURL_STU = utils.setStaticUrl(item.HEADURL_STU)
								})
								that.setData({
									list: res.data,
								})
							})
						}
					}
				})
			}
		})
	},
  answerDelete:function(e){
    var that = this;
    var id = e.currentTarget.id;
    var options = that.data.options;
    wx.showModal({
      title: '提示',
      content: '确认是否删除？',
      success: function (res) {
        if (res.confirm) {
          utils.sendRequest("wechat/applet/expert/api/del_answer", { ANSWER_ID: id }, "POST", false, function (res) {
            if (res.data == "删除成功") {
              utils.showSuccess();
              that.onShow()
            }
          })
        }
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
  onShareAppMessage: utils.gdForward
})