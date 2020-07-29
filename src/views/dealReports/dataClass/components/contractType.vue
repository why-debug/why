<template>
  <div class="associate-customer" v-if="isShows">
    <div class="content">
      <div class="close-icon" @click="hideIts()"></div>
      <div class="top-box">
        <!-- <div class="title">对应合同类型</div> -->
        <el-form ref="form" :model="form">
          <div class="title">对应合同类型</div>
          <div class="select_list">
            <!-- <el-form-item> -->
            <el-select placeholder="名称" v-model="form.select">
              <el-option
                v-for="item in options"
                :key="item.agentId"
                :label="item.agentName"
                :value="item.agentId"
                place-holder="代理商"
              ></el-option>
            </el-select>
            <!-- </el-form-item> -->
          </div>
          <!-- <div class="input">
            <el-form-item>
              <el-input v-model="form.input" placeholder="可使用推广名、注册名、字母缩写检索"></el-input>
            </el-form-item>
            <searchInput :placeholder="`可使用推广名、注册名、字母缩写检索`" @Kwd="inputName" width="2.5"></searchInput>
          </div>-->
          <div class="button" @click.stop="search">查询</div>
        </el-form>
      </div>
      <div>
        <el-table
          ref="multipleTable"
          :data="tableData"
          tooltip-effect="dark"
          style="width: 100%"
          :header-cell-style="headClass"
          :header-cell-class-name="cellClass"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column prop="name" label="名称" width="200"></el-table-column>
          <el-table-column prop="address" label="联次" show-overflow-tooltip></el-table-column>
        </el-table>
      </div>
      <el-button type="primary" class="btn" @click="confirm">确定</el-button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isShows: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      inputWidth1: "1.3rem",
      inputWidth2: "2.3rem",
      testSelect: "",
      testSelectList: [],
      form: {
        number: "",
        name: "",
        Ctype: "",
        type: [],
        desc: "",
        order: "",
      },
      rules: {
        number: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
        ],
        number: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
        ],
      },
      tableData: [
        {
          name: "王五",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          name: "张三",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          name: "李四",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
      ],
      // multipleSelection: [],
    };
  },
  methods: {
    hideIts() {
      this.$emit("update:isShows", false);
    },
    headClass() {
      return "background-color: #ebeef0;padding:4px 0";
    },
    cellClass(row) {
      if (row.columnIndex === 0) {
        return "disabledCheck";
      }
    },
    // 点击确定收集选中数据并关闭弹框
    confirm() {
      //  关闭弹窗
      this.$emit("update:isShows", false);
      // 向父组件发送选中数据
      this.$emit("table", this.$refs.multipleTable.selection);
      // console.log(this.multipleSelection);
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
  z-index: 999;

  & > .content {
    position: relative;
    width: 8.66rem;
    height: 4.88rem;
    background-color: #eff4f9;
    padding: 0 0.2rem;
    box-sizing: border-box;
    /deep/.el-table {
      /* 去掉全选按钮 */
      .disabledCheck .el-checkbox__input {
        display: none !important;
      }
      .disabledCheck .cell::before {
        content: "选";
        text-align: center;
        line-height: 37px;
      }
      .el-table__header {
        font-size: 0.12rem;
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
      /deep/ .el-form {
        height: 100%;
        width: 100%;
        display: flex;
        align-items: center;
        .title {
          color: #444444;
          font-family: MicrosoftYaHei;
          font-size: 0.14rem;
          font-weight: bold;
        }
        .select_list {
          margin-left: 0.25rem;
          .el-form-item {
            .el-select {
              width: 100% !important;
            }
          }
        }
        .input {
          margin-left: 0.1rem;
          .el-form-item {
            width: 2.58rem;
            height: 0.24rem;
          }
        }
        .button {
          width: 0.55rem;
          height: 0.26rem;
          background-color: #fafafa;
          color: #666666;
          text-align: center;
          border: 0.01rem solid #bfc2c4;
          line-height: 0.28rem;
          margin-left: 0.1rem;
          cursor: pointer;
        }
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
      }
    }
    .btn {
      padding: 0.08rem 0.2rem;
      position: absolute;
      bottom: 0.1rem;
      right: 0.2rem;
    }
  }
}
</style>
