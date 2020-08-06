<template>
  <div class="basic">
    <div class="title">合同签署双方(乙方)</div>
    <div class="details_item_3">
      <div class="item_j">
        <div class="item_j_title title3">
          <span>法</span>
          <span>务</span>
          <span>跟</span>
          <span>进</span>
          <span>人：</span>
        </div>
        <div class="item_j_content">是</div>
      </div>
      <div class="item_j">
        <div class="item_j_title title2">
          <span>联</span>
          <span>系</span>
          <span>联</span>
          <span>话：</span>
        </div>
        <div class="item_j_content">是</div>
      </div>
    </div>
    <div class="details_item_3">
      <div class="item_j">
        <div class="item_j_title title3">
          <span>美</span>
          <span>联</span>
          <span>负</span>
          <span>责</span>
          <span>人：</span>
        </div>
        <div class="item_j_content">是</div>
      </div>
      <div class="item_j">
        <div class="item_j_title title2">
          <span>联</span>
          <span>系</span>
          <span>联</span>
          <span>话：</span>
        </div>
        <div class="item_j_content">是</div>
      </div>

      <div class="item_j">
        <div class="item_j_title title3">所属组织：</div>
        <div class="item_j_content">是</div>
      </div>
    </div>
    <div class="basic_line"></div>
    <div class="details_item_3">
      <div class="item_j">
        <div class="item_j_title title3">其他约定：</div>
        <div class="item_j_content">是</div>
      </div>
      <div class="item_j">
        <div class="item_j_title">代理期限类型：</div>
        <div class="item_j_content">是</div>
      </div>

      <div class="item_j">
        <div class="item_j_title title3">成交情况：</div>
        <div class="item_j_content">是</div>
      </div>
    </div>

    <div class="details_item_3">
      <div class="item_j">
        <div class="item_j_title">佣金结算方式：</div>
        <div class="item_j_content">是</div>
      </div>
    </div>
    <div class="details_item_3">
      <div class="item_j">
        <div class="item_j_title">现金奖描述：</div>
        <div class="item_j_content">果然是果然是果然是高手高手</div>
      </div>
    </div>
    <div class="details_item_3">
      <div class="item_j">
        <div class="item_j_title">拟定成份：</div>
        <div class="item_j_content">是</div>
      </div>
    </div>

    <div class="details_item_3">
      <div class="item_j">
        <div class="item_j_title title3">结佣标准：</div>
        <div class="item_j_content">是</div>
      </div>
      <div class="item_j">
        <div class="item_j_title">客户保护期：</div>
        <div class="item_j_content">是</div>
      </div>

      <div class="item_j">
        <div class="item_j_title title3">电商金额：</div>
        <div class="item_j_content">是</div>
      </div>
    </div>

    <div class="details_item_3">
      <div class="item_j">
        <div class="item_j_title">结佣必备资料：</div>
        <div class="item_j_content">是</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  components: {
  },
  data() {
    return {
      propertyTypeList: []
    };
  }
};
</script>
<style lang="less" scoped>
.basic {
  width: 10rem;
  height: auto;
  margin-top: 0.3rem;
  .title {
    height: 0.3rem;
    font-family: MicrosoftYaHei-Bold;
    font-size: 0.16rem;
    font-stretch: normal;
    line-height: 0.3rem;
    letter-spacing: 0rem;
    color: #444444;
    font-weight: bold;
  }
  .list_tui {
    width: 7.28rem;
    height: 1.47rem;
    margin-top: 0.05rem;
    background-color: #ffffff;
    border-radius: 0.02rem;
    margin-bottom: 0.1rem;
    .list_title {
      width: 7.28rem;
      height: 0.5rem;
      background-color: #fafafa;
      border: solid 0.01rem #ebebeb;
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
      .guang {
        width: 1.33rem;
        text-indent: 0.22rem;
      }
      .zhuce {
        width: 1.23rem;
      }
      .daili {
        width: 1.55rem;
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
        width: 1.33rem;
        text-indent: 0.22rem;
      }
      .zhuce {
        width: 1.23rem;
      }
      .daili {
        width: 1.55rem;
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
  .details_item_1 {
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
      .title3 {
        width: 0.83rem;
        display: flex;
        justify-content: space-between;
      }
      .title2 {
        width: 0.72rem;
        display: flex;
        justify-content: space-between;
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
  .details_item_3 {
    width: 100%;
    height: 0.3rem;
    display: flex;
    align-items: center;
    .item_j {
      width: 33%;
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
      .title3 {
        width: 0.83rem;
        display: flex;
        justify-content: space-between;
      }
      .title2 {
        width: 0.72rem;
        display: flex;
        justify-content: space-between;
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
  .basic_line {
    width: 100%;
    border: solid 0.01rem #d6dfe6;
    opacity: 0.41;
    margin-top: 0.1rem;
    margin-bottom: 0.1rem;
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