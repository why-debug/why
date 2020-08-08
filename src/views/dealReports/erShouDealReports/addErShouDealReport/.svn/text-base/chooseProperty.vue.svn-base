<template>
  <div class="choose-property" v-if="isShow">
    <div class="content">
      <div class="close-icon" @click="hideIt()"></div>
      <!-- 头部tab切换栏 -->
      <!-- <div class="tab-box">
          <div
            v-for="(item, index) in tabList"
            :key="index"
            @click="changeTab(item.value)"
            :class="item.value === tabActive?'active': ''"
          >{{item.label}}</div>
      </div>-->
      <!-- 选择查询条件 -->
      <div class="nav">
        <div class="nav_topBox">
          <div class="title">成交房源</div>
          <el-select
            v-model="testSelect"
            style="margin-right: 0.1rem"
            :style="{'width': inputWidth1}"
            placeholder="美联物业"
          >
            <el-option
              v-for="item in testSelectList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
          <!-- 选择楼盘 -->
          <el-select
            v-model="testSelect.buildId"
            style="margin-right: 0.1rem"
            :style="{'width': inputWidth1}"
            placeholder="选择楼盘"
          >
            <el-option
              v-for="item in houses"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
          <!-- 全部 -->
          <el-select
            v-model="testSelect"
            style="margin-right: 0.1rem"
            :style="{'width': inputWidth2}"
            placeholder="全部"
          >
            <el-option
              v-for="item in testSelectList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
          <!-- 楼层 -->
          <el-select
            v-model="testSelect.floor"
            style="margin-right: 0.1rem"
            :style="{'width': inputWidth3}"
            placeholder="楼层"
          >
            <el-option
              v-for="item in testSelectList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
          <!-- 栋、单元、室 -->
          <el-input
            v-model="testSelect.roof"
            placeholder="栋"
            class="search-btn-input"
            :style="{'width': inputWidth4}"
          ></el-input>
          <span style="margin: 0 0.05rem;">-</span>
          <el-input
            v-model="testSelect.unit"
            placeholder="单元"
            class="search-btn-input"
            :style="{'width': inputWidth4}"
          ></el-input>
          <span style="margin: 0 0.05rem;">-</span>
          <el-input
            v-model="testSelect.num"
            placeholder="室"
            class="search-btn-input"
            :style="{'width': inputWidth4}"
          ></el-input>
          <div class="search-box" @click="initData">查询</div>
        </div>
        <div class="nav_bottomBox">
          <!-- 房源编号 -->
          <el-input
            class="search-btn-input"
            :style="{'width': inputWidth1,'margin-right':'0.1rem'}"
            placeholder="房源编号"
            v-model="testSelect.houseNo"
          ></el-input>
          <!-- 业务员姓名 -->
          <el-select
            v-model="testSelect"
            style="margin-right: 0.1rem"
            :style="{'width': inputWidth1}"
            placeholder="业务员姓名"
          >
            <el-option
              v-for="item in testSelectList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
      </div>
      <main>
        <div class="title">
          <div class="col">盘源名称</div>
          <div class="col">状态</div>
          <div class="col">楼层</div>
          <div class="col">户型</div>
          <div class="col">面积</div>
          <div class="col">价格</div>
          <div class="col">业务员</div>
        </div>
        <div class="content">
          <div class="row" @click="kew(v)" v-for="(v, i) in tableData" :key="i">
            <div class="col">{{ v.buildName }}</div>
            <div class="col">{{ v.houseStatus }}</div>
            <div class="col">{{ v.floor }}</div>
            <div class="col">{{ v.room }}-{{v.hall}}-{{v.wei}}</div>
            <div class="col">{{ v.area }} ㎡</div>
            <div class="col">{{ v.competePrice }} 万</div>
            <div class="col">{{ v.userName }}</div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import {
  getHouseList,
  getHouseListRequest,
  houseListData,
} from "../../../../net/dealReports/erShouDealReports";
export default {
  props: {
    isShow: {
      type: Boolean,
      default: false,
    },
    // 交易类型
    dealType: {
      type: String,
      default: "1",
    },
  },
  data() {
    return {
      houses: [
        { label: "w1", value: "1" },
        { label: "w2", value: "2" },
      ],
      tabActive: "sale",
      tabList: [
        { label: "出售", value: "sale" },
        { label: "出租", value: "rent" },
      ],
      inputWidth1: "1.3rem",
      inputWidth2: "1rem",
      inputWidth3: "0.8rem",
      inputWidth4: "0.45rem",
      // 请求参数
      testSelect: new houseListData(),
      tableData: [],
    };
  },
  methods: {
    hideIt() {
      this.$emit("update:isShow", false);
      this.tableData = [];
    },
    async initData() {
      this.testSelect.dealType = this.dealType == "2" ? "2" : "1";
      new getHouseList(this.testSelect).send().then((res) => {
        this.tableData = res;
        console.log(res);
      });
      console.log(this.dealType);
    },
    kew(v) {
      this.$emit("update:isShow", false);
      this.$emit("houseInfo", v);
      this.tableData = [];
    },
  },
  created() {
    console.log(this.dealType);
    this.testSelect.dealType = this.dealType == 2 ? 2 : 1;
  },
};
</script>

<style lang="less" scoped>
.choose-property {
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
  & > .content {
    position: relative;
    width: 8.66rem;
    height: 4.88rem;
    background-color: #eff4f9;
    padding: 0.2rem 0.2rem;
    box-sizing: border-box;
    overflow: hidden;
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
      z-index: 100;
      cursor: pointer;
      &:hover {
        background-image: url("../../../../assets/images/public/close_200_hover.png");
        background-color: red;
      }
    }
    & > .tab-box {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      // height: 0.49rem;
      border-bottom: 0.01rem solid #cad5df;
      display: flex;
      padding: 0 0.2rem;
      box-sizing: border-box;
      & > div {
        width: 0.7rem;
        height: 0.3rem;
        line-height: 0.3rem;
        margin-top: 0.17rem;
        text-align: center;
        color: #cad5df;
        font-size: 0.12rem;
        cursor: pointer;
        &.active {
          color: #444444;
          border: 0.01rem solid #cad5df;
          border-bottom: 0.01rem solid #eff4f9;
          border-top-left-radius: 0.04rem;
          border-top-right-radius: 0.04rem;
        }
      }
    }
    & > .nav {
      .search-btn-input {
        height: 0.24rem;
        line-height: 0.24rem;
      }
      /deep/ .el-input__inner {
        height: 0.24rem;
        line-height: 0.24rem;
      }
      & > .nav_topBox {
        width: 100%;
        height: 0.5rem;
        display: flex;
        align-items: center;
        // /deep/ .el-input__icon {
        //   height: 0.24rem;
        //   line-height: 0.24rem;
        // }
        & > .title {
          width: 0.7rem;
          height: auto;
          line-height: 1;
          color: #444444;
          font-size: 0.14rem;
          font-weight: bold;
        }
        & > .search-box {
          width: 0.58rem;
          height: 0.22rem;
          line-height: 0.22rem;
          text-align: center;
          border: 0.01rem solid #bfc2c4;
          color: #666666;
          font-size: 0.12rem;
          border-radius: 0.04rem;
          background-color: #fafafa;
          margin-left: 0.4rem;
          cursor: pointer;
        }
      }
      & > .nav_bottomBox {
        width: 100%;
        display: flex;
        align-items: center;
        padding-left: 0.7rem;
      }
    }
    main {
      width: 100;
      margin-top: 0.2rem;
      .title {
        width: 100%;
        background-color: #ebeef0;
        display: flex;
        .col {
          height: 100%;
          color: #888888;
          font-size: 0.12rem;
          font-family: MicrosoftYaHei;
          font-weight: bold;
          padding: 0.1rem 0.2rem;
          box-sizing: border-box;
          &:nth-of-type(1) {
            width: 16%;
            padding-left: 0.16rem;
          }
          &:nth-of-type(2) {
            width: 12%;
          }
          &:nth-of-type(3) {
            width: 12%;
          }
          &:nth-of-type(4) {
            width: 16%;
          }
          &:nth-of-type(5) {
            width: 14%;
          }
          &:nth-of-type(6) {
            width: 16%;
          }
          &:nth-of-type(7) {
            width: 14%;
          }
        }
      }
      .content {
        height: 3rem;
        width: 100%;
        overflow-y: scroll;
        .row {
          width: 100%;
          margin-bottom: 0.03rem;
          background-color: #fff;
          display: flex;
          &:hover {
            background-color: #eaeaea;
            cursor: pointer;
          }
          .col {
            height: 100%;
            color: #888888;
            font-size: 0.12rem;
            font-family: MicrosoftYaHei;
            font-weight: bold;
            padding: 0.1rem 0.2rem;
            box-sizing: border-box;
            &:nth-of-type(1) {
              width: 16%;
              padding-left: 0.16rem;
            }
            &:nth-of-type(2) {
              width: 12%;
            }
            &:nth-of-type(3) {
              width: 12%;
            }
            &:nth-of-type(4) {
              width: 16%;
            }
            &:nth-of-type(5) {
              width: 14%;
            }
            &:nth-of-type(6) {
              width: 16%;
            }
            &:nth-of-type(7) {
              width: 14%;
            }
            .item {
              height: 0.15rem;
              width: 100%;
              display: flex;
              line-height: 0.15rem;
              .sub_title {
                height: 100%;
                position: relative;
                &::after {
                  content: ":";
                  position: absolute;
                  right: -0.06rem;
                  top: 50%;
                  transform: translateY(-50%);
                }
              }
              .sub_content {
                max-width: 1.77rem;
                height: 100%;
                margin-left: 0.15rem;
              }
            }
          }
        }
      }
    }
    // & > .table-box {
    //   margin-top: 0.15rem;
    //   /deep/ .has-gutter {
    //     tr,
    //     th {
    //       background-color: #ebeef0;
    //     }
    //   }
    // }
  }
}
</style>
