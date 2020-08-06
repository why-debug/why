<template>
  <div class="erp-toast" v-show="isShow">
    <div class="content">
      <div class="top">
        <div class="close-btn">
          <img src="../../assets/images/public/close.png" @click="closeModel()" alt="">
        </div>
      </div>
      <div class="middle">
        <img src="../../assets/images/public/Warning_Msg.png" alt="">
        <div>{{text}}</div>
      </div>
      <div class="bottom">
        <div @click="confirmIt()">确认</div>
        <div @click="closeModel()">取消</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isShow: {
      type: Boolean,
      default: false
    },
    text: {
      type: String,
      default: ''
    }
  },
  data () {
    return {}
  },
  methods: {
    // 关闭弹窗
    closeModel () {
      this.$emit('update:isShow', false)
    },
    // 确认
    confirmIt () {
      this.closeModel()
      this.$emit('confirm')
    }
  }
}
</script>

<style lang="scss" scoped>
.erp-toast {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  font-family: MicrosoftYaHei;
  background-color: rgba($color: #000000, $alpha: 0.2);
  overflow: hidden;
  &>.content {
    width: 3.44rem;
    height: auto;
    margin: 0.5rem auto;
    background-color: #ffffff;
    &>.top {
      width: 100%;
      height: 0.2rem;
      display: flex;
      justify-content: flex-end;
      &>.close-btn {
        width: 0.2rem;
        height: 100%;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        margin-right: 0.05rem;
        cursor: pointer;
        &>img {
          width: 0.1rem;
          height: 0.1rem;
          display: block;
        }
      }
    }
    &>.middle {
      &>img {
        width: 0.6rem;
        height: 0.6rem;
        display: block;
        margin: 0 auto;
      }
      &>div {
        width: 100%;
        height: auto;
        padding: 0.2rem;
        box-sizing: border-box;
        text-align: center;
        font-size: 0.14rem;
      }
    }
    &>.bottom {
      width: 100%;
      height: auto;
      padding: 0 0 0.2rem;
      box-sizing: border-box;
      display: flex;
      justify-content: space-around;
      align-items: center;
      &>div {
        width: 0.45rem;
        height: 0.3rem;
        line-height: 0.3rem;
        text-align: center;
        font-size: 0.12rem;
        color: #ffffff;
        border-radius: 0.04rem;
        cursor: pointer;
        &:nth-child(1) {
          background-color: #4fb0ff;
        }
        &:nth-child(2) {
          background-color: #fb8a10;
        }
      }
    }
  }
}
</style>
