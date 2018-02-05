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
    checked:false,
    s_teacher:[],
    s_student:[]
  },
  showInput: function () {
    this.setData({
      inputShowed: true
    });
  },
  hideInput: function () {
    var that = this;
    var teacher = that.data.teacher;
    var student = that.data.student;
    teacher.forEach(function(element){
      element.checked = false;
    })
    student.forEach(function (element) {
      element.checked = false;
    })
    that.setData({
      inputVal: "",
      inputShowed: false,
      teacher:teacher,
      student:student
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
    var student = that.data.student;
    for (var i = 0; i < student.length; i++) {
      if (student[i].school.NAME.indexOf(that.data.inputVal) >= 0) {
        student[i].checked = false;
      }
      else {
        student[i].checked = true;
      }
    }
    that.setData({
      teacher: teacher,
      student: student
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
    var that = this
    util.sendRequest("/wechat/applet/user/getrole", {}, "POST", true, function (role) {
      util.sendRequest("/wechat/applet/chat/getcontactors", {}, "POST", true, function (res) {
        var teacher = res.teachers;
        if (teacher) {
          teacher.forEach(function (element) {
            if (element.timeList) {
              element.timeList.forEach(function (obj) {
                obj.CREATETIME = util.formatTime(new Date(obj.CREATETIME))
              })
            }
          })
        }
        var student = res.students;
        if (student) {
          student.forEach(function (element) {
            if (element.timeList) {
              element.timeList.forEach(function (obj) {
                obj.CREATETIME = util.formatTime(new Date(obj.CREATETIME))
              })
            }
          })
        }
        that.setData({
          teacher: that.toDto(teacher),
          student: that.toDto(student)
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