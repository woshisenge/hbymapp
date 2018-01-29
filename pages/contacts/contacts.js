// pages/contacts/contacts.js
var sliderWidth = 96; 
var util=require("../../utils/util")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    role: 0,
    inputShowed: false,
    inputVal: "",
    checked:false
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
    this.setData({
      inputVal: e.detail.value
    });
    var that = this;
    var teacher = that.data.teacher;
    for (var i = 0; i < teacher.length; i++) {
      if (teacher[i].school.NAME.indexOf(that.data.inputVal) >= 0) {
        teacher[i].checked = false;
      }
      else {
        teacher[i].checked = true;
      }
    }

    that.setData({
      teacher: teacher
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  setSearchStorage:function(){
    
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },
  toDto: function (list) {
    if (!list) return list;
    list.forEach(function (obj) {
      if (obj.HEADURL) {
        obj.HEADURL = util.setStaticUrl(obj.HEADURL);
      }
      if (obj.LHEADURL) {
        obj.LHEADURL = util.setStaticUrl(obj.LHEADURL);
      }
      if (obj.TEAHEADURL) {
        obj.TEAHEADURL = util.setStaticUrl(obj.TEAHEADURL);
      }
      if (obj.CREATETIME) {
        obj.CREATETIME = util.formatDate(new Date(obj.CREATETIME));
      }
    });
    return list;
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that=this
    util.sendRequest("/wechat/applet/user/getrole",{},"POST",true,function(role){
      util.sendRequest("/wechat/applet/chat/getcontactors", {}, "POST", true, function (res) {
        console.log(res)
        console.log(res.teachers)
        var teacher = res.teachers;
        res.teachers.forEach(function(element){
          element.timeList.forEach(function(obj){
            obj.CREATETIME = util.formatTime(new Date(obj.CREATETIME))
          })
        })
        that.setData({
          teacher:that.toDto(teacher),
          student: that.toDto(res.students),
          expecter: that.toDto(res.expecters)
        })
      })
      that.setData({
        role: role.data
      });
    })
    
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
  toChat: function(e) {
    var id = e.currentTarget.id;
    util.navigateTo("/pages/chatroom/chatroom", {user_id: id});
  }
})