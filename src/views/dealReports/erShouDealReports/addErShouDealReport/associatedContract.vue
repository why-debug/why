<template>
  <div class="associated-contract" v-if="isShow">
    <div class="content">
      <div class="close-icon" @click="hideIt()"></div>
      <div class="top-box">
        <div class="title">管理合同</div>
        <el-select
          v-model="paramsObj.entrustStatus"
          style="margin-right: 0.1rem"
          :style="{'width': inputWidth1}"
          placeholder="">
          <el-option
            v-for="item in entrustStatusList"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-input v-model="paramsObj.condition" class="search-btn-input" suffix-icon="el-icon-search" :style="{'width': inputWidth2}"></el-input>
        <div class="search-box" @click="initData()">查询</div>
      </div>
      <el-table
        v-if="tableData.length !== 0"
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
      <no-data v-if="tableData.length === 0" style="height: 4rem;"></no-data>
    </div>
  </div>
</template>

<script>
import {
  getEntrustListByConditionRequest,
  getEntrustListByCondition
} from '@/net/dealReports/erShouDealReports.js'

import noData from '@/views/dealReports/erShouDealReports/components/noData.vue'

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
      inputWidth2: '2.7rem',
      paramsObj: new getEntrustListByConditionRequest(),
      entrustStatusList: [
        { label: '无效', value: 0 },
        { label: '有效', value: 1 }
      ],

      tableColumnList: [
        { prop: 'entrustNo', label: '合同编号' },
        { prop: 'entrustStatus', label: '合同状态' },
        { prop: 'orgName', label: '组织名称' },
        { prop: 'orgNo', label: '组织编码' },
        { prop: 'applyUser', label: '申请人' }
      ],
      tableData: []
    }
  },
  components: {
    noData
  },
  created () {
    // this.initData()
  },
  methods: {
    async initData () {
      let data = new getEntrustListByCondition(this.paramsObj).send()
      console.log(data)
      this.tableData = data
    },
    // 关闭
    hideIt () {
      this.$emit('update:isShow', false)
    }
  }
}
</script>

<style lang="less" scoped>
.associated-contract {
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
        width: 0.76rem;
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
