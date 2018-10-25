// pages/character/test/test.js
var util = require('../../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    src: util.setStaticUrl("/static/ymplant/ldq-img/gd_test.jpg"),
    title: '',
    stitle: '',
    MBTI_TYPE: '',
    curr_title: '',
    curr_A: '',
    curr_B: '',
    curr_id:''
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.id == 1) {
      this.setData({
        title: '简单版',
        stitle: 'simple',
        MBTI_TYPE: 'g57h70o2c8'
      })
    } else if (options.id == 2) {
      this.setData({
        title: '专业版',
        stitle: 'pro',
        MBTI_TYPE: '1tt3euq8ij',
      })
    }
    // 获取问题
    this.getQuestion(1)
  },
  submit: function (e) {
    // 传回答案
    const data = {
      ANSWER: e.currentTarget.dataset.msg,
      MBTI_ID: this.data.curr_id,
      MBTI_TYPE: this.data.MBTI_TYPE
    }
    util.sendRequest("/plant/character/api/simple_answer", data, "POST", true, (res) => {
      if (res.hasErrors) {
        console.log(res.errorMessage);
        return false;
      }
      // 获取问题
      this.getQuestion(res.data)
    })
  },
  getQuestion: function (curr) {
    // 获取问题
    const data = {
      MBTI_ID: curr,
      MBTI_TYPE: this.data.MBTI_TYPE
    }
    util.sendRequest("/plant/character/api/simple_begin", data, "POST", false, (res) => {
      if (res.hasErrors) {
        console.log(res.errorMessage);
        return false;
      }
      console.log(res)
      if (res.data == '答题完毕等结果') {
        util.sendRequest("/plant/character/api/get_result", {}, "POST", false, (res) => {
          if (res.hasErrors) {
            console.log(res.errorMessage);
            return false;
          }
          console.log(res)
          var arr1 = []
          var arr2 = []
          res.ZMAJORSOUT.forEach(item => {
            item.forEach(it => {
              arr1.push(it.NAME)
            })
          })
          res.BMAJORSOUT.forEach(item => {
            item.forEach(it => {
              arr2.push(it.NAME)
            })
          })
          this.setData({
            test_title: res.RESULTOBJ,
            test1: res.RESULTDATAMAP.INTRODUCE,
            test2: res.RESULTDATAMAP.FIELD,
            test3: res.RESULTDATAMAP.JOB,
            test4: arr1.join('、'),
            test5: arr2.join('、'),
            finish: true
          })
          if (this.data.MBTI_TYPE == "1tt3euq8ij") {
            this.setData({
              // 学习风格
              STUDY: res.RESULTDATAMAP.STUDY,
              // 解决问题的方式
              SOLVE: res.RESULTDATAMAP.SOLVE,
              // 发展建议
              PROPOSAL: res.RESULTDATAMAP.PROPOSAL,
              // 管理风格
              LEADERSHIP: res.RESULTDATAMAP.LEADERSHIP,
              // 适合的工作环境
              ENVIRONMENT: res.RESULTDATAMAP.ENVIRONMENT,
              // 团队中的表现
              CONTRIBUTION: res.RESULTDATAMAP.CONTRIBUTION,
              // 潜在缺点
              BLEMISH: res.RESULTDATAMAP.BLEMISH
            })
          }
        })
        return false
      }
      this.setData({
        curr_title: res.TITLE,
        curr_A: res.OPTION_A,
        curr_B: res.OPTION_B,
        curr_id: res.MBTI_ID,
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
  
  }
})