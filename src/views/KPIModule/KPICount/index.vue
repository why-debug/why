<!-- KPI统计需求 需求ID: 11736 产品:刘会敏 Time:2020-03-05 -->
<template>
  <div style="overflow: hidden;width: 100%;height: 100%;position: relative">
    <div class="tab-box">
      <div class="left-btn-box">
        <div
          v-for="(item, index) in tabList"
          :key="index"
          :class="{'active': nowTabValue === index}"
          @click="changeTab(index)">
          {{item}}
        </div>
      </div>

      <!--目标设置-->
      <!-- <div class="goal-set">目标设置</div>-->

      <div class="right-op-box">

        <!--收支平衡导入-->
        <div class="export-excel" @click.stop="szphExport" v-if="nowTabValue === 1 &&$UserPermission.KPIBreakEvenImportAuth()">
          <img src="../../../assets/images/projectAgentInfo/contract/u_Export.png" alt="">
          <div>收支平衡导入</div>
        </div>

        <!--导出-->
        <div class="export-excel" @click.stop="exportExcel" v-if="userPermissionMixins.KPIExportAuth()">
          <img src="../../../assets/images/projectAgentInfo/contract/u_Export.png" alt="">
          <div>导出</div>
        </div>

        <!--分页-->
        <div class="page-box" >
          <div class="normal" @click.stop="lastPage">&lt;</div>
          <div class="normal" @click.stop="nextPage">&gt;</div>
          <el-input class="input-box"
                    v-only-number
                    @input="paginationChange"
                    @blur="blurChange"
                    v-model="pageParam[nowTabValue].pageOffset"
                    style="width: 0.35rem">
          </el-input>
          <div class="normal" @click.stop="paginationData">GO</div>
          <div class="num">共{{pageParam[nowTabValue].totalPage || 0}}页，{{pageParam[nowTabValue].total || 0}}条</div>
        </div>
      </div>
    </div>
    <div class="table-tip">数据可能存在延迟，当前分数仅作为参考，最终以人事核算为准</div>
    <div class="content-box">

      <brokerCountList
        :pageParam="pageParam[nowTabValue]"
        :nowTabValue="nowTabValue"
        v-show="nowTabValue === 0"
        v-on:pageRetrunParam="pageRetrunParams"
        ref="brokerCountList">
      </brokerCountList>

      <branchManagerList
        :pageParam="pageParam[nowTabValue]"
        :nowTabValue="nowTabValue"
        v-show="nowTabValue === 1">
      </branchManagerList>

      <districtOwnerList
        :pageParam="pageParam[nowTabValue]"
        :nowTabValue="nowTabValue"
        v-show="nowTabValue === 2">
      </districtOwnerList>

      <districtMasterList
        :pageParam="pageParam[nowTabValue]"
        :nowTabValue="nowTabValue"
        v-show="nowTabValue === 3">
      </districtMasterList>
    </div>

    <!--弹窗-->
    <breakEvenPopup
      :isShow.sync="breakEvenPopup.isShow"
      v-if="breakEvenPopup.isShow">
    </breakEvenPopup>
  </div>
</template>

<script>
  import {ErpCommon} from "../../../utils/ErpCommon";
  import brokerCountList from "./components/brokerCountList";
  import branchManagerList from "./components/branchManagerList";
  import districtOwnerList from "./components/districtOwnerList";
  import districtMasterList from "./components/districtMasterList";
  import breakEvenPopup from "./components/breakEvenPopup";
  import {GetUserOpers, GetUserOpersRequest} from "../../../net/common/GetUserOpers";
  import {GetBaseInfoModel, SetBaseInfoModel} from "../../../model/BaseInfoModel";
 import {FormatDate} from "../../../utils/Common"
  import {
    GetBranchManagerList,
    GetBranchManagerListRequest,
    GetBrokerCountList,
    GetBrokerCountListRequest,
    GetDistrictMasterList,
    GetDistrictMasterListRequest,
    GetDistrictOwnerList,
    GetDistrictOwnerListRequest
  } from "../../../net/KPIModule/GetKPICountNet";
  import {UserPermissionMixinsValue} from "../../../mixins/UserPermissionMixins";

  export default {
    mixins: [UserPermissionMixinsValue],

    components: {
      brokerCountList,
      branchManagerList,
      districtOwnerList,
      districtMasterList,
      breakEvenPopup
    },

    data() {
      return {
        nowTabValue: 0, //当前 tab Index
        // tabList: ["经纪人统计", "分行经理统计", "区经统计", "区主统计"],
        tabList: ["经纪人统计"],
        pageOffset: 1,
        pageSize: 30,
        totalPage: 0,
        total: 0,

        // 数据分页相关参数
        pageParam: {
          0: {
            pageOffset: 1,
            pageSize: 30,
            totalPage: 0,
            total: 0,
            kpiTargetType:"",
            month: new FormatDate(new Date).getYear() + "-"+ new FormatDate(new Date).getMonth(),
            organizationId: "",
            userId: "",
            personNumSearch:'',
          },
          1: {
            pageOffset: 2,
            pageSize: 30,
            totalPage: 2,
            total: 2,
          },
          2: {
            pageOffset: 3,
            pageSize: 30,
            totalPage: 3,
            total: 3,
          },
          3: {
            pageOffset: 4,
            pageSize: 30,
            totalPage: 4,
            total: 4,
          },
        },

        //导出表头参数
        exportExcelParams:{
          organizationName: "",
          userName: "",
          kpiTargetText: "",
          month:new FormatDate(new Date).getYear() + "-"+ new FormatDate(new Date).getMonth()
        },

        // 收支平衡弹窗显示
        breakEvenPopup: {
          isShow: false,
        },
      }
    },
    created() {
      window.kpiBrokerSearch = this.kpiBrokerSearch;
      setTimeout(()=>{
       new ErpCommon().refreshData();

       // 非erp内访问 默认请求当前列表数据 ：
       if(!new ErpCommon().isErp()){
          this.$refs.brokerCountList.initData();
        }

      },0);

    },
    mounted() {
      this.initUserOpers();
    },

    methods: {
      async initUserOpers(){
        console.log('--KPI统计权限初始化开始--');
        let userId = new ErpCommon().getOperator('USER_ID'); //写死测试userId:20341347 20341322

        if (!userId) return;

        let userOpers = await new GetUserOpers(new GetUserOpersRequest({userId:userId})).send();
        SetBaseInfoModel.setUserOpers(userOpers);
        console.log('--KPI统计权限初始化完成--');
      },
      //根据目标考核类型、月份、组织ID、经纪人ID
      kpiBrokerSearch(objStr){
        let obj = JSON.parse(objStr);
        this.pageParam[this.nowTabValue].kpiTargetType = obj.kpiTargetType  || '';
        this.pageParam[this.nowTabValue].month=obj.month  || '';
        this.pageParam[this.nowTabValue].organizationId=obj.organizationId  || '';
        this.pageParam[this.nowTabValue].userId=obj.userId  || '';
        this.pageParam[this.nowTabValue].personNumSearch=obj.personNumSearch  || '';

        // 导出文字拼接
         console.log(obj.userName,obj.organizationName,obj.kpiTargetText,'111111111');
         this.exportExcelParams.organizationName = obj.organizationName;
         this.exportExcelParams.userName = obj.userName;
         this.exportExcelParams.kpiTargetText = obj.kpiTargetText;
         this.exportExcelParams.month = obj.month;
        console.log(obj);
        //初始化页数、总数、偏移量参数
        this.pageParam[this.nowTabValue].pageOffset= 1;
        this.pageParam[this.nowTabValue].totalPage= 0;
        this.pageParam[this.nowTabValue].total= 0;
       // 触发子组件查询数据
        this.$refs.brokerCountList.initData();
      },
      //获取返回页数参数并设置
      pageRetrunParams(obj){
        this.pageParam[0].pageOffset=obj.pageNum  || '';
        this.pageParam[0].pageSize=obj.pageSize  || '';
        this.pageParam[0].totalPage=obj.totalPage  || '';
        this.pageParam[0].total=obj.total  || '';
      },
      changeTab(index) {
        if (this.nowTabValue == index) return;

        this.nowTabValue = index;
      },
      //导出功能
      async exportExcel() {
        let params = {};
        // 经纪人统计导出
        if (this.nowTabValue == 0){
           let exportParam={
            isExport:1,
            pageOffset: 1,
            pageSize: 30,
            kpiTargetType:this.pageParam[0].kpiTargetType,
            month: this.pageParam[0].month,
            organizationId: this.pageParam[0].organizationId,
            userId: this.pageParam[0].userId,
            personNumSearch: this.pageParam[0].personNumSearch,
           }
          let data = await new GetBrokerCountList(new GetBrokerCountListRequest(exportParam)).send();
          //导出数据表模板
          params = {
            fileName: "经纪人统计",
            headList: [
              {name: "姓名", key: "name"},
              {name: "员工编号", key: "personNum"},
              {name: "部门", key: "deptName"},
              {name: "岗位", key: "jobName"},
              {name: "考核目标类型", key: "checkAim"},
              {name: "实时总分", key: "allNum"},
              {name: "新增房源套", key: "addHouseNow"},
              {name: "新增目标房源", key: "addHouseAims"},
              {name: "新增房源加分", key: "addHouseScore"},
              {name: "客户新增个数", key: "addCustomNow"},
              {name: "客户新增目标个数", key: "addCustomAims"},
              {name: "客户新增加分", key: "addCustomScore"},
              {name: "房源备案套数", key: "houseBeiAnNow"},
              {name: "房源备案目标套数", key: "houseBeiAnAims"},
              {name: "房源备案套加分", key: "houseBeiAnScore"},
              {name: "新增钥匙套", key: "addKeyNow"},
              {name: "新增钥匙目标个数", key: "addKeyAims"},
              {name: "新增钥匙套加分", key: "addKeyScore"},
              {name: "上传图片套", key: "uploadImgNow"},
              {name: "上传图片目标套数", key: "uploadImgAims"},
              {name: "上传图片套加分", key: "uploadImgScore"},

              {name: "小号通话大于一分钟", key: "phoneCallNow"},
              {name: "小号跟进目标个数", key: "phoneCallAims"},
              {name: "小号跟进加分", key: "phoneCallScore"},

              {name: "有效跟进", key: "writeFollowNow"},
              {name: "有效跟进目标个数", key: "writeFollowAims"},
              {name: "有效跟进加分", key: "writeFollowScore"},

              {name: "一手踩盘", key: "reviewBuild"},
              {name: "一手踩盘目标套数", key: "targetReviewBuild"},
              {name: "一手踩盘加分", key: "reviewBuildScore"},

              {name: "二手实勘套数", key: "fangKan"},
              {name: "二手实勘目标套数", key: "targetFangKan"},
              {name: "二手实勘加分", key: "fangKanScore"},

              {name: "一手带看套", key: "yiShouDaiKanNow"},
              {name: "一手带看目标套数", key: "yiShouDaiKanAims"},
              {name: "一手带看加分", key: "yiShouDaiKanScore"},
              {name: "二手带看套", key: "ershouDaiKanNow"},
              {name: "二手带看目标个数", key: "ershouDaiKanAims"},
              {name: "二手带看加分", key: "ershouDaiKanScore"},
              {name: "美联好房有效注册个数", key: "registerNow"},
              {name: "美联好房有效注册目标个数", key: "registerAims"},
              {name: "美联好房有效注册加分", key: "registerScore"},
              {name: "独家委托套数", key: "duJiaWeiTuoNow"},
              {name: "独家委托目标套数", key: "duJiaWeiTuoAims"},
              {name: "独家委托加分", key: "duJiaWeiTuoScore"},

              {name: "买卖(独立单)单数", key: "maiMaiIndependent"},
              {name: "买卖(独立单)目标单数", key: "maiMaiIndependentAims"},
              {name: "买卖(独立单)单加分", key: "maiMaiIndependentScore"},

              {name: "买卖(组内合作)单数", key: "hangNeiMaiMaiNow"},
              {name: "买卖(组内合作)目标单数", key: "hangNeiMaiMaiAims"},
              {name: "买卖(组内合作)单加分", key: "hangNeiMaiMaiScore"},
              {name: "买卖(跨组)单数", key: "kuaHangMaiMaiNow"},
              {name: "买卖(跨组)目标单数", key: "kuaHangMaiMaiAims"},
              {name: "买卖(跨组)单加分", key: "kuaHangMaiMaiScore"},


              {name: "租赁(独立单)单数", key: "rentIndependent"},
              {name: "租赁(独立单)目标单数", key: "rentIndependentAims"},
              {name: "租赁(独立单)单加分", key: "rentIndependentScore"},

              {name: "租赁(组内合作)单数", key: "hangNeiRentNow"},
              {name: "租赁(组内合作)目标单数", key: "hangNeiRentAims"},
              {name: "租赁(组内合作)单加分", key: "hangNeiRentScore"},
              {name: "租赁(跨组合作)单数", key: "kuaHangRentNow"},
              {name: "租赁(跨组合作)目标单数", key: "kuaHangRentAims"},
              {name: "租赁(跨组合作)单加分", key: "kuaHangRentScore"},

              {name: "业务员个数", key: "yeWuYuanNow"},
              {name: "业务员目标个数", key: "yeWuYuanAims"},
              {name: "业务员加分", key: "yeWuYuanScore"},
              {name: "管理岗个数", key: "guanLiGangNow"},
              {name: "管理岗目标个数", key: "guanLiGangAims"},
              {name: "管理岗加分", key: "guanLiGangScore"},
              {name: "行政&资质加分", key: "xingZhengNum"},

            ],
            data: data.list,
          };
        }


        // 分行经理统计导出
        if (this.nowTabValue == 1){
          let data = await new GetBranchManagerList(new GetBranchManagerListRequest()).send();
          //导出数据表模板
          params = {
            fileName: "分行经理统计",
            headList: [
              {name: "序号", key: "orderNum"},
              {name: "日期", key: "dateTime"},
              {name: "姓名", key: "name"},
              {name: "员工编号", key: "id"},
              {name: "职级", key: "jobLevel"},
              {name: "职位", key: "jobName"},
              {name: "组别编号", key: "groupId"},
              {name: "组别", key: "group"},
              {name: "考核目标类型", key: "checkAim"},
              {name: "人数", key: "peopleNum"},
              {name: "KPI总分", key: "kpiTotalScore"},
              {name: "人均完成业绩金额", key: "perAchieveMoney"},
              {name: "人均业绩在收支平衡的比例", key: "renJunYeJiNow"},
              {name: "人均业绩在收支平衡的比例加分", key: "renJunYeJiScore"},
              {name: "人均有效房源录入系统个数", key: "activeListingsNow"},
              {name: "人均有效房源录入系统目标个数", key: "activeListingsAims"},
              {name: "人均有效房源录入系统加分", key: "activeListingsScore"},
              {name: "人均客户资源录入系统个数", key: "keHuSourceNow"},
              {name: "人均客户资源录入系统目标个数", key: "keHuSourceAims"},
              {name: "人均客户资源录入系统加分", key: "keHuSourceScore"},
              {name: "人均产品转介加分", key: "zhuanJieScore"},
              {name: "人均服务好评加分", key: "fuWuHaoPingScore"},
              {name: "人均邀请使用小程序或加入美联会加分", key: "useAppletScore"},
              {name: "分行执行总行制定的工作规则加分", key: "workingRulesScore"},
              {name: "人均知识库分享文章加分", key: "articleScore"},
              {name: "业务员平均提供合理化建议加分", key: "suggestScore"},
              {name: "分行人数开单比例", key: "billingRatioNow"},
              {name: "分行人数开单加分", key: "billingRatioScore"},
              {name: "分行人员稳定性比例", key: "stabilityNow"},
              {name: "分行人员稳定性加分", key: "stabilityScore"}
            ],
            data: data.list,
          };
        }

          // 区经统计导出
        if (this.nowTabValue == 2){
          let data = await new GetDistrictOwnerList(new GetDistrictOwnerListRequest()).send();
          //导出数据表模板
          params = {
            fileName: "区经统计",
            headList: [
              {name: "序号", key: "orderNum"},
              {name: "日期", key: "dateTime"},
              {name: "姓名", key: "name"},
              {name: "员工编号", key: "id"},
              {name: "职级", key: "jobLevel"},
              {name: "职位", key: "jobName"},
              {name: "管辖片区名称", key: "jurisdictionName"},
              {name: "考核目标类型", key: "checkAim"},
              {name: "辖组别数", key: "jurisdictionGroup"},
              {name: "平均组别人数", key: "perGroupNum"},
               {name: "KPI总分", key: "kpiTotalScore"},
              {name: "人均完成业绩金额", key: "perAchieveMoney"},
              {name: "人均业绩在收支平衡的比例", key: "renJunYeJiNow"},
              {name: "人均业绩在收支平衡的比例加分", key: "renJunYeJiScore"},
              {name: "人均有效房源录入系统个数", key: "activeListingsNow"},
              {name: "人均有效房源录入系统目标个数", key: "activeListingsAims"},
              {name: "人均有效房源录入系统加分", key: "activeListingsScore"},
              {name: "人均客户资源录入系统个数", key: "keHuSourceNow"},
              {name: "人均客户资源录入系统目标个数", key: "keHuSourceAims"},
              {name: "人均客户资源录入系统加分", key: "keHuSourceScore"},
              {name: "人均产品转介加分", key: "zhuanJieScore"},
              {name: "人均服务好评加分", key: "fuWuHaoPingScore"},
              {name: "人均邀请使用小程序或加入美联会加分", key: "useAppletScore"},
              {name: "分行执行总行制定的工作规则加分", key: "workingRulesScore"},
              {name: "人均知识库分享文章加分", key: "articleScore"},
              {name: "业务员平均提供合理化建议加分", key: "suggestScore"},
              {name: "分行人数开单比例", key: "billingRatioNow"},
              {name: "分行人数开单加分", key: "billingRatioScore"},
              {name: "分行人员稳定性比例", key: "stabilityNow"},
              {name: "分行人员稳定性加分", key: "stabilityScore"}
            ],
            data: data.list,
          };
        }

            // 区主统计导出
        if (this.nowTabValue == 3){
          let data = await new GetDistrictMasterList(new GetDistrictMasterListRequest()).send();
          //导出数据表模板
          params = {
            fileName: "区主统计",
            headList: [
              {name: "序号", key: "orderNum"},
              {name: "日期", key: "dateTime"},
              {name: "姓名", key: "name"},
              {name: "员工编号", key: "id"},
              {name: "职级", key: "jobLevel"},
              {name: "职位", key: "jobName"},
              {name: "考核目标类型", key: "checkAim"},
              {name: "KPI总分", key: "kpiTotalScore"},
              {name: "完成业绩", key: "yeJiMubiaoNow"},
              {name: "完成业绩目标", key: "yeJiMubiaoAims"},
              {name: "完成业绩加分", key: "yeJiMubiaoScore"},
              {name: "完成实收", key: "shiShouMuBiaoNow"},
              {name: "完成实收目标", key: "shiShouMuBiaoAims"},
              {name: "完成实收目标加分", key: "shiShouMuBiaoScore"},
              {name: "前两年收佣率", key: "twoYearsRate"},
              {name: "前两年收佣加分", key: "twoYearsRateScore"},
              {name: "前一年收佣率", key: "oneYearsRate"},
              {name: "前一年收佣加分", key: "oneYearsRateScore"},
              {name: "分行KPI平均分", key: "KPIAverageNow"},
              {name: "分行KPI平均分加分", key: "KPIAverageScore"},
            ],
            data: data.list,
          };
        }

        // 拼接导出表头标题
        params.fileName=this.exportExcelParams.month+" "+params.fileName;
        //删除导出数据里用户id
        params.data.forEach(function(key){
          if(key.id !=undefined) delete key.id;
        })
        console.log(params,'--导出参数--');
        console.log(params.fileName,'表头');
        new ErpCommon().exportExcelData(params);
      },
      //收支平衡导入
      szphExport() {
        this.breakEvenPopup.isShow = true;
      },
      lastPage() {
        if (this.pageParam[this.nowTabValue].pageOffset <= 1) return;
        this.pageParam[this.nowTabValue].pageOffset = this.pageParam[this.nowTabValue].pageOffset - 1;
         this.$refs.brokerCountList.initData();
      },
      nextPage() {
        if (this.pageParam[this.nowTabValue].pageOffset >= this.pageParam[this.nowTabValue].totalPage) return;
        this.pageParam[this.nowTabValue].pageOffset = this.pageParam[this.nowTabValue].pageOffset + 1;
         this.$refs.brokerCountList.initData();
      },
      paginationChange() {
        let pageOffset = this.pageParam[this.nowTabValue].pageOffset;
        if (pageOffset === 0 ) {
          pageOffset = 1;
        }

        if (pageOffset >= this.pageParam[this.nowTabValue].totalPage) {
          pageOffset = this.pageParam[this.nowTabValue].totalPage == 0 ? 1 : this.pageParam[this.nowTabValue].totalPage;
        }
        this.pageParam[this.nowTabValue].pageOffset = pageOffset

      },
      blurChange() {
        console.log(11111111111);
        let pageOffset = this.pageParam[this.nowTabValue].pageOffset;
        if (pageOffset <= 1 || pageOffset == "") {
          pageOffset = 1;
        }
        this.pageParam[this.nowTabValue].pageOffset = pageOffset
      },
      paginationData() {
        this.$refs.brokerCountList.initData();
        console.log('--查询--');
      },
    },
  }
</script>

<style scoped lang="less">
  @tabHeight: 0.26rem;
  @tabWidth: 0.81rem;

  .table-tip{
    width:100%;
    height:0.3rem;
    line-height:0.3rem;
    color:#FF0000;
    background-color:	rgba(255,165,0,.5);
    display:flex;
    padding: 0 0.07rem;
  }

  .tab-box {
    width: 100%;
    height: 0.34rem;
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    background: #f5f5f5;
    padding: 0 0.07rem;
    border-bottom: 0.01rem #d1d1d1 solid;
    z-index: 20;

    .left-btn-box {
      display: flex;
      align-items: center;

      & > div {
        width: @tabWidth;
        height: @tabHeight;
        line-height: @tabHeight;
        text-align: center;
        color: #666666;
        font-size: 0.12rem;
        margin-right: 0.08rem;
        cursor: pointer;
        background-color: #f4f4f4;
        box-shadow: 0.005rem -0.01rem 0.02rem 0rem rgba(0, 0, 0, 0.25);
        border-radius: 0.03rem 0.03rem 0 0;
        border-top: 0.01rem #d1d1d1 solid;
        border-left: 0.01rem #d1d1d1 solid;
        border-right: 0.01rem #d1d1d1 solid;
        margin-bottom: -0.08rem;
        -moz-user-select: none;
        -khtml-user-select: none;
        user-select: none;
        z-index: 99;
      }

      .active {
        background: #ffffff;
      }
    }

    .goal-set {
      height: 0.34rem;
      color: #0000FF;
      line-height: 0.34rem;
      text-align: center;
      position: absolute;
      left: 4rem;
    }

    .right-op-box {
      display: flex;
      flex-direction: row;

      .export-excel {
        box-sizing: border-box;
        height: 0.34rem;
        margin-right: 0.15rem;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        cursor: pointer;

        & > img {
          width: 0.14rem;
          height: 0.14rem;
          margin-right: 0.07rem;
        }

        div {
          font-size: 0.13rem;
          color: #259cf3;
          -moz-user-select: none;
          -khtml-user-select: none;
          user-select: none;
        }
      }

      .page-box {
        display: flex;
        align-items: center;
        margin-right: 0.1rem;
        -moz-user-select: none;
        -khtml-user-select: none;
        user-select: none;

        /deep/ .el-input--small .el-input__inner {
          height: 0.205rem;
          padding: 0 8px;
          line-height: normal;
          text-align: center;
        }

        & > .normal {
          width: 0.2rem;
          height: 0.2rem;
          line-height: 0.2rem;
          text-align: center;
          font-size: 0.12rem;
          color: #bbbbbb;
          background-color: #e0e0e0;
          border-radius: 0.04rem;
          margin-right: 0.08rem;
          cursor: pointer;

          &:hover {
            background-color: #259cf3;
            color: #ffffff;
          }
        }

        & > .input-box {
          width: 0.35rem;
          height: 0.2rem;
          border-radius: 0.04rem;
          margin-right: 0.08rem;
          text-align: center;
          font-size: 0.12rem;
        }

        & > .num {
          font-size: 0.12rem;
          color: #999999;
        }
      }
    }
  }

  .content-box {
    width: 100%;
    /*height: calc(~"100% - 0.32rem - 0.34rem - 0.3rem");*/
    height: calc(~"100% - 0.34rem - 0.3rem");
    box-sizing: border-box;
    overflow: hidden;
    display: flex;
  }
</style>
