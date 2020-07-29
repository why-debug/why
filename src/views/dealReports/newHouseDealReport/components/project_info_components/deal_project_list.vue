<template>
  <div class="deal_project_list">
    <div class="list_box">
      <div class="close" @click.stop="closeView"></div>
      <header>
        <el-form ref="form" :model="form">
          <div class ="title">代理商</div>
          <div class="select_list">
            <el-form-item>
              <el-select v-model="form.select">
                <el-option
                  v-for="item in options"
                  :key="item.agentId"
                  :label="item.agentName"
                  :value="item.agentId"
                  place-holder="代理商"  
                >
                </el-option>
              </el-select>
            </el-form-item>
          </div>
          <div class="input">
            <!-- <el-form-item>
              <el-input v-model="form.input" placeholder="可使用推广名、注册名、字母缩写检索"></el-input>
            </el-form-item> -->
            <searchInput :placeholder="`可使用推广名、注册名、字母缩写检索`" @Kwd="inputName" width="2.5"></searchInput>
          </div>
          <div class="button" @click.stop="search">查询</div>
        </el-form>
      </header>
      <main >
        <div class="title">
          <div class="col">项目名称</div>
          <div class="col">开发商/代理商</div>
          <div class="col">项目负责人</div>
          <div class="col">合同信息</div>
          <div class="col">佣金结算方式</div>
          <div class="col">合同状态</div>
        </div>
        <div class="content" v-if="!!content_list&&content_list.length!=0">
          <div class="row" v-for="(v, i) in content_list" :key="i" @click="selectProject(v.buildId)">
            <div class="col">
              <div class="item">{{ v.mlLoginName }}</div>
              <div class="item">{{ v.buildName }}</div>
            </div>
            <div class="col">
              <div class="item">
                <div class="sub_title">开发商</div>
                <div class="sub_content">{{ v.developerName }}</div>
              </div>
              <div class="item">
                <div class="sub_title">代理商</div>
                <div class="sub_content">{{ v.agentName }}</div>
              </div>
            </div>
            <div class="col">
              {{ v.userNameuserName }}
            </div>
            <div class="col">
              <div class="item">
                <div class="sub_title">合同时间</div>
                <div class="sub_content">{{ v.agencyTermStart }} 至 {{ v.agencyTermEnd }} </div>
              </div>
              <div class="item">
                <div class="sub_title">归档编号</div>
                <div class="sub_content">{{ v.archiveNumber }}</div>
              </div>
              <div class="item">
                <div class="sub_title">合同情况</div>
                <div class="sub_content">{{ v.contractSituation|transContractSituation }}</div>
              </div>
            </div>
            <div class="col">
              {{ v.settlementMethod }}
            </div>
            <div class="col">
              {{ v.contractStatus }}
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import searchInput from '../../../../../components/form/searchInput'
import GetAgentList from '../../../../../net/newHouseDealReport/add/selection/GetAgentList.js'
import GetReporDealBuildList from '../../../../../net/newHouseDealReport/add/selection/GetReporDealBuildList'
export default {
  data() {
    return {
      agentName:'',//代理商名称
      form: {
        select:'', 
        input:''
      }, 
      options: [

      ], 
      content_list:[], 
    }
  } ,
  components:{
    searchInput
  },
  created() {
    let params = {agentName:this.agentName};
    //初始化代理商
    new GetAgentList (params).send()
    .then(res => {
      console.log(res);
      this.options= res
    })
    .catch(res => {
      console.log('请求失败：',res);
    });
  //初始化项目列表
  this.search();
  }, 
  methods: {
    search() {
      let params= {
        agentId: this.form.select, 
        buildName: this.form.input
      }
      new GetReporDealBuildList(params).send()
      .then(res => {
        this.content_list =res
      })
      .catch(res => {

      })
    }, 
    selectProject(project_id) {
      this.$parent.getProjectDetail(project_id, this.form.select)
      this.$emit('update:show', false)
    },
    //输入框内容
    inputName(data){
      console.log(data);
      this.form.input = data;
    },
    //关闭界面
    closeView(){
      this.$emit('closeView',false);
    }
  }, 
  filters: {
    transContractSituation(p) {
      let _m= new Map()
      .set(1, '有合同')
      .set(2, '需要合同')
      .set(3, '无需合同')
      return _map.get(Number(p))
    } ,
    transContractStatus(p) {
      let _m= new Map()
      .set(-2, '已作废')
      .set(0, '未操作')
      .set(1, '外借中')
      .set(2, '已外借')
      .set(3, '归档中')
      .set(4, '归档中')
      return _map.get(Number(p))
    }
  }

}
</script>

<style lang="less" scoped>
/deep/ .el-form {
  .el-form-item {
    margin: 0;
    .el-form-item__content {
      height: 100%; width: 100%;
      &>.el-input {
        margin: 0; height: 100%; width: 100%;
        input {
          height: 100%; width: 100%;
          padding-left: 0.08rem;
          box-shadow: inset 0rem 0.03rem 0.04rem 0rem 
		rgba(0, 0, 0, 0.06);
        border-radius: 0.12rem;
        border: solid 0.01rem #cdcdcd;
        }
      }
    }
    .el-select {
      margin: 0; height: 100%; width: 100%;
      input {
        padding-left: 0.08rem;
        box-shadow: inset 0rem 0.01rem 0.05rem 0rem  rgba(202, 213, 223, 0.73); border: solid 0.01rem #cad5df; 
      }
    }
  }
}
</style>

<style lang="less" scoped>
.deal_project_list {
    position: fixed; top:0; left: 0; right:0; bottom: 0; z-index: 3;
    background-color: rgba(0, 0, 0, 0.2); 
    .list_box {
      width: 8.66rem; height: 4.88rem; background-color: #eff4f9;
      padding: 0 0.2rem 0.55rem;  position: absolute; 
      top: 50%; left:50%; transform: translate(-50%, -50%); 
      .close {
        position: absolute; top: 0.05rem; right: 0.05rem; width: 0.1rem; height: 0.1rem;
        background-position: center; background-size: 100%; 
        cursor: pointer; background-image: url("../../../../../assets/images/public/close_200.png"); 
      }
      header {
        height: 0.5rem; width: 100%;
        /deep/ .el-form {
            height: 100%; width: 100%; 
            display: flex; align-items: center; 
            .title {
              color: #444444; font-family: MicrosoftYaHei; font-size: 0.14rem; font-weight: bold;
            }
            .select_list {
              margin-left: 0.25rem;
              .el-form-item {
                width: 1.4rem; height: 0.26rem;
                .el-select {
                  width: 100%!important;
                }
              }
            }
            .input {
              margin-left: 0.1rem; 
              .el-form-item {
                width: 2.58rem; height: 0.24rem;
              }
            }
            .button {
              width: 0.55rem; height: 0.26rem; background-color: #fafafa; color: #666666; text-align: center; border: 0.01rem solid #bfc2c4;
              line-height: 0.28rem; margin-left: 0.1rem; cursor: pointer;
            }
        }
      }
      main {
        .title {
          width: 100%; height: 0.35rem; background-color: #ebeef0; display: flex; 
          .col {
            height: 100%; line-height: 0.35rem; 
            color: #888888; font-size: 0.12rem; font-family: MicrosoftYaHei; font-weight: bold;
            &:nth-of-type(1) {
              width: 1.2rem; padding-left: 0.16rem; 
            }
            &:nth-of-type(2) {
              width: 1.79rem;
            }
            &:nth-of-type(3) {
              width: 0.79rem;
            }
            &:nth-of-type(4) {
              width: 2.71rem;
            }
            &:nth-of-type(5) {
              width: 1.12rem;
            }
            &:nth-of-type(6) {
              width: 0.62rem;
            }
          }
        }
        .content {
          .row {
            margin-bottom: 0.03rem; background-color: #fff; display: flex; 
            cursor: pointer;
            &:hover {
              background-color:#eaeaea; 
            }
            .col {
              height: 100%;
              color: #888888; font-size: 0.12rem; font-family: MicrosoftYaHei; font-weight: bold;
              padding:0.14rem 0; 
              &:nth-of-type(1) {
                width: 1.2rem; padding-left: 0.16rem; 
              }
              &:nth-of-type(2) {
                width: 1.79rem;
              }
              &:nth-of-type(3) {
                width: 0.79rem;
              }
              &:nth-of-type(4) {
                width: 2.71rem;
              }
              &:nth-of-type(5) {
                width: 1.12rem;
              }
              &:nth-of-type(6) {
                width: 0.62rem;
              }
              .item {
                height: 0.15rem; margin-bottom: 0.1rem; width: 100%; display: flex; 
                line-height: 0.15rem;
                .sub_title {
                  height: 100%; position: relative;
                  &::after {
                    content:':' ; position: absolute; right: -0.06rem; 
                    top:50%; transform: translateY(-50%); 
                  }
                }
                .sub_content {
                  max-width: 1.77rem; height: 100%; margin-left: 0.15rem;
                }
              }
            }
          }
        }
      }
    }
  }
</style>