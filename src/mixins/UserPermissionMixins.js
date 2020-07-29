import bus from "../utils/bus";
import Vue from 'vue';
import {UserPermission} from "../utils/UserPermission";


export const UserPermissionMixinsValue = {
  mounted(){

    // 断开通知
    bus.$off("updateUserPermission");

    // 接收权限请求成功通知
    bus.$on('updateUserPermission',()=>{
      console.log('--接收到权限初始化完成通知--');
      this.userPermissionMixins = new UserPermission();
    });
  },

  destroyed(){
    bus.$off("updateUserPermission");
  },

  data(){
    return{
      userPermissionMixins: new UserPermission(),
    }
  },
};
