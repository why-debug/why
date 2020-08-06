<template>
  <div class="associate-customer" v-if="isShow">
    <div class="content">
      <div class="close-icon" @click="hideIt()"></div>
      <div class="top-box">
        <div class="title">递交资料</div>
      </div>
      <div class="title_contant">
        <ul style="display: flex;justify-content: center;">
          <li>
            <span class="w3">上交人</span>：
            <span>撒打算打算</span>
          </li>
          <li>
            <span>上交组织</span>：
            <span>撒打算打算</span>
          </li>
          <li>
            <span>上交时间</span>：
            <span>撒打算打算</span>
          </li>
        </ul>
        <p style="font-size:14px!important;color:#259cf3;margin-top:0.15rem">
          成交报告：
          <span>*********</span>
        </p>
        <p>
          【
          <span>***</span>】
          <span>****</span>
        </p>
        <ul style="display: flex;justify-content: center;">
          <li>
            <span>成交组织</span>：
            <span>撒打算打算</span>
          </li>
          <li>
            <span class="w3">成交人</span>：
            <span>撒打算打算</span>
          </li>
          <li>
            <span>成交日期</span>：
            <span>撒打算打算</span>
          </li>
        </ul>
      </div>
      <el-table class="table-box" :data="tableData" style="width: 100%">
        <el-table-column prop="dataClass" label="资料类型"></el-table-column>
        <el-table-column prop="dataName" label="资料名称"></el-table-column>
        <el-table-column prop="class" label="分类"></el-table-column>
        <el-table-column prop="state" label="递交状态"></el-table-column>
        <el-table-column prop="reject" label="驳回原因"></el-table-column>
        <el-table-column prop="dj">
          <template slot-scope="scope">
            <div
              @click="sendIn(scope.row,scope.$index)"
              style="cursor: pointer;user-select: none;color:#259cf3;"
              v-if="scope.row.dj==1"
            >
              <span class="dj_icon"></span>
              <span>递交</span>
            </div>

            <div
              @click="sendOut(scope.row,scope.$index)"
              style="cursor: pointer;user-select: none;color:#259cf3;"
              v-if="scope.row.dj==2"
            >
              <span class="dj_icon"></span>
              <span>取消递交</span>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <el-button type="primary" class="btn">确定</el-button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isShow: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      inputWidth1: "1.3rem",
      inputWidth2: "2.3rem",
      testSelect: "",
      testSelectList: [],

      tableData: [
        {
          dataClass: "45242344234",
          dataName: "1231",
          class: "成交资料",
          state: "已归档",
          reject: "11 1518 弄",
          dj: 1
        },
        {
          htbh: "45242344234",
          htlx: "1231",
          htzt: "3 1518 弄",
          zzmc: "已归档",
          zzbm: "11 1518 弄",
          dj: 2
        }
      ]
    };
  },
  methods: {
    hideIt() {
      this.$emit("update:isShow", false);
    },
    sendIn() {
      console.log("递交成功");
    }
  }
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
    .title_contant {
      width: 70%;
      ul > li {
        width: 33%;
        display: flex;
        // font-size: 14px;
        span:first-child {
          width: 4em;
          display: block;
          text-align: justify;
          &:after {
            content: "";
            width: 100%;
            display: inline-block;
          }
        }
        // .w3 {
        //   letter-spacing: 0.5em; /*如果需要y个字两端对齐，则为(x-y)/(y-1),这里是（4-2）/(2-1)=2em */
        //   margin-right: -0.5em; /*同上*/
        // }
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
    & > .table-box {
      margin-top: 0.15rem;
      /deep/ .has-gutter {
        tr,
        th {
          background-color: #ebeef0;
        }
      }
      .dj_icon {
        width: 0.15rem;
        height: 0.15rem;
        vertical-align: middle;
        margin: 0.08rem;
        display: inline-block;
        background-image: url("../../../../assets/images/projectAgentInfo/common/guihuan_200.png");
        background-size: 0.12rem 0.12rem;
        background-repeat: no-repeat;
        background-position: center center;
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
