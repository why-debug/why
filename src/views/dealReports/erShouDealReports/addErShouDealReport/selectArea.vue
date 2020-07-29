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
        <searchInput :placeholder="`请输入名称`" @Kwd="inputName" width="2.5"></searchInput>
        <div class="search-box">查询</div>
      </div>
      <el-table
        class="table-box"
        :header-cell-class-name="cellClass"
        :data="tableData"
        style="width: 100%"
        ref="Table"
        @selection-change="chooseInstance"
      >
        <el-table-column type="selection" ref="checked" width="55"></el-table-column>
        <el-table-column
          v-for="(item, index) in tableColumnList"
          :key="index"
          :prop="item.prop"
          :label="item.label"
        ></el-table-column>
      </el-table>
      <el-button type="primary" class="btn" @click="confirm">确定</el-button>
    </div>
  </div>
</template>

<script>
import searchInput from "../../../../components/form/searchInput";
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
      inputWidth1: "1.3rem",
      paramsObj: "",
      testSelect: "",
      testSelectList: [],
      tableColumnList: [
        { prop: "htbh", label: "所属区域" },
        { prop: "htlx", label: "名称" },
        { prop: "ms", label: "描述" },
      ],
      tableData: [
        {
          htbh: "45242344234",
          htlx: "1231",
          ms: "呵呵呵呵呵",
        },
        {
          htbh: "45242344234",
          htlx: "1231",
          ms: "呵呵呵呵呵",
        },
        {
          htbh: "45242344234",
          htlx: "1231",
          ms: "呵呵呵呵呵",
        },
      ],
    };
  },
  methods: {
    hideIt() {
      this.$emit("update:isShow", false);
    },
    // 去掉表格全选按钮
    cellClass(row) {
      if (row.columnIndex === 0) {
        return "disabledCheck";
      }
    },
    chooseInstance(val) {
      if (val.length > 1) {
        this.$refs.Table.clearSelection();
        this.$refs.Table.toggleRowSelection(val.pop());
      } else {
      }
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
    /deep/ .el-table {
      /* 去掉全选按钮 */
      .disabledCheck .el-checkbox__input {
        display: none !important;
      }
      .disabledCheck .cell::before {
        content: "";
        text-align: center;
        line-height: 37px;
      }
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
        line-height: 0.24rem;
        border-radius: 0.12rem;
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
