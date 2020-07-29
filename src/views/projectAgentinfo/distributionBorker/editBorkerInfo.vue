<template>
    <div class="g_biggest">
        <div class="g_navListTop">
            <div class="g_nav">
                <div class="u_content">分销经纪人</div>
                <div class="g_bootom">
            </div>
            </div>
            <div class="g_btnList">
                <div class="g_btn u_submit" @click="f_submit">提交</div>
                <div class="g_btn u_cancel" @click="f_cancel">取消</div>
            </div>
        </div>
        <div class="g_content">
            <div class="g_topLine">
                <topDividingLine :title="title"></topDividingLine>
            </div>
            <div class="g_fromBiggst">
                <div class="firstGroup">
                    <div class="u_group">
                        <div class="firstTitle">申请组织: </div>
                        <div class="u_important"></div>
                        <!-- <div class="u_groupDisplaycontent">{{ paremeter.organization }}</div> -->
                        
                        <input v-model="paremeter.organization" class="u_groupSelectInput  input_bcg" type="text" disabled>
                    </div>
                    <div class="u_group">
                        <div class="firstTitle">申请人: </div>
                        <div class="u_important"></div>
                        <!-- <div class="u_groupDisplaycontent">{{ paremeter.applicant }}</div> -->
                        <input v-model="paremeter.applicant" class="u_groupSelectInput  input_bcg" type="text" disabled>
                    </div>
                    <div class="u_group">
                        <div class="firstTitle">创建时间: </div>
                        <div class="u_important"></div>
                        <div class="u_groupDisplaycontent">{{ paremeter.foundTime }}</div>
                    </div>
                    <div class="u_group">
                        <div class="firstTitle">所属公司: </div>
                        <div class="u_important">*</div>
                        <div class="u_groupSelectInput u_groupDisplaycontent" @click="f_selectCompany">{{ paremeter.companyName }}</div>
                    </div>
                    <div class="u_group">
                        <div class="firstTitle">公司简称: </div>
                        <div class="u_important"></div>
                        <input v-model="paremeter.simpleName" class="u_groupSelectInput " type="text">
                    </div>
                    <div class="u_group">
                        <div class="firstTitle">门&nbsp;店&nbsp;码: </div>
                        <div class="u_important"></div>
                        <input v-model="paremeter.storeCode" class="u_groupSelectInput" type="text">
                    </div>
                    <div class="u_group">
                        <div class="firstTitle secoundTitle">经纪人姓名: </div>
                        <div class="u_important">*</div>
                        <input v-model="paremeter.borkerName" class="u_groupSelectInput" type="text">
                    </div>
                    <div class="u_group">
                        <div class="firstTitle secoundTitle">经纪人电话: </div>
                        <div class="u_important">*</div>
                        <input 
                        v-model="paremeter.borkerPhone" 
                        class="u_groupSelectInput" 
                        @keydown="btKeyDown"
                         @keyup="btKeyDown"
                         maxlength="11"
                        >
                    </div>
                    <div class="u_group">
                        <div class="firstTitle">性&nbsp;&nbsp;别: </div>
                        <div class="u_important"></div>
                        <div class="g_checkBoxGroup">
                            <el-radio-group v-model="paremeter.sex">
                                <el-radio :label="1">男</el-radio>
                                <el-radio :label="2">女</el-radio>
                            </el-radio-group>
                        </div>
                    </div>
                    <div class="u_group">
                        <div class="firstTitle">身份证号: </div>
                        <div class="u_important"></div>
                        <input v-model="paremeter.cardId" class="u_groupSelectInput" type="text">
                    </div>
                    <div class="u_group">
                        <div class="firstTitle">出生年月: </div>
                        <div class="u_important"></div>
                        <!-- <input v-model="paremeter.birthday" class="u_groupSelectInput" type="text"> -->
                        <el-date-picker
                            v-model="paremeter.birthday"
                            type="date"
                            format="yyyy-MM-dd"
                            value-format="yyyy-MM-dd"
                            placeholder="选择日期">
                        </el-date-picker>
                    </div>
                    <div class="u_group">
                        <div class="firstTitle">微信ID: </div>
                        <div class="u_important"></div>
                        <input v-model="paremeter.wechat" class="u_groupSelectInput" type="text">
                    </div>
                    <div class="u_group">
                        <div class="firstTitle">账&nbsp;&nbsp;号: </div>
                        <div class="u_important"></div>
                        <input v-model="paremeter.account" class="u_groupSelectInput" type="text">
                    </div>
                    <div class="u_group">
                        <div class="firstTitle">注册时间: </div>
                        <div class="u_important"></div>
                        <!-- <input v-model="paremeter.regtime" class="u_groupSelectInput" type="text"> -->
                        <el-date-picker
                            v-model="paremeter.regtime"
                            type="date"
                            format="yyyy-MM-dd"
                            value-format="yyyy-MM-dd"
                            placeholder="选择日期">
                        </el-date-picker>
                    </div>
                    <div class="u_group">
                        <div class="firstTitle">绑定时间: </div>
                        <div class="u_important"></div>
                        <!-- <input v-model="paremeter.bindTime" class="u_groupSelectInput" type="text"> -->
                        <el-date-picker
                            v-model="paremeter.bindTime"
                            type="date"
                            format="yyyy-MM-dd"
                            value-format="yyyy-MM-dd"
                            placeholder="选择日期">
                        </el-date-picker>
                    </div>
                    <div class="u_group u_textareaGroup">
                        <div class="firstTitle" style="padding-right:0.05rem;">备&nbsp;&nbsp;注: </div>
                        <div class="u_important"></div>
                        <textarea v-model="paremeter.desc" class="g_textareaWidth"></textarea>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="isSelectCompangList">
            <selectCompany @f_closeView="f_closeView" @f_componentData="f_companyData"></selectCompany>
        </div>
    </div>
</template>
<script>
import selectCompany from "../form/selectCompany"
import topDividingLine from "../../../components/form/topDividingLine"
import {
    GetBorkerDetailsItem,
    EditBorkerRequestParameter,
    EditBorkerItem,
    SaveDistributionBrokerApi,
    SaveDistributionBrokerRequest
} from "../../../net/projectAgentinfo/borkerRequest/InitEditBorkerDetails"
import {JudgeObjectIsEqult} from "../../../utils/Common";// 判断属性书否更改
const reg = /^[1-9]\d{0,11}$/;

export default {
    data() {
        return{
            title:'编辑-分销经纪人',
            sex:1, //性别
            isSelectCompangList:false,//选择公司弹窗
            paremeter:{},
            oldParemeter:{},
            newParemeter:{},
        }
    },
    components:{
        topDividingLine,
        selectCompany,
    },
    props:{
        borkerId:{
            type:Number,
            default: 0,
        }
    },
    watch:{
        paremeter: {
            handler(newVal) {
                this.newParemeter = newVal;
            },
            deep: true
        }
    },
    created(){
        this.initData();
    },
    methods: {
        //初始化
        initData(){
            const paremeterValue = {
                "borkerId": this.borkerId,
            };
            new GetBorkerDetailsItem(new EditBorkerRequestParameter(paremeterValue)).send()
            .then((res)=>{
                console.log("编辑经纪人信息初始化",res);
                this.oldParemeter = Object.assign({}, res);
                this.paremeter = Object.assign({}, res);
                console.log(res.birthday,'jhhihho');
            })
            .catch((err)=>{});
        },
        //输入验证
        btKeyDown(e) {
        let flag = reg.test(e.target.value);
        //允许输入0
        if (!flag && "0" !== e.target.value + "") {
            e.target.value = "";
        }
        },
        //选择公司 打开弹窗
        f_selectCompany(){
            this.isSelectCompangList = true;
        },
        //选择公司  选取数据
        f_companyData(data){
            this.paremeter.compId = data.compId;
            this.paremeter.companyName = data.companyName;
            this.paremeter.simpleName = data.simpleName;
            this.paremeter.storeCode = data.storeNum;
        },
        //提交
        f_submit(){
            console.log(this.paremeter,'修改数据');
            //检查元素
            if(!this.f_getInspectParameterValue(this.paremeter)) return ;
            //未曾更改
            if( this.f_getJudgeObject(this.newParemeter,this.oldParemeter) ){
                this.$erpCommon.toast("数据没有更改..",'error');
                return
            }
            this.$erpConfirm({
                msg: "请确认是否要修改数据..",
            }).then(() => {
                //修改数据
                console.log(this.paremeter,'修改数据');
                     //调用保存接口
                     //处理时间
                    new SaveDistributionBrokerApi(new SaveDistributionBrokerRequest(this.paremeter)).send().then((res) => {
                        //操作成功,刷新列表
                        if (res.errCode == 200) {
                            //初始化父组件列表数据
                            this.$parent.topData();
                            this.$parent.initData();
                            console.log('成功了哈哈哈哈哈');
                            setTimeout(()=>{
                            this.$emit("f_closeView", true);
                            },300);
                            return 
                        }
                    });
            })
            .catch((err)=>{
                console.log(err);
            })
        },
        //检查元素
        f_getInspectParameterValue(el){
            console.log('进来了哈哈哈哈哈哈哈');
            // const el = this.parameter;
            console.log(el,'eeeeeeeeeee');
            if(!el.companyName){
                this.$erpCommon.toast("公司名称不能为空",'error');
                return false;
            }
            if(!el.borkerName){
                console.log('经纪人姓名不能为空');
                this.$erpCommon.toast("经纪人姓名不能为空",'error');
                return false;
            }
            if(!el.borkerPhone){
                this.$erpCommon.toast("联系电话不能为空",'error');
                return false;
            }

            if(el.borkerPhone.length != 11){
                this.$erpCommon.toast("电话号码不正确",'error');
                return false
            }
            if(!(/^[0-9]+$/.test(el.borkerPhone)) ){
                this.$erpCommon.toast("电话号码不正确",'error');
                return false
            }
            if( !(/^1[3456789]\d{9}$/.test(el.borkerPhone)) ){
                this.$erpCommon.toast("电话号码不正确",'error');
                return false
            }

            return true
        },
        //取消
        f_cancel(){
            if( this.f_getJudgeObject(this.newParemeter,this.oldParemeter) ){
                setTimeout(()=>{
                    this.$emit("f_closeView", true);
                },300);
                return 
            }
            this.$erpConfirm({
                msg: "你修改了数据,退出将不会有任何更改,确认要退出吗? ",
            }).then(() => {
                setTimeout(()=>{
                    this.$emit("f_closeView", true);
                },300)
            })
            .catch(()=>{})
        },
        //判断 对象是否改变
        f_getJudgeObject(newVal,oldVal){
            return new JudgeObjectIsEqult().deepEqual(newVal,oldVal);
        },
        //关闭弹窗
        f_closeView(){
            this.isSelectCompangList = false;
        }
    },
}
</script>
<style scoped lang="less">
 /ddep/.el-input__inner{
    font-family:"Microsoft";
	font-size: 0.14rem;
}
.g_checkBoxGroup{
    min-width: 1.7rem;
    height:0.3rem;
    display: flex;
    justify-content: flex-start;
    align-items: center;
}
.g_textareaWidth{
	width: 7.34rem!important;
	height: 1.09rem!important;
    padding:0.08rem!important;
    font-family:"Microsoft" !important;
    font-size: 0.14rem;
    box-sizing: border-box;
    border-style: none;
    border: 1px solid #bdc6cf;
    border-radius: .03rem;
    color: #444444;
}
.u_textareaGroup{
    width:8.4rem!important;
	height: 1.1rem!important;
}
.u_groupDisplaycontent{
    display: flex;
    justify-content: flex-start;
    align-items: center;
	font-family:"Microsoft" !important;
	color: #444444;
	width: 1.7rem;
	height: 0.3rem;
    font-size: 0.14rem;
    box-sizing: border-box;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
}
.u_important{
    margin: 0 0.085rem;
    height: 100%;
    line-height: 0.3rem;
    color: #ff0000;
	width: 0.05rem;
	font-family: SimSun;
	font-size: 0.12rem;
}
.u_groupSelectInput{
	width: 1.7rem;
	height: 0.3rem;
    font-family:"Microsoft" !important;
    font-weight: normal!important;
	font-size: 0.14rem;
	background-color: #fdfdfd;
	box-shadow: inset 0rem 0rem 0.02rem 0rem rgba(253, 253, 253, 0.6);
	border-radius: 0.03rem;
	border: solid 0.01rem #bdc6cf;
    padding: 0 0.05rem;
    box-sizing: border-box;
    color: #444444;
}
.input_bcg{
    background-color: #eeeeee;
}
.secoundTitle{
    padding-left: 0.05rem!important;
}
.firstTitle{
	font-family: MicrosoftYaHei;
    line-height: 0.3rem;
	font-size: 0.14rem;
	color: #444444;
    /* text-align:justify;
    text-justify:distribute-all-lines;
    text-align-last:justify; */
    text-align: right;
    margin-left:0.05rem;
    width: 0.85rem;
    height: 100%;
    padding-left: 0.2rem;
    box-sizing: border-box;
    position: relative;
    font-size: 0.14rem;
}
.u_title{
    margin-left:0.05rem;
    width: 0.85rem;
    line-height:0.3rem;
    height: 100%;
	font-family: MicrosoftYaHei;
	font-size: 0.14rem;
	color: #444444;
    text-align:justify;
    text-justify:distribute-all-lines;
    text-align-last:justify;
}
.u_group{
    width: max-content;
    height: 0.3rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.1rem;

    float: left;
    width: 2.8rem;
}
.firstGroup{
    width: 8.7rem;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: flex-start;
    

    display: block;
    float: left;
    font-size: 0.14rem;
}
.g_topLine{
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 0.3rem;
    margin-top: 0.45rem;
}
.g_content{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    overflow-x: hidden;
    overflow-y: auto;
}
.u_cancel{
    background-color: #F3F3F3;
	color: #666666;
    border: 1px solid#DDD;
    box-sizing: border-box;
    cursor: pointer;
}
.u_submit{
    border: 1px solid #238aff;
    box-sizing: border-box;
    background-color: #489EFF;
	color: #ffffff;
    cursor: pointer;
}
.g_btn{
    padding: 0.06rem 0.2rem;
    margin-left: 0.15rem;
    border-radius: 0.03rem;
}
.g_btnList{
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
	font-family: SimSun;
	font-size: 0.12rem;
}
.u_content{
    padding: 0.11rem 0.08rem;
	font-family: SimSun;
	font-size: 0.14rem;
	color: #666666;
    white-space: nowrap;
}
.g_bootom{
	width: 100%;
	height: 0.03rem;
	background-color: #ff5a1f;
}
.g_nav{
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
}
.g_navListTop{
    width: 100%;
    padding: 0 0.25rem;
    height: 0.4rem;
    background-color: #ffffff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    border-bottom: 1px solid rgba(102, 102, 102, 0.3);
}
.g_biggest{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 99;
    background-color: #fafafa;
}
</style>

<style lang="less">
// elementUI 单选框
.g_checkBoxGroup .el-radio{
    margin-right: 20px!important;
}
.g_checkBoxGroup .el-radio__inner::after{
    width: 5px!important;
    height: 5px!important;
    background-color: #409EFF!important;
}
.g_checkBoxGroup .el-radio__label{
    padding-left: 5px!important;
}
.g_checkBoxGroup .el-radio__input.is-checked .el-radio__inner{
    background-color: #ffffff!important;
}

.u_group .el-input--small .el-input__inner{
    height: 0.3rem!important;
    line-height: 30px!important;
    font-family:"Microsoft" !important;
}
.u_group .el-input__inner{
    border-color: #bdc6cf!important;
}
.u_group .el-date-editor.el-input{
    width: 1.7rem!important;
}
.el-input--prefix .el-input__inner {
     padding-left: 6.67px!important;
     font-size: 0.14rem!important;
     font-family: '微软雅黑'!important;
     color: #444444;
}
.el-date-editor {
  .el-input__prefix {
      .el-icon-date {
        display: none;
      }
    }
}
</style>










