<template>
  <div>
    <div class="title">
      <div class="title_left">
        <p>3.9</p>
        <p>综合评分</p>
        <p>高于周边商家</p>
      </div>
      <div class="title_right">
        <p>
          <span>服务态度</span>
          <img src="../assets/images/star36_on@2x.png" alt />
          <img src="../assets/images/star36_on@2x.png" alt />
          <img src="../assets/images/star36_on@2x.png" alt />
          <img src="../assets/images/star36_on@2x.png" alt />
          <img src="../assets/images/star36_off@2x.png" alt />
          <span>3.9</span>
        </p>
        <p>
          <span>服务态度</span>
          <img src="../assets/images/star36_on@2x.png" alt />
          <img src="../assets/images/star36_on@2x.png" alt />
          <img src="../assets/images/star36_on@2x.png" alt />
          <img src="../assets/images/star36_on@2x.png" alt />
          <img src="../assets/images/star36_off@2x.png" alt />
          <span>4.0</span>
        </p>
        <p>
          <span>送达时间</span>
          <span class="date">44分钟</span>
        </p>
      </div>
    </div>
    <div class="center"></div>
    <div class="bottom"></div>
  </div>
</template>

<script>
import { getcomment } from "../api/apis.js";

export default {
  data() {
    return {
      msg: {}
    };
  },
  created() {
    getcomment().then(res => {
      console.log(res);

      this.msg = res.data;
    });
  }
};
</script>

<style lang="less" scoped>
.title {
  width: 100%;
  height: 100px;
  padding: 15px 0;
  display: flex;
  div:first-child {
    width: 40%;
    height: 100%;
    text-align: center;
    border-right: 1px solid #ccc;
    margin-right: 20px;
    p:first-child {
      color: #fb9406;
      font-size: 20px;
    }
    p:nth-child(2){
        color: #000;
        font-size: 14px;
    }
    p:last-child{
        font-size: 12px;
    }
  }

  .title_right {
    p {
      line-height: 20px;
      img {
        height: 14px;
        vertical-align: baseline;
      }
      span:first-child {
        color: #9b9ca0;
        font-size: 12px;
        margin-right: 10px;
      }
    }
  }
}
.center {
  height: 20px;
  background: #f3f6f6;
}
.bottom {
  width: 100%;
}
</style>