<template>
  <div id="main">
    <div class="tit" :style="{background:`url(${msg1.avatar}) center/cover no-repeat`}">
      <Row :gutter="16">
        <iCol span="6">
          <div>
            <img :src="msg1.avatar" />
          </div>
        </iCol>
        <iCol span="18">
          <div class="tit_right">
            <Tag checkable color="error" size="medium">品牌</Tag>
            <span>{{msg1.name}}</span>
            <p>{{msg1.description}}/{{msg1.deliveryTime}}分钟送达</p>

            <p>
              <img class="img" src="../assets/images/decrease_1@3x.png" alt />
              {{msg1.supports?msg1.supports[0].description:''}}
            </p>
          </div>
        </iCol>
        <p class="bull">
          <img src="../assets/images/bulletin@2x.png" alt />
          {{msg1.bulletin}}
        </p>
      </Row>
    </div>
    <div class="nav">
      <a href="#/Main/Goods" :class="{red:show==0}" @click="show=0">商品</a>
      <a href="#/Main/Evaluate" :class="{red:show==1}" @click="show=1">评价</a>
      <a href="#/Main/Merchant" :class="{red:show==2}" @click="show=2">商家</a>
    </div>
    <!-- 二级路由出口 -->
    <router-view></router-view>
  </div>
</template>

<script>
import { getseller } from "../api/apis.js";

export default {
  data() {
    return {
      msg1: {},
      show:0
    };
  },
  methods: {
    why(){
      console.log(1111);
      
    }
  },
  mounted() {
    getseller().then(res => {
      this.msg1 = res.data.data;
      console.log(res);
    });
  }
};
</script>

<style lang="less" scoped>
#main {
  display: flex;
  flex-direction: column;

  .tit {
    width: 100%;
    height: 140px;
    .ivu-row {
      color: #fff;
      background: rgba(51, 48, 48, 0.8);
      padding: 20px 0px 0 20px;
      height: 100%;
      width: 100%;
      margin: 0 !important;
      img {
        width: 60px;
        border-radius: 5px;
      }

      p {
        line-height: 30px;
      }
      .bull {
        padding: 2px 10px;
        font-size: 12px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        //   padding: 10px 0;
        img {
          width: 30px;
          height: 15px;
          vertical-align: middle;
        }
      }
    }
    h3 {
      width: 100%;
      height: 50px;
      line-height: 50px;
    }

    .tit_right {
      color: #f8f8f8;
      span {
        font-size: 40px/2em;
        color: #fff;
      }
      p:first-of-type {
        font-size: 16px;
      }
      p:last-of-type {
        font-size: 14px;
        img {
          width: 20px;
          vertical-align: middle;
          margin-right: 5px;
        }
      }
    }
  }
  .nav {
    display: flex;
    justify-content: space-around;
    width: 100%;
    height: 40px;
    line-height: 40px;
    border-bottom: 1px solid #ccc;
    a {
      color: #494d50;
    }
    .red{
      color: #f00
    }
  }
}
</style>