<template>
  <div class="bankListBox">
    <div class="build-top">
      <div class="left_box">
        <div class="active">{{mainBankInfo.bankName}}</div>
        <div>
          <el-select v-model="searchFromData.provinceId" popper-class="select-popper" style="width: 0.8rem;margin-left: 0.15rem;height: 0.25rem;margin-bottom: 0.04rem">
            <el-option
                  v-for="(item,index) in provinceList"
                  :key="index"
                  :label="item.provinceName"
                  :value="item.id">
            </el-option>
          </el-select>
        </div>
        <div>
          <el-select v-model="searchFromData.cityId" style="width: 0.8rem;margin-left: 0.06rem;height: 0.25rem;margin-right: 0.06rem;margin-bottom: 0.04rem">
            <el-option
                  v-for="(item,index) in cityList"
                  :key="index"
                  :label="item.cityName"
                  :value="item.id">
            </el-option>
          </el-select>
        </div>
        <div style="margin-bottom: 0.04rem">
          <searchInput ref="searchInputRef" :placeholder="'请输入银行名称、地址检索'"  @Kwd="getKwd"  v-model="searchFromData.kwd"></searchInput>
        </div>
      </div>

      <div class="right_box">
        <div class="addFullBank">
          <img @click.stop="addBranch" src="../../../../assets/images/public/add_200.png" alt="">
          <span @click.stop="addBranch">新增</span>
          <div class="upIcon" ></div>
          <div class="downIcon"></div>
          <el-input
                    v-model="searchFromData.pageNum"
                    style="width: 0.5rem"
                    size="mini">
          </el-input>
          <div class="goIcon"></div>
        </div>
        <div>
        </div>
      </div>
    </div>
    <div class="streetLiTitle">
      <div class="itemLiTitle"
                                v-for="(v,i) in liTitleList"
                                :key="i"
                                :class="[i==0?'addpad2':'addpad5',{'streetAddW':v.name=='地址'},{'streetAddW1':v.name=='银行名称'},{'streetAddW2':v.name=='联系电话'}]">
                                {{v.name}}
      </div>
    </div>
    <div class="streetTabList">
      <ul class="streetUl">
        <li class="streetLiList"  v-for="(item,index) in bankFullNameList"
                                  :key="index" @click="selectStreet(item,index)"
                                  :class="{'activeList':selectListNum===index}"
                                  @mouseover="mouseover_(index)"
                                  @mouseleave="mouseleava_">
          <div class="addpad2 streetAddW1">{{item.branchBankName}}</div>
          <div>{{item.bankProvince}}</div>
          <div>{{item.bankCity}}</div>
          <div >{{item.linkmanName}}</div>
          <div class="streetAddW2">{{item.contactPhone}}</div>
          <div >{{item.isChurchyard}}</div>
          <div class="streetAddW">{{item.bankAddress}}</div>
          <div class="editDeleteBox streetAddW2" v-if="mouseoverNum==index || selectListNum==index">
            <div @click.stop="editBusinessStreet(item)">
              <img src="../../../../assets/images/public/edit_200.png" alt="">
              <span>编辑</span>
            </div>
            <div @click.stop="deleteBusinessStreet(item,index)">
              <img src="../../../../assets/images/public/delete_200.png" alt="">
              <span>删除</span>
            </div>
          </div>
        </li>
      </ul>
    </div>

    <!--添加编辑分行弹窗-->
    <addBranchPopup
            @successCallback="successCallback"
            v-if="addBranchPopup.isShow"
            :isShow.sync="addBranchPopup.isShow"
            :mainBankInfo="mainBankInfo"
            :addEditBankPram="addEditBranchPram">
    </addBranchPopup>

  </div>
</template>

<script>
import Vue from 'vue';
import{Input,} from 'element-ui';
Vue.use(Input);
import addBranchPopup from "../commonPopup/addBranchPopup";
import {
  DeleteBranchBankDic,
  DeleteBranchBankDicRequest,
  GetBranchBankDicList,
  GetBranchBankDicListRequest
} from "../../../../net/bankInformation/GetBankInfoNet";
import {Const} from "../../../../common/utils/Const";
import {ErpCommon} from "../../../../utils/ErpCommon";
import searchInput from "../searchInput";


export default {
  props:{
    bankInfo:{
      type:Array|Object,
      default(){
        return [];
      }
    }
  },

  watch:{
    bankInfo: {
      handler:function () {
        this.init();
        this.initData();
      },
      deep: true,
    }
  },

  components: {
    addBranchPopup,
    searchInput
  },

  data(){
    return {
      addBranchPopup:{
        isShow:false,
      },
      addEditBranchPram:{},

      mainBankInfo:'', // 左边主行信息
      bankFullNameList:null, //分行列表数据

      liTitleList:[
        {
          id:1,
          name:'银行名称'
        },
        {
          id:2,
          name:'省份'
        },
        {
          id:3,
          name:'城市'
        },
        {
          id:4,
          name:'联系人'
        },
        {
          id:5,
          name:'联系电话'
        },
        {
          id:6,
          name:'是否境内'
        },
        {
          id:7,
          name:'地址'
        },
        {
          id:8,
          name:'操作'
        },

      ],
      selectListNum:0,
      mouseoverNum:0,

      provinceList:[
        {
          id:1,
          provinceName:'四川省'
        }
      ],
      cityList:[
        {
          id:1,
          cityName:'成都市',
        }
      ],
      searchFromData:{
        pageNum:1,
        pageSize:20,
        kwd:'',
        provinceId:'',
        cityId:''
      }
    }
  },

  mounted(){
    this.initData();
  },

  methods: {
    successCallback(){
      this.initData();
    },
    async initData(){
      console.log(this.mainBankInfo,'--获取分行数据--');

      if (!this.mainBankInfo || !this.mainBankInfo.id) return ;

      let param = {
        bankProvince:'',
        bankCity:'',
        bankNameOrAddress:'',
        parentBankId:this.mainBankInfo.id || '',
      };

      let data = await new GetBranchBankDicList(new GetBranchBankDicListRequest(param)).send();
      this.bankFullNameList = data.list;
    },
    init(){
      this.mainBankInfo = this.bankInfo;
    },
    // 搜素
    getKwd(val){
      this.searchFromData.kwd = val || '';
      this.initData();
    },
    //列表添加样式移入样式
    mouseover_(index){
      this.mouseoverNum=index
    },
    mouseleava_(){
      this.mouseoverNum=-1;
    },
    selectStreet(item,index){
      this.selectListNum=index
    },
    // 添加分行
    addBranch(){
      this.addBranchPopup.isShow = true;
      this.addEditBranchPram = {};
    },
    // 编辑分行
    editBusinessStreet(item){
      this.addBranchPopup.isShow = true;
      console.log(item,'--as-d')
      this.addEditBranchPram = item;
    },
    // 删除分行 DeleteBranchBankDic
    deleteBusinessStreet(item,index){
      this.$confirm('确认删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        new DeleteBranchBankDic(new DeleteBranchBankDicRequest({id:item.id || ''})).send()
                .then((res)=>{
                  if (res.errCode !== Const.successCode) return Promise.reject(res);

                  new ErpCommon().toast('操作成功','success');
                  this.bankFullNameList.splice(index,1);
                })
      });
    },
  },
}
</script>

<style lang="less" scoped>
  .bankListBox{
    width: 100%;
    height: 100%;
  }
  .build-top {
    width: 100%;
    height: 0.34rem;
    background-image: linear-gradient(#f9f9f9, #dedede);
    align-items: flex-end;
    overflow: hidden;
    display: flex;
    justify-content: space-between;
    box-sizing: border-box;
    .left_box{
      display: flex;
      align-items: center;
      .active{
        padding: 0 0.05rem;
        box-sizing: border-box;
        max-width: 100%;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
      }
    }
    .right_box{
      display: flex;
      height: 0.33rem;
      margin-right:0.2rem;
      align-items: center;
      .addFullBank{
        color: #259cf3;
        margin-right:0.1rem;
        display: flex;
        align-items: center;
        &>img{
          width: 0.12rem;
          height:  0.12rem;
          vertical-align: middle;
          margin-right:0.05rem;
          cursor: pointer;
        }
        &>span{
          flex-shrink: 0;
          vertical-align: middle;
          cursor: pointer;
        }
        &>.upIcon{
          margin-left:0.15rem;
          width: 0.2rem;
          height: 0.2rem;
          background-image: url("../../../../assets/images/public/uppage_not_200.png");
          background-repeat: no-repeat;
          background-size: 100% 100%;
          cursor: pointer;
          &:hover{
          background-image: url("../../../../assets/images/public/uph_200.png");
          }
        }
        &>.downIcon{
          margin-left:0.05rem;
          margin-right:0.07rem;
          width: 0.2rem;
          height: 0.2rem;
          background-image: url("../../../../assets/images/public/downpage_not_200.png");
          background-repeat: no-repeat;
          background-size: 100% 100%;
          cursor: pointer;
          &:hover{
          background-image: url("../../../../assets/images/public/downh_200.png");
          }
        }
        &>.goIcon{
          margin-left:0.07rem;
          width: 0.2rem;
          height: 0.2rem;
          background-image: url("../../../../assets/images/public/go_not.png");
          background-repeat: no-repeat;
          background-size: 100% 100%;
          cursor: pointer;
          &:hover{
          background-image: url("../../../../assets/images/public/goh.png");
          }
        }
      }
    }
  }
  .active {
    width: 0.85rem;
    height: 0.3rem;
    line-height: 0.3rem;
    text-align: center;
    margin-left: 0.1rem;
    color: #000000;
    font-size: 0.12rem;
    background-color: #ffffff;
    box-shadow: 0 0 0.01rem 0.01rem rgba(0, 0, 0, 0.2);
    cursor: pointer;
    border-top-left-radius: 0.02rem;
    border-top-right-radius: 0.02rem;
  }
  .streetLiTitle{
    box-sizing:border-box;
    padding: 0 0.1rem;
    width: 100%;
    height: 0.32rem;
    background-color: #fff;
    font-size:0.12rem;
    display: flex;
    align-items: center;
    margin-bottom:0.1rem;
    .itemLiTitle{
      box-sizing:border-box;
      width: 1rem;
      color: #666666;
      font-size: 0.12rem;
    }
    .streetAddW{
      width: 3rem;
    }
    .streetAddW1{
      width: 1.87rem;
    }
    .streetAddW2{
      width: 1.26rem;
    }
    .addpad2{
      padding-left:0.2rem;
    }
    .addpad5{
      padding-left:0.05rem;
    }
  }
  .streetTabList{
    width: 100%;
    height: calc(~"100% - 0.85rem");
    overflow: hidden;
    .streetUl{
      width: 100%;
      height: 100%;
      overflow: hidden;
      .streetLiList{
        box-sizing: border-box;
        width: calc(100% - 0.2rem) ;
        height: 0.3rem;
        margin: 0.04rem 0.1rem 0;
        background-color: #fff;
        display: flex;
        align-items: center;
        border: solid 0.01rem #fff;
        >div{
          box-sizing: border-box;
          width: 1rem;
          border-right: 1px dashed  #dddddd;
          padding-left:0.05rem
        }
        .addpad2{
          box-sizing: border-box;
          padding-left:0.2rem;
        }
        .streetAddW{
          width: 3rem;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .streetAddW1{
          width: 1.87rem;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .streetAddW2{
          width: 1.26rem;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .bianhaoAddW{
          width: 2rem;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          border: none;
        }
        .editDeleteBox{
          display: flex;
          align-items: center;
          justify-content: space-between;
          border: none;
          color: #259cf3;
          &>div{
            box-sizing: border-box;
            width: 0.5rem;
            display: flex;
            align-items: center;
            // margin-right: 0.18rem;
            cursor: pointer;
            &>img{
              width: 0.13rem;
              height: 0.15rem;
              padding-right:0.08rem;
              vertical-align: middle;
            }
            &>span{
              vertical-align: middle;
            }
          }
        }
      }
      .streetLiList:hover{
        background-color: #d9f1fe;
        border: solid 0.01rem #73baee;

      }
      .activeList{
        background-color: #d9f1fe;
        border: solid 0.01rem #73baee;
      }
    }
  }
</style>
<style lang="less" scoped>
  /*修改下拉框样式*/
  /deep/ .el-input--small .el-input__inner{
    height: 0.25rem;
    line-height: 0.25rem;
  }
  /deep/ .el-input__inner{
    padding: 0 0.1rem;
  }
  /deep/ .el-input--small .el-input__icon{
    line-height: 0.25rem;
  }
  /deep/ .el-input--small{
    font-size: 0.12rem;
  }
  /deep/ .el-select .el-input.is-focus .el-input__inner{
    border-color: #bdc6cf;
  }
  /deep/ .el-select .el-input__inner:focus{
    border-color: #bdc6cf;
  }
  /deep/ .el-input__inner{
    border: solid 0.01rem #cad5df;
  }
</style>
