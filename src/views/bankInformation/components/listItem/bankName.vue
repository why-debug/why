<template>
  <div class="bankNameBox">
     <div class="searchInput_">
        <searchInput ref="searchInputRef" :placeholder="'请输入银行名称'"  @Kwd="getKwd"  v-model="selectFormData.searchVal"></searchInput>
      </div>
     <ul class="bankCon">
        <li class="bankConBox" v-for="(item,index) in bankNameList"
                                :key="index"
                                :class="{'activeBank':nowIndex===index}"
                                @click.stop="selectBank(item,index)">
          <div class="kongBox" :class="{'activeBankKong':nowIndex===index}"></div>
          <div class="bankConName">
            <span>{{item.bankName}}</span>
          </div>
          <div class="bankConIcon">
            <div v-if="index==nowIndex">
              <img @click.stop="editBank(item)" src="../../../../assets/images/public/edit_w_200.png" alt="">
              <img @click.stop="deleteBank(item)" src="../../../../assets/images/public/close_press_200.png" alt="">
            </div>

          </div>
        </li>
      </ul>
     <div class="bottomBtn" @click.stop="addBank()">
        <img src="../../../../assets/images/public/add_200.png" alt="">
        <span>新增银行</span>
      </div>

      <!--银行新增编辑-->
      <addBankPopup
              @successCallback="successCallback"
              v-if="addBankPopup.isShow"
              :isShow.sync="addBankPopup.isShow"
              :addEditBankPram="addEditBankPram">
      </addBankPopup>
  </div>
</template>
<script>
import  searchInput  from '../searchInput';
import addBankPopup from "../commonPopup/addBankPopup";
import {
    DeleteBankDic,
    DeleteBankDicRequest,
    GetBankDicList,
    GetBankDicListRequest
} from "../../../../net/bankInformation/GetBankInfoNet";
import {ErpCommon} from "../../../../utils/ErpCommon";
import {Const} from "../../../../common/utils/Const";

export default {
  components: {
    searchInput,
    addBankPopup
  },
  data(){
    return {
      addBankPopup:{
          isShow: false,
      },
      addEditBankPram:{},

      selectFormData: {
        searchVal:''
      },
      nowIndex:0,
      bankNameList: null,
    }
  },
   mounted(){
      this.initData();
   },
   methods:{
    async initData(){
        let data = await new GetBankDicList(new GetBankDicListRequest({bankName:this.selectFormData.searchVal || ''})).send();
        this.bankNameList = data.list || [];

        // 默认选中第一个
        this.nowIndex = 0;
        this.$emit("selectBank",this.bankNameList[0]);
    },
    // 弹窗操作成功回调
    successCallback(){
        this.initData();
    },
    // 搜素
    getKwd(val){
      this.selectFormData.searchVal = val || '';
      this.initData();
    },
    // 选择银行
    selectBank(item,index){
        this.nowIndex = index; // 列表选中 index做索引
        // 通知父组件
        this.$emit("selectBank",item);
     },
    //新增银行
    addBank(){
        this.addBankPopup.isShow = true;
        this.addEditBankPram = {};
    },
    // 修改银行
    editBank(item){
        this.addBankPopup.isShow = true;
        this.addEditBankPram = item;
        console.log(item,'--修改银行--');
    },
    // 删除银行
    deleteBank(item){
        this.$confirm('确认删除?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(() => {
            new DeleteBankDic(new DeleteBankDicRequest(item)).send()
                .then((res)=>{
                    if (res.errCode !== Const.successCode) return Promise.reject(res);

                    this.initData();
                    new ErpCommon().toast('操作成功','success');
                })
                .catch((res)=>{
                    new ErpCommon().toast(res.errMsg || '服务器开小差了,请稍后再试!', "error");
                })
        });
    },
  }
}
</script>

<style lang="less" scoped>
  .bankNameBox{
    width: 100%;
    height: 100%;
    background-color: #caecff;
    overflow: hidden;
    .searchInput_{
      padding: 0.1rem 0;
      width: 100%;
      display: flex;
      justify-content: center;
      height: 0.21rem;
      border-bottom: 1px solid #bae3f9;
    }
    .bankCon{
      width: 100%;
      height: calc(~"100% - 0.77rem");
      box-sizing: border-box;
      overflow: auto;
      .bankConBox{
        display: flex;
        box-sizing: border-box;
        justify-content: space-between;
        width: 100%;
        height: 0.42rem;
        padding-right: 0.14rem;
        .bankConName{
          box-sizing: border-box;
          flex: 0 0 1.6rem;
          width: 1.6rem;
          padding: 0.15rem 0 0.15rem 0.2rem;
          line-height: 1;
          text-align: left;
          max-width: 100%;
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
        }
        .bankConIcon{
          flex: 0 0 0.5rem;
          width: 0.5rem;
          padding: 0.15rem 0;
          &>div>img{
            padding: 0 0.05rem;
            width: 0.12rem;
            cursor: pointer;
          }
        }
        .kongBox{
          width: 0.04rem;
          height: 100%;
        }
        .activeBankKong{
          background-color:  #0b98fa;
        }
      }
      .activeBank{
        background-color: #6ac8fe;
        color: #fff;
      }
    }
    .bottomBtn{
      width: 100%;
      box-sizing: border-box;
      position: relative;
      bottom: 0;
      left: 0;
      height: 0.36rem;
      border-top: 0.01rem solid #bae3f9;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      &>img{
        width: 0.15rem;
        height: 0.15rem;
        margin-right: 0.07rem;
      }
      span{
        font-size: 0.12rem;
        color: #259cf3;
      }
    }
  }
</style>
