<template>
  <div class="basic">
    <dividingLine :title="`合同签署双方(甲方)`"></dividingLine>

    <div class="basic_item_i">
      <div class="basic_item_i_title">开发商名称</div>
      <div class="i-icon">:</div>
      <div class="nomust"></div>
      <el-input
        :style="{ width: '1.69rem' }"
        maxlength="20"
        v-model="params.developerName"
        :disabled="pageIndex === 3"
      ></el-input>
    </div>

    <div class="basic_item_i">
      <div class="basic_item_i_title">代理商名称</div>
      <div class="i-icon">:</div>
      <div class="nomust"></div>
      <el-input
        :style="{ width: '1.69rem' }"
        maxlength="20"
        v-model="params.agentName"
        :disabled="pageIndex === 3"
      ></el-input>

      <div class="right_title">
        <div>地</div>
        <div>址</div>
      </div>
      <div class="i-icon">:</div>
      <div class="nomust"></div>
      <el-input
        :style="{ width: '1.69rem' }"
        maxlength="20"
        v-model="params.addr"
        :disabled="pageIndex === 3"
      ></el-input>
    </div>

    <div class="basic_item_i">
      <div class="basic_item_i_title">甲方对接人</div>
      <div class="i-icon">:</div>
      <div class="nomust"></div>
      <el-input
        :style="{ width: '1.69rem' }"
        maxlength="11"
        v-model="params.partyADockingPerson"
        :disabled="pageIndex === 3"
      ></el-input>

      <div class="right_title_c">对接电话</div>
      <div class="i-icon">:</div>
      <div class="nomust"></div>
      <el-input
        :style="{ width: '1.69rem' }"
        maxlength="11"
        v-model="params.partyADockingPersonMobile"
        @input="changgeNum"
        :disabled="pageIndex === 3"
         @keydown.native="btKeyDown"
        @keyup.native="btKeyDown"
      ></el-input>

      <div class="right_title_c">邮箱或微信</div>
      <div class="i-icon">:</div>
      <div class="nomust"></div>
      <el-input
        :style="{ width: '1.69rem' }"
        maxlength="20"
        v-model="params.partyADockingPersonEmail"
        :disabled="pageIndex === 3"
      ></el-input>
    </div>

    <div class="basic_item_i">
      <div class="basic_item_i_title">财务人员</div>
      <div class="i-icon">:</div>
      <div class="nomust"></div>
      <el-input
        :style="{ width: '1.69rem' }"
        maxlength="20"
        v-model="params.financialOfficer"
        :disabled="pageIndex === 3"
      ></el-input>

      <div class="right_title_a">财务电话</div>
      <div class="i-icon">:</div>
      <div class="nomust"></div>
      <el-input
        :style="{ width: '1.69rem' }"
        maxlength="11"
        v-model="params.financialOfficerMobile"
        :disabled="pageIndex === 3"
        @keydown.native="btKeyDown"
        @keyup.native="btKeyDown"
      ></el-input>

      <div class="right_title_c">邮箱或微信</div>
      <div class="i-icon">:</div>
      <div class="nomust"></div>
      <el-input
        :style="{ width: '1.69rem' }"
        maxlength="20"
        v-model="params.financialOfficerEmail"
        :disabled="pageIndex === 3"
      ></el-input>
    </div>
  </div>
</template>
<script>
import dividingLine from "./dividingLine";
const reg = /^[1-9]\d{0,11}$/;
export default {
  components: {
    dividingLine,
  },
  data() {
    return {
      agencyTermTime: [], //分销期限
      checked: "",
      legalFollowersList: [
        { label: "fe", value: 4, mobile: "18227135618" },
        { label: "fafa", value: 25, mobile: "18227855618" },
        { label: "ff", value: 20, mobile: "18226335618" },
      ],
      params: {
        developerName: "", //开发商名称
        agentName: "", //代理商名称
        addr: "", //代理商名称地址
        partyADockingPerson: "", //甲方对接人姓名
        partyADockingPersonMobile: "", //对接人电话
        partyADockingPersonEmail: "", //对接人邮箱或微信
        financialOfficer: "", //财务人员：
        financialOfficerMobile: "", //财务电话：
        financialOfficerEmail: "", //财务人邮箱或微信：
      },
    };
  },
  props: {
    //当前操作界面索引(1.新增 2.编辑 3.详情)
    pageIndex: {
      type: Number,
      default() {
        return 1;
      },
    },
    initParams: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  watch: {
    //编辑或详情初始化数据
    initParams: {
      handler: function(to, from) {
        if (this.pageIndex == 2 || this.pageIndex == 3) this.initData();
      },
      deep: true,
    },
  },
  methods: {
    //初始化编辑数据
    initData() {
      this.params.addr = this.initParams.addr;
      this.params.developerName = this.initParams.developerName;
      this.params.agentName = this.initParams.agentName;
      this.params.financialOfficer = this.initParams.financialOfficer;
      this.params.financialOfficerEmail = this.initParams.financialOfficerEmail;
      this.params.financialOfficerMobile = this.initParams.financialOfficerMobile;
      this.params.partyADockingPerson = this.initParams.partyADockingPerson;
      this.params.partyADockingPersonEmail = this.initParams.partyADockingPersonEmail;
      this.params.partyADockingPersonMobile = this.initParams.partyADockingPersonMobile;
    },
    changgeNum() {
      var re = /^[0-9]+.?[0-9]*/; //判断字符串是否为数字//判断正整数/[1−9]+[0−9]∗]∗/
      if (!re.test(this.params.partyADockingPersonMobile)) {
        this.params.partyADockingPersonMobile = ""
        return
      }
    },
      //输入验证
    btKeyDown(e) {
      let flag = reg.test(e.target.value);
      //允许输入0
      if (!flag && "0" !== e.target.value + "") {
        e.target.value = "";
      }
    },
    //传递合同双方签署信息
    sendSigningF() {
      //让params参数指向不同指针防止父组件修改数据
      let submitParams = JSON.parse(JSON.stringify(this.params));
      this.$emit("contractSigning", {
        data: submitParams,
      });
    },
  },
};
</script>
<style lang="less" scoped>
/deep/ .el-input__inner {
  line-height: 1;
}
/deep/ .el-checkbox {
  display: flex;
  align-items: center;
}
/deep/ .el-checkbox__input {
  display: flex;
  height: 0.14rem;
}
/deep/ .el-radio {
  display: flex;
  align-items: center;
}
/deep/ .el-radio__input {
  display: flex;
  height: 0.14rem;
}
.i-icon {
  font-size: 0.14rem;
  margin-right: 0.05rem;
  height: 0.3rem;
  color: #444444;
  line-height: 0.28rem;
}
.basic {
  margin-top: 0.45rem;
  .basic_line {
    width: 10.1rem;
    border: solid 0.01rem #d6dfe6;
    opacity: 0.41;
    margin-top: 0.3rem;
  }
  .basic_item_i {
    width: 9.9rem;
    height: 0.3rem;
    display: flex;
    align-items: center;
    margin-left: 0.2rem;
    margin-top: 0.16rem;
    /deep/ .el-input__suffix {
      display: flex;
      align-items: center;
    }
    .time {
      display: flex;
      align-items: center;
      /deep/ .el-date-editor {
        width: 2.5rem;
        margin-right: 0.3rem;
      }
      /deep/ .el-icon-date {
        display: none;
      }
      /deep/.el-range-input {
        line-height: 0.25rem;
      }
    }
    .jieyong {
      .el-input--small {
        margin-left: 0.1rem;
        margin-right: 0.3rem;
      }
    }
    .basic_item_i_title {
      width: 0.88rem;
      height: 0.3rem;
      text-align: right;
      line-height: 0.3rem;
      font-family: MicrosoftYaHei;
      font-size: 0.14rem;
      font-weight: normal;
      font-stretch: normal;
      letter-spacing: 0rem;
      color: #444444;
    }
    .right_title {
      font-size: 0.14rem;
      width: 0.57rem;
      display: flex;
      justify-content: space-between;
      margin-left: 0.31rem;
      color: #444444;
    }
    .right_title_a {
      font-size: 0.14rem;
      margin-left: 0.31rem;
      color: #444444;
    }
    .right_title_b {
      font-size: 0.14rem;
      margin-left: 0.3rem;
      color: #444444;
    }
    .right_title_c {
      font-size: 0.14rem;
      margin-left: 0.16rem;
      color: #444444;
    }
    /deep/ .el-checkbox {
      margin-right: 0.22rem;
    }
    .qianyue {
      display: flex;
      align-items: center;
      .yewu {
        margin-left: 0.53rem;
      }
    }
    .select_fanwei {
      display: flex;
      align-items: center;
    }
  }
  .basic_item_j {
    width: 10.1rem;
    height: 1.1rem;
    display: flex;
    margin-left: 0.2rem;
    margin-top: 0.16rem;
    /deep/ .el-textarea__inner {
      height: 1.1rem;
    }
    .basic_item_i_title {
      width: 0.88rem;
      height: 0.3rem;
      text-align: right;
      line-height: 0.3rem;
      font-family: MicrosoftYaHei;
      font-size: 0.14rem;
      font-weight: normal;
      font-stretch: normal;
      letter-spacing: 0rem;
      color: #444444;
    }
  }
  .basic_item_i_j {
    width: 9.9rem;
    height: auto;
    display: flex;
    margin-left: 0.2rem;
    margin-top: 0.16rem;
    .basic_item_i_title {
      width: 0.88rem;
      height: 0.3rem;
      text-align: right;
      line-height: 0.3rem;
      font-family: MicrosoftYaHei;
      font-size: 0.14rem;
      font-weight: normal;
      font-stretch: normal;
      letter-spacing: 0rem;
      color: #444444;
    }
    .jieyong {
      .jieyong_item {
        height: 0.32rem;
        display: flex;
        align-items: center;
        .select {
          width: 1.5rem;
        }
        .add {
          width: 0.5rem;
          margin-left: 0.1rem;
          display: flex;
          align-items: center;
          font-family: MicrosoftYaHei;
          font-size: 0.12rem;
          font-weight: normal;
          font-stretch: normal;
          letter-spacing: 0rem;
          color: #259cf3;
          .icon {
            width: 0.15rem;
            height: 0.15rem;
            margin-right: 0.05rem;
            background-image: url("../../../../assets/images/projectAgentInfo/common/addPeopleHover.png");
            background-size: contain;
          }
        }
      }
    }
  }
}

.nomust,
.must {
  display: flex;
  height: 0.3rem;
  line-height: 0.3rem;
}

.must::after {
  content: "* ";
  width: 0.02rem;
  height: 0.06rem;
  font-family: SimSun;
  font-size: 0.12rem;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #ff5a1f;
  margin-right: 0.08rem;
  line-height: 0.3rem;
}
.nomust::after {
  content: "*";
  visibility: hidden;
  width: 0.02rem;
  height: 0.06rem;
  font-family: SimSun;
  font-size: 0.12rem;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #ff5a1f;
  margin-right: 0.08rem;
}
.necessary {
  display: flex;
  align-items: center;
}
</style>
