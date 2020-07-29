<template>
  <div style="width: 100%;height: 100%;">
    <div class="" style="display: none; position: absolute;">
      <div class="aui_outer">
        <table class="aui_border">
          <tbody>
            <tr>
              <td class="aui_nw"></td>
              <td class="aui_n"></td>
              <td class="aui_ne"></td>
            </tr>
            <tr>
              <td class="aui_w"></td>
              <td class="aui_c">
                <div class="aui_inner">
                  <table class="aui_dialog">
                    <tbody>
                      <tr>
                        <td colspan="2" class="aui_header">
                          <div class="aui_titleBar">
                            <div
                              class="aui_title"
                              style="cursor: move; display: block;"
                            ></div>
                            <a
                              class="aui_close"
                              href="javascript:/*artDialog*/;"
                              style="display: block;"
                              >×</a
                            >
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td class="aui_icon" style="display: none;">
                          <div
                            class="aui_iconBg"
                            style="background: none;"
                          ></div>
                        </td>
                        <td class="aui_main" style="width: auto; height: auto;">
                          <div class="aui_content" style="padding: 0px;"></div>
                        </td>
                      </tr>
                      <tr>
                        <td colspan="2" class="aui_footer">
                          <div class="aui_buttons" style="display: none;"></div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </td>
              <td class="aui_e"></td>
            </tr>
            <tr>
              <td class="aui_sw"></td>
              <td class="aui_s"></td>
              <td class="aui_se" style="cursor: se-resize;"></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <input
      type="hidden"
      id="dealreportId"
      name="dealreportId"
      value="b06317a4-dca0-462f-8997-ae28e2e63b38"
    />
    <div id="printTimeDiv" style="">
      打印时间:<span key="printDiv">2020-02-05 12:02</span>
    </div>
    <div class="pop-up_box">
      <div
        style="line-height:30px; border:1px solid #ddd; background:#f5f5f5; width:99.5%;"
      >
        <table width="100%" border="0" cellspacing="0" cellpadding="0">
          <tbody>
            <tr>
              <td align="center">
                <span class="size">
                  联动
                </span>
              </td>
              <td align="center">
                <font style="color:red;font-weight:bold;">{{
                  newHouseDetailInfo.reportClass | judgeReportClass
                }}</font>

                单号：{{ newHouseDetailInfo.reportNo }}
              </td>
              <td align="center">
                审批状态：
                <strong style="color:#007800; font-weight:bold;">
                  --
                </strong>
              </td>
              <td align="center">
                收佣状态：
                <strong style="color:#ff0000;">
                  {{
                    newHouseDetailInfo.commissionStatus == 0
                      ? "未收齐"
                      : "已收齐"
                  }}
                </strong>
              </td>
              <td align="center">
                结算状态：
                <strong style="color:#ff0000;">
                  --
                </strong>
              </td>
              <td align="center">
                制单人： {{ newHouseDetailInfo.createUserName }}（{{
                  newHouseDetailInfo.createTime | formatTime
                }}）
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!----盘源信息----->
      <div class="fgbox">
        <table
          width="100%"
          border="0"
          cellspacing="0"
          cellpadding="0"
          id="tabstyle"
        >
          <tbody>
            <tr>
              <td
                width="5%"
                align="center"
                style="border-right:1px solid #ddd; background:#f5f5f5; font-weight:bold; font-size:14px;"
              >
                盘源<br />信息
              </td>
              <td width="95%">
                <!----td里面插入table,注意结尾----->
                <table
                  width="100%"
                  border="0"
                  cellspacing="0"
                  cellpadding="0"
                  class="vtbs01"
                >
                  <tbody>
                    <tr>
                      <td width="45" height="20" align="right">项目：</td>
                      <td height="20">{{ newHouseDetailInfo.buildName }}</td>
                      <td width="65" height="20" align="right">物业信息：</td>
                      <td height="20" colspan="3">
                        <font style="color:#0000ff;">{{
                          newHouseDetailInfo.wuyeAddr
                        }}</font>
                        <font style="color:red;"
                          >(片区:{{ newHouseDetailInfo.wuyeAddr }})</font
                        >
                      </td>

                      <td colspan="2" height="20" align="right">户型：</td>
                      <td height="20">
                        {{ newHouseDetailInfo.buildRoom }}室{{
                          newHouseDetailInfo.buildHall
                        }}厅{{ newHouseDetailInfo.buildWei }}卫
                      </td>

                      <td width="65" height="20" align="right">建筑面积：</td>
                      <td height="20">
                        {{ newHouseDetailInfo.buildArea }}㎡(套内：{{
                          newHouseDetailInfo.buildInnerarea
                        }}㎡)

                        <font
                          style="border:1px solid #ff0000; margin-left: 10px; color:#ff0000;"
                        >
                          {{ newHouseDetailInfo.buildLevelName }}
                        </font>
                      </td>
                    </tr>
                    <tr>
                      <td width="60px;" align="right">开发商：</td>
                      <td align="left">
                        <span id="projectDevelopers">{{
                          newHouseDetailInfo.developerName
                        }}</span>
                      </td>
                      <td width="60px;" align="right">代理商：</td>
                      <td align="left">
                        <span id="projectAgents">{{
                          newHouseDetailInfo.agentName
                        }}</span>
                      </td>
                      <td align="right" width="60px">地址：</td>
                      <td colspan="3">
                        <span id="projectAddr"
                          >{{ newHouseDetailInfo.buildAddr }}</span
                        >
                      </td>
                      <td align="right" colspan="1">电话：</td>
                      <td colspan="2"><span id="projectAdvisoryTel">--</span></td>
                    </tr>
                  </tbody>
                </table>
                <!---表格结尾--->
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!----合同内容----->
      <div class="fgbox">
        <table
          width="100%"
          border="0"
          cellspacing="0"
          cellpadding="0"
          id="tabstyle"
        >
          <tbody>
            <tr>
              <td
                width="5%"
                align="center"
                style="border-right:1px solid #ddd; background:#f5f5f5; font-weight:bold; font-size:14px;"
              >
                认购<br />信息
              </td>
              <td width="95%">
                <!---表格开始--->
                <table
                  width="100%"
                  border="0"
                  cellspacing="0"
                  cellpadding="0"
                  class="vtbs01"
                >
                  <tbody>
                    <tr>
                      <td width="65" height="20" align="right">认购编号：</td>
                      <td height="20">{{ newHouseDetailInfo.offerNo }}</td>
                      <td width="65" height="20" align="right">认购日期：</td>
                      <td height="20" width="80">
                        {{ newHouseDetailInfo.offerTime | formatTime }}
                      </td>
                      <td width="65" height="20" align="right">认购总价：</td>
                      <td height="20" width="220">
                        {{ newHouseDetailInfo.offerAmount }} 元
                      </td>
                      <td width="65" height="20" align="right">认购金额：</td>
                      <td height="20" width="100">
                        {{ newHouseDetailInfo.offerMoney }} 元
                      </td>
                    </tr>
                    <tr>
                      <td width="65" height="20" align="right">首付日期：</td>
                      <td height="20">
                        {{ newHouseDetailInfo.firstPaymentTime | formatTime }}
                      </td>
                      <td width="45" height="20" align="right">备注：</td>
                      <td height="20" style="padding:0px 5px;" colspan="3">
                        {{ newHouseDetailInfo.note }}
                      </td>
                      <td width="75" height="20" align="right">
                        <span style="color:red; font-weight:bold; "
                          >预收佣日期：</span
                        >
                      </td>
                      <td height="20" width="80">
                        <span style="color:red; font-weight:bold; ">{{
                          newHouseDetailInfo.commissionPlanTime | formatTime
                        }}</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <!---表格结尾--->
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!----客源信息----->
      <div class="fgbox">
        <table width="100%" border="0" cellspacing="0" cellpadding="0">
          <tbody>
            <tr>
              <td
                width="5%"
                align="center"
                style="border-right:1px solid #ddd; background:#f5f5f5; font-weight:bold; font-size:14px;"
              >
                客源<br />信息
              </td>
              <td width="95%">
                <!---表格开始--->
                <table width="100%" border="0" cellspacing="0" cellpadding="0">
                  <tbody>
                    <tr>
                      <td style="padding:5px 0px 0px 5px;">
                        成交组织：
                        {{ newHouseDetailInfo.dealUserOrganizationName }}
                      </td>
                      <td>成交人员： {{ newHouseDetailInfo.dealUserName }}</td>
                      <td>成交客户： 田定先</td>
                      <td>客户来源： 线下：转介客</td>
                    </tr>
                  </tbody>
                </table>
                <!---表格结尾--->
                <!---表格开始--->
                <table
                  width="100%"
                  border="0"
                  cellspacing="0"
                  cellpadding="0"
                  class="vtbs01"
                >
                  <thead>
                    <tr>
                      <th>姓名</th>
                      <th>产权比例</th>
                      <th>身份证号</th>
                      <th>地域</th>
                      <th>性别</th>
                      <th>手机</th>
                      <th>备注</th>
                      <!-- <th>转介单号</th> -->
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="(item,
                      index) in newHouseDetailInfo.reporCustListVOs"
                      :key="index"
                    >
                      <td align="center">
                        {{ item.custName || "--" }}
                      </td>
                      <td align="center">{{ item.proportion || "--" }}</td>
                      <td align="center">
                        {{ item.custIccode || "--" }}
                      </td>
                      <td align="center">
                        {{ item.territory === 0 ? "大陆" : "海外" }}
                      </td>
                      <td align="center">
                        {{ item.custSex === 0 ? "女" : "男" }}
                      </td>

                      <td align="center">
                        {{ item.reportCustMobiles | filterReportCustMobiles }}
                      </td>
                      <td align="center">
                        {{ item.custNote || "--" }}
                      </td>
                      <!-- <td align="center"></td> -->
                    </tr>
                  </tbody>
                </table>
                <!---表格结尾--->
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!----业绩分配----->
      <div class="fgbox">
        <table width="100%" border="0" cellspacing="0" cellpadding="0">
          <tbody>
            <tr>
              <td
                width="5%"
                rowspan="2"
                align="center"
                style="border-right:1px solid #ddd; background:#f5f5f5; font-weight:bold; font-size:14px;"
              >
                业绩<br />分配
              </td>
              <td width="95%">
                <!---表格开始--->
                <table width="100%" border="0" cellspacing="0" cellpadding="0">
                  <tbody>
                    <tr>
                      <td width="85" height="20" align="right">
                        代理佣金：
                      </td>
                      <td height="20">
                        {{ newHouseDetailInfo.agencyCommission }}元
                      </td>
                      <td width="85" height="20" align="right">
                        客户佣金：
                      </td>
                      <td height="20">
                        {{ newHouseDetailInfo.custCommission }}元
                      </td>
                      <td
                        style="padding:0px;"
                        width="65"
                        height="20"
                        align="right"
                      >
                        标准佣金：
                      </td>
                      <td height="20">
                        {{ newHouseDetailInfo.standardCommission }} 元
                      </td>
                    </tr>
                  </tbody>
                </table>

                <!---表格结尾--->

                <!---表格开始--->

                <!---表格结尾--->
              </td>
            </tr>
            <tr>
              <td width="95%">
                <!---表格开始--->
                <table width="100%" border="0" cellspacing="0" cellpadding="0">
                  <tbody>
                    <!-- <tr>
                      <td width="85" height="20" align="right">
                        <span key="spanSaleType">联动</span>业绩：
                      </td>
                      <td height="20" width="80">
                        2188.47 元
                      </td>
                      <td width="85" height="20" align="right">业绩扣除：</td>
                      <td><span title=""></span></td>
                    </tr> -->
                    <tr>
                      <td colspan="4">
                        <table
                          id="agencyDeductTableShow"
                          width="100%"
                          v-if="newHouseDetailInfo.outCooperations.length > 0"
                          cellpadding="0"
                          cellspacing="0"
                          border="0"
                          class="vtbs01"
                        >
                          <thead>
                            <tr>
                              <th>合作人</th>
                              <th>身份证</th>
                              <th>电话</th>
                              <th>类型</th>
                              <th>合作费</th>
                            </tr>
                          </thead>
                          <tbody id="tbodyData">
                            <tr
                              v-for="(item,
                              index) in newHouseDetailInfo.outCooperations"
                              :key="index"
                            >
														<td align="center">{{ item.userName }}</td>
														<td align="center">{{ item.userIccode }}</td>
														<td align="center">{{ item.userMobile }}</td>
														<td align="center">{{ item.cooperationClass | filterCooperationClass }}</td>
														<td align="center">{{ item.cooperationCost }}</td>
														</tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <!---表格结尾--->

                <!---表格开始--->
                <table
                  width="100%"
                  style="margin-top:10px;"
                  border="0"
                  cellspacing="0"
                  cellpadding="0"
                  class="vtbs01"
                >
                  <thead>
                    <tr>
                      <th style="width:4%">序号</th>
                      <th style="width:8%">业绩月</th>
                      <th style="width:8%">分配类型</th>
                      <th style="width:20%">分配组别</th>
                      <th style="width:18%">分配人员</th>
                      <th style="width:8%">分配比例(%)</th>
                      <th style="width:8%">分配金额</th>
                      <th style="width:8%">单量</th>
                      <th style="width:8%">公司费用</th>
                      <th>间接业绩分配</th>
                    </tr>
                  </thead>
                  <tbody id="tbodyData">
                    <tr
                      v-for="(item,
                      index) in newHouseDetailInfo.reportProfitVOs"
                      :key="index"
                    >
                      <td align="center">{{ index + 1 }}</td>
                      <td align="center">{{ item.allotMonth }}</td>
                      <td align="center">
                        {{ item.allotTypeName }}
                      </td>

                      <td align="center">{{ item.allotOrganizationName }}</td>
                      <td align="center">{{ item.allotUserName }}</td>
                      <td align="center">{{ item.allotRatio }}</td>
                      <td align="center">{{ item.allotMoney }}</td>
                      <td align="center">{{ item.signNum }}</td>
                      <td align="center">
                        {{ item.compCostFlag == 0 ? "√" : "×" }}
                      </td>
                      <td
                        align="left"
                        width="340"
                        key="44693a67-1f2c-405d-9d76-02c442188c99"
                        name="leadData"
                      >
                        <span
                          id="leadaName"
                          style="padding-right:5px;"
                          title="香港大湾区总部:"
                          >{{ item.leaderUserName }}</span
                        >
                      </td>
                    </tr>
                  </tbody>
                </table>
                <!---表格结尾--->
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div id="printDiv" style="float:left;margin-top:20px;">
        <div>
          <span>Confirmed by Salespersons：______________________</span>
          <span>Approved by Branch Manager：______________________</span>
        </div>
        <div style="float:left;margin-top:20px;width:940px;">
          <span style="float:left;"
            >Approved by District Manager：___________________________</span
          >
          <span>Approved by Assistant GM/GM：___________________________</span>
        </div>
      </div>

      <div
        id="otherInfoDiv"
        style="
    display: none;
"
      >
        <div class="ds_title" id="project_title" style="margin-top:10px;">
          <ul>
            <li class="hover"><a href="javascript:void(0)">跟进信息</a></li>

            <li><a href="javascript:void(0)">项目收款</a></li>

            <li><a href="javascript:void(0)">现金奖</a></li>

            <li><a href="javascript:void(0)">资料信息</a></li>

            <li><a href="javascript:void(0)">结算信息</a></li>

            <li><a href="javascript:void(0)">操作信息</a></li>
            <li key="customerRelation">
              <a href="javascript:void(0)">客户关系</a>
            </li>
          </ul>
          <b style="margin-left:35px;" class="orangebtn btn"
            ><a href="javascript:void(0);" onclick="addRemind()">添加提醒</a></b
          >
        </div>
        <div
          style="border:1px solid #aacef2; float:left; width:99.8%;"
          id="project_content"
        >
          <div id="con_one_1">
            <div class="pyinScre" style="padding: 0 79px 0 0;">
              <form id="dataForm" onsubmit="return false;" method="post">
                <textarea
                  oninput="this.style.height=this.scrollHeight + &#39;px&#39;"
                  onpropertychange="this.style.height=this.scrollHeight + &#39;px&#39;"
                  style="overflow-y:hidden; height:24px;"
                  id="followdesc"
                  name="followdesc"
                  class="inx"
                  defaultvalue="输入跟进内容"
                >
输入跟进内容</textarea
                >
                <div class="Screright" style="width:80px;">
                  <a
                    onclick="saveFollow(this);"
                    class="Comment"
                    href="javascript:void(0);"
                    >跟进</a
                  >
                </div>
              </form>
            </div>

            <div id="followul" class="Personalinfo" style="height:auto;">
              <!-- <div nodata="" style="margin-left:40%;"> <img src="./打印成交报告-新房_files/nodata-S.png"></div> -->
            </div>
          </div>

          <div style="display:none;">
            <!-- <div id="tabDealOper"></div> -->

            ~暂时没有收款信息记录~
          </div>

          <div style="display:none;">
            <table
              width="100%"
              border="0"
              cellspacing="0"
              cellpadding="0"
              class="vtbs01"
            >
              <thead>
                <tr>
                  <th width="180">职位</th>
                  <th width="180">姓名</th>
                  <th width="180">分配金额</th>
                  <th>分配时间</th>
                </tr>
              </thead>
              <tbody key="assignAgencyDetailList">
                <tr>
                  <td colspan="4">~暂时没有现金奖信息记录~</td>
                </tr>
              </tbody>
            </table>
            <!-- 		<table width="100%" border="0" cellspacing="0" cellpadding="0" class="vtbs01" > -->
            <!--    			<thead> -->
            <!-- 				<th width="180">职位</th> -->
            <!-- 				<th width="180">姓名</th> -->
            <!-- 				<th width="180">分配金额</th> -->
            <!-- 				<th>分配时间</th> -->
            <!-- 			</thead> -->
            <!-- 			<tbody key="assignDetailList"> -->

            <!-- 					<tr> -->

            <!-- 					</tr> -->

            <!-- 			</tbody> -->
            <!-- 		</table> -->
          </div>

          <div style="display:none;">
            <div class="page1rightlist">
              <div
                datatypeid="e07370f0-4674-45c0-a405-9db203964741"
                class="pagechoice"
                title="身份证"
                style="width:20%;cursor:pointer;"
              >
                <dl class="Grey">
                  <dt>身份证</dt>
                  <dd>0/0</dd>
                </dl>
              </div>

              <div
                datatypeid="8e0b42e4-7251-41d7-92bf-4e648815382b"
                class="pagechoice"
                title="其它资料"
                style="width:20%;cursor:pointer;"
              >
                <dl class="Grey">
                  <dt>其它资料</dt>
                  <dd>0/0</dd>
                </dl>
              </div>

              <div
                datatypeid="50086dde-1aac-4f2f-8a6a-c6c4b3a81697"
                class="pagechoice"
                title="客户确认书"
                style="width:20%;cursor:pointer;"
              >
                <dl class="Grey">
                  <dt>客户确认书</dt>
                  <dd>0/0</dd>
                </dl>
              </div>

              <div
                datatypeid="3b5af9ec-a5e3-47b7-b2e6-d5a333704ff7"
                class="pagechoice"
                title="成交确认书"
                style="width:20%;cursor:pointer;"
              >
                <dl class="Grey">
                  <dt>成交确认书</dt>
                  <dd>0/0</dd>
                </dl>
              </div>

              <div
                datatypeid="5ef027c1-0ef6-4f82-931f-62727c9cea9e"
                class="pagechoice"
                title="认购书"
                style="width:20%;cursor:pointer;"
              >
                <dl class="Grey">
                  <dt>认购书</dt>
                  <dd>0/0</dd>
                </dl>
              </div>

              <div
                datatypeid="be3c250e-e0cc-4a44-a3fd-6bd37acfdd44"
                class="pagechoice"
                title="分数ISF表"
                style="width:20%;cursor:pointer;"
              >
                <dl class="Grey">
                  <dt>分数ISF表</dt>
                  <dd>0/0</dd>
                </dl>
              </div>

              <div
                datatypeid="b4844218-74f2-473c-b1d1-22786a2589e4"
                class="pagechoice"
                title="事后增佣表"
                style="width:20%;cursor:pointer;"
              >
                <dl class="Grey">
                  <dt>事后增佣表</dt>
                  <dd>0/0</dd>
                </dl>
              </div>

              <div
                datatypeid="77ded54d-0110-4d8b-b4fa-f7c06b3005d9"
                class="pagechoice"
                title="中介费用申请表"
                style="width:20%;cursor:pointer;"
              >
                <dl class="Grey">
                  <dt>中介费用申请表</dt>
                  <dd>0/0</dd>
                </dl>
              </div>

              <div
                datatypeid="d9b4ecf8-5e89-4205-b360-fb212628b646"
                class="pagechoice"
                title="上数申请"
                style="width:20%;cursor:pointer;"
              >
                <dl class="Grey">
                  <dt>上数申请</dt>
                  <dd>0/0</dd>
                </dl>
              </div>

              <div
                datatypeid="0970b1a4-83fd-44e6-8e81-7a1a8fd70cd9"
                class="pagechoice"
                title="ISF表"
                style="width:20%;cursor:pointer;"
              >
                <dl class="Grey">
                  <dt>ISF表</dt>
                  <dd>0/0</dd>
                </dl>
              </div>

              <div
                datatypeid="11b988f2-4628-4daa-8d24-5067761c2d57"
                class="pagechoice"
                title="刷卡"
                style="width:20%;cursor:pointer;"
              >
                <dl class="Grey">
                  <dt>刷卡</dt>
                  <dd>0/0</dd>
                </dl>
              </div>
            </div>
          </div>

          <div style="display:none;">
            ~暂时没有结算信息记录~
          </div>

          <div style="display:none;">
            <table
              key="followTable"
              width="100%"
              border="0"
              cellspacing="0"
              cellpadding="0"
              class="vtbs01"
            >
              <thead>
                <tr>
                  <th>跟进类型</th>
                  <th>跟进人部门</th>
                  <th>跟进人</th>
                  <th>跟进时间</th>
                  <th>跟进内容</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td></td>
                  <td>香港大湾区总部分店</td>
                  <td>伍艳婷</td>
                  <td>2020-02-02 19:44</td>
                  <td>伍艳婷修改编码为：【SZX200180055】的成交报告。</td>
                </tr>

                <tr>
                  <td></td>
                  <td>香港大湾区总部分店</td>
                  <td>伍艳婷</td>
                  <td>2020-02-02 19:30</td>
                  <td>伍艳婷修改编码为：【SZX200180055】的成交报告。</td>
                </tr>

                <tr>
                  <td></td>
                  <td>香港大湾区总部分店</td>
                  <td>伍艳婷</td>
                  <td>2020-02-02 19:17</td>
                  <td>伍艳婷修改编码为：【SZX200180055】的成交报告。</td>
                </tr>

                <tr>
                  <td></td>
                  <td>香港大湾区总部分店</td>
                  <td>伍艳婷</td>
                  <td>2020-01-31 00:48</td>
                  <td>伍艳婷修改编码为：【SZX200180055】的成交报告。</td>
                </tr>

                <tr>
                  <td></td>
                  <td>香港大湾区总部分店</td>
                  <td>伍艳婷</td>
                  <td>2020-01-31 00:46</td>
                  <td>伍艳婷修改编码为：【SZX200180055】的成交报告。</td>
                </tr>

                <tr>
                  <td></td>
                  <td>香港大湾区总部分店</td>
                  <td>伍艳婷</td>
                  <td>2020-01-31 00:45</td>
                  <td>伍艳婷修改编码为：【SZX200180055】的成交报告。</td>
                </tr>

                <tr>
                  <td></td>
                  <td>香港大湾区总部分店</td>
                  <td>伍艳婷</td>
                  <td>2020-01-31 00:35</td>
                  <td>伍艳婷修改编码为：【SZX200180055】的成交报告。</td>
                </tr>

                <tr>
                  <td></td>
                  <td>香港大湾区总部分店</td>
                  <td>伍艳婷</td>
                  <td>2020-01-31 00:04</td>
                  <td>伍艳婷修改编码为：【SZX200180055】的成交报告。</td>
                </tr>

                <tr>
                  <td></td>
                  <td>香港大湾区总部分店</td>
                  <td>伍艳婷</td>
                  <td>2020-01-30 21:02</td>
                  <td>伍艳婷新增编码为：【SZX200180055】的成交报告。</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div divkey="customerRelation" style="display:none;"></div>
        </div>
      </div>

      <div
        style="display: none; position: fixed; left: 0px; top: 0px; width: 100%; height: 100%; cursor: move; opacity: 0; background: rgb(255, 255, 255);"
      ></div>
    </div>
		<div class="print" @click="printTemplate">打印</div>
  </div>
</template>

<script>
import { ErpCommon } from "../../../../utils/ErpCommon";
import {GetLoginModel} from "../../../../model/LoginModel"
import {
  ReportInfoDetail,
  ReportInfoDetailRequest,
  ReportInfoDetailItem,
} from "../../../../net/newHouseDealReport/display/reporInfoDetail";
export default {
  data() {
    return {
      newHouseDetailInfo: new ReportInfoDetailItem(), //新房成交报告详情数据
      params: {
        reportId: 1, //成交报告ID
      },
    };
  },
  created() {
    this.initData();
  },
  methods: {
    //初始化详情数据
    initData() {
      new ReportInfoDetail(new ReportInfoDetailRequest(this.params))
        .send()
        .then((res) => {
          this.newHouseDetailInfo = res;
          console.log(this.newHouseDetailInfo, "成交报告详情初始化数据");
        })
        .catch((res) => {
          console.log(res, "err");
          new ErpCommon().toast(
            res.errMsg || "服务器开小差了,请稍后再试!",
            "error"
          );
        });
		},
		//获取url上除hash外的地址
     getUrlWithoutHash(){
      let url = '';
      let hash = window.location.hash
      let href = window.location.href;
      url = href.replace(hash,'');
      return url
      },
		//打印成交报告
		printTemplate(){
			 // 获取当前成交报告界面路径
         // 获取clientKey
         let clientKey =  GetLoginModel.getClientKey();
         let url = this.getUrlWithoutHash() + "#/newHousedealPrint?clientKey="
					+ clientKey;
					console.log(url,'当前成交报告界面路径');
			// new ErpCommon().dealReportPrint(url);
		},
  },
  filters: {
		//格式化时间
    formatTime(val, flag) {
      if (val != "" && val != undefined) {
        //flag false 代表年月日 true 代表时分秒
        if (flag) return val.split(" ")[1];
        if (!flag) return val.split(" ")[0];
      } else {
        return "--";
      }
		},
		//判断外部合作类型
		filterCooperationClass(val){
			 let arr = ["第三方", "买房", "公司内部"];
      if (val != "" && val != undefined) {
        return arr[Number(val) - 1];
      } else {
        return "--";
      }
		},
    //判断项目类别
    judgeReportClass(val) {
      let arr = ["一般成交", "事后加佣", "口头代理费", "外区分佣"];
      if (val != "" && val != undefined) {
        return arr[Number(val) - 1];
      } else {
        return "--";
      }
    },
    //过滤客户电话号码
    filterReportCustMobiles(val) {
      let telString = "";
      if (val && val.length > 0) {
        if (val.length > 1) {
          for (let i = 0; i < val.length; i++) {
            //电话超过三个则拼接显示省略号
            if (i >= 3) {
              return (telString += "...");
            }
            telString += val[i].custMobile + ",";
          }
          return telString;
        } else {
          return (telString += val[0].custMobile);
        }
      } else {
        return "--";
      }
    },
  },
};
</script>

<style lang="less" scoped>
@import "../../../../style/dealReportPrint/blue.css";
@import "../../../../style/dealReportPrint/cfzx.css";
@import "../../../../style/dealReportPrint/datepicker(1).css";
@import "../../../../style/dealReportPrint/datepicker.css";
@import "../../../../style/dealReportPrint/default.css";
@import "../../../../style/dealReportPrint/index.css";
.print {
	width: 0.6rem;
	height: 0.2rem;
	font-size: 0.12rem;
	background-color: #ebebeb;
	line-height: 0.2rem;
	text-align: center;
	margin-top: 0.4rem;
	cursor: pointer;
}
.vtbs01 thead tr th {
  text-align: center;
  color: #000;
}
.vtbs01 tbody tr td {
  color: #000;
}
.pop-up_box {
  width: 100%;
  padding: 0px;
}
.fgbox {
  width: 99.5%;
  color: #000;
}
.common_ul {
  float: left;
  width: 100%;
  padding-top: 3px;
}
.common_ul ul {
  float: left;
  width: 100%;
}
.common_ul li {
  float: left;
  padding-bottom: 5px;
  line-height: 18px;
}
.common_ul li .common_ul_l {
  width: 75px;
  text-align: right;
  float: left;
  background: #cfcfcf;
}
.common_ul li .common_ul_r {
  width: 180px;
  padding-left: 5px;
  float: left;
}
.select_recieve_date {
  color: #fff;
  font-weight: bold;
  background: #999;
  display: line-block;
  padding: 2px 3px;
}
.disk_source_box {
  padding-bottom: 0px;
}
#tabstyle td:nth-child(1),
#tabstyle td:nth-child(3),
#tabstyle td:nth-child(5),
#tabstyle td:nth-child(7) {
  padding: 0;
  background: #f5f5f5;
}
.tdstyle {
  background: #fcfcfc;
  color: #666;
}
</style>
