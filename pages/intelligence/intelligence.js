// pages/intelligence/intelligence.js
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    batch: [{ DIC_ID: 'hjj4e5vr0c', NAME: '本一' }, { DIC_ID: 'bdhsl11qtb', NAME: '本二' }],
    index:0,
    provinces: "河北省",
    subjecttypes: "",
    properties: "",
    majors: "",
		provinces_id: "province3",
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
    showDialog: false,
		    //banner图
    consultation: util.setStaticUrl("/static/ymplant/ldq-img/wx_banner03.jpg"),
    //转发图
    imageUrl1: util.setStaticUrl("/static/ymplant/ldq-img/zhuanfa01.jpg"),
    imageUrl2: util.setStaticUrl("/static/ymplant/ldq-img/zhuanfa02.jpg"),
    imageUrl3: util.setStaticUrl("/static/ymplant/ldq-img/zhuanfa03.jpg"),
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
    // 判断是否是VIP，有没有使用次数
    var that=this;
    var userInfo = wx.getStorageSync('userInfo')
    if (!userInfo.VIP && userInfo.SHAREGETVIP_COUNT <= 0) {
      that.toggleDialog()
			return false
		}
    if (userInfo.ROLE_ID != 'sja4gc59bg') {
      utils.showError("该功能只有学生可以使用"); 
      return false
    }
    if ((!this.data.provinces_id && !this.data.subjecttypes_id) || this.data.provinces_id.split(',').length > 3 || this.data.subjecttypes_id.split(',').length > 2 ) { 
      util.showError("请选择 1 - 3 个城市")
      return false
     }
		// if (!this.data.provinces_id || this.data.provinces_id.split(',').length > 3) {
		// 	util.showError("请选择 1 - 3 个城市")
		// 	return false
		// }
    // if (!this.data.subjecttypes_id || this.data.subjecttypes_id.split(',').length > 2) {
    //   util.showError("请选择 1 - 2 个院校类型")
    //   return false
    // }
    userInfo.SHAREGETVIP_COUNT = userInfo.SHAREGETVIP_COUNT-1;
    wx.setStorageSync('userInfo', userInfo);
    var ls =wx.getStorageSync('userInfo');
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
		data.NUMBER = 0
		data.MAJORTYPE = userInfo.MAJORTYPE
		util.navigateTo("/pages/intelligence/result/result", data)
  },
  // 自定义弹窗
  toggleDialog() {
    this.setData({
      showDialog: !this.data.showDialog
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // util.ldqCheckLogin()
    var that=this;
		var userInfo = wx.getStorageSync('userInfo')
    if (userInfo == '') {
      wx.redirectTo({
        url: '/pages/login/login'
      })
      return false
    }
		this.setData({
			EXAMSCORE: userInfo.EXAMSCORE,
			MAJORTYPE_VALUE: userInfo. MAJORTYPE_VALUE,
			EXAMAREA_VALUE: userInfo.EXAMAREA_VALUE,
			CITY_VALUE: userInfo.CITY_VALUE,
		})
		// 城市
    util.sendRequest('/wechat/applet/dictionary/get', { code: 'PROVINCE' }, 'POST', false, function (res) {
      that.setData({
        // region: res.data
      })
    })
		// 类型
		util.sendRequest('/wechat/applet/dictionary/get', { code: 'SUBJECTTYPE' }, 'POST', false, function (res) {
      that.setData({
        // style: res.data
      })
    })
		// 属性
		util.sendRequest('/wechat/applet/dictionary/get', { code: 'SCPROPERTY' }, 'POST', false, function (res) {
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
  onShareAppMessage: function (res) {
    var userInfo = wx.getStorageSync('userInfo')
    var random1 = Math.round(Math.random() * 6);
    var random2 = Math.round(Math.random() * 4);
    if (random1<=1) {
      var title = '我是高三家长！正帮孩子智能匹配理想大学和专业，快来试试吧！'
    } else if (random1 == 2) {
      var title = '我是高三家长，正和大学招办老师聊天！同学家长你也可以哟！'
    } else if (random1 == 3){
      var title = '有一种别人的家长，他们在为自己的孩子规划大学志愿！'
    } else if (random1 == 4) {
      var title = '1000多所大学在河北历年招生专业数据详情！总有你要报考的大学！'
    } else if (random1 <=5 ) {
      var title = '大学招办说——同样成绩600分，为何别人被录取，你却没考上？'
    }
    if (random2 <= 1) {
      var imageUrl = this.data.imageUrl1
    } else if (random2 == 2) {
      var imageUrl = this.data.imageUrl2
    } else if (random2 >= 3) {
      var imageUrl = this.data.imageUrl3
    }
    wx.showShareMenu({
      withShareTicket: true
    })
    return{
      title:title,
      imageUrl: imageUrl,
      path: 'pages/index/index',
      success: function (res) {
        if (res.shareTickets){
          console.log(123)
          if (userInfo.SHARECOUNT >= 3) {
            util.showError("亲！请明天再来测试吧！今日免费次数已赠送完毕！");
            return false
          }
          util.showError("成功转发到群");
          util.sendRequest('/wechat/applet/api/shareApplet', { USER_ID: userInfo.USER_ID}, "POST", true,   function(res){
            wx.setStorageSync('userInfo', res)
            if (res.hasErrors) {
              console.log(res.errorMessage)
              return false
            }
          })
        }else{
          util.showError("请转发至群");
        }
      } 
    }
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