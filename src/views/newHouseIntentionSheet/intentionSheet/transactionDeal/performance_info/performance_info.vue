<template>
  <div class="performance_info">
    <main>
      <form_header :title="title" />
      <el-form
        :rules="rules"
        :inline="true"
        :model="performance_info"
        class="demo-form-inline"
        ref="performance_infoRef"
      >
        <section>
          <el-form-item prop="agencyMoney">
            <div class="input_title required">
              <span>代</span><span>理</span><span>佣</span><span>金</span>
            </div>
            <!-- <el-input v-model="performance_info.agencyCommission"></el-input> -->
            <el-input
              v-number-two
              maxlength="11"
              v-model="performance_info.agencyCommission"
            >
            </el-input>
          </el-form-item>
          <el-form-item>
            <div class="input_title">
              <span>客</span><span>户</span><span>佣</span><span>金</span>
            </div>
            <!-- <el-input v-model="performance_info.custCommission"></el-input> -->
            <el-input
              v-number-two
              maxlength="11"
              v-model="performance_info.custCommission"
            >
            </el-input>
          </el-form-item>
          <el-form-item>
            <div class="input_title">
              <span>标</span><span>准</span><span>佣</span><span>金</span>
            </div>
            <!-- <el-input v-model="performance_info.standardCommission"></el-input> -->
            <el-input
              v-number-two
              maxlength="11"
              disabled
              v-model="performance_info.standardCommission"
            >
            </el-input>
          </el-form-item>
          <el-form-item>
            <div class="input_title">
              <span>分</span><span>销</span><span>佣</span><span>金</span>
            </div>
            <!-- <el-input v-model="performance_info.distributionCommission"></el-input> -->
            <el-input
              v-number-two
              maxlength="11"
              v-model="performance_info.distributionCommission"
            >
            </el-input>
          </el-form-item>
        </section>

        <section>
          <el-form-item>
            <div class="input_title"><span>折</span><span>扣</span></div>
            <!-- <el-input v-model="performance_info.discountCommission"></el-input> -->
            <el-input
              @keydown.native="btKeyDown"
              @keyup.native="btKeyDown"
              maxlength="2"
              disabled
              v-model.number="performance_info.discountCommission"
            >
              <span slot="suffix">%</span>
            </el-input>
          </el-form-item>
          <el-form-item>
            <div class="input_title">
              <span>押</span><span>金</span><span>类</span><span>型</span>
            </div>
            <el-select v-model="performance_info.cashPledgeClass">
              <el-option label="押二付一" value="1"></el-option>
              <el-option label="押二付二" value="2"></el-option>
              <el-option label="押二付三" value="3"></el-option>
            </el-select>
          </el-form-item>
          <!-- <el-form-item>
            <div class="input_title"><div class="long_title">是否有租约</div></div>
            <el-input v-model="performance_info.leaseFlag"></el-input>
          </el-form-item>
          <el-form-item>
            <div class="input_title"><div class="long_title">租约到期日期</div></div>
            <el-input v-model="performance_info.leaseEndTime"></el-input>
          </el-form-item> -->
        </section>

        <section>
          <el-form-item>
            <div class="input_title">
              <span>上</span><span>报</span><span>业</span><span>绩</span>
            </div>
            <!-- <el-input v-model="performance_info.reportCash"></el-input> -->
            <el-input
              v-number-two
              maxlength="11"
              disabled
              v-model="computeReportCash"
            >
            </el-input>
          </el-form-item>
          <!-- <el-form-item>
            <div class="input_title"><span>项</span><span>目</span><span>分</span><span>成</span></div>
            <el-input v-model="performance_info.projectDivided"></el-input>
            <el-select v-model="performance_info.dividedUnit">
              <el-option label="%" value="1"></el-option>
              <el-option label="元" value="2"></el-option>
            </el-select>
          </el-form-item> -->
        </section>

        <section>
          <el-form-item>
            <el-checkbox-group v-model="has_co_tips">
              <el-checkbox name="type" label="外部合作费"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </section>

        <section v-show="has_co_tips">
          <div class="co_tip">
            <div>
              合作费合计: <span class="c_ff8002">{{ coTipsTotal }}</span>
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
              <div class="col"><div>序号</div></div>
              <div class="col"><div>合作人</div></div>
              <div class="col"><div>身份证</div></div>
              <div class="col"><div>联系方式</div></div>
              <div class="col"><div>类型</div></div>
              <div class="col"><div>合作费</div></div>
            </div>
            <div
              class="row content"
              v-for="(v, i) in performance_info.outCooperations"
              :key="i"
            >
              <div class="col">
                <div>{{ i + 1 }}</div>
              </div>
              <div class="col">
                <el-form-item
                  ><el-input v-model="v.userName"></el-input
                ></el-form-item>
              </div>
              <div class="col">
                <el-form-item
                  ><el-input v-model="v.userIccode"></el-input
                ></el-form-item>
              </div>
              <div class="col">
                <el-form-item
                  ><el-input v-model="v.userMobile"></el-input
                ></el-form-item>
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
                <el-form-item
                  ><el-input v-model="v.cooperationCost"></el-input
                ></el-form-item>
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
                seleced_apartment: now_apartment_alies === v.apartment_alies,
              }"
              @click="changeApartment(v.apartment_alies)"
            >
              {{ v.apartment_name }}
            </div>
          </div>
        </section>

        <section class="tips_table">
          <div class="tips">
            <div v-if="now_apartment_alies === 1 ||now_apartment_alies === 2">
              二级市场部业绩: <span class="c_ff8002">{{ computedTwoApartmentProfit }}元</span>
            </div>

            <el-form-item v-if="now_apartment_alies === 1 ||now_apartment_alies === 2">
              <div class="input_title">
                <span>项</span><span>目</span><span>分</span><span>成</span>
              </div>
              <!-- <el-input v-model="performance_info.projectDivided"></el-input> -->
              <el-input
               v-number-two
                maxlength="11"
                v-model="twoApartmentProfitInput"
                @input="twoApartmentInputChange"
                style="width:1.3rem"
              >
              </el-input>
              <el-select v-model="twoApartmentRatio"  style="width:0.6rem">
                <el-option label="%" value=1></el-option>
                <el-option label="元" value=2></el-option>
              </el-select>
            </el-form-item>

            <div v-else>
              项目分成: <span class="c_ff8002">{{ coTipsTotal }}</span>
            </div>
            <div v-if="now_apartment_alies !== 1 && now_apartment_alies !== 2">
              部门提成金额: <span class="c_ff8002">{{ coTipsTotal }}</span>
            </div>
            <div class="button_list">
              <div class="button" @click="addPerformancePeople(now_apartment_alies === 1 ||now_apartment_alies === 2?2:1)">
                <div class="img"></div>
                <div>新增</div>
              </div>
              <el-form-item>
                <el-radio-group v-model="tips_type">
                  <el-radio name="tips_type" label=1>录比例</el-radio>
                  <el-radio name="tips_type" label=2>录金额</el-radio>
                </el-radio-group>
              </el-form-item>
            </div>
          </div>
          <div class="table" v-if="now_apartment_performance_list.length != 0">
            <div class="row">
              <div class="col"><div class="center">序号</div></div>
              <div class="col"><div class="center">分配类型</div></div>
              <div class="col"><div class="center">分配部门</div></div>
              <div class="col"><div class="center">分配人</div></div>
              <div class="col"><div class="center">业绩月份</div></div>
              <div class="col"><div class="center">分配比例</div></div>
              <div class="col"><div class="center">分配业绩</div></div>
              <div class="col"><div class="center">单量</div></div>
              <div class="col"><div class="center">公司费用</div></div>
              <div class="col"><div class="center">领导人分配业绩</div></div>
            </div>
            <div
              class="row content"
              v-for="(item, i) in now_apartment_performance_list"
              :key="i"
            >
              <div class="col">
                <div class="center">{{ i + 1 }}</div>
              </div>
              <div class="col">
                <el-form-item>
                  <el-select v-model="item.allotType">
                    <el-option
                      v-for="(item, i) in getPerformanceType"
                      :key="i"
                      :label="item.performanceName"
                      :value="item.performanceProportion"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </div>
              <div class="col">
                <el-form-item>
                  <el-input
                    v-model="item.allotOrganizationId"
                    @click.native="selsecArea(item)"
                    readonly
                  ></el-input>
                </el-form-item>
              </div>
              <div class="col">
                <el-form-item>
                  <el-input
                    v-model="item.allotUser"
                    @click.native="selsecPerson(item)"
                    readonly
                  ></el-input>
                </el-form-item>
              </div>
              <div class="col">
                <el-form-item>
                  <el-select v-model="item.allotMonth">
                    <el-option label="第三方" value="1"></el-option>
                    <el-option label="买房" value="2"></el-option>
                    <el-option label="公司内部" value="3"></el-option>
                  </el-select>
                </el-form-item>
              </div>
              <div class="col">
                <el-form-item
                  ><el-input
                    :disabled="tips_type != 1"
                    @input="computedAllotRatio(item,1)"
                    v-model="item.allotRatio"
                     v-number-two
                    style="color:#f57107"
                    maxlength="11"
                  >
                  <span slot="suffix">%</span>
                  </el-input
                ></el-form-item>
              </div>
              <div class="col">
                <el-form-item
                  ><el-input
                    :disabled="tips_type != 2"
                     @input="computedAllotRatio(item,1)"
                    v-model="item.allotMoney"
                    v-number-two
                    maxlength="11"
                  ></el-input
                ></el-form-item>
              </div>
              <div class="col">
                <el-form-item
                  ><el-input 
                  v-model="item.signNum"
                   v-number-two
                    maxlength="11"
                  ></el-input
                ></el-form-item>
              </div>
              <div class="col">
                <el-form-item>
                  <el-radio-group v-model="item.compCostFlag">
                    <el-radio label="是"></el-radio>
                    <el-radio label="否"></el-radio>
                  </el-radio-group>
                </el-form-item>
              </div>
              <div class="col">
                <el-form-item
                  ><el-input v-model="item.leaderUserId" readonly></el-input
                ></el-form-item>
              </div>
              <div
                class="del"
                @click="delPerformancePeople(item.index, item.id)"
              ></div>
            </div>
          </div>
        </section>

        <section class="tips_table" v-if="now_apartment_alies === 1 ||now_apartment_alies === 2">
          <div class="tips">
            <div>
              三级市场部业绩: <span class="c_ff8002">{{ computedThreeApartmentProfit }}元</span>
            </div>

             <el-form-item v-if="now_apartment_alies === 1 ||now_apartment_alies === 2">
              <div class="input_title">
                <span>项</span><span>目</span><span>分</span><span>成</span>
              </div>
              <!-- <el-input v-model="performance_info.projectDivided"></el-input> -->
              <el-input
               v-number-two
                maxlength="11"
                @input="threeApartmentInputChange"
                v-model.number="threeApartmentProfitInput"
                style="width:1.3rem"
              >
              </el-input>
              <el-select v-model="threeApartmentRatio"  style="width:0.6rem">
                <el-option label="%" value="1"></el-option>
                <el-option label="元" value="2"></el-option>
              </el-select>
            </el-form-item>

            <div class="button_list">
              <div class="button" @click="addPerformancePeople(3)">
                <div class="img"></div>
                <div>新增</div>
              </div>
              <el-form-item>
                <el-radio-group v-model="tips_type">
                  <el-radio name="tips_type" label=1>录比例</el-radio>
                  <el-radio name="tips_type" label=2>录金额</el-radio>
                </el-radio-group>
              </el-form-item>
            </div>
          </div>
          <div class="table" v-if="threeApartmentlist.length != 0">
            <div class="row">
              <div class="col"><div class="center">序号</div></div>
              <div class="col"><div class="center">分配类型</div></div>
              <div class="col"><div class="center">分配部门</div></div>
              <div class="col"><div class="center">分配人</div></div>
              <div class="col"><div class="center">业绩月份</div></div>
              <div class="col"><div class="center">分配比例</div></div>
              <div class="col"><div class="center">分配业绩</div></div>
              <div class="col"><div class="center">单量</div></div>
              <div class="col"><div class="center">公司费用</div></div>
              <div class="col"><div class="center">领导人分配业绩</div></div>
            </div>
            <div
              class="row content"
              v-for="(v, i) in threeApartmentlist"
              :key="i"
            >
              <div class="col">
                <div class="center">{{ i + 1 }}</div>
              </div>
              <div class="col">
                <el-form-item>
                  <el-select v-model="v.allotType">
                    <el-option
                      v-for="(v, i) in getPerformanceType"
                      :key="i"
                      :label="v.performanceName"
                      :value="v.performanceProportion"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </div>
              <div class="col">
                <el-form-item>
                  <el-input
                    v-model="v.allotOrganizationId"
                    @click.native="selsecArea(v)"
                    readonly
                  ></el-input>
                </el-form-item>
              </div>
              <div class="col">
                <el-form-item>
                  <el-input
                    v-model="v.allotUser"
                    @click.native="selsecPerson(v)"
                    readonly
                  ></el-input>
                </el-form-item>
              </div>
              <div class="col">
                <el-form-item>
                  <el-select v-model="v.allotMonth">
                    <el-option label="第三方" value="1"></el-option>
                    <el-option label="买房" value="2"></el-option>
                    <el-option label="公司内部" value="3"></el-option>
                  </el-select>
                </el-form-item>
              </div>
              <div class="col">
                <el-form-item>
                  <!-- <el-input :disabled="tips_type!=1" v-model="v.allotRatio"></el-input> -->
                  <el-input
                    :disabled="tips_type != 1"
                    @input="computedAllotRatio(v,2)"
                    v-model.number="v.allotRatio"
                    v-number-two
                    style="color:#f57107"
                    maxlength="11"
                  >
                  <span slot="suffix">%</span>
                  </el-input>
                </el-form-item>
              </div>
              <div class="col">
                <el-form-item
                  ><el-input
                   :disabled="tips_type != 2"
                    @input="computedAllotRatio(v,2)"
                    v-model="v.allotMoney"
                    v-number-two
                    maxlength="11"
                  ></el-input
                ></el-form-item>
              </div>
              <div class="col">
                <el-form-item>
                  <!-- <el-input v-model="v.signNum"></el-input>-->
                  <el-input
                    v-number-two
                    maxlength="11"
                    v-model="v.signNum"
                  >
                  </el-input>
                </el-form-item>
              </div>
              <div class="col">
                <el-form-item>
                  <el-radio-group v-model="performance_info.compCostFlag">
                    <el-radio label="是"></el-radio>
                    <el-radio label="否"></el-radio>
                  </el-radio-group>
                </el-form-item>
              </div>
              <div class="col">
                <el-form-item
                  ><el-input v-model="v.leaderUserId" readonly></el-input
                ></el-form-item>
              </div>
              <div
                class="del"
                @click="delThreeApartmentlist(v.index, v.id)"
              ></div>
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
const reg = /^[1-9]\d{0,11}$/;
export default {
  components: {
    form_header,
  },
  data() {
    return {
      title: "业绩信息",
      has_co_tips: false,
      rules: this.setCommonRules(),
      apartment_list: [
        { apartment_name: "业绩分配", apartment_alies: 1},
        { apartment_name: "驻场部业绩", apartment_alies: 3 },
        { apartment_name: "策划部业绩", apartment_alies: 4 },
        { apartment_name: "扩展部业绩", apartment_alies: 5 },
        { apartment_name: "领导分配提成", apartment_alies: 6 },
      ],
       //二级市场渠道部业绩
      twoApartmentProfit:'',
      twoApartmentProfitInput:'',
      twoApartmentRatio:1,
      //三级市场渠道部业绩列表
      threeApartmentlist:[],
      //三级市场渠道部业绩
      threeApartmentProfit:'',
      threeApartmentProfitInput:'',
      threeApartmentRatio:1,
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
  created() {
    //编辑初始化数据
    this.initDetailInfo();
    new GetRangeUserList().send().then((res) => {
      console.log(res);
    });
  },
  watch: {
    initData: {
      handler: function() {
        this.initDetailInfo();
      },
      deep: true,
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
    twoApartmentProfitInput(){
      if(this.twoApartmentProfitInput!==''){
      if(this.twoApartmentRatio ==1){
        if(this.threeApartmentRatio ==1){
          this.threeApartmentProfitInput = 100-this.twoApartmentProfitInput; 
        }else{
          this.threeApartmentProfitInput = this.computeReportCash - this.computedTwoApartmentProfit;
        }
      }
      }
    },
     threeApartmentProfitInput(){
      if(this.threeApartmentProfitInput !==''){
      if(this.threeApartmentRatio ==1){
        if(this.twoApartmentRatio ==1){
          this.twoApartmentProfitInput = 100-this.threeApartmentProfitInput; 
        }else{
          this.twoApartmentProfitInput = this.computeReportCash - this.computedThreeApartmentProfit;
        }
      }
    }
      }

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
    btKeyDown(e) {
      let flag = reg.test(e.target.value);
      //允许输入0
      if (!flag && "0" !== e.target.value + "") {
        e.target.value = "";
      }
    },
    //表单验证
    setCommonRules() {
      let params = {
        agencyMoney: ["required"],
      };
      return new CreateCommonRules(params).getCommonRules();
    },
    // 选择业绩分配类型
    changeApartment(v) {
      this.now_apartment_alies = v;
      this.switchNowPerformance();
    },
    //选择分配部门
    selsecArea(data) {
      let val = new ErpCommon().openPerformanceAssignee(this.selectAreaParms);
      let info = JSON.parse(val);
      // data.leaderUserName = info.leaderName;
      console.log(val, "这是筛选分配部门");
    },
    //选择相关人员
    selsecPerson(data) {
      this.selectOrgParms.selectType = 1;
      let val = new ErpCommon().openPerformanceAssignee(this.selectOrgParms);
      data.leaderUserName = val.leaderName || "--";
      console.log(val, "这是筛选相关人员");
    },
    // 新增业绩分配
    addPerformancePeople(val) {
      console.log(val,'这是新增index');
      if(val ==2){
        this.now_apartment_alies = 1
      }else if(val ==3){
        this.now_apartment_alies = 2
      }
      if (!this.performance_info.reportProfitVOs || this.performance_info.reportProfitVOs.length == 0){
        this.performance_info.reportProfitVOs = [];
      }
      let all_l = this.performance_info.reportProfitVOs;
      let index = all_l.length;
      all_l.push({
        profitType: this.now_apartment_alies,//业绩类型 1：二级市场渠道部业绩  2：三级市场渠道部业绩  3：驻场部提成  4：策划部提成  5：拓展部提成  6：领导提成分配
        allotMoney: "",
        allotMonth: "",
        allotOrganizationId: "",
        allotOrganizationName: "",
        allotRatio: 0,
        allotType: "",
        allotTypeName: "",
        allotUser: "",
        allotUserName: "",
        compCostFlag: "",
        leaderUserId: "",//领导人ID字符串，逗号分隔
        leaderUserName: "",//领导人姓名字符串，逗号分隔
        reportId: "",//成交报告ID
        signNum: "",//单量
        // 下面是需要过滤的
        index,
      });
      //三级市场渠道部业绩列表(需要二级分隔开)
      if(this.now_apartment_alies == 2){
         this.threeApartmentlist =  all_l.filter(
        (v) => {
          return  v.profitType == 2;
        }
      );
      console.log(this.threeApartmentlist,'三级市场');
      console.log(all_l,'总列表');
      }
    },
    delPerformancePeople(index, id = false) {
      let _arr = this.performance_info.reportProfitVOs;
      if (id){
        _arr = _arr.filter(v => v.id != id);
        //重新赋值 若替换数组不能触发视图更新
         this.performance_info.reportProfitVOs =  _arr ;
         return
      } 
      return _arr.splice(index, 1);
    },
    //删除三级渠道部列表
    delThreeApartmentlist(index, id = false) {
      let _arr = this.threeApartmentlist;
      let allArr = this.performance_info.reportProfitVOs;
      if (id){
        _arr =  _arr.filter(v => v.id != id);
        allArr = allArr.filter(v => v.id != id);
        //重新赋值 若替换数组不能触发视图更新
        this.threeApartmentlist = _arr;
        this.performance_info.reportProfitVOs = allArr;
        return
      }
       _arr.splice(index, 1);
      allArr.splice(index, 1);
      return
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
      if(this.now_apartment_alies == 1 || this.now_apartment_alies == 2){
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
      return 
      }
      this.now_apartment_performance_list = this.performance_info.reportProfitVOs.filter(
        (v) => {
          return v.profitType == this.now_apartment_alies;
        }
      );
    },
    //二级渠道部业绩输入矫正 <=100%
    twoApartmentInputChange(){
      if(this.twoApartmentRatio == 1){
        if(this.twoApartmentProfitInput>100) this.twoApartmentProfitInput = 100;
        return
      }
    },
    //三级级渠道部业绩输入矫正 <=100%（可与二级带封装）
    threeApartmentInputChange(){
      if(this.threeApartmentRatio == 1){
        if(this.threeApartmentProfitInput>100) this.threeApartmentProfitInput = 100;
        return
      }
    },
    //savePerformanceInfo保存业绩信息
    savePerformanceInfo() {
      this.performance_info.reportCash = this.computeReportCash;
      this.$emit("performanceInfo", this.performance_info);
    },
   //计算分配比例 分配业绩  tips_type:为1录比例 2 录金额  index ->1 二级渠道部 2三级渠道部
    computedAllotRatio(item,index){
      let reportCash = 0;
      if(item.allotRatio >100) item.allotRatio = 100;
      if(index ==1){
        reportCash = JSON.parse(JSON.stringify(this.computedTwoApartmentProfit));
      }else{
        reportCash = JSON.parse(JSON.stringify(this.computedThreeApartmentProfit));
      }
      if(this.tips_type ==1){
         item.allotMoney = (item.allotRatio/100) * reportCash;
      }else if(this.tips_type ==2){
        item.allotRatio = (item.allotMoney /reportCash) *100;
      }
    },
  },
  computed: {
    //计算上报业绩 
    computeReportCash(){
      return this.performance_info.custCommission + this.performance_info.agencyCommission
    },
    //外部合作费
    coTipsTotal() {
      if (!this.performance_info.outCooperations) return "0元";
      let l = this.performance_info.outCooperations;
      if (l.length == 0) return "0元";
      let sum = 0;
      for (let v of l) {
        if (!v.cooperationCost) break;
        sum += Number(v.cooperationCost);
      }
      return sum + "元";
    },
    //计算二级渠道部市场业绩
    computedTwoApartmentProfit(){
        // 按金额录取
        if(this.twoApartmentRatio ==='' || this.threeApartmentRatio ==='')return 0;
        if(this.twoApartmentRatio ==2){
          return this.twoApartmentProfitInput;
        }else{
          //按比例录取
          //获取上报业绩
          let reportCash = this.computeReportCash;
          return reportCash*(this.twoApartmentProfitInput/100);
        }
    },
    //计算三级渠道部市场业绩
    computedThreeApartmentProfit(){
        // 按金额录取
        if(this.threeApartmentRatio ==2){
          return this.threeApartmentProfitInput;
        }else{
          //按比例录取
          //获取上报业绩
          let reportCash = this.computeReportCash;
          return reportCash*(this.threeApartmentProfitInput/100);
        }
    },
    getPerformanceType() {
      new GetPerformanceType().send().then((res) => {
        console.log(res);
      });
    },
  },
  filter: {},
};
</script>

<style lang="less" scoped>
@del_icon: url("../../../../../assets/images/public/delete_200.png");
.performance_info {
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
                  /deep/ .el-input input{
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
            left: 1.48rem;
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
              height: 0.5rem;
              display: flex;
              position: relative;
              border-bottom: solid 0.01rem #eaeaea;
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
                  width: 0.47rem;
                }
                &:nth-of-type(2) {
                  width: 0.92rem;
                }
                &:nth-of-type(3) {
                  width: 1.33rem;
                }
                &:nth-of-type(4) {
                  width: 0.58rem;
                }
                &:nth-of-type(5) {
                  width: 0.82rem;
                }
                &:nth-of-type(6) {
                  width: 0.86rem;
                }
                &:nth-of-type(7) {
                  width: 0.78rem;
                }
                &:nth-of-type(8) {
                  width: 0.81rem;
                }
                &:nth-of-type(9) {
                  width: 1.04rem;
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
                  width: 1.39rem;
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
