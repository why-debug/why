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
            <img class="img" src="../assets/images/decrease_1@2x.png" alt />
            <span class="sub">{{msg1.supports?msg1.supports[0].description:''}}</span>
          </div>
        </iCol>
        <p class="bull">
          <img src="../assets/images/bulletin@2x.png" alt />
          {{msg1.bulletin}}
        </p>
      </Row>
    </div>
    <div class="nav">
      <router-link to="/Main/Goods">商品</router-link>
      <router-link to="/Main/Evaluate">评价</router-link>
      <router-link to="/Main/Merchant">商家</router-link>
    </div>
    <!-- 二级路由出口 -->
    <router-view></router-view>
    <div class="footer">
      <div class="car">
        <p>
          <Icon type="md-cart" />
        </p>
      </div>
      <div>
        <div class="pics">
          <span>￥0</span>
          <span class="lin"></span>
          另需配送费￥{{msg1.deliveryPrice}}元
        </div>

        <button>￥{{msg1.minPrice}} 起送</button>
      </div>
    </div>
  </div>
</template>

<script>
import { getseller } from "../api/apis.js";
export default {
  data() {
    return {
      msg1: {},
      msg2: {}
    };
  },
  methods: {},
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
}
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
    .img {
      width: 20px;
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
        height: 20px;
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
    .sub {
      font-size: 16px;
    }
    span {
      font-size: 40px/2em;
      color: #fff;
    }
    p:first-of-type {
      font-size: 16px;
    }
    p:last-of-type {
      font-size: 14px;
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
}
.footer {
  width: 100%;
  height: 60px;
  position: fixed;
  bottom: 0;
  background: #121e25;
  padding-left: 85px;
  .car {
    width: 60px;
    height: 60px;
    line-height: 60px;
    background: #121e25;
    border-radius: 50%;
    position: absolute;
    left: 20px;
    top: -15px;
    display: flex;
    justify-content: center;
    align-items: center;
    p {
      background: #2a343c;
      width: 80%;
      height: 80%;
      border-radius: 50%;

      text-align: center;
      i {
        font-size: 25px;
      }
    }
  }
  .pics {
    width: 70%;
    height: 40px;
    display: flex;
    align-items: center;
    padding: 10px 0;
    margin-top: 10px;
    span:first-child{font-size: 18px;font-weight: 700;}
    .lin {
      display: inline-block;
      width: 1px;
      height: 30px;
      background: #2b3a3f;
      margin-left: 10px;
      margin-right: 10px;
    }
  }
  div:last-of-type {
    display: flex;
  }
  button {
    height: 60px;
    width: 30%;
    background: #2a353a;
    border: none;
    color: #fff;
  }
}
</style>