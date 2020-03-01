<template>
  <div id="shops">
    <div id="top">
      <div class="top_title">
        <div>
          <h3>{{data.name}}</h3>
          <p>
            <Rate disabled v-model="valueDisabled" />
            ({{data.ratingCount}})
            <span>月售{{data.sellCount}} 单</span>
          </p>
        </div>

        <div>
          <Icon type="md-heart" size="25" color="#f00" />
          <p>已收藏</p>
        </div>
      </div>
      <div class="top_btm">
        <div>
          <p>起送价</p>
          <p>
            <span>{{data.minPrice}}</span>元
          </p>
        </div>
        <div>
          <p>商家配送</p>
          <p>
            <span>{{data.deliveryPrice}}</span>元
          </p>
        </div>
        <div>
          <p>平均配送时间</p>
          <p>
            <span>{{data.deliveryTime}}</span>分钟
          </p>
        </div>
      </div>
    </div>

    <div id="notice">
      <h3>公告与活动</h3>
      <p>{{data.bulletin}}</p>

      <div v-for="(item,i) in data.supports" :key="i">
        <span>
          <img v-show="i==0" src="../assets/images/decrease_4@2x.png" alt />
          <img v-show="i==1" src="../assets/images/discount_4@2x.png" alt />
          <img v-show="i==2" src="../assets/images/special_4@2x.png" alt />
          {{item.description}}
        </span>
      </div>
    </div>

    <div id="live">
      <h3>商家实景</h3>
      <div>
        <img :src="item" alt v-for="(item,i) in data.pics" :key="i" />
      </div>
    </div>
    <div id="info">
      <h3>商家信息</h3>
      <p v-for="(item,i) in data.infos" :key="i">{{item}}</p>
    </div>
  </div>
</template>

<script>
import { getseller } from "../api/apis.js";

export default {
  data() {
    return {
      data: {},
      valueDisabled: 4
    };
  },
  created() {
    getseller().then(res => {
      //   console.log(res);
      this.data = res.data.data;
    });
  }
};
</script>

<style lang="less" scoped>
#shops {
  background: #f3f6f6;
}
#top {
  background: #fff;
  width: 100%;
  padding: 20px;
  .top_title {
    display: flex;
    justify-content: space-between;
    div:first-child {
      p {
        font-size: 12px;
      }
    }
    div:last-child {
      text-align: center;
    }
  }
  .top_btm {
    width: 100%;

    border-top: 1px solid #ccc;
    padding-top: 20px;
    margin-top: 20px;
    display: flex;
    justify-content: space-around;
    div {
      width: 30%;
      text-align: center;
      font-size: 12px;
      span {
        font-size: 20px;
      }
    }
    div:not(:last-child) {
      border-right: 1px solid #ccc;
    }
  }
}
#notice {
  background: #fff;
  margin-top: 20px;
  padding: 20px;

  p:first-of-type {
    line-height: 25px;
    margin: 5px 0 20px 10px;
    color: #f00;
  }
  div {
    border-top: 1px solid #ccc;
    padding: 20px 0;
    display: flex;
    align-items: center;
    img{
        width: 20px;
        vertical-align: middle;
    }
  }
}
#live {
  background: #fff;
  padding: 20px;
  margin-top: 20px;
  div {
    width: 100%;
    display: flex;
    overflow: scroll;
    margin-top: 15px;
    img {
      width: 150px;
      height: 100px;
      margin-right: 10px;
    }
  }
}
#info {
  background: #fff;
  padding: 20px;
  margin-top: 20px;
  h3 {
    margin-bottom: 15px;
  }
  p {
    padding: 20px 0;
    border-top: 1px solid #ccc;
  }
}
</style>