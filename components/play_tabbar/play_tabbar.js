// components/play_tabbar/play_tabbar.js
import { storeBindingsBehavior } from 'mobx-miniprogram-bindings'
import { store } from '../../store/store'
const audio = wx.getBackgroundAudioManager()
Component({
    behaviors: [storeBindingsBehavior],
    /**
     * 组件的属性列表
     */
    properties: {

    },

    storeBindings: {
        store,
        fields: ['currentSong','playSatu']
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
        selectPlay() {
            audio.paused ? audio.play() : audio.pause()
        },
        toPlay(){
            wx.navigateTo({
                url: '/pages/paly/paly'
            })
        },
        on_playList(){
            const play_list = this.selectComponent('#play-list');
            play_list.open()
        }
    },
    options: {
        styleIsolation: 'apply-shared'
    }
})
