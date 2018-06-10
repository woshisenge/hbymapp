// pages/person/collect/collect.js
var util = require('../../../utils/util')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    checked: false,
    b1: true,
    b2: false
  },
  b1: function (e) {
    var that = this;
    var parm = {};
    var ARR = e.currentTarget.id;
    parm.ARR = ARR;
    this.setData({
      b2: false,
      b1: true
    })
    
    // b1
    util.sendRequest("/wechat/applet/report/wxgetcollection_znb1orb2", parm , "POST", true, function (res) {
      console.log(res)
      for (var i = 0; i < res.data.length; i++) {
        var listchong = res.data[0];
        var listwen = res.data[1];
        var listbao = res.data[2];
        var listdian = res.data[3];
      }
      var results = [];
      res.data.forEach(function (element) {
        element.forEach(function (obj) {
          results.push(obj)
        })
      })
      that.setData({
        results: results,
        listchong: that.toDto(listchong),
        listwen: that.toDto(listwen),
        listbao: that.toDto(listbao),
        listdian: that.toDto(listdian)
      })
    });
  },

  b2: function (e) {
    var that = this;
    var parm1 = {};
    var ARR = e.currentTarget.id;
    console.log(ARR)
    parm1.ARR= ARR;
    this.setData({
      b1: false,
      b2: true
    })
      ,
      // b2
      util.sendRequest("/wechat/applet/report/wxgetcollection_znb1orb2", parm1, "POST", true, function (res) {
        console.log(res)
        for (var i = 0; i < res.data.length; i++) {
          var listchong = res.data[0];
          var listwen = res.data[1];
          var listbao = res.data[2];
          var listdian = res.data[3];
        }
        var results = [];
        res.data.forEach(function (element) {
          element.forEach(function (obj) {
            results.push(obj)
          })
        })
        that.setData({
          results: results,
          listchong: that.toDto(listchong),
          listwen: that.toDto(listwen),
          listbao: that.toDto(listbao),
          listdian: that.toDto(listdian)
        })
      });


  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.setData({
      id: options.id,
   
    })

    util.sendRequest("/wechat/applet/report/wxgetcollection_zn",{},"POST",true,function(res){
      for(var i = 0; i < res.data.length; i++){
        var listchong = res.data[0];
        var listwen = res.data[1];
        var listbao = res.data[2];
        var listdian = res.data[3];
      }
      var results = [];
      res.data.forEach(function(element){
        element.forEach(function(obj){
          results.push(obj)
        })
      })
      that.setData({
        results:results,
        listchong: that.toDto(listchong),
        listwen:that.toDto(listwen),
        listbao:that.toDto(listbao),
        listdian:that.toDto(listdian)
      })
    });

    util.sendRequest("/wechat/applet/report/wxgetcollection_mn",{},"POST",true,function(res){
      var result = res.data
      for(var i = 0; i < result.length; i++){
        if(i % 4 == 0){
          result[i].style = "Bgcolor1"
        }
        if (i % 4 == 1) {
          result[i].style = "Bgcolor2"
        }
        if (i % 4 == 2) {
          result[i].style = "Bgcolor3"
        }
        if (i % 4 == 3) {
          result[i].style = "Bgcolor4"
        }

      }
      that.setData({
        result:that.toDto(result)
      })
    })
  },
  toDto: function (list) {
    if (!list) return list;
    list.forEach(function (obj) {
      if (obj.COLLECTION_DATE) {
        obj.COLLECTION_DATE = util.formatDate(new Date(obj.COLLECTION_DATE));
      }
    });
    return list;
  },
  // b1


  showMn:function(e){
    var that= this;
    var result = that.data.result;
    var curId = e.currentTarget.id
    result.forEach(function (element) {
      if (element.MNCOLL_ID == curId) {
        if (element.checked)
          element.checked = false;
        else
          element.checked = true;
      }
    });
    that.setData({
      result: result
    })
  },
  deleteMn:function(e){
    var that = this;
    var id = e.currentTarget.id; 
    wx.showModal({
      title: '提示',
      content: '是否确定删除？',
      success: function (res) {
        if (res.confirm) {
          util.sendRequest("/wechat/applet/report/delet_mntbcollection", { MNCOLL_ID: id }, "POST", true, function (res) {
            util.showSuccess();
            var options = {};
            options.id = that.data.id;
            that.onLoad(options)

          })
        }
      }
    })
  },
  showChong:function(e){
    var that = this;
    var result = that.data.listchong;
    var curId = e.currentTarget.id;
    result.forEach(function (element) {
      if (element.COLL_ID == curId) {
        if (element.checked)
          element.checked = false;
        else
          element.checked = true;
      }
    });
    that.setData({
      listchong: result
    })
  },
  showWen:function(e){
    var that = this;
    var result = that.data.listwen;
    var curId = e.currentTarget.id;
    result.forEach(function (element) {
      if (element.COLL_ID == curId) {
        if (element.checked)
          element.checked = false;
        else
          element.checked = true;
      }
    });
    that.setData({
      listwen: result
    })
  },
  showBao: function (e) {
    var that = this;
    var result = that.data.listbao;
    var curId = e.currentTarget.id;
    result.forEach(function (element) {
      if (element.COLL_ID == curId) {
        if (element.checked)
          element.checked = false;
        else
          element.checked = true;
      }
    });
    that.setData({
      listbao: result
    })
  },
  showDian: function (e) {
    var that = this;
    var result = that.data.listdian;
    var curId = e.currentTarget.id;
    result.forEach(function (element) {
      if (element.COLL_ID == curId) {
        if (element.checked)
          element.checked = false;
        else
          element.checked = true;
      }
    });
    that.setData({
      listdian: result
    })
  },
  delet:function(e){
    var that =this;
    var id = e.currentTarget.id;
    wx.showModal({
      title: '提示',
      content: '是否确定删除？',
      success: function (res) {
        if (res.confirm) {
          util.sendRequest("/wechat/applet/report/delet_zntjcollection", { COLL_ID: id }, "POST", false, function (res) {
            util.showSuccess();
            var options = {};
            options.id = that.data.id;
            that.onLoad(options)
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
  onShareAppMessage: function () {
  
  }
})