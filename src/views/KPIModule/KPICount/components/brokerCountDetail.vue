<template>
  <div class="detail-box">
    <div class="top">
      <div class="close" @click.stop="close()"></div>
    </div>
    <div class="content">
      <div class="title">企业员工资质信息</div>
      <div class="info">
        <div class="name">姓名：{{itemData.name}}</div>
        <div class="job">岗位：{{itemData.job}}</div>
        <div class="name">所在组织：{{itemData.groupName}}</div>
      </div>
      <div class="broker-star-license">
        <div class="broker-title">经纪人星级牌照</div>
        <div class="desc">
          <div>{{itemData.brokerStarLicense}}</div>
          <div class="fen" :style="{color:itemData.brokerStarLicenseNum>0?'#ff7f00':itemData.brokerStarLicenseNum==0?'#666666':'#08a300'}">
          {{itemData.brokerStarLicenseNum | judge}}分
          </div>
        </div>
      </div>
      <div class="other-items">
        <div class="other-items-title">全国经纪人证</div>
        <div class="other-items-desc">
          <div>{{itemData.jingJiRenZheng}}</div>
          <div class="fen" :style="{color:itemData.jingJiRenZhengNum>0?'#ff7f00':itemData.jingJiRenZhengNum==0?'#666666':'#08a300'}">
          {{itemData.jingJiRenZhengNum  | judge}}分
          </div>
        </div>
      </div>
      <div class="other-items">
        <div class="other-items-title">继续教育</div>
        <div class="other-items-desc">
          <div>{{itemData.jiXuJiaoYu}}</div>
           <div class="fen" :style="{color:itemData.jiXuJiaoYuNum>0?'#ff7f00':itemData.jiXuJiaoYuNum==0?'#666666':'#08a300'}">
           {{itemData.jiXuJiaoYuNum  | judge}}分
           </div>
        </div>
      </div>
      <div class="other-items">
        <div class="other-items-title">
          <div class="label">
            <div>年</div>
            <div>资</div>
          </div>
        </div>
        <div class="other-items-desc">
          <div>{{itemData.nianZhi}}</div>
          <div class="fen" :style="{color:itemData.nianZhiNum>0?'#ff7f00':itemData.nianZhiNum==0?'#666666':'#08a300'}">
          {{itemData.nianZhiNum | judge}}分
          </div>
        </div>
      </div>
      <div class="other-items">
        <div class="other-items-title">
          <div class="label">
            <div>学</div>
            <div>历</div>
          </div>
        </div>
        <div class="other-items-desc">
          <div>{{itemData.xueLi}}</div>
          <div class="fen" :style="{color:itemData.xueLiNum>0?'#ff7f00':itemData.xueLiNum==0?'#666666':'#08a300'}">
          {{itemData.xueLiNum  | judge}}分
          </div>
        </div>
      </div>
      <div class="other-items">
        <div class="other-items-title">
          <div class="label">
            <div>形</div>
            <div>象</div>
          </div>
        </div>
        <div class="other-items-desc">
          <div>{{itemData.xingXiang}}</div>
            <div class="fen" :style="{color:itemData.xingXiangNum>0?'#ff7f00':itemData.xingXiangNum==0?'#666666':'#08a300'}">
            {{itemData.xingXiangNum  | judge}}分
            </div>
        </div>
      </div>
      <div class="other-items">
        <div class="other-items-title">
          <div class="label">
            <div>考</div>
            <div>勤</div>
          </div>
        </div>
        <div class="other-items-desc">
          <div>{{itemData.kaoQing}}</div>
          <div class="fen" :style="{color:itemData.kaoQingNum>0?'#ff7f00':itemData.kaoQingNum==0?'#666666':'#08a300'}">
          {{itemData.kaoQingNum  | judge}}分
          </div>
        </div>
      </div>
      <div class="other-items">
        <div class="other-items-title">
          <div class="label">
            <div>培</div>
            <div>训</div>
          </div>
        </div>
        <div class="other-items-desc">
          <div>{{itemData.zaoTui}}</div>
          <div class="fen" :style="{color:itemData.zaoTuiNum>0?'#ff7f00':itemData.zaoTuiNum==0?'#666666':'#08a300'}">
          {{itemData.zaoTuiNum | judge}}分
          </div>
        </div>
      </div>
      <div class="other-items">
        <div class="other-items-title">
          <div class="label">
            <div>培</div>
            <div>训</div>
          </div>
        </div>
        <div class="other-items-desc">
          <div>{{itemData.kaoShi}}</div>
              <div class="fen" :style="{color:itemData.kaoShiNum>0?'#ff7f00':itemData.kaoShiNum==0?'#666666':'#08a300'}">
              {{itemData.kaoShiNum | judge}}分
              </div>
        </div>
      </div>
      <div class="other-items">
        <div class="other-items-title">红黄蓝制度</div>
        <div class="other-items-desc">
          <div :style="{color:itemData.zhiDuFlag?'#FF0000':'#444444'}">{{itemData.zhiDu}}</div>
          <div v-if="!itemData.zhiDuFlag" class="fen" :style="{color:itemData.zhiDuNum>0?'#ff7f00':itemData.zhiDuNum==0?'#666666':'#08a300'}">
          {{itemData.zhiDuNum | judge }}分
          </div>
        </div>
      </div>
      <div class="other-items remove-border" style="height: 0.89rem;padding: 0.47rem 0.43rem 0.27rem 0.43rem;">
        <div class="other-items-title"></div>
        <div class="other-items-desc">
          <div></div>
          <div class="fen"></div>
        </div>
      </div>
      <div class="other-items remove-border">
        <div class="other-items-title"></div>
        <div class="other-items-desc">
          <div></div>
          <div class="fen"></div>
        </div>
      </div>
      <div class="total-score">
        <div class="total-score-title">实得总分：</div>
        <div class="total-score-num">{{itemData.allNum}}分</div>
      </div>
    </div>
  </div>
</template>

<script>
  import {GetBrokerCountDetail, GetBrokerCountDetailRequest} from "../../../../net/KPIModule/GetKPICountNet";
  import {ErpCommon} from "../../../../utils/ErpCommon";

  export default {
    props: {
      id: {
        type: Number | String,
        default() {
          return 1;
        }
      },
       userParam:{
        type: Object,
        default() {
          return {
            userId:1,
            month:'2020-04'
          };
        }
      }
    },

    data() {
      return {
        itemData: {},
        systemFlag:false //红蓝制度描述颜色判断
      }
    },
    mounted() {
      console.log(this.$route.query);
      console.log(this.$route.query.userId,'11111111111111');
      this.initData(this.$route.query);
    },

    methods: {
      async initData(userParam) {
        let data = await new GetBrokerCountDetail(new GetBrokerCountDetailRequest(userParam)).send();
        this.itemData = data.detail;
        console.log(this.itemData,'--详情接口数--')
        console.log(this.userParam,'用户参数');
      },
      close() {
        new ErpCommon().closeCurrentWebview();
      }
    },
    filters:{
      judge(msg){
       if(msg>0){
         return '+'+msg;
       }else{
         return msg;
       }
      }
    }
  }
</script>

<style scoped lang="less">
  @contentLeftWidth: 1.78rem;

  .detail-box {
    position: absolute;
    font-size: 0.12rem;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 100%;
    z-index: 200;
    background: #eff4f9;
    font-family: MicrosoftYaHei;
    .top {
      width: 100%;
      height: 0.34rem;
      box-sizing: border-box;
      background: #ffffff;

      .close {
        position: absolute;
        top: 0.04rem;
        right: 0;
        width: 0.26rem;
        height: 0.26rem;
        background-repeat: no-repeat;
        background-size: 0.1rem 0.1rem;
        background-position: center;
        cursor: pointer;
        z-index: 99;
        margin-right: 0.05rem;
        background-image: url('../../../../assets/images/public/close_200.png');
      }
    }

    .content {
      margin: 0.2rem 2.33rem 0.38rem 2.33rem;
      background: #ffffff;
      border-radius: 0.02rem;
      padding: 0 0.51rem;
      box-sizing: border-box;
      height: calc(~"100% - 0.92rem");
      overflow: auto;

      .title {
        font-size: 0.24rem;
        line-height: 0.3rem;
        color: #444444;
        padding-top: 0.53rem;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .info {
        font-size: 0.16rem;
        font-weight: bold;
        color: #444444;
        padding: 0.49rem 0.43rem 0.21rem 0.43rem;
        border-bottom: solid 0.01rem #d8e2e7;;
        box-sizing: border-box;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
      }

      .broker-star-license {
        display: flex;
        flex-direction: row;
        height: 0.65rem;
        box-sizing: border-box;
        padding: 0.29rem 0.43rem 0.17rem 0.43rem;
        font-size: 0.14rem;
        color: #444444;
        border-bottom: dashed 0.01rem #d8e2e7;

        .broker-title {
          width: @contentLeftWidth;
          font-weight: bold;
        }

        .desc {
          flex: 1;
          display: flex;
          flex-direction: row;
          justify-content: space-between;

          .fen {
            font-size: 0.16rem;
            color: #ff7f00;
          }
        }
      }

      .remove-border{
        border-bottom:none !important;
      }
      .other-items {
        display: flex;
        flex-direction: row;
        align-items: center;
        height: 0.5rem;
        box-sizing: border-box;
        padding: 0 0.43rem;
        font-size: 0.14rem;
        color: #444444;
        border-bottom: dashed 0.01rem #d8e2e7;

        .other-items-title {
          width: @contentLeftWidth;
          font-weight: bold;

          .label {
            width: 0.6rem;
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
            -webkit-box-pack: justify;
            -ms-flex-pack: justify;
            justify-content: space-between;
            color: #444444;
          }
        }

        .other-items-desc {
          flex: 1;
          display: flex;
          flex-direction: row;
          justify-content: space-between;

          .fen {
            font-size: 0.16rem;
            color: #ff7f00;
          }
        }
      }
    }

    .total-score {
      height: 1.49rem;
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
      align-items: center;
      padding: 0 0.43rem;
      box-sizing: border-box;

      .total-score-title {
        font-size: 0.14rem;
        color: #444444;
      }

      .total-score-num {
        font-size: 0.2rem;
        color: #ff7f00;
      }
    }

  }
</style>
