<template>
  <div>
    <el-tabs v-model="follow">
      <div style="display: flex;justify-content: space-between;">
        <el-input style="width:85%" placeholder="请输入跟进内容" v-model="input" clearable></el-input>
        <el-button style="width:10%" type="primary">确定</el-button>
      </div>
      <el-tab-pane label="全部跟进" name="allFollow">全部跟进</el-tab-pane>
      <el-tab-pane label="文秘跟进" name="wmFollow">配置管理</el-tab-pane>
      <el-tab-pane label="财务跟进" name="cwFollow">角色管理</el-tab-pane>
      <el-tab-pane label="法务跟进" name="fwFollow">定时任务补偿</el-tab-pane>
      <el-tab-pane label="操作记录" name="operatingRecord">111</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      follow: "allFollow"
    };
  }
};
</script>

<style>
</style>