<template>
  <div class="project_detail">
    <main>
      <section>
        <project_name :initParams="projectDetail" />
      </section>

      <section>
        <project_info :initParams="projectDetail" />
      </section>

      <section>
        <cus_info :initParams="projectDetail" />
      </section>

      <section>
        <performance_info :initParams="projectDetail" />
      </section>
    </main>
    <footer>
      <div class="people_time">
        <div class="people">
          制单人 : {{ projectDetail.createUserName || "--" }}-{{
            projectDetail.createOrgName || "-"
          }}
        </div>
        <div class="time">
          制单日期：{{ projectDetail.createTime | formatTime }}
        </div>
      </div>
      <!-- <div class="button" @click="goPrintView">打印</div> -->
    </footer>
  </div>
</template>

<script>
import project_name from "./project_name/project_name";
import project_info from "./project_info/project_info";
import cus_info from "./cus_info/cus_info";
import performance_info from "./performance_info/performance_info";
import foot_info from "./foot_info/foot_info";
import {
  ReportInfoDetail,
  ReportInfoDetailRequest,
  ReportInfoDetailItem,
} from "../../../../../net/newHouseDealReport/display/reporInfoDetail";
import { ErpCommon } from "../../../../../utils/ErpCommon";
export default {
  components: {
    project_name,
    project_info,
    cus_info,
    performance_info,
    foot_info,
  },
  data() {
    return {
      projectDetail: new ReportInfoDetailItem(), //详情参数
      params: {
        reportId: 2, //成交报告ID
      },
    };
  },
  props: {
    projectDetailInfo: {
      type: Object,
      default() {
        return new ReportInfoDetailItem();
      },
    },
  },
  watch: {
    projectDetailInfo: {
      handler: function(newVal, oldVal) {
        this.projectDetail = newVal;
      },
      deep: true,
    },
  },
  created() {
    this.projectDetail = this.projectDetailInfo;
    console.log(this.projectDetail, "项目信息");
    // this.initData();
  },
  methods: {
    //初始化详情数据
    // initData(){
    //   new ReportInfoDetail(new ReportInfoDetailRequest(this.params)).send()
    //   .then((res)=>{
    //     this.projectDetail = res;
    //     console.log(this.projectDetail,'成交报告详情初始化数据');
    //   })
    //   .catch((res)=>{
    //     console.log(res,'err');
    //     new ErpCommon().toast(res.errMsg || '服务器开小差了,请稍后再试!', "error");
    //   })
    // }
    goPrintView() {
      this.$router.push({ path: "/newHousedealPrint", query: {} });
    },
  },
  filters: {
    formatTime(val) {
      if (val != "" && val != undefined) {
        return val.split(" ")[0];
      } else {
        return "--";
      }
    },
  },
};
</script>

<style lang="less" scoped>
.project_detail {
  width: 100%;
  height: 100%;
  overflow: hidden;
  main {
    // width: 5.64rem; margin:0 auto;  height: 4.4rem; overflow-y: auto;
    width: 5.64rem;
    margin: 0 auto;
    height: 4.6rem;
    overflow-y: auto;
    padding: 0.1rem;
    padding-bottom: 0;
    section {
      margin-bottom: 0.1rem;
      width: 100%;
      background-color: #fafafa;
      &:nth-of-type(4) {
        margin-bottom: 0;
      }
    }
  }
  footer {
    height: 0.4rem;
    display: flex;
    align-items: center;
    background-color: #ffffff;
    justify-content: space-between;
    padding: 0 0.16rem;
    .people_time {
      width: 3.95rem;
      display: flex;
      justify-content: space-between;
      color: #999999;
    }
    .button {
      width: 0.62rem;
      height: 0.27rem;
      border-radius: 0.03rem;
      border: solid 0.01rem #259cf3;
      color: #259cf3;
      font-family: SimSun;
      text-align: center;
      line-height: 0.27rem;
      cursor: pointer;
    }
  }
}
</style>
