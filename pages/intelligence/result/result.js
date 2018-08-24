// pages/intelligence/content/content.js
var util = require('../../../utils/util.js');
// var sliderWidth = 96;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    listchong: [],
    listwen: [],
    listbao: [],
		datause: [],
		EXAMSCORE: '',
    MAJORTYPE:"",
    ARRANGMENT_ID:"",
    MAJORTYPE_VALUE:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
		// console.log('run')
    var that = this;
		var userInfo = wx.getStorageSync('userInfo')
		// console.log(options)
		this.setData({
			EXAMSCORE: userInfo.EXAMSCORE,
			MAJORTYPE: userInfo.MAJORTYPE,
			ARRANGMENT_ID: options.ARRANGMENT_ID,
			MAJORTYPE_VALUE: userInfo.MAJORTYPE_VALUE,
			options: options
		})
		util.sendRequest("/wechat/applet/report/reporting_onekey", options, "POST", true, function (res) {
			if (res.hasErrors) {
				console.log(res.errorMessage);
				return false;
			}
			// console.log(res)
			if (res.data == '222' || res.data == '333') {
				util.showError("所选批次与分数不符")
				return false
			}
			if (res.data == '000') {
				util.showError("您的分数有误")
				return false
			}
			if (!res.listbao.length && !res.listchong.length && !res.listwen.length) {
				util.showError("无匹配数据, 请重新选择条件")
				return false
			}
			that.setData({
				listchong: res.listchong,
				listwen: res.listwen,
				listbao: res.listbao,
				datause: res.datause,
				MAJOR: res.datause.MAJOR,
				number: 0
			})
			// console.log(that.data.MAJOR)
		})
  },
	changeSchool: function () {
		var that = this
		this.data.number += 1
		if (this.data.number > 2) {
			this.data.number = 0
		}
		this.data.options.NUMBER = this.data.number
		// console.log(this.data.options)
		util.sendRequest("/wechat/applet/report/reporting_onekey", this.data.options, "POST", true, function (res) {
			// console.log(res)
			that.setData({
				listchong: res.listchong,
				listwen: res.listwen,
				listbao: res.listbao
			})
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

  },
  toDail:function(e){
    var that = this;
    var curId = e.currentTarget.id;
    var major = e.currentTarget.dataset.id;
    var img = e.currentTarget.dataset.name;
    var advice = e.currentTarget.dataset.class;
    var majors= "";
    var majorName = "";
		console.log(this.data.datause)
		wx.setStorageSync('datause', this.data.datause);
		// return false
    // for(var i=0; i<major.length; i++){
    //   majors += major[i].MAJOR_ID + ',';
    //   majorName += major[i].MJNAME + ','
    // }
    // if (majors != "") {
    //   majors = majors.substring(0, majors.length - 1);
    //   majorName = majorName.substring(0, majorName.length - 1);
    // }
		var data = {
			SCHOOL_ID: curId,
			MAJORTYPE: that.data.MAJORTYPE,
			// major: majors,
			// majorName: majorName,
			ARRANGMENT_ID: that.data.ARRANGMENT_ID,
			MAJORTYPE_VALUE: that.data.MAJORTYPE_VALUE,
			img: img,
			advice: advice
		}
		console.log(data)
		// return false
    util.navigateTo("/pages/intelligence/result/content/content", data);
  }
})