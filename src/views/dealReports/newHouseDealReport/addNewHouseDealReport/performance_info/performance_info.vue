<template>
  <div class="performance_info">
    <main>
      <form_header :title="title" />
      <el-form
        :inline="true"
        :model="performance_info"
        class="demo-form-inline"
        ref="performance_infoRef"
      >
        <section>
          <el-form-item prop="agencyMoney">
            <div class="input_title required">
              <span>代</span>
              <span>理</span>
              <span>佣</span>
              <span>金</span>
            </div>
            <!-- <el-input v-model="performance_info.agencyCommission"></el-input> -->
            <el-input
              v-number-two
              @keydown.native="btKeyDown($event, 10)"
              @keyup.native="btKeyDown($event, 10)"
              v-model="performance_info.agencyCommission"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <div class="input_title">
              <span>客</span>
              <span>户</span>
              <span>佣</span>
              <span>金</span>
            </div>
            <!-- <el-input v-model="performance_info.custCommission"></el-input> -->
            <el-input
              v-number-two
              @keydown.native="btKeyDown($event, 10)"
              @keyup.native="btKeyDown($event, 10)"
              v-model="performance_info.custCommission"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <div class="input_title">
              <span>标</span>
              <span>准</span>
              <span>佣</span>
              <span>金</span>
            </div>
            <!-- <el-input v-model="performance_info.standardCommission"></el-input> -->
            <el-input
              v-number-two
              @keydown.native="btKeyDown($event, 10)"
              @keyup.native="btKeyDown($event, 10)"
              disabled
              v-model="performance_info.standardCommission"
            ></el-input>
          </el-form-item>
          <el-form-item v-if="getReportType == 2">
            <div class="input_title">
              <span>分</span>
              <span>销</span>
              <span>佣</span>
              <span>金</span>
            </div>
            <!-- <el-input v-model="performance_info.distributionCommission"></el-input> -->
            <el-input
              v-number-two
              @keydown.native="btKeyDown($event, 10)"
              @keyup.native="btKeyDown($event, 10)"
              v-model="performance_info.distributionCommission"
            ></el-input>
          </el-form-item>
        </section>

        <section>
          <el-form-item v-if="getReportType !== 2">
            <div class="input_title">
              <span>折</span>
              <span>扣</span>
            </div>
            <!-- <el-input v-model="performance_info.discountCommission"></el-input> -->
            <el-input
              @keydown.native="btKeyDown($event, 3)"
              @keyup.native="btKeyDown($event, 3)"
              disabled
              v-model.number="getDiscountCommission"
            >
              <span slot="suffix">%</span>
            </el-input>
          </el-form-item>
          <el-form-item v-if="getReportType == 3">
            <div class="input_title required">
              <div class="long_title">是否有租约</div>
            </div>
            <el-select v-model="performance_info.leaseFlag">
              <el-option label="否" :value="0"></el-option>
              <el-option label="是" :value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item v-if="getReportType == 3">
            <div class="input_title required">
              <div class="long_title">租约到期日期</div>
            </div>
            <el-date-picker
              v-model="performance_info.leaseEndTime"
              value-format="yyyy-MM-dd"
              type="date"
            ></el-date-picker>
          </el-form-item>
          <el-form-item v-if="getReportType == 3">
            <div class="input_title required">
              <span>押</span>
              <span>金</span>
              <span>类</span>
              <span>型</span>
            </div>
            <el-select v-model="performance_info.cashPledgeClass">
              <el-option label="押二付一" :value="1"></el-option>
              <el-option label="押二付二" :value="2"></el-option>
              <el-option label="押二付三" :value="3"></el-option>
            </el-select>
          </el-form-item>
        </section>
        <section>
          <el-form-item>
            <div class="input_title">
              <span>上</span>
              <span>报</span>
              <span>业</span>
              <span>绩</span>
            </div>
            <!-- <el-input v-model="performance_info.reportCash"></el-input> -->
            <el-input
              v-number-two
              @keydown.native="btKeyDown($event, 10)"
              @keyup.native="btKeyDown($event, 10)"
              disabled
              v-model="computeReportCash"
            ></el-input>
          </el-form-item>
          <!-- <el-form-item>
            <div class="input_title"><span>项</span><span>目</span><span>分</span><span>成</span></div>
            <el-input v-model="performance_info.projectDivided"></el-input>
            <el-select v-model="performance_info.dividedUnit">
              <el-option label="%" value="1"></el-option>
              <el-option label="元" value="2"></el-option>
            </el-select>
          </el-form-item>-->
        </section>

        <section>
          <el-form-item>
            <el-checkbox-group v-model="has_co_tips" @change="addOutCooperations">
              <el-checkbox name="type" label="外部合作费"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </section>

        <section v-show="has_co_tips">
          <div class="co_tip">
            <div>
              合作费合计:
              <span class="c_ff8002">{{ coTipsTotal }}元</span>
            </div>
            <div class="add_co" @click="addCo">
              <div class="img"></div>
              <div>新增</div>
            </div>
          </div>
          <div
            class="table"
            v-if="
              !performance_info.outCooperations ||
                performance_info.outCooperations.length != 0
            "
          >
            <div class="row">
              <div class="col">
                <div>序号</div>
              </div>
              <div class="col">
                <div>合作人</div>
              </div>
              <div class="col">
                <div>身份证</div>
              </div>
              <div class="col">
                <div>联系方式</div>
              </div>
              <div class="col">
                <div>类型</div>
              </div>
              <div class="col">
                <div>合作费</div>
              </div>
            </div>
            <div class="row content" v-for="(v, i) in performance_info.outCooperations" :key="i">
              <div class="col">
                <div>{{ i + 1 }}</div>
              </div>
              <div class="col">
                <el-form-item>
                  <el-input v-model="v.userName"></el-input>
                </el-form-item>
              </div>
              <div class="col">
                <el-form-item>
                  <el-input v-model="v.userIccode"></el-input>
                </el-form-item>
              </div>
              <div class="col">
                <el-form-item>
                  <el-input v-model="v.userMobile"></el-input>
                </el-form-item>
              </div>
              <div class="col">
                <el-form-item>
                  <el-select v-model="v.cooperationClass">
                    <el-option label="第三方" value="1"></el-option>
                    <el-option label="买房" value="2"></el-option>
                    <el-option label="公司内部" value="3"></el-option>
                  </el-select>
                </el-form-item>
              </div>
              <div class="col">
                <el-form-item>
                  <el-input v-model="v.cooperationCost" v-number-two maxlength="8"></el-input>
                </el-form-item>
              </div>
              <div class="del" @click="delCo(i)"></div>
            </div>
          </div>
        </section>

        <section>
          <!-- <div class="title">业绩分配</div> -->
          <div class="tabs_list">
            <div
              class="tab"
              v-for="(v, i) in apartment_list"
              :key="i"
              :class="{
                seleced_apartment:
                  now_apartment_alies === v.apartment_alies ||
                  (now_apartment_alies == 2 && v.apartment_alies == 1),
              }"
              @click="changeApartment(v.apartment_alies)"
            >{{ v.apartment_name }}</div>
          </div>
        </section>

        <section class="tips_table">
          <div class="tips">
            <div v-if="now_apartment_alies === 1 || now_apartment_alies === 2">
              二级市场部业绩:
              <span class="c_ff8002">{{ computedTwoApartmentProfit || 0 }}元</span>
            </div>

            <div v-if="now_apartment_alies === 1 || now_apartment_alies === 2">
              <el-form-item style="margin-left:3.5rem">
                <div class="input_title">
                  <span>项</span>
                  <span>目</span>
                  <span>分</span>
                  <span>成</span>
                </div>
                <!-- <el-input v-model="performance_info.projectDivided"></el-input> -->
                <el-input
                  v-number-two
                  v-model="twoApartmentProfitInput"
                  @input="twoApartmentInputChange"
                  style="width:0.8rem"
                ></el-input>
                <el-select v-model="twoApartmentRatio" style="width:0.6rem;margin-left:0.1rem">
                  <el-option label="%" :value="1"></el-option>
                  <el-option label="元" :value="2"></el-option>
                </el-select>
              </el-form-item>
            </div>

            <div v-else class="projectShare">
              <div>
                项目分成:
                <span class="c_ff8002">
                  {{
                  computedTwoApartmentProfit || 0
                  }}
                </span>
              </div>
              <div v-if="now_apartment_alies !== 1 && now_apartment_alies !== 2">
                部门提成金额:
                <span class="c_ff8002">{{ computedDeptAmount }}</span>
              </div>
            </div>

            <div class="button_list">
              <div
                class="button"
                @click="
                  addPerformancePeople(
                    now_apartment_alies === 1 || now_apartment_alies === 2
                      ? 2
                      : 1
                  )
                "
              >
                <div class="img"></div>
                <div>新增</div>
              </div>
              <el-form-item>
                <el-radio-group v-model="tips_type">
                  <el-radio name="tips_type" label="1">录比例</el-radio>
                  <el-radio name="tips_type" label="2">录金额</el-radio>
                </el-radio-group>
              </el-form-item>
            </div>
          </div>
          <div class="table" v-if="now_apartment_performance_list.length != 0">
            <div class="row">
              <div class="col">
                <div class="center">序号</div>
              </div>
              <div class="col">
                <div class="center">分配类型</div>
              </div>
              <div class="col">
                <div class="center">分配部门</div>
              </div>
              <div class="col">
                <div class="center">分配人</div>
              </div>
              <div class="col">
                <div class="center">
                  {{
                  now_apartment_alies === 1 || now_apartment_alies === 2
                  ? "业绩月份"
                  : "提成月份"
                  }}
                </div>
              </div>
              <div class="col">
                <div class="center">分配比例</div>
              </div>
              <div class="col">
                <div class="center">
                  {{
                  now_apartment_alies === 1 || now_apartment_alies === 2
                  ? "分配业绩"
                  : "分配提成"
                  }}
                </div>
              </div>
              <div class="col" v-if="now_apartment_alies === 1 || now_apartment_alies === 2">
                <div class="center">单量</div>
              </div>
              <div class="col" v-if="now_apartment_alies === 1 || now_apartment_alies === 2">
                <div class="center">公司费用</div>
              </div>
              <div class="col" v-if="now_apartment_alies === 1 || now_apartment_alies === 2">
                <div class="center">领导人分配业绩</div>
              </div>
            </div>
            <div class="row content" v-for="(item, i) in now_apartment_performance_list" :key="i">
              <div class="col">
                <div class="center">{{ i + 1 }}</div>
              </div>
              <div class="col">
                <el-form-item>
                  <el-select v-model="item.allotType">
                    <el-option
                      v-for="(info, index) in distributeTypeList"
                      :key="index"
                      :label="info.performanceName"
                      :value="info.id"
                      @click.native="handleallotProportion(item, index)"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </div>
              <div class="col">
                <el-form-item>
                  <el-input
                    v-model="item.allotOrganizationName"
                    @click.native="selsecArea(item)"
                    readonly
                  ></el-input>
                </el-form-item>
              </div>
              <div class="col">
                <el-form-item>
                  <el-input
                    v-model="item.allotUserName"
                    @click.native="selsecPerson(item)"
                    readonly
                  ></el-input>
                  <!-- <el-select v-model="item.allotUser" filterable placeholder="请选择分配人">
                    <el-option
                      v-for="item in distributePersonList"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>-->
                </el-form-item>
              </div>
              <div class="col">
                <el-form-item>
                  <!-- <el-select v-model="item.allotMonth">
                    <el-option label="第三方" value="1"></el-option>
                    <el-option label="买房" value="2"></el-option>
                    <el-option label="公司内部" value="3"></el-option>
                  </el-select>-->
                  <el-date-picker v-model="item.allotMonth" value-format="yyyy-MM-dd" type="date"></el-date-picker>
                </el-form-item>
              </div>
              <div class="col">
                <el-form-item>
                  <el-input
                    :disabled="tips_type != 1"
                    @input="computedAllotRatio(item, 1)"
                    v-model="item.allotRatio"
                    v-number-two
                    style="color:#f57107"
                  >
                    <span slot="suffix">%</span>
                  </el-input>
                </el-form-item>
              </div>
              <div class="col">
                <el-form-item>
                  <el-input
                    :disabled="tips_type != 2"
                    @input="computedAllotRatio(item, 1)"
                    v-model="item.allotMoney"
                    v-number-two
                  ></el-input>
                </el-form-item>
              </div>
              <div class="col" v-if="now_apartment_alies === 1 || now_apartment_alies === 2">
                <el-form-item>
                  <el-input :disabled="getReportClass == 2" v-model="item.signNum" v-number-two></el-input>
                </el-form-item>
              </div>
              <div class="col" v-if="now_apartment_alies === 1 || now_apartment_alies === 2">
                <el-form-item>
                  <el-radio-group v-model="item.compCostFlag">
                    <el-radio label="1">是</el-radio>
                    <el-radio label="0">否</el-radio>
                  </el-radio-group>
                </el-form-item>
              </div>
              <div class="col" v-if="now_apartment_alies === 1 || now_apartment_alies === 2">
                <el-form-item>
                  <el-input v-model="item.leaderUserName"></el-input>
                </el-form-item>
              </div>
              <div class="del" @click="delPerformancePeople(item.index, item.id)"></div>
            </div>
          </div>
        </section>

        <section class="tips_table" v-if="now_apartment_alies === 1 || now_apartment_alies === 2">
          <div class="tips">
            <div>
              三级市场部业绩:
              <span class="c_ff8002">{{ computedThreeApartmentProfit || 0 }}元</span>
            </div>

            <el-form-item
              style="margin-left:3.5rem"
              v-if="now_apartment_alies === 1 || now_apartment_alies === 2"
            >
              <div class="input_title">
                <span>项</span>
                <span>目</span>
                <span>分</span>
                <span>成</span>
              </div>
              <!-- <el-input v-model="performance_info.projectDivided"></el-input> -->
              <el-input
                v-number-two
                @input="threeApartmentInputChange"
                v-model="threeApartmentProfitInput"
                style="width:0.8rem"
              ></el-input>
              <el-select v-model="threeApartmentRatio" style="width:0.6rem;margin-left:0.1rem">
                <el-option label="%" :value="1"></el-option>
                <el-option label="元" :value="2"></el-option>
              </el-select>
            </el-form-item>

            <div class="button_list">
              <div class="button" @click="addPerformancePeople(3)">
                <div class="img"></div>
                <div>新增</div>
              </div>
              <el-form-item>
                <el-radio-group v-model="tips_type">
                  <el-radio name="tips_type" label="1">录比例</el-radio>
                  <el-radio name="tips_type" label="2">录金额</el-radio>
                </el-radio-group>
              </el-form-item>
            </div>
          </div>
          <div class="table" v-if="threeApartmentlist.length != 0">
            <div class="row">
              <div class="col">
                <div class="center">序号</div>
              </div>
              <div class="col">
                <div class="center">分配类型</div>
              </div>
              <div class="col">
                <div class="center">分配部门</div>
              </div>
              <div class="col">
                <div class="center">分配人</div>
              </div>
              <div class="col">
                <div class="center">业绩月份</div>
              </div>
              <div class="col">
                <div class="center">分配比例</div>
              </div>
              <div class="col">
                <div class="center">分配业绩</div>
              </div>
              <div class="col">
                <div class="center">单量</div>
              </div>
              <div class="col">
                <div class="center">公司费用</div>
              </div>
              <div class="col">
                <div class="center">领导人分配业绩</div>
              </div>
            </div>
            <div class="row content" v-for="(v, i) in threeApartmentlist" :key="i">
              <div class="col">
                <div class="center">{{ i + 1 }}</div>
              </div>
              <div class="col">
                <el-form-item>
                  <el-select v-model="v.allotType">
                    <el-option
                      v-for="(item, index) in distributeTypeList"
                      :key="index"
                      :label="item.performanceName"
                      :value="item.id"
                      @click.native="handleallotProportion(v, index)"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </div>
              <div class="col">
                <el-form-item>
                  <el-input
                    v-model="v.allotOrganizationName"
                    @click.native="selsecArea(v)"
                    readonly
                  ></el-input>
                </el-form-item>
              </div>
              <div class="col">
                <el-form-item>
                  <el-input v-model="v.allotUserName" @click.native="selsecPerson(v)" readonly></el-input>
                </el-form-item>
              </div>
              <div class="col">
                <el-form-item>
                  <!-- <el-select v-model="v.allotMonth">
                    <el-option label="第三方" value="1"></el-option>
                    <el-option label="买房" value="2"></el-option>
                    <el-option label="公司内部" value="3"></el-option>
                  </el-select>-->
                  <el-date-picker v-model="v.allotMonth" value-format="yyyy-MM-dd" type="date"></el-date-picker>
                </el-form-item>
              </div>
              <div class="col">
                <el-form-item>
                  <!-- <el-input :disabled="tips_type!=1" v-model="v.allotRatio"></el-input> -->
                  <el-input
                    :disabled="tips_type != 1"
                    @input="computedAllotRatio(v, 2)"
                    v-model="v.allotRatio"
                    v-number-two
                    style="color:#f57107"
                  >
                    <span slot="suffix">%</span>
                  </el-input>
                </el-form-item>
              </div>
              <div class="col">
                <el-form-item>
                  <el-input
                    :disabled="tips_type != 2"
                    @input="computedAllotRatio(v, 2)"
                    v-model="v.allotMoney"
                    v-number-two
                  ></el-input>
                </el-form-item>
              </div>
              <div class="col">
                <el-form-item>
                  <!-- <el-input v-model="v.signNum"></el-input>-->
                  <el-input v-number-two v-model="v.signNum" :disabled="getReportClass == 2"></el-input>
                </el-form-item>
              </div>
              <div class="col">
                <el-form-item>
                  <el-radio-group v-model="performance_info.compCostFlag">
                    <el-radio label="1">是</el-radio>
                    <el-radio label="0">否</el-radio>
                  </el-radio-group>
                </el-form-item>
              </div>
              <div class="col">
                <el-form-item>
                  <el-input v-model="v.leaderUserName" readonly></el-input>
                </el-form-item>
              </div>
              <div class="del" @click="delThreeApartmentlist(v.index, v.id)"></div>
            </div>
          </div>
        </section>
      </el-form>
    </main>
  </div>
</template>

<script>
import form_header from "../../components/form_header";
import GetPerformanceType from "../../../../../net/newHouseDealReport/add/selection/GetPerformanceType.js";
import GetAllotOrgList from "../../../../../net/newHouseDealReport/add/selection/GetAllotOrgList.js";
import GetRangeUserList from "../../../../../net/newHouseDealReport/add/selection/GetRangeUserList.js";
import { CreateCommonRules } from "../utils/Rules";
import { ErpCommon } from "../../../../../utils/ErpCommon";
import { ReportInfoDetailItem } from "../../../../../net/newHouseDealReport/display/reporInfoDetail";
import {
  GetDistributeTypeList,
  GetBrokerageByComp,
} from "../../../../../net/newHouseDealReport/add/selection/AddReporInfo";
const reg = /^[1-9]\d{0,11}$/;
export default {
  components: {
    form_header,
  },
  data() {
    return {
      title: "业绩信息",
      has_co_tips: false,
      brokerageRate: "", //收佣比例 leaseBrokerage saleBrokerage
      leaseBrokerage: {}, //租赁标准佣金信息
      saleBrokerage: {}, //出售标准佣金信息
      // rules: this.setCommonRules(),
      apartment_list: [
        { apartment_name: "业绩分配", apartment_alies: 1 },
        { apartment_name: "驻场部业绩", apartment_alies: 3 },
        { apartment_name: "策划部业绩", apartment_alies: 4 },
        { apartment_name: "扩展部业绩", apartment_alies: 5 },
        { apartment_name: "领导分配提成", apartment_alies: 6 },
      ],
      //分配类型列表
      distributeTypeList: [],
      //二级市场渠道部业绩
      twoApartmentProfit: "",
      twoApartmentProfitInput: "",
      twoApartmentRatio: 1,
      //三级市场渠道部业绩列表
      threeApartmentlist: [],
      //三级市场渠道部业绩
      threeApartmentProfit: "",
      threeApartmentProfitInput: "",
      threeApartmentRatio: 1,
      //部门提成金额
      deptAmount: "",
      //选择区域传值参数
      selectAreaParms: {
        userId: "",
        userName: "",
        organizationId: "",
        organizationName: "",
        selectType: 2, //1选人，2选组织
      },
      //选择分配人传值参数
      selectOrgParms: {
        userId: "",
        userName: "",
        organizationId: "",
        organizationName: "",
        selectType: 1, //1选人，2选组织
      },
      // 当前选择部门
      now_apartment_alies: 1,
      // 当前选择部门所展示的业绩列表
      now_apartment_performance_list: [],
      // 录比例还是录金额
      tips_type: 1,
      performance_info: {
        agencyCommission: "",
        custCommission: "",
        standardCommission: "",
        distributionCommission: "",
        discountCommission: "",
        cashPledgeClass: "",
        leaseFlag: "",
        leaseEndTime: "",
        reportCash: "",
        outCooperations: [],
        reportProfitVOs: [],
      },
    };
  },
  props: {
    //编辑初始化数据
    initData: {
      type: Object,
      default() {
        return new ReportInfoDetailItem();
      },
    },
  },
  watch: {
    initData: {
      handler: function () {
        this.initDetailInfo();
      },
      deep: true,
    },
    //分配部门变化，重新请求分配人
    // 'selectAreaParms.organizationId':{
    //   handler:function(newVal,oldVal){
    //     this.initPersonList();
    //   },
    //   deep:true
    // },
    //监听项目类型的变化
    getReportType() {
      console.log(
        this.$store.state.add_new_hosue_report_store.project_info.reportType,
        "项目类型"
      );
      this.computedBrokerage();
    },
    //认购总价变化
    getOfferAmount() {
      this.computedBrokerage();
    },
    has_co_tips() {
      let b = this.has_co_tips;
      this.has_co_tips = b;
      if (!b) return delete this.performance_info.outCooperations;
      this.addCo();
    },
    tips_type() {
      console.log(this.tips_type);
    },
    performance_info: {
      handler() {
        this.switchNowPerformance();
      },
      deep: true,
    },
    //监听二级与三级市场的变化自动计算对应的渠道部业绩
    twoApartmentProfitInput() {
      if (this.twoApartmentProfitInput !== "") {
        if (this.twoApartmentRatio == 1) {
          if (this.threeApartmentRatio == 1) {
            this.threeApartmentProfitInput = 100 - this.twoApartmentProfitInput;
          } else {
            this.threeApartmentProfitInput =
              this.computeReportCash - this.computedTwoApartmentProfit;
          }
        }
      }
    },
    threeApartmentProfitInput() {
      if (this.threeApartmentProfitInput !== "") {
        if (this.threeApartmentRatio == 1) {
          if (this.twoApartmentRatio == 1) {
            this.twoApartmentProfitInput = 100 - this.threeApartmentProfitInput;
          } else {
            this.twoApartmentProfitInput =
              this.computeReportCash - this.computedThreeApartmentProfit;
          }
        }
      }
    },
  },
  created() {
    //编辑初始化数据
    this.initDetailInfo();
    //获取分配类型数据
    this.initDistributeTypeList();
    //查询标准佣金
    this.initBrokerageByComp();
  },
  methods: {
    //将详情数据对应赋值
    initDetailInfo() {
      let info = this.performance_info;
      //传入的obj(详情数据) 深拷贝一下，防止数据变动时指向同一指针
      let obj = JSON.parse(JSON.stringify(this.initData));
      for (let item in info) {
        info[item] = obj[item];
      }
      console.log(info, "这是业绩信息初始化数据");
    },
    //初始化分配类型列表
    initDistributeTypeList() {
      new GetDistributeTypeList()
        .send()
        .then((res) => {
          console.log(res, "分配类型数据==========");
          this.distributeTypeList = res || [];
        })
        .catch((err) => {
          this.$erpCommon.toast(
            err.errMsg || "服务器开小差了,请稍后再试",
            "error"
          );
        });
    },
    //查询标准佣金
    initBrokerageByComp() {
      let request = {
        houseType: 1,
      };
      new GetBrokerageByComp(request)
        .send()
        .then((res) => {
          console.log(res, "收佣标准佣金");
          let data = res || {};
          this.leaseBrokerage = data["leaseBrokerage"] || {};
          this.saleBrokerage = data["saleBrokerage"] || {};
          this.computedBrokerage();
        })
        .catch((err) => {
          this.$erpCommon.toast(
            err.errMsg || "服务器开小差了,请稍后再试",
            "error"
          );
        });
    },
    //计算标准佣金
    computedBrokerage() {
      let leaseBrokerage = this.leaseBrokerage;
      let saleBrokerage = this.saleBrokerage;
      let reportType = this.$store.state.add_new_hosue_report_store.project_info
        .reportType;
      if (reportType == 3) {
        //租赁 获取收佣比例
        this.brokerageRate = leaseBrokerage.brokerageRate;
      } else {
        //售 获取收佣比例
        this.brokerageRate = saleBrokerage.brokerageRate;
      }
      if (!this.brokerageRate) return;
      let offerAmount =
        (this.$store.state.add_new_hosue_report_store.offerAmount * 10000) /
          100 || 0;
      this.performance_info.standardCommission =
        offerAmount * this.brokerageRate;
      console.log("比例==========：", this.brokerageRate);
    },
    addCo() {
      if (!this.performance_info.outCooperations)
        this.performance_info.outCooperations = [];
      let l = this.performance_info.outCooperations;
      l.push({
        userName: "",
        userIccode: "",
        userMobile: "",
        cooperationClass: "",
        cooperationCost: "",
      });
    },
    delCo(index) {
      this.performance_info.outCooperations.splice(index, 1);
      if (this.performance_info.outCooperations.length != 0) return;
      delete this.performance_info.outCooperations;
      this.has_co_tips = false;
    },
    //输入验证
    btKeyDown(e, maxlength) {
      let value = e.target.value;
      let intVal = value.toString().split(".");
      if (!!intVal[0] && intVal[0].length > maxlength) {
        value = intVal[0].substring(0, maxlength);
      }
      //先把非数字的都替换掉，除了数字和.
      value = value.replace(/[^\d.]/g, "");
      //保证只有出现一个.而没有多个.
      value = value.replace(/\.{2,}/g, ".");
      //必须保证第一个为数字而不是.
      value = value.replace(/^\./g, "");
      //保证.只出现一次，而不能出现两次以上
      value = value.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
      //只能输入两个小数
      value = value.replace(/^(\-)*(\d+)\.(\d\d).*$/, "$1$2.$3");
      //输入比例不能大于100
      if (maxlength == 3 && (value > 100 || value == "100.")) {
        console.log("大于100 了");
        value = 100;
      }
      e.target.value = value;
    },
    //表单验证
    // setCommonRules() {
    //   let params = {
    //     agencyMoney: ["required"],
    //   };
    //   return new CreateCommonRules(params).getCommonRules();
    // },
    // 选择业绩分配类型
    changeApartment(v) {
      this.now_apartment_alies = v;
      this.switchNowPerformance();
    },
    //选择分配部门
    selsecArea(data) {
      console.log(data.allotOrganizationId, "组织============");
      if (data.allotOrganizationId == "") {
        this.selectAreaParms.organizationId = "";
        this.selectAreaParms.organizationName = "";
      } else {
        this.selectAreaParms.organizationId = data.allotOrganizationId;
        this.selectAreaParms.organizationName = data.allotOrganizationName;
      }
      let val = new ErpCommon().openPerformanceAssignee(this.selectAreaParms);
      let info = JSON.parse(val);
      this.selectAreaParms.organizationId = info.organizationId || "";
      this.selectAreaParms.organizationName = info.organizationName || "";
      data.allotOrganizationName = info.organizationName || "";
      data.allotOrganizationId = info.organizationId || "";
      // data.leaderUserName = info.leaderName;  allotUser allotUserName
      console.log(val, "这是筛选分配部门");
    },
    //选择相关人员
    selsecPerson(data) {
      if (data.allotOrganizationId == "") {
        this.selectAreaParms.organizationId = "";
        this.selectAreaParms.organizationName = "";
      } else {
        this.selectAreaParms.organizationId = data.allotOrganizationId;
        this.selectAreaParms.organizationName = data.allotOrganizationName;
        this.selectOrgParms.organizationId = data.allotOrganizationId;
      }
      this.selectOrgParms.selectType = 1;
      if (this.selectOrgParms.organizationId == "") {
        this.$erpCommon.toast("请选择组织");
        return;
      }
      let val = new ErpCommon().openPerformanceAssignee(this.selectOrgParms);
      let info = JSON.parse(val);
      data.allotUser = info.userId || "";
      data.allotUserName = info.userName || "";
      //去除包含自己的领导人
      if (info.leaderId.indexOf(info.userId + ",") != -1) {
        data.leaderUserId = info.leaderId.replace(info.userId + ",", "");
      } else {
        data.leaderUserId = info.leaderId.replace(info.userId, "");
      }
      if (info.leaderName.indexOf(info.userName + ",") != -1) {
        data.leaderUserName = info.leaderName.replace(info.userName + ",", "");
      } else {
        data.leaderUserName = info.leaderName.replace(info.userName, "");
      }

      // data.leaderUserName = info.leaderName.replace(info.userName + ",", "");
      // data.leaderUserId = info.leaderId || "--";
      // data.leaderUserName = info.leaderName || "--";
      console.log(val, "这是筛选相关人员", data.leaderUserName);
    },
    // 新增业绩分配
    addPerformancePeople(val) {
      console.log(val, "这是新增index");
      if (val == 2) {
        this.now_apartment_alies = 1;
      } else if (val == 3) {
        this.now_apartment_alies = 2;
      }
      if (
        !this.performance_info.reportProfitVOs ||
        this.performance_info.reportProfitVOs.length == 0
      ) {
        this.performance_info.reportProfitVOs = [];
      }
      let all_l = this.performance_info.reportProfitVOs;
      let index = all_l.length;
      all_l.push({
        profitType: this.now_apartment_alies, //业绩类型 1：二级市场渠道部业绩  2：三级市场渠道部业绩  3：驻场部提成  4：策划部提成  5：拓展部提成  6：领导提成分配
        allotMoney: "",
        allotMonth: "",
        allotOrganizationId: "",
        allotOrganizationName: "",
        allotRatio: 0,
        allotType: "",
        allotTypeName: "",
        allotUser: "",
        allotUserName: "",
        compCostFlag: "", //是否为公司费用 0：否 1：是
        leaderUserId: "", //领导人ID字符串，逗号分隔
        leaderUserName: "", //领导人姓名字符串，逗号分隔
        reportId: "", //成交报告ID
        signNum: "", //单量
        // 下面是需要过滤的
        index,
      });
      //三级市场渠道部业绩列表(需要二级分隔开)
      if (this.now_apartment_alies == 2) {
        this.threeApartmentlist = all_l.filter((v) => {
          return v.profitType == 2;
        });
        console.log(this.threeApartmentlist, "三级市场");
        console.log(all_l, "总列表");
      }
    },
    delPerformancePeople(index, id = false) {
      let _arr = this.performance_info.reportProfitVOs;
      if (id) {
        _arr = _arr.filter((v) => v.id != id);
        //重新赋值 若替换数组不能触发视图更新
        this.performance_info.reportProfitVOs = _arr;
        return;
      }
      return _arr.splice(index, 1);
    },
    //删除三级渠道部列表
    delThreeApartmentlist(index, id = false) {
      let _arr = this.threeApartmentlist;
      let allArr = this.performance_info.reportProfitVOs;
      if (id) {
        _arr = _arr.filter((v) => v.id != id);
        allArr = allArr.filter((v) => v.id != id);
        //重新赋值 若替换数组不能触发视图更新
        this.threeApartmentlist = _arr;
        this.performance_info.reportProfitVOs = allArr;
        return;
      }
      _arr.splice(index, 1);
      allArr.splice(index, 1);
      return;
    },
    //切换录金额比例
    switchAddType(type, num) {
      switch (Number(type)) {
        case 1:
          if (this.tips_type == 1) return num;
          return Number(num) * 2;
          break;
        case 2:
          if (this.tips_type == 2) return num;
          return Number(num) * 2;

          break;
      }
    },
    // 切换当前显示部门业绩列表
    switchNowPerformance() {
      if (
        !this.performance_info.reportProfitVOs ||
        this.performance_info.reportProfitVOs.length == 0
      )
        return (this.now_apartment_performance_list = []);
      //若当前为业绩分配则需特殊处理（二级、三级渠道部业绩）
      if (this.now_apartment_alies == 1 || this.now_apartment_alies == 2) {
        //二级渠道部列表
        this.now_apartment_performance_list = this.performance_info.reportProfitVOs.filter(
          (v) => {
            return v.profitType == 1;
          }
        );
        //三级渠道部列表
        this.threeApartmentlist = this.performance_info.reportProfitVOs.filter(
          (v) => {
            return v.profitType == 2;
          }
        );
        return;
      }
      this.now_apartment_performance_list = this.performance_info.reportProfitVOs.filter(
        (v) => {
          return v.profitType == this.now_apartment_alies;
        }
      );
    },
    //二级渠道部业绩输入矫正 <=100%
    twoApartmentInputChange() {
      if (this.twoApartmentRatio == 1) {
        if (this.twoApartmentProfitInput > 100)
          this.twoApartmentProfitInput = 100;
        return;
      }
    },
    //三级级渠道部业绩输入矫正 <=100%（可与二级带封装）
    threeApartmentInputChange() {
      if (this.threeApartmentRatio == 1) {
        if (this.threeApartmentProfitInput > 100)
          this.threeApartmentProfitInput = 100;
        return;
      }
    },
    //savePerformanceInfo保存业绩信息
    savePerformanceInfo() {
      this.performance_info.reportCash = this.computeReportCash;
      this.performance_info.discountCommission = this.getDiscountCommission;
      this.$emit("performanceInfo", this.performance_info);
    },
    //计算分配比例 分配业绩  tips_type:为1录比例 2 录金额  index ->1 二级渠道部 2三级渠道部
    computedAllotRatio(item, index) {
      let reportCash = 0;
      if (item.allotRatio > 100) item.allotRatio = 100;
      if (index == 1) {
        reportCash = JSON.parse(
          JSON.stringify(this.computedTwoApartmentProfit)
        );
      } else {
        reportCash = JSON.parse(
          JSON.stringify(this.computedThreeApartmentProfit)
        );
      }
      if (this.tips_type == 1) {
        item.allotMoney = this.keepTwoDecimal(
          (item.allotRatio / 100) * reportCash || 0
        );
      } else if (this.tips_type == 2) {
        item.allotRatio = this.keepTwoDecimal(
          (item.allotMoney / reportCash) * 100 || 0
        );
      }
      if (item.allotMoney > reportCash) item.allotMoney = reportCash;
    },
    //增加外部合作费
    addOutCooperations() {
      console.log("进来了");
    },
    //选择分配类型赋值
    handleallotProportion(data, index) {
      console.log(data, index, "选中的值");
      let val = this.distributeTypeList[index];
      if (val.type == 1) {
        data.allotRatio = val.performanceProportion || 0;
        data.allotMoney = this.keepTwoDecimal(
          (this.computedTwoApartmentProfit / 100) * data.allotRatio || 0
        );
      } else {
        data.allotMoney = val.performanceProportion || 0;
        data.allotRatio = this.keepTwoDecimal(
          this.computedTwoApartmentProfit / data.allotMoney || 0
        );
      }
      console.log(
        JSON.parse(JSON.stringify(this.distributeTypeList[index])),
        "Fhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh"
      );
    },
    //业绩分配保存验证
    performanceCheck() {
      //代理佣金必填
      if (this.performance_info.agencyCommission === "") {
        this.$erpCommon.toast("请输入代理佣金");
        return false;
      }
      //若类型为租赁,是否有租约必填
      if (this.getReportType == 3 && this.performance_info.leaseFlag === "") {
        this.$erpCommon.toast("请选择是否有租约");
        return false;
      }
      // 若类型为租赁,租约到期日期必填
      if (
        this.getReportType == 3 &&
        this.performance_info.leaseEndTime === ""
      ) {
        this.$erpCommon.toast("请选择租约到期日期");
        return false;
      }
      // 若类型为租赁,押金类型必填
      if (
        this.getReportType == 3 &&
        this.performance_info.cashPledgeClass === ""
      ) {
        this.$erpCommon.toast("请选择押金类型");
        return false;
      }
      //若勾选外部合作费，但未录入信息，则不能保存
      if (this.has_co_tips) {
        let arr = this.performance_info.outCooperations || [];
        for (let item of arr) {
          if (item.userName == "" || !item.userName) {
            this.$erpCommon.toast("请输入合作人姓名");
            return false;
          }
          if (item.userIccode == "" || !item.userIccode) {
            this.$erpCommon.toast("请输入合作人身份证");
            return false;
          }
          if (item.userMobile == "" || !item.userMobile) {
            this.$erpCommon.toast("请输入合作人电话号码");
            return false;
          }
          if (item.cooperationClass == "" || !item.cooperationClass) {
            this.$erpCommon.toast("请输入选择合作人类型");
            return false;
          }
          if (item.cooperationCost == "" || !item.cooperationCost) {
            this.$erpCommon.toast("请输入合作费");
            return false;
          }
        }
      }
      //业绩分配必须有一条选择公司费用
      let reportProfitVOs = this.performance_info.reportProfitVOs || [];
      if (reportProfitVOs.length == 0) {
        this.$erpCommon.toast("请填写业绩分配");
        return false;
      } else if (reportProfitVOs.length > 0) {
        let hasCompCost = false;
        //各业绩分配部门
        let obj = {
          "1": [],
          "2": [],
          "3": [],
          "4": [],
          "5": [],
          "6": [],
        };
        reportProfitVOs.forEach((item, index) => {
          if (item.compCostFlag !== "") {
            hasCompCost = true;
          }
          if (!item.profitType) {
            reportProfitVOs.splice(index, 1);
          } else {
            obj[item.profitType].push(item);
          }
        });
        if (!hasCompCost) {
          this.$erpCommon.toast("业绩分配必须有一条选择公司费用");
          return false;
        }
        //分配单量必须大于0.1且为0.1的倍数或为0，单量总和等于1  ，类别为事后加佣，业绩分配单量加起来必须是0
        //成交人员必须在业绩分配中，才可新增成功
        let isPersonInPerformance = false;
        for (let index in obj) {
          let signNum = 0;
          let allotRatio = 0;
          let arr = obj[index];
          console.log(arr, "数组=========", obj);
          if (arr.length <= 0) continue;
          for (let key of arr) {
            console.log(
              key.signNum,
              "jifjejoawjfo",
              JSON.parse(JSON.stringify(arr))
            );
            signNum += parseInt(key.signNum) || 0;
            allotRatio += parseInt(key.allotRatio) || 0;
            if (!this.isPerformanceNull(key)) {
              return false;
            }
          }
          console.log(this.getReportClass, "类别------------");
          console.log(signNum, "单量总和");
          if (
            this.getReportClass == 3 &&
            this.reportCommissionNo != "" &&
            (arr[0].profitType == 1 || arr[0].profitType == 2)
          ) {
            // 分配单量必须为0
            if (signNum != 0) {
              this.$erpCommon.toast("分配单量必须为0");
              return false;
            }
          }
          if (
            this.getReportClass == 2 &&
            (arr[0].profitType == 1 || arr[0].profitType == 2)
          ) {
            // 分配单量必须为0
            if (signNum != 0) {
              this.$erpCommon.toast("分配单量必须为0");
              return false;
            }
          }
          if (
            this.getReportClass != 2 &&
            this.getReportClass != 3 &&
            (arr[0].profitType == 1 || arr[0].profitType == 2)
          ) {
            if (signNum != 1) {
              this.$erpCommon.toast("单量总和需等于1");
              return false;
            }
          }
          if (allotRatio != 100) {
            this.$erpCommon.toast("分配比例总和需等于100%");
            return false;
          }
        }
      }
      //判断项目类别
      console.log(this.getReportClass, "项目类别");
      //分配单量必须大于0.1且为0.1的倍数或为0，单量总和等于1  ，类别为事后加佣，业绩分配单量加起来必须是0
      // if(){}

      // if(){}
      // 二级市场与三级市场中德人员不可重复
      // if(){}
      return true;
    },
    //验证每条业绩分配是否为空
    isPerformanceNull(item) {
      if (item.profitType == 1 || item.profitType == 2) {
        if (!item.allotMonth) {
          this.$erpCommon.toast("请选择业绩月份");
          return false;
        }
        if (item.allotMoney === "") {
          this.$erpCommon.toast("请填写分配业绩");
          return false;
        }
      } else {
        if (!item.allotMonth) {
          this.$erpCommon.toast("请选择提成月份");
          return false;
        }
        if (item.allotMoney === "") {
          this.$erpCommon.toast("请填写分配提成");
          return false;
        }
      }
      if (!item.allotType) {
        this.$erpCommon.toast("请选择分配类型");
        return false;
      }
      if (!item.allotOrganizationId) {
        this.$erpCommon.toast("请选择分配部门");
        return false;
      }
      if (!item.allotUser) {
        this.$erpCommon.toast("请选择分配人");
        return false;
      }
      if (item.allotRatio === "") {
        this.$erpCommon.toast("请选择分配比例");
        return false;
      }
      if (item.signNum === "") {
        this.$erpCommon.toast("请输入单量");
        return false;
      }
      return true;
    },
    //最多保留两位小数
    keepTwoDecimal(data) {
      let value = data.toString() || "0";
      //先把非数字的都替换掉，除了数字和.
      value = value.replace(/[^\d.]/g, "");
      //保证只有出现一个.而没有多个.
      value = value.replace(/\.{2,}/g, ".");
      //必须保证第一个为数字而不是.
      value = value.replace(/^\./g, "");
      //保证.只出现一次，而不能出现两次以上
      value = value.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
      //只能输入两个小数
      value = value.replace(/^(\-)*(\d+)\.(\d\d).*$/, "$1$2.$3");
      return value;
    },
  },
  computed: {
    //计算折扣
    getDiscountCommission() {
      if (this.computeReportCash && this.performance_info.standardCommission) {
        let val =
          (this.computeReportCash / this.performance_info.standardCommission) *
          100;
        if (val > 100) val = 100;
        if (val < 0) val = 0;
        return this.keepTwoDecimal(val || 0);
      } else {
        return 0;
      }
    },
    //获取项目类型
    getReportType() {
      return this.$store.state.add_new_hosue_report_store.project_info
        .reportType;
    },
    //获取项目类别
    getReportClass() {
      //若为时候加佣则业绩分配单量为0
      let reportClass = this.$store.state.add_new_hosue_report_store
        .project_info.reportClass;
      if (reportClass == 2) {
        for (let item of this.performance_info.reportProfitVOs) {
          item.signNum = 0;
        }
      }
      return reportClass;
    },
    //获取项目主单号
    getReportCommissionNo() {
      return this.$store.state.add_new_hosue_report_store.project_info
        .reportCommissionNo;
    },
    //获取成交总价
    getOfferAmount() {
      return this.$store.state.add_new_hosue_report_store.offerAmount;
    },
    //计算上报业绩
    computeReportCash() {
      let custCommission = this.performance_info.custCommission * 1 || 0;
      let agencyCommission = this.performance_info.agencyCommission * 1 || 0;
      let reportType = this.$store.state.add_new_hosue_report_store.project_info
        .reportType;
      let cash = 0;
      if (reportType == 1 || reportType == 3) {
        cash =
          custCommission +
          agencyCommission -
          (this.has_co_tips ? this.coTipsTotal : 0);
        cash = this.keepTwoDecimal(cash || 0);
        return cash < 0 ? 0 : cash;
      } else if (reportType == 2) {
        cash =
          custCommission +
          agencyCommission -
          (this.coTipsTotal || 0) -
          (this.performance_info.distributionCommission || 0);
        cash = this.keepTwoDecimal(cash || 0);
        return cash < 0 ? 0 : cash;
      }
    },
    //外部合作费
    coTipsTotal() {
      if (!this.performance_info.outCooperations) return 0;
      let l = this.performance_info.outCooperations;
      if (l.length == 0) return 0;
      let sum = 0;
      for (let v of l) {
        if (!v.cooperationCost) break;
        sum += Number(v.cooperationCost);
      }
      return sum;
    },
    //计算部门提成金额
    computedDeptAmount() {
      let deptAmount = 0;
      console.log(this.now_apartment_performance_list, "现在的列表");
      let nowList = this.now_apartment_performance_list;
      nowList.forEach((item, index) => {
        deptAmount += parseInt(item.allotMoney) || 0;
      });
      if (deptAmount > this.computedTwoApartmentProfit) {
        this.$erpCommon.toast("部门提成金额不能大于项目分成");
        deptAmount = this.computedTwoApartmentProfit;
        return deptAmount;
      }
      return deptAmount;
    },
    //计算二级渠道部市场业绩
    computedTwoApartmentProfit() {
      // 按金额录取
      if (this.twoApartmentRatio === "" || this.threeApartmentRatio === "")
        return 0;
      if (this.twoApartmentRatio == 2) {
        return this.keepTwoDecimal(this.twoApartmentProfitInput || 0);
      } else {
        //按比例录取
        //获取上报业绩
        let reportCash = this.computeReportCash;
        return this.keepTwoDecimal(
          reportCash * (this.twoApartmentProfitInput / 100) || 0
        );
      }
    },
    //计算三级渠道部市场业绩
    computedThreeApartmentProfit() {
      // 按金额录取
      if (this.threeApartmentRatio == 2) {
        return this.keepTwoDecimal(this.threeApartmentProfitInput || 0);
      } else {
        //按比例录取
        //获取上报业绩
        let reportCash = this.computeReportCash;
        return this.keepTwoDecimal(
          reportCash * (this.threeApartmentProfitInput / 100) || 0
        );
      }
    },
  },
  filter: {},
};
</script>

<style lang="less" scoped>
@del_icon: url("../../../../../assets/images/public/delete_200.png");
.performance_info {
  padding-bottom: 0.6rem;
  main {
    width: 10.24rem;
    margin: 0 auto;
    /deep/ .el-form {
      & > section {
        &:nth-of-type(1),
        &:nth-of-type(2),
        &:nth-of-type(3) {
          & > .el-form-item {
            & > .el-form-item__content {
              & > .el-input,
              & > .el-select {
                width: 1.15rem;
              }
            }
          }
        }
        &:nth-of-type(3) {
          & > .el-form-item {
            & > .el-form-item__content {
              & > .el-select {
                margin-left: 0.08rem;
                width: 0.6rem;
              }
            }
          }
        }
        &:nth-of-type(4) {
          height: 0.75rem;
          position: relative;
          & > .el-form-item {
            position: absolute;
            transform: translateY(-50%);
            top: 50%;
            width: 0.78rem;
            cursor: pointer;
            left: 0;
            & > .el-form-item__content {
              height: 0.2rem;
              width: 100%;
              & > .el-checkbox-group {
                & > .el-checkbox {
                  display: flex;
                  justify-content: flex-start;
                  align-items: center;
                  & > .el-checkbox__label {
                    font-size: 0.14rem;
                    font-weight: bold;
                    padding-left: 0.12rem;
                    display: block;
                  }
                  & > .el-checkbox__input {
                    width: 0.14rem;
                    height: 0.14rem;
                    display: block;
                    & > .el-checkbox__inner {
                      width: 100%;
                      height: 100%;
                    }
                  }
                }
              }
            }
          }
        }
        &:nth-of-type(5) {
          padding-left: 0.66rem;
          & > .co_tip {
            margin-bottom: 0.19rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            & > .add_co {
              width: 0.46rem;
              display: flex;
              justify-content: space-between;
              align-items: center;
              cursor: pointer;
              &:hover {
                color: #259cf3;
              }
              & > .img {
                height: 0.15rem;
                width: 0.15rem;
                border-radius: 50%;
                background-image: url("../../../../../assets/images/public/add_200.png");
                background-size: contain;
                background-position: center;
              }
            }
          }
          & > .table {
            width: 100%;
            border: solid 0.01rem #eaeaea;
            border-bottom: none;
            background-color: #fff;
            margin-bottom: 0.31rem;
            & > .row {
              height: 0.5rem;
              display: flex;
              position: relative;
              border-bottom: solid 0.01rem #eaeaea;
              width: 100%;
              &.content:hover {
                background-color: #fcfcfc;
                & > .del {
                  display: block;
                }
              }
              & > .col {
                height: 100%;
                line-height: 0.5rem;
                position: relative;
                &:nth-of-type(1) {
                  width: 0.8rem;
                }
                &:nth-of-type(2) {
                  width: 1.29rem;
                }
                &:nth-of-type(3) {
                  width: 2.08rem;
                }
                &:nth-of-type(4) {
                  width: 1.95rem;
                }
                &:nth-of-type(5) {
                  width: 1.6rem;
                }
                &:nth-of-type(6) {
                  width: 1.6rem;
                  /deep/ .el-input input {
                    color: #f57107;
                  }
                }
                & > .el-form-item {
                  width: 70%;
                  position: absolute;
                  transform: translate(-50%, -50%);
                  top: 50%;
                  left: 50%;
                  margin-left: 0;
                  & > .el-form-item__content {
                    width: 100%;
                    & > .el-input,
                    & > .el-select {
                      margin-left: 0;
                      width: 100%;
                    }
                  }
                }
                & > div {
                  position: absolute;
                  transform: translate(-50%, -50%);
                  top: 50%;
                  left: 50%;
                }
              }
              & > .del {
                width: 0.11rem;
                height: 0.13rem;
                background-size: cover;
                background-position: center;
                background-image: @del_icon;
                display: none;
                cursor: pointer;
                position: absolute;
                right: 0.16rem;
                top: 50%;
                transform: translateY(-50%);
              }
            }
          }
        }
        &:nth-of-type(6) {
          padding-left: 0.66rem;
          position: relative;
          margin-bottom: 0.31rem;
          min-height: 0.5rem;
          .title {
            font-size: 0.14rem;
            font-weight: bold;
            color: #666;
          }
          .tabs_list {
            display: flex;
            justify-content: space-between;
            width: 4.3rem;
            align-items: center;
            height: 100%;
            position: absolute;
            // left: 1.48rem;
            transform: translateY(-50%);
            top: 50%;
            & > .tab {
              cursor: pointer;
              &.seleced_apartment,
              &:hover {
                color: #259cf3;
                position: relative;
                &::after {
                  content: "";
                  position: absolute;
                  bottom: -0.05rem;
                  left: 0;
                  background-color: #259cf3;
                  height: 0.01rem;
                  width: 100%;
                }
              }
            }
          }
        }
        &.tips_table {
          padding-left: 0.66rem;
          & > .tips {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 0.17rem;
            .projectShare {
              display: flex;
              justify-content: space-between;
              align-items: center;
              min-width: 2.8rem;
            }
            & > .button_list {
              display: flex;
              justify-content: space-between;
              align-items: center;
              width: 1.9rem;
              & > .button {
                width: 0.44rem;
                display: flex;
                justify-content: space-between;
                align-items: center;
                cursor: pointer;
                & > .img {
                  width: 0.15rem;
                  height: 0.15rem;
                  border-radius: 50%;
                  background-position: center;
                  background-size: contain;
                  background-image: url("../../../../../assets/images/public/add_200.png");
                }
              }
              & > .el-form-item {
                margin: 0;
                width: 1.28rem;
                .el-radio-group {
                  display: flex;
                  justify-content: space-between;
                  align-items: center;
                  label {
                    line-height: 0.3rem;
                    display: flex;
                    width: 0.57rem;
                    justify-content: space-between;
                    align-items: center;
                    span {
                      display: block;
                      .el-radio__inner {
                        display: inline-block;
                      }
                    }
                    .el-radio__input {
                      width: 0.15rem;
                      height: 0.15rem;
                    }
                  }
                }
              }
            }
          }
          & > .table {
            width: 100%;
            border: solid 0.01rem #eaeaea;
            border-bottom: none;
            background-color: #fff;
            & > .row {
              width: 100%;
              height: 0.5rem;
              display: flex;
              position: relative;
              border-bottom: solid 0.01rem #eaeaea;
              box-sizing: border-box;
              // justify-content: space-around;
              &.content:hover {
                background-color: #fcfcfc;
                & > .del {
                  display: block;
                }
              }
              & > .col {
                height: 100%;
                line-height: 0.5rem;
                position: relative;
                display: flex;
                justify-content: space-around;
                align-items: center;

                &:nth-of-type(1) {
                  width: 10%;
                }
                &:nth-of-type(2) {
                  width: 20%;
                }
                &:nth-of-type(3) {
                  width: 20%;
                }
                &:nth-of-type(4) {
                  width: 12%;
                }
                &:nth-of-type(5) {
                  width: 12%;
                }
                &:nth-of-type(6) {
                  width: 12%;
                }
                &:nth-of-type(7) {
                  width: 10%;
                }
                &:nth-of-type(8) {
                  width: 7%;
                }
                &:nth-of-type(9) {
                  width: 10%;
                  & > .el-form-item {
                    & > .el-form-item__content {
                      & > .el-radio-group {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        & > label {
                          display: block;
                          line-height: 0.3rem;
                          .el-radio__inner {
                            display: inline-block;
                            width: 0.15rem;
                            height: 0.15rem;
                            margin-right: 0.07rem;
                          }
                        }
                      }
                    }
                  }
                }
                &:nth-of-type(10) {
                  width: 14%;
                }
                & > .el-form-item {
                  width: 70%;
                  position: absolute;
                  transform: translate(-50%, -50%);
                  top: 50%;
                  left: 50%;
                  margin-left: 0;
                  & > .el-form-item__content {
                    width: 100%;
                    & > .el-input,
                    & > .el-select {
                      margin-left: 0;
                      width: 100%;
                    }
                  }
                }
                & > .center {
                  position: absolute;
                  transform: translate(-50%, -50%);
                  top: 50%;
                  left: 50%;
                  width: 100%;
                  text-align: center;
                }
              }
              & > .del {
                width: 0.11rem;
                height: 0.13rem;
                background-size: cover;
                background-position: center;
                background-image: @del_icon;
                display: none;
                cursor: pointer;
                position: absolute;
                right: 0.16rem;
                top: 50%;
                transform: translateY(-50%);
              }
            }
          }
        }
      }
    }
  }
}
.c_ff8002 {
  color: #ff8002;
  font-weight: bold;
}
</style>
