<template>
  <div class="associate-customer" v-if="isShow">
    <div class="content">
      <div class="close-icon" @click="hideIt()"></div>
      <div class="top-box">
        <div class="title">关联二手客户中心选客</div>
        <el-select
          v-model="testSelect"
          style="margin-right: 0.1rem"
          :style="{'width': inputWidth1}"
          placeholder="归属组织"
        >
          <el-option
            v-for="item in testSelectList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <el-select
          v-model="testSelect"
          style="margin-right: 0.1rem"
          :style="{'width': inputWidth1}"
          placeholder="客户持有人"
        >
          <el-option
            v-for="item in testSelectList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <el-input
          v-model="clientSelect.select"
          class="search-btn-input"
          placeholder="录入手机号/转介单号精准查询"
          :style="{'width': inputWidth2}"
        >
          <img
            slot="suffix"
            class="search_icon"
            src="http://cdn.haofang.net/static/newHouseStandardVersion/customer/sstiao_FD_200.png"
            alt
          />
        </el-input>
        <div class="search-box" @click="initData">查询</div>
      </div>
      <main>
        <div class="title">
          <div class="col">归属组织</div>
          <div class="col">客户持有人</div>
          <div class="col">客户编码</div>
          <div class="col">客户名称</div>
          <div class="col">客户手机号</div>
          <div class="col">转接/合作单号</div>
        </div>
        <div class="content">
          <div class="row" v-for="(v, i) in tableData" :key="i">
            <div class="col">{{ v.organizationName }}</div>
            <div class="col">{{ v.userName}}</div>
            <div class="col">{{ v.buyCustNo }}</div>
            <div class="col">{{ v.buyCustName }}</div>
            <div class="col">{{ v.phoneList[0].phoneNumber }}</div>
            <div class="col">{{ v.recommendNum }} ({{v.recommendType==1?'转介':'合作'}})</div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import { getClientList } from "../../../../net/dealReports/erShouDealReports";
export default {
  props: {
    // 显示与隐藏弹框
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
      inputWidth1: "1.3rem",
      inputWidth2: "2.3rem",
      testSelectList: "",
      clientSelect: {
        pageNum: "",
        pageSize: "",
        saleOrRentType: 1,
        organizationId: "",
        userId: "",
        custId: "",
        select: "",
        compId: "",
      },
      tableData: [],
    };
  },
  methods: {
    hideIt() {
      this.$emit("update:isShow", false);
    },
    // 查询
    async initData() {
      new getClientList(this.clientSelect).send().then((res) => {
        this.tableData = res;
        console.log(res);
      });
    },
  },
};
</script>

<style lang="less" scoped>
.associate-customer {
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
    padding: 0 0.2rem;
    box-sizing: border-box;
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
    & > .top-box {
      width: 100%;
      height: 0.5rem;
      display: flex;
      align-items: center;
      /deep/ .el-input__inner {
        height: 0.24rem;
        line-height: 0.24rem;
      }
      /deep/ .el-input__icon {
        height: 0.24rem;
        line-height: 0.24rem;
      }
      & > .title {
        width: 1.7rem;
        height: auto;
        line-height: 1;
        color: #444444;
        font-size: 0.14rem;
        font-weight: bold;
      }
      & > .search-btn-input {
        height: 0.24rem;
        line-height: 0.24rem;
        margin-right: 0.2rem;
        /deep/.el-input__inner {
          border-radius: 0.12rem;
        }
        .search_icon {
          width: 0.14rem;
          height: 0.14rem;
          margin-top: 0.05rem;
          margin-right: 0.08rem;
        }
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
        cursor: pointer;
      }
    }
    main {
      .title {
        width: 100%;
        height: 0.35rem;
        background-color: #ebeef0;
        display: flex;
        .col {
          height: 100%;
          line-height: 0.35rem;
          color: #888888;
          font-size: 0.12rem;
          font-family: MicrosoftYaHei;
          font-weight: bold;
          &:nth-of-type(1) {
            width: 1.6rem;
            padding-left: 0.16rem;
          }
          &:nth-of-type(2) {
            width: 1rem;
          }
          &:nth-of-type(3) {
            width: 1.6rem;
          }
          &:nth-of-type(4) {
            width: 0.88rem;
          }
          &:nth-of-type(5) {
            width: 1.32rem;
          }
          &:nth-of-type(6) {
            width: 1.9rem;
          }
        }
      }
      .content {
        height: 3.5rem;
        overflow-y: scroll;
        .row {
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
            padding: 0.14rem 0;
            &:nth-of-type(1) {
              width: 1.6rem;
              padding-left: 0.16rem;
            }
            &:nth-of-type(2) {
              width: 1rem;
            }
            &:nth-of-type(3) {
              width: 1.6rem;
            }
            &:nth-of-type(4) {
              width: 0.88rem;
            }
            &:nth-of-type(5) {
              width: 1.32rem;
            }
            &:nth-of-type(6) {
              width: 1.9rem;
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
  }
}
</style>
