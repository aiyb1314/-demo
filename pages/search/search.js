import { getSearchRecom, get_search_result, getmultimatch, add_search_history } from '../../api/index'
const computedBehavior = require('miniprogram-computed')
Component({
    behaviors: [computedBehavior],
    /**
     * 组件的属性列表
     */
    properties: {

    },

    /**
     * 组件的初始数据
     */
    data: {
        // 预搜索结果
        searchRecom: [],
        // 搜索的关键词
        keyword: "",
        // 搜索结果
        multimatch: {},
        songList: [],
        // 搜索结果总数量
        songCount:0
    },
    // 计算属性
    computed: {
        searchStatus(data) {
            let state;
            if (
                (Object.keys(data.multimatch).length !== 0) |
                (data.songList.length != 0)
            ) {
                state = "result";
            } else if (data.keyword !== "") {
                state = "recom";
            } else {
                state = "default";
            }
            return state;
        }
    },

    /**
     * 组件的方法列表
     */
    methods: {
        // 搜索框输入时
        inputs(data) {
            let query = data.detail;
            this.set_keyword(query);
            //获取搜索建议
            if (query) {
                getSearchRecom(query).then(res => {
                    res = res.data.result.allMatch;
                    if (res) {
                        this.setData({
                            searchRecom: res
                        })
                    } else {
                        this.setData({
                            searchRecom: []
                        })
                    }
                });
            }
        },
        // 搜索框回车时
        enter(data) {
            let query = data.detail;
            this.set_keyword(query);
            if (query) {
                // 获取综合搜索结果（mv,歌手）
                getmultimatch(query).then(res => {
                    res = res.data.result;
                    this.setData({
                        multimatch: res
                    })
                });
                // 获取搜索结果
                get_search_result(query).then(res => {
                    let data = res.data;
                    if (data.code === 200) {
                        this.setData({
                            songList: data.result.songs,
                            songCount: data.result.songCount
                        })
                    }

                });
                // 将搜索结果添加到localstorage中
                add_search_history(query);
            }
        },

        // 搜索框获得焦点时
        focus(data) {
            this.data.multimatch = {};
            this.data.songList = [];
            this.inputs(data);
        },
        //
        set_keyword(keyword) {
            keyword = String(keyword)
            this.setData({
                keyword: keyword
            })
        },
        // 搜索
        search(data) {
            let search_box = this.selectComponent('#search-box')
            search_box.search(data.detail)
        }
    }
})