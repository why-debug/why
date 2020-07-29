<template>
  <div class="basic">
    <dividingLine :title="`电子档上传`"></dividingLine>
    <div class="basic_item_i">
      <div class="basic_item_i_title">电子附件：</div>
      <div class="nomust"></div>
      <div class="select_fanwei">
        <el-radio v-model="params.electronicAccessories" label="1" :disabled="pageIndex ===3">是</el-radio>
        <el-radio v-model="params.electronicAccessories" label="2" :disabled="pageIndex ===3">否</el-radio>
      </div>
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
      </div>
    </div>

    <div class="basic_item_j">
      <div class="basic_item_i_title">备注说明：</div>
      <div class="nomust"></div>
      <el-input
        v-model="params.instructionManual"
        :style="{'width':'7.3rem','height':'1.1rem'}"
        type="textarea"
        placeholder="请输入备注说明"
        resize="none"
        :disabled="pageIndex ===3"
      ></el-input>
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
      propertyTypeList: [],
      params: {
        electronicAccessories: "", //电子附件0否1是
        instructionManual: "", //备注说明
        enclosureList: [
          {
            enclosureName: "",
            enclosurePath: "", //附件地址
            type: 2
          }
        ]
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
    sendElectronicFile() {
      this.params.electronicAccessories = parseInt(
        this.params.electronicAccessories
      );
      this.$emit("electronicFile", {
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
  margin: 0.45rem auto 0.3rem auto;
  .basic_item_i {
    width: 9.9rem;
    height: 0.3rem;
    display: flex;
    align-items: center;
    margin-left: 0.2rem;
    margin-top: 0.16rem;
    .basic_item_i_title {
      width: 1.02rem;
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
    height: 1.1rem;
    display: flex;
    margin-left: 0.2rem;
    margin-top: 0.16rem;
    /deep/ .el-textarea__inner {
      height: 1.1rem;
    }
    .basic_item_i_title {
      width: 1.02rem;
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

.nomust,
.must {
  display: flex;
  height: 0.3rem;
  line-height: 0.3rem;
  margin-right: 0.06rem;
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