<template>
    <div class="container">
        <div  class="search-t">
            <div class="search">
                <i class="iconfont icon-sousuo icon-color" style="color: #866363"></i>
                <input type="text" class="search-input"
                       v-model="value" @input="searchChange($event)"
                placeholder="搜索歌曲、歌手">
                <i class="iconfont icon-delete icon-color" style="color: #866363" @click="deleteValue()"></i>
            </div>
        </div>
        <div class="search-hot-key" v-if="!value">
            <p>热门搜索</p>
            <ul>
                <li class="hot-key" v-for="(item,index) in hotKey" :key="index" @click="searchIt(item.k)">
                    {{item.k}}
                </li>
            </ul>
        </div>
        <div class="search-list" v-if="value">
            <ul>
                <li v-for="(item,index) in songList" :key="index" @click="navigateToDetail(index)">
                    <i class="iconfont icon-yinle1"></i> <span>{{item.songname}}</span>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
    import {mapActions} from 'vuex'
    import {getSongUrlList} from '../../core/utils/song-util'
    export default {
        data() {
            return {
                value: '',
                result: [
                    {title: 'ssss', value: 'ssss'},
                    {title: 'ssss', value: 'ssss'},
                    {title: 'ssss', value: 'ssss'},
                    {title: 'ssss', value: 'ssss'},
                ],
                hotKey: [],
                songList:[],
            }
        },
        created() {
            this.getSearchKey();
        },
        methods: {
            getSearchKey() {
                this.$searchService.getSearchKey().then(success => {
                    this.hotKey = success.data.hotkey.slice(0, 10);
                }, failed => {
                    console.log(failed.msg);
                })
            },
            searchIt(key){
                this.search(key);
                this.value = key;
            },
            searchChange(event) {
                this.search(event.target.value)
            },
            search(value){
                this.$searchService.searchMusicByKeyWord(value).then(success=>{
                  let list = success.data.song.list;
                  getSongUrlList(list).then(res=>{
                        this.songList = res
                    },failed=>{

                    })
                },failed=>{

                })
            },
            deleteValue(){
                this.value='';
            },
            navigateToDetail(index) {
                this.currentMusic(this.songList);
                this.currentMusicIndex(index);
                this.playerDetailShow(true);
            },
            ...mapActions([
                'currentMusic',
                'currentMusicIndex',
                'playAll',
                'playerDetailShow'
            ])
        }
    }</script>

<style lang="scss" type="text/scss" rel="stylesheet/scss" scoped>
    .container {
        .search-t{
            /*margin: px2rem(20px);*/
            padding: px2rem(30px) px2rem(15px);
        }
        .search {
            padding: 0 px2rem(30px);
            display: flex;
            -ms-flex-align: center;
            align-items: center;
            box-sizing: border-box;
            width: 100%;
            /*padding: px2rem(20px) px2rem(6px);*/
            height: px2rem(60px);
            background: #333;
            border-radius: px2rem(6px);
            .icon-color {
                color: #866363 !important;
            }
            .search-input {
                flex: 1;
                margin: 0 px2rem(5px);
                /*line-height: px2rem(18px);*/
                background: #333;
                color: #fff;
                font-size: px2rem(24px);
                outline: 0;
            }
        }
        .search-hot-key {
            margin: 0 px2rem(20px) px2rem(20px);
            p {
                margin-bottom: px2rem(30px);
                font-size: px2rem(24px);
                color: hsla(0, 0%, 100%, .5);
            }

        }
        .hot-key {
            display: inline-block;
            padding: px2rem(5px) px2rem(10px);
            margin: 0 px2rem(20px) px2rem(10px) 0;
            border-radius: px2rem(6px);
            background: #333;
            font-size: px2rem(24px);
            color: hsla(0, 0%, 100%, .3);
        }
        .search-list{
            ul{
                padding: 30px;
                li{
                    display: flex;
                    -ms-flex-align: center;
                    align-items: center;
                    padding-bottom: px2rem(6px);
                    color: hsla(0,0%,100%,.3);
                    i{
                        margin-right: 10px;
                    }
                }
            }

        }

    }


</style>
