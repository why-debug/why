<template>
  <div class="action-log">
    <div class="tab-box">
      <div v-for="(item, index) in tabList" :key="index" @click="changeTab(item.value)" :class="{'active': item.value === tabActive}">{{item.label}}</div>
    </div>
    <el-table
      class="table-box"
       v-if="tableData.length !== 0"
      :data="tableData">
      <el-table-column
        v-for="(item, index) in tableColumnList"
        :key="index"
        :prop="item.prop"
        :label="item.label"
        :width="item.width">
      </el-table-column>
    </el-table>
    <div class="page-box" v-if="tableData.length !== 0">
      <div class="normal" @click="pageChange('-')">&lt;</div>
      <div class="normal" @click="pageChange('+')">&gt;</div>
      <input type="text" v-model="paramsObj.pageOffset" class="input-box">
      <div class="normal" @click="pageChange()">GO</div>
      <div class="num">共1页，3条</div>
    </div>
    <no-data v-if="tableData.length === 0" style="height: 4rem;"></no-data>
  </div>
</template>

<script>
import {
  getMlDealtrackLogListRequest,
  getMlDealtrackLogList
} from '@/net/dealReports/erShouDealReportDetail.js'

import noData from '@/views/dealReports/erShouDealReports/components/noData.vue'

export default {
  props: {
    id: {
      type: Number | String,
      default: ''
    }
  },
  data () {
    return {
      tabActive: '6',
      paramsObj: new getMlDealtrackLogListRequest(),
      maxPage: 0, // 最大页数
      tabList: [
        { label: '跟进日志', value: '1'},
        // { label: '成交报告日志', value: '2'},
        { label: '财务日志', value: '3'},
        { label: '流程日志', value: '4'},
        { label: '业绩日志', value: '5'},
        { label: '操作日志', value: '6'},
      ],
      tableColumnList: [
        { prop: 'creationTime', label: '时间', width: '' },
        { prop: 'dealtrackLogType', label: '日志类型', width: '' },
        { prop: 'dealtrackLogContent', label: '跟进内容', width: '260' },
        { prop: 'creatorUserName', label: '跟进人', width: '' }
      ],
      tableData: []
    }
  },
  components: {
    noData
  },
  created () {
    this.paramsObj.mlDealtrackId = this.id
    if (this.paramsObj.mlDealtrackId) {
      this.initData()
    }
  },
  methods: {
    // 初始化数据
    async initData () {
      let data = await new getMlDealtrackLogList(this.paramsObj).send()
      console.log(data, '操作日志列表')
      this.tableData = data
    },
    changeTab (value) {
      // if (value !== '6') return
      this.tabActive = value
    },
    // 分页改变
    pageChange (val) {
      if (val === '-') {
        if (this.paramsObj.pageOffset <= 0) return
        this.paramsObj.pageOffset--
      }
      if (val === '+') {
        if (this.paramsObj.pageOffset >= this.maxPage) return
        this.paramsObj.pageOffset++
      }
      this.initData()
    }
  }
}
</script>

<style lang="less" scoped>
.action-log {
  width: 100%;
  position: relative;
  width: 100%;
  height: auto;
  overflow: hidden;
  background-color: #eff4f9;
  &>.tab-box {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 0.49rem;
    border-bottom: 0.01rem solid #cad5df;
    display: flex;
    padding: 0 0.1rem;
    box-sizing: border-box;
    &>div {
      width: 0.8rem;
      height: 0.3rem;
      line-height: 0.3rem;
      margin-top: 0.17rem;
      text-align: center;
      color: #999999;
      font-size: 0.12rem;
      cursor: pointer;
      &.active {
        color: #444444;
        border: 0.01rem solid #cad5df;
        border-bottom: 0.01rem solid #eff4f9;
        border-top-left-radius: 0.04rem;
        border-top-right-radius: 0.04rem;
      }
    }
  }
  &>.table-box {
    width: calc(~"100% - 0.4rem");
    height: 3.83rem;
    margin: 0 auto;
    margin-top: 0.65rem;
    box-sizing: border-box;
    /deep/ .has-gutter {
      tr, th {
        background-color: #ebeef0;
      }
    }
  }
  /deep/ .el-table--small {
    td, th {
      height: 0.23rem;
      padding: 0.06rem 0;
      border-bottom: 0.03rem solid #eff4f9;
    }
  }
  &>.page-box {
    width: 100%;
    height: auto;
    margin-top: 0.1rem;
    display: flex;
    align-items: center;
    padding: 0 0.2rem;
    box-sizing: border-box;
    &>.normal {
      width: 0.2rem;
      height: 0.2rem;
      line-height: 0.2rem;
      text-align: center;
      font-size: 0.1rem;
      color: #bbbbbb;
      background-color: #e0e0e0;
      border-radius: 0.04rem;
      margin-right: 0.08rem;
      cursor: pointer;
      &:hover {
        background-color: #259cf3;
        color: #ffffff;
      }
    }
    &>.input-box {
      width: 0.35rem;
      height: 0.2rem;
      border-radius: 0.04rem;
      margin-right: 0.08rem;
      border: none;
      text-align: center;
      font-size: 0.12rem;
    }
    &>.num {
      font-size: 0.12rem;
      color: #999999;
    }
  }
}
</style>
