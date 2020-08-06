

<!--基本设置组件-->
<template>
  <div class="base-config-box">
    <div class="title">
      <img src="../../../../../assets/images/kpi/kpi_set.png" alt="">
      <div>基本设置</div>
    </div>
    <el-form :model="fromData" :rules="rules" :show-message="false" :hide-required-asterisk="false" ref="ruleForm">
      <div class="form-div">
        <div class="label">KPI方案名称：</div>
        <span class="required"></span>
        <el-form-item prop="configName">
          <el-input :disabled="configListItem.editOrSave==1" v-model="fromData.configName" :maxlength.native="20" style="width: 3.27rem"></el-input>
        </el-form-item>
      </div>

      <div class="form-div">
        <div class="label">考核人员：</div>
        <span class="noRequired"></span>
        <el-form-item prop="userNameStr">
          <div @click="chooseUser()" class="choose-user">
            <el-input :disabled="configListItem.editOrSave==1" :readonly="true" v-model="fromData.userNameStr" :maxlength.native="50" style="width: 3.27rem;">
              <img slot="suffix" class="user-icon" src="../../../../../assets/images/kpi/user-icon.png?t=1" alt="">
            </el-input>
          </div>
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>

<script>
  import {ErpCommon} from "../../../../../utils/ErpCommon";
  import bus from "../../../../../utils/bus";
  window.getUserDataFromErp = function getUserDataFromErp(val) {
    bus.$emit("getUserDataFromErp", val);
  };

  export default {
    data() {
      return {
        fromData: {
          configName:'',
          userIdList:[], // 人员信息
          positionList:[], // 角色信息

          userNameStr:'', // 页面上显示使用
          userIdStr:'',
          chooseType:'',
        },
        // 传给erp的人员数据
        userDataToErp:[],
        // 传给erp的角色数据
        roleDataToErp:[],

        rules: {
          configName: [{required: true, message: '', trigger: 'blur'}],
          userNameStr: [{required: false, message: '', trigger: 'blur'}],
        },
      };
    },

    props: {
      baseData: {
        type: [Array, Object],
        default() {
          return {};
        }
      },
      configListItem: {
        type: [Array, Object],
        default() {
          return {};
        }
      }
    },

    watch: {
      baseData: {
        handler: function () {
          this.init();
        },
        deep: true,
        immediate: true,
      }
    },

    mounted(){
      this.init();

      bus.$on("getUserDataFromErp", (val) => {
        this.getUserDataFromErp(val);
      });
    },

    methods: {
      init() {
        let newBaseData = JSON.parse(JSON.stringify(this.baseData)); // 必须转一次 否则 fromData与baseData指向同一指针

        let userInfoArr = []; //人员名字数组
        let userIdArr = []; //人员id数组
        let userDataToErpArr = []; //人员数据新数组
        for (let userInfo of newBaseData.userIdList || []){
          let userDataToErpObj = {};
          if (userInfo.userName){
            userInfoArr.push(userInfo.userName);
          }

          if (userInfo.userId){
            userIdArr.push(userInfo.userId);
          }

          userDataToErpObj.chooseType = newBaseData.chooseType || '';
          userDataToErpObj.rangeId = userInfo.userId || '';
          userDataToErpObj.rangeText = userInfo.userName || '';
          userDataToErpArr.push(userDataToErpObj);
        }

        let positionArr = []; // 角色名字数组
        let positionIdArr = []; // 角色id数组
        let positionDataToErpArr = []; // 角色新数组
        for (let positionInfo of newBaseData.positionList || []){
          if (positionInfo.userPositionName){
            positionArr.push(positionInfo.userPositionName);
          }

          if (positionInfo.userPosition){
            positionIdArr.push(positionInfo.userPosition);
          }

          let positionDataToErpObj = {};
          positionDataToErpObj.chooseType = newBaseData.chooseType || '';
          positionDataToErpObj.rangeId = positionInfo.userPosition || '';
          positionDataToErpObj.rangeText = positionInfo.userPositionName || '';

          positionDataToErpArr.push(positionDataToErpObj);
        }

        this.userDataToErp = userDataToErpArr;       // console.log(this.userDataToErp,'--人员回显的数据--');
        this.roleDataToErp = positionDataToErpArr;   // console.log(this.roleDataToErp,'--角色回显的数据--');

        this.fromData.configName = newBaseData.configName;
        this.fromData.userNameStr = newBaseData.chooseType == 'user' ? userInfoArr.join(',') : positionArr.join(',');
        this.fromData.userIdStr = newBaseData.chooseType == 'user' ? userIdArr.join(',') : positionIdArr.join(',') ;
        this.fromData.chooseType = newBaseData.chooseType;
      },
      chooseUser(){
        if (this.configListItem.editOrSave==1) return;

        // 选择人员
        let param = [];
        if (this.fromData.chooseType == 'user'){
          param = this.userDataToErp;
        }else {
          param = this.roleDataToErp;
        }

        console.log(JSON.stringify(param),'--回显传参--');
        new ErpCommon().selectUserOrRole(JSON.stringify(param));
      },
      getUserDataFromErp(objStr){
        console.log(objStr,'--objStr--');
        // 确认选择人员 获取人员结果
        // 人员eg : [{"chooseType":"user","rangeId":"20333881","rangeText":"大圆"}]
        // 角色eg : [{"chooseType":"","rangeId":"GENERAL_MANAGER","rangeText":"申请发送方-总经理"}]

        let obj = JSON.parse(objStr);
        let newUserData = []; // 将选择的人员或者角色处理成字符串显示
        let newUserID = [];
        for (let info of obj || []){
          if (info.rangeText){
            newUserData.push(info.rangeText);
          }
          if (info.rangeId){
            newUserID.push(info.rangeId);
          }
        }

        this.fromData.userNameStr = newUserData.join(',');
        this.fromData.userIdStr = newUserID.join(',');
        this.fromData.chooseType = obj[0] ? obj[0].chooseType || '' : '';
        console.log(this.fromData.userIdStr,'--this.fromData.userIdStr--');

        // 只要点了确认就应该回显
        if (this.fromData.chooseType == 'user'){
          this.userDataToErp = obj;
        }else {
          this.roleDataToErp = obj;
        }
      },
      // 所有的子组件中都需要包含两个方法 validate(验证)、getData(获取数据)丶resetForm(重置表单) 供父组件调用。
      getData() {
        return this.fromData;
      },
      validate() {
        return this.$refs['ruleForm'].validate();
      },
      resetForm() {
        this.fromData.configName = '';
        this.fromData.userIdList = [];
        this.fromData.positionList = [];
        this.fromData.userNameStr = '';
        this.fromData.userIdStr = '';
        this.fromData.chooseType = '';

        this.userDataToErp = [];
        this.roleDataToErp = [];
      },
    },
  }
</script>

<style scoped lang="less">
  @import '../../../../../style/el-input-reset';

  /deep/ .el-input__inner{
    height: 0.34rem !important;
    font-size: 0.14rem !important;
  }

  /deep/ .el-input .el-input__inner {
    line-height: normal;
  }

  /deep/ .el-input__suffix{
    display: flex;
    align-items: center;
    right: 13px;
  }

  .base-config-box {
    @leftWidth: 0.61rem;

    width: 100%;
    height: 2.12rem;
    box-sizing: border-box;
    padding: 0.36rem 0.3rem;

    .title {
      font-size: 0.18rem;
      font-weight: bold;
      font-stretch: normal;
      letter-spacing: 0;
      color: #444444;
      margin-bottom: 0.31rem;
      display: flex;
      align-items: center;

      & > img{
        width: 0.22rem;
        height: 0.22rem;
        margin-right: 0.17rem;
      }
    }

    .form-div{
      display: flex;
      align-items: center;
      margin: 0 0 0.2rem @leftWidth;
      box-sizing: border-box;

      .user-icon{
        display: flex;
        align-items: center;
        justify-content: center;
        width: 0.12rem;
      }

      .label {
        font-size: 0.14rem;
        font-weight: bold;
        width: 1.05rem;
        flex-shrink: 0;
        text-align: right;
        color: #444444;
      }

      .required:before {
        content: "*";
        width: 0.15rem;
        height: 0.14rem;
        color: #f57107;
        font-size: 0.12rem;
        line-height: 1;
        position: relative;
        left: 0.02rem;
        top: 0.03rem;
        margin-right: 0.09rem;
      }

      .noRequired:before {
        content: "*";
        visibility: hidden;
        width: 0.15rem;
        height: 0.14rem;
        color: #f57107;
        font-size: 0.12rem;
        line-height: 1;
        position: relative;
        left: 0.02rem;
        top: 0.03rem;
        margin-right: 0.09rem;
      }

      .choose-user{
        /deep/ .el-input {
          /deep/ .el-input__inner {
            cursor: pointer;
            max-width: 100%;
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
          }
        }
      }

       /deep/ .el-input {
         /deep/ .el-input__inner {
           font-size: 0.14rem;
           height: 0.34rem;
           padding: 0 0.3rem 0 0.1rem;
           margin-bottom: 0;
         }
       }

       /deep/ .el-form-item--small.el-form-item{
         margin-bottom: 0;
       }
    }
  }
</style>
