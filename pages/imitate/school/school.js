// pages/imitate/school/school.js
var util = require("../../../utils/util")
Page({

  /**
   * 页面的初始数据
   */
  data: {
		mySchools: [],
    school:"",
    major:"",
		schoolName: "院校（请首先选择院校，否则无法选择专业）",
		schoolId: '',
		schoolTyps: '',
    major_1_name: "",
    major_2_name: "",
    major_3_name: "",
    major_4_name: "",
    major_5_name: "",
    major_6_name: "",
    schoolId1: "",
    major_1_id: "",
    major_2_id:"",
    major_3_id:"",
    major_4_id: "",
    major_5_id: "",
    major_6_id: "",
		MJA_NAME: [],
		MJA_ID: [],
    param:{},
    schools:"",
    id:""
    },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
		// console.log(options)
    var that = this;
    that.setData({
			index: options.index,
			schoolIndex: options.schoolIndex,
			tempSchools: options.tempSchools,
      // school:options.school_id,
      // major: options.major_id,
      // schools:options.param,
      // id:options.id
    })
  },
	selMajor: function (e) {
		var that = this
		var tempArr = [this.data.major_1_id, this.data.major_2_id, this.data.major_3_id, this.data.major_4_id, this.data.major_5_id, this.data.major_6_id]
		util.navigateTo("/pages/imitate/school/major/major", {
			index: that.data.index,
			schoolId: that.data.schoolId,
			schoolType: that.data.schoolType,
			tempArr: tempArr,
			majorIndex: e.currentTarget.id
		})
	},
	goBack: function () {
		let i = 0
		if (this.data.major_1_name == "") { i++ }
		if (this.data.major_2_name == "") { i++ }
		if (this.data.major_3_name == "") { i++ }
		if (this.data.major_4_name == "") { i++ }
		if (this.data.major_5_name == "") { i++ }
		if (this.data.major_6_name == "") { i++ }
		if (i == 6) {
			wx.showModal({
				content: '专业最少填一项',
				showCancel: false,
				success: function (res) {
					if (res.confirm) {
						return false
					}
				}
			})
			return false
		}
		var pages = getCurrentPages()
		var prevPage = pages[pages.length - 2]
		prevPage.data['MJ' + this.data.schoolIndex + '_NAME'] = [this.data.major_1_name, this.data.major_2_name, this.data.major_3_name, this.data.major_4_name, this.data.major_5_name, this.data.major_6_name]
		prevPage.data['MJ' + this.data.schoolIndex + '_ID'] = [this.data.major_1_id, this.data.major_2_id, this.data.major_3_id, this.data.major_4_id, this.data.major_5_id, this.data.major_6_id]
		prevPage.data['school_b' + (Number(this.data.index) + 1) + '_name' + this.data.schoolIndex] = this.data.schoolName
		prevPage.data['school_b' + (Number(this.data.index) + 1) + '_id' + this.data.schoolIndex] = this.data.schoolId
		prevPage.setData(prevPage.data)
		wx.navigateBack({
			delta: 1
		})
	},
  school:function(e){
    var that = this;
    var index=e.currentTarget.dataset.id;
    var schools = that.data.schools;
		util.navigateTo("/pages/imitate/school/content/content", { index: index, schools: schools, id: that.data.id, mySchools: this.data.mySchools, tempSchools: this.data.tempSchools})
  },
  major:function(e){
    var that = this;
    var id = e.currentTarget.id;
    var school_id = that.data.school_1_id;
    var major_1_id = that.data.major_1_id;
    var major_2_id = that.data.major_2_id;
    var major_3_id = that.data.major_3_id;
    var major_4_id = that.data.major_4_id;
    var major_5_id = that.data.major_5_id;
    var major_6_id = that.data.major_6_id;
      util.navigateTo("/pages/imitate/school/major/major", {
				school_id: school_id,
				id: id,
				major_1_id: major_1_id,
				major_2_id: major_2_id,
				major_3_id: major_3_id,
				major_4_id: major_4_id,
				major_5_id: major_5_id,
				major_6_id: major_6_id,
				index:that.data.index
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
  back:function(){
    var that = this;
    var valueStr = that.data.school_1;
    var valurIdStr = that.data.school_1_id;
    var curId = that.data.school;
    var major = that.data.major;
    var param = "";
    for(var i = 1; i < 7; i++){
      if(that.data["major_" + i + "_id"] != ""){
        param += that.data["major_" + i + "_id"] + ",";
      }
    }

    if(param != "") {
      param = param.substring(0, param.length - 1);
      var pages = getCurrentPages();
      var prevPage = pages[pages.length - 2];  //上一个页面

      prevPage.data[curId + "_name"] = valueStr;
      prevPage.data[that.data.school + "_id"] = valurIdStr;
      prevPage.data[that.data.major + "_id"] = param;
      //直接调用上一个页面的setData()方法，把数据存到上一个页面中去

      prevPage.setData(prevPage.data);
        wx.navigateBack({
          delta: 1
        });
    }
    else{
      util.showError("专业选项不能为空！")
    }
    
  }
})