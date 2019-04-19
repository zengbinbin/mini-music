<template>
  <div class="page">
    <div class="page__bd">
      <div class="weui-search-bar">
        <div class="weui-search-bar__form">
          <div class="weui-search-bar__box">
            <icon class="weui-icon-search_in-box" type="search" size="14"></icon>
            <input type="text" class="weui-search-bar__input" placeholder="搜索" v-model="inputVal" :focus="inputShowed" @input="inputTyping" />
            <div class="weui-icon-clear" v-if="inputVal.length > 0" @click="clearInput">
              <icon type="clear" size="14"></icon>
            </div>
          </div>
          <label class="weui-search-bar__label" :hidden="inputShowed" @click="showInput">
            <icon class="weui-icon-search" type="search" size="14"></icon>
            <div class="weui-search-bar__text">搜索</div>
          </label>
        </div>
        <div class="weui-search-bar__cancel-btn" :hidden="!inputShowed" @click="hideInput">取消</div>
      </div>
      <div class="weui-cells searchbar-result" v-if="inputVal.length > 0">
        <div @tap='toList' class="weui-cell" hover-class="weui-cell_active">
          <div class="weui-cell__bd">
            <div>{{inputVal}}</div>
          </div>
        </div>
      </div>
    </div>
    <div class='singer'>
      <ul v-for='data in datas' :key='data'>
        <li @tap='toDataList(data)'><span>{{data}}</span></li>
      </ul>
    </div>
    <div class='glgs' @tap="toDataList('黑子的篮球')">
        <img :src="imgInfo" alt="">
    </div>
  </div>
</template>

<script>
let glgs = require("../../../static/images/timg.jpeg");
export default {
  data() {
    return {
      inputShowed: false,
      inputVal: "",
      datas: ['周杰伦','林俊杰','薛之谦','毛不易','李荣浩','胡歌','华晨宇','许嵩','汪苏泷'],
      imgInfo:glgs
    }
  },
  methods: {
    showInput() {
      this.inputShowed = true;
    },
    hideInput() {
      this.inputVal = '';
      this.inputShowed = false
    },
    clearInput() {
      this.inputVal = '';
    },
    toList(){
      wx.navigateTo({
        url:'/pages/list/main?search='+this.inputVal
      })
    },
    toDataList(data){
       wx.navigateTo({
        url:'/pages/list/main?search='+data
      })
    },
    inputTyping(e) {
      this.inputVal = e.mp.detail.value
    }
  }
}
</script>

<style lang='scss'>
.searchbar-result {
  margin-top: 0;
  font-size: 14px;
}
.searchbar-result:before {
  display: none;
}
.weui-cell {
  padding: 12px 15px 12px 35px;
}
.singer{
  margin-top: 40rpx;
  font-size: 24rpx;
  text-align: center;
  overflow: hidden;
  color: #83b842;
  ul{
    li{
      float: left;
      width: 33%;
      height: 80rpx;
      line-height: 80rpx;
      span{
        padding: 10rpx 30rpx;
        border:1rpx solid #eee;
      }
    }
  }
}
.glgs{
  height: 400rpx;
  width: 100%;
  margin: 90rpx 0;
  font-size: 36rpx;
  text-align: center;
  img{
    display: block;
    width: 100%;
  }
}
.weui-search-bar__input,.weui-cell__bd{
  color: #83b842;
}
</style>