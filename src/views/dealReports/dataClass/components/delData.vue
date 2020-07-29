<template>
  <div class="del" v-if="isShows">
    <div class="content">
      <div class="close-icon" @click="hideIt()"></div>
      <div class="del_content">
        <p>
          <img src="../../../../assets/images/common/Warning_Msg_200.png" alt />
        </p>
        <p style="font-size:0.2rem;margin-top:0.08rem">确定删除该数据？</p>
        <p class="btn">
          <button @click="confirm()">确 定</button>
          <button @click="cancel()">取 消</button>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isShows: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {};
  },
  methods: {
    hideIt() {
      this.$emit("update:isShows", false);
    },
    confirm() {
      console.log("确定");
    },
    cancel() {
      this.$emit("update:isShows", false);
    }
  }
};
</script>

<style lang="less" scoped>
.del {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 99;
  .content {
    position: relative;
    width: 4rem;
    height: 2.5rem;
    background-color: #eff4f9;
    padding: 0 0.2rem;
    box-sizing: border-box;
    border: 10px solid rgba(0, 0, 0, 0.5);
    .del_content {
      width: 2rem;
      margin: 0 auto;
      text-align: center;
      // padding: 0.1rem 0;
      img {
        margin-top: 0.1rem;
        width: 0.8rem;
      }
      .btn {
        display: flex;
        justify-content: space-around;
        margin-top: 0.5rem;
        button {
          color: #fff;
          font-size: 0.18rem;
          padding: 0.08rem 0.12rem;
          border: none;
          outline: none;
          border-radius: 5px;
          &:first-child {
            background: #4fb0ff;
          }
          &:last-child {
            background: #fb8a10;
          }
        }
      }
    }
    & > .close-icon {
      position: absolute;
      top: 0;
      right: 0;
      width: 0.18rem;
      height: 0.18rem;
      background-image: url("../../../../assets/images/public/close_200.png");
      background-size: 0.12rem 0.12rem;
      background-repeat: no-repeat;
      background-position: center center;
      z-index: 99;
      cursor: pointer;
      &:hover {
        background-image: url("../../../../assets/images/public/close_200_hover.png");
        background-color: red;
      }
    }
  }
}
</style>>
