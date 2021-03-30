// components/search-box/search-box.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        placeholder:{
            type:String,
            value:'搜索歌曲、歌手'
        }
    },

    /**
     * 组件的初始数据
     */
    data: {

    },

    /**
     * 组件的方法列表
     */
    methods: {
        focus(){
            wx.navigateTo({
                url:'/pages/search/search'
            })
        }
    },
    options: {
        styleIsolation: 'apply-shared'
    }
})
