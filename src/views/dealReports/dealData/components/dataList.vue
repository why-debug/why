<template>
  <div>
    <el-tabs v-model="datas" style="position: relative;">
      <el-tab-pane label="全部资料" name="allData">
        <div class="preview_box">
          <div
            :class="{
          preview_item: true,
          last_item: index == 3,
          spacing: index >= 4,
        }"
            :style="{ background: item.bcg_color }"
            v-for="(item, index) in previewList"
            :key="index"
          >
            <div>{{ item.name }}</div>
            <div>{{ item.actualNo }}/{{ item.total }}</div>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="成交资料" name="cjData">111</el-tab-pane>
      <el-tab-pane label="收付资料" name="sfData">111</el-tab-pane>
      <el-tab-pane label="过户资料" name="ghData">111</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      datas: "allData",
      previewList: [
        { name: "ISF表", actualNo: "1", total: "2", bcg_color: "#13b981" },
        { name: "其他资料", actualNo: "0", total: "0", bcg_color: "#8592b2" },
        { name: "刷卡", actualNo: "0", total: "0", bcg_color: "#8592b2" },
        {
          name: "客户确认书",
          actualNo: "0",
          total: "0",
          bcg_color: "#8592b2 "
        },
        { name: "成交确认书", actualNo: "1", total: "2", bcg_color: "#fb8f37" },
        { name: "认购书", actualNo: "1", total: "2", bcg_color: "#13b981" },
        { name: "身份证", actualNo: "1", total: "2", bcg_color: "#fb8f37" },
        { name: "身份证", actualNo: "1", total: "2", bcg_color: "#fb8f37" },
        { name: "身份证", actualNo: "1", total: "2", bcg_color: "#fb8f37" },
        { name: "身份证", actualNo: "1", total: "2", bcg_color: "#fb8f37" },
        { name: "身份证", actualNo: "1", total: "2", bcg_color: "#fb8f37" },
        { name: "身份证", actualNo: "1", total: "2", bcg_color: "#fb8f37" },
        { name: "身份证", actualNo: "1", total: "2", bcg_color: "#fb8f37" },
        { name: "身份证", actualNo: "1", total: "2", bcg_color: "#fb8f37" },
        { name: "身份证", actualNo: "1", total: "2", bcg_color: "#fb8f37" },
        { name: "身份证", actualNo: "1", total: "2", bcg_color: "#fb8f37" },
        { name: "身份证", actualNo: "1", total: "2", bcg_color: "#fb8f37" },
        { name: "身份证", actualNo: "1", total: "2", bcg_color: "#fb8f37" },
        { name: "身份证", actualNo: "1", total: "2", bcg_color: "#fb8f37" },
        { name: "身份证", actualNo: "1", total: "2", bcg_color: "#fb8f37" },
        { name: "身份证", actualNo: "1", total: "2", bcg_color: "#fb8f37" },
        { name: "身份证", actualNo: "1", total: "2", bcg_color: "#fb8f37" },
        { name: "身份证", actualNo: "1", total: "2", bcg_color: "#fb8f37" },
        { name: "身份证", actualNo: "1", total: "2", bcg_color: "#fb8f37" },
        { name: "身份证", actualNo: "1", total: "2", bcg_color: "#fb8f37" },
        { name: "身份证", actualNo: "1", total: "2", bcg_color: "#fb8f37" },
        { name: "身份证", actualNo: "1", total: "2", bcg_color: "#fb8f37" },
        { name: "身份证", actualNo: "1", total: "2", bcg_color: "#fb8f37" },
        { name: "身份证", actualNo: "1", total: "2", bcg_color: "#fb8f37" },
        { name: "身份证", actualNo: "1", total: "2", bcg_color: "#fb8f37" },
        { name: "身份证", actualNo: "1", total: "2", bcg_color: "#fb8f37" },
        { name: "身份证", actualNo: "1", total: "2", bcg_color: "#fb8f37" },
        { name: "身份证", actualNo: "1", total: "2", bcg_color: "#fb8f37" },
        { name: "身份证", actualNo: "1", total: "2", bcg_color: "#fb8f37" },
        { name: "身份证", actualNo: "1", total: "2", bcg_color: "#fb8f37" },
        { name: "身份证", actualNo: "1", total: "2", bcg_color: "#fb8f37" },
        { name: "身份证", actualNo: "1", total: "2", bcg_color: "#fb8f37" },
        { name: "身份证", actualNo: "1", total: "2", bcg_color: "#fb8f37" },
        { name: "身份证", actualNo: "1", total: "2", bcg_color: "#fb8f37" },
        { name: "身份证", actualNo: "1", total: "2", bcg_color: "#fb8f37" },
        { name: "身份证", actualNo: "1", total: "2", bcg_color: "#fb8f37" },
        { name: "身份证", actualNo: "1", total: "2", bcg_color: "#fb8f37" },
        { name: "身份证", actualNo: "1", total: "2", bcg_color: "#fb8f37" },
        { name: "身份证", actualNo: "1", total: "2", bcg_color: "#fb8f37" },
        { name: "身份证", actualNo: "1", total: "2", bcg_color: "#fb8f37" },
        { name: "身份证", actualNo: "1", total: "2", bcg_color: "#fb8f37" }
      ] //预览列表
    };
  }
};
</script>

<style lang="less" scoped>
.preview_box {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  margin-top: 0.21rem;
  margin-bottom: 1.44rem;
  box-sizing: border-box;
  .preview_item {
    // min-width: 1.7rem;
    width: 24%;
    height: 0.36rem;
    margin-right: 1%;
    border-radius: 0.02rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: #ffffff;
    & > div:nth-of-type(1) {
      margin-left: 0.1rem;
    }
    & > div:nth-of-type(2) {
      border-left: solid 0.01rem #ffffff;
      width: 0.5rem;
      height: 0.2rem;
      line-height: 0.2rem;
      text-indent: 0.3rem;
      margin-right: 0.1rem;
    }
  }
  .last_item {
    margin-right: 0 !important;
  }
  .spacing {
    margin-top: 0.1rem;
  }
}
</style>>