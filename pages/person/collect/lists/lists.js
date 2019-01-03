var util = require('../../../../utils/util')
Page({
	data: {
		majors: [],
		anyChecked: false,
		buttonClicked: false,
		strRes: "",
		strResId: "",
		hidden: false
	},

	/**
   * 生命周期函数--监听页面加载
   */
	onLoad: function () {
		var thisMajors = wx.getStorageSync('thisMajors').MAJORS
		console.log(thisMajors)
		for (var i = 0; i < thisMajors.length; i++) {
			thisMajors[i].checked = false
		}
		this.setData({
			majors: thisMajors
		})
	},

	serviceValChange: function (e) {
		var that = this;
		var strRes = "";
		var strResId = "";
		var majors = this.data.majors;
		var checkArr = e.detail.value;
		if (checkArr.length > 0 && checkArr[checkArr.length - 1] == "-1") {
			this.noneSelected();
			return false;
		}
		for (var i = 0; i < majors.length; i++) {
			if (checkArr.indexOf(i + "") != -1) {
				majors[i].checked = true;
				strRes += majors[i].MAJORNAME + ",";
				strResId += majors[i].MAJOR_ID + ",";
			} else {
				majors[i].checked = false;
			}
		}
		if (strRes != "") strRes = strRes.substring(0, strRes.length - 1);
		if (strResId != "") strResId = strResId.substring(0, strResId.length - 1);
		that.setData({
			strRes: strRes,
			strResId: strResId,
			majors: majors,
			anyChecked: false
		})

	},
	confirm: function () {
		var that = this;
		var pages = getCurrentPages();
		var prevPage = pages[pages.length - 2];  //上一个页面

		prevPage.data["schools"] = that.data.strRes;
		prevPage.data["schoolsid"] = that.data.strResId;
		prevPage.setData(prevPage.data);
		wx.navigateBack({
			delta: 1,
		})
	},
  onShareAppMessage: util.gdForward
})