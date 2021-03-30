import { observable, action, reaction } from 'mobx-miniprogram'
import { getRandomInt } from '../api/index'
const audio = wx.getBackgroundAudioManager();
export const store = observable({
    // 数据字段
    currentSong: {},
    playSatu: '',
    songList: [],
    // 播放模式 单曲循环loop 顺序queue 随机random
    playMode: 'loop',
    // 计算属性
    get currentIndex() {
        return this.songList.findIndex(value => {
            return value.id === this.currentSong.id
        })
    },
    // actions
    set_currentSong: action(function (song) {
        this.currentSong = song
    }),
    set_playSatu: action(function (flag) {
        this.playSatu = flag
    }),
    set_songList: action(function (arry) {
        this.songList = arry
    }),
    // 下一曲
    nextSong: action(function () {
        var _length = this.songList.length - 1;
        var next_song;
        if (this.playMode === 'random') {
            var index = getRandomInt(0, _length);
            next_song = this.songList[index]
        } else {
            var currentIndex = this.currentIndex + 1
            if (currentIndex > _length) {
                currentIndex = 0
            }
            next_song = this.songList[currentIndex]
        }

        this.set_currentSong(next_song)
    }),
    // 上一曲
    prevSong: action(function () {
        var _length = this.songList.length - 1;
        var prevSong;
        if (this.playMode === 'random') {
            var index = getRandomInt(0, _length);
            prevSong = this.songList[index]
        } else {
            var currentIndex = this.currentIndex - 1
            if (currentIndex < 0) {
                currentIndex = _length
            }
            prevSong = this.songList[currentIndex]
        }
        this.set_currentSong(prevSong)
    }),
    // 删除歌曲
    deleteSong: action(function (index) {
        if (index == this.currentIndex) {
            this.nextSong()
        }
        var newList = [...this.songList];
        newList.splice(index, 1);
        this.set_songList(newList)
    }),
    // 清空音乐列表
    emptySongList: action(function () {
        this.songList = []
    }),
    // 将歌曲添加到播放列表
    addSong: action(function (song) {
        if (this.currentSong.url !== song.url) {
            var newList = [...this.songList];
            if (this.currentIndex != -1) {
                newList.splice(this.currentIndex + 1, 0, song);
            } else {
                newList.push(song)
            }
            this.set_songList(newList)
            this.set_currentSong(song)
        }
    }),
    // 切换播放模式
    select_palyMode: action(function () {
        var next;
        switch (this.playMode) {
            case 'loop':
                next = 'queue'
                break;
            case 'queue':
                next = 'random'
                break;
            case 'random':
                next = 'loop'
                break;
        }

        this.playMode = next
    })
})
// 数据监听
const observers_currentSong = reaction(
    () => store.currentSong,
    currentSong => {
        if (currentSong.url) {
            if (audio.src !== currentSong.url) {
                audio.src = currentSong.url;
                audio.title = currentSong.name
            }
        } else {
            audio.stop()
        }
    }
);

const observers_songList = reaction(
    () => store.songList,
    songList => {
        if (songList.length === 0) {
            store.set_currentSong({})
        }
    }
);