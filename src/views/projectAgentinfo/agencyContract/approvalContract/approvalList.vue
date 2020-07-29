<template>
  <div class="approval">
    <div class="title">
      <div class="approval_title">审批-项目代理合同</div>
      <div class="approvel_status">审批中</div>
    </div>
    <div class="approval_list"></div>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      propertyTypeList: []
    };
  }
};
</script>
<style lang="less" scoped>
.approval {
  width: 100%;
  height: auto;
  .title {
    display: flex;
    align-items: center;
    .approval_title {
      height: 0.66rem;
      font-family: MicrosoftYaHei;
      font-size: 0.16rem;
      font-weight: normal;
      font-stretch: normal;
      line-height: 0.66rem;
      letter-spacing: 0rem;
      color: #444444;
    }
    .approvel_status {
        text-align: center;
      margin-left: 0.1rem;
      width: 0.43rem;
      height: 0.19rem;
      border: solid 0.01rem #ff8002;
    }
  }

  .approval_list {
    width: 8.53rem;
    height: 1.02rem;
    background-color: #edfaee;
    border-radius: 0.14rem 0rem 0rem 0.14rem;
    opacity: 0.77;
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