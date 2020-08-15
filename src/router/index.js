import Vue from 'vue'
import Router from 'vue-router'

// 交易报告
const index = () =>
    import("@/views/dealReports/Index.vue");
// 交易报告列表
const dealReportsList = (resolve) => require(['@/views/dealReports/dealReportsList/index'], resolve);
// 成交记录
const closingRecords = (resolve) => require(['@/views/dealReports/closingRecords/index'], resolve);
// 合同号管理
const contractNoManagement = (resolve) => require(['@/views/dealReports/contractNoManagement/index'], resolve);
// 策划费
const planningFees = (resolve) => require(['@/views/dealReports/planningFees/index'], resolve);
// 二手房 新增交易报告
const addErShouDealReport = (resolve) => require(['@/views/dealReports/erShouDealReports/addErShouDealReport/index'], resolve);
// 二手房 成交报告打印
const secondHandDealPrint = (resolve) => require(['@/views/dealReports/erShouDealReports/erShoudealPrint/index'], resolve);
// 新房 成交报告打印
const newHousedealPrint = (resolve) => require(['@/views/dealReports/newHouseDealReport/newHousedealPrint/index'], resolve);
// 新房 新增交易报告
const addNewHouseDealReport = (resolve) => require(['@/views/dealReports/newHouseDealReport/addNewHouseDealReport/addNewHouseDealReport'], resolve);
// 新房 成交报告详情
const newHouseDealReportDetail = (resolve) => require(['@/views/dealReports/newHouseDealReport/newHouseDealReportDetail/newHouseDealReportDetail'], resolve);
// 银行信息
const bankInformation = (resolve) => require(['@/views/bankInformation/index'], resolve);
// 佣金方案
const commissionScheme = (resolve) => require(['@/views/commissionScheme/index'], resolve);

//项目代理合同
const projectAgentinfo = (resolve) => require(['@/views/projectAgentinfo/index'], resolve);
//代理合同
const agencyContract = (resolve) => require(['@/views/projectAgentinfo/agencyContract/index'], resolve);
//代理合同新增
const addAgentContract = (resolve) => require(['@/views/projectAgentinfo/agencyContract/addContract'], resolve);
//代理合同详情
const agencyContractDetails = (resolve) => require(['@/views/projectAgentinfo/agencyContract/agencyContractDetails'], resolve);
//代理合同审批
const approvalContract = (resolve) => require(['@/views/projectAgentinfo/agencyContract/approvalContract'], resolve);
//分销合同
const distributionContract = (resolve) => require(['@/views/projectAgentinfo/distributionContract/index'], resolve);
//分销合同新增
const addDistributionContract = (resolve) => require(['@/views/projectAgentinfo/distributionContract/addContract'], resolve);
//分销合同详情
const distributionContractDetails = (resolve) => require(['@/views/projectAgentinfo/distributionContract/agencyContractDetails'], resolve);
//分销合同审批
const approvalContractDistribution = (resolve) => require(['@/views/projectAgentinfo/distributionContract/approvalContract'], resolve);
//分销经纪人
const distributionBorker = (resolve) => require(['@/views/projectAgentinfo/distributionBorker/distributionBroker'], resolve)
//分销公司
const distributionCompany = (resolve) => require(['@/views/projectAgentinfo/distributionCompany/distributionCompany'], resolve)
//补充资料
const fileInfoList = (resolve) => require(['@/views/projectAgentinfo/supplementaryContractInfo/fileInfoList'], resolve)

// KPI配置
const KPIConfig = (resolve) => require(['@/views/KPIModule/KPIConfig/index'], resolve);
// KPI考核
const KPICount = (resolve) => require(['@/views/KPIModule/KPICount/index'], resolve);
// KPI经纪人统计详情
const KPICountDetail = (resolve) => require(['@/views/KPIModule/KPICount/components/brokerCountDetail'], resolve);

// 潜在业绩
const PotentialPerformance = (resolve) => require(['@/views/potentialPerformance/index'], resolve);


/**
 * 重写路由的push、replace方法
 */
const [routerPush, routerReplace] = [Router.prototype.push, Router.prototype.replace];
Router.prototype.push = function push(location) {
    return routerPush.call(this, location).catch(error => error);
};
Router.prototype.replace = function replace(location) {
    return routerReplace.call(this, location).catch(error => error);
};

Vue.use(Router);

var router = new Router({
    routes: [{
            path: "/",
            name: "index",
            component: index,
            redirect: "/dealReports/dealReportsList"
        },
        {
            path: "/dealReports/dealReportsList",
            name: "dealReportsList",
            meta: {
                keepAlive: true
            },
            component: dealReportsList
        },
        {
            path: "/dealReports",
            name: "dealReports",
            component: index,
            redirect: "/dealReports/dealReportsList",
            children: [{
                    path: "dealReportsList",
                    name: "dealReportsList",
                    meta: {
                        keepAlive: false
                    },
                    component: dealReportsList,
                },
                {
                    path: "closingRecords",
                    name: "closingRecords",
                    meta: {
                        keepAlive: false
                    },
                    component: closingRecords,
                },
                {
                    path: "contractNoManagement",
                    name: "contractNoManagement",
                    meta: {
                        keepAlive: false
                    },
                    component: contractNoManagement,
                },
                {
                    path: "planningFees",
                    name: "planningFees",
                    meta: {
                        keepAlive: false
                    },
                    component: planningFees,
                },
            ]
        },
        // 添加二手房交易报告
        {
            path: "/addErShouDealReport",
            name: "addErShouDealReport",
            component: addErShouDealReport,
            meta: {
                keepAlive: false
            }
        },
        // 二手房 成交报告打印
        {
            path: "/secondHandDealPrint",
            name: "secondHandDealPrint",
            component: secondHandDealPrint,
            meta: {
                keepAlive: false
            }
        },
        //项目代理合同
        {
            path: "/projectAgentinfo",
            name: "projectAgentinfo",
            component: projectAgentinfo,
            redirect: "/projectAgentinfo/agencyContract",
            children: [
                //代理合同
                {
                    path: "agencyContract",
                    name: "agencyContract",
                    meta: {
                        keepAlive: false
                    },
                    component: agencyContract,
                },
                //分销合同
                {
                    path: "/distributionContract",
                    name: "distributionContract",
                    meta: {
                        keepAlive: false
                    },
                    component: distributionContract,
                },
                //分销公司
                {
                    path: "/distributionCompany",
                    name: "distributionCompany",
                    meta: {
                        keepAlive: false
                    },
                    component: distributionCompany,
                },
                //分销经纪人
                {
                    path: "distributionBorker",
                    name: "distributionBorker",
                    meta: {
                        keepAlive: false
                    },
                    component: distributionBorker,
                },
                //补充合同资料
                {
                    path: "fileInfoList",
                    name: "fileInfoList",
                    meta: {
                        keepAlive: false
                    },
                    component: fileInfoList,
                }
            ]
        },
        // 新房 成交报告打印
        {
            path: "/newHousedealPrint",
            name: "newHousedealPrint",
            component: newHousedealPrint,
            meta: {
                keepAlive: false
            }
        },
        // 新房 新增成交报告
        {
            path: "/addNewHouseDealReport",
            name: "addNewHouseDealReport",
            component: addNewHouseDealReport,
            meta: {
                keepAlive: false
            }
        },
        // 新房 成交报告详情
        {
            path: "/newHouseDealReportDetail",
            name: "newHouseDealReportDetail",
            component: newHouseDealReportDetail,
            meta: {
                keepAlive: false
            }
        },
        // 银行字典
        {
            path: "/bankInformation",
            name: "bankInformation",
            component: bankInformation,
            children: [{
                path: "bankInformation",
                name: "bankInformation",
                meta: {
                    keepAlive: false
                },
                component: bankInformation,
            }, ]
        },
        // 佣金方案
        {
            path: "/commissionScheme",
            name: "commissionScheme",
            component: commissionScheme,
            children: [{
                path: "commissionScheme",
                name: "commissionScheme",
                meta: {
                    keepAlive: false
                },
                component: commissionScheme,
            }, ]
        },
        //代理合同新增
        {
            path: "/addAgentContract",
            name: "addAgentContract",
            component: addAgentContract,
            meta: {
                keepAlive: false
            }
        },
        //代理合同详情
        {
            path: "/agencyContractDetails",
            name: "agencyContractDetails",
            component: agencyContractDetails,
            meta: {
                keepAlive: false
            }
        },
        //代理合同审批
        {
            path: "/approvalContract",
            name: "approvalContract",
            component: approvalContract,
            meta: {
                keepAlive: false
            }
        },
        //分销合同新增
        {
            path: "/addDistributionContract",
            name: "addDistributionContract",
            component: addDistributionContract,
            meta: {
                keepAlive: false
            }
        },
        //分销合同详情
        {
            path: "/distributionContractDetails",
            name: "distributionContractDetails",
            component: distributionContractDetails,
            meta: {
                keepAlive: false
            }
        },
        //分销合同审批
        {
            path: "/approvalContractDistribution",
            name: "approvalContractDistribution",
            component: approvalContractDistribution,
            meta: {
                keepAlive: false
            }
        },
        //KPI配置
        {
            path: "/KPIConfig/index",
            name: "KPIConfig",
            component: KPIConfig,
            meta: {
                keepAlive: true
            }
        },
        //KPI统计
        {
            path: "/KPICount/index",
            name: "KPICount",
            component: KPICount,
            meta: {
                keepAlive: true
            }
        },
        //KPI统计经纪人详情
        {
            path: "/KPICount/components/brokerCountDetail",
            name: "KPICount",
            component: KPICountDetail,
            meta: {
                keepAlive: true
            }
        },
        //潜在业绩
        {
            path: "/potentialPerformance",
            name: "potentialPerformance",
            component: PotentialPerformance,
            meta: {
                keepAlive: true
            }
        },
    ]
});

// 路由拦截
router.beforeEach((to, from, next) => {

    //通用设置标题
    if (to && to.meta && to.meta.title) {
        document.title = to.meta.title
    }

    // 设置全局会话等链接上的参数 :
    if (to && to.query) {
        for (var pro in to.query) {
            window[pro] = to.query[pro];
        }
    }

    next()
})

export default router