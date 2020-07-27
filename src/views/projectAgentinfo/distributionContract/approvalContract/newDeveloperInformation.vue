<template>
  <div class="basic">
    <dividingLine :title="`分销公司缺失资料上传`"></dividingLine>
    <div class="basic_item_i_j">
      <div class="basic_item_i_title select_item">缺失资料</div>
      <div class="i-icon1">:</div>
      <div class="nomust"></div>
      <div class="jieyong">
        <div class="jieyong_item first">
          <el-checkbox v-model="params.businessLicense.select" :disabled="pageIndex ===3">营业执照</el-checkbox>
          <el-checkbox v-model="params.openingPermit.select" :disabled="pageIndex ===3">开户许可证/开户信息</el-checkbox>
        </div>
        <div class="jieyong_item other">
          <el-checkbox v-model="params.legalRepresentative.select" :disabled="pageIndex ===3">法人代表身份证</el-checkbox>
          <el-checkbox v-model="params.other.select" :disabled="pageIndex ===3">其他</el-checkbox>
          <el-input v-model="params.other.dataName" :style="{'width':'2.5rem'}" maxlength="20" :disabled="pageIndex ===3"></el-input>
        </div>
      </div>
    </div>
    <div class="basic_item_j">
      <div class="basic_item_i_title">缺失原因</div>
      <div class="i-icon">:</div>
      <div class="nomust"></div>
      <el-input
        v-model="params.missingReason"
        :style="{'width':'7.3rem','height':'1.1rem'}"
        type="textarea"
        resize="none"
        :disabled="pageIndex ===3"
      ></el-input>
    </div>
    <div class="basic_item_add">
      <div class="fujian">
        <div class="icon"></div>
        <div>添加附件</div>
      </div>
      <div class="fujian_list">
        <div class="wenjian_item">
          <div class="item_img"></div>
          <div class="item_size">
            <div class="w_title">青年一号</div>
            <div class="w_size">58k</div>
          </div>
        </div>
        <div class="wenjian_item">
          <div class="item_img"></div>
          <div class="item_size">
            <div class="w_title">青年一号</div>
            <div class="w_size">58k</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import dividingLine from "./dividingLine";
export default {
  components: {
    dividingLine
  },
  data() {
    return {
      checked: "",
      propertyTypeList: [],
      params: {
        businessLicense: {
          select: 0, //
          dataName: "", //..
          dataType: 1, //
          type: 3,
          dataStatus: "" //1原件2复印件
        }, //营业执照

        openingPermit: {
          select: 0, //
          dataName: "", //..
          dataType: 13, //
          type: 3,
          dataStatus: "" //1原件2复印件
        }, //开户许可证/开户信息

        legalRepresentative: {
          select: 0, //
          dataName: "", //..
          dataType: 3, //
          type: 3,
          dataStatus: "" //1原件2复印件
        }, //法人代表身份证
        other: [
          {
            select: 0, //
            dataName: "", //..
            dataType: 0, //
            type: 3,
            dataStatus: "" //1原件2复印件
          } //其他
        ],
        missingReason: "", //缺失原因
        //附件
        enclosureList: [
          {
            enclosureName: "",
            enclosurePath: "", //附件地址
            type: 1
          }
        ],
        sheetList: []
      }
    };
  },
  props:{
    //当前操作界面索引(1.新增 2.编辑 3.详情)
    pageIndex:{
      type:Number,
      default(){
        return 1;
      }
    }
  },
  methods: {
    sendDevelopment() {
      if (this.params.businessLicense.select == 1) {
        this.params.sheetList.push(this.params.businessLicense);
      }
      if (this.params.openingPermit.select == 1) {
        this.params.sheetList.push(this.params.openingPermit);
      }
      if (this.params.legalRepresentative.select == 1) {
        this.params.sheetList.push(this.params.legalRepresentative);
      }
      if (this.params.other.select == 1) {
        this.params.sheetList.push(this.params.other);
      }
      this.$emit("developerInfomation", {
        data: this.params
      });
    }
  }
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
/deep/ .el-input__inner {
  height: 0.3rem;
}
.basic {
  width: 10.2rem;
  margin: 0.45rem auto auto auto;

  .basic_item_i {
    width: 9.9rem;
    height: 0.3rem;
    display: flex;
    align-items: center;
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
    height: auto;
    display: flex;
    margin-left: 0.2rem;
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
    .select_item {
      height: 0.19rem;
      line-height: 0.19rem;
    }
    .jieyong {
      margin-bottom: 0.1rem;
      .jieyong_item {
        display: flex;
        align-items: center;
        // margin-bottom: 0.15rem;
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
            border: solid 0.01rem #259cf3;
            margin-right: 0.05rem;
          }
        }
      }
      .other {
        margin-top: 0.05rem;
        /deep/ .el-input__inner {
          margin-left: 0.1rem;
        }
      }
      .first {
        margin-top: 0.05rem;
      }
    }
  }
  .basic_item_add {
    width: 8.67rem;
    height: auto;
    margin-left: 1.38rem;
    margin-top: 0.1rem;
    .fujian {
      height: 0.2rem;
      display: flex;
      align-items: center;
      font-family: SimSun;
      font-size: 0.12rem;
      font-weight: normal;
      font-stretch: normal;
      letter-spacing: 0rem;
      color: #259cf3;
      .icon {
        width: 0.12rem;
        height: 0.13rem;
        margin-right: 0.05rem;
        background-image: url("../../../../assets/images/projectAgentInfo/agentContract/fjHover_200.png");
        background-repeat: no-repeat;
        background-size: cover;
      }
    }
    .fujian_list {
      height: auto;
      display: flex;
      align-items: center;
      .wenjian_item {
        display: block;
        width: 1.78rem;
        height: 0.44rem;
        background-color: #f3f3f3;
        border-radius: 0.04rem;
        margin-right: 0.1rem;
        margin-top: 0.1rem;
        display: flex;
        align-items: center;
        .item_img {
          width: 0.24rem;
          height: 0.3rem;
          background-color: #ff5a1f;
          margin-left: 0.1rem;
        }
        .item_size {
          width: 1.2rem;
          height: 0.3rem;
          margin-left: 0.1rem;
          .w_title {
            font-family: MicrosoftYaHei;
            font-size: 0.12rem;
            font-weight: normal;
            font-stretch: normal;
            letter-spacing: 0rem;
            color: #444444;
          }
          .w_size {
            font-family: MicrosoftYaHei;
            font-size: 0.12rem;
            font-weight: normal;
            font-stretch: normal;
            letter-spacing: 0rem;
            color: #999999;
          }
        }
      }
    }
  }
}
.i-icon {
  font-size: 0.14rem;
  margin-right: 0.05rem;
  height: 0.3rem;
  color: #444444;
  line-height: 0.28rem;
}
.i-icon1 {
  font-size: 0.14rem;
  margin-right: 0.05rem;
  height: 0.19rem;
  color: #444444;
  line-height: 0.18rem;
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
</style>