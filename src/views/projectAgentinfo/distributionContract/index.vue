<template>
  <div>
    <div class="order">
      <!-- 顶部筛选 -->
      <!-- 列表顶部搜索导出 -->
       <div class="g_topselect">
            <div class="g_selectMenu">
                <div class="u_topSelect"><selectOrg   @onSelectChange="f_selectOrg" :empty="empty" :defaultText="'申请组织'"></selectOrg></div>
                <div class="u_topSelect"><topSelect  @onSelectChange="f_selectAgentName" :defaultText="'合同名称'" :empty="empty" :defaultList="dealNameList" imgPath="xuqiu_200"></topSelect></div>
                <div class="u_topSelect"><topSelect  @onSelectChange="f_selectCompanyName" :defaultText="'分销公司'" :empty="empty" :defaultList="companyList"></topSelect></div>
                <div class="u_topSelect"><selectRadio @onSelectChange="f_dateType" :list="dateList" :defaultText="'时间类型'" :empty="empty" imgSrc="type_200"></selectRadio></div>
                <div class="u_topSelect"><selectDataTime @upDataTime="f_agentDate" :empty="empty"  :defaultText="'合同时间'" :timeType="topParams.timeType"></selectDataTime></div>
                <div class="u_topSelect"><selectRadio @onSelectChange="f_auditStatus" :list="auditStatusList" :defaultText="'审批状态'"  :empty="empty" imgSrc="status_200"></selectRadio></div>
                <div class="u_topSelect"><selectRadio @onSelectChange="f_approval" :list="approvalList" :defaultText="'待我审批'"  :empty="empty" imgSrc="ownership_200"></selectRadio></div>
                <div class="u_topSelect"><selectRadio @onSelectChange="f_distributionScope" :list="distributionScopeList" :defaultText="'分销范围'" :empty="empty" imgSrc="area_200"></selectRadio></div>
            </div>
            <div class="g_btnList">
                <div class="u_btn g_submit" @click="topSearch">查询</div>
                <div class="u_btn" @click="f_clear">重置</div>
            </div>
        </div>
       <!-- <div class="middle"></div> -->
      <div class="build-top f_r_s">
        <div class="left_box">
          <div class="active">分销合同</div>
        </div>
        <div class="right_box">
          <SearchInput :placeholder="placeholderText" @Kwd="kwdVal" @kwdSearch="kwdSearch" :empty="searchEmpty"></SearchInput>
          <div class="topseach" @click="toAddContract" >
            <img
              src="../../../assets/images/projectAgentInfo/agentContract/add_3_200.png"
              class="addIcon"
            />
            <span class="addSpan">新增</span>
          </div>
          <div class="topseach" @click="batchApproval">
            <img
              src="../../../assets/images/projectAgentInfo/agentContract/contract_1_200.png"
              class="addIcon"
            />
            <span class="addSpan">批量审批</span>
          </div>
          <!-- <div class="topseach">
            <img
              src="../../../assets/images/projectAgentInfo/agentContract/edit1_200.png"
              class="addIcon"
            />
            <span class="addSpan">筛选：</span>
            <span class="shaixuan_value">默认</span>
          </div> -->
          <div class="topseach" @click="f_exportClick" v-if="$UserPermission.AGENCYDistributeExportAuth()">
            <img
              src="../../../assets/images/projectAgentInfo/contract/u_Export.png"
              class="addIcon"
            />
            <span class="addSpan">导出</span>
          </div>
          <span class="all_data">
            <span>共</span>
            <span class="spanTotal">{{total}}</span>
            <span>条</span>
          </span>
        </div>
      </div>
      <!-- 列表 -->
      <div class="list_all">
        <div class="title_content_s">
          <div class="title_content">
            <div class="title_item select" @click.stop="allSelect">选</div>
            <div class="title_item time_shenpi">审批时间</div>
            <div class="title_item nowPerson">当前审批人</div>
            <div class="title_item shenpi_status">审批状态</div>
            <div class="title_item hetong_status">合同状态</div>
            <div class="title_item shenqing_person">申请人</div>
            <div class="title_item shen_org">申请组织</div>
            <div class="title_item shen_number">申请编号</div>
            <div class="title_item gui_number">归档编号</div>
            <div class="title_item contact_name">合同名称</div>
            <div class="title_item agent">分销公司</div>
            <div class="title_item project_name">分销范围</div>
            <div class="title_item agent_time">分销期限</div>
            <div class="title_item baohu">客户保护期</div>
            <div class="title_item yongjin">佣金结算方式</div>
            <div class="title_item fawu">法务跟进人</div>
            <div class="title_item fenxain">是否有风险</div>
            <div class="title_item gaizhang">是否盖章</div>
            <div class="title_item zuofei">是否作废</div>
            <div class="title_item guidang">是否归档</div>
            <div class="title_item ziliao">资料是否缺失</div>
            <div class="title_item luru">录入日期</div>
          </div>
        </div>

          <div class="g_lists" v-if="!!orderList && orderList.length > 0"
            v-infinite-scroll="!!isScroll?scrollBottom:''"
            infinite-scroll-distance="10"
            infinite-scroll-immediate="false"
            >
            <div
              class="content"
              v-for="(item,index) in orderList"
              :key="index"
              @dblclick="goxiangqing(item.dealId)"
            >
              <div class="list_item select">
                <el-checkbox v-model="item.check"></el-checkbox>
              </div>
              <div class="list_item time_shenpi" :title="item.approvalTime ||'-'">{{item.approvalTime ||"-"}}</div>
              <div class="list_item nowPerson" :title="item.approvalPerson ||'-'">{{item.approvalPerson||"-"}}</div>
              <div class="list_item shenpi_status" :title="approvalStatusList[item.approvalStatus] ||'-'">{{approvalStatusList[item.approvalStatus]}}</div>
              <div class="list_item hetong_status">
                <div class="text_status" :title="concatList[item.contractStatus] ||'-'">{{concatList[item.contractStatus]}}</div>
                <div
                  class="status_operate"
                  @click="goOperating(0,item)"
                  
                >
                  <div class="bianji_ope"></div>
                  <div>编辑</div>
                </div>
                <!-- 暂时屏蔽未做 -->
                <div
                  class="status_operate"
                  @click="goOperating(1,item)"
                  v-if="(item.approvalStatus===0||item.approvalStatus===1)&&false"
                >
                  <div class="shenpi_ope"></div>
                  <div>审批</div>
                </div>

                <div
                  class="status_operate"
                  @click="goOperating(2,item)"
                  v-if="item.approvalStatus===0 && $UserPermission.AGENCYDistributeCopyAuth()"
                >
                  <div class="copy_ope"></div>
                  <div>复制</div>
                </div>

                <div
                  class="status_operate"
                  @click="goOperating(3,item)"
                  v-if="item.approvalStatus===1"
                >
                  <div class="tegai_ope"></div>
                  <div>特改</div>
                </div>
                <div
                  class="status_operate"
                  @click="goOperating(4,item)"
                  v-if="(item.approvalStatus===0||item.approvalStatus===2)||(item.approvalStatus===2&&item.contractStatus===4)"
                >
                  <div class="zuofei_ope"></div>
                  <div>作废</div>
                </div>
                <div
                  class="status_operate"
                  @click="goOperating(5,item)"
                  v-if="(item.approvalStatus===3&&item.contractStatus===4)||(item.approvalStatus===2&&(item.contractStatus===0||item.contractStatus===4)) && $UserPermission.AGENCYDistributeOutBorrowAuth()"
                >
                  <div class="waijie_ope"></div>
                  <div>外借</div>
                </div>
                <div
                  class="status_operate"
                  @click="goOperating(6,item)"
                  v-if="item.approvalStatus===3&&item.contractStatus===2 && $UserPermission.AGENCYDistributeReturnAuth()"
                >
                  <div class="guihuan_ope"></div>
                  <div>归还</div>
                </div>
                <div
                  class="status_operate"
                  @click="goOperating(7,item)"
                  v-if="item.approvalStatus===3&&item.contractStatus===1 && $UserPermission.AGENCYDistributeApproveAuth()"
                >
                  <div class="pijie_ope"></div>
                  <div>批借</div>
                </div>
                <div
                  class="status_operate"
                  @click="goOperating(8,item)"
                  v-if="item.approvalStatus===3&&item.contractStatus===3 && $UserPermission.AGENCYDistributeFileReturnAuth()"
                >
                  <div class="guidang_ope"></div>
                  <div>归档</div>
                </div>

                <div
                  class="status_operate"
                  @click="goOperating(9,item)"
                  v-if="item.approvalStatus===3&&item.contractStatus===4 && $UserPermission.AGENCYDistributeTerminattionAuth()"
                >
                  <div class="zhongzhi_ope"></div>
                  <div>终止</div>
                </div>
              </div>
              <div class="list_item shenqing_person" :title="item.applicant ||'-'">{{item.applicant||"-"}}</div>
              <div class="list_item shen_org" :title="item.applicationOrganization ||'-'">{{item.applicationOrganization||"-"}}</div>
              <div class="list_item shen_number" :title="item.applicationNumber ||'-'">{{item.applicationNumber||"-"}}</div>
              <div class="list_item gui_number" :title="item.archiveNumber ||'-'">{{item.archiveNumber||"-"}}</div>
              <div class="list_item contact_name" :title="item.contractName ||'-'">{{item.contractName||"-"}}</div>
              <div class="list_item agent" :title="item.Agent ||'-'">{{item.Agent||"-"}}</div>
              <div class="list_item project_name" :title="item.projectName ||'-'">{{item.projectName||"-"}}</div>
              <div class="list_item agent_time" :title="item.agencyTermStart||'-'+'至'+item.agencyTermEnd ||'-'">{{item.agencyTermStart||"-"}}至{{item.agencyTermEnd||"-"}}</div>
              <div class="list_item baohu" :title="item.customerProtectionPeriod ||'-'">{{item.customerProtectionPeriod||"-"}}</div>
              <div class="list_item yongjin" :title="item.commission ||'-'">{{item.commission||"-"}}</div>
              <div class="list_item fawu" :title="item.legalAffairs ||'-'">{{item.legalAffairs||"-"}}</div>
              <div class="list_item fenxain" :title="item.risk ||'-'">{{item.risk||"-"}}</div>
              <div class="list_item gaizhang" :title="item.stamp ||'-'">{{item.stamp||"-"}}</div>
              <div class="list_item zuofei" :title="item.void ||'-'">{{item.void||"-"}}</div>
              <div class="list_item guidang" :title="item.archive ||'-'">{{item.archive||"-"}}</div>
              <div class="list_item ziliao" :title="item.material ||'-'">{{item.material||"-"}}</div>
              <div class="list_item luru" :title="item.entryDate ||'-'">{{item.entryDate||"-"}}</div>
            </div>
          </div>
         <div class="no_dataBox" v-if="!!NoData">
                <div class="no-data">
                    <img src="../../../assets/images/public/nodate.png" alt="">
                    <div class="no_dataSpan">暂时没有相关数据哦!</div>
            </div>
          </div>

        <div class="isLoading" v-if="!!isLoad">
        <img src="../../../assets/images/projectAgentInfo/common/loadIng.gif" />
      </div>
   
      </div>
      <!-- :operateId="operateId" -->
      <Batch v-if="toChange===1" @closeView="closeView" :title="`批量审批`" :dealId="dealId"></Batch>
      <Termination v-if="toChange===9" @closeView="closeView" :title="`分销合同终止`" :dealId="dealId" :operationPerson="statusParams" ></Termination>
      <Void v-if="toChange===4" @closeView="closeView" :title="`分销合同作废`" :dealId="dealId"></Void>
      <Archive v-if="toChange===8" @closeView="closeView" :title="`归档`" :dealId="dealId"></Archive>
      <GiveBack v-if="toChange===6" @closeView="closeView" :title="`归还`" :dealId="dealId"></GiveBack>
      <Approval v-if="toChange===7" @closeView="closeView" :title="`流程审批`" :dealId="dealId"></Approval>
      <Loan v-if="toChange===5" @closeView="closeView" :title="`新增外借`" :dealId="dealId"></Loan>
    </div>
  </div>
</template>
<script>
import topSelect from "../form/topSelect"
import selectDataTime from "../form/selectDataTime";
import selectRadio from "../../../components/topSelect/selectRadio";
import selectOrg from "../../../components/topSelect/selectOrg.vue";
import SearchInput from "./components/searchInput";
import Batch from "./components/batch";
import Termination from "./components/termination";
import Void from "./components/void";
import Archive from "./components/archive";
import GiveBack from "./components/giveBack";
import Approval from "./components/approval";
import Loan from "./components/loan";
import {ErpCommon} from '../../../utils/ErpCommon'
import { getDistributionList } from "../../../net/projectAgentinfo/distributionContract/distributionList.js";
import {GetCompangList} from "../../../net/projectAgentinfo/companyRequest/GetCompangInfoList.js"
import {GetUserOpers, GetUserOpersRequest} from "../../../net/common/GetUserOpers";
import {SetBaseInfoModel} from "../../../model/BaseInfoModel";
export default {
  components: {
    SearchInput,
    Batch,
    Termination,
    Void,
    Archive,
    GiveBack,
    Approval,
    Loan,
    selectRadio,
    selectOrg,
    topSelect,
    selectDataTime
  },
  data() {
    return {
      total:0,//列表总条数
      topParams:{},//顶部筛选参数
      searchEmpty:false,//是否清空搜索框
      isScroll:true,//是否滚动加载
      empty:false, //清空
      selectOrgId:'',//组织id
      dealNameList:[],//合同名称
      companyList:[],//分销公司
      statusParams:{
        operationPerson:'',//操作人
        applynNum:''//申请编号
      },//获取当前操作信息
      first: {id: '',text: "全部"},//顶部筛选第一项
      dateList:[
          {id:1,text:'录入日期'},
          {id:2,text:'代理期限'},
      ],
      auditStatusList:[
          {id:'',text:'全部状态'},
          {id:0,text:'未审批'},
          {id:1,text:'审批中'},
          {id:-1,text:'已驳回'},
          {id:2,text:'已审批'},
          {id:-2,text:'已作废'},
          ],//审批状态列表
      approvalList:[
          {id:'',text:'全部状态'},
          {id:1,text:'我已审批'},
          {id:-1,text:'我已驳回'},
          {id:0,text:'待我审批'},
          ],//待我审批
      distributionScopeList:[
          {id:1,text:'分销全部项目'},
          {id:2,text:'分销指定项目'},
      ],//分销范围
      dealId:"",//合同ID
      toChange: "", //合同的操作
      //审批状态
      personStatus: ["提交人", "审批人", "法务", "权限人"],
      approvalStatusList: ["未审批", "审批中", "已驳回", "已审批", "已作废"],
      //合同状态
      concatList: ["已作废", "外借中", "已外借", "归还中", "已归档"],
      operateId: [], //批量操作的id
      allContractParam:{},
      params: {
        export:0,//是否导出 0否 1是
        approvalStatus: "", //"(byte)审批状态 -2 已作废 -1 已驳回 0未审批 1审批中 2已审批",
        approvalStatusIsMe:0,//待我审批 1:我已审批  -1:我已驳回 0:待我审批(默认), 2:全部
        contractStatus: "", //"(byte)合同状态 -2 已作废 0未操作 1外借中 2已外借 3归档中 4已归档",
        dealName: "", //"(string)合同名称",
        distributionCompanyName: "", //"(string)分销公司名称",
        distributionRange: "", //"(byte)分销范围 1分销全部项目 2分销指定项目",
        keyWords: "", //"(string)模糊搜索",
        orgId: "", //"(int32)申请组织id",
        pageOffset: 1, //"(int32)",
        pageRows: 30, //"(int32)",
        timeEndStr: "", //"(string)结束时间",
        timeStartStr: "", //"(string)开始时间",
        timeType: "" //"(int32)时间类型 1录入时间 2代理期限"
      },
       companyParameter: {
            export:1,
            compName : "", //公司名称
            // personType = '',//人员类型
            ourDockingPersonId : '', //对接人id 
            timeStartStr : '', // 开始时间
            timeEndStr : '', // 结束时间
            timeType : '', // 时间类型
            deptCode : '', //门店码
            pageOffset : 1,//分页加载(当前页面)
            pageRows : 30,//请求条数(当前页面)   
            },//分销公司请求参数
      NoData: false,
      isLoad: false,
      placeholderText: "请输入申请、归档编号",
      //状态
      //列表
      orderList: []
    };
  },
  created() {
    this.topParams = JSON.parse(JSON.stringify(this.params));
    this.allContractParam = JSON.parse(JSON.stringify(this.params));
    console.log(this.topParams,'这是顶部筛选参数');
    this.initUserOpers();
    this.topData();
    this.init();
  },
  methods: {
    //初始化权限
     async initUserOpers(){
        console.log('--分销合同权限初始化开始Index--');
        let userId = new ErpCommon().getOperator('USER_ID'); //写死测试userId:20341347 20341322

        if (!userId) return;

        let userOpers = await new GetUserOpers(new GetUserOpersRequest({userId:userId})).send();
        SetBaseInfoModel.setUserOpers(userOpers);
        console.log('--分销合同权限初始化完成--');
      },
    //获取顶部筛选数据
      topData(){
          //获取分销公司列表
          new GetCompangList(this.companyParameter).send()
          .then((res)=>{
              //分销公司
              this.companyList = this.topSelectList(res.companyList,'companyId','companyName');
              this.companyList.unshift(this.first);
              console.log(this.companyList,'分销公司列表');
          })
          .catch((err)=>{
              console.log('分销公司请求失败');
          })

          //获取所有分销合同列表
          this.allContractParam.export = 1;
          this.allContractParam.approvalStatusIsMe = '';
          new getDistributionList(this.allContractParam).send()
              .then((res) => {
                  console.log("合同名称列表: ", res.list);
                   //合同名称列表
                  this.dealNameList = this.topSelectList(res.list,'dealId','contractName');
                  this.dealNameList.unshift(this.first);
              })
              .catch((err) => {
                  console.log("查询所有分销合同报错: ", err);
              });
      },
    init() {
      this.isLoad = true;
      new getDistributionList(this.params)
        .send()
        .then(res => {
          this.total = res.total;
          console.log(res.list,'列表数据')
          this.orderList = [...res.list];
          if (this.orderList.length <= 0) {
            this.NoData = true;
          }else{
            this.NoData = false;
          }
          this.isLoad = false;
        })
        .catch(res => {
          this.isLoad = false;
          console.log(res)
          this.$erpCommon.toast(
            res.errMsg || "服务器开小差了,请稍后再试",
          );
        });
    },
    //新增代理合同
    toAddContract() {
      this.$router.push({ path: "/addDistributionContract",query:{index:1} });
    },
    //下拉加载
    refresh() {
      this.isLoad =true;
      this.isScroll = false;
      new getDistributionList(this.params)
        .send()
        .then(res => {
          this.isLoad = false;
          let list =res.list;
          if(list.length<=0) return;
           if(list.length<30){
             this.isScroll = false;
           }else{
             this.isScroll = true;
           }
          this.orderList = [...this.orderList,...list];
        })
        .catch(res => {
          this.isLoad = false;
          this.$erpCommon.toast(
            res.errMsg || "服务器开小差了,请稍后再试",
          );
        });
    },
    //顶部筛选列表
    topSelectList(arr,key1,key2){
        let list = [];
        if(arr.length>0){
          for(let info of arr){
              //数据格式
              let item = {id:info[key1],text:info[key2]}
            list.push(item)
          }
          return list;
      }
      return list;
    },
    //申请组织
    f_selectOrg(data){
      this.empty = false; 
      console.log(data,'筛选组织');
      if(data.text == "全部"){
           this.topParams.orgId = "";
        }else{
          this.topParams.orgId = data.id;
        }
    },
    //合同名称
    f_selectAgentName(data){
      this.empty = false; 
      console.log(data,'合同名称');
       if(data.text == "全部"){
           this.topParams.dealName = "";
        }else{
          this.topParams.dealName = data.text;
        }
    },
     //分销公司
    f_selectCompanyName(data){
      this.empty = false; 
      console.log(data,'分销公司');
       if(data.text == "全部"){
           this.topParams.distributionCompanyName = "";
        }else{
          this.topParams.distributionCompanyName = data.text;
        }
    },
     //时间类型
    f_dateType(data){
      this.empty = false; 
      console.log(data,'时间类型');
      this.topParams.timeType = data.id || "";
    },
     //合同时间
    f_agentDate(data){
      this.empty = false; 
      console.log(data,'合同时间');
      this.topParams.timeStartStr = data.startTime || "";
      this.topParams.timeEndStr = data.endTime || "";
    },
     //审批状态
    f_auditStatus(data){
      this.empty = false; 
      console.log(data,'审批状态');
      this.topParams.approvalStatus = data.id;
    },
     //待我审批
    f_approval(data){
      this.empty = false; 
      console.log(data,'待我审批');
      //暂时没有字段
      this.topParams.approvalStatusIsMe = data.id;
    },
     //分销范围
    f_distributionScope(data){
      this.empty = false; 
      console.log(data,'分销范围');
      this.topParams.distributionRange = data.id || "";
    },
     //全选
    allSelect(){
      if(this.orderList.length <1) return;
      this.allSelectFlag = !this.allSelectFlag;
      this.orderList.forEach((key)=>{
        key.check = this.allSelectFlag;
      })
    },
    //重置
    f_clear(){
        this.empty = true;
        this.searchEmpty = true;
        this.topParams.approvalStatus = '';
        this.topParams.approvalStatusIsMe = 0;
        this.topParams.contractStatus = '';
        this.topParams.dealName = '';
        this.topParams.distributionCompanyName = '';
        this.topParams.distributionRange = '';
        this.topParams.keyWords = '';
        this.topParams.orgId = '';
        this.topParams.timeEndStr = '';
        this.topParams.timeStartStr = '';
        this.topParams.timeType = '';
        this.topParams.pageOffset = 1;
    },
     kwdVal(data){
        // 关键字
        this.searchEmpty = false;
        this.topParams.keyWords = data;
        console.log(data,'hhhhhhhhhhh');
        },
     //关键字检索
    kwdSearch(data){
        this.params = JSON.parse(JSON.stringify(this.topParams));
        this.init();
        console.log(data,'关键字');
    },
    topSearch(val) {
      console.log(this.topParams,'这是顶部筛选参数');
      this.topParams.pageOffset = 1;
      //若选择了条件，没有点击查询，导出时时间不会错误，且编辑数据保存之后列表初始化不会出错
      this.params = JSON.parse(JSON.stringify(this.topParams));
      this.init();
    },
    //操作
    goOperating(index,val) {
      this.toChange = index;
      this.dealId=val.dealId;
      this.statusParams.operationPerson = val.applicant;
      this.statusParams.applynNum = val.applicationNumber;
      if(index == 0) this.$router.push({ path: "/addDistributionContract",query:{index:2,dealId:val.dealId} });
    },
    //触底加载
    scrollBottom() {
      console.log("到底啦");
      if(this.isScroll){
      this.params.pageOffset += 1;
      this.refresh();
      }
    },
    //接受
    accept() {
      this.$erpConfirm({
        msg: "确定接受该预约单吗？"
      })
        .then(() => {})
        .catch(() => {});
    },
    //批量审批弹窗
    batchApproval(){
      this.toChange=1
    },
    //导出
    async f_exportClick(){
      console.log('这是导出哈哈哈哈');
        let params = {};
        // 导出参数
        let exportParam = {
            export:1,
            approvalStatus: this.params.approvalStatus, //审批状态
            contractStatus: this.params.contractStatus, //合同状态
            dealName: this.params.dealName, //合同名称
            distributionCompanyName: this.params.distributionCompanyName, //分销公司名称
            distributionRange: this.params.distributionRange, //分销范围
            keyWords: this.params.keyWords, //模糊搜索
            orgId: this.params.orgId, //申请组织id
            pageOffset: this.params.pageOffset, //当前页数
            pageRows: this.params.pageRows, //请求条数
            timeEndStr: this.params.timeEndStr, //结束时间
            timeStartStr: this.params.timeStartStr, //开始时间
            timeType: this.params.timeType, //时间类型    
        };
        // 导出接口
        let data = await new getDistributionList(exportParam).send().then((res)=>{return res.list});
        console.log(data, '接口数据');

        //导出数据表模板
        params = {
            fileName: "分销合同列表",
            headList: [
                { name: "审批时间", key: "approvalTime" },
                { name: "当前审批人", key: "approvalPerson" },
                { name: "审批状态", key: "approvalStatus" },
                { name: "合同状态", key: "contractStatus" },
                { name: "申请人",   key: "applicant" },
                { name: "申请组织", key: "applicationOrganization" },
                { name: "申请编号", key: "applicationNumber" },
                { name: "归档编号", key: "archiveNumber" },
                { name: "合同名称", key: "contractName" },
                { name: "分销公司", key: "Agent" },
                { name: "分销范围", key: "projectName" },
                { name: "分销期限", key: "projectNameTerm" },
                { name: "客户保护期", key: "customerProtectionPeriod" },
                { name: "佣金结算方式", key: "commission" },
                { name: "法务跟进人", key: "legalAffairs" },
                { name: "是否有风险", key: "risk" },
                { name: "是否盖章", key: "stamp" },
                { name: "是否作废", key: "void" },
                { name: "是否归档", key: "archive" },
                { name: "资料是否缺失", key: "material" },
                { name: "录入日期", key: "entryDate" },
            ],
            data: data
        };

        // 拼接导出表头标题
        // params.fileName=this.exportExcelParams.month+" "+params.fileName;
        //分销期限 将返回的开始时间、结束时间拼接
         if(this.params.timeStartStr != ""){
                //去除时分秒
                let except = (val)=>{
                    return val.split(' ')[0];
                }
                params.fileName=except(this.params.timeStartStr)+"~"+except(this.params.timeEndStr) + params.fileName;
            }
         for(let info of data){
           info.approvalStatus = this.approvalStatusList[info.approvalStatus];
           info.contractStatus = this.concatList[info.contractStatus];
            //拼接代理期限
           if(info.agencyTermStart !=''){
              info.projectNameTerm = info.agencyTermStart + '至' + info.agencyTermEnd;
           }else{
              info.projectNameTerm = '';
           }
         }
        console.log(params, '--导出参数--');
        console.log(params.fileName, '表头');
        new ErpCommon().exportExcelData(params);
    },
    //双击进入详情
    goxiangqing(dealId) {
      // this.goDetails = true;
      // this.$router.push({ path: "/distributionContractDetails" });
      this.$router.push({ path: "/addDistributionContract",query:{index:3,dealId:dealId} });
      console.log("双击了");
    },
    //关闭详情
    closeView(val) {
      this.toChange =val;
    }
  }
};
</script>
<style scoped>
  /*修改滚动条样式*/
  div::-webkit-scrollbar {
    width: 0.08rem;
    height: 0.08rem;
  }
</style>
<style lang="less" scoped>
.g_topselect{
    width: 100%;
    height: 0.32rem;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    background-color: #259CF3;
}
.g_selectMenu{
    width: 90%;
    height: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
}
.u_topSelect .selected_text{
    font-weight: normal!important;
}
.u_topSelect .selected_item{
    height: 0.32rem!important;
    line-height: 0.31rem!important;
    box-sizing: border-box;
    border-bottom:1px solid #126fb2;
}
.g_btnList{
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-right: 0.1rem;
}
.u_btn{
  text-align: center;
  font-size:0.12rem;
  padding: 0 0.1rem 0 0.1rem;
  height: 0.26rem;
  line-height: 0.24rem;
  cursor: pointer;
  color: #ffffff;
  width: 0.3rem;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-image: url("../../../assets/images/projectAgentInfo/contract/screenDefaul_200.png");
}
.u_btn:hover{
  background-image: url("../../../assets/images/projectAgentInfo/contract/screenHover_200.png");
}
.u_btn:active{
  background-image: url("../../../assets/images/projectAgentInfo/contract/screenActive_200.png");
}
.g_submit{
  margin-right:0.1rem;
}

.build-top {
  width: 100%;
  height: 0.34rem;
  background-image: linear-gradient(#f9f9f9, #dedede);
  align-items: flex-end;
  overflow: hidden;
  display: flex;
  justify-content: space-between;
  .left_box {
    display: flex;
    align-items: center;
    .active {
      width: 0.85rem;
      height: 0.27rem;
      line-height: 0.27rem;
      text-align: center;
      margin-left: 0.1rem;
      // margin-top: 0.04rem;
      color: #000000;
      font-size: 0.12rem;
      background-color: #ffffff;
      box-shadow: 0 0 0.01rem 0.01rem rgba(0, 0, 0, 0.2);
      cursor: pointer;
    }
    .build-top-span {
      width: 0.65rem;
      height: 0.3rem;
      padding-left: 0.15rem;
      font-size: 0.12rem;
      color: #7c8286;
      text-align: center;
      line-height: 0.3rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      img {
        width: 0.13rem;
      }
    }
  }
  .right_box {
    font-size: 0.1rem;
    height: 100%;
    align-items: center;
    justify-content: flex-end;
    display: flex;
    padding-right: 0.1rem;
    padding-left: 0.42rem;
    color: #999;
    .topseach {
      color: #259cf3;
      margin-right: 0.1rem;
      display: flex;
      align-items: center;
      cursor: pointer;
      .addIcon {
        // vertical-align: middle;
        width: 0.12rem;
        margin-right: 0.05rem;
      }
      & > .addSpan {
        font-size: 0.12rem;
      }
      .shaixuan_value {
        font-family: MicrosoftYaHei;
        font-size: 0.12rem;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0rem;
        color: #444444;
      }
    }
    .all_data {
      display: flex;
      align-items: center;
      justify-content: space-between;
      // flex:0 0 0.7rem;
      // width:0.7rem;
      .spanTotal {
        display: inline-block;
        text-align: center;
        padding: 0 0.02rem;
      }
    }
  }
}
.order {
  width: 100%;
  // height: 100%;
    position: absolute;
    height: calc(~"100% - 0.32rem");
  background-color: #edf3fb;
}
.list_all {
  width: 100%;
  height: calc(~"100% - 0.32rem - 0.34rem");
  overflow: hidden;
  overflow-x: auto;
}
// .list_content {
//   width: 31.53rem;
//   height: calc(~"100% - 0.45rem");
//   padding-left: 0.1rem;
//   box-sizing: border-box;
//   // overflow: auto;
//   // overflow-x: hidden;
// }

.title_content {
  display: flex;
  align-items: center;
  width: 31.53rem;
  height: 0.3rem;
  padding-left: 0.1rem;
  background-color: #ffffff;
  border: solid 0.01rem #ffffff;
  overflow: auto;
}
.title_content_s {
  width: 100%;
  height: 0.32rem;
  box-sizing: border-box;
}
.content {
  display: flex;
  width: 31.53rem;
  min-height: 0.3rem;
  margin-top: 0.04rem;
  background-color: #ffffff;
  align-items: center;
  border: solid 0.01rem #ffffff;
}
.content:hover {
  background-color: #d9f1fe;
  border: solid 0.01rem #73baee;
}
.title_item {
  height: 0.24rem;
  font-family: MicrosoftYaHei;
  font-size: 0.12rem;
  line-height: 0.24rem;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0rem;
  color: #666666;
  padding-left: 0.08rem;
  box-sizing: border-box;
}

.list_item {
  height: 0.24rem;
  font-family: MicrosoftYaHei;
  font-size: 0.12rem;
  line-height: 0.24rem;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0rem;
  color: #666666;
  padding-left: 0.08rem;
  box-sizing: border-box;
  border-right: 0.01rem dotted #d5d5d5;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.select {
  // display: flex;
  // justify-content: center;
  // padding-left: 0;
  width: 0.59rem;
  cursor: pointer;
  border-right: 0.01rem dotted #d5d5d5;
  /deep/ .el-checkbox__input{
    height: 0.2rem;
  }
}
.time_shenpi {
  width: 1.56rem;
  border-right: 0.01rem dotted #d5d5d5;
}
.nowPerson {
  width: 1.02rem;
}
.shenpi_status {
  width: 1.06rem;
}
.hetong_status {
  display: flex;
  width: 2.62rem;
}
.status_operate {
  display: flex;
  margin-left: 0.15rem;
  align-items: center;
  width: 0.42rem;
  font-family: MicrosoftYaHei;
  font-size: 0.12rem;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0rem;
  color: #259cf3;
  cursor: pointer;
}
.bianji_ope {
  width: 0.12rem;
  height: 0.14rem;
  background-image: url("../../../assets/images/projectAgentInfo/common/zuofei_200.png");
  background-repeat: no-repeat;
  background-size: cover;
  margin-right: 0.03rem;
}
.zuofei_ope {
  width: 0.12rem;
  height: 0.14rem;
  background-image: url("../../../assets/images/projectAgentInfo/common/zuofei_200.png");
  background-repeat: no-repeat;
  background-size: cover;
  margin-right: 0.03rem;
}
.copy_ope {
  width: 0.12rem;
  height: 0.14rem;
  background-image: url("../../../assets/images/projectAgentInfo/common/copy_200.png");
  background-repeat: no-repeat;
  background-size: cover;
  margin-right: 0.03rem;
}
.shenpi_ope {
  width: 0.12rem;
  height: 0.14rem;
  background-image: url("../../../assets/images/projectAgentInfo/common/shenpi_200.png");
  background-repeat: no-repeat;
  background-size: cover;
  margin-right: 0.03rem;
}
.tegai_ope {
  width: 0.12rem;
  height: 0.14rem;
  background-image: url("../../../assets/images/projectAgentInfo/common/zuofei_200.png");
  background-repeat: no-repeat;
  background-size: cover;
  margin-right: 0.03rem;
}
.waijie_ope {
  width: 0.12rem;
  height: 0.14rem;
  background-image: url("../../../assets/images/projectAgentInfo/common/waijie_200.png");
  background-repeat: no-repeat;
  background-size: cover;
  margin-right: 0.03rem;
}
.guihuan_ope {
  width: 0.12rem;
  height: 0.14rem;
  background-image: url("../../../assets/images/projectAgentInfo/common/guihuan_200.png");
  background-repeat: no-repeat;
  background-size: cover;
  margin-right: 0.03rem;
}
.pijie_ope {
  width: 0.12rem;
  height: 0.14rem;
  background-image: url("../../../assets/images/projectAgentInfo/common/guihuan_200.png");
  background-repeat: no-repeat;
  background-size: cover;
  margin-right: 0.03rem;
}
.guidang_ope {
  width: 0.12rem;
  height: 0.12rem;
  background-image: url("../../../assets/images/projectAgentInfo/common/guidang_200.png");
  background-repeat: no-repeat;
  background-size: cover;
  margin-right: 0.03rem;
}
.zhongzhi_ope {
  width: 0.12rem;
  height: 0.14rem;
  background-image: url("../../../assets/images/projectAgentInfo/common/zhongzhi_200.png");
  background-repeat: no-repeat;
  background-size: cover;
  margin-right: 0.03rem;
}
.text_status {
  margin-right: 0.15rem;
}
.shenqing_person {
  width: 0.85rem;
}
.shen_org {
  width: 1.68rem;
}
.shen_number {
  width: 1.57rem;
}
.gui_number {
  width: 1.78rem;
}
.contact_name {
  width: 3.23rem;
}
.agent {
  width: 1.2rem;
}
.project_name {
  width: 1.51rem;
}
.agent_time {
  width: 1.6rem;
}
.baohu {
  width: 0.73rem;
}
.yongjin {
  width: 1.67rem;
}
.fawu {
  width: 0.88rem;
}
.fenxain {
  width: 1.19rem;
}
.gaizhang {
  width: 0.76rem;
}
.zuofei {
  width: 0.76rem;
}
.guidang {
  width: 0.76rem;
}
.ziliao {
  width: 0.98rem;
}
.luru {
  width: 3.24rem;
  border-right: none;
}
.list_bottom {
  display: flex;
  align-items: center;
  line-height: 0.35rem;
  width: 100%;
  position: fixed;
  left: 0;
  bottom: 0.1rem;
  height: 0.35rem;
  background-color: #e7eef5;
}
.bottom_order {
  font-family: MicrosoftYaHei;
  font-size: 0.12rem;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0rem;
  color: #666666;
  margin-left: 0.13rem;
}
.bottom_total {
  font-family: MicrosoftYaHei-Bold;
  font-size: 0.12rem;
  font-weight: normal;
  letter-spacing: 0rem;
  color: #ff5a1e;
}
.bottom_heji {
  font-family: MicrosoftYaHei-Bold;
  font-size: 0.14rem;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0rem;
  color: #000000;
  margin-left: 0.13rem;
}
.bottom_left {
  width: 0.1rem;
  height: 0.12rem;
  margin-left: 0.03rem;
  background-color: #259cf3;
}
.status_pai {
  width: 0.52rem;
  font-family: MicrosoftYaHei;
  font-size: 0.12rem;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0rem;
  color: #444444;
}
.status_i {
  color: #ff5a1e;
}
.status_p {
  color: #008000;
}
.no_dataBox {
  position: fixed;
  width: 100%;
  height: calc(~"100% - 1.38rem");
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #edf3fb;
  .no-data {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;

      & > img {
        transform: scale(0.9);
      }

      .no_dataSpan {
        font-size: 0.18rem;
        margin-top: 0.1rem;
        color: #999999;
      }
    }
}
.isLoading {
  position: absolute;
  top: 0.95rem;
  width: 100%;
  height: calc(~"100% - 0.65rem");
  min-height: 2rem;
  background: rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 999;
}
.g_lists {
  width: 31.53rem;
  height: calc(100% - 0.32rem);
  overflow: hidden;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 0 0.1rem;
  box-sizing: border-box;
}
.middle{
  width: 100%;
  height: 0.32rem;
  background-color: #259cf3;
}
</style>
<style>
.u_topSelect .selected_text{
    font-weight: normal!important;
}
</style>