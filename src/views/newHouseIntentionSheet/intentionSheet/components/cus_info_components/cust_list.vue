<template>
  <div class="deal_project_list">
    <div class="list_box">
      <div class="close" @click="closeView"></div>
      <header>
        <el-form ref="form" :model="searchParams">
          <div class ="title">成交客源</div>
          <div class="select_list">
            <el-form-item>
              <el-select v-model="searchParams.organizationId">
                <el-option
                  v-for="item in options_1"
                  :key="item.id"
                  :label="item.label"
                  :value="item.id"
                  place-holder="归属组织"  
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-select v-model="searchParams.userId">
                <el-option
                  v-for="item in options_2"
                  :key="item.id"
                  :label="item.label"
                  :value="item.id"
                  place-holder="员工"  
                >
                </el-option>
              </el-select>
            </el-form-item>
          </div>
          <div class="input">
            <!-- <el-form-item>
              <el-input v-model="searchParams.select" placeholder="请输入客户电话、转介/合作单号查询"></el-input>
            </el-form-item> -->
            <searchInput :placeholder="`请输入客户电话、转介/合作单号查询`" @Kwd="inputName" width="2.5"></searchInput>
          </div>
          <div class="button" @click.stop="searchHandle">查询</div>
        </el-form>
      </header>
      <main>
        <div class="title">
          <div class="col">客户编号</div>
          <div class="col">客户姓名</div>
          <div class="col">联系方式</div>
          <div class="col">转接/合作</div>
          <div class="col">经纪人</div>
          <div class="col">归属组织</div>
        </div>
        <div class="content">
          <div class="row" v-for="(v, i) in list" :key="i">
            <div class="col">
              <div class="item">{{ v.custId }}</div>
            </div>
            <div class="col">
              <div class="item">
                <div class="sub_title">{{ v.custName }}</div>
              </div>
            </div>
            <div class="col">{{ v.custMobile }}</div>
            <div class="col">
              <div class="item">
                <div class="sub_title">{{ v.customerType }}</div>
              </div>
            </div>
            <div class="col">{{ v.userName }}</div>
            <div class="col">{{ v.organizationName }}</div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import GetLinkCustList from '../../../../../net/newHouseDealReport/add/selection/GetLinkCustList.js'
import searchInput from '../../../../../components/form/searchInput'
export default {
  data() {
    return {
      searchParams: {
        custId:'', //员工编号
        organizationId:'', //组织id
        pageNum:1, //当前页码
        pageSize:30,// 请求条数
        select:'', //客户手机（精准查询）/转介单号（精准查询）
        userId:'',//员工id
      }, 
      options_1: [

      ], 
      options_2: [

      ], 
      list:[], 
    }
  }, 
  components:{
    searchInput
  },
  created() {
    this.getLinkCustList()
  }, 
  methods: {
    getLinkCustList() {
      new GetLinkCustList(this.searchParams).send()
      .then(res => {
        this.list= res; 
      })
    },
   //输入框内容
    inputName(data){
      console.log(data);
      this.searchParams.select = data;
    },
    //点击查询
    searchHandle(){
      this.getLinkCustList();
    },
    //关闭弹窗
    closeView(){
      this.$emit('closeView');
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
      position: absolute; top: 50%; left:50%; transform: translate(-50%, -50%); 
      width: 8.66rem; height: 4.88rem; background-color: #eff4f9;
      padding: 0 0.2rem 0.55rem; 
      .close {
        position: absolute; top: 0.05rem; right: 0.05rem; width: 0.1rem; height: 0.1rem;
        background-position: center; background-size: cover; 
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
              display: flex; justify-content: flex-start; margin-left: 0.25rem; 
              .el-form-item {
                width: 1.4rem; height: 0.26rem; margin-left: 0.09rem;
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
              line-height: 0.26rem; margin-left: 0.19rem; cursor: pointer;
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
              width: 1.63rem; padding-left: 0.16rem; 
            }
            &:nth-of-type(2) {
              width: 0.81rem;
            }
            &:nth-of-type(3) {
              width: 1.32rem;
            }
            &:nth-of-type(4) {
              width: 1.67rem;
            }
            &:nth-of-type(5) {
              width: 0.88rem;
            }
            &:nth-of-type(6) {
              width: 1.9rem;
            }
          }
        }
        .content {
          .row {
            margin-bottom: 0.03rem; background-color: #fff; display: flex; 
            &:hover {
              background-color: #eaeaea;  cursor: pointer;
            }
            .col {
              height: 100%;
              color: #888888; font-size: 0.12rem; font-family: MicrosoftYaHei; font-weight: bold;
              padding:0.14rem 0; 
              &:nth-of-type(1) {
                width: 1.63rem; padding-left: 0.16rem; 
              }
              &:nth-of-type(2) {
                width: 0.81rem;
              }
              &:nth-of-type(3) {
                width: 1.32rem;
              }
              &:nth-of-type(4) {
                width: 1.67rem;
              }
              &:nth-of-type(5) {
                width: 0.88rem;
              }
              &:nth-of-type(6) {
                width: 1.9rem;
              }
              .item {
                height: 0.15rem; width: 100%; display: flex; 
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