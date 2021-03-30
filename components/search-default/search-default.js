// components/search-default/search-default.js
import {get_search_hotList, get_song_history, set_song_history, clear_song_history} from '../../api/index'
Component({
  /**
   * 组件的属性列表
   */

  /**
   * 组件的初始数据
   */
  data: {
      // 搜索历史
    Song_history:[],
    // 热门搜索
    host_search:[]
  },
    // 生命周期
    lifetimes: {
        created() {
            // 获取热搜关键词
            get_search_hotList().then(res => {
                this.setData({
                    host_search: res.data.result.hots
                })
            })

            // 获取 搜索历史
            get_song_history().then(res => {
                this.setData({
                    Song_history: res
                })
            }).catch(() => {
                this.setData({
                    Song_history: []
                })
            })
        }
    },
  /**
   * 组件的方法列表
   */
  methods: {
    delete_history(e){
        let index = e.currentTarget.dataset.index

        let list = [...this.data.Song_history]

        list.splice(index,1)

        this.setData({
            Song_history:list
        })

        if(this.data.Song_history.length === 0){
            clear_song_history()
        }else{
            set_song_history(this.data.Song_history)
        }
    },
    // 搜索
    search(e){
        let keyword = e.currentTarget.dataset.keyword
        this.triggerEvent('search', keyword)
    },
  },
  options: {
        styleIsolation: 'apply-shared'
    }
})
