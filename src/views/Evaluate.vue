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
    <div class="bottom">
      <div class="btn">
        <button>全部57</button>
        <button>满意47</button>
        <button>不满意10</button>
      </div>
      <p class="screen"><Icon type="md-checkmark-circle" size='18' color='#ccc' />只看有内容的评价</p>
      <div class="text">
        <div class="txt" v-for="(item,index) in msg" :key="index">
          <img :src="item.avatar" alt />
          <div class="txt_right">
            <p>
              <span>{{ item.username }}</span>
              <Time :time="times" type="datetime" />
              <!-- <span>{{item.rateTime}}</span> -->
            </p>
            <Rate class="grade" disabled v-model="valueDisabled" />
            <span class="times">{{item.deliveryTime!==''?item.deliveryTime+'分钟送达':''}}</span>
            <p>{{item.text}}</p>
            <p>{{item.recommend.join("、")}}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getcomment } from "../api/apis.js";

export default {
  data() {
    return {
      msg: [],
      valueDisabled: 0,
      times: 0
    };
  },
  created() {
    getcomment().then(res => {
      this.msg = res.data.data;
      res.data.data.forEach(v => {
        this.valueDisabled = v.score;
        this.times = v.rateTime;
      });
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
    p:nth-child(2) {
      color: #000;
      font-size: 14px;
    }
    p:last-child {
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
  .btn {
    height: 80px;
    margin: 0 20px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #ccc;
    button {
      font-size: 14px;
      margin-left: 10px;
      padding: 10px;
      border: 0;
    }
    button:first-child {
      background: #00a1dc;
      color: #fff;
    }
    button:nth-child(2) {
      background: #cceef7;
      color: #000;
    }
  }
  .screen {
    width: 100%;
    height: 40px;
    line-height: 40px;
    padding: 0 20px;
    border-bottom: 1px solid #ccc;
  }
  .text {
    width: 100%;
    padding: 0px 20px;
  }
  .txt {
    width: 100%;
    display: flex;
    padding: 15px 0;
    border-bottom: 1px solid #ccc;
    .txt_right {
      width: 100%;
      margin-left: 20px;
      p {
        span:last-child {
          font-size: 12px;
        }
      }
      p:first-child {
        width: 100%;
        display: flex;
        justify-content: space-between;
      }
      .ivu-rate {
        font-size: 12px;
      }
      p:last-child {
        margin-top: 10px;
      }
      .times {
        font-size: 12px;
      }
    }
    img {
      width: 30px;
      height: 30px;
      border-radius: 50%;
    }
  }
}
</style>