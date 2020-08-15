<template>
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
        <div class="add-box" @click="addErpMlDealOuterCooperations()" v-if="waibuhezuofei === '1'">
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
          <el-select
            @click.native="why(index)"
            v-model="item.profitType"
            :style="{'width': '100%'}"
            placeholder
          >
            <el-option
              v-for="item in erpMlDealProfitsProfitTypeList"
              :key="item.performanceCode"
              :label="item.performanceName"
              :value="item.id"
            ></el-option>
          </el-select>
        </div>
        <div>
          <el-input
            @click.native="selsecArea(item)"
            v-model="item.compOrgName"
            :style="{'width': '100%'}"
            :readonly="true"
          ></el-input>
        </div>
        <div>
          <el-input
            @click.native="selsecPerson(item)"
            v-model="item.userName"
            :style="{'width': '100%'}"
            :readonly="true"
          ></el-input>
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
        <div>{{item.profitLeadersName}}</div>
        <div class="del-icon" @click="delErpMlDealProfits(index)"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
</style>