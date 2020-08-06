<template>
  <div class="basic">
    <dividingLine :title="`基本信息`"></dividingLine>
    <div class="basic_item_i">
      <div class="basic_item_i_title">分销范围</div>
      <div class="i-icon">:</div>
      <div class="must"></div>
      <el-select v-model="params.distributionRange" @change="resetTui" :disabled="pageIndex ===3">
        <el-option
          v-for="item in distributionProjectList"
          :key="item.label"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
    </div>
    <div class="basic_item_i" v-if="params.distributionRange===2">
      <div class="basic_item_i_title item_name">
        <div class="btw">
          <div>推</div>
          <div>广</div>
          <div>名</div>
        </div>
      </div>
      <div class="i-icon">:</div>
      <div class="nomust"></div>
      <el-input
        disabled
        :style="{'width':'1.7rem'}"
        suffix-icon="el-icon-arrow-down"
        @click.native="pageIndex ===3?'':showTui()"
      ></el-input>
    </div>
    <div class="basic_tui" v-if="params.distributionRange===2">
      <div class="list_tui">
        <div class="list_title">
          <div class="guang">推广名</div>
          <div class="zhuce">注册名</div>
          <div class="dizhi">项目地址</div>
          <div class="city">所属城市</div>
        </div>
        <div class="list_item" v-for="(item,index) in params.promotionScopeList" :key="index">
          <div class="guang yincang">{{item.buildName}}</div>
          <div class="zhuce yincang">{{item.mlLoginName}}</div>
          <div class="dizhi yincang">{{item.buildAddr}}</div>
          <div class="city yincang">{{item.cityName}}</div>
          <div class="opera">
            <div class="icon" @click="removeTui(index)"></div>
          </div>
        </div>
      </div>
    </div>

    <div class="basic_item_i">
      <div class="basic_item_i_title">合同名称</div>
      <div class="i-icon">:</div>
      <div class="must"></div>
      <el-input :style="{'width':'7.3rem'}" maxlength="20" :disabled="pageIndex ===3" v-model="params.dealName"></el-input>
    </div>
    <div class="basic_item_i">
      <div class="basic_item_i_title">我方必备资料</div>
      <div class="i-icon">:</div>
      <div class="nomust"></div>
      <div class="necessary">
        <el-checkbox v-model="params.necessaryInformation[1].select" :disabled="pageIndex ===3">营业执照</el-checkbox>
        <el-checkbox v-model="params.necessaryInformation[2].select" :disabled="pageIndex ===3">法人代表证明</el-checkbox>
        <el-checkbox v-model="params.necessaryInformation[3].select" :disabled="pageIndex ===3">法人代表身份证</el-checkbox>
        <el-checkbox v-model="params.necessaryInformation[4].select" :disabled="pageIndex ===3">授权委托书</el-checkbox>
        <el-checkbox v-model="params.necessaryInformation[0].select" :disabled="pageIndex ===3">其他</el-checkbox>
      </div>
      <div class="other">
        <el-input
          :style="{'width':'1.7rem'}"
          maxlength="20"
          v-model="params.necessaryInformation[0].otherName"
          :disabled="pageIndex ===3"
        ></el-input>
      </div>
    </div>
    <div class="basic_item_i">
      <div class="basic_item_i_title">我方签约公司</div>
      <div class="i-icon">:</div>
      <div class="nomust"></div>
      <div class="qianyue">
        <el-select :style="{'width':'4.37rem'}" v-model="params.ourContractedCompany" :disabled="pageIndex ===3">
          <el-option
            v-for="item in companyList"
            :key="item.label"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>
    </div>
    <div class="basic_item_i">
      <div class="basic_item_i_title">是否盖章</div>
      <div class="i-icon">:</div>
      <div class="must"></div>
      <div class="necessary">
        <el-radio v-model="params.whetherStamped" label="1" :disabled="pageIndex ===3">是</el-radio>
        <el-radio v-model="params.whetherStamped" label="2" :disabled="pageIndex ===3">否</el-radio>
      </div>
    </div>
    <div class="basic_item_i">
      <div class="basic_item_i_title">盖章类型</div>
      <div class="i-icon">:</div>
      <div class="nomust"></div>
      <div class="necessary">
        <el-checkbox v-model="params.stamped.contract" :disabled="pageIndex ===3">合同章</el-checkbox>
        <el-checkbox v-model="params.stamped.Official" :disabled="pageIndex ===3">公章</el-checkbox>
        <el-checkbox v-model="params.stamped.legal" @change="deleteLeagl" :disabled="pageIndex ===3">法人章</el-checkbox>
        <el-checkbox v-model="params.stamped.business" :disabled="pageIndex ===3">业务专用章</el-checkbox>
        <el-checkbox v-model="params.stamped.financial" :disabled="pageIndex ===3">财务专用章</el-checkbox>
      </div>
    </div>
    <div class="basic_item_j" v-if="params.stamped.legal==1">
      <div class="basic_item_i_title">法人章备注</div>
      <div class="i-icon">:</div>
      <div class="nomust"></div>
      <el-input
        :style="{'width':'7.28rem','height':'1.1rem'}"
        v-model="params.corporateChapterRemarks"
      ></el-input>
    </div>
    <div class="basic_hetong">
      <div class="basic_item">
        <div class="basic_tui_name">合同份数</div>
        <div class="i-icon">:</div>
        <div class="nomust"></div>
        <el-input :style="{'width':'1.7rem'}" maxlength="20" v-model="params.dealNum" :disabled="pageIndex ===3">
          <span slot="suffix">份</span>
        </el-input>
      </div>
      <div class="list_hetong">
        <div class="list_title">
          <div class="guang">盖章文件</div>
          <div class="zhuce">份数</div>
          <div class="daili">页数</div>
        </div>
        <div class="list_item" v-for="(item,index) in params.contractDetailsList" :key="index">
          <div class="guang">
            <el-input :style="{'width':'2.72rem'}" maxlength="20" v-model="item.fileName" :disabled="pageIndex ===3"></el-input>
          </div>
          <div class="zhuce">
            <el-input :style="{'width': '0.98rem'}" maxlength="20" v-model="item.servings" :disabled="pageIndex ===3"></el-input>
          </div>
          <div class="daili">
            <el-input :style="{'width': '0.98rem'}" maxlength="20" v-model="item.pages" :disabled="pageIndex ===3"></el-input>
          </div>
          <div class="opera" v-if="!pageIndex ===3">
            <div class="icon" :class="{'icon1':index!==0}" @click="addContract(index)"></div>
          </div>
        </div>
      </div>
    </div>
    <promoteToast v-if="showPromote" @closeView="closeView" @saveView="saveView"></promoteToast>
  </div>
</template>
<script>
import dividingLine from "./dividingLine";
import promoteToast from "../../form/promoteToast";
export default {
  components: {
    dividingLine,
    promoteToast
  },
  data() {
    return {
      showPromote: false, //是否展示推广名列表
      propertyTypeList: [],
      //分销范围
      distributionProjectList: [
        { label: "分销指定项目", value: 2 },
        { label: "分销全部项目", value: 1 }
      ],
      companyList: [
        { label: "公司1", value: 2 },
        { label: "公司2", value: 1 }
      ],
      tuiGuangList: [
        { label: "分销指定项目", value: 2 },
        { label: "分销全部项目", value: 1 }
      ],
      params: {
        distributionRange: 2, //分销范围
        dealName: "", //合同名称
        // necessaryInformation: {
        //   businessLicense: 0, //营业执照
        //   prove: 0, //法人代表证明
        //   identity: 0, //法人代表身份证
        //   attorney: 0, //委托书
        //   other: 0, //其他
        // },
        necessaryInformation: [
          { select: 0, type: 0, otherName: "" }, //其他
          { select: 0, type: 1, otherName: "" }, //营业执照
          { select: 0, type: 2, otherName: "" }, //法人代表证明
          { select: 0, type: 3, otherName: "" }, //法人代表身份证
          { select: 0, type: 4, otherName: "" } //委托书
        ],
        dataSheetList: [],
        ourContractedCompany: "", //我方签约公司
        whetherStamped: "", //是否盖章,
        corporateChapterRemarks: "", //法人章备注
        stamped: {
          contract: 0, //合同章
          Official: 0, //公章
          legal: 0, //法人章
          business: 0, //业务专用章
          financial: 0 //财务专用章
        },
        stampType: [], //盖章类型  1 合同章 2 公章 3法人章 4业务专用章 5财务专用章 （多个用,隔开）
        dealNum: "", //合同份数
        contractDetailsList: [
          {
            fileName: "", //盖章文件名
            pages: "", //页数
            servings: "" //份数
          }
        ],
        //推广名信息
        promotionScopeList: []
      },
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
  computed: {},
  methods: {
    //合同份数增加
    addContract(index) {
      if (index === 0) {
        this.params.contractDetailsList.push({
          fileName: "", //盖章文件名
          pages: "", //页数  int
          servings: "" //份数 int
        });
      } else {
        this.params.contractDetailsList.splice(index, 1);
      }
    },
    //清空法人章备注
    deleteLeagl() {
      this.params.corporateChapterRemarks = "";
    },
    basicChange() {
      //0其他 1 营业执照 2 法人代表证明 3法人代表身份证 4授权委托书
      this.params.dataSheetList = [];
      this.params.necessaryInformation.forEach(item => {
        if (item.select !== 0) {
          let obj = {};
          obj.dataName = item.otherName;
          obj.dataStatus = "";
          obj.dataType = item.type;
          obj.type = 1;
          this.params.dataSheetList.push(obj);
        }
      });
      if (this.params.stamped.contract == 1) {
        this.params.stampType.push(1);
      }
      if (this.params.stamped.Official == 1) {
        this.params.stampType.push(2);
      }
      if (this.params.stamped.legal == 1) {
        this.params.stampType.push(3);
      }
      if (this.params.stamped.business == 1) {
        this.params.stampType.push(4);
      }
      if (this.params.stamped.financial == 1) {
        this.params.stampType.push(5);
      }
      this.params.whetherStamped = parseInt(this.params.whetherStamped);
      //合同份数
      if (this.params.dealName) {
        this.params.dealNum = parseInt(this.params.dealNum);
      }
      this.params.contractDetailsList.forEach(item => {
        if (item.pages) {
          parseInt(item.pages);
        }
        if (item.pservingsges) {
          parseInt(item.servings);
        }
      });
      this.params.stampType.join(",");
      this.$emit("basicData", {
        data: this.params
      });
    },
    //展示推广名列表
    showTui() {
      this.showPromote = true;
      document.body.style.overflow = "hidden"; //禁止页面滚动
    },
    closeView(val) {
      this.showPromote = val;
      document.body.style.overflow = "";
    },
    saveView(val) {
      console.log(val);
      this.showPromote = val.status;
      document.body.style.overflow = "";
      this.params.promotionScopeList = val.list;
    },
    //移出推广名
    removeTui(index) {
      this.params.promotionScopeList.splice(index, 1);
    },
    //分销范围为全部的时候置空列表
    resetTui() {
      if (this.params.distributionRange === 2) {
        this.params.promotionScopeList = [];
      }
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
.basic {
  width: 10.2rem;
  margin: 0.45rem auto auto auto;
  .basic_tui {
    width: 9.52rem;
    height: auto;
    margin-left: 0.65rem;
    .basic_item {
      width: 100%;
      height: 0.3rem;
      display: flex;
      align-items: center;
      margin-top: 0.1rem;
      .basic_tui_name {
        width: 0.64rem;
        font-family: MicrosoftYaHei;
        font-size: 0.14rem;
        font-weight: normal;
        font-stretch: normal;
        line-height: 0.3rem;
        letter-spacing: 0rem;
        color: #444444;
        display: flex;
        justify-content: space-around;
      }
    }
    .list_tui {
      width: 8.65rem;
      height: auto;
      margin-left: 0.65rem;
      margin-top: 0.1rem;
      background-color: #ffffff;
      border-radius: 0.02rem;
      .list_title {
        width: 7.32rem;
        height: 0.5rem;
        background-color: #f5f6fa;
        border: solid 0.01rem #ebebeb;
        line-height: 0.5rem;
        border-radius: 0.02rem;
        display: flex;
        font-family: MicrosoftYaHei;
        font-size: 0.13rem;
        font-weight: normal;
        font-stretch: normal;
        line-height: 0.48rem;
        letter-spacing: 0rem;
        color: #999999;
        box-sizing: border-box;
        .guang {
          width: 1.68rem;
          text-indent: 0.22rem;
        }
        .zhuce {
          width: 1.68rem;
          text-indent: 0.22rem;
        }
        .daili {
          width: 1.6rem;
          text-indent: 0.22rem;
        }
        .dizhi {
          width: 2.21rem;
          text-indent: 0.22rem;
        }
        .city {
          width: 1.02rem;
          text-indent: 0.22rem;
        }
      }
      .list_item {
        width: 7.3rem;
        height: 0.5rem;
        background-color: #fafafa;
        border: solid 0.01rem #ebebeb;
        border-top: none;
        line-height: 0.5rem;
        border-radius: 0.02rem;
        display: flex;
        align-items: center;
        font-family: MicrosoftYaHei;
        font-size: 0.14rem;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0rem;
        box-sizing: border-box;
        color: #444444;
        .guang {
          width: 1.68rem;
          text-indent: 0.22rem;
        }
        .zhuce {
          width: 1.68rem;
          text-indent: 0.22rem;
        }
        .daili {
          width: 1.6rem;
          text-indent: 0.22rem;
        }
        .dizhi {
          width: 2.21rem;
          text-indent: 0.22rem;
        }
        .city {
          width: 1.02rem;
          text-indent: 0.22rem;
        }
        .opera {
          width: 0.69rem;
          height: 0.5rem;
          position: relative;
          border-left: solid 0.01rem #ebebeb;
          .icon {
            width: 0.15rem;
            height: 0.15rem;
            position: absolute;
            left: 0;
            top: 0;
            right: 0;
            bottom: 0;
            margin: auto;
            background-image: url("../../../../assets/images/projectAgentInfo/common/del_200.png");
            background-size: contain;
          }
        }
      }
    }
  }
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
    .item_name {
      display: flex;
    }
    .other {
      margin-left: -0.06rem;
    }
    .btw {
      margin-left: 0.32rem;
      width: 0.56rem;
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-pack: justify;
      -ms-flex-pack: justify;
      justify-content: space-between;
    }
    .necessary {
      display: flex;
      align-items: center;
    }
    .i-icon {
      font-size: 0.14rem;
      margin-right: 0.05rem;
      height: 0.3rem;
      color: #444444;
      line-height: 0.28rem;
    }
    /deep/ .el-checkbox {
      margin-right: 0.2rem;
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
    /deep/ .el-select--small {
      width: 1.7rem;
      height: 0.3rem;
    }
    /deep/.el-input.is-disabled .el-input__inner {
      background-color: #fff;
      cursor: pointer;
    }
  }
  .basic_item_j {
    width: 10.1rem;
    height: 0.3rem;
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
  .basic_hetong {
    width: 9.52rem;
    height: auto;
    margin-left: 0.65rem;
    margin-bottom: 0.2rem;
    /deep/ .el-input__suffix {
      display: flex;
      align-items: center;
    }
    .basic_item {
      width: 100%;
      height: 0.3rem;
      display: flex;
      align-items: center;
      margin-top: 0.1rem;
      .basic_tui_name {
        width: 0.59rem;
        font-family: MicrosoftYaHei;
        font-size: 0.14rem;
        font-weight: normal;
        font-stretch: normal;
        line-height: 0.3rem;
        letter-spacing: 0rem;
        color: #444444;
        margin-left: -0.16rem;
        display: flex;
        justify-content: space-around;
      }
      .i-icon {
        font-size: 0.14rem;
        margin-right: 0.05rem;
        height: 0.3rem;
        color: #444444;
        line-height: 0.28rem;
      }
    }
    .list_hetong {
      width: 8.65rem;
      height: auto;
      margin-left: 0.65rem;
      margin-top: 0.1rem;
      background-color: #ffffff;
      border-radius: 0.02rem;
      .list_title {
        width: 7.31rem;
        height: 0.5rem;
        background-color: #f5f6fa;
        border: solid 0.01rem #ebebeb;
        line-height: 0.5rem;
        border-radius: 0.02rem;
        display: flex;
        font-family: MicrosoftYaHei;
        font-size: 0.13rem;
        font-weight: normal;
        font-stretch: normal;
        line-height: 0.48rem;
        letter-spacing: 0rem;
        color: #999999;
        box-sizing: border-box;
        .guang {
          width: 3.43rem;
          text-indent: 0.22rem;
        }
        .zhuce {
          width: 1.62rem;
          text-indent: 0.22rem;
        }
        .daili {
          width: 1.62rem;
          text-indent: 0.22rem;
        }
      }
      .list_item {
        width: 7.31rem;
        height: 0.5rem;
        background-color: #fafafa;
        border: solid 0.01rem #ebebeb;
        border-top: none;
        line-height: 0.5rem;
        border-radius: 0.02rem;
        display: flex;
        align-items: center;
        font-family: MicrosoftYaHei;
        font-size: 0.14rem;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0rem;
        box-sizing: border-box;
        color: #444444;
        .guang {
          width: 3.43rem;
          text-indent: 0.22rem;
          display: flex;
          align-items: center;
          /deep/ el-input {
            height: 0.35rem;
          }
        }
        .zhuce {
          width: 1.62rem;
          text-indent: 0.1rem;
          align-items: center;
          /deep/ el-input {
            height: 0.35rem;
          }
        }
        .daili {
          width: 1.62rem;
          text-indent: 0.1rem;
          align-items: center;
          /deep/ el-input {
            height: 0.35rem;
          }
        }

        .opera {
          width: 0.69rem;
          height: 0.5rem;
          position: relative;
          border-left: solid 0.01rem #ebebeb;
          .icon {
            width: 0.15rem;
            height: 0.15rem;
            position: absolute;
            left: 0;
            top: 0;
            right: 0;
            bottom: 0;
            margin: auto;
            background-image: url("../../../../assets/images/projectAgentInfo/common/addPeopleHover.png");
            background-size: contain;
          }
          .icon1 {
            background-image: url("../../../../assets/images/projectAgentInfo/common/del_200.png");
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
.yincang {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
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
.tuiguang {
  width: 1.7rem;
  height: 0.3rem;
  background-color: #fdfdfd;
  border-radius: 0.03rem;
  border: 1px solid #dcdfe6;
  box-sizing: border-box;
  cursor: pointer;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  .left {
    width: 0.09rem;
    height: 0.05rem;
    margin-right: 0.1rem;
    background-image: url("../../../../assets/images/projectAgentInfo/agentContract/drop_102_200.png");
    background-repeat: no-repeat;
    background-size: cover;
  }
}
</style>