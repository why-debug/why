<template>
  <div class="top-box">
    <div class="modify-time" v-if="modifyTime">
      <div class="modify-text">最近修改:</div>
      <div class="modify-value">{{modifyTime ||"--"}}</div>
    </div>
    <div class="cancel-btn" @click.stop="cancelBtn" v-if="configListItemData.isShow && configListItemData.editOrSave != 1">
      <div>取消</div>
    </div>
    <div class="btn" @click.stop="clickBtn" v-if="configListItemData.isShow">
      <div v-if="configListItemData.editOrSave == 1">编辑</div>
      <div v-else>保存</div>
    </div>
  </div>
</template>

<script>
  import {UserPermissionMixinsValue} from "../../../../../mixins/UserPermissionMixins";
  import bus from "../../../../../utils/bus";

  export default {
    mixins: [UserPermissionMixinsValue],

    props: {
      configListItem:{
        type:[Array,Object],
        default() {
          return {};
        }
      },
      modifyTime: {
        type: String,
        default() {
          return '';
        }
      }
    },

    watch: {
      configListItem: {
        handler: function () {
          this.init();
          this.initPermission();
        },
        deep: true,
      },
      // 监听权限-处理权限
      userPermissionMixins: {
        handler: function () {
          this.initPermission();
        },
        deep: true,
      }
    },

    data() {
      return {
        btnType: 1, // 操作类型  1:编辑  2:保存
        configListItemData:{},
      }
    },

    mounted() {
      this.init();

      // 处理权限方法
      this.initPermission();
    },

    methods: {
      init() {
        this.configListItemData = JSON.parse(JSON.stringify(this.configListItem));
      },
      initPermission(){
        if (!this.configListItemData.configType) return;

        if (this.configListItemData.configType == 1){
          this.configListItemData.isShow = this.userPermissionMixins.KPIConfigAuth();
        }
        if (this.configListItemData.configType == 2){
          this.configListItemData.isShow = this.userPermissionMixins.KPIOrgManagerAuth();
        }
        if (this.configListItemData.configType == 3){
          this.configListItemData.isShow = this.userPermissionMixins.KPIRegionManagerAuth();
        }
        if (this.configListItemData.configType == 4){
          this.configListItemData.isShow = this.userPermissionMixins.KPICityManagerAuth();
        }
        console.log(this.configListItemData.isShow,'--按钮--');
      },
      clickBtn() {
        this.$emit('clickBtn',this.configListItemData.editOrSave);
      },
      cancelBtn(){
        // 取消编辑 发送通知
        bus.$emit("cancelSuccess",true); // 操作成功发送更新数据的通知
      }
    }
  }
</script>

<style scoped lang="less">
  .top-box {
    width: 100%;
    height: 0.31rem;
    box-sizing: border-box;
    background-color: #f3f3f3;
    border-bottom: 0.01rem #cecece solid;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    position: relative;

    &>.modify-time{
      width: auto;
      height: 0.31rem;
      display: flex;
      align-items: center;
      line-height: 0.31rem;
      position: absolute;
      // margin-left: 0.11rem;
      left: 0.11rem;
      .modify-text{
        font-size: 0.14rem;
      }
      .modify-value{
        margin-left: 0.1rem;
      }
    }

    & > .btn {
      width: 0.65rem;
      height: 0.25rem;
      line-height: 0.25rem;
      text-align: center;
      color: #ffffff;
      font-size: 0.12rem;
      background-image: url("../../../../../assets/images/public/blue_normal.png");
      background-repeat: no-repeat;
      background-size: 100% 100%;
      margin-right: 0.11rem;
      cursor: pointer;
      z-index: 50;

      &:hover {
        background-image: url("../../../../../assets/images/public/blue_focus.png");
      }
    }

    & > .cancel-btn{
      width: 0.65rem;
      height: 0.25rem;
      line-height: 0.25rem;
      text-align: center;
      color: #ffffff;
      font-size: 0.12rem;
      background-image: url("../../../../../assets/images/public/cancel_normal.png");
      background-repeat: no-repeat;
      background-size: 100% 100%;
      margin-right: 0.11rem;
      cursor: pointer;
      z-index: 50;

      &:hover {
        background-image: url("../../../../../assets/images/public/cancel.png");
      }
    }
  }
</style>
