//index.js
import { getrecommend,get_swiper } from '../../api/index'
Page({
    data: {
        // 推荐列表
        recommend_list: [],
        imgUrls: []
        // swiper
    },

    onLoad: function () {
        // 获取推荐列表
        getrecommend().then(res => {
            this.setData({
                recommend_list: res.data.result
            })
        }),
        // 获取swiper列表
        get_swiper().then(res=>{
            this.setData({
                imgUrls:res.data.banners
            })
        })
    },

})
