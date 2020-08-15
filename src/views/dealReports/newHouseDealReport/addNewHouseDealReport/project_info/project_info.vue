<template>
  <div class="project_info">
    <main>
      <form_header :title="title" :icon_name="icon_name" />
      <el-form :inline="true" :model="project_info" class="demo-form-inline">
        <section>
          <el-form-item prop="reportType">
            <div class="input_title required">
              <span>类</span>
              <span>型</span>
            </div>
            <el-select class="no_icon" v-model="project_info.reportType">
              <el-option label="直销  " :value="1"></el-option>
              <el-option label="分销" :value="2"></el-option>
              <el-option label="租赁" :value="3"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="reportClass">
            <div class="input_title required">
              <span>类</span>
              <span>别</span>
            </div>
            <el-select
              class="no_icon"
              v-model="project_info.reportClass"
              placeholder="活动区域"
            >
              <el-option label="一般成交" :value="1"></el-option>
              <el-option label="事后加佣" :value="2"></el-option>
              <el-option label="口头代理费" :value="3"></el-option>
              <el-option label="外区分佣" :value="4"></el-option>
              <el-option label="海外项目" :value="5"></el-option>
            </el-select>
            <el-autocomplete
              class="inline-input"
              :fetch-suggestions="querySearch"
              placeholder="事后加佣需要添加主单号"
              :trigger-on-focus="false"
              @select="handleSelect"
              :disabled="
                project_info.reportClass != 2 && project_info.reportClass != 3
              "
              v-model="project_info.reportCommissionNo"
            ></el-autocomplete>
          </el-form-item>
          <el-form-item prop="cooperationType">
            <div class="input_title">
              <span>合</span>
              <span>作</span>
              <span>方</span>
              <span>式</span>
            </div>
            <el-select class="no_icon" v-model="project_info.cooperationType">
              <el-option label="跨区合作" :value="1"></el-option>
              <el-option label="市内合作" :value="2"></el-option>
              <el-option label="区内合作" :value="3"></el-option>
            </el-select>
          </el-form-item>
        </section>

        <section v-show="project_info.reportClass == 4">
          <el-form-item prop="cooperationOutsideId">
            <div class="input_title required">
              <span>外</span>
              <span>区</span>
              <span>分</span>
              <span>行</span>
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
          <el-form-item prop="buildId">
            <div class="input_title required">
              <span>项</span>
              <span>目</span>
            </div>
            <el-input
              @click.native="searchProject"
              v-model="project_info.buildName"
              readonly
            ></el-input>
          </el-form-item>
          <el-form-item prop="regId">
            <div class="input_title required">
              <span>所</span>
              <span>属</span>
              <span>片</span>
              <span>区</span>
            </div>
            <el-input
              @click.native="selsecArea"
              v-model="selsecAreaText"
              placeholder="选择区域"
              readonly
            ></el-input>
          </el-form-item>
        </section>

        <section>
          <el-form-item prop="wuyeAddr">
            <div class="input_title required">
              <span>物</span>
              <span>业</span>
              <span>地</span>
              <span>址</span>
            </div>
            <el-input
              v-model="project_info.wuyeAddr"
              placeholder="请填写物业地址"
            ></el-input>
          </el-form-item>

          <el-form-item prop="buildUseage">
            <div class="input_title">
              <span>用</span>
              <span>途</span>
            </div>
            <el-select v-model="project_info.buildUseage" placeholder="  ">
              <el-option
                v-for="v in build_useage_options"
                :key="v.dicId"
                :label="v.dicCnMsg"
                :value="v.dicValue"
              ></el-option>
            </el-select>
          </el-form-item>
        </section>

        <section>
          <el-form-item
            prop="type"
            v-if="
              project_info.buildUseage != 1 &&
                project_info.buildUseage != 2 &&
                project_info.buildUseage != 3 &&
                project_info.buildUseage != 8
            "
          >
            <div class="input_title">
              <span>类</span>
              <span>型</span>
            </div>
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
            <div class="input_title">
              <span>级</span>
              <span>别</span>
            </div>
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
        </section>

        <section>
          <!-- todo -->
          <!-- <el-form-item prop="">
            <div class="input_title  required"><span>户</span><span>型</span></div>
            <el-input v-model="project_info.type"></el-input>

          </el-form-item>-->
          <!-- 户型 -->
          <el-form-item class="form-item" prop>
            <div class="input_title required">
              <span>户</span>
              <span>型</span>
            </div>
            <div class="build-type" style="width: 2.1rem;margin-left: 0.78rem;">
              <el-input
                v-model="project_info.buildRoom"
                maxlength="2"
                style="width:0.34rem;margin-left:0;border:none"
                v-onlyNumber
              ></el-input>
              <div class="unit">室</div>
              <el-input
                v-model="project_info.buildHall"
                maxlength="2"
                style="width:0.34rem;margin-left:0;border:none"
              ></el-input>
              <div class="unit">厅</div>
              <el-input
                v-model="project_info.buildWei"
                maxlength="2"
                style="width:0.34rem;margin-left:0;border:none"
              ></el-input>
              <div class="unit">卫</div>
              <el-input
                v-model="project_info.buildYang"
                maxlength="2"
                style="width:0.34rem;margin-left:0;border:none"
              ></el-input>
              <div class="unit">阳台</div>
            </div>
          </el-form-item>

          <el-form-item prop="buildArea">
            <div class="input_title required">
              <span>建</span>
              <span>筑</span>
              <span>面</span>
              <span>积</span>
            </div>
            <el-input
              maxlength="8"
              v-model="project_info.buildArea"
              v-number-two
            >
              <span slot="suffix">㎡</span>
            </el-input>
          </el-form-item>
          <el-form-item prop="buildInnerarea">
            <div class="input_title required">
              <span>套</span>
              <span>内</span>
              <span>面</span>
              <span>积</span>
            </div>
            <el-input
              maxlength="8"
              v-model="project_info.buildInnerarea"
              v-number-two
            >
              <span slot="suffix">㎡</span>
            </el-input>
          </el-form-item>
        </section>

        <section>
          <div class="column">
            <div class="item agent">
              <div class="item_title">
                <span>项</span>
                <span>目</span>
                <span>负</span>
                <span>责</span>
                <span>人</span>
                <span>:</span>
              </div>
              <div class="item_content">
                {{ project_info.chargeName || "--" }}
              </div>
              <div class="item_title">
                <span>代</span>
                <span>理</span>
                <span>商</span>
                <span>:</span>
              </div>
              <div class="item_content">
                {{ project_info.agentName || "--" }}
              </div>
              <div class="item_title">
                <span>开</span>
                <span>发</span>
                <span>商</span>
                <span>:</span>
              </div>
              <div class="item_content">
                {{ project_info.developerName || "--" }}
              </div>
            </div>
          </div>
        </section>

        <section>
          <div class="column">
            <div class="item agent other-item">
              <div class="item_title">
                <span>佣</span>
                <span>金</span>
                <span>结</span>
                <span>算</span>
                <span>方</span>
                <span>式</span>
                <span>:</span>
              </div>
              <div class="other_content">
                <div>{{ project_info.settlementMethod || "--" }}</div>
                <!-- <div>正常按揭: {{ "5.5%" }}</div>
                <div>首付分期/全款分期: {{ "5.5%" }}</div>-->
              </div>
              <div class="item_title">
                <span>现</span>
                <span>金</span>
                <span>奖</span>
                <span>:</span>
              </div>
              <div class="other_content">
                <div>{{ project_info.cashPrize || "--" }}</div>
                <!-- <div>一次性付款: {{ "5.5%" }}</div>
                <div>正常按揭: {{ "5.5%" }}</div>
                <div>首付分期/全款分期: {{ "5.5%" }}</div>-->
                <!-- <el-input v-model="project_info.dataSheets"  v-number-one :style="{'width': '0.56rem'}"></el-input> -->
              </div>
              <div class="item_title" style="width:auto">
                <span>结</span>
                <span>佣</span>
                <span>必</span>
                <span>备</span>
                <span>资</span>
                <span>料</span>
                <span>:</span>
              </div>
              <div class="other_content">
                <!-- {{ project_info.dataSheets | dealDataSheets }} -->
                <div
                  v-for="(item, index) in dataSheetList"
                  :key="index"
                  v-if="!!dataSheetList && dataSheetList.length > 0"
                >
                  {{ item.dataName }}:
                  {{ item.dataStatus == 1 ? "原件" : "复印件" }}
                </div>
                <div v-else>-----</div>
                <!-- <div>客户确认单: {{ "原件" }}</div>
                <div>成交确认单: {{ "复印件" }}</div>
                <div>认购书: {{ "原件" }}</div>-->
              </div>
            </div>
          </div>
        </section>

        <section>
          <div class="item">
            <div class="title">项目地址:</div>
            <div class="content">{{ project_info.buildAddr || "--" }}</div>
          </div>
        </section>
      </el-form>
    </main>
    <deal_project_list v-if="show" @closeView="closDealView" />
  </div>
</template>

<script>
import form_header from "../../components/form_header";
import dealInput from "../components/dealInput";
import deal_project_list from "../../components/project_info_components/deal_project_list";
import GetAllReportNo from "../../../../../net/newHouseDealReport/add/selection/GetAllReportNo.js";
import GetAllUseAndClassAndLevel from "../../../../../net/newHouseDealReport/add/selection/GetAllUseAndClassAndLevel";
import GetReporBuildInfo from "../../../../../net/newHouseDealReport/add/selection/GetReporBuildInfo";
import { CreateCommonRules } from "../utils/Rules";
import { ReportInfoDetailItem } from "../../../../../net/newHouseDealReport/display/reporInfoDetail";
import {
  GetDataSheetList,
  DataSheetListRequest,
} from "../../../../../net/newHouseDealReport/add/selection/AddReporInfo";
import { ErpCommon } from "../../../../../utils/ErpCommon";
const reg = /^[1-9]\d{0,8}$/;
export default {
  components: {
    form_header,
    deal_project_list,
    dealInput,
  },
  data() {
    return {
      title: "项目信息",
      // dataName:"",//结佣必备资料名称
      // dataStatus:"",//资料类型1 原件 2 复印件
      dataSheetList: [], //结佣必备资料+-
      icon_name: "Fyxx_200.png",
      selsecAreaText: "", //选择的所属片区我文本，无需提交
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
      // rules: this.setCommonRules(),
      //选择区域传值参数
      selectAreaParms: {
        userId: "",
        userName: "",
        organizationId: "",
        organizationName: "",
        selectType: 2, //1选人，2选组织
      },
      project_info: {
        reportType: "",
        reportClass: "",
        regId: "",
        wuyeAddr: "",
        buildUseage: "1", // 用途
        buildType: "", // 类型
        buildLevelName: "", // 级别
        buildId: "",
        buildName: "",
        reportNo: "",
        reportCommissionNo: "",
        buildRoom: "",
        buildHall: "",
        buildWei: "",
        buildYang: "",
        buildArea: "",
        buildInnerarea: "",
        cooperationType: "",
        cooperationType: "",
        cooperationOutsideCityId: "",
        cooperationOutsideId: "",
        chargeName: "", //项目负责人
        agentName: "", //代理商
        agentId: "", //代理商id
        developerName: "", //开发商
        settlementMethod: "", //佣金结算方式
        cashPrize: "", //现金奖
        buildAddr: "", //项目地址
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
    //初始化用途
    this.getbuildUseageOptions();
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
    getReportClass() {
      this.$store.commit(
        "add_new_hosue_report_store/setsProjectInfoReportClass",
        this.project_info.reportClass
      );
      this.project_info.reportCommissionNo = "";
    },
    getReportCommissionNo() {
      this.$store.commit(
        "add_new_hosue_report_store/setsProjectInfoReportCommissionNo",
        this.project_info.reportCommissionNo
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
      this.project_info.buildUseage = this.initData.buildUseage || "1";
      //额外字段处理
      this.selsecAreaText = this.initData.regName;
      console.log(this.selsecAreaText,this.initData.regName,'区域名称');
      // this.selectAreaParms.organizationId = this.initData.regId;
      this.project_info.chargeName = this.initData.chargeName.join();
      console.log(info, "这是项目信息初始化数据");
    },
    querySearch(queryString, cb) {
      let n = Number(queryString);
      if (n.toString() == "NaN") return this.$erpCommon.toast("请输入数字");
      let p = {
        reportCommissionNo: n,
      };
      new GetAllReportNo(p).send().then((res) => {
        let list = res || [];
        // autocomplete只识别value字段并在下拉列中显示
        list.forEach((key) => {
          key.value = key.reportNo;
        });
        cb(list);
      });
    },
    //初始化结佣必备资料
    initDataSheetList(data) {
      let request = {
        dealId: data,
      };
      new GetDataSheetList(new DataSheetListRequest(request))
        .send()
        .then((res) => {
          console.log(res, "结佣必备资料");
          this.dataSheetList = res || [];
        })
        .catch((err) => {
          this.$erpCommon.toast(err.errMsg || "服务器开小差了,请稍后再试");
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
    handleSelect(val) {
      console.log(val);
    },
    //打开选择项目弹窗
    searchProject() {
      this.show = true;
      document.body.style.overflow = "hidden"; //禁止页面滚动
    },
    //选择区域erp
    selsecArea() {
      let val = new ErpCommon().openPerformanceAssignee(this.selectAreaParms);
      let data = JSON.parse(val);
      this.project_info.regId = data.organizationId || "";
      this.selsecAreaText = data.organizationName || "";
      console.log(val, "这是筛选组织", data);
    },
    //关闭选择项目弹窗
    closDealView(data) {
      this.show = false;
      //根据项目id获取结佣必备资料
      let val = data.dealId;
      this.initDataSheetList(val);
      console.log(data, "选中的数据");
      if (data) {
        //代理商
        this.project_info.agentName = data.agentName;
        this.project_info.agentId = data.agentId;
        //现金奖
        this.project_info.cashPrize = data.cashPrize;
        //项目名称
        this.project_info.buildName = data.buildName;
        //项目id
        this.project_info.buildId = data.buildId;
        //项目负责人
        this.project_info.chargeName = data.userName;
        //用途默认为1
        this.project_info.buildUseage = "1";
        //开发商
        this.project_info.developerName = data.developerName;
        //佣金结算方式
        this.project_info.settlementMethod = data.settlementMethod;
        //项目地址
        this.project_info.buildAddr = data.selAddr;
        //结佣必备资料
        this.project_info.dataSheets = "";
      }
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
    //获取项目详情
    // getProjectDetail(project_id, agent_id) {
    //   let params = {
    //     agentId: agent_id,
    //     buildId: project_id,
    //   };
    //   console.log(params, "请求参数");
    //   new GetReporBuildInfo(params)
    //     .send()
    //     .then((res) => {
    //       //代理商
    //       this.agentName = res.agentName;
    //       //现金奖
    //       this.cashPrize = res.cashPrize;
    //       //项目负责人
    //       this.chargeName = res.chargeName;
    //       //开发商
    //       this.developerName = res.developerName;
    //       //佣金结算方式
    //       this.settlementMethod = res.settlementMethod;
    //       //项目地址
    //       this.buildAddr = res.buildAddr;
    //       //结佣必备资料
    //       this.dataSheets = res.buildAddr;
    //     })
    //     .catch((res) => {
    //       this.$erpCommon.toast(res.errMsg || "服务器开小差了,请稍后再试");
    //     });
    // },
    //验证规则
    // setCommonRules() {
    //   let params = {
    //     type: ["required"],
    //     reportClass: ["required"],
    //     buildArea: ["required"],
    //     buildInnerarea: ["required"],
    //     buildId: ["required"],
    //     regId: ["required"],
    //     reportType: ["required"],
    //     cashPrize: ["required"],
    //     wuyeAddr: ["required"],
    //   };
    //   return new CreateCommonRules(params).getCommonRules();
    // },
    //project_info提交参数
    saveProjectInfo() {
      this.$emit("projectInfo", this.project_info);
    },
    //项目信息验证
    projectInfoCheck() {
      let request = this.project_info;
      if (request.reportType == "" || !request.reportType) {
        this.$erpCommon.toast("请选择项目类型");
        return false;
      }
      if (request.reportClass == "" || !request.reportClass) {
        this.$erpCommon.toast("请选择项目类别");
        return false;
      }
      if (request.reportClass == 2 && !request.reportCommissionNo) {
        this.$erpCommon.toast("请填写事后加佣主单号");
        return false;
      }
      if (request.reportClass == 4) {
        if (
          request.cooperationOutsideCityId == "" ||
          !request.cooperationOutsideCityId
        ) {
          this.$erpCommon.toast("请输入外区所在城市");
          return false;
        }
        if (
          request.cooperationOutsideId == "" ||
          !request.cooperationOutsideId
        ) {
          this.$erpCommon.toast("请输入外区分行");
          return false;
        }
      }
      if (request.buildId == "" || !request.buildId) {
        this.$erpCommon.toast("请选择项目名称");
        return false;
      }
      if (request.regId == "" || !request.regId) {
        this.$erpCommon.toast("请选择所属片区");
        return false;
      }
      if (request.wuyeAddr == "" || !request.wuyeAddr) {
        this.$erpCommon.toast("请输入物业地址");
        return false;
      }
      if (
        request.buildRoom == "" ||
        request.buildWei == "" ||
        request.buildYang == "" ||
        request.buildHall == ""
      ) {
        this.$erpCommon.toast("请输入户型");
        return false;
      }
      if (request.buildArea == "" || !request.buildArea) {
        this.$erpCommon.toast("请输入建筑面积");
        return false;
      }
      if (request.buildInnerarea == "" || !request.buildInnerarea) {
        this.$erpCommon.toast("请输入套内面积");
        return false;
      }
      return true;
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
    //
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
    getReportClass() {
      return this.project_info.reportClass;
    },
    getReportCommissionNo() {
      return this.project_info.reportCommissionNo;
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
                height: 0.28rem;
                line-height: 0.28rem;
                box-shadow: none !important;
                border: none !important;
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
          margin-top: 0.24rem;
          & > .column {
            margin-bottom: 0.12rem;
            & > .other-item {
              line-height: normal !important;
              height: auto !important;
            }
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
              & > .other_content {
                width: 2.1rem;
                max-height: 0.68rem;
                margin-left: 0.26rem;
                font-size: 0.12rem;
                margin-top: -0.02rem;
                & > div {
                  line-height: 0.25rem;
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
      height: 0.28rem;
      line-height: 0.28rem;
      box-shadow: none !important;
      border: none !important;
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
</style>
