// pages/intelligence/intelligence.js
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    batch: [{ DIC_ID: 'hjj4e5vr0c', NAME: '本一' }, { DIC_ID: 'bdhsl11qtb', NAME: '本二' }],
    index:0,
    provinces: "",
    subjecttypes: "",
    properties: "",
    majors: "",
    provinces_id: "",
    subjecttypes_id: "",
    properties_id: "",
    majors_id: "",
    examinee: {},
    arrangment_id: "hjj4e5vr0c",
    MAJORTYPE:"",
    MAJORTYPE_VALUE:"",
    EXAMSCORE:"0",
		MAJORTYPE_VALUE: '',
		EXAMAREA_VALUE: '',
		CITY_VALUE: '',
		    //banner图
    consultation: util.setStaticUrl("/static/ymplant/img/sye/banner/recommendation.png"),
  },
  bindPickerChange: function (e) {
    var that = this;
    this.setData({
      index: e.detail.value
    });
    this.setData({
      arrangment_id: that.data.batch[e.detail.value].DIC_ID
    });
  },
  result:function(){
    var that = this;
		var data = {
			MAJOR: that.data.majors_id,
			PROVINCE: that.data.provinces_id,
			SUBJECTTYPE: that.data.subjecttypes_id,
			SCPROPERTY: that.data.properties_id,
			ARRANGMENT_ID: that.data.arrangment_id,
			MAJORTYPE: that.data.MAJORTYPE,
			MAJORTYPE_VALUE: that.data.MAJORTYPE_VALUE,
			EXAMSCORE: that.data.EXAMSCORE
		}
    util.navigateTo("/pages/intelligence/result/result", data);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
		var userInfo = wx.getStorageSync('userInfo')
		// console.log(userInfo)
		this.setData({
			EXAMSCORE: userInfo.EXAMSCORE,
			MAJORTYPE_VALUE: userInfo. MAJORTYPE_VALUE,
			EXAMAREA_VALUE: userInfo.EXAMAREA_VALUE,
			CITY_VALUE: userInfo.CITY_VALUE,
		})
		// 城市
    util.sendRequest('/wechat/applet/dictionary/get', { code: 'PROVINCE' }, 'POST', false, function (res) {
			// console.log(res)
      that.setData({
        // region: res.data
      })
    })
		// 类型
		util.sendRequest('/wechat/applet/dictionary/get', { code: 'SUBJECTTYPE' }, 'POST', false, function (res) {
			// console.log(res)
      that.setData({
        // style: res.data
      })
    })
		// 属性
		util.sendRequest('/wechat/applet/dictionary/get', { code: 'SCPROPERTY' }, 'POST', false, function (res) {
			// console.log(res)
      that.setData({
        // types: res.data
      })
    });
    
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
  toProvince: function() {
    var that = this;
    util.navigateTo("../../../../intelligence/region/region", { provinces: that.data.provinces_id});
  },
  toSubjecttype: function() {
    var that = this;
    util.navigateTo("../../../../intelligence/mold/mold", {subjecttypes: that.data.subjecttypes_id});
  },
  toProperties: function() {
    var that = this;
    util.navigateTo("../../../../intelligence/attribute/attribute", { properties: that.data.properties_id });
  },
  toMajors: function() {
    var that = this;
    util.navigateTo("../../../../intelligence/major/major", { majors: that.data.majors_id, arrangment: that.data.arrangment_id });
  },
  toExaminee: function () {
    util.navigateTo("/pages/person/information/information");
  }
})