// components/search-box/search-box.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        placeholder: {
            type: String,
            value: '搜索歌曲、歌手'
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        display: false,
        value: '',
        isFocus:true
    },
    lifetimes:{

    },
    /**
     * 组件的方法列表
     */
    methods: {
        input(event){
            this.setData({
                value:event.detail.value
            })
            this.triggerEvent('input', this.data.value)
        },
        focus(){
            this.triggerEvent("focus", this.data.value);
        },
        // 确认搜索
        enter(){
            this.triggerEvent("enter", this.data.value);
            this.setData({
                isFocus:false
            })
        },
        // 设置value
        setValue(query) {
            this.setData({
                value:query
            })
        },
        // 搜索关键词
        search(keyword){
            this.setValue(keyword);
            this.enter()
        },
        // 清除
        clear(){
            this.setData({
                value:'',
                isFocus:true
            })
        }
    },
    // 数据监听
    observers: {
        'value': function (value) {
            if(value !== ''){
                this.setData({
                    display:true
                })
            }else{
                this.setData({
                    display:false
                })
            }
        }
    },
    options: {
        styleIsolation: 'apply-shared'
    }
})
