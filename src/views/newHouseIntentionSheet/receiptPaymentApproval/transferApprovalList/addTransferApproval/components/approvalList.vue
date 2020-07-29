<template>
  <div class="approval">
    <div class="title">
      <div class="approval_title">审批-新房转款</div>
      <div class="approvel_status">审批中</div>
    </div>
    <div class="approval_list">
      <div class="item" v-for="(item,index) in approvalStatus" :key="index" :style="{'margin-left':index===0?'-0.3rem':'-0.19rem'}">
        <div class="center">
        <div class="top"> 
          <div class="portrait"></div>
          <div class="right">
          <div class="description">张曼满 <span class="small-text">(BJ11562)</span></div>
          <div class="text">等待审核</div>
          </div>
        </div>
        <div class="middle">事业部B营销店(BJ1156)</div>
        <div class="bottom">2019-09-21 15:32</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      //审批状态 1 审批中 2同意 3拒绝
      approvalStatus:[2,2,2,2,2,2,2,2,3,2,2,2,2,2],
      propertyTypeList: []
    };
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
      line-height: 0.19rem;
      color: #ff8002 ;
      border: solid 0.01rem #ff8002;
    }
  }

  .approval_list {
    width: 8.5rem;
    height: 1.02rem;
    // background-color: #edfaee;
    border-radius: 0.14rem 0rem 0rem 0.14rem;
    opacity: 0.77;
    display: inline-flex;
    flex-direction: row;
    overflow-x: auto;
    overflow-y: hidden;
    flex-wrap: nowrap;

    .item{
      min-width: 2.6rem;
      height: 1.02rem;
      display: flex;
      justify-content: center;
      align-items: center;
      background-image: url('../../../../../../assets/images/projectAgentInfo/distributionContract/approval1.png');
      background-size: 2.6rem 1.02rem;
      background-repeat: no-repeat;
      background-position: center center;

      .center{
        width: 1.96rem;
        height: 0.6rem;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
      }

      .top{
        width: 1.96rem;
        height: 0.3rem;
        // background: red;
        display: flex;
        align-items: center;
        justify-content: space-between;

        .portrait{
          width: 0.3rem;
          height: 0.3rem;
          background: purple;
          border-radius: 50%;
        }
        .right{       
          width: 1.59rem;
          height:0.16rem; 
          display: flex;
          justify-content: space-between;
          
        .description{
          width: 0.98rem;
          height: 0.14rem;
          font-size: 0.14rem;
          line-height: 0.14rem;
          white-space: nowrap;
          color: #000;
          .small-text{
            font-size: 0.12rem;
          }
        }
        .text{
          width: 0.56rem;
          height: 0.14rem;
          font-size: 0.14rem;
          color: #4acb56;
          line-height: 0.14rem;
          text-align: left;
        }
        }
      }

      .middle{
        width: 1.95rem;
        height: 0.13rem;
        font-size: 0.12rem;
        line-height: 0.13rem;
        color: #666666;
        text-align: center;
      }
      .bottom{
        width: 1.95rem;
        height: 0.12rem;
        font-size: 0.12rem;
        line-height: 0.12rem;
        color: #999999;
        text-align: center;
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