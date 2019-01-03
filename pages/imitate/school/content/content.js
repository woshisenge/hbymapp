// pages/imitate/school/content/content.js
var util=require("../../../../utils/util")
Page({

  /**
   * 页面的初始数据
   */
  data: {
  school:[],
  index:"",
  inputVal:"",
  checked:false,
  id:"",
	thisSchool: []
  },
  showInput: function () {
    this.setData({
      inputShowed: true
    });
  },
  hideInput: function () {
    this.setData({
      inputVal: "",
      inputShowed: false
    });
  },
  clearInput: function () {
    this.setData({
      inputVal: ""
    });
  },
  inputTyping: function (e) {

    var that = this;
    this.setData({
      inputVal: e.detail.value
    });
    var school = that.data.school;
    for (var i = 0; i < school.length; i++) {
      if (school[i].NAME.indexOf(that.data.inputVal) >= 0) {
        school[i].checked = false;
      }
      else {
        school[i].checked = true;
      }
    }

    that.setData({
      school: school
    });
  },
  setSearchStorage:function(){
    var that = this;
    var school = that.data.school;
    school.forEach(function(element){
      element.checked = false;
    })
    that.setData({
      school:school,
      inputVal:"",
      inputShowed:false
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
		var tempSchools = options.tempSchools.split(',')
		this.setData({
			mySchools: options.mySchools,
			index: options.index,
			id: options.id,
			schools: options.schools,
		})
		util.sendRequest("/wechat/applet/report/getonekey_collection_wechat", {}, "POST", true, (res) => {
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
				return false;
			}
			if (res.data == 10003) {
				console.log('出现异常, 抓取数据失败, 请联系后端')
				return false
			}
			var schoolsB1 = []
			var schoolsB2 = []
			res.data[0].list_c1.forEach(item => {
				schoolsB1.push(item)
			})
			res.data[0].list_w1.forEach(item => {
				schoolsB1.push(item)
			})
			res.data[0].list_b1.forEach(item => {
				schoolsB1.push(item)
			})
			res.data[1].list_c2.forEach(item => {
				schoolsB2.push(item)
			})
			res.data[1].list_w2.forEach(item => {
				schoolsB2.push(item)
			})
			res.data[1].list_b2.forEach(item => {
				schoolsB2.push(item)
			})
			if (options.index == 0) {
				for (var i = 0; i < schoolsB1.length; i++) {
					for (var j = 0; j < tempSchools.length; j++) {
						if (tempSchools[j] == schoolsB1[i].SCHOOLNAME) {
							schoolsB1[i].checked = true
						}
					}
				}
				this.setData({
					school: schoolsB1
				})
			} else if (options.index == 1) {
				console.log(tempSchools)
				for (var i = 0; i < schoolsB2.length; i++) {
					for (var j = 0; j < tempSchools.length; j++) {
						if (tempSchools[j] == schoolsB2[i].SCHOOLNAME) {
							schoolsB2[i].checked = true
						}
					}
				}
				this.setData({
					school: schoolsB2
				})
			}
		})
  },
  school:function(e){
    var that = this;
    var schoolId = e.currentTarget.id;
		var schoolName = ''
		var schoolType = ''
		this.data.school.forEach(school => {
			if (schoolId == school.SCHOOL_ID) {
				schoolName = school.SCHOOLNAME
				schoolType = school.REPORT_TYPE
			}
		})
		var pages = getCurrentPages()
		var prevPage = pages[pages.length - 2]
		prevPage.data.schoolId = schoolId
		prevPage.data.schoolName = schoolName
		prevPage.data.schoolType = schoolType
		prevPage.data.major_1_name = ""
		prevPage.data.major_2_name = ""
		prevPage.data.major_3_name = ""
		prevPage.data.major_4_name = ""
		prevPage.data.major_5_name = ""
		prevPage.data.major_6_name = ""
		prevPage.setData(prevPage.data)
		wx.navigateBack({
			delta: 1
		});
		return 
    that.setData({
      school:school
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
  onShareAppMessage: util.gdForward
})