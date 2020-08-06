<template>
    <!-- 佣金方案 -->
    <div class="g_All">
        <!-- <div class="g_topselect">
            <div class="g_selectMenu">
                
            </div>
            <div class="g_btnList">
                <div class="u_btn g_submit" @click="f_submit">查询</div>
                <div class="u_btn" @click="f_clear">重置</div>
            </div>
        </div> -->
        <!--佣金方案-包含下级-包含禁用员工-->
        <div class="g_nav">
            <div class="g_switchLeftList g_flexLeftCenter">
                <div class="u_switch">佣金方案</div>
                <div class="g_groupEffecive">
                    <div class="g_effeciveItem">
                        <el-checkbox v-model="isEffecive" @change="isEffeciveChange">包含下级</el-checkbox>
                    </div>
                </div>
            </div>
            <div class="g_otherRightList g_flexLeftCenter">
                <div class="addFullBank">
                    <div class="upIcon" @click="delPage"></div>
                    <div class="downIcon" @click="addPage"></div>
                    <el-input
                    type="tel"
                            v-model="paramsObj.pageNum"
                            size="mini">
                    </el-input>
                    <div class="goIcon" @click="initData"></div>
                </div>
                <div></div>
                <div class="u_count">共{{ totalPage||0 }}页,{{total||0}}条</div>
            </div>
        </div>

        <!--列表数据-->
        <div class="g_scroll">
            <!-- 在职 跑盘 v-if="!isQuit" -->
            <div class="g_lists" :class="paramsObj.userWriteoff == 2?'userWriteoff-List':''" >
                <div class="g_header">
                    <div class="g_lineHeader">
                        <div class="u_lineHeaderContent g_index">序号</div>
                        <div class="u_lineHeaderContent g_isHoveScheme">是否有佣金方案</div>
                        <div class="u_lineHeaderContent g_operate">操作 </div>
                        <div class="u_lineHeaderContent g_staffCode">工号</div>
                        <div class="u_lineHeaderContent g_staffName">姓名</div>
                        <div class="u_lineHeaderContent g_org">组织</div>
                        <div class="u_lineHeaderContent g_numOrg">组织编号</div>
                        <div class="u_lineHeaderContent g_power">职位</div>

                        <!-- 在职字段 -->
                        <div v-if="paramsObj.userWriteoff == 1" class="u_lineHeaderContent g_entryDate">入职时间</div>
                        <!-- 离职字段 -->
                        <template v-if="paramsObj.userWriteoff == 2">
                          <div class="u_lineHeaderContent g_userStatus">岗位状态</div>
                          <div class="u_lineHeaderContent g_sex">性别</div>
                          <div class="u_lineHeaderContent g_icCode">身份证</div>
                          <div class="u_lineHeaderContent g_writeoffTime">离职日期</div>
                        </template>
                        
                        <!-- <div class="u_lineHeaderContent g_last">用户状态 </div> -->
                    </div>
                </div>
                <div class="g_list" v-show="list.length > 0">
                    <div class="g_lineList" 
                    
                    v-for="(item,index) in list" 
                    :key="index"
                    @dblclick="checkDetail(item)"
                    >
                        <div class="u_lineListContent g_index">{{ (index + 1) || '--' }}</div>
                        <div class="u_lineListContent g_isHoveScheme" :class="item.isHaveCommission == 1?'blue':''">{{ (item.isHaveCommission == 1?'是':'否') || '--' }}</div>
                        <div class="u_lineListContent g_operate blue" @click="f_synchroSNR(item)">从SNR同步</div>
                        <div class="u_lineListContent g_staffCode">{{ item.userNo || '--' }}</div>
                        <div class="u_lineListContent g_staffName">{{ item.userName || '--' }}</div>
                        <div class="u_lineListContent g_org">{{ item.organizationName || '--' }}</div>
                        <div class="u_lineListContent g_numOrg">{{ item.organizationNo || '--' }}</div>
                        <div class="u_lineListContent g_power">{{ item.roleName || '--' }}</div>
                        <!-- 在职字段 -->
                        <div v-if="paramsObj.userWriteoff == 1" class="u_lineListContent g_entryDate">{{ item.userJobDate || '--' }}</div>
                        <!-- 离职字段 -->
                        <template v-if="paramsObj.userWriteoff == 2">
                          <div class="u_lineListContent g_userStatus">离职</div>
                          <div class="u_lineListContent g_sex">{{item.userSex == 1?'男':'女'}}</div>
                          <div class="u_lineListContent g_icCode">{{ item.userIccode || '--' }}</div>
                          <div class="u_lineListContent g_writeoffTime">{{ item.writeoffTime || '--' }}</div>
                        </template>
                        <!-- <div class="u_lineListContent g_last">{{ (item.userStatus ==1 ?'正常':'作废') || '--' }}</div> -->
                    </div>
                </div>
            </div>
            <!-- 无数据 -->
            <noData v-show="list.length == 0" text="暂无相关数据"></noData>            
        </div>

        <!--详情-->
        <div v-if="showDetail">
            <datail @f_closeView="f_closeView" :item="selectedItem"></datail>
        </div>
    </div>
</template>

<script>
// 组件
import datail from "./detailPopup";
import noData from '../../components/common/noData';

// 请求
import {
    GetCommissionSchemeList,
    GetCommissionSchemeListRequest,
} from "../../net/commissionScheme/GetCommissionSchemeNet";
import {
    UpdateUserCommissionBySnr,
    UpdateUserCommissionBySnrRequest,
} from "../../net/commissionScheme/UpdateUserCommissionBySnr";

import {Const} from '../../utils/Const.js'

export default {
    data(){
        return{
          pageNum:'', // 页码
          pageSize:'' ,// 每页记录数
          total:'', //总记录数
          totalPage:'', //总页数

          isEffecive: false, // 搜索 - 是否包含下级
          isQuit: false,// 搜索 - 包含禁用员工
          list: [], // 列表
          paramsObj: new GetCommissionSchemeListRequest(),

          updateUserParams : new UpdateUserCommissionBySnrRequest(),

          showDetail: false,//打开详情页标志
          selectedItem:{},// 当前选中的用户
        }
    },
    components:{
        datail,
        noData,
    },
    created(){
        this.initData();
        window.toWebParameter = this.toWebParameter
    },
    methods:{
        // 接收数据对接
        toWebParameter(paramssStr){
          if(!paramssStr) return;
          let paramsJson = JSON.parse(paramssStr) || {};
          console.log('paramsJson:',paramsJson);
          for (const key in paramsJson) {
            if (paramsJson.hasOwnProperty(key)) {
              this.paramsObj[key] = paramsJson[key]
            }
          }
          this.paramsObj.pageNum = 1;
          this.initData();
        },
        // 包含下级切换
        isEffeciveChange(isContainDownOrgFlag){
          this.paramsObj.isContainDownOrg = isContainDownOrgFlag? 1 : 0;
          this.paramsObj.pageNum = 1;
          this.initData();
        },
        // 初始化数据
        async initData(){
            console.log('--请求接口--');
            console.log('--请求参数--',this.paramsObj);
            let data = await new GetCommissionSchemeList(this.paramsObj).send() || {};
            this.list = data.list
            this.total = data.total
            this.totalPage = data.totalPage
        },
        //查看详情
        checkDetail(item){
          if(!item){return}
            this.showDetail = true;
            this.selectedItem = item;
        },
        //关闭弹窗
        f_closeView(item){
            this.showDetail = false;
        },
        //从SNR同步
        f_synchroSNR(item){
          let userInfo = '【姓名：' + (item.userName || '-') + '，工号：' + (item.userNo || '-')  + '】';
          this.$erpConfirm({msg: '确定需要从SNR中同步' + userInfo +'的佣金方案吗？'})
          .then(() => {
              //同步SNR
              this.updateUserParams.userId = item.userId;
              new UpdateUserCommissionBySnr(this.updateUserParams).send().then(res => {
                console.log('resresres:',res);
                 if (!res || res.errCode !== Const.successCode) {
                   this.$erpCommon.toast(res.errMsg)
                   return;
                 }
                //同步成功弹窗显示
                this.$erpCommon.toast('成功从SNR同步' + userInfo + '的信息','success');
              });
              
          })
			    .catch(() => {})
        },
        // 页数增加
        addPage(){
          this.paramsObj.pageNum++;
          this.initData()
        },
        //页数减少
        delPage(){
          if(!this.paramsObj.pageNum
           || this.paramsObj.pageNum == 1) return;
          this.paramsObj.pageNum--;
          this.initData()
        }
    },
}
</script>

<style lang="less" scoped>
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
      /deep/ &>.el-input{
        width: 0.4rem;
        >input{
          padding: 0 0.08rem;
          text-align: center;
        }
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
         background-image: url("../../assets/images/public/uppage_not_200.png");
         background-repeat: no-repeat;
         background-size: 100% 100%;
         cursor: pointer;
    &:hover{
         background-image: url("../../assets/images/public/uph_200.png");
     }
    }
    &>.downIcon{
         margin-left:0.05rem;
         margin-right:0.07rem;
         width: 0.2rem;
         height: 0.2rem;
         background-image: url("../../assets/images/public/downpage_not_200.png");
         background-repeat: no-repeat;
         background-size: 100% 100%;
         cursor: pointer;
    &:hover{
         background-image: url("../../assets/images/public/downh_200.png");
     }
    }
    &>.goIcon{
         margin-left:0.07rem;
         width: 0.2rem;
         height: 0.2rem;
         background-image: url("../../assets/images/public/go_not.png");
         background-repeat: no-repeat;
         background-size: 100% 100%;
         cursor: pointer;
    &:hover{
         background-image: url("../../assets/images/public/goh.png");
     }
    }
    }
</style>
<style lang="less" scoped>
    .g_staffCardId{
        width: 11.1%;
    }
    .g_staffStatu{
        width: 6.6%;
    }
    .g_gender{
        width: 6.8%;
    }
    .g_last{
        flex: 1;
    }
    .g_entryDate{
        width: 12.4%;
    }
    .g_power{
        width: 9.4%;
    }
    .g_numOrg{
        width: 9.7%;
    }
    .g_numOrgQuit{
        width: 8.3%;
    }
   
   
    /* 离职的范围处理 */
    .userWriteoff-List{
       .g_org{
        width: 10.7%!important;
      }
      .g_accountNum{
          width: 9.3%!important
      }
      .g_staffName{
          width: 7.6%!important;
      }
      .g_staffCode{
          width: 9.6%;
      }
      .g_operate{
          width: 8%!important;
          cursor: pointer;
      }
      .g_sex{
      width: 4%!important;
      }
      .g_icCode{
        width: 12%!important;
      }
      .g_userStatus{
        width: 6%!important;
      }
    }
     

    .g_isHoveScheme{
        width: 7%!important;
    }
    .g_index{
        width: 4%!important;
    }
    .g_groupEffecive{
        width: 2.3rem;
        height: 0.3rem;
        clear: both;
    }
    .g_effeciveItem{
        width: auto;
        height: 100%;
        float: left;
        line-height: 0.3rem;
        font-family: SimSun;
        font-size: 0.12rem;
        color: #7c8286;
        margin-left: 0.2rem;
    }
    .u_count{
    flex-shrink:0;
    color: #999999;
    min-width:0.6rem; 
    }
    .u_switch{
        font-family: SimSun;
        font-size: 0.12rem;
        padding: 0.08rem 0.1rem;
        border: 1px solid rgb(206, 206, 206);
        border-bottom: none;
        margin-left: 0.09rem;
        border-top-left-radius:0.03rem;
        border-top-right-radius: 0.03rem;
        margin-top: 0.03rem;
        cursor: pointer;
        color: #00223a;
        background-color: #FFFFFF;
        z-index: 10;
    }
    .g_submit{
    margin-right:0.1rem;
    }
    .u_btn{
    text-align: center;
    font-size:0.12rem;
    padding: 0 0.1rem 0 0.1rem;
    height: 0.26rem;
    line-height: 0.24rem;
    cursor: pointer;
    color: #ffffff;
    width: 0.3rem;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    background-image: url("../../assets/images/public/screenDefaul_200.png");
    }
    .u_btn:hover{
    background-image: url("../../assets/images/public/screenHover_200.png");
    }
    .u_btn:active{
    background-image: url("../../assets/images/public/screenActive_200.png");
    }
    .g_btnList{
        display: flex;
        justify-content: flex-start;
        align-items: center;
        margin-right: 0.1rem;
    }
    .u_lineListContent{
        width:9%;
        height: 100%;
        border-right: 1px #d5d5d5 dashed;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        font-family: MicrosoftYaHei;
        font-size: 0.12rem;
        color: #444444;
        padding: 0 0.1rem;
        box-sizing: border-box;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        box-sizing: border-box;
    }
    .u_lineListContent.blue{
      color: #259cf3;
    }
    .u_lineListContent:last-child{
        border-style: none;
        flex:1;
    }
    .u_lineHeaderContent{
        width: 9%;
        height: 100%;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        font-family: MicrosoftYaHei;
        font-size: 0.12rem;
        color: #666666;
        padding: 0 0.1rem;
        box-sizing: border-box;
        white-space: nowrap;
    }
    .u_lineHeaderContent:last-child{
        border-style: none;
        flex:1;
    }
    .g_lineList{
        width: 100%;
        height: 0.3rem;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        margin-top: 0.04rem;
        background-color: #ffffff;
        border: 1px #ffffff solid;
        box-sizing: border-box;
    }
    .g_lineList:hover{
        background-color: #d9f1fe;
        border: 1px #73baee solid;
        box-shadow:  0rem 0rem 0.02rem 0.01rem rgba(115, 186, 238,0.8);
    }
    .g_lineList:focus{
        background-color: #d9f1fe;
        border: 1px #73baee solid;
        box-shadow:  0rem 0rem 0.02rem 0.01rem rgba(115, 186, 238,0.8);
    }
    .g_list{
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
        margin-top: -0.04rem;
        padding: 0 0.1rem;
        box-sizing: border-box;
    }
    .g_lineHeader{
        width: 100%;
        height: 100%;
        background-color: #FFFFFF;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        padding: 0 0.1rem;
        box-sizing: border-box;
    }
    .g_header{
        width: 100%;
        height: 0.3rem;
        margin-bottom: 0.04rem;
        position: sticky;
        top: 0;
    }
    .g_lists{
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100%;
      height: 100%;
      background-color: #EDF3FB;
    }
    .g_flexLeftCenter{
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
    }
    .g_otherRightList{
        height: 100%;
        margin-right: 0.1rem;
        font-size: 0.1rem;
        font-size: 0.1rem;
        align-items: center;
    }
    .g_switchLeftList{
        height:100%;
    }
    .g_nav{
        width: 100%;
        height: 0.34rem;
        display: flex;
        justify-content: space-between;
        background-image: linear-gradient(#f9f9f9, #dedede);
    }
    .g_scroll{
      position: relative;
        width: 100%;
        height: calc(100% - 0.32rem);
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
        overflow: auto;
    }
    .g_selectMenu{
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: flex-start;
        align-items: center;
    }
    .g_topselect{
        width: 100%;
        height: 0.32rem;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        background-color: #259CF3;
    }
    .g_All{
        width: 100%;
        min-height: 4.88rem;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
        position: relative;
    }
</style>
