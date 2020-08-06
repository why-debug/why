<template>
  <div class="project_info">
    <main>
      <form_header :title="title" :icon_name="icon_name" />
      <el-form
        :rules="rules"
        :inline="true"
        :model="project_info"
        class="demo-form-inline"
      >
        <section>
          <el-form-item prop="reportType">
            <div class="input_title required">
              <span>类</span><span>型</span>
            </div>
            <el-select class="no_icon" v-model="project_info.projectType">
              <el-option label="直销  " value="1"></el-option>
              <el-option label="分销" value="2"></el-option>
              <el-option label="租赁" value="3"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <div class="input_title required">
              <span>制</span><span>单</span><span>人</span>
            </div>
            <el-input
              v-model="project_info.makeSheetPerson"
              disabled
            ></el-input>
          </el-form-item>
          <el-form-item prop="cooperationType">
            <div class="input_title">
              <span>制</span><span>单</span><span>日</span><span>期</span>
            </div>
            <el-date-picker
              v-model="project_info.makeSheetDate"
              value-format="yyyy-MM-dd"
              type="date"
              disabled
            >
            </el-date-picker>
          </el-form-item>
        </section>
        <section>
          <!-- <el-form-item prop="reportType">
            <div class="input_title required">
              <span>类</span><span>型</span>
            </div>
            <el-select class="no_icon" v-model="project_info.reportType">
              <el-option label="直销  " value="1"></el-option>
              <el-option label="分销" value="2"></el-option>
              <el-option label="租赁" value="3"></el-option>
            </el-select>
          </el-form-item> -->
          <el-form-item prop="reportClass">
            <div class="input_title required">
              <span>类</span><span>别</span>
            </div>
            <el-select
              class="no_icon"
              v-model="project_info.projectClass"
              placeholder="活动区域"
            >
              <el-option label="一般成交" value="1"></el-option>
              <el-option label="事后加佣" value="2"></el-option>
              <el-option label="口头代理费" value="3"></el-option>
              <el-option label="外区分佣" value="4"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="cooperationType">
            <div class="input_title">
              <span>主</span><span>单</span><span>号</span>
            </div>
            <el-autocomplete
              class="inline-input"
              :fetch-suggestions="querySearch"
              placeholder="事后加佣需要添加主单号"
              :trigger-on-focus="false"
              @select="handleSelect"
              :disabled="project_info.projectClass != 2"
              v-model="project_info.mainNo"
            ></el-autocomplete>
          </el-form-item>
        </section>
        <section>
          <el-form-item prop="cooperationType">
            <div class="input_title">
              <span>合</span><span>作</span><span>方</span><span>式</span>
            </div>
            <el-select class="no_icon" v-model="project_info.dealWay">
              <el-option label="跨区合作" value="1"></el-option>
              <el-option label="市内合作" value="2"></el-option>
              <el-option label="区内合作" value="3"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="cooperationType">
            <div class="input_title"><span>编</span><span>号</span></div>
            <el-input
              @click.native="searchProject"
              v-model="project_info.projectNumber"
              readonly
            ></el-input>
          </el-form-item>
        </section>

        <section v-show="project_info.projectClass == 4">
          <el-form-item prop="cooperationOutsideId">
            <div class="input_title required">
              <span>外</span><span>区</span><span>分</span><span>行</span>
            </div>
            <el-input v-model="project_info.cooperationOutsideId"></el-input>
          </el-form-item>
          <el-form-item prop="cooperationOutsideCityId">
            <div class="input_title">
              <div class="long_title">外区所在城市</div>
            </div>
            <el-input
              v-model="project_info.cooperationOutsideCityId"
            ></el-input>
          </el-form-item>
        </section>

        <section>
          <el-form-item>
            <div class="input_title required">
              <span>项</span><span>目</span>
            </div>
            <el-input
              @click.native="searchProject"
              v-model="project_info.projectName"
              readonly
            ></el-input>
          </el-form-item>

          <el-form-item prop="regId">
            <div class="input_title required">
              <span>物</span><span>业</span><span>信</span><span>息</span>
            </div>
            <el-input v-model="project_info.propertyInfo"></el-input>
          </el-form-item>
          <el-form-item prop="regId">
            <div class="input_title required">
              <span>片</span><span>区</span>
            </div>
            <el-input v-model="project_info.projectArea"></el-input>
          </el-form-item>
        </section>

        <section>
          <el-form-item>
            <div class="input_title"><span>用</span><span>途</span></div>
            <el-select
              v-model="project_info.projectUseage"
              @click.native="getbuildUseageOptions"
              placeholder="  "
            >
              <el-option
                v-for="(v, i) in build_useage_options"
                :key="i"
                :label="v.dicCnMsg"
                :value="v.dicValue"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="buildUseage">
            <div class="input_title"><span>户</span><span>型</span></div>
            <el-input v-model="project_info.houseType"></el-input>
          </el-form-item>
          <el-form-item prop="buildArea">
            <div class="input_title required">
              <span>建</span><span>筑</span><span>面</span><span>积</span>
            </div>
            <el-input maxlength="8" v-model="project_info.buildArea">
              <span slot="suffix">㎡</span>
            </el-input>
          </el-form-item>
        </section>

        <!-- <section>
        
          <el-form-item
            prop="type"
            v-if="
              project_info.buildUseage == 1 ||
                project_info.buildUseage == 2 ||
                project_info.buildUseage == 3 ||
                project_info.buildUseage == 8
            "
          >
            <div class="input_title"><span>类</span><span>型</span></div>
            <el-select
              v-model="project_info.buildType"
              @click.native="getTypeOptions"
              :disabled="!project_info.buildUseage"
            >
              <el-option
                v-for="(v, i) in type_options"
                :key="i"
                :label="v.dicCnMsg"
                :value="v.dicValue"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="class" v-if="project_info.buildUseage == 7">
            <div class="input_title"><span>级</span><span>别</span></div>
            <el-select
              v-model="project_info.buildLevelName"
              @click.native="getClassOptions"
            >
              <el-option
                v-for="(v, i) in class_options"
                :key="i"
                :label="v.dicCnMsg"
                :value="v.dicValue"
              ></el-option>
            </el-select>
          </el-form-item>
        </section> -->

        <section>
          <!-- todo -->
          <!-- <el-form-item prop="">
            <div class="input_title  required"><span>户</span><span>型</span></div>
            <el-input v-model="project_info.type"></el-input>

          </el-form-item> -->
          <!-- 户型 -->
          <!-- <el-form-item class="form-item" prop="">
          <div class="input_title  required" ><span>户</span><span>型</span></div>
          <div class="build-type" style="width: 2.1rem;margin-left: 0.78rem;">
            <el-input v-model="project_info.buildRoom" maxlength="2" :style="{'width': `0.34rem`}" v-onlyNumber></el-input>
            <div class="unit">室</div>
            <el-input v-model="project_info.buildHall" maxlength="2" :style="{'width': `0.34rem`}"></el-input>
            <div class="unit">厅</div>
            <el-input v-model="project_info.buildWei" maxlength="2" :style="{'width': `0.34rem`}"></el-input>
            <div class="unit">卫</div>
            <el-input v-model="project_info.buildYang" maxlength="2" :style="{'width': `0.34rem`}"></el-input>
            <div class="unit">阳台</div>
          </div>
        </el-form-item> -->

          <el-form-item prop="buildInnerarea">
            <div class="input_title required">
              <span>套</span><span>内</span><span>面</span><span>积</span>
            </div>
            <el-input
              maxlength="8"
              v-model="project_info.houseInnerArea"
              v-number-two
            >
              <span slot="suffix">㎡</span>
            </el-input>
          </el-form-item>
          <el-form-item>
            <div class="input_title ">
              <span>项</span><span>目</span><span>负</span><span>责</span
              ><span>人</span>
            </div>
            <el-input v-model="project_info.projectPerson"></el-input>
          </el-form-item>
          <el-form-item>
            <div class="input_title ">
              <span>开</span><span>发</span><span>商</span>
            </div>
            <el-input v-model="project_info.developerName"></el-input>
          </el-form-item>
        </section>

        <section>
          <el-form-item>
            <div class="input_title">
              <span>代</span><span>理</span><span>商</span>
            </div>
            <el-input v-model="project_info.agentName"></el-input>
          </el-form-item>
          <el-form-item prop="buildId">
            <div class="input_title ">
              <span>项</span><span>目</span><span>地</span><span>址</span>
            </div>
            <el-input
              v-model="project_info.projectAddress"
              style="width:5.4rem"
            ></el-input>
          </el-form-item>
        </section>
      </el-form>
    </main>
    <!-- 选择项目弹窗 -->
    <deal_project_list v-if="show" @closeView="closDealView" />
    <!-- 选择片区 弹窗 -->
    <selectArea v-if="isSelectArea" @f_closeView="closDealView"></selectArea>
  </div>
</template>

<script>
import form_header from "../../components/form_header";
import dealInput from "../components/dealInput";
import deal_project_list from "../../components/project_info_components/deal_project_list";
import selectArea from "../components/selectArea";
import GetAllReportNo from "../../../../../net/newHouseDealReport/add/selection/GetAllReportNo.js";
import GetAllUseAndClassAndLevel from "../../../../../net/newHouseDealReport/add/selection/GetAllUseAndClassAndLevel";
import GetReporBuildInfo from "../../../../../net/newHouseDealReport/add/selection/GetReporBuildInfo";
import { CreateCommonRules } from "../utils/Rules";
import { ReportInfoDetailItem } from "../../../../../net/newHouseDealReport/display/reporInfoDetail";
import { ErpCommon } from "../../../../../utils/ErpCommon";
const reg = /^[1-9]\d{0,8}$/;
export default {
  components: {
    form_header,
    deal_project_list,
    dealInput,
    selectArea,
  },
  data() {
    return {
      title: "项目信息",
      icon_name: "Fyxx_200.png",
      isSelectArea: false, //是否显示选择片区弹窗
      //楼盘用途选项
      build_useage_options: [
        {
          dicCnMsg: "请稍等",
        },
      ],
      // 楼盘类别选项
      type_options: [
        {
          dicCnMsg: "请稍等",
        },
      ],
      // 楼盘级别选项
      class_options: [
        {
          dicCnMsg: "请稍等",
        },
      ],
      rules: this.setCommonRules(),
      //选择区域传值参数
      selectAreaParms: {
        userId: "",
        userName: "",
        organizationId: "",
        organizationName: "",
        selectType: 2, //1选人，2选组织
      },
      project_info: {
        projectType: "", //类型
        makeSheetPerson: "", //制单人
        makeSheetDate: "", //制单日期
        projectClass: "", //类别
        mainNo: "", //主单号
        dealWay: "", // 合作方式
        projectNumber: "", // 编号
        cooperationOutsideId: "", //外区分行id
        cooperationOutsideCityId: "", //外区所在城市id
        projectName: "", // 项目名称
        propertyInfo: "", // 物业信息
        projectArea: "", //片区
        projectUseage: "", //用途
        houseType: "", //户型
        buildArea: "", //建筑面积
        houseInnerArea: "", //套内面积
        projectPerson: "", //项目负责人
        developerName: "", //开发商
        agentName: "", //代理商
        projectAddress: "", //项目地址
      },
      show: false,
    };
  },
  props: {
    initData: {
      type: Object,
      default() {
        return new ReportInfoDetailItem();
      },
    },
  },
  created() {
    //编辑初始化数据
    this.initDetailInfo();
  },
  watch: {
    initData: {
      handler: function() {
        this.initDetailInfo();
      },
      deep: true,
    },
    getReportType() {
      this.$store.commit(
        "add_new_hosue_report_store/setsProjectInfoReportType",
        this.project_info.reportType
      );
    },
  },
  methods: {
    //将详情数据对应赋值
    initDetailInfo() {
      let info = this.project_info;
      for (let item in info) {
        info[item] = this.initData[item];
      }
      this.project_info;
      console.log(info, "这是项目信息初始化数据");
    },
    querySearch(queryString, cb) {
      let n = Number(queryString);
      if (n.toString() == "NaN") return this.$erpCommon.toast("请输入数字");
      let p = {
        reportNo: n,
      };
      new GetAllReportNo(p).send().then((res) => {
        cb(res);
      });
    },
    //输入验证
    btKeyDown(e) {
      let flag = reg.test(e.target.value);
      //允许输入0
      if (!flag && "0" !== e.target.value + "") {
        e.target.value = "";
      }
    },
    //系统根据主单号带出相应的物业、业主、客户、合同等信息
    handleSelect() {},
    //打开选择项目弹窗
    searchProject() {
      this.show = true;
      document.body.style.overflow = "hidden"; //禁止页面滚动
    },
    //选择区域erp
    selsecArea() {
      this.isSelectArea = true;
      document.body.style.overflow = "hidden"; //禁止页面滚动
    },
    //关闭选择项目弹窗
    closDealView() {
      this.show = false;
      this.isSelectArea = false;
      document.body.style.overflow = ""; //禁止页面滚动
    },
    getbuildUseageOptions() {
      new GetAllUseAndClassAndLevel()
        .send()
        .then((res) => {
          this.build_useage_options = res;
        })
        .catch((res) => {
          this.build_useage_options[0].dicCnMsg = "网络错误";
        });
    },
    getTypeOptions() {
      let p = {
        select: 2,
        type: Number(this.project_info.buildUseage),
      };
      new GetAllUseAndClassAndLevel(p)
        .send()
        .then((res) => {
          this.type_options = res;
        })
        .catch((res) => {
          this.type_options[0].dicCnMsg = "网络错误";
        });
    },
    getClassOptions() {
      let p = {
        select: 3,
      };
      new GetAllUseAndClassAndLevel(p)
        .send()
        .then((res) => {
          this.class_options = res;
        })
        .catch((res) => {
          this.class_options[0].dicCnMsg = "网络错误";
        });
    },
    getProjectDetail(project_id, agent_id) {
      let params = {
        agentId: agent_id,
        buildId: project_id,
      };
      new GetReporBuildInfo(params)
        .send()
        .then((res) => {
          //代理商
          this.agentName = res.agentName;
          //现金奖
          this.cashPrize = res.cashPrize;
          //项目负责人
          this.chargeName = res.chargeName;
          //开发商
          this.developerName = res.developerName;
          //佣金结算方式
          this.settlementMethod = res.settlementMethod;
          //项目地址
          this.buildAddr = res.buildAddr;
          //结佣必备资料
          this.dataSheets = res.buildAddr;
        })
        .catch((res) => {});
    },
    setCommonRules() {
      let params = {
        type: ["required"],
        projectClass: ["required"],
        buildArea: ["required"],
        buildInnerarea: ["required"],
        buildId: ["required"],
        regId: ["required"],
        reportType: ["required"],
        cashPrize: ["required"],
        wuyeAddr: ["required"],
      };
      return new CreateCommonRules(params).getCommonRules();
    },
    //project_info提交参数
    saveProjectInfo() {
      this.$emit("projectInfo", this.project_info);
    },
  },
  filters: {
    dealDataSheets(v) {
      if (typeof v == "string") return v;
      if (!v || v.length == 0) return "暂无数据";
      let _arr = Object.assign([], v);
      let _m = new Map()
        .set(0, "其他")
        .set(5, "客户确认单")
        .set(6, "成交确认单")
        .set(7, "认购书");
      let _s = new String();
      function _d(arr) {
        if (arr.length == 0) return;
        _s += !_m.get(Number(arr.splice(0, 1)))
          ? "数据格式错误"
          : `${_m.get(Number(arr.splice(0, 1)))}；`;
        return _d(arr);
      }
      _d(_arr);
      return _s;
    },
    filterChargeName(val) {
      if (val && val.length > 0) {
        return val.join();
      } else {
        return "--";
      }
    },
  },
  computed: {
    getReportType() {
      return this.project_info.reportType;
    },
  },
};
</script>

<style lang="less" scoped>
@commonInputHeight: 0.3rem;
.project_info {
  main {
    width: 10.24rem;
    margin: 0 auto;
    /deep/ .el-form {
      & > section {
        &:nth-of-type(1) {
          & > .el-form-item {
            &:nth-of-type(1) {
              & > .el-form-item__content {
                width: 2.86rem;
                i {
                  display: inline-block;
                }
              }
            }
            &:nth-of-type(2) {
              & > .el-form-item__content {
                width: 2.88rem;
                & > .el-select {
                  width: 0.7rem;
                }
                & > .el-autocomplete {
                  width: 1.3rem;
                  margin-left: 0.1rem;
                  .el-input {
                    margin: 0;
                    width: 100%;
                  }
                }
              }
            }
            &:nth-of-type(3) {
              & > .el-form-item__content {
                width: 2.87rem;
              }
            }
          }
        }

        &:nth-of-type(4) {
          & > .el-form-item {
            &:nth-of-type(1) {
              & > .el-form-item__content {
                width: 6.15;
                & > .el-input {
                  width: 5.38rem;
                }
              }
            }
          }
        }

        &:nth-of-type(6) {
          .form-item {
            position: relative;
            /deep/ .el-input {
              margin-left: 0rem !important;
            }
            /deep/ .el-form-item__content {
              display: flex;
              align-items: center;
              & > .label-title {
                position: relative;
                width: 0.95rem;
                height: @commonInputHeight;
                line-height: @commonInputHeight;
                margin-right: 0.35rem;
                color: #444444;
                font-size: 0.12rem;
                text-align: right;
                &::after {
                  content: ":";
                  position: absolute;
                  top: 0;
                  right: -0.1rem;
                  width: 0.1rem;
                  height: @commonInputHeight;
                  line-height: @commonInputHeight;
                  text-align: center;
                  color: #444444;
                  font-size: 0.12rem;
                }
                &.red {
                  &::before {
                    content: "*";
                    position: absolute;
                    top: 0;
                    right: -0.2rem;
                    width: 0.1rem;
                    height: @commonInputHeight;
                    line-height: 0.35rem;
                    text-align: center;
                    color: #ff5a1f;
                    font-size: 0.12rem;
                  }
                }
              }
            }
          }
          .build-type {
            display: flex;
            height: @commonInputHeight;
            border: 1px solid #dcdfe6;
            box-sizing: border-box;
            color: #606266;
            border-radius: 4px;
            /deep/ .el-input {
              .el-input__inner {
                padding: 0 0 0 0.08rem;
                border: none;
                height: 0.28rem;
                line-height: 0.28rem;
                box-shadow: none;
                border: none;
              }
            }
            .unit {
              width: auto;
              line-height: @commonInputHeight;
              color: #999999;
              font-size: 0.12rem;
              background-color: #ffffff;
            }
          }
        }
        &:nth-of-type(7),
        &:nth-of-type(8) {
          // margin-top: 0.24rem;
          & > .column {
            margin-bottom: 0.12rem;
            & > .item {
              display: flex;
              margin-bottom: 0.03rem;
              height: 0.25rem;
              line-height: 0.25rem;
              & > .item_title {
                display: flex;
                justify-content: space-between;
                font-size: 0.12rem;
                font-weight: bold;
                color: #444;
                width: 0.52rem;
                margin-left: 0.4rem;
                &.long {
                  margin-left: 0;
                  width: 0.92rem;
                  display: block;
                  text-align: right;
                }
                &:nth-of-type(1) {
                  margin-left: 0;
                  display: block;
                  width: 0.98rem;
                  text-align: right;
                }
              }
              & > .item_content {
                line-height: 0.25rem;
                width: 2.1rem;
                margin-left: 0.26rem;
                .layout_num {
                  /deep/ .el-input__inner {
                    padding-left: 0.08rem !important;
                    padding-right: 0.18rem !important;
                  }
                }
                .yangs_num {
                  /deep/ .el-input__inner {
                    padding-right: 0.3rem !important;
                  }
                }
                .el-form-item {
                  width: 100%;
                  line-height: normal;
                  margin: 0;
                  .el-form-item__content {
                    line-height: normal;
                    display: flex;
                    .input_title {
                      font-size: 0.12rem;
                      line-height: 0.25rem;
                      height: 0.25rem;
                      position: static;
                      width: auto;
                      transform: none;
                      &::after {
                        display: none;
                      }
                    }
                    .el-input {
                      height: 0.25rem;
                      width: auto;
                      margin-left: 0.1rem;
                      input {
                        height: 100%;
                        padding: 0 0 0 0.07rem;
                        width: 0.56rem;
                        line-height: 0.25rem;
                      }
                    }
                  }
                }
              }
            }
          }
        }

        &:nth-of-type(8),
        &:nth-of-type(9),
        &:nth-of-type(11) {
          & > .item {
            display: flex;
            .title {
              margin-left: 0;
              display: block;
              width: 0.98rem;
              text-align: right;
              font-weight: bold;
              color: #444;
              line-height: 0.25rem;
            }
            .content {
              line-height: 0.25rem;
              width: 8rem;
              margin-left: 0.26rem;
            }
          }
        }
        &:nth-of-type(10) {
          .el-form-item {
            height: 1.1rem;
          }
        }
      }
    }
  }
}
</style>
