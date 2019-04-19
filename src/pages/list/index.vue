<template>
  <div id="music-item">
    <div class="wrap">
      <div class="weui-panel weui-panel_access">
        <div class="weui-panel__hd auto_all" @click='replayAll'>播放所有</div>
        <div class="weui-panel__bd">
          <navigator
            v-for="(data,index) in musicData"
            :key="index"
            url
            class="weui-media-box weui-media-box_appmsg"
            hover-class="weui-cell_active"
            @tap='replay(data)'
          >
            <div class="weui-media-box__hd weui-media-box__hd_in-appmsg">
              <image class="weui-media-box__thumb" :src="data.pic"></image>
            </div>
            <div class="weui-media-box__bd weui-media-box__bd_in-appmsg">
              <div class="weui-media-box__title">{{data.title}}</div>
              <div class="weui-media-box__desc">{{data.author}}</div>
              <div v-if='data.isshow' class="weui-icon">
                <img :src="stop" alt="">
              </div>
            </div>
          </navigator>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const musicApply = wx.getBackgroundAudioManager();
let stop = require("../../../static/images/stop.png");
export default {
  data() {
    return {
      isPlay: false,
      music_url: "",
      stop: stop,
      oldMusicInfo:{},    //记录上一首播放数据
      musicData: [],
      key: "",
    };
  },
  methods: {
    getMusic() {
      let url = "https://api.hibai.cn/api/index/index";
      let sendData = {
        TransCode: "020225",
        OpenId: "123456789",
        Body: {
          key: this.key
        }
      };
      this.fly.post(url, sendData).then(res => {
        this.musicData = res.data.Body;
      });
    },
    destroyMusic() {
      musicApply.pause();
      this.isPlay = false;
      this.replay();
    },
    //播放所有歌曲-从第一首开始播放
    replayAll(){
      this.replay(this.musicData[0])
    },
    //播放音乐
    replay(data) {
      if(this.oldMusicInfo == data){
        musicApply.pause()
         this.oldMusicInfo = {}
      }else{
         for (let i = 0; i < this.musicData.length; i++) {
         this.musicData[i] == data?this.musicData[i].isshow = true : this.musicData[i].isshow = false
      }
      musicApply.title = data.title;
      musicApply.epname = data.title;
      musicApply.singer = data.author;
      musicApply.coverImgUrl = data.pic;
      musicApply.src = data.url;
      //onEnded ==> 播放结束 -播放下一首
      musicApply.onEnded(() => {
        this.autoPlay(data);
      });
      //onEnded ==> 播放错误 -播放下一首
      musicApply.onError(()=>{
        this.autoPlay(data);
      })
      this.oldMusicInfo = data
      // this.$forceUpdata更新
      this.$forceUpdate();
      }
    },
    //自动播放
    autoPlay(data) {
      let newData = {};
      let length = this.musicData.length-1
      for (let i = 0; i < this.musicData.length; i++) {
        //播放下一首
        if (this.musicData[i] === data) {
          newData = this.musicData[i + 1];  
          this.replay(newData);
        }else if(this.musicData[length] === data){
          newData = this.musicData[0]
          this.replay(newData)
        }
      }
    }
  },
  beforeMount() {
    this.key = this.$mp.query.search;
    this.getMusic();
  },
  watch:{
      musicData(val) {
        this.musicData = val;
      }
  }
};
</script>

<style lang='scss'>
#music-item {
  width: 95%;
  margin: 0 auto;
  min-height: 100%;
  .wrap {
    .wrap-content li {
      height: 180rpx;
      width: 100%;
      border-bottom: 1rpx solid #eee;
      display: flex;
      .wrap-index {
        width: 30%;
        color: red;
        margin: 0 auto;
        img {
          display: block;
          width: 140rpx;
          height: 140rpx;
          margin: 20rpx auto;
        }
      }
      .wrap-title {
        width: 70%;
        font-size: 28rpx;
        padding-top: 40rpx;
        .music-title {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .author {
          font-size: 24rpx;
          color: #615d5d;
        }
      }
    }
    .replay-all {
      height: 80rpx;
      font-size: 32rpx;
      line-height: 80rpx;
      border-bottom: 1rpx solid #f7f7f7;
      padding-left: 28rpx;
      color: #83b842;
    }
  }
  .douyin {
    width: 100%;
    height: 350rpx;
    margin: 5rpx 0;
    border-bottom: 1rpx solid #eee;
    img {
      display: block;
      width: 100%;
      height: 280rpx;
    }
    p {
      font-size: 28rpx;
      text-align: center;
    }
  }
  .weui-icon {
    position: absolute;
    right: 20rpx;
    top: 55rpx;
    height: 35px;
    width: 35px;
    overflow: hidden;
    img{
      display: inline-block;
      width:100%;
      height: 100%;
    }
  }
}
.weui-media-box__title,.auto_all{
   color: #83b842;
}
</style>