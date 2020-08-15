
import { GetBaseInfoModel } from "../model/BaseInfoModel";
import { ErpCommon } from "./ErpCommon";


// 用户权限
export class UserPermission {
  // --------------------目前限制权限-------------------------

  // KPI查看权限--KPI_STATISTIC_QUERY
  // 经纪人KPI配置权--KPI_CONFIGURATE_BROKER
  // 分行经理KPI配置权--KPI_CONFIGURATE_ORG_MANAGER
  // 区域总监KPI配置权--KPI_CONFIGURATE_REGION_MANAGER
  // 区主KPI配置权--KPI_CONFIGURATE_CITY_MANAGER
  // KPI导出权--KPI_STATISTIC_EXPORT
  // Kpi历史数据查看权--KPI_STATISTIC_QUERY_HIS
  // 开单数导入权--KPI_STATISTIC_BILLING_IMPORT
  // 收支平衡导入权限--KPI_PAYMENT_BALANCE_IMPORT
  // 目标设置权限--KPI_CONFIGURATE_TARGET
  // 工作分调整权--KPI_CONFIGURATE_WORK_SCORE
  // 收佣率调整权--KPI_CONFIGURATE_COMMISSION_RATE

  // --------------------成交报告-------------------------
  //   1.成交报告导出权--NEWBUILD_EXPORT
  //   2.成交报告核心查看权--DEAL_REPORT_CORE_SEE

  // --------------------代理合同-------------------------
  //   1.代理合同批借权，可审核合同批借--AGENCY_CONTRACT_APPROVE
  //   2.代理合同归档权，可审核合同归档--AGENCY_CONTRACT_FILE_RETURN
  //   3.代理合同作废权（已审批），有该权限的可作废合同(暂不做)
  //   4.代理合同复制权，可复制合同，出现复制按钮--AGENCY_CONTRACT_COPY
  //   5.代理合同终止权，可终止合同--AGENCY_CONTRACT_TERMINATION  
  //   6.代理合同查看权，层级公司。。。无，根据申请人范围控制；注意如果是文员管理中的人
  //   员，有权限且权限不等于公司的时候只可看管理门店的数据，权限到了公司可看全公司的数据--AGENCY_CONTRACT_SEE
  //   7.代理合同导出权，有该权限的可导出代理合同列表
  //   导出的Excel名称：{ 开始时间 } -{ 结束时间 }代理合同，如2020 - 04 - 01～2020 - 04 - 09代理合同--AGENCY_CONTRACT_EXPORT
  // 8.代理合同新增权，可新增代理合同--AGENCY_CONTRACT_ADD
  // 9.代理合同编辑权，可编辑代理合同--AGENCY_CONTRACT_UPDATE
  // 10.代理合同删除权，可删除代理合同，注意审核中，未审核的合同显示删除按钮(暂不做)
  // 11.代理合同审批权，可审批代理合同（通过权限控制还是通过流程配置控制？）(暂不做)
  // 12.代理合同打印权，可打印代理合同详情--AGENCY_CONTRACT_PRINTING
  // 13.代理合同特改权，有该权限的可特改合同(暂不做)
  // 14.代理合同外借权，可外借代理合同--AGENCY_CONTRACT_OUT_BORROW
  // 15.代理合同归还权，可归还代理合同--AGENCY_CONTRACT_RETURN

  // --------------------分销合同-------------------------
  // 1.分销合同批借权，可审核合同批借--AGENCY_DISTRIBUTE_CONTRACT_APPROVE
  // 2.分销合同归档权，可审核合同归档--AGENCY_DISTRIBUTE_CONTRACT_FILE_RETURN
  // 3.分销合同作废权（已审批），有权限的可作废合同(暂不做)
  // 4.分销合同复制权，可复制合同，出现复制按钮--AGENCY_DISTRIBUTE_CONTRACT_COPY
  // 5.分销合同终止权，可终止合同--AGENCY_DISTRIBUTE_CONTRACT_COPY
  // 6.分销合同查看权，层级公司。。。无，根据申请人范围控制；注意如果是文员管理中的人
  // 员，有权限且权限不等于公司的时候只可看管理门店的数据，权限到了公司可看全公司
  // 的数据 --AGENCY_DISTRIBUTE_CONTRACT_SEE
  // 7.分销合同导出权，有该权限的可导出分销合同列表 -- AGENCY_DISTRIBUTE_CONTRACT_EXPORT
  // 8.分销合同新增权，可新增分销合同 --AGENCY_DISTRIBUTE_CONTRACT_ADD
  // 9.分销合同编辑权，可编辑分销合同 --AGENCY_DISTRIBUTE_CONTRACT_UPDATE
  // 10.分销合同删除权，可删除分销合同，注意审核中，未审核的合同显示删除按钮(暂不做)
  // 11.分销合同审批权，可审批分销合同（通过权限控制还是通过流程配置控制？）(暂不做)
  // 12.分销合同打印权，可打印分销合同详情 --AGENCY_DISTRIBUTE_CONTRACT_PRINTING
  // 13.分销合同特改权，有该权限的可特改合同(暂不做)
  // 14.分销合同外借权，可外借分销合同--AGENCY_DISTRIBUTE_CONTRACT_OUT_BORROW
  // 15.分销合同归还权，可归还分销合同--AGENCY_DISTRIBUTE_CONTRACT_RETURN

  // --------------------分销公司-------------------------
  //   1.分销公司查看权，有权限的人显示分销公司入口 -- DISTRIBUTION_COMPANY_SEE
  //   2.分销公司新增权，可新增分销公司 --DISTRIBUTION_COMPANY_ADD
  //   3.分销公司编辑权，可编辑分销公司 --DISTRIBUTION_COMPANY_UPDATE
  //   4.分销公司删除权，可删除分销公司 --DISTRIBUTION_COMPANY_DELETE
  //   5.分销公司列表导出权，有该权限的可导出分销公司列表 --DISTRIBUTION_COMPANY_EXPORT

  // --------------------分销经纪人-------------------------
  // 1.分销经纪人查看权，有权限的人显示分销经纪人入口 --DISTRIBUTION_BROKER_SEE
  // 2.分销经纪人编辑权，可编辑分销经纪人 --DISTRIBUTION_BROKER_UPDATE 
  // 3.分销经纪人删除权，可删除分销经纪人 --DISTRIBUTION_BROKER_DELETE
  // 4.分销经纪人列表导出权，有该权限的可导出分销公司列表 --DISTRIBUTION_BROKER_EXPORT

  // --------------------补充公司资料-------------------------
  //  1.公司资料查看权，层级公司。。。无，根据申请人范围控制，注意如果是文员管理中的人
  // 员，有权限且权限不等于公司的时候只可看管理门店的数据，权限到了公司可看全公司
  // 的数据                                                             (暂不做)
  // 2.公司资料新增权，有权限的人可新增补充的公司资料--SUPPLEMENTARY_COMPANY_INFORMATION_ADD
  // 3.公司资料编辑权，有权限的人可编辑补充的公司资料--SUPPLEMENTARY_COMPANY_INFORMATION_UPDATE
  // 4.公司资料删除权，有权限的人可删除补充的公司资料(暂不做)
  // 5.公司资料列表导出权，有该权限的可导出补充公司资料列表--SUPPLEMENTARY_COMPANY_INFORMATION_EXPORT


  // KPI查看权限
  KPILookAuth() {
    return GetBaseInfoModel.getUserOpers().includes("KPI_STATISTIC_QUERY");
  }

  // 经纪人KPI配置权
  KPIConfigAuth() {
    if (new ErpCommon().isErp()) {
      return GetBaseInfoModel.getUserOpers().includes("KPI_CONFIGURATE_BROKER");
    } else {
      return true;
    }
  }

  // 分行经理KPI配置权
  KPIOrgManagerAuth() {
    if (new ErpCommon().isErp()) {
      return GetBaseInfoModel.getUserOpers().includes("KPI_CONFIGURATE_ORG_MANAGER");
    } else {
      return true;
    }
  }

  // 区域总监KPI配置权
  KPIRegionManagerAuth() {
    return GetBaseInfoModel.getUserOpers().includes("KPI_CONFIGURATE_REGION_MANAGER");
  }

  // 区主KPI配置权
  KPICityManagerAuth() {
    return GetBaseInfoModel.getUserOpers().includes("KPI_CONFIGURATE_CITY_MANAGER");
  }

  // KPI导出权
  KPIExportAuth() {
    return GetBaseInfoModel.getUserOpers().includes("KPI_STATISTIC_EXPORT");
  }

  // Kpi历史数据查看权
  KPILookHistoryDataAuth() {
    return GetBaseInfoModel.getUserOpers().includes("KPI_STATISTIC_QUERY_HIS");
  }

  // 开单数导入权
  KPIImportAuth() {
    return GetBaseInfoModel.getUserOpers().includes("KPI_STATISTIC_BILLING_IMPORT");
  }

  // 收支平衡导入权限
  KPIBreakEvenImportAuth() {
    return GetBaseInfoModel.getUserOpers().includes("KPI_PAYMENT_BALANCE_IMPORT");
  }

  // 目标设置权限
  KPIGoalSetAuth() {
    return GetBaseInfoModel.getUserOpers().includes("KPI_CONFIGURATE_TARGET");
  }

  // 工作分调整权
  KPIWorkPointsAuth() {
    return GetBaseInfoModel.getUserOpers().includes("KPI_CONFIGURATE_WORK_SCORE");
  }

  // 收佣率调整权
  KPIChangeCommissionAuth() {
    return GetBaseInfoModel.getUserOpers().includes("KPI_CONFIGURATE_COMMISSION_RATE");
  }
  // --------------------成交报告-------------------------
  //新房成交报告导出权
  NEWBUILD_EXPORT() {
    return GetBaseInfoModel.getUserOpers().includes("NEWBUILD_EXPORT");
  }
  //新房成交报告核心查看权
  DEAL_REPORT_CORE_SEE() {
    return GetBaseInfoModel.getUserOpers().includes("DEAL_REPORT_CORE_SEE");
  }
  //二手房成交报告导出权
  SECOND_HOUSE_EXPORT() {
    return GetBaseInfoModel.getUserOpers().includes("SECOND_HOUSE_EXPORT");
  }
  //二手房成交报告核心查看权
  SECOND_DEAL_REPORT_CORE_SEE() {
    return GetBaseInfoModel.getUserOpers().includes("SECOND_DEAL_REPORT_CORE_SEE");
  }
  // --------------------代理合同-------------------------
  //代理合同批借权，可审核合同批借
  AGENCYContractApproveAuth() {
    return GetBaseInfoModel.getUserOpers().includes("AGENCY_CONTRACT_APPROVE");
  }
  //代理合同归档权，可审核合同归档
  AGENCYContractFileReturnAuth() {
    return GetBaseInfoModel.getUserOpers().includes("AGENCY_CONTRACT_FILE_RETURN");
  }
  //代理合同复制权，可复制合同，出现复制按钮
  AGENCYContractCopyAuth() {
    return GetBaseInfoModel.getUserOpers().includes("AGENCY_CONTRACT_COPY");
  }
  //代理合同终止权，可终止合同
  AGENCYContractTerminattionAuth() {
    return GetBaseInfoModel.getUserOpers().includes("AGENCY_CONTRACT_TERMINATION");
  }
  //代理合同查看权，层级公司。。。无，根据申请人范围控制；注意如果是文员管理中的人员，有权限且权限不等于公司的时候只可看管理门店的数据，权限到了公司可看全公司的数据
  AGENCYContractSeeAuth() {
    return GetBaseInfoModel.getUserOpers().includes("AGENCY_CONTRACT_SEE");
  }
  //代理合同导出权，有该权限的可导出代理合同列表
  AGENCYContractExportAuth() {
    return GetBaseInfoModel.getUserOpers().includes("AGENCY_CONTRACT_EXPORT");
  }
  //代理合同新增权，可新增代理合同
  AGENCYContractAddAuth() {
    return GetBaseInfoModel.getUserOpers().includes("AGENCY_CONTRACT_ADD");
  }
  //代理合同编辑权，可编辑代理合同
  AGENCYContractUpdateAuth() {
    return GetBaseInfoModel.getUserOpers().includes("AGENCY_CONTRACT_UPDATE");
  }
  //代理合同打印权，可打印代理合同详情
  AGENCYContractPrintAuth() {
    return GetBaseInfoModel.getUserOpers().includes("AGENCY_CONTRACT_PRINTING");
  }
  //代理合同外借权，可外借代理合同
  AGENCYContractOutBorrowAuth() {
    return GetBaseInfoModel.getUserOpers().includes("AGENCY_CONTRACT_OUT_BORROW");
  }
  //代理合同归还权，可归还代理合同
  AGENCYContractReturnAuth() {
    return GetBaseInfoModel.getUserOpers().includes("AGENCY_CONTRACT_RETURN");
  }

  // --------------------分销合同-------------------------
  //分销合同批借权，可审核合同批借 Distribute
  AGENCYDistributeApproveAuth() {
    return GetBaseInfoModel.getUserOpers().includes("AGENCY_DISTRIBUTE_CONTRACT_APPROVE");
  }
  //分销合同归档权，可审核合同归档
  AGENCYDistributeFileReturnAuth() {
    return GetBaseInfoModel.getUserOpers().includes("AGENCY_DISTRIBUTE_CONTRACT_FILE_RETURN");
  }
  //分销合同复制权，可复制合同，出现复制按钮
  AGENCYDistributeCopyAuth() {
    return GetBaseInfoModel.getUserOpers().includes("AGENCY_DISTRIBUTE_CONTRACT_COPY");
  }
  //代理合同终止权，可终止合同
  AGENCYDistributeTerminattionAuth() {
    return GetBaseInfoModel.getUserOpers().includes("AGENCY_DISTRIBUTE_CONTRACT_TERMINATION");
  }
  //分销合同查看权，层级公司。。。无，根据申请人范围控制；注意如果是文员管理中的人员，有权限且权限不等于公司的时候只可看管理门店的数据，权限到了公司可看全公司的数据
  AGENCYDistributeSeeAuth() {
    return GetBaseInfoModel.getUserOpers().includes("AGENCY_DISTRIBUTE_CONTRACT_SEE");
  }
  //分销合同导出权，有该权限的可导出分销合同列表
  AGENCYDistributeExportAuth() {
    return GetBaseInfoModel.getUserOpers().includes("AGENCY_DISTRIBUTE_CONTRACT_EXPORT");
  }
  //分销合同新增权，可新增分销合同
  AGENCYDistributeAddAuth() {
    return GetBaseInfoModel.getUserOpers().includes("AGENCY_DISTRIBUTE_CONTRACT_ADD");
  }
  //分销合同编辑权，可编辑分销合同
  AGENCYDistributeUpdateAuth() {
    return GetBaseInfoModel.getUserOpers().includes("AGENCY_DISTRIBUTE_CONTRACT_UPDATE");
  }
  //分销合同打印权，可打印分销合同详情
  AGENCYDistributePrintAuth() {
    return GetBaseInfoModel.getUserOpers().includes("AGENCY_DISTRIBUTE_CONTRACT_PRINTING");
  }
  //代理合同外借权，可外借代理合同
  AGENCYDistributeOutBorrowAuth() {
    return GetBaseInfoModel.getUserOpers().includes("AGENCY_DISTRIBUTE_CONTRACT_OUT_BORROW");
  }
  //分销合同归还权，可归还分销合同
  AGENCYDistributeReturnAuth() {
    return GetBaseInfoModel.getUserOpers().includes("AGENCY_DISTRIBUTE_CONTRACT_RETURN");
  }

  // --------------------分销公司-------------------------
  //分销公司查看权，有权限的人显示分销公司入口
  DISTRIBUTIONCpySeeAuth() {
    return GetBaseInfoModel.getUserOpers().includes("DISTRIBUTION_COMPANY_SEE");
  }
  //分销公司新增权，可新增分销公司
  DISTRIBUTIONCpyAddAuth() {
    return GetBaseInfoModel.getUserOpers().includes("DISTRIBUTION_COMPANY_ADD");
  }
  //分销公司编辑权，可编辑分销公司
  DISTRIBUTIONCpyUpdateAuth() {
    return GetBaseInfoModel.getUserOpers().includes("DISTRIBUTION_COMPANY_UPDATE");
  }
  //分销公司删除权，可删除分销公司
  DISTRIBUTIONCpyDeleteAuth() {
    return GetBaseInfoModel.getUserOpers().includes("DISTRIBUTION_COMPANY_DELETE");
  }
  //分销公司列表导出权，有该权限的可导出分销公司列表
  DISTRIBUTIONCpyExportAuth() {
    return GetBaseInfoModel.getUserOpers().includes("DISTRIBUTION_COMPANY_EXPORT");
  }

  // --------------------分销经纪人-------------------------
  //分销经纪人查看权，有权限的人显示分销经纪人入口
  DISTRIBUTIONBrokerSeeAuth() {
    return GetBaseInfoModel.getUserOpers().includes("DISTRIBUTION_BROKER_SEE");
  }
  //分销公司编辑权，可编辑分销公司
  DISTRIBUTIONBrokerUpdateAuth() {
    return GetBaseInfoModel.getUserOpers().includes("DISTRIBUTION_BROKER_UPDATE");
  }
  //分销公司删除权，可删除分销公司
  DISTRIBUTIONBrokerDeleteAuth() {
    return GetBaseInfoModel.getUserOpers().includes("DISTRIBUTION_BROKER_DELETE");
  }
  //分销公司列表导出权，有该权限的可导出分销公司列表
  DISTRIBUTIONBrokerExportAuth() {
    return GetBaseInfoModel.getUserOpers().includes("DISTRIBUTION_BROKER_EXPORT");
  }

  // --------------------补充公司资料-------------------------
  //公司资料新增权，有权限的人可新增补充的公司资料
  SUPPLEMENTARYCpyAddAuth() {
    return GetBaseInfoModel.getUserOpers().includes("SUPPLEMENTARY_COMPANY_INFORMATION_ADD");
  }
  //公司资料编辑权，有权限的人可编辑补充的公司资料
  SUPPLEMENTARYCpyUpdateAuth() {
    return GetBaseInfoModel.getUserOpers().includes("SUPPLEMENTARY_COMPANY_INFORMATION_UPDATE");
  }
  //公司资料列表导出权，有该权限的可导出补充公司资料列表
  SUPPLEMENTARYCpyExportAuth() {
    return GetBaseInfoModel.getUserOpers().includes("SUPPLEMENTARY_COMPANY_INFORMATION_EXPORT");
  }
}
