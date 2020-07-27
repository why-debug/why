<!--左边选择配置类型列表-->
<template>
  <div class="configTypeList">
    <div class="searchInput_">
      <searchInput
        @inputChange="inputChange"
        ref="searchInputRef"
        :placeholder="'输入KPI级别名称查询'"
        @Kwd="getKwd"
        v-model="searchKwd">
      </searchInput>
    </div>

    <ul class="bankCon">
      <li class="bankConBox" v-for="(item,index) in list"
          :key="index"
          :class="{'active':activeIndex === index}"
          @click.stop="checkKPILevel(item,index)">
        <div class="configName" :title="item.configName +'-'+item.getConfigTypeText()">
          <span>{{item.configName}} - {{item.getConfigTypeText()}}</span>
        </div>
        <div class="deleteIcon" v-if="getPerMission(item) && item.configId">
          <img class="white" @click="deleteKpiConfig(item,index)" @click.stop="" src="../../../../assets/images/public/close_200_hover.png" alt="">
          <img class="blue" @click="deleteKpiConfig(item,index)" @click.stop="" src="../../../../assets/images/public/delete_blue_200.png" alt="">
        </div>
      </li>
    </ul>
    <div class="bottomBtn" @click.stop="addKPILevel()"
         v-if="userPermissionMixins.KPIConfigAuth() || userPermissionMixins.KPIOrgManagerAuth() || userPermissionMixins.KPIRegionManagerAuth() || userPermissionMixins.KPICityManagerAuth()">
      <img src="../../../../assets/images/public/add_200.png" alt="">
      <div>新增KPI级别</div>
    </div>

    <!--新增弹窗-->
    <chooseKPITypePopup
      :isShow.sync="isShow"
      @successCallback="successCallback"
      v-if="isShow">
    </chooseKPITypePopup>
  </div>
</template>

<script>
  import searchInput from "./searchInput";
  import {
    DeleteBrokerConfigurationApi, DeleteBrokerConfigurationRequest,
    GetConfigList,
    GetConfigListItem,
    GetConfigListRequest
  } from "../../../../net/KPIModule/GetKPIConfigNet";
  import chooseKPITypePopup from "./chooseKPITypePopup";
  import bus from "../../../../utils/bus";
  import {UserPermissionMixinsValue} from "../../../../mixins/UserPermissionMixins";
  import {ErpCommon} from "../../../../utils/ErpCommon";
  import {Const} from "../../../../common/utils/Const";

  export default {
    mixins: [UserPermissionMixinsValue],
    components: {
      searchInput,
      chooseKPITypePopup
    },

    data() {
      return {
        activeIndex: 0,
        searchKwd: '',
        timer: '',
        isShow: false,

        list: [],
      }
    },

    mounted() {
      this.initData();

      // 接收添加保存KPI配置成功的通知
      bus.$off("operatingSuccess");
      bus.$on('operatingSuccess',(val)=>{
        this.updateListData(val);
      });

      bus.$off("cancelSuccess");
      bus.$on('cancelSuccess',(val)=>{
        this.updateDetailData(val); //  取消编辑更新数据
      });
    },

    destroyed(){
      bus.$off("operatingSuccess"); // 保存成功回调
      bus.$off("cancelSuccess"); // 取消编辑回调
    },

    methods: {
      async initData() {
        let data = await new GetConfigList(new GetConfigListRequest({search:this.searchKwd})).send();
        this.list = data.list;
        console.log(data.list,'--list--');

        // 列表数据为空时右侧显示无数据
        if (data.list && data.list.length === 0){
          bus.$emit("noDataForList",true);
          this.$emit('changeConfigType', {configType:1});
        }else {
          bus.$emit("hasDataForList",true);
          this.activeIndex = 0;
          this.$emit('changeConfigType', data.list[0]);
        }
      },
      updateListData(val){
        // 更新时刷新数据  修改时只更新左侧kpi名称和ic
        if (val.operationType == 'add'){
          let listItem = new GetConfigListItem();
          listItem.configId = val.configId;
          listItem.configName = val.configName;
          listItem.configType = val.oldConfigListItem.configType;
          listItem.createTime = '';
          listItem.editOrSave = 1;
          listItem.operationType = 'edit';
          listItem.isShow = false;

          // 更新左侧临时kpi名称
          this.$set(this.list,this.activeIndex,listItem);  // 强制赋值
          // 更新右边数据
          this.$emit('changeConfigType', listItem);
        }else {
          this.list[this.activeIndex].configName = val.configName;
          this.list[this.activeIndex].configId = val.configId;
        }
      },
      updateDetailData(val){
        // 新增时取消
        if (this.list[this.activeIndex] && !this.list[this.activeIndex].configId){
          this.list.splice(this.activeIndex,1);
          this.activeIndex = 0; // 新增取消后选中第一个
        }

        // 修改时取消
        if (this.list.length === 0){
          // 无数据时显示缺省页
          bus.$emit("noDataForList",true);
        }else {
          // 有数据更新数据
          let activeIndex = this.activeIndex == '-1' ? 0 : this.activeIndex;
          let item = this.list[activeIndex];
          item.operationType = 'edit';
          item.editOrSave = 1;
          item.isShow = false;
          item.isCancel = true;

          // 更新左边选中和右边数据
          this.activeIndex = activeIndex;
          this.$emit('changeConfigType', item);
        }
      },
      getKwd(val) {
        this.searchKwd = val || '';
        this.initData();
      },
      inputChange(val) {
        if (this.timer) {
          clearTimeout(this.timer);
        }

        this.searchKwd = val || '';
        this.timer = setTimeout(() => {
          this.initData();
        }, 500);
      },
      // 新增KPI级别
      addKPILevel() {
        this.isShow = true;
      },
      // 选中级别
      checkKPILevel(item, index) {
        if (this.activeIndex == index || !item) return;

        this.activeIndex = index;
        item.operationType = 'edit';
        item.isShow = false;

        this.$emit('changeConfigType', item);
      },
      successCallback(val){
        let item = new GetConfigListItem();
        item.configType = val;
        item.configName = '新增KPI配置';
        item.editOrSave = 2;
        item.operationType = 'add';
        item.isShow = false;

        this.list.push(item);

        // 赋值成功后选中 右边展示默认值
        this.$nextTick(()=>{
          this.activeIndex = this.list.length - 1;
          bus.$emit("hasDataForList",true);
          this.$emit('changeConfigType', item);
        });
      },
      // 获取是否有当前删除权限
      getPerMission(item){
        if (item.configType == 1 && this.userPermissionMixins.KPIConfigAuth()){
          return true;
        }

        if (item.configType == 2 && this.userPermissionMixins.KPIOrgManagerAuth()){
          return true;
        }

        if (item.configType == 3 && this.userPermissionMixins.KPIRegionManagerAuth()){
          return true;
        }

        if (item.configType == 4 && this.userPermissionMixins.KPICityManagerAuth()){
          return true;
        }
      },
      // 删除KPI
      deleteKpiConfig(item,index){
        this.$erpConfirm({
          msg: "删除后不可撤销，已经应用此考核的人员，数据将不再更新，请谨慎操作！"
        }).then(() => {

          let param = {
            configId: item.configId,
            configType: item.configType
          };
          new DeleteBrokerConfigurationApi(new DeleteBrokerConfigurationRequest(param)).send()
          .then((res)=>{
            if (res.errCode !== Const.successCode) return Promise.reject(res);

            this.list.splice(index, 1);

            if (this.list && this.list.length === 0){
              bus.$emit("noDataForList",true);// 如果列表数据被删除完 右侧显示无数据
            }else {
              this.checkKPILevel(this.list[0], 0); //删除完成选中第一个
            }
            new ErpCommon().toast('操作成功');
          })
          .catch((res)=>{
            new ErpCommon().toast(res.errMsg || '服务器开小差了,请稍后再试!', "error");
          });
        });
      },
    },
  }
</script>

<style scoped lang="less">
  .configTypeList {
    width: 100%;
    height: 100%;
    background-color: #caecff;
    overflow: hidden;

    .searchInput_ {
      padding: 0.1rem 0 0.1rem 0.1rem;
      width: 100%;
      display: flex;
      justify-content: center;
      height: 0.41rem;
      border-bottom: 1px solid #bae3f9;
      box-sizing: border-box;
    }

    .bankCon {
      width: 100%;
      height: calc(~"100% - 0.77rem");
      box-sizing: border-box;
      overflow: auto;
      .bankConBox {
        display: flex;
        flex-direction: row;
        width: 100%;
        height: 0.42rem;
        padding-right: 0.15rem;
        box-sizing: border-box;
        cursor: pointer;
        align-items: center;
        &>.configName {
          box-sizing: border-box;
          width: 1.6rem;
          padding: 0.15rem 0 0.15rem 0;
          margin-left: 0.3rem;
          line-height: 1;
          text-align: left;
          max-width: 100%;
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
        }
        &>.deleteIcon{
          width: 0.1rem;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-left: 0.05rem;
          box-sizing: border-box;
          &>.white{
            display: none;
            width: 0.1rem;
            height: auto;
          }
          &>.blue{
            display: none;
            width: 0.1rem;
            height: auto;
          }
        }

        /*选中的样式*/
        &.active {
          background-color: #6ac8fe;
          color: #fff;
          &:hover{
            background: #6ac8fe;
            &>.deleteIcon{
              &>.white{
                display: block;
                width: 0.1rem;
                height: auto;
              }
              &>.blue{
                display: none;
                width: 0.1rem;
                height: auto;
              }
            }
          }
        }
        /*鼠标移入的样式*/
        &:hover{
          background: #b3def6;
          &>.deleteIcon{
            &>.white{
              display: none;
              width: 0.1rem;
              height: auto;
            }
            &>.blue{
              display: block;
              width: 0.1rem;
              height: auto;
            }
          }
        }
      }
    }
    .bottomBtn {
      width: 100%;
      box-sizing: border-box;
      height: 0.36rem;
      border-top: 0.01rem solid #bae3f9;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      cursor: pointer;

      & > img {
        width: 0.15rem;
        height: 0.15rem;
        margin-right: 0.07rem;
      }

      div {
        font-size: 0.12rem;
        color: #259cf3;
      }
    }
  }
</style>
