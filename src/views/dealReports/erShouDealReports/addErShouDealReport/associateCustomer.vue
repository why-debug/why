<template>
  <div class="associate-customer" v-if="isShow">
    <div class="content">
      <div class="close-icon" @click="hideIt()"></div>
      <div class="top-box">
        <div class="title">关联二手客户中心选客</div>
        <el-select
          v-model="testSelect"
          style="margin-right: 0.1rem"
          :style="{'width': inputWidth1}"
          placeholder="">
          <el-option
            v-for="item in testSelectList"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-select
          v-model="testSelect"
          style="margin-right: 0.1rem"
          :style="{'width': inputWidth1}"
          placeholder="">
          <el-option
            v-for="item in testSelectList"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-input class="search-btn-input" suffix-icon="el-icon-search" :style="{'width': inputWidth2}"></el-input>
        <div class="search-box">查询</div>
      </div>
      <el-table
        class="table-box"
        :data="tableData"
        style="width: 100%">
        <el-table-column
          v-for="(item, index) in tableColumnList"
          :key="index"
          :prop="item.prop"
          :label="item.label">
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isShow: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      inputWidth1: '1.3rem',
      inputWidth2: '2.3rem',

      testSelect: '',
      testSelectList: [],
      tableColumnList: [
        { prop: 'htbh', label: '归属组织' },
        { prop: 'htlx', label: '客户持有人' },
        { prop: 'htzt', label: '客户编码' },
        { prop: 'zzmc', label: '客户名称' },
        { prop: 'zzbm', label: '客户手机号' },
        { prop: 'sqr', label: '转介/合作单号' }
      ],
      tableData: [{
        htbh: '45242344234',
        htlx: '1231',
        htzt: '3 1518 弄',
        zzmc: '33 1518 弄',
        zzbm: '11 1518 弄',
        sqr: '王小虎',
      }],
    }
  },
  methods: {
    hideIt () {
      this.$emit('update:isShow', false)
    }
  }
}
</script>

<style lang="less" scoped>
.associate-customer {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 99;
  &>.content {
    position: relative;
    width: 8.66rem;
    height: 4.88rem;
    background-color: #eff4f9;
    padding: 0 0.2rem;
    box-sizing: border-box;
    &>.close-icon {
      position: absolute;
      top: 0;
      right: 0;
      width: 0.18rem;
      height: 0.18rem;
      background-image: url('../../../../assets/images/public/close_200.png');
      background-size: 0.12rem 0.12rem;
      background-repeat: no-repeat;
      background-position: center center;
      z-index: 100;
      cursor: pointer;
      &:hover {
        background-image: url('../../../../assets/images/public/close_200_hover.png');
        background-color: red;
      }
    }
    &>.top-box {
      width: 100%;
      height: 0.5rem;
      display: flex;
      align-items: center;
      /deep/ .el-input__inner {
        height: 0.24rem;
        line-height: 0.24rem;
        border-radius: 0.12rem;
      }
      /deep/ .el-input__icon {
        height: 0.24rem;
        line-height: 0.24rem;
      }
      &>.title {
        width: 1.7rem;
        height: auto;
        line-height: 1;
        color: #444444;
        font-size: 0.14rem;
        font-weight: bold;
      }
      &>.search-btn-input {
        height: 0.24rem;
        line-height: 0.24rem;
        margin-right: 0.2rem;
      }
      &>.search-box {
        width: 0.58rem;
        height: 0.22rem;
        line-height: 0.22rem;
        text-align: center;
        border: 0.01rem solid #bfc2c4;
        color: #666666;
        font-size: 0.12rem;
        border-radius: 0.04rem;
        background-color: #fafafa;
        cursor: pointer;
      }
    }
    &>.table-box {
      /deep/ .has-gutter {
        tr, th {
          background-color: #ebeef0;
        }
      }
    }
  }
}
</style>
