<template>
  <!-- 新建二手成交报告 -->
  <div class="add-deal-report">
    <div class="a-d-r-top">
      <div class="left">新建二手成交报告</div>
      <div class="right">
        <div class="save" @click="saveIt()">保存</div>
        <div class="cancel">取消</div>
      </div>
    </div>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="rule-form">
      <!-- 成交报告信息 -->
      <div class="form-item-common">
        <top-title></top-title>
      </div>
      <div class="form-item-common form-item-box">
        <!-- 成交日期 -->
        <el-form-item class="form-item" prop="erpMlDeal.dealDate">
          <div class="label-title red">成交日期</div>
          <el-date-picker
            v-model="ruleForm.erpMlDeal.dealDate"
            type="date"
            :style="{'width': inputWidth1}"
            value-format="yyyy-MM-dd"
            placeholder
            @change="setEstimatedCommissionTime"
          ></el-date-picker>
        </el-form-item>
        <!-- 类型 -->
        <el-form-item class="form-item" prop="erpMlDeal.dealType">
          <div class="label-title red">类 型</div>
          <el-select
            v-model="ruleForm.erpMlDeal.dealType"
            :style="{'width': inputWidth1}"
            placeholder
            @change="setEstimatedCommissionTime"
          >
            <el-option
              v-for="item in dealTypeList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <!-- 类别 -->
        <el-form-item class="form-item" prop="erpMlDeal.category">
          <div class="label-title red">类 别</div>
          <el-select
            v-model="ruleForm.erpMlDeal.category"
            :style="{'width': inputWidth2}"
            placeholder="活动区域"
            @change="categoryChange"
          >
            <el-option
              v-for="item in categoryList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
          <el-input
            v-model="ruleForm.erpMlDeal.mainDealId"
            :style="{'width': inputWidth3, 'margin-left': '0.1rem','font-size':'0.1rem'}"
            :disabled="ruleForm.erpMlDeal.category !== 2"
            placeholder="事后加佣需选主单号"
          ></el-input>
        </el-form-item>
      </div>
      <div class="form-item-common form-item-box">
        <!-- 预收佣日期 -->
        <el-form-item class="form-item" prop="erpMlDeal.estimatedCommissionTime">
          <div class="label-title red">预收佣日期</div>
          <el-date-picker
            v-model="ruleForm.erpMlDeal.estimatedCommissionTime"
            type="date"
            :style="{'width': inputWidth1}"
            value-format="yyyy-MM-dd"
            placeholder
            :disabled="true"
          ></el-date-picker>
        </el-form-item>
        <!-- 合作方式 -->
        <el-form-item class="form-item" prop="erpMlDeal.cooperationType">
          <div class="label-title">合作方式</div>
          <el-select
            v-model="ruleForm.erpMlDeal.cooperationType"
            :style="{'width': inputWidth1}"
            placeholder
          >
            <el-option
              v-for="item in cooperationTypeList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <!-- 成交分行 -->
        <el-form-item class="form-item" prop="erpMlDeal.branchBankId">
          <div class="label-title red">成交分行</div>
          <el-select
            v-model="ruleForm.erpMlDeal.branchBankId"
            :style="{'width': inputWidth1}"
            placeholder
          >
            <el-option
              v-for="item in branchBankList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
      </div>
      <div class="form-item-common form-item-box">
        <!-- 成交人 -->
        <el-form-item class="form-item" prop="erpMlDeal.dealUserId">
          <div class="label-title red">成交人</div>
          <el-select
            v-model="ruleForm.erpMlDeal.dealUserId"
            :style="{'width': inputWidth1}"
            placeholder
          >
            <el-option
              v-for="item in dealUserList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <!-- 外区所在城市 -->
        <el-form-item
          class="form-item"
          v-if="ruleForm.erpMlDeal.category === 4"
          prop="erpMlDeal.otherDealCityId"
        >
          <div class="label-title red">外区所在城市</div>
          <el-select
            v-model="ruleForm.erpMlDeal.otherDealCityId"
            :style="{'width': inputWidth1}"
            placeholder
          >
            <el-option
              v-for="item in otherDealCityList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <!-- 外区分行 -->
        <el-form-item
          class="form-item"
          v-if="ruleForm.erpMlDeal.category === 4"
          prop="erpMlDeal.otherDealBankId"
        >
          <div class="label-title red">外区分行</div>
          <el-select
            v-model="ruleForm.erpMlDeal.otherDealBankId"
            :style="{'width': inputWidth1}"
            placeholder
          >
            <el-option
              v-for="item in otherDealBankList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
      </div>
      <!-- 房源信息 -->
      <div class="form-item-common" style="margin-top: 0.2rem;">
        <top-title :iconUrl="houseIcon" :titleName="'房源信息'"></top-title>
      </div>
      <div class="form-item-common form-item-box">
        <!-- 盘源编号 -->
        <el-form-item class="form-item" prop="erpMlDeal.dealHouseNo">
          <div class="label-title red">盘源编号</div>
          <el-select
            v-model="ruleForm.erpMlDeal.dealHouseStyle"
            :style="{'width': inputWidth2}"
            placeholder
          >
            <el-option
              v-for="item in dealHouseStyleList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
              @click.native="dealHouseStyleChange"
            ></el-option>
          </el-select>
          <el-input
            v-model="ruleForm.erpMlDeal.dealHouseNo"
            :disabled="true"
            :style="{'width': inputWidth3, 'margin-left': '0.1rem'}"
          ></el-input>
        </el-form-item>
        <!-- 物业信息 -->
        <el-form-item class="form-item" prop="erpMlDeal.dealHouseInfo">
          <div class="label-title red">物业信息</div>
          <el-input v-model="ruleForm.erpMlDeal.dealHouseInfo" :style="{'width': inputWidth1}"></el-input>
        </el-form-item>
      </div>
      <div class="form-item-common form-item-box">
        <!-- 房产证名称 -->
        <el-form-item class="form-item" prop="erpMlDeal.ownerName">
          <div class="label-title red">房产证名称</div>
          <el-input v-model="ruleForm.erpMlDeal.ownerName" :style="{'width': inputWidth1}"></el-input>
        </el-form-item>
        <!-- 房产证编号 -->
        <el-form-item class="form-item" prop="erpMlDeal.ownerType">
          <div class="label-title">房产证编号</div>
          <el-select
            v-model="ruleForm.erpMlDeal.ownerType"
            :style="{'width': inputWidth2}"
            placeholder
          >
            <el-option
              v-for="item in ownerTypeList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
          <el-input
            v-model="ruleForm.erpMlDeal.ownerNo"
            :style="{'width': inputWidth3, 'margin-left': '0.1rem'}"
            :disabled="true"
          ></el-input>
        </el-form-item>
      </div>
      <div class="form-item-common form-item-box">
        <!-- 用途 -->
        <el-form-item class="form-item" prop="erpMlDeal.houseUseage">
          <div class="label-title">用 途</div>
          <el-select
            v-model="ruleForm.erpMlDeal.houseUseage"
            :style="{'width': inputWidth1}"
            placeholder
          >
            <el-option
              v-for="item in houseUseageList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <!-- 户型 -->
        <el-form-item class="form-item" prop="erpMlDeal.houseRoom">
          <div class="label-title red">户 型</div>
          <div class="build-type" :style="{'width': inputWidth1}">
            <el-input
              v-model="ruleForm.erpMlDeal.houseRoom"
              maxlength="2"
              :style="{'width': inputWidth4}"
              v-onlyNumber
            ></el-input>
            <div class="unit">室</div>
            <el-input
              v-model="ruleForm.erpMlDeal.houseHall"
              maxlength="2"
              :style="{'width': inputWidth4}"
            ></el-input>
            <div class="unit">厅</div>
            <el-input
              v-model="ruleForm.erpMlDeal.houseToilet"
              maxlength="2"
              :style="{'width': inputWidth4}"
            ></el-input>
            <div class="unit">卫</div>
            <el-input
              v-model="ruleForm.erpMlDeal.houseBalcony"
              maxlength="2"
              :style="{'width': inputWidth4}"
            ></el-input>
            <div class="unit">阳台</div>
          </div>
        </el-form-item>
        <!-- 所属片区 -->
        <el-form-item class="form-item" prop="erpMlDeal.houseReg">
          <div class="label-title">所属片区</div>
          <el-input
            v-model="ruleForm.erpMlDeal.houseReg"
            :style="{'width': inputWidth1}"
            :readonly="true"
            @click.native="showSelectArea()"
          ></el-input>
        </el-form-item>
      </div>
      <div class="form-item-common form-item-box">
        <!-- 建筑面积 -->
        <el-form-item class="form-item" prop="erpMlDeal.houseArea">
          <div class="label-title red">建筑面积</div>
          <el-input
            v-model="ruleForm.erpMlDeal.houseArea"
            v-number-two
            :style="{'width': inputWidth1}"
          >
            <span slot="suffix">㎡</span>
          </el-input>
        </el-form-item>
        <!-- 套内面积 -->
        <el-form-item class="form-item" prop="erpMlDeal.houseInnerArea">
          <div class="label-title red">套内面积</div>
          <el-input
            v-model="ruleForm.erpMlDeal.houseInnerArea"
            v-number-two
            :style="{'width': inputWidth1}"
          >
            <span slot="suffix">㎡</span>
          </el-input>
        </el-form-item>
        <!-- 产权性质 -->
        <el-form-item class="form-item" prop="erpMlDeal.propertyType">
          <div class="label-title">产权性质</div>
          <el-select
            v-model="ruleForm.erpMlDeal.propertyType"
            :style="{'width': inputWidth1}"
            placeholder
          >
            <el-option
              v-for="item in propertyTypeList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
      </div>
      <div class="form-item-common form-item-box">
        <!-- 产权现状 -->
        <el-form-item class="form-item" prop="erpMlDeal.ownerStatus">
          <div class="label-title">产权现状</div>
          <el-select
            v-model="ruleForm.erpMlDeal.ownerStatus"
            :style="{'width': inputWidth1}"
            placeholder
          >
            <el-option
              v-for="item in ownerStatusList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <!-- 查档状态 -->
        <el-form-item class="form-item" prop="erpMlDeal.fileStatus">
          <div class="label-title">查档状态</div>
          <el-select
            v-model="ruleForm.erpMlDeal.fileStatus"
            :style="{'width': inputWidth1}"
            placeholder
          >
            <el-option
              v-for="item in fileStatusList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <!-- 按揭银行 -->
        <el-form-item class="form-item" prop="erpMlDeal.financeBank">
          <div class="label-title">按揭银行</div>
          <el-select
            v-model="ruleForm.erpMlDeal.financeBank"
            :style="{'width': inputWidth1}"
            placeholder
          >
            <el-option
              v-for="item in financeBankList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
      </div>
      <div class="form-item-common form-item-box">
        <!-- 按揭欠款 -->
        <el-form-item class="form-item" prop="erpMlDeal.financeMoney">
          <div class="label-title">按揭欠款</div>
          <el-input v-model="ruleForm.erpMlDeal.financeMoney" :style="{'width': inputWidth1}"></el-input>
        </el-form-item>
        <!-- 交楼状态 -->
        <el-form-item class="form-item">
          <div class="label-title">交楼状态</div>
          <div class="check-box-content">
            <check-box-only
              :label="'空房'"
              :value="'1'"
              @sendData="handoverStatusChange"
              :selecteValue="ruleForm.erpMlDeal.handoverStatus"
            ></check-box-only>
            <check-box-only
              :label="'附带家私电器'"
              :note="'详见家私电器清单'"
              :value="'2'"
              @sendData="handoverStatusChange"
              :selecteValue="ruleForm.erpMlDeal.handoverStatus"
            ></check-box-only>
          </div>
        </el-form-item>
      </div>
      <!-- 合同信息 -->
      <div class="form-item-common" style="margin-top: 0.2rem;">
        <top-title :iconUrl="contractIcon" :titleName="'合同信息'"></top-title>
      </div>
      <div class="form-item-common form-item-box">
        <!-- 合同编号 -->
        <el-form-item class="form-item" prop="erpMlDeal.entrustNo">
          <div class="label-title red">合同编号</div>
          <el-select
            v-model="ruleForm.erpMlDeal.entrustType"
            :style="{'width': inputWidth2}"
            placeholder
          >
            <el-option
              v-for="item in entrustTypeList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
              @click.native="entrustTypeChange"
            ></el-option>
          </el-select>
          <el-input
            v-model="ruleForm.erpMlDeal.entrustNo"
            :style="{'width': inputWidth3, 'margin-left': '0.1rem'}"
            :disabled="true"
          ></el-input>
        </el-form-item>
        <!-- 成交总价 -->
        <el-form-item class="form-item" prop="erpMlDeal.dealPrice">
          <div class="label-title red">成交总价</div>
          <el-input v-model="ruleForm.erpMlDeal.dealPrice" :style="{'width': inputWidth3}"></el-input>
          <el-select
            v-model="ruleForm.erpMlDeal.priceUnit"
            :style="{'width': inputWidth2, 'margin-left': '0.1rem'}"
            placeholder
          >
            <el-option
              v-for="item in priceUnitList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
      </div>
      <div class="form-item-common form-item-box" v-if="ruleForm.erpMlDeal.dealType === 1">
        <!-- 签约日期 -->
        <el-form-item class="form-item" prop="erpMlDeal.signDate">
          <div class="label-title red">签约日期</div>
          <el-date-picker
            v-model="ruleForm.erpMlDeal.signDate"
            type="date"
            :style="{'width': inputWidth1}"
            value-format="yyyy-MM-dd"
            placeholder
          ></el-date-picker>
        </el-form-item>
        <!-- 付款方式 -->
        <el-form-item class="form-item" prop="erpMlDeal.payType">
          <div class="label-title red">付款方式</div>
          <el-select
            v-model="ruleForm.erpMlDeal.payType"
            :style="{'width': inputWidth1}"
            placeholder
          >
            <el-option
              v-for="item in payTypeList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
      </div>
      <div class="form-item-common form-item-box" v-if="ruleForm.erpMlDeal.dealType === 1">
        <!-- 第一笔定金 -->
        <el-form-item class="form-item" prop="erpMlDeal.firstEarnestMoney">
          <div class="label-title">第一笔定金</div>
          <el-input
            v-model="ruleForm.erpMlDeal.firstEarnestMoney"
            v-number-two
            :style="{'width': inputWidth1}"
          >
            <span slot="suffix">元</span>
          </el-input>
        </el-form-item>
        <!-- 交付时间 -->
        <el-form-item class="form-item" prop="erpMlDeal.firstEarnestMoneyDate">
          <div class="label-title">交付时间</div>
          <el-date-picker
            v-model="ruleForm.erpMlDeal.firstEarnestMoneyDate"
            type="date"
            :style="{'width': inputWidth1}"
            value-format="yyyy-MM-dd"
            placeholder
          ></el-date-picker>
        </el-form-item>
      </div>
      <div class="form-item-common form-item-box" v-if="ruleForm.erpMlDeal.dealType === 1">
        <!-- 第二笔定金 -->
        <el-form-item class="form-item" prop="erpMlDeal.secondEarnestMoney">
          <div class="label-title">第二笔定金</div>
          <el-input
            v-model="ruleForm.erpMlDeal.secondEarnestMoney"
            v-number-two
            :style="{'width': inputWidth1}"
          >
            <span slot="suffix">元</span>
          </el-input>
        </el-form-item>
        <!-- 交付时间 -->
        <el-form-item class="form-item" prop="erpMlDeal.secondEarnestMoneyDate">
          <div class="label-title">交付时间</div>
          <el-date-picker
            v-model="ruleForm.erpMlDeal.secondEarnestMoneyDate"
            type="date"
            :style="{'width': inputWidth1}"
            value-format="yyyy-MM-dd"
            placeholder
          ></el-date-picker>
        </el-form-item>
      </div>
      <div
        class="form-item-common form-item-box"
        v-if="ruleForm.erpMlDeal.dealType === 1 && ruleForm.erpMlDeal.payType === 1"
      >
        <!-- 剩余楼款 -->
        <el-form-item class="form-item" prop="erpMlDeal.tailMoney">
          <div class="label-title">剩余楼款</div>
          <el-input
            v-model="ruleForm.erpMlDeal.tailMoney"
            v-number-two
            :style="{'width': inputWidth1}"
          >
            <span slot="suffix">元</span>
          </el-input>
        </el-form-item>
        <!-- 交付时间 -->
        <el-form-item class="form-item" prop="erpMlDeal.tailMoneyPayTime">
          <div class="label-title">交付时间</div>
          <el-date-picker
            v-model="ruleForm.erpMlDeal.tailMoneyPayTime"
            type="date"
            :style="{'width': inputWidth1}"
            value-format="yyyy-MM-dd"
            placeholder
          ></el-date-picker>
        </el-form-item>
      </div>
      <div class="form-item-common form-item-box" v-if="ruleForm.erpMlDeal.dealType === 1">
        <!-- 交楼押金 -->
        <el-form-item class="form-item" prop="erpMlDeal.transferDeposit">
          <div class="label-title">交楼押金</div>
          <el-input
            v-model="ruleForm.erpMlDeal.transferDeposit"
            v-number-two
            :style="{'width': inputWidth1}"
          >
            <span slot="suffix">元</span>
          </el-input>
        </el-form-item>
        <!-- 交付时间 -->
        <el-form-item class="form-item" prop="erpMlDeal.transferDepositPayTime">
          <div class="label-title">交付时间</div>
          <el-date-picker
            v-model="ruleForm.erpMlDeal.transferDepositPayTime"
            type="date"
            :style="{'width': inputWidth1}"
            value-format="yyyy-MM-dd"
            placeholder
          ></el-date-picker>
        </el-form-item>
      </div>
      <div
        class="form-item-common form-item-box"
        v-if="ruleForm.erpMlDeal.dealType === 1 && ruleForm.erpMlDeal.payType === 2"
      >
        <!-- 首期款 -->
        <el-form-item class="form-item" prop="erpMlDeal.downPayments">
          <div class="label-title">首期款</div>
          <el-input
            v-model="ruleForm.erpMlDeal.downPayments"
            v-number-two
            :style="{'width': inputWidth1}"
          >
            <span slot="suffix">元</span>
          </el-input>
        </el-form-item>
        <!-- 监管时间 -->
        <el-form-item class="form-item" prop="erpMlDeal.superviseDate">
          <div class="label-title">监管时间</div>
          <el-date-picker
            v-model="ruleForm.erpMlDeal.superviseDate"
            type="date"
            :style="{'width': inputWidth1}"
            value-format="yyyy-MM-dd"
            placeholder
          ></el-date-picker>
        </el-form-item>
      </div>
      <div
        class="form-item-common form-item-box"
        v-if="ruleForm.erpMlDeal.dealType === 1 && ruleForm.erpMlDeal.payType === 2"
      >
        <!-- 按揭金额 -->
        <el-form-item class="form-item" prop="erpMlDeal.mortgageAmount">
          <div class="label-title">按揭金额</div>
          <el-input
            v-model="ruleForm.erpMlDeal.mortgageAmount"
            v-number-two
            :style="{'width': inputWidth1}"
          >
            <span slot="suffix">元</span>
          </el-input>
        </el-form-item>
        <!-- 按揭时间 -->
        <el-form-item class="form-item" prop="erpMlDeal.mortgageDate">
          <div class="label-title">按揭时间</div>
          <el-date-picker
            v-model="ruleForm.erpMlDeal.mortgageDate"
            type="date"
            :style="{'width': inputWidth1}"
            value-format="yyyy-MM-dd"
            placeholder
          ></el-date-picker>
        </el-form-item>
      </div>
      <div class="form-item-common form-item-box">
        <!-- 业主佣金 -->
        <el-form-item class="form-item" prop="erpMlDeal.sellOwnerCommsion">
          <div class="label-title red">业主佣金</div>
          <el-input
            v-model="ruleForm.erpMlDeal.sellOwnerCommsion"
            v-number-two
            :style="{'width': inputWidth1}"
          ></el-input>
        </el-form-item>
        <!-- 客户佣金 -->
        <el-form-item class="form-item" prop="erpMlDeal.buyCustomerCommsion">
          <div class="label-title red">客户佣金</div>
          <el-input
            v-model="ruleForm.erpMlDeal.buyCustomerCommsion"
            v-number-two
            :style="{'width': inputWidth1}"
          ></el-input>
        </el-form-item>
        <!-- 按揭手续费 -->
        <el-form-item
          class="form-item"
          v-if="ruleForm.erpMlDeal.dealType === 1 && ruleForm.erpMlDeal.payType === 2"
          prop="erpMlDeal.mortgageFee"
        >
          <div class="label-title">按揭手续费</div>
          <el-input
            v-model="ruleForm.erpMlDeal.mortgageFee"
            v-number-two
            :style="{'width': inputWidth1}"
          >
            <span slot="suffix">元</span>
          </el-input>
        </el-form-item>
      </div>
      <div class="form-item-common form-item-box" v-if="ruleForm.erpMlDeal.dealType === 1">
        <!-- 业主必要费用 -->
        <el-form-item class="form-item" prop="erpMlDeal.sellNecessaryCost">
          <div class="label-title">业主必要费用</div>
          <el-input v-model="ruleForm.erpMlDeal.sellNecessaryCost" :style="{'width': inputWidth1}">
            <span slot="suffix">元</span>
          </el-input>
        </el-form-item>
        <!-- 客户必要费用 -->
        <el-form-item class="form-item" prop="erpMlDeal.buyNecessaryCost">
          <div class="label-title">客户必要费用</div>
          <el-input v-model="ruleForm.erpMlDeal.buyNecessaryCost" :style="{'width': inputWidth1}">
            <span slot="suffix">元</span>
          </el-input>
        </el-form-item>
      </div>
      <div
        class="form-item-common form-item-box"
        v-if="ruleForm.erpMlDeal.dealType === 1 && ruleForm.erpMlDeal.payType === 2"
      >
        <!-- 应公证委托时间 -->
        <el-form-item class="form-item" prop="erpMlDeal.notarizationDate">
          <div class="label-title">应公证委托时间</div>
          <el-date-picker
            v-model="ruleForm.erpMlDeal.notarizationDate"
            type="date"
            :style="{'width': inputWidth1}"
            value-format="yyyy-MM-dd"
            placeholder
          ></el-date-picker>
        </el-form-item>
      </div>
      <div class="form-item-common form-item-box">
        <check-box-only
          :label="'附带租约'"
          :value="'1'"
          style="margin-left: 0.22rem; margin-bottom: 0.18rem;"
          @sendData="hasLeaseChange"
          :selecteValue="ruleForm.erpMlDeal.hasLease"
        ></check-box-only>
      </div>
      <div class="form-item-common form-item-box" v-if="ruleForm.erpMlDeal.hasLease === '1'">
        <!-- 租约到期时间 -->
        <el-form-item class="form-item" prop="erpMlDeal.leaseEndTime">
          <div class="label-title red">租约到期时间</div>
          <el-date-picker
            v-model="ruleForm.erpMlDeal.leaseEndTime"
            type="date"
            :style="{'width': inputWidth1}"
            value-format="yyyy-MM-dd"
            placeholder
          ></el-date-picker>
        </el-form-item>
        <!-- 押金类型 -->
        <el-form-item class="form-item" prop="erpMlDeal.leaseDepositType">
          <div class="label-title red">押金类型</div>
          <el-select
            v-model="ruleForm.erpMlDeal.leaseDepositType"
            :style="{'width': inputWidth1}"
            placeholder
          >
            <el-option
              v-for="item in leaseDepositTypeList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
      </div>
      <div class="form-item-common form-item-box">
        <!-- 备注 -->
        <el-form-item class="form-item" prop="erpMlDeal.remarks">
          <div class="label-title">备 注</div>
          <el-input
            v-model="ruleForm.erpMlDeal.remarks"
            type="textarea"
            :rows="textareaRow"
            resize="none"
            maxlength="1000"
            :show-word-limit="true"
            :style="{'width': inputWidth5}"
            placeholder="请输入备注信息"
          ></el-input>
        </el-form-item>
      </div>
      <!-- 业主信息 erpMlDealSellers -->
      <div class="form-item-common" style="margin-top: 0.2rem;">
        <top-title :iconUrl="customerIcon" :titleName="'业主信息'"></top-title>
      </div>
      <div
        style="width: 100%;"
        v-for="(itemParent, index) in ruleForm.erpMlDealSellers"
        :key="itemParent.sellType * index"
      >
        <div class="form-item-common form-item-box">
          <!-- 业主类型 -->
          <el-form-item class="form-item" :prop="'erpMlDealSellers.' + index + 'sellType'">
            <div class="delete-icon-1" @click="delErpMlDealSellers(index)" v-if="index > 0"></div>
            <div class="label-title">业主类型</div>
            <el-select v-model="itemParent.sellType" :style="{'width': inputWidth6}" placeholder>
              <el-option
                v-for="item in typeList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <!-- 业主姓名 -->
          <el-form-item
            class="form-item"
            :prop="'erpMlDealSellers.' + index + 'sellName'"
            :rules="rules.commonRequire"
          >
            <div class="label-title red">业主姓名</div>
            <el-select
              v-model="itemParent.sellRelationship"
              :style="{'width': inputWidth8}"
              placeholder
            >
              <el-option
                v-for="item in relationshipList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
            <el-input
              v-model="itemParent.sellName"
              :style="{'width': inputWidth7, 'margin-left': '0.08rem'}"
            ></el-input>
            <radio-group
              style="margin-left: 0.08rem;"
              @sendData="sellSexChange"
              :indexParent="index"
              :nowData="itemParent.sellSex"
            ></radio-group>
          </el-form-item>
          <!-- 地域 -->
          <el-form-item class="form-item" :prop="'erpMlDealSellers.' + index + 'sellRegion'">
            <div class="label-title">地 域</div>
            <el-select v-model="itemParent.sellRegion" :style="{'width': inputWidth7}" placeholder>
              <el-option
                v-for="item in regionList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </div>
        <div class="form-item-common form-item-box">
          <!-- 证件号 -->
          <el-form-item class="form-item" :prop="'erpMlDealSellers.' + index + 'credentialsType'">
            <div class="label-title">证 件 号</div>
            <el-select
              v-model="itemParent.credentialsType"
              :style="{'width': inputWidth6}"
              placeholder
            >
              <el-option
                v-for="item in credentialsTypeList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
            <el-input
              v-model="itemParent.credentialsNo"
              :style="{'width': inputWidth9, 'margin-left': '0.07rem'}"
            ></el-input>
          </el-form-item>
          <!-- 户籍 -->
          <el-form-item class="form-item" :prop="'erpMlDealSellers.' + index + 'registrationType'">
            <div class="label-title">户 籍</div>
            <el-select
              v-model="itemParent.registrationType"
              :style="{'width': inputWidth6}"
              placeholder
            >
              <el-option
                v-for="item in registrationTypeList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
            <el-select
              v-model="itemParent.provinceId"
              :style="{'width': inputWidth9, 'margin-left': '0.07rem'}"
              placeholder="请选择户籍所属省份"
            >
              <el-option
                v-for="item in provinceList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </div>
        <div class="form-item-common form-item-box">
          <!-- 电话 -->
          <el-form-item
            class="form-item"
            :prop="'erpMlDealSellers.' + index + 'contractPhone'"
            :rules="rules.commonRequire"
          >
            <div class="label-title red">电 话</div>
            <el-select
              v-model="itemParent.contractType"
              :style="{'width': inputWidth6}"
              placeholder
            >
              <el-option
                v-for="item in contractTypeList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
            <el-input
              v-model="itemParent.contractPhone"
              :style="{'width': inputWidth9, 'margin-left': '0.07rem'}"
            ></el-input>
          </el-form-item>
          <!-- 联系地址 -->
          <el-form-item class="form-item">
            <div class="label-title">联系地址</div>
            <el-select v-model="itemParent.provinceId" :style="{'width': inputWidth6}" placeholder>
              <el-option
                v-for="item in provinceList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
            <el-select
              v-model="itemParent.cityId"
              :style="{'width': inputWidth6, 'margin-left': '0.07rem'}"
              placeholder
            >
              <el-option
                v-for="item in cityList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
            <el-input
              v-model="itemParent.address"
              :style="{'width': inputWidth9, 'margin-left': '0.07rem'}"
            ></el-input>
          </el-form-item>
        </div>
        <div class="form-item-common form-item-box">
          <!-- 产权比例 -->
          <el-form-item class="form-item" :prop="'erpMlDealSellers.' + index + 'ownerProportion'">
            <div class="label-title">产权比例</div>
            <el-input v-model="itemParent.ownerProportion" :style="{'width': inputWidth10}">
              <span slot="suffix">%</span>
            </el-input>
          </el-form-item>
        </div>
        <div class="form-item-common form-item-box">
          <!-- 备注 -->
          <el-form-item class="form-item" :prop="'erpMlDealSellers.' + index + 'remarks'">
            <div class="label-title">备 注</div>
            <el-input
              v-model="itemParent.remarks"
              type="textarea"
              :rows="textareaRow"
              resize="none"
              maxlength="1000"
              :show-word-limit="true"
              :style="{'width': inputWidth5}"
              placeholder="请输入备注信息"
            ></el-input>
          </el-form-item>
        </div>
      </div>
      <div class="form-item-common form-item-box">
        <!-- 新增业主信息 -->
        <el-form-item class="form-item">
          <div class="label-title_"></div>
          <div class="add-box" @click="addErpMlDealSellers()">
            <img src="../../../../assets/images/public/add_200.png" alt />
            <div>新增业主信息</div>
          </div>
        </el-form-item>
      </div>
      <!-- 客户信息 -->
      <div class="form-item-common" style="margin-top: 0.2rem;">
        <top-title :iconUrl="customerIcon" :titleName="'客户信息'"></top-title>
      </div>
      <!-- 客户信息 - erpMlDealBuyUsers -->
      <div class="form-item-common form-item-box">
        <!-- 关联客户 -->
        <el-form-item class="form-item">
          <div class="label-title_"></div>
          <div class="add-box" @click="addErpMlDealBuyUsers()">
            <img src="../../../../assets/images/public/add_200.png" alt />
            <div>关联客户</div>
          </div>
        </el-form-item>
      </div>
      <div
        style="width: 100%;"
        v-for="(itemClient, index) in ruleForm.erpMlDealBuyUsers"
        :key="itemClient.sellType * index"
      >
        <div class="form-item-common form-item-box">
          <!-- 客户类型 -->
          <el-form-item class="form-item" :prop="'erpMlDealSellers.' + index + 'buyUserType'">
            <div class="delete-icon-1" @click="delErpMlDealBuyUsers(index)" v-if="index > 0"></div>
            <div class="label-title">客户类型</div>
            <el-select
              v-model="itemClient.buyUserType"
              :style="{'width': inputWidth6}"
              placeholder
              @change="buyUserTypeChange(index)"
            >
              <el-option
                v-for="item in typeList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <!-- 客户姓名 -->
          <el-form-item
            class="form-item"
            :prop="'erpMlDealSellers.' + index + 'userName'"
            v-if="itemClient.buyUserType === 1"
            :rules="rules.commonRequire"
          >
            <div class="label-title red">客户姓名</div>
            <el-select
              v-model="itemClient.buyRelationship"
              :style="{'width': inputWidth8}"
              placeholder
            >
              <el-option
                v-for="item in relationshipList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
            <el-input
              v-model="itemClient.userName"
              :style="{'width': inputWidth7, 'margin-left': '0.08rem'}"
            ></el-input>
            <radio-group
              style="margin-left: 0.08rem;"
              @sendData="userSexChange"
              :indexParent="index"
              :nowData="itemClient.userSex"
            ></radio-group>
          </el-form-item>
          <!-- 地域 -->
          <el-form-item class="form-item" v-if="itemClient.buyUserType === 1">
            <div class="label-title">地 域</div>
            <el-select v-model="itemClient.userRegion" :style="{'width': inputWidth7}" placeholder>
              <el-option
                v-for="item in regionList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <!-- 企业名称 -->
          <el-form-item
            class="form-item"
            :prop="'erpMlDealSellers.' + index + 'enterpriseName'"
            v-if="itemClient.buyUserType === 2"
            :rules="rules.commonRequire"
          >
            <div class="label-title red">企业名称</div>
            <el-input v-model="itemClient.enterpriseName" :style="{'width': inputWidth12}"></el-input>
          </el-form-item>
          <!-- 营业执照号码 -->
          <el-form-item class="form-item" v-if="itemClient.buyUserType === 2">
            <div class="label-title">营业执照号码</div>
            <el-input v-model="itemClient.enterpriseNo" :style="{'width': inputWidth12}"></el-input>
          </el-form-item>
        </div>
        <div class="form-item-common form-item-box" v-if="itemClient.buyUserType === 2">
          <!-- 法人姓名 -->
          <el-form-item
            class="form-item"
            :prop="'erpMlDealSellers.' + index + 'legalPerson'"
            :rules="rules.commonRequire"
          >
            <div class="label-title red">法人姓名</div>
            <el-input v-model="itemClient.legalPerson" :style="{'width': inputWidth14}"></el-input>
            <radio-group
              style="margin-left: 0.08rem;"
              @sendData="userSexChange"
              :indexParent="index"
              :nowData="itemClient.userSex"
            ></radio-group>
            <el-checkbox
              class="checkbox"
              v-model="checked"
              @change="principal"
              style="margin-left:0.2rem"
            >委托人</el-checkbox>
          </el-form-item>
          <!-- 地域 -->
          <el-form-item class="form-item">
            <div class="label-title">地 域</div>
            <el-select v-model="itemClient.userRegion" :style="{'width': inputWidth6}" placeholder>
              <el-option
                v-for="item in regionList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </div>
        <div class="form-item-common form-item-box" v-if="checkedShow">
          <!-- 委托人姓名 -->
          <el-form-item class="form-item">
            <div class="label-title">委托人姓名</div>
            <el-input v-model="itemClient.principalName" :style="{'width': inputWidth14}"></el-input>
          </el-form-item>
          <!-- 委托人电话 -->
          <el-form-item class="form-item">
            <div class="label-title">委托人电话</div>
            <el-input v-model="itemClient.principalTel" :style="{'width': inputWidth9}"></el-input>
          </el-form-item>
        </div>
        <div class="form-item-common form-item-box">
          <!-- 证件号 -->
          <el-form-item class="form-item" :prop="'erpMlDealSellers.' + index + 'credentialsNo'">
            <div class="label-title">证 件 号</div>
            <el-select
              v-model="itemClient.credentialsType"
              :style="{'width': inputWidth6}"
              placeholder
            >
              <el-option
                v-for="item in credentialsTypeList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
            <el-input
              v-model="itemClient.credentialsNo"
              :style="{'width': inputWidth9, 'margin-left': '0.07rem'}"
            ></el-input>
          </el-form-item>
          <!-- 户籍 -->
          <el-form-item class="form-item">
            <div class="label-title">户 籍</div>
            <el-select
              v-model="itemClient.registrationType"
              :style="{'width': inputWidth6}"
              placeholder
            >
              <el-option
                v-for="item in registrationTypeList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
            <el-select
              v-model="itemClient.provinceId"
              :style="{'width': inputWidth9, 'margin-left': '0.07rem'}"
              placeholder="请选择户籍所属省份"
            >
              <el-option
                v-for="item in provinceList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </div>

        <div class="form-item-common form-item-box" v-if="buyUsersPhoneNum >= 0">
          <!-- 电话 - 1 -->
          <el-form-item
            class="form-item"
            :prop="'erpMlDealSellers.' + index + 'firstContractPhone'"
            :rules="rules.commonRequire"
          >
            <div class="add-icon" @click="addBuyUsersPhone()" v-if="buyUsersPhoneNum < 2"></div>
            <div class="label-title red">电 话</div>
            <el-select
              v-model="itemClient.firstContractType"
              :style="{'width': inputWidth6}"
              placeholder
            >
              <el-option
                v-for="item in contractTypeList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
            <el-input
              v-model="itemClient.firstContractPhone"
              :style="{'width': inputWidth9, 'margin-left': '0.07rem'}"
            ></el-input>
          </el-form-item>
        </div>
        <div class="form-item-common form-item-box" v-if="buyUsersPhoneNum >= 1">
          <!-- 电话 - 2 -->
          <el-form-item
            class="form-item"
            :prop="'erpMlDealSellers.' + index + 'secondContractPhone'"
            :rules="rules.commonRequire"
          >
            <div
              class="delete-icon-2"
              @click="delBuyUsersPhone(index)"
              v-if="buyUsersPhoneNum === 1"
            ></div>
            <div class="label-title_"></div>
            <el-select
              v-model="itemClient.secondContractType"
              :style="{'width': inputWidth6}"
              placeholder
            >
              <el-option
                v-for="item in contractTypeList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
            <el-input
              v-model="itemClient.secondContractPhone"
              :style="{'width': inputWidth9, 'margin-left': '0.07rem'}"
            ></el-input>
          </el-form-item>
        </div>
        <div class="form-item-common form-item-box" v-if="buyUsersPhoneNum >= 2">
          <!-- 电话 - 3 -->
          <el-form-item
            class="form-item"
            :prop="'erpMlDealSellers.' + index + 'thirdContractPhone'"
            :rules="rules.commonRequire"
          >
            <div
              class="delete-icon-2"
              @click="delBuyUsersPhone(index)"
              v-if="buyUsersPhoneNum === 2"
            ></div>
            <div class="label-title_"></div>
            <el-select
              v-model="itemClient.thirdContractType"
              :style="{'width': inputWidth6}"
              placeholder
            >
              <el-option
                v-for="item in contractTypeList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
            <el-input
              v-model="itemClient.thirdContractPhone"
              :style="{'width': inputWidth9, 'margin-left': '0.07rem'}"
            ></el-input>
          </el-form-item>
        </div>
        <div class="form-item-common form-item-box">
          <!-- 联系地址 -->
          <el-form-item class="form-item">
            <div class="label-title">联系地址</div>
            <el-select v-model="itemClient.provinceId" :style="{'width': inputWidth6}" placeholder>
              <el-option
                v-for="item in provinceList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
            <el-select
              v-model="itemClient.cityId"
              :style="{'width': inputWidth6, 'margin-left': '0.07rem'}"
              placeholder
            >
              <el-option
                v-for="item in cityList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
            <el-input
              v-model="itemClient.address"
              :style="{'width': inputWidth9, 'margin-left': '0.07rem'}"
            ></el-input>
          </el-form-item>
        </div>
        <div class="form-item-common form-item-box">
          <!-- 产权比例 -->
          <el-form-item class="form-item">
            <div class="label-title">产权比例</div>
            <el-input v-model="itemClient.ownerProportion" :style="{'width': inputWidth10}">
              <span slot="suffix">%</span>
            </el-input>
          </el-form-item>
          <!-- 客户来源 -->
          <el-form-item class="form-item">
            <div class="label-title">客户来源</div>
            <el-select v-model="itemClient.fromSource" :style="{'width': inputWidth11}" placeholder>
              <el-option
                v-for="item in fromSourceList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
            <div class="other-title">（转介/合作）单号：GSDB154141010（转介）</div>
          </el-form-item>
        </div>
        <div class="form-item-common form-item-box">
          <!-- 备注 -->
          <el-form-item class="form-item">
            <div class="label-title">备 注</div>
            <el-input
              v-model="desc"
              type="textarea"
              :rows="textareaRow"
              resize="none"
              maxlength="1000"
              :show-word-limit="true"
              :style="{'width': inputWidth5}"
              placeholder="请输入备注信息"
            ></el-input>
          </el-form-item>
        </div>
      </div>
      <!-- 业绩信息 -->
      <div class="form-item-common" style="margin-top: 0.2rem;">
        <top-title :iconUrl="performanceIcon" :titleName="'业绩信息'"></top-title>
      </div>
      <div class="performance-box">
        <div class="performance-list">
          <div class="performance-list-item">
            <span class="p-l-left">上报业绩：</span>
            <span class="p-l-right">{{reportingPerformance}}元</span>
          </div>
          <div class="performance-list-item">
            <span class="p-l-left">标准佣金：</span>
            <span
              class="p-l-right"
            >{{standardCommission}}{{priceUnitList.filter(item => ruleForm.erpMlDeal.priceUnit === item.value)[0].label}}</span>
          </div>
          <div class="performance-list-item">
            <span class="p-l-left">折扣：</span>
            <span class="p-l-right">{{discount}}%</span>
          </div>
          <div class="performance-list-item">
            <span class="p-l-left">合作费：</span>
            <span class="p-l-right">{{cooperationFees}}元</span>
          </div>
        </div>

        <!-- table - 1 -->
        <div class="performance-add-box">
          <div class="p-a-b-left">
            <check-box-only
              :label="'外部合作费'"
              :value="'1'"
              @sendData="waibuhezuofeiChange"
              :selecteValue="waibuhezuofei"
            ></check-box-only>
            <div
              class="add-box"
              @click="addErpMlDealOuterCooperations()"
              v-if="waibuhezuofei === '1'"
            >
              <img src="../../../../assets/images/public/add_200.png" alt />
              <div>新增</div>
            </div>
          </div>
        </div>
        <div class="table-box" v-if="waibuhezuofei === '1'">
          <div class="table-buju-1 table-head">
            <div v-for="(item, index) in tableTop1" :key="index">{{item}}</div>
          </div>
          <div
            class="table-buju table-buju-1"
            v-for="(item, index) in ruleForm.erpMlDealOuterCooperations"
            :key="index"
          >
            <div>{{index + 1}}</div>
            <div>
              <el-input v-model="item.userName" :style="{'width': '100%'}"></el-input>
            </div>
            <div>
              <el-input v-model="item.idNo" :style="{'width': '100%'}"></el-input>
            </div>
            <div>
              <el-input v-model="item.contractPhone" :style="{'width': '100%'}"></el-input>
            </div>
            <div>
              <el-select v-model="item.type" :style="{'width': '100%'}" placeholder>
                <el-option
                  v-for="item in erpMlDealOuterCooperationsTypeList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </div>
            <div class="active">
              <el-input
                v-model="item.cooperationCost"
                @input="cooperationCostChange(index)"
                :style="{'width': '100%'}"
              ></el-input>
            </div>
            <div class="del-icon" @click="delErpMlDealOuterCooperations(index)"></div>
          </div>
        </div>

        <!-- table - 2 -->
        <div class="performance-add-box">
          <div class="p-a-b-left">
            <div>业绩分配</div>
            <div class="add-box" @click="addErpMlDealProfits()">
              <img src="../../../../assets/images/public/add_200.png" alt />
              <div>新增</div>
            </div>
          </div>
          <div class="p-a-b-right">
            <radio-group-other @sendData="jinebiliChange"></radio-group-other>
          </div>
        </div>
        <div class="table-box">
          <div class="table-buju-2 table-head">
            <div v-for="(item, index) in tableTop2" :key="index">{{item}}</div>
          </div>
          <div
            class="table-buju table-buju-2"
            v-for="(item, index) in ruleForm.erpMlDealProfits"
            :key="index"
          >
            <div>{{index + 1}}</div>
            <div>
              <el-select v-model="item.profitType" :style="{'width': '100%'}" placeholder>
                <el-option
                  v-for="item in erpMlDealProfitsProfitTypeList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </div>
            <div>
              <el-input v-model="item.compOrgName" :style="{'width': '100%'}" :readonly="true"></el-input>
            </div>
            <div>
              <el-input v-model="item.userName" :style="{'width': '100%'}" :readonly="true"></el-input>
            </div>
            <div>
              <el-date-picker
                v-model="item.profitMonth"
                type="month"
                :style="{'width': '100%'}"
                value-format="yyyy-MM"
                placeholder
              ></el-date-picker>
            </div>
            <div class="active">
              <el-input
                v-model="item.profitProportion"
                @input="profitProportionChange(index)"
                :disabled="jinebili === '2'"
                maxlength="2"
                :style="{'width': '100%'}"
              >
                <span slot="suffix">%</span>
              </el-input>
            </div>
            <div class="active">
              <el-input
                v-model="item.profitMoney"
                @input="profitMoneyChange(index)"
                :disabled="jinebili === '1'"
                :style="{'width': '100%'}"
              ></el-input>
            </div>
            <div class="active">
              <el-input
                v-model="item.orderProportion"
                @change="orderProportionChange(index)"
                v-number-one
                :style="{'width': '100%'}"
              ></el-input>
            </div>
            <div>{{item.getProfitLeaders()}}</div>
            <div class="del-icon" @click="delErpMlDealProfits(index)"></div>
          </div>
        </div>
      </div>
    </el-form>

    <!-- 关联合同 -->
    <associated-contract :isShow.sync="associatedContractObj.isShow"></associated-contract>
    <!-- 关联客户 -->
    <associate-customer :isShow.sync="associateCustomerObj.isShow"></associate-customer>
    <!-- 选择物业 -->
    <choose-property :isShow.sync="choosePropertyObj.isShow"></choose-property>
    <!-- 选择片区 -->
    <select-area :isShow.sync="selectAreaObj.isShow"></select-area>
  </div>
</template>

<script>
import { GetInitInfoList } from "@/net/dealReports/address.js";
import {
  erpMlDeal,
  erpMlDealBuyUsersItem,
  erpMlDealSellersItem,
  erpMlDealOuterCooperationsItem,
  erpMlDealProfitsitem,
  createMlDealReport,
  getBankDicList,
  getFunPerformanceTypeList,
} from "@/net/dealReports/erShouDealReports.js";

import topTitle from "@/views/dealReports/erShouDealReports/components/topTitle.vue";
import checkBox from "@/views/dealReports/erShouDealReports/components/checkBox.vue";
import checkBoxOnly from "@/views/dealReports/erShouDealReports/components/checkBoxOnly.vue";
import radioGroup from "@/views/dealReports/erShouDealReports/components/radioGroup.vue";
import radioGroupOther from "@/views/dealReports/erShouDealReports/components/radioGroupOther.vue";
import associatedContract from "@/views/dealReports/erShouDealReports/addErShouDealReport/associatedContract.vue";
import associateCustomer from "@/views/dealReports/erShouDealReports/addErShouDealReport/associateCustomer.vue";
import chooseProperty from "@/views/dealReports/erShouDealReports/addErShouDealReport/chooseProperty.vue";
import selectArea from "@/views/dealReports/erShouDealReports/addErShouDealReport/selectArea.vue";

export default {
  data() {
    // 户型验证
    let checkHouseRoom = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("室不能为空"));
      }
      let reg = /^[0-9]*$/;
      if (!reg.test(value)) {
        return callback(new Error("请输入数字"));
      } else {
        if (value <= 1) {
          return callback(new Error("室必须大于1"));
        } else {
          return callback();
        }
      }
    };
    return {
      typeStatus: "add",

      inputWidth1: "2.1rem",
      inputWidth2: "0.9rem",
      inputWidth3: "1.1rem",
      inputWidth4: "0.34rem",
      inputWidth5: "8.67rem",
      inputWidth6: "0.85rem",
      inputWidth7: "1rem",
      inputWidth8: "0.6rem",
      inputWidth9: "2rem",
      inputWidth10: "2.92rem",
      inputWidth11: "1.77rem",
      inputWidth12: "2.61rem",
      // inputWidth13: '2.94rem',
      inputWidth14: "1.3rem",
      textareaRow: 4,
      checked: false,
      checkedShow: false,
      houseIcon: require("../../../../assets/images/dealReports/Fyxx_200.png"),
      contractIcon: require("../../../../assets/images/dealReports/contract.png"),
      customerIcon: require("../../../../assets/images/dealReports/customer.png"),
      performanceIcon: require("../../../../assets/images/dealReports/performance.png"),
      ruleForm: {},
      rules: {
        "erpMlDeal.dealDate": [
          { required: true, message: "不能为空", trigger: "blur" },
        ],
        "erpMlDeal.dealType": [
          { required: true, message: "不能为空", trigger: "blur" },
        ],
        "erpMlDeal.category": [
          { required: true, message: "不能为空", trigger: "blur" },
        ],
        "erpMlDeal.branchBankId": [
          { required: true, message: "不能为空", trigger: "blur" },
        ],
        "erpMlDeal.dealUserId": [
          { required: true, message: "不能为空", trigger: "blur" },
        ],
        "erpMlDeal.otherDealCityId": [
          { required: true, message: "不能为空", trigger: "blur" },
        ],
        "erpMlDeal.otherDealBankId": [
          { required: true, message: "不能为空", trigger: "blur" },
        ],
        "erpMlDeal.dealHouseNo": [
          { required: true, message: "请选择房源", trigger: "blur" },
        ],
        "erpMlDeal.dealHouseInfo": [
          { required: true, message: "不能为空", trigger: "blur" },
        ],
        "erpMlDeal.ownerName": [
          { required: true, message: "不能为空", trigger: "blur" },
        ],
        "erpMlDeal.houseRoom": [{ validator: checkHouseRoom, trigger: "blur" }],
        "erpMlDeal.entrustNo": [
          { required: true, message: "请选择合同", trigger: "blur" },
        ],
        "erpMlDeal.dealPrice": [
          { required: true, message: "不能为空", trigger: "blur" },
        ],
        "erpMlDeal.signDate": [
          { required: true, message: "不能为空", trigger: "blur" },
        ],
        "erpMlDeal.payType": [
          { required: true, message: "不能为空", trigger: "blur" },
        ],
        "erpMlDeal.sellOwnerCommsion": [
          { required: true, message: "不能为空", trigger: "blur" },
        ],
        "erpMlDeal.buyCustomerCommsion": [
          { required: true, message: "不能为空", trigger: "blur" },
        ],
        "erpMlDeal.leaseEndTime": [
          { required: true, message: "不能为空", trigger: "blur" },
        ],
        "erpMlDeal.leaseDepositType": [
          { required: true, message: "不能为空", trigger: "blur" },
        ],
        commonRequire: [
          { required: true, message: "不能为空", trigger: "blur" },
        ],
      },
      // 类型
      dealTypeList: [
        { label: "售", value: 1 },
        { label: "租", value: 2 },
        { label: "代办", value: 3 },
        { label: "返利", value: 4 },
      ],
      // 类别
      categoryList: [
        { label: "一般成交", value: 1 },
        { label: "事后加佣", value: 2 },
        { label: "口头代理费", value: 3 },
        { label: "外区分佣", value: 4 },
      ],
      // 事后加佣
      mainDealList: [],
      // 合作方式
      cooperationTypeList: [
        { label: "跨市合作", value: 1 },
        { label: "市内合作", value: 2 },
        { label: "区内合作", value: 3 },
      ],
      // 成交分行
      branchBankList: [],
      // 成交人
      dealUserList: [],
      // 外区所在城市
      otherDealCityList: [],
      // 外区分行
      otherDealBankList: [],
      // 房源
      dealHouseStyleList: [
        { label: "内部合作", value: 1 },
        { label: "外部合作", value: 2 },
      ],
      // 房产证
      ownerTypeList: [
        { label: "房产证", value: 1 },
        { label: "不动产证", value: 2 },
      ],
      // 用途
      houseUseageList: [],
      // 所属片区
      houseRegList: [],
      // 产权性质
      propertyTypeList: [
        { label: "商品房", value: 1 },
        { label: "小产权房", value: 2 },
        { label: "军产房", value: 3 },
      ],
      // 产权现状
      ownerStatusList: [
        { label: "红本", value: 1 },
        { label: "抵押", value: 2 },
      ],
      // 查档状态
      fileStatusList: [
        { label: "有效", value: 1 },
        { label: "抵押", value: 2 },
        { label: "查封", value: 3 },
        { label: "其他", value: 4 },
      ],
      // 按揭银行
      financeBankList: [],
      // 合同类型
      entrustTypeList: [{ label: "不关联", value: 1 }],
      // 成交价格单位
      priceUnitList: [
        { label: "元", value: 1 },
        { label: "万元", value: 2 },
      ],
      // 付款方式
      payTypeList: [
        { label: "一次性", value: 1 },
        { label: "按揭", value: 2 },
      ],
      // 租约押金类型
      leaseDepositTypeList: [],
      // 业主类型
      typeList: [
        { label: "本人", value: 1 },
        { label: "企业", value: 2 },
      ],
      // 业主关系
      relationshipList: [
        { label: "本人", value: 1 },
        { label: "丈夫", value: 2 },
        { label: "妻子", value: 3 },
        { label: "亲属", value: 4 },
        { label: "朋友", value: 5 },
        { label: "儿子", value: 6 },
        { label: "其他", value: 7 },
        { label: "同学", value: 8 },
      ],
      // 地域
      regionList: [
        { label: "大陆", value: 1 },
        { label: "香港", value: 2 },
        { label: "澳门", value: 3 },
        { label: "台湾", value: 4 },
        { label: "海外", value: 5 },
      ],
      // 证件类型
      credentialsTypeList: [
        { label: "身份证", value: 1 },
        { label: "护照", value: 2 },
      ],
      // 户籍
      registrationTypeList: [
        { label: "本市户籍", value: 1 },
        { label: "非本市户籍", value: 2 },
      ],
      // 联系方式
      contractTypeList: [
        { label: "手机", value: 1 },
        { label: "座机", value: 2 },
      ],
      // 省份
      provinceList: [],
      // 城市
      cityList: [],
      // 添加电话的数值
      buyUsersPhoneNum: 0,
      // 客户 - 来源
      fromSourceList: [],
      // table - 1
      tableTop1: ["序号", "合作人", "身份证", "联系方式", "类型", "合作费"],
      // table- 1 - 类型列表
      erpMlDealOuterCooperationsTypeList: [],
      // table - 2
      tableTop2: [
        "序号",
        "分配类型",
        "分配部门",
        "分配人",
        "分配月份",
        "分配比列",
        "分配业绩",
        "单量",
        "领导人分配业绩",
      ],
      // table- 2 - 类型列表
      erpMlDealProfitsProfitTypeList: [],
      // 关联合同弹窗
      associatedContractObj: {
        isShow: false,
        title: "关联合同",
      },
      // 关联客户弹窗
      associateCustomerObj: {
        isShow: false,
        title: "关联客户",
      },
      // 选择物业弹窗
      choosePropertyObj: {
        isShow: false,
        title: "选择物业",
      },
      // 选择片区弹窗
      selectAreaObj: {
        isShow: false,
        title: "选择片区",
      },
      // 标准佣金比例
      standardCommissionProportion: 0.5, // todo
      // 外部合作费
      waibuhezuofei: "1",
      // 金额比例
      jinebili: "1",
    };
  },
  components: {
    topTitle,
    checkBox,
    checkBoxOnly,
    radioGroup,
    radioGroupOther,
    associatedContract,
    associateCustomer,
    chooseProperty,
    selectArea,
  },
  created() {
    this.initAddress()
    this.getBankList();
    this.getErpMlDealProfitsProfitTypeList();
    this.ruleForm = {
      erpMlDeal: new erpMlDeal(),
      erpMlDealSellers: [],
      erpMlDealBuyUsers: [],
      erpMlDealOuterCooperations: [],
      erpMlDealProfits: [],
    };
    this.ruleForm.erpMlDealSellers.push(new erpMlDealSellersItem());
    this.ruleForm.erpMlDealBuyUsers.push(new erpMlDealBuyUsersItem());
    console.log(this.ruleForm.erpMlDealBuyUsers);
    if (this.typeStatus === "add") {
      this.ruleForm.erpMlDeal.dealDate = this.getDate();
      this.ruleForm.erpMlDeal.estimatedCommissionTime = this.getDate(
        new Date().getTime() + 180 * 24 * 60 * 60 * 1000
      );
    }
  },
  methods: {
    // 初始化时间国家省份城市
    async initAddress() {
      let data = await new GetInitInfoList().send();
      console.log(data);
    },
    // 获取银行列表
    async getBankList() {
      let data = await new getBankDicList().send();
      console.log(data, "银行列表");
      this.financeBankList = data;
    },
    // 获取业绩分配类型列表
    async getErpMlDealProfitsProfitTypeList() {
      let data = await new getFunPerformanceTypeList().send();
      let list = [];
      for (let item of data) {
        if (+item.collectionType === 2) {
          let obj = {
            label: item.performanceName,
            value: item.performanceId,
          };
          list.push(obj);
        }
      }
      this.erpMlDealProfitsProfitTypeList = list;
      console.log(this.erpMlDealProfitsProfitTypeList, "业绩分配类型列表");
    },
    // 时间处理
    getDate(dateVal) {
      let date = new Date();
      if (dateVal) date.setTime(dateVal);
      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      let day = date.getDate();
      let dateStr =
        year +
        "-" +
        (month > 9 ? month : "0" + month) +
        "-" +
        (day > 9 ? day : "0" + day);
      return dateStr;
    },
    // 设置预收佣日期
    setEstimatedCommissionTime() {
      let type = this.ruleForm.erpMlDeal.dealType
        ? this.ruleForm.erpMlDeal.dealType !== 2
          ? 90
          : 15
        : 0;
      if (!this.ruleForm.erpMlDeal.dealDate || !type) {
        this.ruleForm.erpMlDeal.estimatedCommissionTime = "";
        return;
      }
      this.ruleForm.erpMlDeal.estimatedCommissionTime = this.getDate(
        new Date(this.ruleForm.erpMlDeal.dealDate).getTime() +
          type * 24 * 60 * 60 * 1000
      );
    },
    // 类别选择
    categoryChange(val) {
      if (val !== 2) {
        this.ruleForm.erpMlDeal.mainDealId = "";
      }
    },
    // 盘源编号选择
    dealHouseStyleChange() {
      this.showChooseProperty();
    },
    // 合同编号选择
    entrustTypeChange() {
      this.showAssociatedContract();
    },
    // 交楼状态选择
    handoverStatusChange(value) {
      this.ruleForm.erpMlDeal.handoverStatus = value;
    },
    // 附带租约改变
    hasLeaseChange(value) {
      this.ruleForm.erpMlDeal.hasLease = +value ? "1" : "0";
    },
    // 增加业主信息
    addErpMlDealSellers() {
      this.ruleForm.erpMlDealSellers.push(new erpMlDealSellersItem());
    },
    // 删除业主信息
    delErpMlDealSellers(index) {
      if (index === 0) return;
      this.ruleForm.erpMlDealSellers.splice(index, 1);
    },
    // 业主选择性别
    sellSexChange(index, value) {
      this.ruleForm.erpMlDealSellers[index].sellSex = value;
    },
    // 添加客户信息
    addErpMlDealBuyUsers() {
      // this.ruleForm.erpMlDealBuyUsers.push(new erpMlDealBuyUsersItem())
      this.associateCustomerObj.isShow = true;
    },
    // 删除客户信息
    delErpMlDealBuyUsers(index) {
      if (index === 0) return;
      this.ruleForm.erpMlDealBuyUsers.splice(index, 1);
    },
    // 客户类型改变
    buyUserTypeChange(index) {
      this.ruleForm.erpMlDealBuyUsers[index].sellSex = 1;
    },
    // 选择客户性别
    userSexChange(index, value) {
      this.ruleForm.erpMlDealBuyUsers[index].sellSex = value;
    },
    // 勾选委托人
    principal(e) {
      if (e) {
        this.checkedShow = true;
      } else {
        this.checkedShow = false;
      }
      console.log(e);
    },
    // 添加电话
    addBuyUsersPhone() {
      this.buyUsersPhoneNum++;
      if (this.buyUsersPhoneNum > 2) this.buyUsersPhoneNum = 2;
    },
    // 删除电话
    delBuyUsersPhone(index) {
      this.buyUsersPhoneNum--;
      if (this.buyUsersPhoneNum === 0) {
        this.ruleForm.erpMlDealBuyUsers[index].secondContractType = "";
        this.ruleForm.erpMlDealBuyUsers[index].secondContractPhone = "";
      }
      if (this.buyUsersPhoneNum === 1) {
        this.ruleForm.erpMlDealBuyUsers[index].thirdContractType = "";
        this.ruleForm.erpMlDealBuyUsers[index].thirdContractPhone = "";
      }
      if (this.buyUsersPhoneNum < 0) this.buyUsersPhoneNum = 0;
    },
    // 外部合作费
    waibuhezuofeiChange(value) {
      this.waibuhezuofei = +value ? "1" : "0";
    },
    // 增加table-1
    addErpMlDealOuterCooperations() {
      this.ruleForm.erpMlDealOuterCooperations.push(
        new erpMlDealOuterCooperationsItem()
      );
    },
    // 删除table-1
    delErpMlDealOuterCooperations(index) {
      this.ruleForm.erpMlDealOuterCooperations.splice(index, 1);
    },
    // 增加table-2
    addErpMlDealProfits() {
      this.ruleForm.erpMlDealProfits.push(new erpMlDealProfitsitem());
    },
    // 删除table-2
    delErpMlDealProfits(index) {
      this.ruleForm.erpMlDealProfits.splice(index, 1);
    },
    // 管理合同
    showAssociatedContract() {
      this.associatedContractObj.isShow = true;
    },
    // 选择物业
    showChooseProperty() {
      this.choosePropertyObj.isShow = true;
    },
    // 选择片区
    showSelectArea() {
      this.selectAreaObj.isShow = true;
    },
    // 合作费改变
    cooperationCostChange(index) {
      setTimeout(() => {
        this.ruleForm.erpMlDealOuterCooperations[
          index
        ].cooperationCost = this.onlyNumber(
          this.ruleForm.erpMlDealOuterCooperations[index].cooperationCost
        );
        let num = 0;
        let reportingPerformance = 0;
        reportingPerformance =
          +this.ruleForm.erpMlDeal.sellOwnerCommsion +
          +this.ruleForm.erpMlDeal.buyCustomerCommsion;
        if (
          this.ruleForm.erpMlDeal.dealType === 1 &&
          this.ruleForm.erpMlDeal.payType === 2
        ) {
          reportingPerformance += +this.ruleForm.erpMlDeal.mortgageFee;
        }
        this.ruleForm.erpMlDealOuterCooperations.forEach((m, n) => {
          if (n !== index) {
            num += +m.cooperationCost;
          }
        });
        if (
          this.ruleForm.erpMlDealOuterCooperations[index].cooperationCost >
          reportingPerformance - num
        ) {
          this.ruleForm.erpMlDealOuterCooperations[index].cooperationCost =
            reportingPerformance - num;
        }
      }, 100);
    },
    // 选择金额比例
    jinebiliChange(value) {
      this.jinebili = value;
    },
    // 修改比例
    profitProportionChange(index) {
      if (this.reportingPerformance <= 0) {
        this.ruleForm.erpMlDealProfits[index].profitProportion = 0;
        return;
      }
      setTimeout(() => {
        this.ruleForm.erpMlDealProfits[
          index
        ].profitProportion = this.onlyNumber(
          this.ruleForm.erpMlDealProfits[index].profitProportion
        );
        let obj = this.isExceedProfitProportion(
          this.ruleForm.erpMlDealProfits[index].profitProportion,
          index
        );
        if (obj.isExceed) {
          this.ruleForm.erpMlDealProfits[index].profitProportion =
            obj.profitProportion;
        }
        this.ruleForm.erpMlDealProfits[index].profitMoney =
          (this.reportingPerformance *
            this.ruleForm.erpMlDealProfits[index].profitProportion) /
          100;
      }, 100);
    },
    // 修改金额
    profitMoneyChange(index) {
      if (this.reportingPerformance <= 0) {
        this.ruleForm.erpMlDealProfits[index].profitMoney = 0;
        return;
      }
      setTimeout(() => {
        this.ruleForm.erpMlDealProfits[index].profitMoney = this.onlyNumber(
          this.ruleForm.erpMlDealProfits[index].profitMoney
        );

        this.ruleForm.erpMlDealProfits[index].profitProportion =
          (this.ruleForm.erpMlDealProfits[index].profitMoney /
            this.reportingPerformance) *
          100;
        let obj = this.isExceedProfitProportion(
          this.ruleForm.erpMlDealProfits[index].profitProportion,
          index
        );
        if (obj.isExceed) {
          this.ruleForm.erpMlDealProfits[index].profitProportion =
            obj.profitProportion;
          this.ruleForm.erpMlDealProfits[index].profitMoney =
            (this.reportingPerformance *
              this.ruleForm.erpMlDealProfits[index].profitProportion) /
            100;
        }
      }, 100);
    },
    // 是否超出比例
    isExceedProfitProportion(num, index) {
      let obj = {
        profitProportion: 0,
        isExceed: false,
      };
      let nowNum = 0;
      this.ruleForm.erpMlDealProfits.forEach((m, n) => {
        if (n !== index) {
          nowNum += +m.profitProportion;
        }
      });
      obj.isExceed = nowNum + +num > 100;
      obj.profitProportion = obj.isExceed ? 100 - nowNum : num;
      return obj;
    },
    // 单量修改
    orderProportionChange(index) {
      let num = 0;
      let allNum = 1;
      this.ruleForm.erpMlDealProfits.forEach((m, n) => {
        if (n !== index) {
          num += +m.orderProportion;
        }
      });
      if (
        this.ruleForm.erpMlDealProfits[index].orderProportion >
        allNum - num
      ) {
        this.ruleForm.erpMlDealProfits[index].orderProportion = allNum - num;
      }
    },
    // 保存
    saveIt() {
      console.log("this.ruleForm", this.ruleForm.erpMlDeal.houseArea);
      this.$refs.ruleForm.validate(async (valid) => {
        if (valid) {
          console.log("this.ruleForm", this.ruleForm);
          // let data = new createMlDealReport(this.ruleForm).send()
          // console.log(data)
        }
      });
    },
    // 只能是数字
    onlyNumber(val) {
      let value = val;
      value = value.replace(/\D/g, "");
      return value;
    },
  },
  computed: {
    // 上报业绩
    reportingPerformance() {
      let num = 0;
      num =
        +this.ruleForm.erpMlDeal.sellOwnerCommsion +
        +this.ruleForm.erpMlDeal.buyCustomerCommsion;
      if (
        this.ruleForm.erpMlDeal.dealType === 1 &&
        this.ruleForm.erpMlDeal.payType === 2
      ) {
        num += +this.ruleForm.erpMlDeal.mortgageFee;
      }
      if (this.waibuhezuofei === "1") {
        let num_ = 0;
        for (let item of this.ruleForm.erpMlDealOuterCooperations) {
          num_ += +item.cooperationCost;
        }
        num -= num_;
      }
      return num;
    },
    // 标准佣金
    standardCommission() {
      return (
        this.ruleForm.erpMlDeal.dealPrice * this.standardCommissionProportion
      );
    },
    // 折扣
    discount() {
      if (this.standardCommission <= 0) return 0;
      return (
        (this.reportingPerformance /
          (this.ruleForm.erpMlDeal.priceUnit === "1"
            ? this.standardCommission
            : this.standardCommission * 10000)) *
        100
      );
    },
    // 合作费
    cooperationFees() {
      let num = 0;
      if (this.waibuhezuofei === "1") {
        for (let item of this.ruleForm.erpMlDealOuterCooperations) {
          num += +item.cooperationCost;
        }
      }
      return num;
    },
  },
};
</script>

<style lang="less" scoped>
@commonInputHeight: 0.3rem;
@commonTableHeight: 0.5rem;

/deep/ .el-form {
  &.el-form--inline {
    .el-form-item {
      margin-right: 0;
    }
  }
  .el-form-item {
    margin-bottom: 0.18rem;
    .el-form-item__label {
      line-height: @commonInputHeight;
      font-size: 0.14rem;
      padding: 0 0.12rem 0 0;
    }
    .el-form-item__content {
      line-height: normal;
      .el-input {
        font-size: 0.13rem;
        .el-input__inner {
          height: @commonInputHeight;
          line-height: @commonInputHeight;
          padding: 0 0.15rem 0 0.05rem;
          background-color: #fdfdfd;
          box-shadow: inset 0 0.01rem 0.05rem 0 rgba(202, 213, 223, 0.5);
          border-radius: 0.03rem;
          border: solid 0.01rem #bdc6cf;
          color: #444444;
        }
        .el-input__suffix {
          right: 0.05rem;
          line-height: @commonInputHeight;
          .el-input__suffix-inner {
            i {
              font-size: 0.14rem;
            }
          }
        }
        .el-input__prefix {
          left: 0.05rem;
          .el-input__suffix-inner {
            i {
              font-size: 0.14rem;
            }
          }
        }
        &.is-disabled {
          .el-input__inner {
            background-color: #eceded;
          }
        }
      }
      .el-input--prefix {
        .el-input__inner {
          padding: 0 0.3rem;
        }
      }
      .el-form-item__error {
        text-indent: 1.3rem;
      }
      .el-textarea {
        .el-textarea__inner {
          background-color: #fdfdfd;
          box-shadow: inset 0 0.01rem 0.05rem 0 rgba(202, 213, 223, 0.73);
          border-radius: 0.03rem;
          border: solid 0.01rem #bdc6cf;
          color: #444444;
        }
      }
    }
  }
}
/deep/ .el-checkbox-group {
  line-height: @commonInputHeight;
  .el-checkbox {
    font-size: 0.14rem;
    .el-checkbox__label {
      font-size: 0.14rem;
    }
  }
}

// /deep/ .el-checkbox {
//   color: #000;
//   .el-checkbox__input.is-checked + .el-checkbox__label {
//     color: #000;
//   }
//   .el-checkbox__inner {
//     width: 0.15rem;
//     height: 0.15rem;
//     background: #fff;
//     border-color: #666;
//     &::after {
//       border: 1px solid #666;
//       border-top: 0;
//       border-left: 0;
//       width: 0.06rem;
//       height: 0.12rem;
//       left: 0.03rem;
//       top: -0.02rem;
//     }
//   }
// }

.add-deal-report {
  width: 100%;
  height: auto;
  background-color: #fafafa;
  & > .a-d-r-top {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 0.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #ffffff;
    z-index: 99;
    & > .left {
      width: 1.25rem;
      text-align: center;
      height: 0.47rem;
      margin-left: 0.3rem;
      line-height: 0.47rem;
      border-bottom: 0.03rem solid #ff5a1f;
      color: #666666;
      font-size: 0.14rem;
    }
    & > .right {
      display: flex;
      align-items: center;
      & > div {
        width: 0.75rem;
        height: 0.3rem;
        line-height: 0.3rem;
        text-align: center;
        font-size: 0.12rem;
        background-repeat: no-repeat;
        background-size: 100% 100%;
        cursor: pointer;
        &.save {
          color: #ffffff;
          background-image: url("../../../../assets/images/projectAgentInfo/common/blue_normal.png");
          margin-right: 0.05rem;
          &:hover {
            background-image: url("../../../../assets/images/projectAgentInfo/common/blue_focus.png");
          }
        }
        &.cancel {
          color: #666666;
          background-image: url("../../../../assets/images/projectAgentInfo/common/white_normal.png");
          margin-right: 0.2rem;
        }
      }
    }
  }
  & > .rule-form {
    width: 10.4rem;
    height: auto;
    margin: 0 auto;
    padding-top: 1rem;
    padding-bottom: 0.5rem;
    box-sizing: border-box;
    overflow: hidden;
    .form-item-common {
      width: 100%;
      height: auto;
      &.form-item-box {
        display: flex;
        padding-left: 0.1rem;
        box-sizing: border-box;
        .form-item {
          position: relative;
          /deep/ .el-form-item__content {
            display: flex;
            align-items: center;
            & > .label-title {
              position: relative;
              width: 0.95rem;
              height: @commonInputHeight;
              line-height: @commonInputHeight;
              margin-right: 0.35rem;
              color: #444444;
              font-size: 0.12rem;
              text-align: right;
              &::after {
                content: ":";
                position: absolute;
                top: 0;
                right: -0.1rem;
                width: 0.1rem;
                height: @commonInputHeight;
                line-height: @commonInputHeight;
                text-align: center;
                color: #444444;
                font-size: 0.12rem;
              }
              &.red {
                &::before {
                  content: "*";
                  position: absolute;
                  top: 0;
                  right: -0.2rem;
                  width: 0.1rem;
                  height: @commonInputHeight;
                  line-height: 0.35rem;
                  text-align: center;
                  color: #ff5a1f;
                  font-size: 0.12rem;
                }
              }
            }
            & > .label-title_ {
              width: 0.95rem;
              margin-right: 0.35rem;
            }
            & > .other-title {
              color: #444444;
              font-size: 0.12rem;
            }
          }
          .delete-icon-1 {
            position: absolute;
            top: 0;
            left: 0.2rem;
            width: 0.15rem;
            height: 0.3rem;
            background-image: url("../../../../assets/images/public/delete_5_200.png");
            background-repeat: no-repeat;
            background-size: 100% 50%;
            background-position: center;
            cursor: pointer;
            z-index: 9;
          }
          .delete-icon-2 {
            position: absolute;
            top: 0;
            right: -0.2rem;
            width: 0.15rem;
            height: 0.3rem;
            background-image: url("../../../../assets/images/public/delete.png");
            background-repeat: no-repeat;
            background-size: 100% 50%;
            background-position: center;
            cursor: pointer;
            z-index: 9;
          }
          .add-icon {
            position: absolute;
            top: 0;
            right: -0.2rem;
            width: 0.15rem;
            height: 0.3rem;
            background-image: url("../../../../assets/images/public/add.png");
            background-repeat: no-repeat;
            background-size: 100% 50%;
            background-position: center;
            cursor: pointer;
            z-index: 9;
          }
        }
      }
    }
    .build-type {
      display: flex;
      height: @commonInputHeight;
      border: 1px solid #dcdfe6;
      box-sizing: border-box;
      color: #606266;
      border-radius: 4px;
      /deep/ .el-input {
        .el-input__inner {
          padding: 0 0 0 0.08rem;
          border: none;
          height: 0.28rem;
          line-height: 0.28rem;
          box-shadow: none;
          border: none;
        }
      }
      .unit {
        width: auto;
        line-height: @commonInputHeight;
        color: #999999;
        font-size: 0.12rem;
        background-color: #ffffff;
      }
    }
    .check-box-content {
      width: auto;
      display: flex;
      height: @commonInputHeight;
      line-height: @commonInputHeight;
    }
    .add-box {
      width: auto;
      height: @commonInputHeight;
      display: flex;
      align-items: center;
      cursor: pointer;
      & > img {
        width: 0.15rem;
        height: 0.15rem;
        display: block;
      }
      & > div {
        line-height: 1;
        color: #259cf3;
        font-size: 0.12rem;
        margin-left: 0.1rem;
      }
    }
    .performance-box {
      width: 100%;
      height: auto;
      padding-left: 0.4rem;
      box-sizing: border-box;
      .performance-list {
        width: 100%;
        height: auto;
        margin-top: 0.3rem;
        display: flex;
        align-items: center;
        & > .performance-list-item {
          width: 15%;
          height: auto;
          line-height: 1;
          & > span {
            &.p-l-left {
              font-size: 0.12rem;
              color: #444444;
            }
            &.p-l-right {
              font-size: 0.14rem;
              color: #f57107;
            }
          }
        }
      }
      .check-box-content-other {
        width: 100%;
        height: auto;
        margin: 0.3rem 0 0.15rem;
      }
      .table-box {
        // width: 100%;
        height: auto;
        background-color: #ffffff;
        border: 0.01rem solid #eaeaea;
        & > .table-buju-1 {
          width: 100%;
          height: @commonTableHeight;
          display: flex;
          border-bottom: 0.01rem solid #eaeaea;
          &:last-child {
            border-bottom: none;
          }
          & > div {
            height: @commonTableHeight;
            line-height: @commonTableHeight;
            color: #444444;
            font-size: 0.12rem;
            padding-right: 0.2rem;
            box-sizing: border-box;
            /deep/ .el-input__inner {
              height: @commonInputHeight;
              line-height: @commonInputHeight;
              background-color: #fdfdfd;
              box-shadow: inset 0 0.01rem 0.05rem 0 rgba(202, 213, 223, 0.5);
              border-radius: 0.03rem;
              border: solid 0.01rem #bdc6cf;
              color: #444444;
            }
            &:nth-child(1) {
              flex: 0 0 10%;
              padding-left: 0.2rem;
            }
            &:nth-child(2) {
              flex: 0 0 15%;
            }
            &:nth-child(3) {
              flex: 0 0 20%;
            }
            &:nth-child(4) {
              flex: 0 0 20%;
            }
            &:nth-child(5) {
              flex: 0 0 20%;
            }
            &:nth-child(6) {
              flex: 1 1 auto;
              padding-right: 0.4rem;
            }
            &.del-icon {
              padding-right: 0;
            }
            &.active {
              /deep/ .el-input__inner {
                color: #f57107;
              }
            }
          }
        }
        & > .table-buju-2 {
          width: 100%;
          height: @commonTableHeight;
          display: flex;
          border-bottom: 0.01rem solid #eaeaea;
          &:last-child {
            border-bottom: none;
          }
          & > div {
            height: @commonTableHeight;
            line-height: @commonTableHeight;
            color: #444444;
            font-size: 0.12rem;
            padding-right: 0.2rem;
            box-sizing: border-box;
            /deep/ .el-input__inner {
              height: @commonInputHeight;
              line-height: @commonInputHeight;
              background-color: #fdfdfd;
              box-shadow: inset 0 0.01rem 0.05rem 0 rgba(202, 213, 223, 0.5);
              border-radius: 0.03rem;
              border: solid 0.01rem #bdc6cf;
              color: #444444;
            }
            &:nth-child(1) {
              flex: 0 0 8%;
              padding-left: 0.2rem;
            }
            &:nth-child(2) {
              flex: 0 0 12%;
            }
            &:nth-child(3) {
              flex: 0 0 12%;
            }
            &:nth-child(4) {
              flex: 0 0 10%;
            }
            &:nth-child(5) {
              flex: 0 0 14%;
            }
            &:nth-child(6) {
              flex: 0 0 10%;
            }
            &:nth-child(7) {
              flex: 0 0 12%;
            }
            &:nth-child(8) {
              flex: 0 0 8%;
            }
            &:nth-child(9) {
              flex: 1 1 auto;
              padding-right: 0.4rem;
            }
            &.del-icon {
              padding-right: 0;
            }
            &.active {
              /deep/ .el-input__inner {
                color: #f57107;
              }
            }
          }
        }
        & > .table-buju {
          position: relative;
          .del-icon {
            position: absolute;
            top: 0.1rem;
            right: 0.1rem;
            width: 0.15rem;
            height: 0.3rem;
            background-image: url("../../../../assets/images/public/delete_200.png");
            background-repeat: no-repeat;
            background-size: 100% 50%;
            background-position: center;
            cursor: pointer;
            z-index: 9;
            display: none;
          }
          &:hover {
            background-color: #eaeaea;
            .del-icon {
              display: block;
            }
          }
        }
        & > .table-head {
          & > div {
            color: #999999;
            font-size: 0.12rem;
          }
        }
      }
      .performance-add-box {
        width: 100%;
        height: 0.5rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        & > .p-a-b-left {
          width: auto;
          display: flex;
          align-items: center;
          & > .add-box {
            margin-left: 0.1rem;
          }
        }
        & > .p-a-b-right {
          width: auto;
        }
      }
    }
  }
}
</style>
