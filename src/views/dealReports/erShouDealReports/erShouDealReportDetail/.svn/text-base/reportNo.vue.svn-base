<template>
  <div class="report-no">
    <div class="title">编号：GHKJGKJKKKK</div>
    <div class="content">
      <div class="item" v-for="(item, index) in reportNoList" :key="index">
        <div>{{item.text}}</div>
        <div :class="item.value2 ? 'not-normal' : 'normal'">
          <span v-if="item.value2">{{item.value2}}<br></span>
          {{item.value1}}
        </div>
      </div>
    </div>
    <div class="bottom-btn">
      <div class="btn-1">电子合同</div>
      <div class="btn-2">编辑</div>
      <div class="btn-3">审核</div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      reportNoList: [
        { text: '合同编号：', value1: 'GJHGJKGJHG', value2: '房屋求购委托书', key: '' },
        { text: '第一笔定金：', value1: '1231', key: '' },
        { text: '第一次交付时间：', value1: '2020-02-02', key: '' },
        { text: '第二笔定金：', value1: '1231', key: '' },
        { text: '第二次交付时间：', value1: '2020-02-02', key: '' },
        { text: '剩余楼款：', value1: '1231', key: '' },
        { text: '剩余楼款交付时间：', value1: '2020-02-02', key: '' },
        { text: '交楼押金：', value1: '1231', key: '' },
        { text: '交楼押金交付时间：', value1: '2020-02-02', key: '' },
        { text: '业主佣金：', value1: '1000元', key: '' },
        { text: '客户佣金：', value1: '1000元', key: '' },
        { text: '业主必要费用：', value1: '1000元', key: '' },
        { text: '客户必要费用：', value1: '1000元', key: '' },
        { text: '备注：', value1: 'abfsadfsdfsafsafsadfjhgkjhggkj暗访北京哈飞北京安徽发空间划分开发和拉横幅雷克萨恢复了看见爱上发卡量减少复活卡喀什奋达科技拉丝粉拉克丝', key: '' }
      ]
    }
  }
}
</script>

<style lang="less" scoped>
.report-no {
  width: 100%;
  height: auto;
  &>.title {
    width: 100%;
    height: 0.5rem;
    line-height: 0.5rem;
    text-indent: 0.1rem;
    color: #006797;
    font-size: 0.14rem;
  }
  &>.content {
    width: 100%;
    height: 4.1rem;
    overflow-x: hidden;
    overflow-y: auto;
    padding: 0 0.1rem;
    box-sizing: border-box;
    &>.item {
      line-height: 0.3rem;
      display: flex;
      &>div {
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
  &>.bottom-btn {
    width: 100%;
    height: auto;
    margin-top: 0.1rem;
    display: flex;
    justify-content: space-around;
    &>div {
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
        background-image: linear-gradient(0deg, #eff1f4 0%, #ffffff 100%), linear-gradient(#5fc41b, #5fc41b);
        background-blend-mode: normal, normal;
        border: solid 0.01rem #bdc6cf;
        color: #666666;
      }
      &.btn-2 {
        background-image: linear-gradient(0deg, #64c12b 0%, #72cd3b 100%), linear-gradient(#5fc41b, #5fc41b);
        background-blend-mode: normal, normal;
        box-shadow: 0rem 0.01rem 0.01rem 0rem rgba(0, 0, 0, 0.75), inset 0rem 0.01rem 0rem 0rem rgba(255, 255, 255, 0.2);
        border: solid 0.01rem #45a802;
      }
      &.btn-3 {
        background-image: linear-gradient(0deg, #449aff 0%, #50a7ff 100%), linear-gradient(#5fc41b, #5fc41b);
        background-blend-mode: normal, normal;
        box-shadow: 0rem 0.01rem 0.01rem 0rem rgba(0, 0, 0, 0.75), inset 0rem 0.01rem 0rem 0rem rgba(255, 255, 255, 0.2);
        border: solid 0.01rem #3d81ff;
      }
    }
  }
}
</style>
