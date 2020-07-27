<!--工作分数调整弹窗-->
<template>
  <div class="popup-box" @click.stop="stopMaoPao()">
    <div class="p-b-content">
      <div class="p-b-close" @click.stop="closeModel()"></div>
      <div class="p-b-title">选择KPI执行方案</div>
      <div class="p-b-body">
        <div  v-for="(item,index) in iconList" :key="index" @click.stop="choose(item)" >
          <div class="p-b-item" v-if="item.isShow">
            <img :src="item.img" alt="">
            <div>{{item.label}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {ErpCommon} from "../../../../utils/ErpCommon";
  import {UserPermissionMixinsValue} from "../../../../mixins/UserPermissionMixins";

  export default {
    mixins: [UserPermissionMixinsValue],

    data() {
      return {
        iconList: [
          {
            type: 1,
            label: '经纪人',
            img: require('../../../../assets/images/public/jingJiRen_200.png'),
            isShow: false,
          },
          {
            type: 2,
            label: '分行经理级',
            img: require('../../../../assets/images/public/fenHangJingLi_200.png'),
            isShow: false,
          },
          {
            type: 3,
            label: '区经级',
            img: require('../../../../assets/images/public/quJin_200.png'),
            isShow: false,
          },
          {
            type: 4,
            label: '区主级',
            img: require('../../../../assets/images/public/quZhuJi_200.png'),
            isShow: false,
          }
        ],
      }
    },

    watch: {
      // 监听权限-处理权限
      userPermissionMixins: {
        handler: function () {
          this.dealIconList();
        },
        deep: true,
      }
    },

    mounted(){
      this.dealIconList();
    },

    methods: {
      dealIconList(){
        // 根据权限初始化显示判断
        this.iconList[0].isShow = this.userPermissionMixins.KPIConfigAuth();
        this.iconList[1].isShow = this.userPermissionMixins.KPIOrgManagerAuth();
        this.iconList[2].isShow = this.userPermissionMixins.KPIRegionManagerAuth();
        this.iconList[3].isShow = this.userPermissionMixins.KPICityManagerAuth();
      },
      stopMaoPao() {},
      closeModel() {
        this.$emit('update:isShow', false);
      },
      choose(item){
        if (item.type != 1){
          new ErpCommon().toast('敬请期待');
          return;
        }

        this.$emit('successCallback',item.type);
        this.closeModel();
      },
    },
  }
</script>

<style scoped lang="less">
  .popup-box {
    position: fixed;
    font-size: 0.12rem;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 99;

    .p-b-content {
      position: relative;
      width: 4.58rem;
      height: 2.8rem;
      background-color: #ffffff;
      box-shadow: 0 0.03rem 0.05rem 0 rgba(0, 0, 0, 0.3);
      padding: 0 0 0.2rem;
      box-sizing: border-box;
      overflow: hidden;

      .p-b-close {
        position: absolute;
        right: 0;
        width: 0.26rem;
        height: 0.2rem;
        background-repeat: no-repeat;
        background-size: 0.1rem 0.1rem;
        background-position: center;
        cursor: pointer;
        z-index: 99;
        background-image: url('../../../../assets/images/public/close_200.png')
      }

      .p-b-close:hover {
        background-image: url("../../../../assets/images/public/close_200_hover.png");
        background-color: #f05656;
      }

      .p-b-title {
        width: 100%;
        text-align: center;
        padding: 0.2rem 0 0.4rem;
        font-size: 0.18rem;
        font-weight: bold;
        color: #567c98;
        box-shadow: 0 0.01rem 0 0 rgba(255, 255, 255, 0.75);
      }

      .p-b-body {
        padding: 0 0.25rem;
        display: flex;
        justify-content: center;
        align-items: flex-end;

       & > div{
         .p-b-item {
           width: 1.02rem;
           height: 1.3rem;
           padding-bottom: 0.23rem;
           box-sizing: border-box;
           border: 0.01rem #ffffff solid;
           align-items: center;
           display: flex;
           flex-direction: column;
           justify-content: flex-end;
           cursor: pointer;
           transition: All 0.2s ease-in-out;
           -webkit-transition: All 0.2s ease-in-out;
           -moz-transition: All 0.2s ease-in-out;
           -o-transition: All 0.2s ease-in-out;

           & > img {
             display: block;
             transform: scale(0.6);
             height: 0.87rem;
           }

           & > div {
             font-weight: bold;
             margin-top: 0.1rem;
             font-size: 0.14rem;
             color: #444444;
           }
         }

         .p-b-item:hover {
           border-radius: 0.06rem;
           border: 0.01rem #f4faff solid;
           box-shadow: 0 0.01rem 0.02rem 0.01rem rgba(240, 249, 255, 0.85);
           transform: translate(0, -0.1rem);
           -webkit-transform: translate(0, -0.1rem);
           -moz-transform: translate(0, -0.1rem);
           -o-transform: translate(0, -0.1rem);
           -ms-transform: translate(0, -0.1rem);
         }
       }
      }

      .p-b-bottom-box {
        width: 2.92rem;
        margin: 0 auto;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        -moz-user-select: none;
        -khtml-user-select: none;
        user-select: none;

        .save-btn {
          width: 0.6rem;
          height: 0.25rem;
          line-height: 0.25rem;
          text-align: center;
          color: #ffffff;
          font-size: 0.12rem;
          background-image: url("../../../../assets/images/public/blue_normal.png");
          background-repeat: no-repeat;
          background-size: 100% 100%;
          cursor: pointer;

          &:hover {
            background-image: url("../../../../assets/images/public/blue_focus.png");
          }
        }
      }
    }
  }
</style>
