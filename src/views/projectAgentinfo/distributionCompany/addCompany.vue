<template>
  <div class="g_addCompang">
    <div class="g_navListTop">
      <div class="g_nav">
        <div class="u_content">分销公司</div>
        <div class="g_bootom"></div>
      </div>
      <div class="g_btnList">
        <div class="g_btn u_submit" @click="f_submit">提交</div>
        <div class="g_btn u_cancel" @click="f_closeView">取消</div>
      </div>
    </div>
    <div class="g_content">
      <div class="g_topLine">
        <topDividingLine :title="title"></topDividingLine>
      </div>
      <div class="g_fromBiggest">
        <div class="firstGroup">
          <div class="u_group">
            <div class="firstTitle">公司名称:</div>
            <div class="u_important">*</div>
            <input
              v-model="parameter.companyName"
              class="u_groupSelect"
              type="text"
            />
          </div>
          <div class="u_group">
            <div class="secoundTitle">公司简称:</div>
            <div class="u_important"></div>
            <input
              v-model="parameter.simpleName"
              class="u_groupSelect"
              type="text"
            />
          </div>
          <div class="u_group">
            <div class="secoundTitle">门店码:</div>
            <div class="u_important"></div>
            <input
              v-model="parameter.storeCode"
              class="u_groupSelect"
              type="text"
            />
          </div>
          <div class="u_group">
            <div class="u_title">对方联系人:</div>
            <div class="u_important">*</div>
            <input
              v-model="parameter.themBorker"
              class="u_groupSelect"
              type="text"
            />
          </div>
          <div class="u_group">
            <div class="secoundTitle">联系人电话:</div>
            <div class="u_important">*</div>
            <input
              v-model="parameter.themPhone"
              class="u_groupSelect"
              maxlength="11"
              @keydown="btKeyDown"
             @keyup="btKeyDown"
            />
          </div>
          <div class="u_group">
            <div class="secoundTitle">公司地址:</div>
            <div class="u_important"></div>
            <input
              v-model="parameter.companyAddress"
              class="u_groupSelect"
              type="text"
            />
          </div>
          <div class="u_group">
            <div class="firstTitle">签约日期:</div>
            <div class="u_important"></div>
            <!-- <input v-model="parameter.signDate" class="u_groupSelect" type="text"> -->
            <el-date-picker
              v-model="parameter.signDate"
              type="date"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              placeholder="选择日期"
            >
            </el-date-picker>
          </div>
          <div class="u_group">
            <div class="secoundTitle">我司对接人:</div>
            <div class="u_important"></div>
            <div>
              <!-- <selectPickUpPeople :defaultText="parameter.ourBorker"></selectPickUpPeople> -->
              <el-input
                disabled
                :style="{ width: '1.7rem'}"
                suffix-icon="el-icon-arrow-down"
                v-model="parameter.ourBorker"
                @click.native="selsecPerson"
              ></el-input>
            </div>
          </div>
        </div>
        <div class="secoundGroup">
          <div class="u_group">
            <div class="firstTitle">开户行:</div>
            <div class="u_important"></div>
            <!-- <input v-model="parameter.initCardBank" class="u_groupSelect" type="text"> -->
            <el-select
              v-model="parameter.initCardBank"
              @change="bankChange"
              placeholder="请选择"
            >
              <el-option
                v-for="item in bankList"
                :key="item.bankId"
                :label="item.bankName"
                :value="{ id: item.bankId, name: item.bankName }"
              >
              </el-option>
            </el-select>
          </div>
          <div class="u_group">
            <div class="secoundTitle">开户支行:</div>
            <div class="u_important"></div>
            <!-- <input v-model="parameter.detailCardBank" class="u_groupSelect" type="text"> -->
            <el-select
              v-model="parameter.detailCardBank"
              @change="branchBankChange(parameter.detailCardBank)"
              :disabled="this.newParemeter.bankId === ''"
              placeholder="请选择"
            >
              <el-option
                v-for="item in getBranchList"
                :key="item.accountOpeningBranchId"
                :label="item.accountOpeningBranchName"
                :value="item.accountOpeningBranchName"
              >
              </el-option>
            </el-select>
          </div>
          <div class="u_group">
            <div class="secoundTitle">户名:</div>
            <div class="u_important"></div>
            <input
              v-model="parameter.CardBank"
              class="u_groupSelect"
              type="text"
            />
          </div>
          <div class="u_group u_widthGroup">
            <div class="firstTitle" style="padding-right:0.05rem;">
              账号
              <div class="g_groupColon">:</div>
            </div>
            <div class="u_important"></div>
            <input
              v-model="parameter.CardNumber"
              class="u_groupSelect g_inputFirestWidth"
              type="text"
            />
          </div>
          <div class="g_checkBoxGroup">
            <el-radio-group v-model="parameter.publicToPrivate">
              <el-radio :label="1">对公</el-radio>
              <el-radio :label="2">对私</el-radio>
            </el-radio-group>
          </div>
          <div class="u_group u_textareaGroup" style="display:block">
            <div class="firstTitle" style="padding-right:0.05rem;float:left;">
              备&nbsp;&nbsp;注:
            </div>
            <div class="u_important" style="float:left;"></div>
            <textarea
              v-model="parameter.desc"
              class="u_groupSelect g_textareaWidth"
              style="float:left;"
            ></textarea>
          </div>
        </div>
        <div class="otherAnnex">
          <div class="fristAnnex">
            <div class="annexTitle">
              <div
                class="u_group AnnexType"
                style="padding-left:0.16rem;box-sizing:border-box"
              >
                公司营业执照上传 :
              </div>
              <!-- <div class="uploadAnnex"><img class="uploadIcon" src="../../../assets/images/projectAgentInfo/contract/Annex.png">上传附件</div> -->
              <div class="basic_item_add">
                <fileInfoBase
                  @updateFlieList="updateBusinessFlieList"
                  key="updateBusinessFlieList"
                ></fileInfoBase>
              </div>
            </div>
            <div class="annexList">
              <div
                class="annex"
                v-for="(item, index) in businessLicenseList"
                :key="index"
              >
                <div class="u_annex">
                  <fileBox
                    :fileName="item.enclosureName"
                    :fileSizeCn="item.attachmentSize"
                    :filePathUrl="item.enclosurePath"
                    @delFile="delFile(index, 1)"
                  ></fileBox>
                </div>
                <!-- <fileInfoBase @updateFlieList="updateFlieList" :fileList="businessLicenseList"></fileInfoBase> -->
              </div>
            </div>
          </div>
          <div class="fristAnnex">
            <div class="annexTitle">
              <div
                class="u_group AnnexType"
                style="padding-left:0.45rem;box-sizing:border-box"
              >
                合作协议上传 :
              </div>
              <!-- <div class="uploadAnnex"><img class="uploadIcon" src="../../../assets/images/projectAgentInfo/contract/Annex.png">上传附件</div> -->
              <div class="basic_item_add">
                <fileInfoBase
                  @updateFlieList="updatecooperationFlieList"
                  key="updatecooperationFlieList"
                ></fileInfoBase>
              </div>
            </div>
            <div class="annexList">
              <div
                class="annex"
                v-for="(item, index) in cooperationAgreementList"
                :key="index"
              >
                <div class="u_annex">
                  <fileBox
                    :fileName="item.enclosureName"
                    :fileSizeCn="item.attachmentSize"
                    :filePathUrl="item.enclosurePath"
                    @delFile="delFile(index, 2)"
                  ></fileBox>
                </div>
                <!-- <fileInfoBase @updateFlieList="updateFlieList" :fileList="cooperationAgreementList"></fileInfoBase> -->
              </div>
            </div>
          </div>
          <div class="fristAnnex">
            <div class="annexTitle">
              <div class="u_group AnnexType">银行开户许可证上传 :</div>
              <!-- <div class="uploadAnnex"><img class="uploadIcon" src="../../../assets/images/projectAgentInfo/contract/Annex.png">上传附件</div> -->
              <div class="basic_item_add">
                <fileInfoBase
                  @updateFlieList="updateBankFlieList"
                  key="updateBankFlieList"
                ></fileInfoBase>
              </div>
            </div>
            <div class="annexList">
              <div
                class="annex"
                v-for="(item, index) in bankLicenseList"
                :key="index"
              >
                <div class="u_annex">
                  <fileBox
                    :fileName="item.enclosureName"
                    :fileSizeCn="item.attachmentSize"
                    :filePathUrl="item.enclosurePath"
                    @delFile="delFile(index, 3)"
                  ></fileBox>
                </div>
                <!-- <fileInfoBase @updateFlieList="updateFlieList" :fileList="bankLicenseList"></fileInfoBase> -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import { RadioGroup, Select } from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import topDividingLine from "../../../components/form/topDividingLine";
import addAnnex from "./components/addAnnex";
import fileBox from "../../../components/form/fileBox";
import fileInfoBase from "../fileInfoBase/fileInfoBase";
import selectPickUpPeople from "../form/selectPickUpPeople";
import {
  PortRequestParameter,
  AddCompanyRequestParameter,
  AddCompanyDetails,
} from "../../../net/projectAgentinfo/companyRequest/AddCompangRequest";
import {
  GetCompanyDetailsList,
  GetListOfBankList,
  GetListOfBankParameter,
  GetBranchListParameter,
  GetBranchList,
} from "../../../net/projectAgentinfo/companyRequest/GetCompanyDetails";
import { JudgeObjectIsEqult } from "../../../utils/Common"; // 判断属性书否更改
import { ErpCommon } from "../../../utils/ErpCommon";
const reg = /^[1-9]\d{0,11}$/;

Vue.use(RadioGroup);
export default {
  data() {
    return {
      radioValue: 1, //单选项
      detailCardBank: {
        id: "",
        name: "",
      }, //开户支行
      parameter: new AddCompanyRequestParameter(), //参数
      //选择我司对接人给erp传值参数
      selectPersonParms: {
        userId: "",
        userName: "",
        organizationId: "",
        organizationName: "",
        selectType: 1, //1选人，2选组织
      },
      title: "新增-分销公司",
      oldParemeter: {},
      newParemeter: {},
      isEditstatu: this.statu || 1,
      bankList: [], //银行列表
      getBranchList: [], //支行列表

      businessLicenseList: [], //营业执照列表
      cooperationAgreementList: [], //合作协议
      bankLicenseList: [], //银行开户许可证列表
    };
  },
  props: {
    statu: {
      type: Number,
      default: 1,
    },
    companyId: {
      type: Number,
      default: 0,
    },
  },
  components: {
    topDividingLine,
    addAnnex,
    selectPickUpPeople,
    fileBox,
    fileInfoBase,
  },
  created() {
    if (this.isEditstatu == 2) {
      this.f_editInitData();
      this.title = "编辑-分销公司";
    }
    this.ischange = false;
    this.getBankList();
  },
  watch: {
    parameter: {
      handler(newVal,oldVal) {
        this.newParemeter = newVal;
      },
      deep: true,
    },
  },
  methods: {
    //获取银行、支行列表
    getBankList() {
      //获取银行列表
      //请求参数
      let bankParams = { bankName: "" };
      new GetListOfBankList(new GetListOfBankParameter(bankParams))
        .send()
        .then((res) => {
          console.log("银行数据:", res);
          this.bankList = res;
        })
        .catch((err) => {
          console.log("服务器开了个小差，重稍后重试");
        });
    },
    //编辑初始化
    f_editInitData() {
      const parameterValue = {
        compId: this.companyId,
      };
      console.log(this.companyId, "这是公司id");
      new GetCompanyDetailsList(parameterValue)
        .send()
        .then((res) => {
          this.oldParemeter = Object.assign({}, res);
          this.parameter = Object.assign({}, res);
          this.divideEnclosure(this.parameter.annexList);
          console.log(this.parameter.annexList, "这是附件数据");
        })
        .catch((err) => {
          console.log(err);
        });
    },
      //输入验证
    btKeyDown(e) {
      let flag = reg.test(e.target.value);
      //允许输入0
      if (!flag && "0" !== e.target.value + "") {
        e.target.value = "";
      }
    },
    //添加公司营业执照附件
    updateBusinessFlieList(data) {
      console.log(data, "添加公司营业执照附件");
      if (!data) return;
      if ("add" == data.type) {
        //新增附件
        let item = data.fileItem;
        let obj = {};
        obj.attachmentSize = item.fileSizeCn;
        obj.enclosureName = item.fileName;
        obj.enclosurePath = item.filePathUrl;
        obj.type = 3;
        this.businessLicenseList.push(obj);
      }
      // if('del' == data.type){
      //   //删除附件
      //   this.fileList.splice(data.index,1);
      // }
    },
    //添加合作协议附件
    updatecooperationFlieList(data) {
      console.log(data, "添加合作协议附件");
      if (!data) return;
      if ("add" == data.type) {
        //新增附件
        let item = data.fileItem;
        let obj = {};
        obj.attachmentSize = item.fileSizeCn;
        obj.enclosureName = item.fileName;
        obj.enclosurePath = item.filePathUrl;
        obj.type = 4;
        this.cooperationAgreementList.push(obj);
      }
      // if('del' == data.type){
      //   //删除附件
      //   this.fileList.splice(data.index,1);
      // }
    },
    //添加银行开户许可证附件
    updateBankFlieList(data) {
      console.log(data, "添加银行开户许可证附件");
      if (!data) return;
      if ("add" == data.type) {
        //新增附件
        let item = data.fileItem;
        let obj = {};
        obj.attachmentSize = item.fileSizeCn;
        obj.enclosureName = item.fileName;
        obj.enclosurePath = item.filePathUrl;
        obj.type = 5;
        this.bankLicenseList.push(obj);
      }
      // if('del' == data.type){
      //   //删除附件
      //   this.fileList.splice(data.index,1);
      // }
    },
    //将附件分类
    divideEnclosure(arr) {
      for (let item of arr) {
        if (item.type == 3) {
          this.businessLicenseList.push(item);
        } else if (item.type == 4) {
          this.cooperationAgreementList.push(item);
        } else if (item.type == 5) {
          this.bankLicenseList.push(item);
        }
      }
    },
    //将所有附件添加到统一annexList数组中
    addAnnexList(arr) {
      for (let item of arr) {
        this.parameter.annexList.push(item);
      }
    },
    //删除附件资料
    delFile(index, num) {
      console.log(index, "点击删除了");
      if (num == 1) this.businessLicenseList.splice(index, 1);
      if (num == 2) this.cooperationAgreementList.splice(index, 1);
      if (num == 3) this.bankLicenseList.splice(index, 1);
    },
    //选择我司对接人
    //选择相关人员
    selsecPerson() {
      this.selectPersonParms.userId = this.parameter.ourDockingPersonId;
      this.selectPersonParms.userName = this.parameter.ourBorker;
      let info = new ErpCommon().openPerformanceAssignee(
        this.selectPersonParms
      );
      if (info == "") return;
      let val = JSON.parse(info);
      this.parameter.ourDockingPersonId = val.userId || "";
      this.parameter.ourBorker = val.userName || "";
      this.parameter.ourDockingPersonMobile = val.userMobile || "";
      console.log(this.parameter.ourDockingPersonId,info, "这是我司对接人信息");
    },
    //开户行change
    bankChange(val) {
      this.newParemeter.bankId = val.id;
      this.newParemeter.initCardBank = val.name;
      if(this.newParemeter.bankId !== ''){
          this.branchBankList();
      }
    },
    //获取支行列表
     branchBankList(){
      //获取支行列表
      //请求参数
      let branchParams = { bankId: "", bankName: "" };
      branchParams.bankId = this.newParemeter.bankId;
      new GetBranchList(new GetBranchListParameter(branchParams))
        .send()
        .then((res) => {
          console.log("支行数据:", res);
          this.getBranchList = res;
        })
        .catch((err) => {
          console.log("服务器开了个小差，重稍后重试");
        });
     },
    //开户支行change
    branchBankChange(val) {
      if (this.newParemeter.bankId === "") {
        this.$erpCommon.toast("请选择开户行", "error");
        return;
      }
      console.log(val,'这是支行');
      this.getBranchList.forEach(key=>{
        if(key.accountOpeningBranchName == val){
          this.newParemeter.accountOpeningBranchId = key.accountOpeningBranchId;
        }
      })
      console.log('只是支行id',this.newParemeter.accountOpeningBranchId);
      this.newParemeter.detailCardBank = val;
    },
    //提交
    f_submit() {
      //处理数据
      if (!this.f_getInspectParameterValue()) {
        return;
      }
      //未曾更改
      if (this.f_getJudgeObject(this.newParemeter, this.oldParemeter)) {
        this.$erpCommon.toast("数据没有更改..", "error");
        return;
      }
      if (this.isEditstatu == 2) {
        this.$erpConfirm({
          msg: "请确认是否要修改数据..",
        })
          .then(() => {
            //修改数据
            console.log(this.newParemeter, "修改数据");
            //将所有附件数据添加到annexList数组中
            this.parameter.annexList = [];
            this.addAnnexList(this.businessLicenseList);
            this.addAnnexList(this.cooperationAgreementList);
            this.addAnnexList(this.bankLicenseList);
            //处理时间
            new AddCompanyDetails(new PortRequestParameter(this.newParemeter))
              .send()
              .then((res) => {
                //操作成功,刷新列表
                if (res.errCode == 200) {
                  //初始化父组件列表数据
                  this.$parent.topData();
                  this.$parent.initData();
                  console.log("成功了哈哈哈哈哈");
                  setTimeout(() => {
                    this.$emit("f_closeView", true);
                  }, 300);
                  return;
                }
              });
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        new AddCompanyDetails(new PortRequestParameter(this.newParemeter))
          .send()
          .then((res) => {
            //操作成功,刷新列表
            if (res.errCode == 200) {
              //初始化父组件列表数据
              this.$parent.topData();
              this.$parent.initData();
              this.$erpCommon.toast("保存成功");
              console.log("成功了哈哈哈哈哈");
              setTimeout(() => {
                this.$emit("f_closeView", true);
              }, 300);
              return;
            }
          });
      }
    },
    //检查元素
    f_getInspectParameterValue() {
      const el = this.parameter;
      if (!el.companyName) {
        this.$erpCommon.toast("公司名称不能为空", "error");
        return false;
      }
      if (!el.themBorker) {
        this.$erpCommon.toast("对方联系人不能为空", "error");
        return false;
      }
      if (!el.themPhone) {
        this.$erpCommon.toast("联系电话不能为空", "error");
        return false;
      }
      if (el.themPhone.length != 11) {
        this.$erpCommon.toast("电话号码不正确", "error");
        return false;
      }
      if (!/^[0-9]+$/.test(el.themPhone)) {
        this.$erpCommon.toast("电话号码不正确", "error");
        return false;
      }
      if (!/^1[3456789]\d{9}$/.test(el.themPhone)) {
        this.$erpCommon.toast("电话号码不正确", "error");
        return false;
      }

      return true;
    },
    //关闭弹窗
    f_closeView() {
      //未曾修改
      if (this.f_getJudgeObject(this.newParemeter, this.oldParemeter)) {
        setTimeout(() => {
          this.$emit("f_closeView", true);
          this.parameter = new AddCompanyRequestParameter();
          this.isEditstatu = 1;
        }, 300);
        return;
      }

      let text = "你已录入了信息";
      //编辑
      if (this.isEditstatu == 2) {
        text = "你已修改了数据";
      }
      this.$erpConfirm({
        msg: text + ",退出将不会有任何更改,请确认...",
      })
        .then(() => {
          setTimeout(() => {
            this.$emit("f_closeView", true);
            this.isEditstatu = 1;
            this.parameter = new AddCompanyRequestParameter();
          }, 300);
        })
        .catch(() => {});
    },
    //判断 对象是否改变
    f_getJudgeObject(newVal, oldVal) {
      return new JudgeObjectIsEqult().deepEqual(newVal, oldVal);
    },
  },
};
</script>
<style scoped>
/*修改滚动条样式*/
div::-webkit-scrollbar {
  width: 0.08rem;
  height: 0.08rem;
}
</style>
<style scoped lang="less">

/deep/.el-input.is-disabled .el-input__inner {
  background-color: #fff;
  cursor: pointer;
}
/* 置灰 */
.g_greyForbidOperate {
  border: 1px solid #bdbdbd;
  padding-left: 0.1rem;
  box-sizing: border-box;
  background-color: #e5e5e5;
  border-radius: 0.03rem;
  cursor: not-allowed;
}
.annex {
  width: 1.75rem;
  height: max-content;
  float: left;
}
.annexList {
  width: 7.52rem;
  min-height: 0.44rem;
  margin-left: 1.11rem;
  box-sizing: border-box;
  margin-top: 0.1rem;
  /*     
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: wrap; */

  float: left;
  display: block;
}
.uploadIcon {
  height: 0.12rem;
  margin-right: 0.05rem;
}
.uploadAnnex {
  font-family: SimSun;
  font-size: 0.12rem;
  color: #259cf3;
  display: flex;
  align-items: center;
  line-height: 0.35rem;
  height: 0.12rem;
  cursor: pointer;
}
.basic_item_add {
  width: 8.67rem;
  min-height: 1.3rem;
  margin-top: 0.1rem;
  height: auto;
  .fujian {
    height: 0.2rem;
    display: flex;
    align-items: center;
    font-family: SimSun;
    font-size: 0.12rem;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 0rem;
    color: #259cf3;
    .icon {
      width: 0.12rem;
      height: 0.13rem;
      margin-right: 0.05rem;
      background-image: url("../../../assets/images/projectAgentInfo/agentContract/fjHover_200.png");
      background-repeat: no-repeat;
      background-size: cover;
    }
  }
  .fujian_list {
    height: auto;
    display: flex;
    align-items: center;
    .wenjian_item {
      display: block;
      width: 1.78rem;
      height: 0.44rem;
      background-color: #f3f3f3;
      border-radius: 0.04rem;
      margin-right: 0.1rem;
      margin-top: 0.1rem;
      display: flex;
      align-items: center;
      .item_img {
        width: 0.24rem;
        height: 0.3rem;
        background-color: #ff5a1f;
        margin-left: 0.1rem;
      }
      .item_size {
        width: 1.2rem;
        height: 0.3rem;
        margin-left: 0.1rem;
        .w_title {
          font-family: MicrosoftYaHei;
          font-size: 0.12rem;
          font-weight: normal;
          font-stretch: normal;
          letter-spacing: 0rem;
          color: #444444;
        }
        .w_size {
          font-family: MicrosoftYaHei;
          font-size: 0.12rem;
          font-weight: normal;
          font-stretch: normal;
          letter-spacing: 0rem;
          color: #999999;
        }
      }
    }
  }
}
.annexTitle {
  /* display: flex;
    justify-content: flex-start;
    align-items:  center; */
  display: block;
  float: left;
  text-align: end;

  height: 0.3rem;
  font-family: MicrosoftYaHei;
  font-size: 0.14rem;
  color: #444444;
}
.AnnexType {
  width: 1.5rem !important;
  margin-bottom: 0 !important;
  /* justify-content: flex-end!important; */
  white-space: nowrap;
  text-align: end;
  margin-left: -0.53rem;
  margin-right: 0.15rem;
  letter-spacing: 0.01rem;
  font-size: 0.14rem;
  display: block;
  float: left;
  text-align: end;
}
.otherAnnex,
.fristAnnex {
  /* display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start; */
  margin-bottom: 0.2rem;

  width: 8.7rem;
  margin: 0 auto;
}
.u_textareaGroup {
  width: 8.47rem !important;
  height: 1.1rem !important;
  float: left;
  padding-right: 0.03rem;
}
.g_textareaWidth {
  width: 7.3rem !important;
  height: 1.09rem !important;
  padding: 0.08rem !important;
  box-sizing: border-box;
}
.g_groupColon {
  width: 0.02rem;
  position: absolute;
  height: 0.3rem;
  top: 0;
  left: 0.825rem;
  line-height: 0.3rem;
  font-size: 0.12rem;
}
.u_checkBox > span {
  margin-left: 0.02rem;
  font-family: MicrosoftYaHei;
  font-size: 0.14rem;
  color: #444444;
}
.g_checkBoxGroup {
  min-width: 1.2rem;
  height: 0.3rem;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-left: 0.5rem;

  float: left;
}
.g_inputFirestWidth {
  width: 4.5rem !important;
  margin-right: 0.02rem;
}
.u_widthGroup {
  width: 5.64rem !important;
}
.u_important {
  margin: 0 0.085rem;
  height: 100%;
  line-height: 0.3rem;
  color: #ff0000;
  width: 0.05rem;
  font-family: SimSun;
  font-size: 0.12rem;
}
.u_groupSelect {
  width: 1.7rem;
  height: 0.3rem;
  font-family:"Microsoft" !important;
  background-color: #fdfdfd;
  box-shadow: inset 0rem 0rem 0.02rem 0rem rgba(253, 253, 253, 0.6);
  border-radius: 0.03rem;
  border: solid 0.01rem #bdc6cf;
  padding: 0 0.05rem;
  box-sizing: border-box;
}
.firstTitle {
  font-family: MicrosoftYaHei;
  line-height: 0.3rem;
  font-size: 0.14rem;
  color: #444444;
  /* text-align:justify;
  text-justify:distribute-all-lines;
  text-align-last:justify; */
  text-align: right;
  margin-left: 0.05rem;
  width: 0.85rem;
  height: 100%;
  padding-left: 0.2rem;
  box-sizing: border-box;
  position: relative;

  white-space: nowrap;
  text-align: end;
}
.secoundTitle {
  font-family: MicrosoftYaHei;
  line-height: 0.3rem;
  font-size: 0.14rem;
  color: #444444;
  text-align: justify;
  text-justify: distribute-all-lines;
  text-align-last: justify;
  margin-left: 0.05rem;
  width: 0.85rem;
  height: 100%;
  padding-left: 0.1rem;
  box-sizing: border-box;

  white-space: nowrap;
  text-align: end;
}
.u_title {
  margin-left: 0.05rem;
  width: 0.85rem;
  line-height: 0.3rem;
  height: 100%;
  font-family: MicrosoftYaHei;
  font-size: 0.14rem;
  color: #444444;
  /* text-align:justify;
  text-justify:distribute-all-lines;
  text-align-last:justify; */
  text-align: right;
}
.u_group {
  width: max-content;
  height: 0.3rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.1rem;

  width: 2.8rem;
  float: left;
}
.firstGroup,
.secoundGroup {
  width: 8.7rem;
  height: auto;

  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: flex-start;

  clear: both;
  margin: 0 auto;
  display: block;
  font-size: 0.14rem;
}
.g_topLine {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 0.3rem;
  margin-top: 0.45rem;
}
.g_content {
  width: 100%;
  height: calc(100% - 0.7rem);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  overflow-x: hidden;
  overflow-y: auto;
}
.u_cancel {
  background-color: #f3f3f3;
  color: #666666;
  border: 1px solid#DDD;
  box-sizing: border-box;
}
.u_submit {
  border: 1px solid #238aff;
  box-sizing: border-box;
  background-color: #489eff;
  color: #ffffff;
}
.g_btn {
  padding: 0.06rem 0.2rem;
  margin-left: 0.15rem;
  border-radius: 0.03rem;
  cursor: pointer;
}
.g_btnList {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: SimSun;
  font-size: 0.12rem;
}
.u_content {
  padding: 0.11rem 0.08rem;
  font-family: SimSun;
  font-size: 0.14rem;
  color: #666666;
  white-space: nowrap;
}
.g_bootom {
  width: 100%;
  height: 0.03rem;
  background-color: #ff5a1f;
}
.g_nav {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}
.g_navListTop {
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
.g_addCompang {
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
// .g_checkBoxGroup .el-radio{
//     margin-right: 20px!important;
// }
// .g_checkBoxGroup .el-radio__inner::after{
//     width: 5px!important;
//     height: 5px!important;
//     background-color: #409EFF!important;
// }
// .g_checkBoxGroup .el-radio__label{
//     padding-left: 5px!important;
// }
// .g_checkBoxGroup .el-radio__input.is-checked .el-radio__inner{
//     background-color: #ffffff!important;
// }
// .u_group .el-input--small .el-input__inner{
//     height: 30px!important;
//     line-height: 25px!important;
// }
// .u_group .el-input__inner{
//     border-color: #bdc6cf!important;
// }
// .u_group .el-date-editor.el-input{
//     width: 1.7rem!important;
//     height: 100%;
// }

.g_checkBoxGroup .el-radio {
  margin-right: 20px !important;
}
.g_checkBoxGroup .el-radio__inner::after {
  width: 5px !important;
  height: 5px !important;
  background-color: #409eff !important;
}
.g_checkBoxGroup .el-radio__label {
  padding-left: 5px !important;
}
.g_checkBoxGroup .el-radio__input.is-checked .el-radio__inner {
  background-color: #ffffff !important;
}

.u_group .el-input--small .el-input__inner {
  height: 0.3rem !important;
  line-height: 30px !important;
  font-size: 0.14rem !important;
}
.u_group .el-input__inner {
  border-color: #bdc6cf !important;
}
.u_group .el-date-editor.el-input {
  width: 1.7rem !important;
}
.el-date-editor .el-icon-circle-close {
  display: none !important;
}
.el-input--prefix .el-input__inner {
  padding-left: 6.67px !important;
  font-size: 0.14rem !important;
  font-family: "微软雅黑" !important;
  color: #444444;
}
.el-select {
  width: 1.7rem !important;
  font-size: 0.14rem !important;
  font-family: "微软雅黑" !important;
  color: #444444 !important;
}
.el-date-editor {
  .el-input__prefix {
    .el-icon-date {
      display: none;
    }
  }
}

.u_annex {
  width: 1.78rem;
  height: 0.44rem;
  background-color: #ffffff;
  border-radius: 0.02rem;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  position: relative;
  flex-shrink: 1;
  margin-right: 0.16rem;
  margin-bottom: 0.1rem;
  float: left;
}
</style>
