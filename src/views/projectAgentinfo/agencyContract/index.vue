<template>
  <div>
    <div class="order">
      <!-- 顶部筛选 -->
       <div class="g_topselect">
            <div class="g_selectMenu">
                <div class="u_select"><selectOrg @onSelectChange="f_selectOrg" :empty="empty" :defaultText="'申请组织'"></selectOrg></div>
                <div class="u_select"><selectRadio @onSelectChange="f_selectTimeType" :list="timeList" :defaultText="'时间类型'"  :empty="empty" imgSrc="type_200"></selectRadio></div>
                <div class="u_select"><selectDataTime @upDataTime="f_agentDate" :empty="empty"  :defaultText="'合同时间'" :timeType="topParams.timeType"></selectDataTime></div>
                <div class="u_select"><selectRadio @onSelectChange="f_auditStatus" :list="auditStatusList" :defaultText="'审批状态'"  :empty="empty" imgSrc="status_200"></selectRadio></div>
                <div class="u_select"><selectRadio @onSelectChange="f_approval" :list="approvalList" :defaultText="'待我审批'"  :empty="empty" imgSrc="ownership_200"></selectRadio></div>
                <div class="u_select"><selectRadio @onSelectChange="f_agentStatus" :list="agentStatusList" :defaultText="'合同状态'" :empty="empty" imgSrc="status_200"></selectRadio></div>
            </div>
            <div class="g_btnList">
                <div class="u_btn g_submit" @click="f_submit">查询</div>
                <div class="u_btn" @click="f_clear">重置</div>
            </div>
        </div>
      <!-- 列表顶部搜索导出 -->
      <div class="build-top f_r_s">
        <div class="left_box">
          <div class="active">代理合同</div>
        </div>
        <div class="right_box">
          <SearchInput :placeholder="placeholderText" v-model="personName" :empty="searchEmpty" @Kwd="kwdVal" @kwdSearch="kwdSearch" width="3.46"></SearchInput>
          <div class="topseach" @click="toAddContract" >
            <img src="../../../assets/images/projectAgentInfo/agentContract/add_3_200.png" class="addIcon" />
            <span class="addSpan">新增</span>
          </div>
          <div class="topseach">
            <img src="../../../assets/images/projectAgentInfo/agentContract/contract_1_200.png" class="addIcon" />
            <span class="addSpan">批量审批</span>
          </div>
          <div class="topseach"  @click.stop="filterPoput">
            <img src="../../../assets/images/projectAgentInfo/agentContract/edit1_200.png" class="addIcon" />
            <div class="filterChocie">筛选：
              <newAgentTopFilter  ref="filterPoput" @filterParams="f_filterParams" :empty="false" ></newAgentTopFilter>
            </div>
            <span class="shaixuan_value" :title="filterDefault || '默认'">{{filterDefault || '默认'}}</span>
          </div>
          <div class="topseach" @click.stop="f_exportClick" v-if="$UserPermission.AGENCYContractExportAuth()">
            <img src="../../../assets/images/projectAgentInfo/contract/u_Export.png" class="addIcon" />
            <span class="addSpan" >导出</span>
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
        <div style="width: 100%;height: 100%;overflow: auto">
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
            <div class="title_item agent">代理商</div>
            <div class="title_item project_name">项目名称</div>
            <div class="title_item agent_time">代理期限</div>
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
              <div class="list_item time_shenpi" :title="item.approvalTime">{{item.approvalTime}}</div>
              <div class="list_item nowPerson" :title="item.approvalPerson ||'-'">{{item.approvalPerson||"-"}}</div>
              <div class="list_item shenpi_status" :title="approvalStatusList[item.approvalStatus]">{{approvalStatusList[item.approvalStatus]}}</div>
              <div class="list_item hetong_status">
                <div class="text_status" :title="concatList[item.contractStatus]">{{concatList[item.contractStatus]}}</div>
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
                  v-if="item.approvalStatus===0 && $UserPermission.AGENCYContractCopyAuth()"
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
                  v-if="item.approvalStatus===3&&item.contractStatus===4||(item.approvalStatus===2&&(item.contractStatus===0||item.contractStatus===4))&& $UserPermission.AGENCYContractOutBorrowAuth()"
                >
                  <div class="waijie_ope"></div>
                  <div>外借</div>
                </div>
                <div
                  class="status_operate"
                  @click="goOperating(6,item)"
                  v-if="item.approvalStatus===3&&item.contractStatus===2 && $UserPermission.AGENCYContractReturnAuth()"
                >
                  <div class="guihuan_ope"></div>
                  <div>归还</div>
                </div>
                <div
                  class="status_operate"
                  @click="goOperating(7,item)"
                  v-if="item.approvalStatus===3&&item.contractStatus===1 && $UserPermission.AGENCYContractApproveAuth()"
                >
                  <div class="pijie_ope"></div>
                  <div>批借</div>
                </div>
                <div
                  class="status_operate"
                  @click="goOperating(8,item)"
                  v-if="item.approvalStatus===3&&item.contractStatus===3 && $UserPermission.AGENCYContractFileReturnAuth()"
                >
                  <div class="guidang_ope"></div>
                  <div>归档</div>
                </div>

                <div
                  class="status_operate"
                  @click="goOperating(9,item)"
                  v-if="item.approvalStatus===3&&item.contractStatus===4 && $UserPermission.AGENCYContractTerminattionAuth()"
                >
                  <div class="zhongzhi_ope"></div>
                  <div>终止</div>
                </div>
              </div>
              <div class="list_item shenqing_person" :title="item.applicant ">{{item.applicant}}</div>
              <div class="list_item shen_org"  :title="item.applicationOrganization">{{item.applicationOrganization}}</div>
              <div class="list_item shen_number" :title="item.applicationNumber">{{item.applicationNumber}}</div>
              <div class="list_item gui_number" :title="item.archiveNumber ||'-'">{{item.archiveNumber||"-"}}</div>
              <div class="list_item contact_name" :title="item.contractName ||'-'">{{item.contractName||"-"}}</div>
              <div class="list_item agent" :title="item.Agent ||'-'">{{item.Agent||"-"}}</div>
              <div class="list_item project_name" :title="item.projectName">{{item.projectName}}</div>
              <div class="list_item agent_time" :title="item.agencyTermStart   +'至'+ item.agencyTermEnd ">{{item.agencyTermStart | formatTime}}至{{item.agencyTermEnd | formatTime}}</div>
              <div class="list_item baohu" :title="item.customerProtectionPeriod">{{item.customerProtectionPeriod}}</div>
              <div class="list_item yongjin" :title="item.commission">{{item.commission}}</div>
              <div class="list_item fawu" :title="item.legalAffairs">{{item.legalAffairs}}</div>
              <div class="list_item fenxain" :title="item.risk">{{item.risk | hasRisk}}</div>
              <div class="list_item gaizhang" :title="item.stamp">{{item.stamp | hasStamp}}</div>
              <div class="list_item zuofei" :title="item.void">{{item.void |hasVoid}}</div>
              <div class="list_item guidang" :title="item.archive">{{item.archive |hasArchive}}</div>
              <div class="list_item ziliao" :title="item.material">{{item.material |hasMaterial}}</div>
              <div class="list_item luru" :title="item.entryDate">{{item.entryDate | formatTime}}</div>
            </div>
          </div>
       

         <!-- 底部 -->
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
      </div>
     

      <!-- 弹窗 -->
      <Batch v-if="toChange===1" @closeView="closeView" :title="`批量审批`" :dealId="dealId"></Batch>
      <Termination v-if="toChange===9" @closeView="closeView" :title="`代理合同终止`" :dealId="dealId" :operationPersonParams="statusParams"></Termination>
      <Void v-if="toChange===4" @closeView="closeView" :title="`代理合同作废`" :dealId="dealId"></Void>
      <Archive v-if="toChange===8" @closeView="closeView" :title="`归档`" :dealId="dealId"></Archive>
      <GiveBack v-if="toChange===6" @closeView="closeView" :title="`归还`" :dealId="dealId"></GiveBack>
      <Approval v-if="toChange===7" @closeView="closeView" :title="`流程审批`" :dealId="dealId"></Approval>
      <Loan v-if="toChange===5" @closeView="closeView" :title="`新增外借`" :dealId="dealId"></Loan>
    </div>
  </div>
</template>
<script>
import selectRadio from "../../../components/topSelect/selectRadio";
import selectOrg from "../../../components/topSelect/selectOrg.vue";
import selectDataTime from "../form/selectDataTime";
import newAgentTopFilter from "../form/newAgentTopFilter";
import SearchInput from "../distributionContract/components/searchInput";
import agentTopFilter from '../form/agentTopFilter'
import Batch from "./components/batch";
import Termination from "./components/termination";
import Void from "./components/void";
import Archive from "./components/archive";
import GiveBack from "./components/giveBack";
import Approval from "./components/approval";
import Loan from "./components/loan";
import {ErpCommon} from '../../../utils/ErpCommon'
import { getAgencyContractList,agentListRequest } from "../../../net/projectAgentinfo/agencyContract/agencyContractList.js";
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
    selectDataTime,
    agentTopFilter,
    newAgentTopFilter
  },
  data() {
    return {
      goDetails: false,
      filterDefault:'默认',//筛选默认文字
      empty:false, //清空
      isScroll:true,//是否滚动加载
      allSelectFlag:false,//全选flag，
      searchEmpty:false,//是否清空搜索框
      topParams:{},//顶部筛选参数
      statusParams:{
        operationPerson:'',//操作人
        applynNum:''//申请编号
      },//获取当前操作信息
      timeList:[
          { id: 1, text: '录入日期' },
          { id: 2, text: '代理期限' },
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
      agentStatusList:[
        {id:-2,text:'已作废'},
        {id:1,text:'外借中'},
        {id:2,text:'已外借'},
        {id:3,text:'归还中'},
        {id:4,text:'已归档'},
        ],//合同状态列表
      //审批状态
      approvalStatusList: ["未审批", "审批中", "已驳回", "已审批", "已作废"],
      //合同状态
      concatList: ["已作废", "外借中", "已外借", "归还中", "已归档"],
      operateId: [], //批量操作的id
      toChange: "", //合同的操作
      dealId:'',//合同id
      params: {
        approvalStatus: "",
        contractStatus: "",
        approvalStatusIsMe:0,
        dealName: "",
        export: 0,
        keyWords: "",
        orgId: "",
        pageOffset:1,
        pageRows: 30,
        timeEndStr: "",
        timeStartStr: "",
        timeType: "",
        isArchive: "", //(byte)是否归档 0否  1是 
        isCancle: "",//(byte)是否作废 0否  1是 
        isData: "",//(byte)资料是否缺失 0否  1是  
        isRisk: "", //(byte)是否有风险 0无风险  1一般风险 2重大风险
        whetherStamped:'',//是否盖章
      },
      NoData: false,
      isLoad: false,
      placeholderText: "请输入申请、归档编号/项目名称/合同名称/代理商",
      personName: "", //摄影师/预约人姓名、电话
      total: 0,
      //状态
      //列表
      orderList: []
    };
  },
  created() {
    this.topParams = JSON.parse(JSON.stringify(this.params));
    console.log(this.topParams,'这是顶部筛选参数');
    this.initUserOpers();
    this.initData();
  },
  methods: {
     //初始化权限
     async initUserOpers(){
        console.log('--代理合同权限初始化开始Index--');
        let userId = new ErpCommon().getOperator('USER_ID'); //写死测试userId:20341347 20341322

        if (!userId) return;

        let userOpers = await new GetUserOpers(new GetUserOpersRequest({userId:userId})).send();
        SetBaseInfoModel.setUserOpers(userOpers);
        console.log('--代理合同权限初始化完成--');
      },
    initData() {
      this.isLoad = true;
      new getAgencyContractList(new agentListRequest(this.params))
        .send()
        .then(res => {
          // if(res.code!=200){
          //   this.isLoad=false
          //   return
          // }
          this.total = res.total;
          this.orderList = [...res.list];
          if (this.orderList.length == 0) {
            this.NoData = true;
          }else{
            this.NoData = false;
          }
          this.isLoad = false;
        })
        .catch(res => {
          this.isLoad = false;
          this.$erpCommon.toast(
             "服务器开小差了,请稍后再试",
            "error"
          );
        });
    },
    //新增代理合同
    toAddContract(){
      this.$router.push({ path: "/addAgentContract",query:{index:1} });
    },
    //下拉加载
    refresh() {
      this.isScroll = false;
      this.isLoad = true;
      new getAgencyContractList(this.params)
        .send()
        .then(res => {
          this.isLoad = false;
          let list = res.list;
          if( list.length <1) return;
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
            "error"
          );
        });
    },
    topSelect(val) {
      console.error(val, "顶部筛选");
      this.initData();
      //发请求
    },
    //打开筛选弹窗
    filterPoput(){
      this.$refs.filterPoput.chooseInfo();
    },
    //申请组织
    f_selectOrg(data){
      this.empty = false; 
      console.log(data,'筛选组织');
      if(data.text == "全部"){
           this.topParams.orgId = "";
        }else{
          this.topParams.orgId = data.id || '';
        }
    },
     //时间类型
    f_selectTimeType(data){
        this.empty = false; 
        console.log(data.text, data.id, '日期类型');
        this.topParams.timeType = data.id || '';
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
    //合同状态
    f_agentStatus(data){
      this.empty = false; 
      console.log(data,'合同状态');
      this.topParams.contractStatus = data.id || 0;
    },
    //筛选
    f_filterParams(info){
      let text = info.selectText;
      this.filterDefault = text;
      let data = info.filterParams;
      this.topParams.isArchive = data.isFile;
      this.topParams.isCancle = data.isVoid;
      this.topParams.isData = data.isMissData;
      this.topParams.isRisk = data.isRisk;
      this.topParams.whetherStamped = data.isStamp; 
    },
    //查询
    f_submit(){
    console.log(this.topParams,'这是顶部筛选参数');
    this.topParams.pageOffset = 1;
    //若选择了条件，没有点击查询，导出时时间不会错误，且编辑数据保存之后列表初始化不会出错
    this.params = JSON.parse(JSON.stringify(this.topParams));
      this.initData();
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
        this.topParams.keyWords = '';
        this.topParams.orgId = '';
        this.topParams.pageOffset = 1;
        this.topParams.pageRows = 30;
        this.topParams.timeEndStr = '';
        this.topParams.timeStartStr = '';
        this.topParams.timeType = '';
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
        this.initData();
        console.log(data,'关键字');
    },
    //触底加载
    scrollBottom() {
      console.log("到底啦",111111111111111111);
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
    //操作
    goOperating(index,val) {
      this.toChange = index;
      this.dealId=val.dealId;
      this.statusParams.operationPerson = val.applicant;
      this.statusParams.applynNum = val.applicationNumber;
      if(index == 0) this.$router.push({ path: "/addAgentContract",query:{index:2,dealId:val.dealId} });
    },
    //双击进入详情
    goxiangqing(dealId) {
      this.goDetails = true;
      //  this.$router.push({path:"/agencyContractDetails"});
       this.$router.push({ path: "/addAgentContract",query:{index:3,dealId:dealId} });
      console.log("双击了");
    },
    //关闭详情
    closeView(val) {
        this.toChange =val;
    },
    //返回风险、作废、归档、资料缺失文本
    getText(val,isRisk = false){
      if(val == '' || val == undefined){
        return ''
      }else{
        let num = Number(val);
        if(isRisk){
          let arr = ['无风险','一般风险','重大风险'];
          return arr[num];
        }else{
        let text = (num ==0?'否':'是');
        return text;
        }
      }
    },
    //导出
    async f_exportClick(){
      console.log('这是导出哈哈哈哈');
        let params = {};
        // 导出参数
        let exportParam = {
            export:1,
            approvalStatus: this.params.approvalStatus, //审批状态
            approvalStatusIsMe: this.params.approvalStatusIsMe, //待我审批
            contractStatus: this.params.contractStatus, //合同状态
            dealName: this.params.dealName, //合同名称
            keyWords: this.params.keyWords, //搜索关键字
            distributionRange: this.params.distributionRange, //分销范围
            keyWords: this.params.keyWords, //模糊搜索
            orgId: this.params.orgId, //申请组织id
            pageOffset: this.params.pageOffset, //当前页数
            pageRows: this.params.pageRows, //请求条数
            timeEndStr: this.params.timeEndStr, //结束时间
            timeStartStr: this.params.timeStartStr, //开始时间
            timeType: this.params.timeType, //时间类型    
            isArchive: this.params.isArchive, //是否归档    
            isCancle: this.params.isCancle, //是否作废    
            isData: this.params.isData, //资料是否缺失    
            isRisk: this.params.isRisk, //是否有风险    
            whetherStamped: this.params.whetherStamped, //是否盖章  
        };
        // 导出接口
        let data = await new getAgencyContractList(new agentListRequest(exportParam)).send().then((res)=>{return res.list});
        console.log(data, '接口数据');

        //导出数据表模板
        params = {
            fileName: "代理合同列表",
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
                { name: "代理商", key: "Agent" },
                { name: "项目名称", key: "projectName" },
                { name: "代理期限", key: "projectNameTerm" },
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
        //分销合同将返回的开始时间、结束时间拼接
         // 拼接导出表头标题
            if(this.params.timeStartStr != ""){
                //去除时分秒
                let except = (val)=>{
                    return val.split(' ')[0];
                }
                params.fileName=except(this.params.timeStartStr)+"~"+except(this.params.timeEndStr) + params.fileName;
            }
         for(let info of data){
           //返回审批状态、合同状态文本
           info.approvalStatus = this.approvalStatusList[info.approvalStatus];
           info.contractStatus = this.concatList[info.contractStatus];
           //拼接代理期限
           if(info.agencyTermStart !=''){
              info.projectNameTerm = info.agencyTermStart + '至' + info.agencyTermEnd;
           }else{
              info.projectNameTerm = '';
           }
           //返回风险、作废、归档、资料缺失文本
            info.archive =  this.getText(info.archive);
            info.void =  this.getText(info.void);
            info.material =  this.getText(info.material);
            info.risk =  this.getText(info.risk,true);
            info.stamp =  this.getText(info.stamp);
         }
        console.log(params, '--导出参数--');
        console.log(params.fileName, '表头');
        new ErpCommon().exportExcelData(params);
    },
  },
  filters:{
        formatTime(val){
            if(val != '' && val !=undefined){
                return val.split(' ')[0];
            }else{
                return '--';
            }
        }, 
        hasRisk(val){
          if(val!=undefined && val !==''){
            if(val == 0) return '无风险';
            if(val == 1) return '一般风险';
            if(val == 2) return '重大风险';
          }else{
            return '--'
          }
        },
         hasStamp(val){
          if(val!=undefined && val !==''){
            if(val == 0) return '否';
            if(val == 1) return '是';
          }else{
            return '--'
          }
        },
         hasVoid(val){
          if(val!=undefined && val !==''){
            if(val == 0) return '否';
            if(val == 1) return '是';
          }else{
            return '--'
          }
        },
         hasArchive(val){
          if(val!=undefined && val !==''){
            if(val == 0) return '否';
            if(val == 1) return '是';
          }else{
            return '--'
          }
        },
         hasMaterial(val){
          if(val!=undefined&& val !==''){
            if(val == 0) return '否';
            if(val == 1) return '是';
          }else{
            return '--'
          }
        },
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
.build-top {
  width: 100%;
  height: 0.34rem;
  background-image: linear-gradient(#f9f9f9, #dedede);
  align-items: flex-end;
  // overflow: hidden;
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
      .filterChocie{
        display: inline-flex;
        position: relative;
        font-size: 0.12rem;
        cursor: pointer;
      }
      .shaixuan_value {
        display: block;
        width: 0.4rem;
        font-family: MicrosoftYaHei;
        font-size: 0.12rem;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0rem;
        color: #444444;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
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
  height: calc(~"100% - 0.32rem");
  position: absolute;
  background-color: #edf3fb;


  .g_topselect{
    width: 100%;
    height: 0.33rem;
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

    
  .u_select .select_reg .selected_item .selected_text{
    text-shadow: 0 0.01rem rgba(255, 255, 255, 0.3);
}
}

.g_btnList{
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-right: 0.1rem;
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
}


}
.list_all {
  width: 100%;
  height: calc(~"100% - 0.67rem");
  overflow: hidden;
}
// .content-box {
//     width: 100%;
//     /*height: calc(~"100% - 0.32rem - 0.34rem - 0.3rem");*/
//     height: calc(~"100% - 0.34rem - 0.3rem");
//     box-sizing: border-box;
//     overflow: hidden;
//     display: flex;
//   }
.list_content {
  // width: 31.53rem;
   display: inline-flex;
  // height: calc(100% - 0.4rem);
  // height: 100%;
  padding-left: 0.1rem;
  box-sizing: border-box;
  overflow-x: hidden;
  overflow-y: auto;
}

.title_content_s {
  width: 100%;
  height: 0.32rem;
  box-sizing: border-box;
  position: sticky;
  top: 0;
  z-index: 9;
}

.title_content {
  display: inline-flex;
  align-items: center;
  width: 31.53rem;
  height: 0.3rem;
  padding-left: 0.1rem;
  background-color: #ffffff;
  border: solid 0.01rem #ffffff;
  // overflow: auto;
}

.content {
  display: inline-flex;
  // width: 31.53rem;
  height: 0.3rem;
  min-height: 0.3rem;
  margin-top: 0.05rem;
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
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
.select {
  // display: flex;
  // justify-content: center;
  // padding-left: 0;
  cursor: pointer;
  width: 0.59rem;
  border-right: 0.01rem dotted #d5d5d5;
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
  width: 0.4rem;
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
  top: 0.99rem;
  width: 100%;
  height: calc(~"100% - 0.99rem");
  min-height: 2rem;
  background: rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 999;
}

// .isLoading {
//   position: absolute;
//   top: 0;
//   width: 100%;
//   height: calc(100% - 0.65rem);
//   min-height: 2rem;
//   background: rgba(0, 0, 0, 0.1);
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   align-items: center;
//   z-index: 999;
// }
.g_lists {
  width: 31.53rem;
  height: calc(~"100% - 0.32rem"); 
  padding: 0 0.1rem;
  display: flex; 
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  box-sizing: border-box;
  overflow: hidden;
  overflow-y: auto;
}
</style>
<style>
.u_select .selected_text{
    font-weight: normal!important;
}
.u_select .selected_item{
    height: 0.32rem!important;
    line-height: 0.31rem!important;
    box-sizing: border-box;
    border-bottom:1px solid #126fb2;
}
</style>