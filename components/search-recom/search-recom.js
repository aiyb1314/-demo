// components/search-recom/search-recom.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        searchRecom:Array
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
        // 搜索
        search(e){
            let keyword = e.currentTarget.dataset.keyword
            this.triggerEvent('search', keyword)
        },
    }
})
