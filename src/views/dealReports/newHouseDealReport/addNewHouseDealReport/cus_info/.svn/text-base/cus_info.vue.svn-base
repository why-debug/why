<template>
  <div class="cus_info">
    <main>
      <form_header :title="title" />
      <el-form :rules="rules" :inline="true" :model="cus_info" class="demo-form-inline">
        <section class="s_1">
          <el-form-item prop="dealPerson">
            <div class="input_title required" ><span>成</span><span>交</span><span>人</span></div>
            <el-select placeholder=" " v-model="cus_info.dealUserOrganizationName">
              <el-option label="张三" value="shanghai"></el-option>
              <el-option label="李四" value="beijing"></el-option>
            </el-select>
            <el-select placeholder=" " v-model="cus_info.dealUserName">
              <el-option label="李四" value="shanghai"></el-option>
              <el-option label="王五" value="beijing"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item v-if="getReportType==2">
            <div class="input_title"><span>分</span><span>销</span><span>公</span><span>司</span></div>
            <el-autocomplete
              v-model="cus_info.distributionCompName"
              :fetch-suggestions="querySearch"
              placeholder="请输入内容"
              :trigger-on-focus="false"
              @select="handleSelect"
            ></el-autocomplete>
          </el-form-item>
        </section>
        <section class="s_2">
          <div class="relate_cus" @click="openCustList"> 
          <!-- <div class="relate_cus" @click="addForm"> -->
            <div class="icon"></div> 
            <div class="text">关联客户</div>
          </div>
        </section>
      </el-form>

      <el-form v-for="(item, i) in cus_info.reporCustListVOs" :key="i" :inline="true" :model="item" class="demo-form-inline cus_info_list">
        <div class="del_form" @click="delForm(i)"></div>
        <section class="s_3">
          <el-form-item prop="cusType">
            <div class="input_title required"><span>客</span><span>户</span><span>类</span><span>型</span></div>
            <el-select placeholder=" " v-model="item.custType">
              <el-option label="个人" value="1"></el-option>
              <el-option label="企业" value="2"></el-option>
            </el-select>
          </el-form-item>
          <!-- 个人版 -->
          
          <el-form-item class="personal" v-if="item.custType==1">
            <div class="input_title required"><span>客</span><span>户</span><span>姓</span><span>名</span></div>
            <el-select placeholder=" " v-model="item.custClass">
              <el-option label="本人" value="1"></el-option>
              <el-option label="丈夫" value="2"></el-option>
              <el-option label="妻子" value="3"></el-option>
              <el-option label="亲属" value="4"></el-option>
              <el-option label="朋友" value="5"></el-option>
              <el-option label="儿子" value="6"></el-option>
              <el-option label="同学" value="7"></el-option>
              <el-option label="其他" value="8"></el-option>
            </el-select>
            <el-input v-model="item.custName" maxlength="15" prop="cardType" :rules="{required: true, message: '客户姓名不能为空', trigger: 'blur'}"></el-input>
          </el-form-item>

          <el-form-item class="personal" v-if="item.custType==1">
            <el-radio-group v-model="item.custSex" size="medium">
              <el-radio border value="1" label="先生"></el-radio>
              <el-radio border value="0" label="女士"></el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item class="personal" v-if="item.custType==1">
            <div class="input_title required"><span>地</span><span>域</span></div>
            <el-select v-model="item.territory">
              <el-option label="大陆" value="shanghai"></el-option>
              <el-option label="海外" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <!-- 企业版 -->
          <el-form-item class="corporate" v-if="item.custType==2" prop="enterpriseName">
            <div class="input_title required"><span>企</span><span>业</span><span>名</span><span>称</span></div>
            <el-input v-model="item.custCompName"></el-input>
          </el-form-item>

          <el-form-item class="corporate" v-if="item.custType==2">
            <div class="input_title"><div class="long_title">营业执照号码</div></div>
            <el-input v-model="item.businessLicenseNo"></el-input>
          </el-form-item>
        </section>
        <!-- 企业客户单独 -->
        <section class="s_4" v-if="item.custType==2">
          <el-form-item>
            <div class="input_title"><span>法</span><span>人</span><span>姓</span><span>名</span></div>
            <el-input v-model="item.custName" placeholder="审批人"></el-input>
            <el-radio-group v-model="item.custSex" size="medium">
              <el-radio border label="男">先生</el-radio>
              <el-radio border label="女">女士</el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item>
            <div class="input_title required"><span>地</span><span>域</span></div>
            <el-select  v-model="item.territory">
              <el-option label="大陆" value="shanghai"></el-option>
              <el-option label="海外" value="beijing"></el-option>
            </el-select>
          </el-form-item>
        </section>

        <section class="s_5">
          <el-form-item prop="cardType">
            <div class="input_title required"><span>证</span><span>件</span><span>号</span></div>
            <el-select  v-model="item.iccodeType">
              <el-option label="身份证" value="1"></el-option>
              <el-option label="护照" value="2"></el-option>
              <el-option label="军官证" value="3"></el-option>
              <el-option label="士兵证" value="4"></el-option>
              <el-option label="回乡证" value="5"></el-option>
              <el-option label="台胞证" value="6"></el-option>
            </el-select>
            <el-input v-model="item.custlccode"></el-input>
          </el-form-item>

          <el-form-item>
            <div class="input_title"><span>户</span><span>籍</span></div>
            <el-select placeholder=" " v-model="item.belonged">
              <el-option label="深户" value="1"></el-option>
              <el-option label="非深户" value="2"></el-option>
            </el-select>
            <el-select class="belonged" placeholder="暂无数据" v-model="item.belongedProvince">
              <el-option v-for="(item, i) in getProvinceList" :key="i" :label="item.provinceName" :value="item.provinceId"></el-option>
            </el-select>
          </el-form-item>
        </section>

        <section class="s_6">
          <el-form-item  v-for="(tel, index) in item.reportCustMobiles" :key="index" :index="index">
            <div class="input_title"><span>电</span><span>话</span></div>
            <el-select placeholder="暂无数据" v-model="tel.mobileType">
              <el-option label="手机" value="1"></el-option>
              <el-option label="座机" value="2"></el-option>
            </el-select>
            <!-- <el-input v-model="tel.custMobile"></el-input> -->
            <el-input @keydown.native="btKeyDown"  @keyup.native="btKeyDown" maxlength="11" v-model.number="tel.custMobile" >
            </el-input>
            <div v-if="index>0" class="del_icon" @click="delTel(i, index, tel.id)"></div>
          </el-form-item>
          <div class="add_icon" @click="addTel(i)"></div>
        </section>

        <section class="s_7">
          <el-form-item>
            <div class="input_title"><span>联</span><span>系</span><span>地</span><span>址</span></div>
            <el-select @change="getCityList(item.linkCountryId)" placeholder=" " v-model="item.linkCountryId">
              <el-option v-for="(item, i) in getCountryList" :key="i" :label="item.cnName" :value="item.id"></el-option>
            </el-select>
            <el-select placeholder=" " v-model="item.linkCityId">
              <el-option v-for="(item, i) in city_list" :key="i" :label="item.cityName" :value="item.cityId"></el-option>
            </el-select>
            <el-input v-model="item.linkAddr"></el-input>
          </el-form-item>
        </section>

        <section class="s_8">
          <el-form-item>
            <div class="input_title"><span>产</span><span>权</span><span>比</span><span>例</span></div>
            <!-- <el-input v-model="item.proportion">
            </el-input> -->
             <el-input @keydown.native="btKeyDown"  @keyup.native="btKeyDown" maxlength="2" v-model.number="item.proportion" >
            </el-input>
          </el-form-item>

          <el-form-item>
            <div class="input_title"><span>客</span><span>户</span><span>来</span><span>源</span></div>
            <el-select placeholder="无选项" v-model="item.custSource">
              <el-option label="万元" value="shanghai"></el-option>
              <el-option label="亿元" value="beijing"></el-option>
            </el-select>
          </el-form-item>
        </section>
        
        <section class="s_9">
          <el-form-item prop="desc">
            <div class="input_title"><span>备</span><span>注</span></div>
            <el-input 
              resize="none"
              type="textarea"
              maxlength="1000"
              rows="5"
              show-word-limit
              v-model="item.custNote"
              placeholder="请输入备注信息"
              ></el-input>
          </el-form-item>
        </section>
      </el-form>
    </main>
    <cust_list v-if="cust_list_show"  @closeView="closePopup"/>
  </div>
</template>

<script>
import form_header from '../../components/form_header'
import GetInitInfo from '../../../../../net/newHouseDealReport/add/selection/GetInitInfo'
import cust_list from '../../components/cus_info_components/cust_list'
import GetDistributionCompanyList from '../../../../../net/newHouseDealReport/add/selection/GetDistributionCompanyList'
import {CreateCommonRules} from '../utils/Rules'
import { ReportInfoDetailItem } from "../../../../../net/newHouseDealReport/display/reporInfoDetail";
const reg = /^[1-9]\d{0,11}$/;
export default {
  components: {
    form_header, cust_list
  }, 
  data() {
    return { 
      rules:this.setCommonRules(),  //验证规则
      title:'客户信息', 
      select_country:'', 
      select_city:'', 
      cust_list_show: false, 
      city_list:[], 
      cus_info: {
        dealUserOrganizationId: '', 
        dealUserOrganizationName: '', 
        dealUserId: '', 
        reporCustListVOs:[]
      }, 
    }
  }, 
  props: {
    initData: {
      type: Object,
      default() {
        return new ReportInfoDetailItem();
      },
    },
  },
  created() {
      //编辑初始化数据
    this.initDetailInfo();
    this.$store.dispatch('common_store/getInitInfo')
  }, 
   watch: {
    initData:{
      handler:function(){
        this.initDetailInfo();
      },
      deep:true
    },
  }, 
  methods: {
    //将详情数据对应赋值
    initDetailInfo(){
      let info = this.cus_info;
      for(let item in info){
        info[item] = this.initData[item];
      }
      console.log(info,'这是客户信息初始化数据');
    },
    addForm() {
      this.cus_info.reporCustListVOs.push({
        // 客户类型
        custType:'1', 
        distributionCompId:'', 
        //------------个人客户-------------
        // 客户关系
        custClass:'', 
        //客户姓名
        custName:'', 
        // 客户性别
        custSex:'', 
        //---------企业客户------------
        //企业名称
        custCompName:'' ,
        //营业执照号码
        businessLicenseNo:'' ,
        //地域
        territory:'', 
        //-----------公有属性
        //证件类型
        iccodeType:'1', 
        //证件号
        custIccode:'', 
        //户籍所属
        belonged:'', 
        // 户籍省份
        belongedProvince:'', 
        //电话
        reportCustMobiles:[
          {custMobile: '', mobileType: '1'}, 
          
        ], 
        // 联系地址-国家
        linkCountryId:'', 
        // 联系地址-城市
        linkCityId:'', 
        // 联系地址-详细
        linkAddr:'', 
        // 产权比例
        proportion:'', 
        //客户来源
        custSource:'', 
        //备注
        custNote:'', 
      })
    },
    delForm(From_list_index) {
      this.cus_info.reporCustListVOs.splice(From_list_index, 1)
    }, 
    addTel(form_index) {
      this.cus_info_list[form_index].reportCustMobiles.push({
        value: '',
        key: Date.now()
      })
    }, 
    delTel(form_index, tel_index) {
      this.cus_info_list[form_index].reportCustMobiles.splice(tel_index, 1)
    }, 
    getCityList(country_id) {
      this.city_list= this.$store.state.common_store.city_list.filter(item => {
        return item.countryId== country_id
      })
    }, 
    //输入验证
    btKeyDown(e) {
      let flag = reg.test(e.target.value);
      //允许输入0
      if (!flag && "0" !== e.target.value + "") {
        e.target.value = "";
      }
    },
    //打开弹窗
    openCustList() {
      this.cust_list_show= true; 
      document.body.style.overflow = "hidden"; //禁止页面滚动
    }, 
    //关闭弹窗
    closePopup(){
      this.cust_list_show = false;
      document.body.style.overflow = ""; //禁止页面滚动
    },
    //表单验证
    setCommonRules() {
      let params= {
        dealPerson: ['required'], 
        enterpriseName: ['required'], 
        cusType: ['required'], 
        cardType: ['required'], 
      }; 
      return new CreateCommonRules(params).getCommonRules()
    },
    querySearch(queryString, callback) {
      let p= {
        compName: queryString
      }
      new GetDistributionCompanyList(p).send()
      .then(res => {
        callback(res)
      })
      .catch(res => {
        callback('网络错误')
      })
    }, 
    handleSelect() {}, 
    //saveCusData提交参数
    saveCusData(){
      this.$emit('cusInfo',this.cus_info)
    }
  }, 
  computed: {
    getCountryList() {
      return this.$store.state.common_store.country_list
    }, 
    getProvinceList() {
      return this.$store.state.common_store.province_list
    }, 
    getReportType() {
      return this.$store.state.add_new_hosue_report_store.project_info.reportType
    }

  }

}
</script>

<style lang="less" scoped>
  @select_width:0.85rem; 
/deep/ .el-select {
  width:@select_width!important; 
}
</style>

<style lang="less" scoped>
.cus_info {
  main {
    width: 10.24rem; margin:0 auto;
    /deep/  .el-form {
      &:nth-of-type(1) {
        &>.s_1 {
          .el-form-item {
            &:nth-of-type(1) {
              .el-select {
                &:nth-of-type(2) {
                  width: 1.98rem!important;
                }
                &:nth-of-type(3) {
                  margin-left: 0.08rem;
                  width: 0.96rem;
                }
              }
            }
            &:nth-of-type(2) {
              .el-input {
                width: 2.37rem;
              }
            }
          }
        }
        &>.s_2 {
          .relate_cus {
            width: 0.75rem; height: 0.15rem; display: flex; justify-content: space-between; align-items: center; 
            margin-left: 1.14rem; cursor: pointer;
            &:hover {
              color: #259cf3;
            }
            .icon {
              height: 0.15rem; width: 0.15rem; border-radius: 50%; background-position: center; background-size: contain; background-repeat: no-repeat; 
              background-image: url("../../../../../assets/images/public/add_200.png")
            }
          }
        }
      }
      &.cus_info_list {
        position: relative;
        &>.del_form {
          position: absolute; top: 0.075rem; left:0.43rem; 
          height: 0.15rem; width: 0.15rem; border-radius: 50%; background-position: center; background-size: contain; background-repeat: no-repeat; 
          background-image: url("../../../../../assets/images/public/delete_5_200.png"); 
          cursor: pointer;
        }
        &>section {
          &.s_3 {
            margin-top: 0;
            &>.el-form-item.personal {
              &:nth-of-type(2) {
                &>.el-form-item__content {
                  &>.el-select {
                    width: 0.6rem!important;
                  }
                  &>.el-input {
                    margin-left: 0.08rem;
                    width: 1.05rem;
                  }
                }
              }
              &:nth-of-type(3) {
                margin-left: 0.08rem; width: 1.28rem;
                &>.el-form-item__content {
                  &>.el-radio-group {
                    display: flex; justify-content: space-between; align-items: center; 
                    &>.el-radio {
                      display: block; width: 0.63rem; margin: 0!important; line-height: 0.28rem; 
                      &>span.el-radio__label {
                        line-height: 0.3rem;  
                      }
                    }
                  }
                }
              }
            }
            &>.el-form-item.corporate {
              &:nth-of-type(2) {
                margin-left: 0.28rem;
                &>.el-form-item__content {
                  &>.el-input {
                    width: 2.94rem;
                  }
                }
              }
              &:nth-of-type(3) {
                margin-left: 0.3rem;
                &>.el-form-item__content {
                  &>.input_title {
                    width: 0.825rem
                  }
                  &>.el-input {
                    margin-left: 1.055rem; width: 2.46rem;
                  }
                }
              }
            }
          }
      
          &.s_4 {
            &>.el-form-item {
              &:nth-of-type(1) {
                &>.el-form-item__content {
                  &>.el-input {
                    width: 1.3rem;
                  }
                  &>.el-radio-group {
                    display: flex; justify-content: flex-start; align-items: center; margin-left: 0.06rem;
                    &>.el-radio {
                      display: block; width: 0.63rem; margin: 0!important; line-height: 0.28rem; 
                      &:nth-of-type(2) {
                        margin-left: 0.1rem!important;
                      }
                      &>span.el-radio__label {
                        line-height: 0.3rem;  
                      }
                    }
                  }
                }
              }
              &:nth-of-type(2) {
                &>.el-form-item {
                  &>.el-form-item__content {
                    &>.el-input {
                      width: 1.8rem; margin-left: 0.08rem;
                    }
                  }
                }
              }
            }
          }
          
          &.s_5 {
            &>.el-form-item {
              &>.el-form-item__content {
                &>.el-input, &>.el-select.belonged {
                  width: 1.8rem!important; margin-left: 0.08rem;
                }
              }
            }
          }
      
          &.s_6 {
            position: relative;
            &>.el-form-item {
              display: block; margin-bottom: 0.1rem; width: 3.77rem;
              &>.el-form-item__content {
                position: relative;
                &>.el-input {
                  width: 1.8rem; margin-left: 0.08rem;
                }
                &>.del_icon {
                  position: absolute; right:0; transform: translateY(-50%); top:50%; width: 0.18rem; height: 0.18rem;
                  background-position: center; background-size: contain; background-image: url("../../../../../assets/images/public/delete_5_200.png"); 
                }
              }
            }
            &>.add_icon {
              position: absolute; left: 4.25rem; top:0.06rem; width: 0.18rem; height: 0.18rem;
              background-position: center; background-size: contain; background-image: url("../../../../../assets/images/public/add_200.png"); 
            }
          }
      
          &.s_7 {
            &>.el-form-item {
              &>.el-form-item__content {
                &>.el-select:nth-of-type(3) {
                  margin-left: 0.08rem;
                }
                &>.el-input {
                  width: 3.83rem; margin-left: 0.08rem;
                }
              }
            }
          }
      
          &.s_8 {
            &>.el-form-item:nth-of-type(1) {
              &>.el-form-item__content {
                &>.el-input {
                  width: 2.72rem;
                  &::after {
                    content:'%'; position: absolute; right:0.09rem; font-size: 0.12rem; color: #999999;
                  }
                }
              }
            }
            &>.el-form-item:nth-of-type(2) {
              &>.el-form-item__content {
                &>.el-select {
                  width: 1.77rem!important;
                }
              }
            }
          }
      
          &.s_9 {
            &>.el-form-item {
              height: 1.1rem;
              &>.el-form-item__content {
                &>.el-input {
                  height: 1.1rem;
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
