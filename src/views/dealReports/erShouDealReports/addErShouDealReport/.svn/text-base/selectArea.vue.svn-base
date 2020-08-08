<template>
  <div class="select-area" v-if="isShow">
    <div class="content">
      <div class="close-icon" @click="hideIt()"></div>
      <div class="top-box">
        <div class="title">选择片区</div>
        <!-- <el-select
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
        </el-select>-->
        <el-input
          v-model="areaSelect.sectionName"
          class="search-btn-input"
          placeholder="请输入名称"
          :style="{'width': inputWidth}"
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
      <!-- <el-table
        class="table-box"
        :header-cell-class-name="cellClass"
        :data="tableData"
        style="width: 100%"
        ref="Table"
        max-height="450"
        @selection-change="chooseInstance"
      >
        <el-table-column type="selection" ref="checked" width="55"></el-table-column>
        <el-table-column
          v-for="(item, index) in tableColumnList"
          :key="index"
          :prop="item.prop"
          :label="item.label"
        ></el-table-column>
      </el-table>-->
      <main>
        <div class="title">
          <div class="col"></div>
          <div class="col">所属区域</div>
          <div class="col">名称</div>
          <!-- <div class="col">描述</div> -->
        </div>
        <div class="content">
          <div @click="rows(i)" class="row" v-for="(v, i) in tableData" :key="i">
            <div class="col">
              <div class="radio-group-item">
                <img :src="activeRadio === i ? radioActiveIcon : radioIcon" alt />
              </div>
            </div>
            <div class="col">{{ v.regName }}</div>
            <div class="col">
              <div class="sub_title">{{ v.sectionName }}</div>
            </div>
            <div class="col">{{ v.custMobile }}</div>
          </div>
        </div>
        <!-- <div v-if="tableData==''">没有查到相关信息！</div> -->
      </main>
      <el-button type="primary" class="btn" @click="confirm()">确定</el-button>
    </div>
  </div>
</template>

<script>
import searchInput from "../../../../components/form/searchInput";
import { getAreaList } from "../../../../net/dealReports/erShouDealReports";
export default {
  components: {
    searchInput,
  },
  props: {
    isShow: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      inputWidth: "2.3rem",
      activeRadio: 0,
      paramsObj: "",
      areaSelect: {
        cityId: "001", //城市id
        sectionName: "", //商圈名称
      },
      radioIcon: require("../../../../assets/images/public/radioBox_200.png"),
      radioActiveIcon: require("../../../../assets/images/public/radioBox1_200.png"),
      testSelectList: [],
      tableColumnList: [
        { prop: "regName", label: "所属区域" },
        { prop: "sectionName", label: "名称" },
        { prop: "ms", label: "描述" },
      ],
      tableData: [],
    };
  },
  methods: {
    hideIt() {
      this.$emit("update:isShow", false);
    },
    // 查询
    async initData() {
      new getAreaList(this.areaSelect).send().then((res) => {
        this.tableData = res;
        console.log(res);
      });
      console.log(this.radio);
    },
    // 点击单选
    rows(i) {
      this.activeRadio = i;
      console.log(this.activeRadio);
    },
    // 确定
    confirm() {
      let list = {
        label: this.tableData[this.activeRadio].sectionName,
        value: this.tableData[this.activeRadio].sectionId,
      };
      console.log(this.tableData[this.activeRadio].sectionName);
      this.$emit("update:isShow", false);
      this.$emit("sectionName", list);
    },
  },
};
</script>

<style lang="less" scoped>
.select-area {
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
    .btn {
      padding: 0.08rem 0.2rem;
      position: absolute;
      bottom: 0.1rem;
      right: 0.2rem;
    }
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
        line-height: 0.3rem;
        border-radius: 0.3rem;
      }
      /deep/ .el-input__icon {
        height: 0.24rem;
        line-height: 0.24rem;
      }
      & > .title {
        width: 1.1rem;
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
            width: 0.4rem;
            padding-left: 0.16rem;
          }
          &:nth-of-type(2) {
            width: 1.3rem;
          }
          &:nth-of-type(3) {
            width: 1.6rem;
          }
          &:nth-of-type(4) {
            width: 1.67rem;
          }
        }
      }
      .content {
        height: 3.5rem;
        overflow-y: scroll;
        .radio-group-item {
          img {
            width: 0.15rem;
          }
        }
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
              width: 0.4rem;
              padding-left: 0.16rem;
            }
            &:nth-of-type(2) {
              width: 1.3rem;
            }
            &:nth-of-type(3) {
              width: 1.6rem;
            }
            &:nth-of-type(4) {
              width: 1.67rem;
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
    & > .table-box {
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
