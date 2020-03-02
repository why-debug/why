<template>
  <div>
    <div class="shopcar" v-show="shopcar">
      <div class="car_tit">
        <p>购物车</p>
        <p @click="del()">清空购物车</p>
      </div>
      <div v-for="(item,index) in goodslist" :key="index">
        <div class="goodscar" v-for="(obj,i) in item.foods" :key="i" v-show="obj.num!==0">
          <div class="left">
            <p>{{obj.name}}</p>
            <p>{{obj.description}}</p>
          </div>
          <div class="rigth">
            <p>￥{{obj.num*obj.price}}</p>
            <button @click="subtract(index,i,-1)">-</button>
            <span>{{obj.num}}</span>
            <button @click="subtract(index,i,1)">+</button>
          </div>
        </div>
      </div>
    </div>
    <div class="goods_footer">
      <div class="car" @click="(shopcar=!shopcar)">
        <p>
          <Icon type="md-cart" />
        </p>
      </div>
      <div>
        <div class="pics">
          <span>￥{{sum}}</span>
          <span class="lin"></span>
          另需配送费￥{{msg.deliveryPrice}}元
        </div>
        <button>￥{{msg.minPrice}} 起送</button>
      </div>
    </div>
  </div>
</template>

<script>
import { getseller } from "../api/apis.js";
// import { getgoods } from "../api/apis.js";

export default {
  data() {
    return {
      msg: {},
      shopcar: false
    };
  },
  created() {
    getseller().then(res => {
      this.msg = res.data.data;
    });
    // console.log(this.$store.getters.getsum);
  },
  computed: {
    goodslist() {
      return this.$store.state.goodslist;
    },
    sum() {
      return this.$store.getters.getsum;
    }
    // num(){
    //     return this.$store.state.num;
    // }
  },
  methods: {
    del() {
      this.$store.state.goodslist.map(v => v.foods.map(a => (a.num = 0)));
    },
    subtract(index, i, val) {
      this.$store.state.goodslist[index].foods[i].num += val;
    }
  }
};
</script>

<style lang="less" scoped>
.list_mask {
  width: 100%;
  height: 100%;
}
.shopcar {
  width: 100%;
  background: #ccc;
  position: fixed;
  bottom: 60px;
  .car_tit {
    display: flex;
    justify-content: space-between;
    p:last-child {
      color: #00a1dc;
    }
  }
  .goodscar {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #e7e7e7;
    padding: 10px 0;
    .left {
      p:nth-child(1) {
        font-size: 16px;
      }
      p:nth-child(2) {
        font-size: 12px;
      }
    }
    .rigth {
      display: flex;
      align-items: center;
      p {
        margin-right: 10px;
        color: #fc6f67;
        font-size: 16px;
      }
      button {
        width: 24px;
        height: 24px;
        border-radius: 50%;
        border: 0;
        outline: none;
        background: #00a0dc;
        color: #fff;
        font-size: 22px;
        text-align: center;
        line-height: 24px;
      }
      span {
        padding: 0 10px;
      }
    }
  }
}
.goods_footer {
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
    span:first-child {
      font-size: 18px;
      font-weight: 700;
    }
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