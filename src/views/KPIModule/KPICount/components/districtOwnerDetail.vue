<!--区经统计详情-->
<template>
  <div class="detail-box">
    <div class="top">
      <div class="info">
        <span class="name">{{item.name}}- 区经KPI详情</span>
        <span class="score">分行均分<span style="color: #ff7f00">100</span>分</span>
      </div>
      <div class="op">
        <!--收支平衡导入-->
        <div class="export-excel" @click.stop="szphExport">
          <img src="../../../../assets/images/projectAgentInfo/contract/u_Export.png" alt="">
          <div>收支平衡导入</div>
        </div>

        <!--导出-->
        <div class="export-excel" @click.stop="exportExcel" style="margin-right: 0.3rem">
          <img src="../../../../assets/images/projectAgentInfo/contract/u_Export.png" alt="">
          <div>导出</div>
        </div>

        <div class="close" @click.stop="close()"></div>
      </div>
    </div>

    <div class="content-box">
      <div class="table-head">
        <div class="dept-name">部门</div>
        <div class="all-num">实时总分</div>
        <div class="base-th">
          <div>人均业绩在收支</div>
          <div>平衡的比例得分</div>
        </div>
        <div class="row-merge">
          <div class="row-top">人均有效房源录入系统(个)</div>
          <div class="row-bottom">
            <div>人均有效房源</div>
            <div>录入盘源</div>
          </div>
        </div>
        <div class="base-th">
          <div>人均客户资源录</div>
          <div>入系统(个)</div>
        </div>
        <div class="row-merge">
          <div class="row-top">人均产品转介(个)</div>
          <div class="row-bottom">
            <div>转介(人均)</div>
            <div>转介并成交(人均)</div>
          </div>
        </div>
        <div class="base-th">人均服务好评(次)</div>
        <div class="base-th" style="width: 1.17rem">
          <div>人均邀请使用小程序</div>
          <div>或加入美联会(次)</div>
        </div>
        <div class="base-th">
          <div>分行执行总行</div>
          <div>制定的工作规则</div>
        </div>
        <div class="base-th">
          <div>人均知识库</div>
          <div>分享文章(个)</div>
        </div>
        <div class="base-th">
          <div>业务员平均提供</div>
          <div>合理化建议(个)</div>
        </div>
        <div class="base-th">
          <div>分行人数</div>
          <div>开单比例</div>
        </div>
        <div class="base-th">
          <div>分行人员</div>
          <div>稳定性</div>
        </div>
      </div>
      <div class="table-content" v-for="(item,index) in listData" :key="index">
        <div class="dept-name">
          <div>{{item.deptName}}</div>
          <img @click.stop="workScore(item)" src="../../../../assets/images/projectAgentInfo/contract/u_Export.png"
               alt="">
        </div>
        <div class="all-num">{{item.allNum}}</div>
        <div class="base-td">
          <div>
            <span style="color: #ff7f00">{{item.renJunYeJiNow}}</span>
            <span>/</span>
            <span>{{item.renJunYeJiAims}}</span>
          </div>
          <div>+{{item.renJunYeJiScore}}分</div>
        </div>
        <div class="base-td">
          <div>
            <span style="color: #ff7f00">{{item.activeListingsNow}}</span>
            <span>/</span>
            <span>{{item.activeListingsAims}}</span>
          </div>
          <div>+{{item.activeListingsScore}}分</div>
        </div>
        <div class="base-td">
          <div>
            <span style="color: #ff7f00">{{item.panYuanNow}}</span>
            <span>/</span>
            <span>{{item.panYuanAims}}</span>
          </div>
          <div>+{{item.panYuanScore}}分</div>
        </div>
        <div class="base-td">
          <div>
            <span style="color: #ff7f00">{{item.keHuSourceNow}}</span>
            <span>/</span>
            <span>{{item.keHuSourceAims}}</span>
          </div>
          <div>+{{item.keHuSourceScore}}分</div>
        </div>
        <div class="base-td">
          <div>
            <span style="color: #ff7f00">{{item.zhuanJieNow}}</span>
            <span>/</span>
            <span>{{item.zhuanJieAims}}</span>
          </div>
          <div>+{{item.zhuanJieScore}}分</div>
        </div>
        <div class="base-td">
          <div>
            <span style="color: #ff7f00">{{item.zhuanJieAndChengJiaoNow}}</span>
            <span>/</span>
            <span>{{item.zhuanJieAndChengJiaoAims}}</span>
          </div>
          <div>+{{item.zhuanJieAndChengJiaoScore}}分</div>
        </div>
        <div class="base-td">
          <div>
            <span style="color: #ff7f00">{{item.fuWuHaoPingNow}}</span>
            <span>/</span>
            <span>{{item.fuWuHaoPingAims}}</span>
          </div>
          <div>+{{item.fuWuHaoPingScore}}分</div>
        </div>
        <div class="base-td" style="width: 1.17rem">
          <div>
            <span style="color: #ff7f00">{{item.useAppletNow}}</span>
            <span>/</span>
            <span>{{item.useAppletAims}}</span>
          </div>
          <div>+{{item.useAppletScore}}分</div>
        </div>
        <div class="base-td">
          <div>
            <span style="color: #ff7f00">{{item.workingRulesNow}}</span>
            <span>/</span>
            <span>{{item.workingRulesAims}}</span>
          </div>
          <div>+{{item.workingRulesScore}}分</div>
        </div>
        <div class="base-td">
          <div>
            <span style="color: #ff7f00">{{item.articleNow}}</span>
            <span>/</span>
            <span>{{item.articleAims}}</span>
          </div>
          <div>+{{item.articleScore}}分</div>
        </div>
        <div class="base-td">
          <div>
            <span style="color: #ff7f00">{{item.suggestNow}}</span>
            <span>/</span>
            <span>{{item.suggestAims}}</span>
          </div>
          <div>+{{item.suggestScore}}分</div>
        </div>
        <div class="base-td">
          <div>
            <span style="color: #ff7f00">{{item.billingRatioNow}}</span>
            <span>/</span>
            <span>{{item.billingRatioAims}}</span>
          </div>
          <div>+{{item.billingRatioScore}}分</div>
        </div>
        <div class="base-td">
          <div>
            <span style="color: #ff7f00">{{item.stabilityNow}}</span>
            <span>/</span>
            <span>{{item.stabilityAims}}</span>
          </div>
          <div>+{{item.stabilityScore}}分</div>
        </div>
      </div>
    </div>

    <!--工作分数调整弹窗-->
    <workScoreEditPopup
      :isShow.sync="workScorePopup.isShow"
      :item="workScoreEditPram"
      v-if="workScorePopup.isShow">
    </workScoreEditPopup>

    <!--收支平衡导入弹窗-->
    <breakEvenPopup
      :isShow.sync="breakEvenPopup.isShow"
      v-if="breakEvenPopup.isShow">
    </breakEvenPopup>
  </div>
</template>

<script>
  import {
    GetDistrictOwnerDetail, GetDistrictOwnerDetailRequest,
  } from "../../../../net/KPIModule/GetKPICountNet";
  import {ErpCommon} from "../../../../utils/ErpCommon";
  import branchManagerList from "./branchManagerList";
  import workScoreEditPopup from "./workScoreEditPopup";
  import breakEvenPopup from "./breakEvenPopup";

  export default {
    components: {
      branchManagerList,
      workScoreEditPopup,
      breakEvenPopup
    },

    props: {
      item: {
        type: Array | Object,
        default() {
          return {};
        }
      }
    },

    data() {
      return {
        itemData: {},
        listData: [], // 列表数据

        // 收支平衡弹窗显示
        breakEvenPopup: {
          isShow: false,
        },

        // 工作积分调整弹窗
        workScorePopup: {
          isShow: false,
        },

        workScoreEditPram: {},
      }
    },

    mounted() {
      this.initData();
    },

    methods: {
      async initData() {
        let data = await new GetDistrictOwnerDetail(new GetDistrictOwnerDetailRequest()).send();
        this.listData = data.list;
        console.log(data,'--区经详情--');
      },
      close() {
        this.$emit('update:isShow', false);
      },
      workScore(item) {
        this.workScoreEditPram = item;
        this.workScorePopup.isShow = true;
      },
      exportExcel() {
        new ErpCommon().toast('对接导出');
      },
      szphExport() {
        this.breakEvenPopup.isShow = true;
      },
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
    background: #ffffff;

    .top {
      width: 100%;
      height: 0.34rem;
      box-sizing: border-box;
      background: #f6f6f6;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 0.01rem #d1d1d1 solid;
      box-shadow: 0.01rem 0 0.02rem 0.01rem rgba(209, 209, 209, 0.5);

      .info {
        font-size: 0.12rem;
        margin-left: 0.2rem;

        .name {
          font-weight: bold;
          color: #666666;
          margin-right: 0.2rem;
        }

        .score {
          color: #666666;
        }
      }

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
        background-image: url('../../../../assets/images/public/close_200.png');
      }

      .op {
        display: flex;

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
            width: 0.12rem;
            height: 0.12rem;
            margin-right: 0.05rem;
          }

          div {
            font-size: 0.13rem;
            color: #259cf3;
            -moz-user-select: none;
            -khtml-user-select: none;
            user-select: none;
          }
        }
      }
    }

    .content-box {
      width: 100%;
      height: calc(~"100% - 0.66rem");
      box-sizing: border-box;
      overflow: auto;

      .table-head {
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
      }

      .table-content {
        display: inline-flex;
        flex-direction: row;
        font-size: 0.12rem;
        font-weight: normal;
        -moz-user-select: none;
        -khtml-user-select: none;
        user-select: none;
        border-bottom: 0.01rem @borderColor solid;

        & > div {
          display: flex;
          align-items: center;
          justify-content: center;
          box-sizing: border-box;
          height: @baseHeight;
          border-right: 0.01rem @borderColor solid;
        }

        .name {
          min-width: 0.98rem;

          & > div {
            max-width: 0.9rem;
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
          }
        }

        .dept-name {
          min-width: 1.32rem;

          & > div {
            max-width: 1rem;
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
          }

          & > img {
            margin-left: 0.07rem;
            width: 0.13rem;
            height: 0.13rem;
            cursor: pointer;
            display: none;
          }
        }

        .job-name {
          min-width: 1rem;

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

        .base-td {
          min-width: 1.1rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 0.19rem;
          box-sizing: border-box;
        }
      }

      .table-content:hover {
        position: relative;
        background-color: #d9f1fe;
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
      }

      .table-content:hover .dept-name > img {
        display: block;
      }
    }
  }
</style>
