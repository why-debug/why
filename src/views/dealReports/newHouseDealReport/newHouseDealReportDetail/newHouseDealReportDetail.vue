<template>
  <div class="newHouseDealReportDetail">
    <div class="tabs_list">
      <div class="tab b"></div>
      <div class="tab b"></div>
      <div class="tab b"></div>
      <div class="tab b"></div>
      <div class="tab b"></div>
      <div class="tab b"></div>
      <div class="tab b"></div>
    </div>
    <main>
      <section>
        <project_detail />
      </section>
    </main>
    <aside>

    </aside>
  </div>
</template>

<script>
import project_detail from './projectDetail/project_detail'
export default {
  components: {
    project_detail, 
  }

}
</script>

<style lang="less" scoped>
  .b {
    box-sizing: border-box;  border: 0.01rem solid red; 
  }
  .newHouseDealReportDetail {
    width: 8.66rem; height: 4.9rem; box-sizing: border-box;
    display: flex;
    .tabs_list {
      width: 0.51rem; height: culc(100% - 0.25rem); background-color: aqua; background-position: center; background-repeat: no-repeat; background-size: contain; 
      padding-top: 0.25rem;
      .tab {
        width: 100%; height: 0.45rem; 
        &.selected {
          background-color: #eff4f9;
        }
      }
    }
    main {
      width: 5.85rem; height: 100%; background-color: #eff4f9;
      section {
        height: 100%;
      }
    }
    aside {
      width: 2.3rem; height: 100%; background-color: #d9f1fe;
    }
  }
  /deep/ .newHouseDealReportDetail {
    font-size: 0.12rem; font-family: MicrosoftYaHei;
  }
</style>