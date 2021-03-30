// pages/index/mv/mv.js
import { get_mv_recommend, get_M_S } from '../../../api/index'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        list: [],
        limit: 30,
        offset: 0,
        count: null
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        get_mv_recommend(this.data.limit).then(res => {
            let data = res.data
            if (data.code = 200) {
                let list = data.data;
                this.setData({
                    list: list,
                    count: data.count,
                    offset:list.length
                })
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
        // wx.startPullDownRefresh({
        //     success(){
                
        //     }
        // });
        get_mv_recommend(this.data.limit).then(res => {
            let data = res.data
            if (data.code = 200) {
                let list = data.data;
                this.setData({
                    list: list,
                    count: data.count,
                    offset:list.length
                })
                wx.stopPullDownRefresh({
                    success(){
                        wx.showToast({
                            title: '已刷新',
                            icon: 'success',
                            duration: 2000
                          })
                    }
                })
            }else{
                wx.stopPullDownRefresh({
                    success(){
                        wx.showToast({
                            title: '刷新失败',
                            icon: 'warn',
                            duration: 2000
                          })
                    }
                })
            }
        })
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
        if (this.data.offset <= this.data.count) {
            get_mv_recommend(this.data.limit, this.data.offset).then(res => {
                let data = res.data
                if (data.code === 200) {
                    let list = [...this.data.list, ...data.data];
                    this.setData({
                        list: list,
                        offset: list.length
                    })
                }
            })
        }

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})