<template>
  <div class="basic">
    <div class="title">
      【租】<span>深城投-中心公馆1栋25层A02(SZX182680150)</span>
    </div>
    <div class="details_item space_item">
      <div class="details_item_i">
        <div class="item_title">
          <span>成</span>
          <span>交</span>
          <span>部</span>
          <span>门：</span>
        </div>
        <div class="item_content">南山-星海名城-SZ664</div>
      </div>
      <div class="details_item_i">
        <div class="item_title">
          <span>成</span>
          <span>交</span>
          <span>人：</span>
        </div>
        <div class="item_content">南山-星海名城-SZ664</div>
      </div>
      <div class="details_item_i">
        <div class="item_title"></div>
        <div class="item_content"></div>
      </div>
    </div>
    <div class="details_item space_item">
      <div class="details_item_i">
        <div class="item_title" style="width:0.85rem">
          <span>按</span>
          <span>揭</span>
          <span>部</span>
          <span>门：</span>
        </div>
        <div class="item_content">南山-星海名城-</div>
      </div>
      <div class="details_item_i">
        <div class="item_title">
          <span>按</span>
          <span>揭</span>
          <span>人：</span>
        </div>
        <div class="item_content">李小双</div>
      </div>
      <div class="details_item_i">
        <div class="item_title">
          <span>转</span>
          <span>款</span>
          <span>日</span>
          <span>期：</span>
        </div>
        <div class="item_content">2019-10-12</div>
      </div>
    </div>
    <div class="details_item space_item">
      <div class="details_item_i">
        <div class="item_title">
          <span>备</span>
          <span>注：</span>
        </div>
        <div class="item_content">这里时备注信息</div>
      </div>
    </div>
    <div class="title bill" v-if="approvalIndex">跨物业转款</div>
    <div class="cross_tranfer" v-if="approvalIndex">
      <div class="cross_box">
        <div>原物业：<span>龙威花园3栋龙隔离=院7D</span></div>
        <div>合计已收：<span>50000元</span></div>
      </div>
      <div class="cross_box">
        <div>转入物业：<span>龙威花园3栋龙隔离=院7D</span></div>
        <div>合计转入：<span>50000元</span></div>
      </div>
    </div>

    <div class="title bill" v-if="!approvalIndex">物业内转款</div>
    <div class="cross_tranfer" v-if="!approvalIndex">
      <div class="cross_box">
        <div>转出方：<span>客户房(王小龙)</span></div>
        <div>款项：<span>定金</span></div>
        <div>金额：<span>5000元</span></div>
      </div>
      <div class="cross_box">
        <div>转入方：<span>客户房(王小龙)</span></div>
        <div>款项：<span>开发商佣金</span></div>
        <div>金额：<span>5000元</span></div>
      </div>
    </div>

    <div class="title bill" v-if="approvalIndex">转出物业情况</div>
    <div class="list_tui" v-if="approvalIndex">
      <div class="list_title">
        <div class="guang">转出物业：<span>龙威花园3栋龙隔离=院7D </span></div>
      </div>
      <div class="list_title" v-if="approvalIndex">
        <div class="guang">成交编号：<span>SXZ190990108</span></div>
        <div class="dizhi">转出物业客户姓名：<span>李小萌</span></div>
      </div>
      <div class="list_title" v-if="approvalIndex">
        <div class="guang">转款用途：<span>-</span></div>
        <div class="dizhi">转款原因：<span>-</span></div>
      </div>
    </div>
    <div class="title bill" v-if="approvalIndex">转入物业情况</div>
    <div class="list_tui" v-if="approvalIndex">
      <div class="list_title">
        <div class="guang">转入物业：<span>龙威花园3栋龙隔离=院7D </span></div>
        <div class="dizhi">成交编号：<span>SXZ190990108</span></div>
      </div>
      <div class="list_title" v-if="approvalIndex">
        <div class="guang">转入方：<span>客户</span></div>
        <div class="dizhi">转入款项：<span>赎楼费</span></div>
      </div>
      <div class="list_title" v-if="approvalIndex">
        <div class="guang">转入金额：<span>5000元</span></div>
        <div class="dizhi">操作时间:<span>2019-12-31</span></div>
      </div>
      <div class="list_title" v-if="approvalIndex">
        <div class="guang">是否主体变更：<span>是</span></div>
        <div class="dizhi">变更时间:<span>2019-12-31</span></div>
      </div>
      <div class="list_title" v-if="approvalIndex">
        <div class="guang">变更后主体名称：<span>-</span></div>
      </div>
    </div>

    <div class="title preview">批量预览</div>
    <div class="preview_box">
      <div
        :class="{
          preview_item: true,
          last_item: index == 3,
          spacing: index >= 4,
        }"
        :style="{ background: item.bcg_color }"
        v-for="(item, index) in previewList"
        :key="index"
      >
        <div>{{ item.name }}</div>
        <div>{{ item.actualNo }}/{{ item.total }}</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  components: {},
  props: {
    //判断是跨物业还是同物业 0 跨物业 1 同物业 
    approvalIndex: {
      type: Number,
      default() {
        return 1;
      },
    },
  },
  data() {
    return {
      previewList: [
        { name: "ISF表", actualNo: "1", total: "2", bcg_color: "#13b981" },
        { name: "其他资料", actualNo: "0", total: "0", bcg_color: "#8592b2" },
        { name: "刷卡", actualNo: "0", total: "0", bcg_color: "#8592b2" },
        {
          name: "客户确认书",
          actualNo: "0",
          total: "0",
          bcg_color: "#8592b2 ",
        },
        { name: "成交确认书", actualNo: "1", total: "2", bcg_color: "#fb8f37" },
        { name: "认购书", actualNo: "1", total: "2", bcg_color: "#13b981" },
        { name: "身份证", actualNo: "1", total: "2", bcg_color: "#fb8f37" },
      ], //预览列表
    };
  },
};
</script>
<style lang="less" scoped>
.basic {
  width: 8.45rem;
  height: auto;
  .title {
    height: 0.3rem;
    font-family: MicrosoftYaHei-Bold;
    font-size: 0.16rem;
    font-weight: bold;
    font-stretch: normal;
    line-height: 0.3rem;
    letter-spacing: 0rem;
    color: #444444;
    margin: 0.4rem 0 0.21rem 0;
    & > span {
      color: #259cf3;
    }
  }
  .preview {
    color: #259cf3;
    margin-top: 0.4rem;
  }
  .preview_box {
    width: 7.33rem;
    height: auto;
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    margin-top: 0.21rem;
    margin-bottom: 1.44rem;
    .preview_item {
      min-width: 1.7rem;
      height: 0.36rem;
      margin-right: 0.17rem;
      border-radius: 0.02rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      color: #ffffff;
      & > div:nth-of-type(1) {
        margin-left: 0.1rem;
      }
      & > div:nth-of-type(2) {
        border-left: solid 0.01rem #ffffff;
        width: 0.5rem;
        height: 0.2rem;
        line-height: 0.2rem;
        text-indent: 0.3rem;
        margin-right: 0.1rem;
      }
    }
    .last_item {
      margin-right: 0 !important;
    }
    .spacing {
      margin-top: 0.1rem;
    }
  }
  .cross_tranfer {
    width: 8.5rem;
    height: 0.88rem;
    display: flex;
    justify-content: space-between;
    .cross_box {
      width: 4.2rem;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
      background-color: #fafafa;
      border: solid 0.01rem #ebebeb;
      & > div {
        display: flex;
        align-items: center;
        width: 100%;
        height: auto;
        text-indent: 0.39rem;
        font-size: 0.14rem;
        color: #999999;
        & > span {
          color: #444444;
          text-indent: 0.13rem;
        }
      }
    }
  }
  .list_tui {
    width: 8.5rem;
    height: auto;
    margin-top: 0.05rem;
    background-color: #ffffff;
    border-radius: 0.02rem;
    margin-bottom: 0.1rem;
    border: solid 0.01rem #ebebeb;
    .list_title {
      width: 8.5rem;
      height: 0.5rem;
      background-color: #fafafa;
      line-height: 0.5rem;
      border-radius: 0.02rem;
      display: flex;
      font-family: MicrosoftYaHei;
      font-size: 0.13rem;
      font-weight: normal;
      font-stretch: normal;
      line-height: 0.48rem;
      letter-spacing: 0rem;
      color: #999999;
      box-sizing: border-box;
      & > div {
        & > span {
          display: inline-flex;
          color: #444444;
          text-indent: 0.1rem;
        }
      }
      .guang {
        width: 3rem;
        text-indent: 0.22rem;
      }
      .bill {
        & > span {
          color: #259cf3;
        }
      }
      .zhuce {
        width: 3rem;
      }
      .daili {
        width: 2.1rem;
      }
      .dizhi {
        width: 3rem;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
      }
      .city {
        width: 1.51rem;
      }
      .wenjian {
        width: 4.08rem;
        text-indent: 0.22rem;
      }
      .fenshu {
        width: 1.67rem;
      }
      .yeshu {
        width: 1.5rem;
      }
    }
    .list_item {
      width: 7.28rem;
      height: 0.5rem;
      border: solid 0.01rem #ebebeb;
      border-top: none;
      line-height: 0.5rem;
      border-radius: 0.02rem;
      display: flex;
      align-items: center;
      font-family: MicrosoftYaHei;
      font-size: 0.14rem;
      font-weight: normal;
      font-stretch: normal;
      letter-spacing: 0rem;
      box-sizing: border-box;
      color: #444444;
      .guang {
        width: 1.9rem;
        text-indent: 0.22rem;
      }
      .zhuce {
        width: 2.1rem;
      }
      .daili {
        width: 2.1rem;
      }
      .dizhi {
        width: 1.62rem;
      }
      .city {
        width: 1.51rem;
      }
      .wenjian {
        width: 4.08rem;
        text-indent: 0.22rem;
      }
      .fenshu {
        width: 1.67rem;
      }
      .yeshu {
        width: 1.5rem;
      }
    }
  }
  .space_item {
    margin-bottom: 0.05rem;
  }
  .details_item {
    width: 100%;
    height: 0.3rem;
    display: flex;
    align-items: center;
    .details_item_i {
      width: 3.34rem;
      height: 0.3rem;
      display: flex;
      align-items: center;
      .item_title {
        width: 0.75rem;
        height: 0.3rem;
        font-family: MicrosoftYaHei;
        font-size: 0.14rem;
        font-weight: normal;
        font-stretch: normal;
        line-height: 0.3rem;
        letter-spacing: 0rem;
        color: #999999;
        display: flex;
        justify-content: space-between;
      }
      .item_content {
        height: 0.3rem;
        font-family: MicrosoftYaHei;
        font-size: 0.14rem;
        font-weight: normal;
        font-stretch: normal;
        line-height: 0.3rem;
        letter-spacing: 0rem;
        color: #444444;
      }
    }
  }
  .details_item_i {
    width: 100%;
    height: 0.3rem;
    display: flex;
    align-items: center;
    .item_j {
      width: 50%;
      height: 0.3rem;
      display: flex;
      align-items: center;
      .item_j_title {
        height: 0.3rem;
        font-family: MicrosoftYaHei;
        font-size: 0.14rem;
        font-weight: normal;
        font-stretch: normal;
        line-height: 0.3rem;
        letter-spacing: 0rem;
        color: #999999;
      }
      .item_j_title_a {
        width: 0.84rem;
        text-align: right;
        height: 0.3rem;
        font-family: MicrosoftYaHei;
        font-size: 0.14rem;
        font-weight: normal;
        font-stretch: normal;
        line-height: 0.3rem;
        letter-spacing: 0rem;
        color: #999999;
      }
      .item_j_content {
        height: 0.3rem;
        font-family: MicrosoftYaHei;
        font-size: 0.14rem;
        font-weight: normal;
        font-stretch: normal;
        line-height: 0.3rem;
        letter-spacing: 0rem;
        color: #444444;
      }
    }
  }
  .details_item_j {
    width: 100%;
    height: 0.3rem;
    display: flex;
    align-items: center;
    .item_j {
      width: 100%;
      height: 0.3rem;
      display: flex;
      align-items: center;
      .item_j_title {
        height: 0.3rem;
        font-family: MicrosoftYaHei;
        font-size: 0.14rem;
        font-weight: normal;
        font-stretch: normal;
        line-height: 0.3rem;
        letter-spacing: 0rem;
        color: #999999;
      }
      .item_j_content {
        height: 0.3rem;
        font-family: MicrosoftYaHei;
        font-size: 0.14rem;
        font-weight: normal;
        font-stretch: normal;
        line-height: 0.3rem;
        letter-spacing: 0rem;
        color: #444444;
      }
    }
  }
}

.nomust,
.must {
  display: flex;
  height: 0.3rem;
  line-height: 0.3rem;
  margin-right: 0.06rem;
}

.must::after {
  content: "* ";
  width: 0.02rem;
  height: 0.06rem;
  font-family: SimSun;
  font-size: 0.12rem;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #ff5a1f;
  margin-right: 0.08rem;
  line-height: 0.3rem;
}
.nomust::after {
  content: "*";
  visibility: hidden;
  width: 0.02rem;
  height: 0.06rem;
  font-family: SimSun;
  font-size: 0.12rem;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #ff5a1f;
  margin-right: 0.08rem;
}
</style>
