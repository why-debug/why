<template>
  <div class="goods-div">
    <div class="goods_Top">
      <div class="left-div">
        <ul class="content">
          <div
            @click="leftTitle(index)"
            :class="{left_goods:true,selected:index==selected}"
            v-for="(item,index) in list"
            :key="item.name"
          >
            <span>
            <img style="width: 16px" v-show="item.type == 2" src="../assets/images/special_4@2x.png" />              
              {{ item.name }}
            </span>
          </div>
        </ul>
      </div>
      <div class="right-div">
        <ul class="content">
          <div :id="i" v-for="(item,i) in list" :key="item.name">
            <div class="title">
              <p>{{item.name}}</p>
            </div>
            <div class="good">
              <div ref="element" class="good-list" v-for="obj in item.foods" :key="obj.name">
                <div class="img">
                  <img :src="obj.icon" alt />
                </div>
                <div class="msg">
                  <p class="name">{{obj.name}}</p>
                  <p class="description">{{obj.description}}</p>
                  <p>
                    <span class="sellCount">月售{{obj.sellCount}}份</span>
                    <span class="rating">评分{{obj.rating}}</span>
                  </p>
                  <p>
                    <span class="price">￥{{obj.price}}</span>
                    <span class="oldPrice">{{obj.oldPrice}}</span>
                  </p>
                </div>
                <div class="btn">
                  <!-- <button>-</button> -->
                  <!-- <span>  1  </span> -->
                  <button>+</button>
                </div>
              </div>
            </div>
          </div>
        </ul>
      </div>
    </div>

    <div class="shopcar" v-show="shopcar">挡板</div>
    <div class="goods_footer">
      <div class="car" @click="(shopcar=!shopcar)">
        <p>
          <Icon type="md-cart" />
        </p>
      </div>
      <div>
        <div class="pics">
          <span>￥0</span>
          <span class="lin"></span>
          另需配送费￥{{msg.deliveryPrice}}元
        </div>
        <button>￥{{msg.minPrice}} 起送</button>
      </div>
    </div>
  </div>
</template>

<script>
import { getgoods } from "../api/apis.js";
import { getseller } from "../api/apis.js";
//引入better-scroll
import BScroll from "better-scroll";
export default {
  data() {
    return {
      msg: {},
      list: [],
      selected: 0,
      shopcar: false
    };
  },
  computed: {
    height() {
      var arr = [];
      var sum = 0;
      // for (let i = 0; i < this.list.length; i++) {

      //   console.log(heights);
      //   var why = i;
      //   // sum += heights;
      //   console.log(i);
      // }
      this.list.forEach((v, i) => {
        var heights = document.getElementById(i).offsetHeight;
        arr.push({ min: sum, max: sum + heights, index: i });
        sum += heights;
      });
      // console.log(arr);

      return arr;
    }
  },
  created() {
    getgoods().then(res => {
      this.list = res.data.data;
    });
    getseller().then(res => {
      this.msg = res.data.data;
    });
  },
  mounted() {
    new BScroll(document.querySelector(".left-div"), { click: true });
    this.rightDiv = new BScroll(document.querySelector(".right-div"), {
      probeType: 3
    });

    this.rightDiv.on("scroll", ({ y }) => {
      let _y = Math.abs(y);
      // console.log(_y);

      for (const obj of this.height) {
        if (_y >= obj.min && _y < obj.max) {
          this.selected = obj.index;
          return;
        }
      }
    });
  },
  methods: {
    leftTitle(index) {
      this.selected = index;
      this.rightDiv.scrollToElement(document.getElementById(index), 600);
    }
  }
};
</script>

<style lang="less" scoped>
.selected {
  background: #fff;
  border: none !important;
  margin: 0 !important;
  padding: 0 10px;
}
.goods-div {
  width: 100%;
  height: 100%;
  flex: 1;
  .goods_Top {
    display: flex;
    width: 100%;
    .left-div {
      width: 80px;
      height: 400px;
      background: #f3f6f6;
      overflow: scroll;
      .left_goods {
        height: 50px;
        display: flex;
        align-items: center;
        margin: 0 10px;
        border-bottom: 1px solid #ccc;
      }
    }
    .right-div {
      flex: 1;
      height: 400px;
      overflow: scroll;
      .title {
        height: 30px;
        background: #f4f5f7;
        p {
          line-height: 30px;
          text-indent: 1em;
        }
      }
      .good {
        padding: 0 20px;
        .good-list {
          position: relative;
          display: flex;
          padding: 20px 0;
          border-bottom: 1px solid #ccc;
          .img {
            width: 60px;
            height: 60px;
            margin-right: 10px;
            img {
              width: 60px;
              height: 60px;
            }
          }
          .msg {
            flex: 1;
            color: #95989d;
            font-size: 12px;
            .name {
              color: #000;
              font-size: 14px;
            }
            .description {
              width: 100px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
            p {
              .price {
                font-size: 16px;
                color: #fa1c0f;
                font-weight: bold;
              }
              .oldPrice {
                font-size: 12px;
                text-decoration: line-through;
              }
            }
          }
          .btn {
            position: absolute;
            right: 10px;
            bottom: 10px;
            button {
              width: 20px;
              height: 20px;
              border-radius: 50%;
              border: 0;
              background: cornflowerblue;
              color: #fff;
              font-weight: bold;
            }
          }
        }
      }
    }
  }
  .shopcar {
    width: 100%;
    height: 300px;
    background: #ccc;
    position: fixed;
    bottom: 60px;
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
}
</style>