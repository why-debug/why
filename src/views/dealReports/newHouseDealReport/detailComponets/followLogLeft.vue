<template>
  <div class="report-no">
    <div class="title">合同号：{{offerNo}}</div>
    <div class="content">
      <div class="centerBox">
        <div class="remind">
          <div class="icon"></div>
          <span>提醒</span>
        </div>
        <div class="remindText">
          <span>提醒：</span>
          <div class="rightInput">
            <el-input
              :style="{ width: '1.75rem', height: '0.25rem' }"
              placeholder="默认本人"
              suffix-icon="el-icon-arrow-down"
              :readonly="true"
              v-model="params.remindPerson"
              @click.native="selectPerson"
            >
            </el-input>
          </div>
        </div>
        <div class="handlerInput">
          <el-input
            type="textarea"
            maxlength="200"
            resize="none"
            :style="{ width: '2.11rem', height: '0.46rem' }"
            autosize
            placeholder="填写提醒内容"
            v-model="params.remindContent"
            show-word-limit
          >
          </el-input>
        </div>
        <div class="divingLine"></div>
        <div class="followTitle">
          <div class="icon"></div>
          <span>写跟进</span>
        </div>
        <div class="writeFollow">
          <el-input
            type="textarea"
            maxlength="200"
            resize="none"
            show-word-limit
            :style="{ width: '2.11rem', height: '0.84rem' }"
            autosize
            placeholder="填写跟进内容"
            v-model="params.trackContent"
          >
          </el-input>
        </div>
        <div class="generalBox">
          <div class="generalTitle">使用常用语：</div>
          <div class="generalItemBox">
            <div
              class="generalItem"
              v-for="(item, index) in generalText"
              :key="index"
              @click="addFollowContent(item)"
            >
              {{ item }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="bottom-btn">
      <div class="btn-3" @click="saveFollowData">保存</div>
    </div>
  </div>
</template>

<script>
import {
  addNewHouseFollowLogRequest,
  addwHouseFollowLogList,
} from "@/net/dealReports/addFollowLog.js";
import { ErpCommon } from "../../../../utils/ErpCommon";
export default {
  data() {
    return {
      //选择人员传值参数
      selectPersonParms: {
        userId: "",
        userName: "",
        organizationId: "",
        organizationName: "",
        selectType: 1, //1选人，2选组织
      },
      generalText: ["已收齐客户资料！", "已收齐客户资料！", "已收齐客户资料！"], //常用语
      params: {
        reportId: "", //成交报告Id
        userId: "", //操作人的人id
        userName: "", //操作人名称
        toUsersId: "", //提醒的人id
        remindPerson: "", //提醒的人
        trackType: 2, //日志类型  1:操作日志 2跟进日志
        remindContent: "", //填写的提醒内容
        trackContent: "", //填写跟进内容
      },
    };
  },
  props: {
    reportId: {
      type: Number | String,
      default: "",
    },
    offerNo: {
      type: Number | String,
      default: "",
    },
  },
  watch: {},
  created() {
    this.params.reportId = this.reportId;
    console.log(this.reportId, "成交报告id");
    this.initUserInfo();
  },
  methods: {
    //获取用户信息
    initUserInfo() {
      let userId = new ErpCommon().getOperator("USER_ID") || "";
      let userName = new ErpCommon().getOperator("USER_NAME") || "";
      this.params.userId = userId; //获取用户id
      this.params.userName = userName; //获取用户名称
      this.params.toUsersId = userId;
      this.params.remindPerson = userName;
      console.log(
        this.params.userId,
        "用户id",
        this.params.userName,
        "用户姓名"
      );
    },
    //添加跟进内容
    addFollowContent(data) {
      this.params.trackContent += data;
    },
    //选择提醒的人
    selectPerson() {
      this.selectPersonParms.userId = this.params.toUsersId;
      this.selectPersonParms.userName = this.params.remindPerson;
      let data = new ErpCommon().openPerformanceAssignee(
        this.selectPersonParms
      );
      if (data == "") return;
      let val = JSON.parse(data);
      console.log(val, "选择的人员");
      this.params.toUsersId = val.userId || "";
      this.params.remindPerson = val.userName || "";
    },
    //保存跟进内容
    saveFollowData() {
      if (!this.saveCheck()) return;
      new addwHouseFollowLogList(new addNewHouseFollowLogRequest(this.params))
        .send()
        .then((res) => {
          console.log(res, "保存成功");
          this.$erpCommon.toast("保存成功");
          this.$parent.initFollowData();
        })
        .catch((res) => {
          this.$erpCommon.toast(res.errMsg || "服务器开小差了,请稍后再试");
        });
    },
    //保存验证
    saveCheck() {
      if (this.params.trackContent == "") {
        this.$erpCommon.toast("跟进内容不能为空");
        return false;
      } else if (this.params.trackContent.length < 10) {
        this.$erpCommon.toast("跟进内容不能小于10！");
        return false;
      }
      return true;
    },
  },
};
</script>

<style lang="less" scoped>
.report-no {
  width: 100%;
  height: auto;
  & > .title {
    width: 100%;
    height: 0.5rem;
    line-height: 0.69rem;
    text-indent: 0.1rem;
    color: #006797;
    font-size: 0.14rem;
    font-weight: bold;
  }
  & > .content {
    width: 100%;
    height: 4.1rem;
    overflow-x: hidden;
    overflow-y: auto;
    padding: 0 0.1rem;
    box-sizing: border-box;
    .centerBox {
      width: 2.11rem;
      height: 4.1rem;
      overflow: auto;
      position: relative;
      margin-left: auto;
      margin-right: auto;
      .remind {
        margin-top: 0.1rem;
        width: 0.55rem;
        height: 0.15rem;
        font-size: 0.14rem;
        line-height: 0.15rem;
        text-align: right;
        display: flex;
        color: #30a1f4;
        .icon {
          width: 0.15rem;
          height: 0.15rem;
          background: url("../../../../assets/main_TJshaixuan/startTime_200.png")
            no-repeat;
          background-size: 100% 100%;
        }
      }
      .remindText {
        width: 100%;
        height: 0.25rem;
        line-height: 0.25rem;
        color: #666;
        line-height: 0.25rem;
        display: flex;
        margin-top: 0.08rem;
        .rightInput {
          width: 1.75rem;
        }
      }
      .handlerInput {
        width: 100%;
        height: 0.46rem;
        margin-top: 0.09rem;
        /deep/.el-textarea__inner {
          height: 0.46rem !important;
        }
      }
      .divingLine {
        width: 100%;
        height: 0.01rem;
        background-color: #bfdff1;
        margin-top: 0.11rem;
      }
      .followTitle {
        width: 0.57rem;
        height: 0.16rem;
        color: #30a1f4;
        font-size: 0.12rem;
        margin-top: 0.17rem;
        display: flex;
        line-height: 0.1rem;
        justify-content: space-between;
        .icon {
          width: 0.14rem;
          height: 0.14rem;
          background: url("../../../../assets/images/dealReports/Icon1.png")
            no-repeat;
          background-size: 100% 100%;
        }
      }
      .writeFollow {
        width: 100%;
        height: 0.84rem;
        margin-top: 0.1rem;
        /deep/.el-textarea__inner {
          height: 0.84rem !important;
        }
      }
      .generalBox {
        display: flex;
        justify-content: flex-start;
        flex-direction: column;
        margin-left: 0.1rem;
        margin-top: 0.16rem;
        .generalTitle {
          color: #666;
        }
        .generalItemBox {
          margin-top: 0.13rem;
          color: #4377a8;
          height: 1.01rem;
          overflow: auto;
          & > div:nth-of-type(1) {
            margin-top: 0 !important;
          }
          .generalItem {
            cursor: pointer;
            display: flex;
            margin-top: 0.05rem;
          }
        }
      }
    }
  }
  & > .bottom-btn {
    width: 100%;
    height: auto;
    margin-top: 0.1rem;
    display: flex;
    justify-content: flex-end;
    & > div {
      width: 0.7rem;
      height: 0.27rem;
      line-height: 0.27rem;
      text-align: center;
      border-radius: 0.02rem;
      opacity: 1;
      color: #ffffff;
      font-size: 0.13rem;
      margin-right: 0.2rem;
      cursor: pointer;
      &:hover {
        opacity: 0.8;
      }
      &.btn-1 {
        background-image: linear-gradient(0deg, #eff1f4 0%, #ffffff 100%),
          linear-gradient(#5fc41b, #5fc41b);
        background-blend-mode: normal, normal;
        border: solid 0.01rem #bdc6cf;
        color: #666666;
      }
      &.btn-2 {
        background-image: linear-gradient(0deg, #64c12b 0%, #72cd3b 100%),
          linear-gradient(#5fc41b, #5fc41b);
        background-blend-mode: normal, normal;
        box-shadow: 0rem 0.01rem 0.01rem 0rem rgba(0, 0, 0, 0.75),
          inset 0rem 0.01rem 0rem 0rem rgba(255, 255, 255, 0.2);
        border: solid 0.01rem #45a802;
      }
      &.btn-3 {
        background-image: linear-gradient(0deg, #449aff 0%, #50a7ff 100%),
          linear-gradient(#5fc41b, #5fc41b);
        background-blend-mode: normal, normal;
        box-shadow: 0rem 0.01rem 0.01rem 0rem rgba(0, 0, 0, 0.75),
          inset 0rem 0.01rem 0rem 0rem rgba(255, 255, 255, 0.2);
        border: solid 0.01rem #3d81ff;
      }
    }
  }
}
</style>
