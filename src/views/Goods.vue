<template>
  <div class="goods-div">
    <div class="goods_Top">
      <div class="left-div">
        <ul class="content">
          <div
            @click="leftTitle(index)"
            :class="{left_goods:true,selected:index==selected}"
            v-for="(item,index) in goodslist"
            :key="item.name"
          >
            <span>
              <img
                style="width: 16px"
                v-show="item.type == 2"
                src="../assets/images/special_4@2x.png"
              />
              {{ item.name }}
            </span>
          </div>
        </ul>
      </div>
      <div class="right-div">
        <ul class="content">
          <div :id="i" v-for="(item,i) in goodslist" :key="item.name">
            <div class="title">
              <p>{{item.name}}</p>
            </div>
            <div class="good">
              <div ref="element" class="good-list" v-for="(obj,N) in item.foods" :key="N">
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
                  <button v-show="obj.num!==0" @click="obj.num > 0 ? obj.num-- : 0">-</button>
                  <span v-show="obj.num!==0">{{obj.num}}</span>
                  <button @click="obj.num++">+</button>
                </div>
              </div>
            </div>
          </div>
        </ul>
      </div>
    </div>

    <router-view />
  </div>
</template>

<script>
import { getgoods } from "../api/apis.js";

//引入better-scroll
import BScroll from "better-scroll";
export default {
  data() {
    return {
      msg: {},
      selected: 0,
      shopcar: false
    };
  },
  computed: {
    height() {
      // 每个商品div的高度
      var arr = [];
      var sum = 0;
      this.goodslist.forEach((v, i) => {
        var heights = document.getElementById(i).offsetHeight;
        arr.push({ min: sum, max: sum + heights, index: i });
        sum += heights;
      });
      return arr;
    },
    goodslist() {
      return this.$store.state.goodslist;
    }
  },
  created() {
    getgoods().then(res => {
      this.$store.commit("initGoods", res.data.data);
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
    },
    // clickDec(N) {
    //   console.log(N);
      
    // },
    // clickAdd(N) {
    //   console.log(N);

    // }
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
              background: #00a0dc;
              color: #fff;
              font-weight: bold;
            }
          }
        }
      }
    }
  }
}
</style>