<!--经纪人统计-->
<template>
  <div style="width: 100%;height: 100%;overflow: auto">
    <div class="table-head">
      <div class="name left">姓名</div>
      <div class="personNum  personOrder">员工编号</div>
      <div class="dept-name dept">部门</div>
      <div class="job-name job">岗位</div>
      <div class="job-name target" >考核目标类型</div>
      <div class="all-num total-score">实时总分</div>
      <div class="base-th">新增房源(套)</div>
      <div class="base-th">客户新增(个)</div>
      <div class="base-th">房源备案(套)</div>
      <div class="base-th">新增钥匙(套)</div>
      <div class="base-th">上传图片(套)</div>
      <div class="phone-call">
        <div>小号跟进(通)</div>
        <div class="tips">通话≥1min</div>
      </div>
      <div class="base-th">有效跟进</div>
      <div class="base-th">一手踩盘</div>
      <div class="base-th">二手实勘</div>
      <div class="row-merge">
        <div class="row-top">带看</div>
        <div class="row-bottom">
          <div>一手带看(套)</div>
          <div>二手带看(套)</div>
        </div>
      </div>
      <div class="base-th">
        <div>美联好房</div>
        <div>有效注册(个)</div>
      </div>
      <div class="base-th">独家委托(套)</div>

       <div class="row-sale">
        <div class="row-top">买卖</div>
        <div class="row-bottom">
          <div>独立单</div>
          <div>组内合作</div>
           <div>跨组合作</div>
        </div>
      </div>
         <div class="row-sale">
        <div class="row-top">租赁</div>
        <div class="row-bottom">
          <div>独立单</div>
          <div>组内合作</div>
           <div>跨组合作</div>
        </div>
      </div>
      <div class="row-merge">
        <div class="row-top">推荐入职</div>
        <div class="row-bottom">
          <div>业务员(个)</div>
          <div>管理岗(个)</div>
        </div>
      </div>
      <div class="op-th">行政&资质</div>
    </div>
    <div class="table-content" @dblclick.stop="showDetail(item.id)" v-for="(item,index) in brokerCountList" :key="index" v-if="brokerCountList && brokerCountList.length > 0">
      <div class="name name-left"  :title="item.name">
        <div>{{item.name}}</div>
      </div>

       <div class="person-Num personNum-left">
        <div :title="item.personNum || '--'">{{item.personNum || '--'}}</div>
      </div>

      <div class="dept-name dept-left" :title="item.deptName">
        <div>{{item.deptName}}</div>
      </div>
      <div class="job-name job-left" :title="item.jobName">
        <div>{{item.jobName}}</div>
      </div>
       <div class="target-name target-left" :title="item.checkAim">
        <div>{{item.checkAim}}</div>
      </div>
      <div class="all-num total-left"  :title="item.allNum">{{item.allNum}}</div>
      <div class="base-td">
        <div :title="item.addHouseNow +'/'+item.addHouseAims">
          <span style="color: #ff7f00">{{item.addHouseNow}}</span>
          <span>/</span>
          <span>{{item.addHouseAims}}</span>
        </div>
        <div :title="item.addHouseScore">+{{item.addHouseScore}}分</div>
      </div>
      <div class="base-td">
        <div :title="item.addCustomNow +'/'+item.addCustomAims">
          <span style="color: #ff7f00">{{item.addCustomNow}}</span>
          <span>/</span>
          <span>{{item.addCustomAims}}</span>
        </div>
        <div :title="item.addCustomScore">+{{item.addCustomScore}}分</div>
      </div>
      <div class="base-td">
        <div :title="item.houseBeiAnNow +'/'+item.houseBeiAnAims">
          <span style="color: #ff7f00">{{item.houseBeiAnNow}}</span>
          <span>/</span>
          <span>{{item.houseBeiAnAims}}</span>
        </div>
        <div :title="item.houseBeiAnScore">+{{item.houseBeiAnScore}}分</div>
      </div>
      <div class="base-td">
        <div :title="item.addKeyNow +'/'+item.addKeyAims">
          <span style="color: #ff7f00">{{item.addKeyNow}}</span>
          <span>/</span>
          <span>{{item.addKeyAims}}</span>
        </div>
        <div :title="item.addKeyScore">+{{item.addKeyScore}}分</div>
      </div>
      <div class="base-td">
        <div :title="item.uploadImgNow +'/'+item.uploadImgAims">
          <span style="color: #ff7f00">{{item.uploadImgNow}}</span>
          <span>/</span>
          <span>{{item.uploadImgAims}}</span>
        </div>
        <div :title="item.uploadImgScore">+{{item.uploadImgScore}}分</div>
      </div>
      <div class="base-td">
        <div :title="item.phoneCallNow +'/'+item.phoneCallAims">
          <span style="color: #ff7f00">{{item.phoneCallNow}}</span>
          <span>/</span>
          <span>{{item.phoneCallAims}}</span>
        </div>
        <div :title="item.phoneCallScore">+{{item.phoneCallScore}}分</div>
      </div>

         <div class="base-td">
        <div :title="item.writeFollowNow +'/'+item.writeFollowAims">
          <span style="color: #ff7f00">{{item.writeFollowNow}}</span>
          <span>/</span>
          <span>{{item.writeFollowAims}}</span>
        </div>
        <div :title="item.writeFollowScore">+{{item.writeFollowScore}}分</div>
      </div>
      
       <div class="base-td">
        <div :title="item.reviewBuild +'/'+item.targetReviewBuild">
          <span style="color: #ff7f00">{{item.reviewBuild}}</span>
          <span>/</span>
          <span>{{item.targetReviewBuild}}</span>
        </div>
        <div :title="item.reviewBuildScore">+{{item.reviewBuildScore}}分</div>
      </div>
      <div class="base-td">
        <div  :title="item.fangKan +'/'+item.targetFangKan">
          <span style="color: #ff7f00">{{item.fangKan}}</span>
          <span>/</span>
          <span>{{item.targetFangKan}}</span>
        </div>
        <div :title="item.fangKanScore">+{{item.fangKanScore}}分</div>
      </div>

      <div class="base-td">
        <div :title="item.yiShouDaiKanNow +'/'+item.yiShouDaiKanAims">
          <span style="color: #ff7f00">{{item.yiShouDaiKanNow}}</span>
          <span>/</span>
          <span>{{item.yiShouDaiKanAims}}</span>
        </div>
        <div :title="item.yiShouDaiKanScore">+{{item.yiShouDaiKanScore}}分</div>
      </div>
      <div class="base-td">
        <div :title="item.ershouDaiKanNow +'/'+item.ershouDaiKanAims">
          <span style="color: #ff7f00">{{item.ershouDaiKanNow}}</span>
          <span>/</span>
          <span>{{item.ershouDaiKanAims}}</span>
        </div>
        <div :title="item.ershouDaiKanScore">+{{item.ershouDaiKanScore}}分</div>
      </div>
      <div class="base-td">
        <div :title="item.registerNow +'/'+item.registerAims">
          <span style="color: #ff7f00">{{item.registerNow}}</span>
          <span>/</span>
          <span>{{item.registerAims}}</span>
        </div>
        <div :title="item.registerScore">+{{item.registerScore}}分</div>
      </div>
      <div class="base-td">
        <div :title="item.duJiaWeiTuoNow +'/'+item.duJiaWeiTuoAims">
          <span style="color: #ff7f00">{{item.duJiaWeiTuoNow}}</span>
          <span>/</span>
          <span>{{item.duJiaWeiTuoAims}}</span>
        </div>
        <div :title="item.duJiaWeiTuoScore">+{{item.duJiaWeiTuoScore}}分</div>
      </div>
 
        <div class="base-td">
        <div :title="item.maiMaiIndependent +'/'+item.maiMaiIndependentAims">
          <span style="color: #ff7f00">{{item.maiMaiIndependent}}</span>
          <span>/</span>
          <span>{{item.maiMaiIndependentAims}}</span>
        </div>
        <div :title="item.maiMaiIndependentScore">+{{item.maiMaiIndependentScore}}分</div>
      </div>
        <div class="base-td">
        <div :title="item.hangNeiMaiMaiNow +'/'+item.hangNeiMaiMaiAims">
          <span style="color: #ff7f00">{{item.hangNeiMaiMaiNow}}</span>
          <span>/</span>
          <span>{{item.hangNeiMaiMaiAims}}</span>
        </div>
        <div :title="item.hangNeiMaiMaiScore">+{{item.hangNeiMaiMaiScore}}分</div>
      </div>
      <div class="base-td">
        <div :title="item.kuaHangMaiMaiNow +'/'+item.kuaHangMaiMaiAims" >
          <span style="color: #ff7f00">{{item.kuaHangMaiMaiNow}}</span>
          <span>/</span>
          <span>{{item.kuaHangMaiMaiAims}}</span>
        </div>
        <div :title="item.kuaHangMaiMaiScore">+{{item.kuaHangMaiMaiScore}}分</div>
      </div>

         <div class="base-td">
        <div :title="item.rentIndependent +'/'+item.rentIndependentAims">
          <span style="color: #ff7f00">{{item.rentIndependent}}</span>
          <span>/</span>
          <span>{{item.rentIndependentAims}}</span>
        </div>
        <div :title="item.rentIndependentScore">+{{item.rentIndependentScore}}分</div>
      </div>
    <div class="base-td">
        <div :title="item.hangNeiRentNow +'/'+item.hangNeiRentAims">
          <span style="color: #ff7f00">{{item.hangNeiRentNow}}</span>
          <span>/</span>
          <span>{{item.hangNeiRentAims}}</span>
        </div>
        <div :title="item.hangNeiRentScore">+{{item.hangNeiRentScore}}分</div>
      </div>
          <div class="base-td">
        <div :title="item.kuaHangRentNow +'/'+item.kuaHangRentAims">
          <span style="color: #ff7f00">{{item.kuaHangRentNow}}</span>
          <span>/</span>
          <span>{{item.kuaHangRentAims}}</span>
        </div>
        <div :title="item.kuaHangRentScore">+{{item.kuaHangRentScore}}分</div>
      </div>

      <div class="base-td">
        <div :title="item.yeWuYuanNow +'/'+item.yeWuYuanAims">
          <span style="color: #ff7f00">{{item.yeWuYuanNow}}</span>
          <span>/</span>
          <span>{{item.yeWuYuanAims}}</span>
        </div>
        <div :title="item.yeWuYuanScore">+{{item.yeWuYuanScore}}分</div>
      </div>
      <div class="base-td">
        <div :title="item.guanLiGangNow +'/'+item.guanLiGangAims">
          <span style="color: #ff7f00">{{item.guanLiGangNow}}</span>
          <span>/</span>
          <span>{{item.guanLiGangAims}}</span>
        </div>
        <div  :title="item.guanLiGangScore">+{{item.guanLiGangScore}}分</div>
      </div>
      <div class="op-td">
        <div :title="item.xingZhengNum">{{item.xingZhengNum}}</div>
        <div class="bottomBtn" @click.stop="showDetail(item.id)">
          <img src="../../../../assets/images/public/qualification.png" alt="">
          <div>查看</div>
        </div>
      </div>
    </div>

    <div class="no_dataBox" v-if="brokerCountList && brokerCountList.length <= 0">
      <div class="no-data">
        <img src="../../../../assets/images/public/nodate.png" alt="">
        <div class="no_dataSpan">暂时没有相关数据哦!</div>
      </div>
    </div>

  </div>
</template>

<script>
  import brokerCountDetail from "./brokerCountDetail";
  import {GetBrokerCountList, GetBrokerCountListRequest} from "../../../../net/KPIModule/GetKPICountNet";
  import {ErpCommon} from "../../../../utils/ErpCommon";
  import {GetLoginModel} from "../../../../model/LoginModel"

  export default {
    components: {
      brokerCountDetail,
    },

    props: {
      pageParam:{
        type: Object,
        default() {
          return {};
        }
      },
      nowTabValue: {
        type: [String,Number],
        default() {
          return '';
        }
      }
    },

    watch:{
      'pageParam.pageOffset':{
        handler:function () {
          // this.initData();
        },
        deep:true,
      }
    },

    data() {
      return {
        isShow: false,
        brokerCountList: null, // 列表数据
        userParam:{
           userId:1,
           month:'2020-04'
        } ,//点击详情获取的userId,月份
      }
    },

    mounted(){
      // this.initData();
    },

    methods: {
      async initData(){
        if (this.nowTabValue != 0) return ;
        console.log(this.pageParam.organizationId,'----查询参数');
        let data = await new GetBrokerCountList(new GetBrokerCountListRequest(this.pageParam)).send();
        this.brokerCountList = data.list;
        // 获取查询返回的参数
        let pageRetrunParam ={'total':data.total,'pageNum':data.pageNum,'pageSize':data.pageSize,'totalPage':data.totalPage};
        this.$emit('pageRetrunParam',pageRetrunParam);
      },
     //获取url上除hash外的地址
     getUrlWithoutHash(){
      let url = '';
      let hash = window.location.hash
      let href = window.location.href;
      url = href.replace(hash,'');
      return url
      },
      showDetail(userId) {
        console.log('1515151515');
        this.userParam.userId=userId;
        this.userParam.month=this.pageParam.month;
        // 若没有用户id，月份则不能查看详情
         if(!this.userParam.userId  || !this.userParam.month) return; 
         // 跳转当前路径的 项目详情
         // 获取clientKey
         let clientKey =  GetLoginModel.getClientKey();
         console.log(clientKey);
         let url = this.getUrlWithoutHash() + "#/KPICount/components/brokerCountDetail?userId="
         +this.userParam.userId
         +'&month='+this.userParam.month
         +'&clientKey='+ clientKey;
         new ErpCommon().openFullScreenWebview(url);
    }
      },
  }
</script>

<style scoped>
  /*修改滚动条样式*/
  div::-webkit-scrollbar {
    width: 0.08rem;
    height: 0.08rem;
  }
</style>
<style scoped lang="less">
  @baseHeight: 0.3rem;
  @thHeight: 0.6rem;
  @borderColor: #d8e2e7;
  @nameWidth: 0.98rem;

  .table-head {
    position:sticky;
    top:0;
    z-index:100;
    display: inline-flex;
    flex-direction: row;
    font-size: 0.12rem;
    font-weight: bold;
    color: #666666;
    -moz-user-select: none;
    -khtml-user-select: none;
    user-select: none;
    background: #ebf0f5;

    & > div {
      display: flex;
      align-items: center;
      justify-content: center;
      box-sizing: border-box;
    }

    .name {
      min-width: 0.98rem;
      height: @thHeight;
      border-right: 0.01rem @borderColor solid;
    }

    .personNum {
      min-width: 1.1rem;
      height: @thHeight;
      border-right: 0.01rem @borderColor solid;
    }

    .left{
      position: sticky;
      top:0 ;
      left: 0;
      background-color: #ebf0f5;
      z-index: 999;
    }

    .personOrder{
      position: sticky;
      top:0 ;
      left: 0.98rem;
      background-color: #ebf0f5;
      z-index: 999;
    }
    .dept{
      position: sticky;
      top: 0;
      // left: 0.98rem;
      left: 2.08rem;
      background-color: #ebf0f5;
      z-index: 999;
    }
 
     .job{
      position: sticky;
      top: 0;
      // left: 2.3rem;
      left: 3.4rem;
      background-color: #ebf0f5;
      z-index: 999;
    }
     .target{
      position: sticky;
      top: 0;
      // left: 3.3rem;
      left: 4.4rem;
      background-color: #ebf0f5;
      z-index: 999;
     }
     .total-score{
      position: sticky;
      top: 0;
      // left: 4.3rem;
      left: 5.4rem;
      background-color: #ebf0f5;
      z-index: 999;
     }


    .dept-name {
      min-width: 1.32rem;
      height: @thHeight;
      border-right: 0.01rem @borderColor solid;
    }

    .job-name {
      min-width: 1rem;
      height: @thHeight;
      border-right: 0.01rem @borderColor solid;
    }

    .all-num {
      min-width: 0.79rem;
      height: @thHeight;
      border-right: 0.01rem @borderColor solid;
    }

    .base-th {
      min-width: 1.1rem;
      height: @thHeight;
      border-right: 0.01rem @borderColor solid;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }

    .phone-call {
      min-width: 1.1rem;
      height: @thHeight;
      border-right: 0.01rem @borderColor solid;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      justify-content: center;

      .tips {
        font-size: 0.12rem;
        font-weight: normal;
        color: #666666;
      }
    }

    .row-merge {
      min-width: 2.2rem;
      height: @thHeight;
      border-right: 0.01rem @borderColor solid;
      display: flex;
      flex-direction: column;
      justify-content: center;

      .row-top {
        height: @baseHeight;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        border-bottom: 0.01rem @borderColor solid;
      }

      .row-bottom {
        height: @baseHeight;
        width: 100%;
        display: flex;
        flex-direction: row;

        :first-child {
          border-right: 0.01rem @borderColor solid;;
        }

        & > div {
          width: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }
    }

      .row-sale {
      min-width: 3.3rem;
      height: @thHeight;
      // border-right: 0.01rem @borderColor solid;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      justify-content: center;
      position: relative;
      &::after{
        content: '';
        position: absolute;
        right: 0;
        top: 0;
        width: 0.01rem;
        height: 100%;
        background: @borderColor;
      }

      .row-top {
        height: @baseHeight;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        border-bottom: 0.01rem @borderColor solid;
      }

      .row-bottom {
        height: @baseHeight;
        width: 100%;
        display: flex;
        flex-direction: row;
        &>div {
          width: 1.1rem;
          display: flex;
          justify-content: center;
          align-items: center;
          box-sizing: border-box;
          border-right: 0.01rem @borderColor solid;
          &:last-child{
            border-right: none;
          }
        }
      }
    }

    .op-th {
      min-width: 1.2rem;
      height: @thHeight;
      border-right: 0.01rem @borderColor solid;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
  }

  .table-content {
    display: inline-flex;
    flex-direction: row;
    font-size: 0.12rem;
    font-weight: normal;
    -moz-user-select: none;
    -khtml-user-select: none;
    user-select: none;
    // border-bottom: 1px @borderColor solid;

    & > div {
      display: flex;
      align-items: center;
      justify-content: center;
      box-sizing: border-box;
      height: @baseHeight;
      // border-bottom: 1px @borderColor solid;
      
      border-right: 0.01rem @borderColor solid;
      position: relative;
      &::after{
        content: '';
        position: absolute;
        width: 100%;
        height: 1px;
        left: 0;
        bottom: 0;
        background-color: @borderColor;
      }
    }

    .name {
      width: 0.98rem;
      display: flex;
      justify-content: flex-start;
      padding: 0 0.1rem;

      & > div {
        max-width: 0.88rem;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
      }
    }

    .person-Num {
      width: 1.1rem;
      display: flex;
      justify-content: flex-start;
      padding: 0 0.1rem;

      & > div {
        max-width: 0.9rem;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
      }
    }

    .dept-name {
      width: 1.32rem;
      display: flex;
      justify-content: flex-start;
      padding: 0 0.1rem;

      & > div {
        max-width: 1.22rem;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
      }
    }

    .job-name {
      width: 1rem;
      display: flex;
      justify-content: flex-start;
      padding: 0 0.1rem;

      & > div {
        max-width: 0.9rem;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
      }
    }

    .target-name {
      width: 1rem;
      display: flex;
      justify-content: flex-start;
      padding: 0 0.1rem;
      & > div {
        max-width: 0.9rem;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
      }
    }

    .all-num {
      color: #ff7f00;
      min-width: 0.79rem;
    }

    .name-left{
      position: sticky;
      left: 0;
      background: #ffffff;
      z-index: 10;
    }

    .personNum-left{
      position: sticky;
      left: 0.98rem;
      background: #ffffff;
      z-index: 10;
    }

    .dept-left{
      position: sticky;
      // left: 0.98rem;
      left: 2.08rem;
      background: #ffffff;
      z-index: 10;
    }
    .job-left{
      position: sticky;
      // left: 2.3rem;
      left: 3.4rem;
      background: #ffffff;
      z-index: 10;
    }
    .target-left{
      position: sticky;
      // left: 3.3rem;
      left: 4.4rem;
      background: #ffffff;
      z-index: 10;
    }
    .total-left{
      position: sticky;
      // left: 4.3rem;
      left: 5.4rem;
      background: #ffffff;
      z-index: 10;
    }

    .base-td {
      width: 1.1rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      box-sizing: border-box;
       & > div {
        max-width: 0.55rem;
        flex-grow: 1;
        text-align: center;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
      }
    }

    .op-td {
      min-width: 1.2rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-left: 0.15rem;
      padding-right: 0.12rem;
      box-sizing: border-box;
      border-right: 0.01rem @borderColor solid;

      .bottomBtn {
        box-sizing: border-box;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        cursor: pointer;

        & > img {
          width: 0.15rem;
          height: auto;
          margin-right: 0.04rem;
          margin-top: 0.04rem;
        }

        div {
          font-size: 0.12rem;
          line-height: 0.13rem;
          color: #259cf3;
        }
      }
    }
  }

  .table-content:hover {
    position: relative;
    background-color: #d9f1fe ;
    border-bottom: 0.01rem #73baee solid;

    &::after {
      content: ''; // 必须
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      border-top: 0.01rem #73baee solid;
      z-index: 99;
    }
   .name-left,.dept-left,.job-left,.target-left,.total-left,.personNum-left{
      background-color: #d9f1fe ;
   }

  }

  .no_dataBox {
    position: fixed;
    width: 100%;
    height: calc(~"100% - 1.4rem");
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #ffffff;

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
</style>
