<template>
  <div class="basic">
    <dividingLine :title="`合同签署双方(乙方)`"></dividingLine>

    <div class="basic_item_i">
      <div class="basic_item_i_title">法务跟进人：</div>
      <div class="nomust"></div>
      <el-input :style="{'width':'2.1rem'}" maxlength="20"></el-input>
      <div class="right_title_a">联系电话：</div>
      <div class="nomust"></div>
      <el-input :style="{'width':'2.1rem'}" maxlength="20"></el-input>
    </div>

    <div class="basic_item_i">
      <div class="basic_item_i_title">美联负责人：</div>
      <div class="nomust"></div>
      <el-input :style="{'width':'2.1rem'}" maxlength="20"></el-input>

      <div class="right_title_a">联系电话：</div>
      <div class="nomust"></div>
      <el-input :style="{'width':'2.1rem'}" maxlength="20"></el-input>

      <div class="right_title_b">所属组织：</div>
      <div class="nomust"></div>
      <el-input :style="{'width':'2.1rem'}" maxlength="20"></el-input>
    </div>
    <div class="basic_line"></div>

    <div class="basic_item_i">
      <div class="basic_item_i_title">其他约定：</div>
      <div class="nomust"></div>
      <div>
        <el-checkbox v-model="checked">允许我司转委托</el-checkbox>
        <el-checkbox v-model="checked">禁止对外拆用</el-checkbox>
      </div>
    </div>
    <div class="basic_item_i">
      <div class="basic_item_i_title">代理期限类型：</div>
      <div class="must"></div>
      <div class="time">
        <el-radio v-model="radio" label="1">固定期限</el-radio>
        <el-date-picker v-model="value1" type="daterange" range-separator="至"  start-placeholder="开始日期"  end-placeholder="结束日期"></el-date-picker>
        <el-radio v-model="radio" label="2">暂定期限</el-radio>
        <el-radio v-model="radio" label="3">无固定期限</el-radio>
      </div>
    </div>

    <div class="basic_item_i">
      <div class="basic_item_i_title">成交情况：</div>
      <div class="nomust"></div>
      <div>是</div>
    </div>
    <div class="basic_item_j">
      <div class="basic_item_i_title">佣金结算方式：</div>
      <div class="nomust"></div>
      <el-input :style="{'width':'8.67rem','height':'1.1rem'}" type="textarea" resize="none"></el-input>
    </div>
    <div class="basic_item_j">
      <div class="basic_item_i_title">现金奖描述：</div>
      <div class="nomust"></div>
      <el-input :style="{'width':'8.67rem','height':'1.1rem'}" type="textarea" resize="none"></el-input>
    </div>
    <div class="basic_item_j">
      <div class="basic_item_i_title">挞定成分：</div>
      <div class="nomust"></div>
      <el-input :style="{'width':'8.67rem','height':'1.1rem'}" type="textarea" resize="none"></el-input>
    </div>

    <div class="basic_item_i">
      <div class="basic_item_i_title">结佣标准：</div>
      <div class="must"></div>
      <div class="jieyong">
        <el-radio v-model="radio" label="1">新房代理</el-radio>
        <el-select :style="{'width':'2.5rem'}">
          <el-option
            v-for="item in propertyTypeList"
            :key="item.label"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <el-input :style="{'width':'1.7rem'}" maxlength="20"></el-input>
        <el-radio v-model="radio" label="2">租赁代理</el-radio>
        <el-radio v-model="radio" label="3">租售代理</el-radio>
      </div>
    </div>

    <div class="basic_item_i">
      <div class="basic_item_i_title">客户保护期：</div>
      <div class="nomust"></div>
      <el-input :style="{'width':'2.1rem'}" maxlength="20">
        <span slot="suffix">天</span>
      </el-input>
      <div class="right_title_a">电商金额：</div>
      <div class="nomust"></div>
      <el-input :style="{'width':'2.1rem'}" maxlength="20">
        <span slot="suffix">元</span>
      </el-input>
    </div>

    <div class="basic_item_i_j">
      <div class="basic_item_i_title">结佣必备资料：</div>
      <div class="nomust"></div>
      <div class="jieyong">
        <div class="jieyong_item first">
          <div class="select">
            <el-checkbox v-model="checked">客户确认单</el-checkbox>
          </div>
          <el-radio v-model="radio" label="1">原件</el-radio>
          <el-radio v-model="radio" label="2">复印件</el-radio>
        </div>
        <div class="jieyong_item">
          <div class="select">
            <el-checkbox v-model="checked">成交确认单</el-checkbox>
          </div>
          <el-radio v-model="radio" label="1">原件</el-radio>
          <el-radio v-model="radio" label="2">复印件</el-radio>
        </div>
        <div class="jieyong_item">
          <div class="select">
            <el-checkbox v-model="checked">认购书</el-checkbox>
          </div>
          <el-radio v-model="radio" label="1">原件</el-radio>
          <el-radio v-model="radio" label="2">复印件</el-radio>
        </div>
        <div class="jieyong_item">
          <div class="select">
            <el-checkbox v-model="checked">其他</el-checkbox>
          </div>
          <el-radio v-model="radio" label="1">原件</el-radio>
          <el-radio v-model="radio" label="2">复印件</el-radio>
          <el-input :style="{'width':'1.7rem'}" maxlength="20"></el-input>
          <div class="add">
            <div class="icon"></div>
            <div>添加</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import dividingLine from "./dividingLine";
export default {
  components: {
    dividingLine
  },
  data() {
    return {
      propertyTypeList: []
    };
  }
};
</script>
<style lang="less" scoped>
*{
  color:#444444;
}
.basic {
  margin-top: 0.45rem;
  .basic_line {
    width: 10.1rem;
    border: solid 0.01rem #d6dfe6;
    opacity: 0.41;
    margin-top: 0.3rem;
  }
  .basic_item_i {
    width: 9.9rem;
    height: 0.3rem;
    display: flex;
    align-items: center;
    margin-left: 0.2rem;
    margin-top: 0.16rem;
    color:#444444;
    /deep/ .el-input__suffix {
      display: flex;
      align-items: center;
    }
    .time {
      /deep/ .el-input--small {
        margin-right: 0.3rem;
      }
    }
    .jieyong {
      .el-input--small {
        margin-left: 0.1rem;
        margin-right: 0.3rem;
      }
    }
    .basic_item_i_title {
      width: 1.02rem;
      height: 0.3rem;
      text-align: right;
      line-height: 0.3rem;
      font-family: MicrosoftYaHei;
      font-size: 0.14rem;
      font-weight: normal;
      font-stretch: normal;
      letter-spacing: 0rem;
      color: #444444;
    }
    .right_title_a {
      margin-left: 0.38rem;
      color:#444444;
    }
    .right_title_b {
      margin-left: 0.48rem;
      color:#444444;
    }
    /deep/ .el-checkbox {
      margin-right: 0.22rem;
    }
    .qianyue {
      display: flex;
      align-items: center;
      .yewu {
        margin-left: 0.53rem;
      }
    }
    .select_fanwei {
      display: flex;
      align-items: center;
    }
  }
  .basic_item_i_j {
    width: 9.9rem;
    height: auto;
    display: flex;
    margin-left: 0.2rem;
    margin-top: 0.16rem;
    .basic_item_i_title {
      width: 1.02rem;
      height: 0.3rem;
      text-align: right;
      line-height: 0.3rem;
      font-family: MicrosoftYaHei;
      font-size: 0.14rem;
      font-weight: normal;
      font-stretch: normal;
      letter-spacing: 0rem;
      color: #444444;
    }
    .jieyong {
      .jieyong_item {
        display: flex;
        align-items: center;
        margin-bottom: 0.15rem;
        .select {
          width: 1.5rem;
        }
        .add {
          width: 0.5rem;
          margin-left: 0.1rem;
          display: flex;
          align-items: center;
          font-family: MicrosoftYaHei;
          font-size: 0.12rem;
          font-weight: normal;
          font-stretch: normal;
          letter-spacing: 0rem;
          color: #259cf3;
          .icon {
            width: 0.15rem;
            height: 0.15rem;
            border: solid 0.01rem #259cf3;
            margin-right: 0.05rem;
          }
        }
      }
      .first {
        margin-top: 0.05rem;
      }
    }
  }
  .basic_item_j {
    width: 10.1rem;
    height: 1.1rem;
    display: flex;
    margin-left: 0.2rem;
    margin-top: 0.16rem;
    /deep/ .el-textarea__inner {
      height: 1.1rem;
    }
    .basic_item_i_title {
      width: 1.02rem;
      height: 0.3rem;
      text-align: right;
      line-height: 0.3rem;
      font-family: MicrosoftYaHei;
      font-size: 0.14rem;
      font-weight: normal;
      font-stretch: normal;
      letter-spacing: 0rem;
      color: #444444;
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