<template>
  <div class="choose-property" v-if="isShow">
    <div class="content">
      <div class="close-icon" @click="hideIt()"></div>
      <div class="tab-box">
        <div
          v-for="(item, index) in tabList"
          :key="index"
          @click="changeTab(item.value)"
          :class="item.value === tabActive?'active': ''"
        >{{item.label}}</div>
      </div>
      <div class="nav">
        <div class="nav_topBox">
          <div class="title">成交房源</div>
          <el-select
            v-model="testSelect"
            style="margin-right: 0.1rem"
            :style="{'width': inputWidth1}"
            placeholder
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
            placeholder
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
            :style="{'width': inputWidth2}"
            placeholder
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
            :style="{'width': inputWidth3}"
            placeholder
          >
            <el-option
              v-for="item in testSelectList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
          <el-input v-model="form.Dong" placeholder="栋" class="search-btn-input" :style="{'width': inputWidth4}"></el-input>
          <span style="margin: 0 0.05rem;">-</span>
          <el-input v-model="form.unit" placeholder="单元" class="search-btn-input" :style="{'width': inputWidth4}"></el-input>
          <span style="margin: 0 0.05rem;">-</span>
          <el-input v-model="form.room" placeholder="室" class="search-btn-input" :style="{'width': inputWidth4}"></el-input>
          <div class="search-box">查询</div>
        </div>
        <div class="nav_bottomBox">
          <el-input
            class="search-btn-input"
            :style="{'width': inputWidth1,'margin-right':'0.1rem'}"
            placeholder="房源编号"
            v-model="form.number"
          ></el-input>
          <el-select
            v-model="testSelect"
            style="margin-right: 0.1rem"
            :style="{'width': inputWidth1}"
            placeholder
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
      <el-table class="table-box" :data="tableData" style="width: 100%">
        <el-table-column
          v-for="(item, index) in tableColumnList"
          :key="index"
          :prop="item.prop"
          :label="item.label"
        ></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isShow: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      form:{
        Dong:'',
        unit:'',
        room:'',
        number:'',

      },
      tabActive: "sale",
      tabList: [
        { label: "出售", value: "sale" },
        { label: "出租", value: "rent" },
      ],
      inputWidth1: "1.3rem",
      inputWidth2: "1rem",
      inputWidth3: "0.8rem",
      inputWidth4: "0.45rem",

      testSelect: "",
      testSelectList: [],
      tableColumnList: [
        { prop: "htbh", label: "楼盘名称" },
        { prop: "htlx", label: "状态" },
        { prop: "htzt", label: "楼层" },
        { prop: "zzmc", label: "户型" },
        { prop: "zzbm", label: "面积" },
        { prop: "sqr", label: "价格" },
        { prop: "ywy", label: "业务员" },
      ],
      tableData: [
        {
          htbh: "45242344234",
          htlx: "1231",
          htzt: "3 1518 弄",
          zzmc: "33 1518 弄",
          zzbm: "11 1518 弄",
          sqr: "王小虎",
          ywy: "啊哈哈",
        },
      ],
    };
  },
  methods: {
    hideIt() {
      this.$emit("update:isShow", false);
    },
    changeTab(value) {
      this.tabActive = value;
    },
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
    & > .tab-box {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 0.49rem;
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
        margin-top: 0.5rem;
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
    & > .table-box {
      margin-top: 0.15rem;
      /deep/ .has-gutter {
        tr,
        th {
          background-color: #ebeef0;
        }
      }
    }
  }
}
</style>
