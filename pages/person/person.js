// pages/person/person.js
var util = require('../../utils/util.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
		user_id: '',
    //用户头像
    headurl:"./img/nohead.png",
    // 姓名
		nickname: '',
		// 分数
		examscore: '',
		// 科目
		majortype: '',
		// 身份状态
		role_id: '',
		// 学校名称
		school_name: '',
		// 职位
		jobtype: '',
    //VIP
    vip:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 判断是否登录
    util.ldqCheckLogin()
		var userInfo = wx.getStorageSync('userInfo')
		console.log(userInfo)
		// console.log(userInfo)
		if (userInfo.ROLE_ID == 'sja4gc59bg') {
			this.setData({
				user_id: userInfo.USER_ID || '',
				nickname: userInfo.NICKNAME || '',
				examscore: userInfo.EXAMSCORE || '',
				majortype: userInfo.MAJORTYPE || '',
				role_id: userInfo.ROLE_ID || '',
        headurl: util.setStaticUrl(userInfo.HEADURL),
        vip: userInfo.VIP
			})
		}
		if (userInfo.ROLE_ID == 'm9bxdt9g36') {
			this.setData({
				nickname: userInfo.NICKNAME || '',
				role_id: userInfo.ROLE_ID || '',
				school_name: userInfo.SCHOOL_NAME || '',
				jobtype: userInfo.JOBTYPE || ''
			})
		}
  },
  chooseImageTap: function () {
    let _this = this;
    wx.showActionSheet({
      itemList: ['从相册中选择', '拍照'],
      // itemColor: "#f7982a",
      success: function (res) {
				if (!res.cancel) {
          if (res.tapIndex == 0) {
            _this.chooseWxImage('album')
          } else if (res.tapIndex == 1) {
            _this.chooseWxImage('camera')
          }
        }
      }
    })
  },
  chooseWxImage:function (type) {
    var that = this;
    wx.chooseImage({
      sizeType: ['compressed'],
      sourceType: [type],
      success: function (res) {
        console.log('112233',res)
        util.uploadFile("/wechat/applet/user/uploadhead", res.tempFilePaths[0], "HEADURL", {}, true, function(res){
					console.log('223344',res)
          that.getUserInfo();
        });
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
  onShow: function() {
    // this.getUserInfo();
  },
  /**
   * 获取用户基本信息
   */
  getUserInfo: function() {
    var that = this;
    util.sendRequest("/wechat/applet/user/isvip",{},"POST",false,function(res){
       that.setData({
         isVip:res.data
       })
    })
    util.sendRequest("/wechat/applet/user/getvip", {}, "POST", false, function (obj) {
      var vip = obj.DATA;
      if(vip == "UC"){
        vip = 1
      }
      else{
        vip = 0
      }
      that.setData({
        vip: vip
      })
    })
    util.sendRequest("/wechat/applet/user/getrole", {}, "POST", false, function (res)     {      
      var role=res.data
      if(role==1){
        util.sendRequest("/wechat/applet/user/basic_student", {}, "POST", false, function (obj) {
          that.setData({
            logo: util.setStaticUrl(obj.complete.HEADURL),
            region: obj.complete.EXAMAREA_VALUE ? obj.complete.EXAMAREA_VALUE : "暂无",
            subject: obj.complete.MAJORTYPE_VALUE ? obj.complete.MAJORTYPE_VALUE : "暂无",
            grade: obj.complete.EXAMSCORE ? obj.complete.EXAMSCORE : "暂无",
            nickname: obj.complete.NICKNAME ? obj.complete.NICKNAME : "暂无",
            user_id: obj.complete.USER_ID
          });
        });
      }
      if(role==2){
        util.sendRequest("/wechat/applet/user/basic_teacher", {}, "POST", false, function (obj) {

          that.setData({
            logo2: util.setStaticUrl(obj.complete.HEADURL),
            nickname2: obj.complete.NICKNAME ? obj.complete.NICKNAME : "暂无",
            scname: obj.complete.SCNAME ? obj.complete.SCNAME : "暂无",
            work: obj.complete.JOBDATE_VALUE ? obj.complete.JOBDATE_VALUE : "暂无"
          })
        })
      }
      that.setData({
        role:role
      })
    })
  },
  collection:function(){
    var that = this;
    that.setData({
      hidden: !that.data.hidden
    })
    
  },
  analog:function(e){
    var id = e.currentTarget.id
    util.navigateTo("/pages/person/collect/collect",{id:id})
  },
  intelligence:function(e){
    util.navigateTo("/pages/person/collect/collect")
  },
  single:function(e){
    var id = e.currentTarget.id
    util.navigateTo("/pages/person/improve/improve", { id: id, user_id: this.data.user_id })
  },
  group:function(e){
    var id = e.currentTarget.id
    util.navigateTo("/pages/person/improve/improve", { id: id, user_id: this.data.user_id })
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
  goods:function(){
    var that= this;
    var role = that.data.vip;
    util.navigateTo("/pages/person/goods/goods", { role: role})
  },
  power:function(){
    var that = this;
    // wx.showModal({
    //   content: '是否已经购买会员卡？',
    //   confirmText: "立即购买",
    //   cancelText: "已购买",
    //   cancelColor: "#3CC51F",
    //   success: function (res) {
    //     if (res.confirm) {
    //       util.navigateTo("/pages/person/improve/improve",{user_id:that.data.user_id})
    //     } 
    //     if (res.cancel){
    //       util.navigateTo("/pages/person/member/member")
    //     }
    //   },
    //   fail:function(){

    //   }
    // });
    var that = this;
    that.setData({
      hide: !that.data.hide
    })

  },
  toExaminee: function() {
    util.navigateTo("/pages/person/information/information");
  },
})