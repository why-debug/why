<template>
  <div class="attachment-information">
    <div class="content">
      <div class="item" v-for="(item, index) in 11" :key="index">
        <div class="left">合同资料</div>
        <div class="right">1/2</div>
      </div>
    </div>
    <div class="bottom">
      <div>上传附件</div>
    </div>
  </div>
</template>

<script>
export default {
  data () {}
}
</script>

<style lang="less" scoped>
.attachment-information {
  width: 100%;
  height: 100%;
  overflow: hidden;
  &>.content {
    width: 100%;
    height: calc(~"100% - 0.5rem");
    overflow: hidden;
    &>.item {
      width: 1.7rem;
      height: 0.36rem;
      margin: 0.1rem 0 0 0.2rem;
      display: inline-flex;
      align-items: center;
      background-image: linear-gradient(#13b981, #13b981), linear-gradient(#44c99c, #44c99c);
      background-blend-mode: normal, normal;
      border-radius: 0.02rem;
      color: #ffffff;
      font-size: 0.12rem;
      font-weight: bold;
      cursor: pointer;
      &:nth-child(n<3) {
        margin-top: 0.2rem;
      }
      &>.left {
        width: 1.29rem;
        height: 100%;
        line-height: 0.36rem;
        text-indent: 0.1rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      &>.right {
        width: 0.4rem;
        height: 0.2rem;
        line-height: 0.2rem;
        text-align: center;
        border-left: 0.01rem solid #ffffff;
      }
    }
  }
  &>.bottom {
    width: 100%;
    height: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    background-color: #ffffff;
    overflow: hidden;
    &>div {
      width: 0.62rem;
      height: 0.27rem;
      margin-right: 0.16rem;
      line-height: 0.27rem;
      text-align: center;
      background-color: #ffffff;
      border-radius: 0.03rem;
      border: solid 0.01rem #259cf3;
      color: #259cf3;
      font-size: 0.12rem;
      cursor: pointer;
    }
  }
}
</style>
