<template>
  <div id="user-info">
    <div
      class="info"
      :style="{backgroundImage:'url('+require('../../../static/images/timg.jpeg')+')'}"
    >
      <div class="avatar">
        <open-data type="userAvatarUrl"></open-data>
      </div>
    </div>
    <div class="waiting">
      开发ing...
    </div>
        <div class="weui-footer">
      <div class="weui-footer__text weui-footer_fixed-bottom">email: e945680371@163.com</div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      data: {
      }
    };
  },
};
</script>
 <style lang="scss">
.info {
  background-color: #f7f7f7;
  height: 400rpx;
  .avatar {
    width: 200rpx;
    height: 200rpx;
    border-radius: 10rpx;
    line-height: 400rpx;
    margin: 0 auto;
    padding-top: 80rpx;
  }
}
.waiting {
  width: 100%;
  height: 100%;
  text-align: center;
  font-size: 34rpx;
  color: #83b842;
  overflow: hidden;
  margin-top: 100rpx;
}
</style>

