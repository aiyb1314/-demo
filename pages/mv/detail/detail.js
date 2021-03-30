// pages/index/mv/mv.js
import { get_mv_url, get_mv_detail,get_mv_similar,get_M_S } from '../../../api/index'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        mv_url: '',
        artists: '',
        name: '',
        publishTime: '',
        artists: '',
        playCount: '',
        desc: '',
        // 相似mv
        similar_list:[]
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        const id = options.id;
        // 获取mv地址
        get_mv_url(id).then(res => {
            let data = res.data;
            if (data.code === 200) {
                this.setData({
                    mv_url: data.data.url
                })
            } else {
                console.log('请求mv地址失败');
            }
        })
        // 获取mv详情
        get_mv_detail(id).then(res => {
            if (res.statusCode === 200) {
                let data = res.data.data
                this.setData({
                    name: data.name,
                    publishTime: data.publishTime,
                    desc: data.desc,
                    playCount: data.playCount,
                    artists: data.artists
                })
            }
        })
        // 获取相似mv
        get_mv_similar(id).then(res=>{
            if(res.statusCode === 200){
                let list = res.data.mvs.map(n=>{
                    n.duration = get_M_S(n.duration / 1000)
                    return n 
                })
                this.setData({
                    similar_list:list
                })
            }
        })
    },
    /**
     * 
     * 自定义方法
     */

    go_album(e){
        const id = e.currentTarget.dataset.id
        wx.navigateTo({
            url:`/pages/album/album?id=${id}`
        })
    },
    // 点击相关推荐时暂停上一个页面的mv播放
    go_detail(e){
        const id = e.currentTarget.dataset.id
        wx.navigateTo({
            url:`/pages/mv/detail/detail?id=${id}`
        })
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
        this.videoContext = wx.createVideoContext('myVideo')
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
        this.videoContext.pause()
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