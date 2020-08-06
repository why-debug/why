<template>
  <div class="report-no">
    <div class="title">
      编号：FHA125443000
    </div>
    <div class="approval_box">
      <div class="label">审批人</div>
      <div class="item" v-for="(item,index) in approvalList" :key="index">
        <div class="left_box">
          <div class="head_img"></div>
          <div class="vertical_line" v-if="index!=approvalList.length-1"></div>
        </div>
        <div class="right_box">
          <div>
            <div class="right_text">张曼满(BJ11562)</div>
            <div class="left_operation">发起</div>
          </div>
          <div>事业部B营销店(BJ1156)</div>
          <div>2019-09-21 15:32</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      approvalList:[1,2,3],//审批列表
    };
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
    color: #006797;
    font-size: 0.14rem;
    font-weight: bold;
  }
  .approval_box {
    width: 100%;
    height: 4.1rem;
    overflow-x: hidden;
    overflow-y: auto;
    & > div:nth-of-type(2) {
      margin-top: 0.19rem;
    }
    .label {
      text-indent: 0.1rem;
      font-size: 0.14rem;
      color: #444444;
      font-family: "MicrosoftYaHei";
      font-weight: bold;
    }
    .item {
      width: 2.3rem;
      height: 0.75rem;
      display: flex;
      .left_box {
        width: 0.38rem;
        height: 100%;
        margin-left: 0.1rem;
        .head_img {
          width: 0.38rem;
          height: 0.38rem;
          border-radius: 50%;
          background-color: #000;
          // background-image: url('');
          // background-repeat: no-repeat;
          // background-size: cover;
        }
        .vertical_line {
          width: 0.01rem;
          height: 0.37rem;
          background-color: #a9d0e6;
          margin-left: 0.185rem;
        }
      }
      .right_box {
        width: 1.7rem;
        height: 100%;
        margin-left: 0.09rem;
        box-sizing: border-box;
        & > div:nth-of-type(1) {
          width: 100%;
          height: 0.13rem;
          display: flex;
          .right_text {
            height: 0.13rem;
            font-size: 0.13rem;
            line-height: 0.13rem;
            color: #444444;
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
          }
          .left_operation {
            height: 0.13rem;
            font-family: "MicrosoftYaHei";
            font-size: 0.13rem;
            line-height: 0.13rem;
            color: #4acb56;
            margin-left: 0.11rem;
          }
        }
        & > div:nth-of-type(2) {
          width: 100%;
          height: 0.11rem;
          text-align: left;
          line-height: 0.11rem;
          color: #666666;
          font-size: 0.11rem;
          margin-top: 0.06rem;
        }
        & > div:nth-of-type(3) {
          width: 100%;
          height: 0.08rem;
          text-align: left;
          line-height: 0.08rem;
          color: #999999;
          font-size: 0.11rem;
          margin-top: 0.07rem;
        }
      }
    }
  }
}
</style>
