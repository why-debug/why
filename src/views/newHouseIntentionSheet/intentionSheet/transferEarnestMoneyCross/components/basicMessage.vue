<template>
  <div class="basic">
    <dividingLine :title="`成交信息`"></dividingLine>
    <div class="basic_item_i">
      <div class="basic_item_i_title">成交部门</div>
      <div class="i-icon">:</div>
      <div class="nomust"></div>
      <el-input :style="{ width: '2.09rem' }"></el-input>

      <div class="basic_item_i_title">成交人员</div>
      <div class="i-icon">:</div>
      <div class="nomust"></div>
      <el-input :style="{ width: '2.09rem' }"></el-input>

      <div class="basic_item_i_title">部门编号</div>
      <div class="i-icon">:</div>
      <div class="nomust"></div>
      <el-input :style="{ width: '2.09rem' }"></el-input>
    </div>

    <div class="basic_item_i">
      <div class="basic_item_i_title">按揭部门</div>
      <div class="i-icon">:</div>
      <div class="nomust"></div>
      <el-input :style="{ width: '2.09rem' }"></el-input>

      <div class="basic_item_i_title">按揭专员</div>
      <div class="i-icon">:</div>
      <div class="nomust"></div>
      <el-input :style="{ width: '2.09rem' }"></el-input>

      <div class="basic_item_i_title">转款日期</div>
      <div class="i-icon">:</div>
      <div class="nomust"></div>
      <el-date-picker
        v-model="params.ourContractedCompany"
        type="date"
        :style="{ width: '2.09rem' }"
        value-format="yyyy-MM-dd"
        placeholder=""
      >
      </el-date-picker>
    </div>

    <div class="basic_item_j" style="height:1.1rem">
      <div class="basic_item_i_title ">备注</div>
      <div class="i-icon">:</div>
      <div class="nosmust"></div>
      <div class="qianyue">
        <el-input
          :style="{ width: '8.67rem', height: '1.1rem' }"
          resize="none"
          type="textarea"
          maxlength="1000"
          rows="5"
          show-word-limit
          v-model="params.ourContractedCompany"
        ></el-input>
      </div>
    </div>

    <div class="basic_item_i">
      <div class="basic_item_i_title">原物业</div>
      <div class="i-icon">:</div>
      <div class="nomust"></div>
      <el-input :style="{ width: '2.09rem' }"></el-input>

      <div class="basic_item_i_title">合计已收</div>
      <div class="i-icon">:</div>
      <div class="nomust"></div>
      <el-input :style="{ width: '2.09rem' }"></el-input>
    </div>

    <div class="basic_item_i">
      <div class="basic_item_i_title">转入物业</div>
      <div class="i-icon">:</div>
      <div class="nomust"></div>
      <el-input
        :style="{ width: '2.09rem' }"
        readonly
        @click.native="selectProperty"
      ></el-input>

      <div class="basic_item_i_title">合计转入</div>
      <div class="i-icon">:</div>
      <div class="nomust"></div>
      <el-input :style="{ width: '2.09rem' }"></el-input>
    </div>

    <dividingLine :title="`转出物业情况`"></dividingLine>

    <div class="basic_item_i">
      <div class="basic_item_i_title">转出物业</div>
      <div class="i-icon">:</div>
      <div class="nomust"></div>
      <el-input :style="{ width: '2.09rem' }"></el-input>

      <div class="basic_item_i_title">成交编号</div>
      <div class="i-icon">:</div>
      <div class="nomust"></div>
      <el-input :style="{ width: '2.09rem' }"></el-input>
    </div>

    <div class="basic_item_i">
      <div class="basic_item_i_title">转出物业客户名称</div>
      <div class="i-icon">:</div>
      <div class="nomust"></div>
      <el-input :style="{ width: '2.09rem' }"></el-input>

      <div class="basic_item_i_title">转款用途</div>
      <div class="i-icon">:</div>
      <div class="nomust"></div>
      <el-input :style="{ width: '2.09rem' }"></el-input>
    </div>

    <div class="basic_item_i">
      <div class="basic_item_i_title">转款原因</div>
      <div class="i-icon">:</div>
      <div class="nomust"></div>
      <el-input :style="{ width: '2.09rem' }"></el-input>
    </div>

    <dividingLine :title="`转入物业情况`"></dividingLine>

    <div class="basic_item_i">
      <div class="basic_item_i_title">转入成交报告单</div>
      <div class="i-icon">:</div>
      <div class="nomust"></div>
      <el-input :style="{ width: '2.09rem' }"></el-input>

      <div class="basic_item_i_title">物业名称</div>
      <div class="i-icon">:</div>
      <div class="nomust"></div>
      <el-input :style="{ width: '2.09rem' }"></el-input>
    </div>

    <div class="basic_item_i">
      <div class="basic_item_i_title">转入方</div>
      <div class="i-icon">:</div>
      <div class="nomust"></div>
      <el-input :style="{ width: '2.09rem' }"></el-input>

      <div class="basic_item_i_title">转入款项</div>
      <div class="i-icon">:</div>
      <div class="nomust"></div>
      <el-input :style="{ width: '2.09rem' }"></el-input>

      <div class="basic_item_i_title">转入金额</div>
      <div class="i-icon">:</div>
      <div class="nomust"></div>
      <el-input :style="{ width: '2.09rem' }"></el-input>
    </div>

    <div class="basic_item_i">
      <div class="basic_item_i_title">操作时间</div>
      <div class="i-icon">:</div>
      <div class="nomust"></div>
      <el-input :style="{ width: '2.09rem' }"></el-input>

      <div class="basic_item_i_title">是否主体变更</div>
      <div class="i-icon">:</div>
      <div class="nomust"></div>
      <el-input :style="{ width: '2.09rem' }"></el-input>

      <div class="basic_item_i_title">变更时间</div>
      <div class="i-icon">:</div>
      <div class="nomust"></div>
      <el-input :style="{ width: '2.09rem' }"></el-input>
    </div>

    <div class="basic_item_i">
      <div class="basic_item_i_title">变更后主体名称</div>
      <div class="i-icon">:</div>
      <div class="nomust"></div>
      <el-input :style="{ width: '2.09rem' }"></el-input>
    </div>

    <!-- 选择物业 弹窗 -->
    <selectProperty
      v-if="isSelectProperty"
      @f_closeView="closDealView"
    ></selectProperty>
  </div>
</template>
<script>
import dividingLine from "./dividingLine";
import selectProperty from "./selectProperty";
const reg = /^[1-9]\d{0,11}$/;
export default {
  components: {
    dividingLine,
    selectProperty,
  },
  data() {
    return {
      isSelectProperty:false,//是否显示转入物业弹窗
      params: {
        agencyScope: "", //代理范围
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
          { select: 0, type: 4, otherName: "" }, //委托书
        ],
        dataSheetList: [],
        ourContractedCompany: "", //我方签约公司
        agencyBusiness: "", //代理业务 1新房代理 2租赁代理 3租售一体
        whetherStamped: "", //是否盖章,
        corporateChapterRemarks: "", //法人章备注
        stamped: {
          contract: 0, //合同章
          Official: 0, //公章
          legal: 0, //法人章
          business: 0, //业务专用章
          financial: 0, //财务专用章
        },
        stampType: [], //盖章类型  1 合同章 2 公章 3法人章 4业务专用章 5财务专用章 （多个用,隔开）
        dealNum: "", //合同份数
        contractDetailsList: [
          {
            fileName: "", //盖章文件名
            pages: "", //页数
            servings: "", //份数
          },
        ],
        //推广名信息
        promotionScopeList: [],
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
    //编辑或详情初始化数据
    initParams: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  computed: {},
  methods: {
    //打开选择项目弹窗
    selectProperty() {
      this.isSelectProperty = true;
      document.body.style.overflow = "hidden"; //禁止页面滚动
    },
    //关闭选择项目弹窗
    closDealView() {
      this.isSelectProperty = false;
      document.body.style.overflow = ""; //禁止页面滚动
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
/deep/ .el-date-editor {
  .el-input__prefix {
    left: auto;
    right: 0.06rem;
  }
}

.basic {
  margin-top: 0.45rem;
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
          width: 1.74rem;
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
          width: 1.74rem;
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
            background-image: url("../../../../../assets/images/projectAgentInfo/common/del_200.png");
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
      font-size: 0.14rem;
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
          width: 1.74rem;
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
          width: 1.74rem;
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
            background-image: url("../../../../../assets/images/projectAgentInfo/common/addPeopleHover.png");
            background-size: contain;
          }
          .icon1 {
            background-image: url("../../../../../assets/images/projectAgentInfo/common/del_200.png");
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
    background-image: url("../../../../../assets/images/projectAgentInfo/agentContract/drop_102_200.png");
    background-repeat: no-repeat;
    background-size: cover;
  }
}
</style>
