<template>
  <div class="report-no">
    <div class="title">
      认购信息
    </div>
    <div class="content">
      <div class="item">
        <div>临定日期：</div>
        <div class="normal">
         {{detailInfo.provisionalDate || '--'}}
        </div>
      </div>
      <div class="item">
        <div>临定金：</div>
        <div class="normal">
         {{detailInfo.provisionalMoney || '--'}}
        </div>
      </div>
      <div class="item">
        <div>认购总价：</div>
        <div class="normal">
          {{detailInfo.subscriptionPrice || '--'}}
        </div>
      </div>
      <div class="item">
        <div>折扣描述：</div>
        <div class="normal">
        {{detailInfo.discountDescription || '--'}}
        </div>
      </div>
      <div class="item">
        <div>备注：</div>
        <div class="normal">
         {{detailInfo.subscriptionRemark || '--'}}
        </div>
      </div>
     
      </div>
    <div class="bottom-btn">
      <!-- <div class="btn-1">电子合同</div>
      <div class="btn-3">审核</div> -->
      <div class="btn-2">编辑</div>
    </div>
  </div>
</template>

<script>
import { IntentionDetailInfo } from "../../../../../net/newHouseIntentionSheet/intentionSheet/intentionDetail";
export default {
  data() {
    return {
    };
  },
  props:{
    detailInfo: {
      type: Object,
      default() {
        return new IntentionDetailInfo();
      },
    },
  },
  methods:{
    
  },
  filters: {
    formatTime(val) {
      if (val != "" && val != undefined) {
        return val.split(" ")[0];
      } else {
        return "--";
      }
    },
  },
};
</script>

<style lang="less" scoped>
.report-no {
  width: 100%;
  height: auto;
  & > .title {
    width: 100%;
    height: 0.5rem;
    line-height: 0.5rem;
    text-indent: 0.1rem;
    color: #444444;
    font-size: 0.14rem;
    font-weight: bold;
  }
  & > .content {
    width: 100%;
    height: 3.9rem;
    overflow-x: hidden;
    overflow-y: auto;
    padding: 0 0.1rem;
    box-sizing: border-box;
    & > .item {
      line-height: 0.3rem;
      display: flex;
      & > div {
        &:nth-child(1) {
          min-width: 0.4rem;
          color: #999999;
          font-size: 0.12rem;
        }
        &:nth-child(2) {
          width: auto;
          color: #444444;
          font-size: 0.12rem;
          word-break: break-all;
        }
      }
    }
  }
  & > .bottom-btn {
    width: 100%;
    height: auto;
    margin-top: 0.1rem;
    display: flex;
    justify-content: flex-end;
    & > div {
      width: 0.6rem;
      height: 0.3rem;
      line-height: 0.3rem;
      text-align: center;
      border-radius: 0.02rem;
      opacity: 1;
      color: #ffffff;
      font-size: 0.13rem;
      cursor: pointer;
      &:hover {
        opacity: 0.8;
      }
      &.btn-1 {
        background-image: linear-gradient(0deg, #eff1f4 0%, #ffffff 100%),
          linear-gradient(#5fc41b, #5fc41b);
        background-blend-mode: normal, normal;
        border: solid 0.01rem #bdc6cf;
        color: #666666;
      }
      &.btn-2 {
        background-image: linear-gradient(0deg, #64c12b 0%, #72cd3b 100%),
          linear-gradient(#5fc41b, #5fc41b);
        background-blend-mode: normal, normal;
        box-shadow: 0rem 0.01rem 0.01rem 0rem rgba(0, 0, 0, 0.75),
          inset 0rem 0.01rem 0rem 0rem rgba(255, 255, 255, 0.2);
        border: solid 0.01rem #45a802;
        margin-right: 0.14rem;
      }
      &.btn-3 {
        background-image: linear-gradient(0deg, #449aff 0%, #50a7ff 100%),
          linear-gradient(#5fc41b, #5fc41b);
        background-blend-mode: normal, normal;
        box-shadow: 0rem 0.01rem 0.01rem 0rem rgba(0, 0, 0, 0.75),
          inset 0rem 0.01rem 0rem 0rem rgba(255, 255, 255, 0.2);
        border: solid 0.01rem #3d81ff;
      }
    }
  }
}
</style>
