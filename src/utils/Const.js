export class Const {
  static successCode = 200;
  static tokenErrorCode = 400;


  //报备号码格式
  static registrationNumberList = [
    { label: 2, value: '前三后四' },
    { label: 5, value: '前四后三' },
  ]
  //到场方式
  static attendWay = [
    { id: 0, text: '全部', value: '全部' },
    { id: 1, text: '集合派车', value: '集合派车' },
    { id: 2, text: '单独派车', value: '单独派车' },
    { id: 3, text: '自驾车', value: '自驾车' },
  ]
  //客户状态
  static CustomerStatus = [
    { id: 0, text: '全部' },
    { id: 1, text: '报备中' },
    { id: 2, text: '已确认' },
    { id: 3, text: '已到场' },
    { id: 4, text: '已复访' },
    { id: 5, text: '已认购' },
  ]
  //客户类型
  static customerType = [
    { id: -1, text: '全部' },
    { id: 0, text: '普通' },
    { id: 1, text: '转介' },
    { id: 2, text: '合作' },
  ]
  //项目类型
  static propertyTypeList = [
    // { label: '1', value: '一手项目' },
    // { label: '2', value: '租赁项目' },

    { value: 1, label: '一手项目' },
    { value: 2, label: '租赁项目' },
  ]
  //销售类型
  static salesTypeList = [
    { value: 1, label: '出租' },
    { value: 2, label: '出售' },
    { value: 3, label: '租售' },
  ]
  //销售进度
  static salesScheduleList = [
    { value: 1, label: '在售现房' },
    { value: 2, label: '在售期房' },
    { value: 3, label: '认筹中' },
    { value: 4, label: '待售' },
    { value: 5, label: '尾盘' },
  ]
  // 户型筛选
  // static roomList =  [
  // 	{ text: '1室', id: '1' },
  // 	{ text: '2室', id: '2' },
  // 	{ text: '3室', id: '3' },
  // 	{ text: '4室', id: '4' },
  // 	{ text: '5室', id: '5' },
  // 	{ text: '6室', id: '6' },
  // 	{ text: '7室', id: '7' },
  // 	{ text: '8室及以上', id: '8' }
  // ];
  // 类型筛选
  // static typeLsit = [
  // 	{ text: '住宅', id: 1 },
  // 	{ text: '别墅', id: 2 },
  // 	{ text: '商铺', id: 3 },
  // 	{ text: '写字楼', id: 4 },
  // 	{ text: '其他', id: 8 }
  // ];
  // 装修情况
  static zhuangXiuList = [
    { id: '2', text: '简装' },
    { id: '3', text: '精装' },
    { id: '6', text: '豪装' },
    { id: '1', text: '毛坯' },
    { id: '7', text: '不限' }
  ]
  // 建筑类型
  static houseTypeList = [
    { text: "多层", value: "多层" },
    { text: "电梯", value: "电梯" },
    { text: "平房", value: "平房" },
    { text: "独院", value: "独院" },
    { text: "商住两用", value: "商住两用" },
    { text: "写住两用", value: "写住两用" }
  ]
  // 建筑结构
  static houseStructureList = [
    { text: "板楼", value: "板楼" },
    { text: "塔楼", value: "塔楼" },
    { text: "板塔结合", value: "板塔结合" },
    { text: "独栋别墅", value: "独栋别墅" },
    { text: "联排别墅", value: "联排别墅" },
    { text: "叠排别墅", value: "叠排别墅" },
    { text: "建筑综合体", value: "建筑综合体" },
    { text: "其他", value: "其他" }
  ]
  // 物业类型
  static wuYeTypeList = [
    { id: 1, value: "住宅" },
    { id: 2, value: "写字楼" },
    { id: 3, value: "商铺" },
    { id: 4, value: "公寓" },
    { id: 5, value: "别墅" },
    { id: 6, value: "工业" },
  ]
  //建筑层数
  static buildingLayersList = [
    { text: "低层(1-3层)", value: "低层(1-3层)" },
    { text: "多层(4-6层)", value: "多层(4-6层)" },
    { text: "小高层(7-9层)", value: "小高层(7-9层)" },
    { text: "高层(10-30层)", value: "高层(10-30层)" },
    { text: "超高层(31层以上)", value: "超高层(31层以上)" }
  ]
  // 项目亮点
  static projectHighlightsList = [
    { text: "带装修", value: "带装修" },
    { text: "小户型", value: "小户型" },
    { text: "70年产权", value: "70年产权" },
    { text: "豪宅", value: "豪宅" },
    { text: "投资", value: "投资" },
    { text: "升学", value: "升学" },
    { text: "自用", value: "自用" },
    { text: "度假", value: "度假" },
    { text: "地铁沿线", value: "地铁沿线" },
    { text: "公交直达", value: "公交直达" },
    { text: "近主干道", value: "近主干道" },
    { text: "车位充足", value: "车位充足" },
    { text: "现房", value: "现房" },
    { text: "成熟社区", value: "成熟社区" },
    { text: "配套齐全", value: "配套齐全" },
    { text: "绿化率高", value: "绿化率高" },
    { text: "低单价", value: "低单价" },
    { text: "品牌房企", value: "品牌房企" },
    { text: "优惠打折", value: "优惠打折" },
    { text: "即将开盘", value: "即将开盘" },
  ]
  //结佣标准
  static commissionTypeList = [
    { label: 1, value: '现佣' },
    { label: 2, value: '结佣' },
  ]
  //装修情况
  static renovationConditionList = [
    { label: '带装修', value: '带装修' },
    { label: '毛坯', value: '毛坯' },
  ]


  // 佣金方案 节点
  static commissionPlanItem() {
    return {
      agentId: "", //主键id
      agentName: "", //代理商名称
      commissionType: "", //佣金类型 1 现佣 2结佣

      contractAgencyPeriodBegin: "", //合同代理期限开始
      contractAgencyPeriodEnd: "", //合同代理期限结束
      contractAgencyPeriod: [], //代理期限

      settlementMethod: "", //结算方式
      cashPrize: "", //现金奖
      dailiqixian: [],
      contractSituation: "", //合同情况 1有合同 2需要合同 3无需合同

      specialBatchPictureAddress: "", //特批图片地址(多个用,隔开)
      specialBatchPictureAddressList: [], //特批图片数组

      //项目相关人员 ： 项目负责人/驻场人员
      relatedPeopleList: [],
      //相关人员集合
      projectPersonList: [    {
        agentId: "", //(int32)佣金方案id
        id: "", //(int32)主键id(新增不传)
        orgId: "", //(int32)组织id
        orgName: "", //(string)组织名称
        personType: "1", //(byte)人员类型 1项目负责人 2驻场人员
        responsibilityPeriodBegin: "", //(string)负责期限开始
        responsibilityPeriodEnd: "", //(string)负责期限结束
        responsibilityPeriod: [],

        personSelectModel: false, //选择人员弹窗

        userId: "", //(int32)人员id
        userMobile: "", //(string)联系电话
        userName: "" //(string)人员名称
      }],
      regisdentList: [ {
        agentId: "", //(int32)佣金方案id
        id: "", //(int32)主键id(新增不传)
        orgId: "", //(int32)组织id
        orgName: "", //(string)组织名称
        personType: "2", //(byte)人员类型 1项目负责人 2驻场人员
        responsibilityPeriodBegin: "", //(string)负责期限开始
        responsibilityPeriodEnd: "", //(string)负责期限结束
        responsibilityPeriod: [],
        personSelectModel: false, //选择人员弹窗
        userId: "", //(int32)人员id
        userMobile: "", //(string)联系电话
        userName: "" //(string)人员名称
      }],
      deleteSpecialPicturesList: "" //要删除特批图片(多个用,隔开)
    }
  }

  //项目负责人  节点
  static projectPersonItem() {
    return {
      "agentId": "", //(int32)佣金方案id
      "id": "", //(int32)主键id(新增不传)
      "orgId": "", //(int32)组织id
      "orgName": "", //(string)组织名称
      "personType": "1", //(byte)人员类型 1项目负责人 2驻场人员
      "responsibilityPeriodBegin": "", //(string)负责期限开始
      "responsibilityPeriodEnd": "", //(string)负责期限结束
      "responsibilityPeriod": [],

      "personSelectModel": false, //选择人员弹窗
      "userId": "", //(int32)人员id
      "userMobile": "", //(string)联系电话
      "userName": "" //(string)人员名称
    }
  }
  //驻场人员 节点
  static residentPersonItem() {
    return {
      "agentId": "", //(int32)佣金方案id
      "id": "", //(int32)主键id(新增不传)
      "orgId": "", //(int32)组织id
      "orgName": "", //(string)组织名称
      "personType": "2", //(byte)人员类型 1项目负责人 2驻场人员
      "responsibilityPeriodBegin": "", //(string)负责期限开始
      "responsibilityPeriodEnd": "", //(string)负责期限结束
      "responsibilityPeriod": [],
      "personSelectModel": false, //选择人员弹窗
      "userId": "", //(int32)人员id
      "userMobile": "", //(string)联系电话
      "userName": "" //(string)人员名称
    }
  }

  //国家省份城市单位
  static allPositionList = {
    cityList: [
      {
        cityId: 0,
        cityName: "成都",
        provinceId: 0,
        countryId: 0
      },
      {
        cityId: 0,
        cityName: "悉尼",
        provinceId: "",
        countryId: 1
      },
      {
        cityId: 0,
        cityName: "加利福尼亚",
        provinceId: "",
        countryId: 2
      }
    ],
    countryList: [
      {
        cnName: "中国",
        id: 0
      },
      {
        cnName: "澳大利亚",
        id: 1
      },
      {
        cnName: "美国",
        id: 2
      },
    ],
    provinceList: [
      {
        countryId: 0,
        privinceName: "四川",
        provinceId: 0
      },
      {
        countryId: 0,
        privinceName: "上海",
        provinceId: 1
      },
      {
        countryId: 0,
        privinceName: "北京",
        provinceId: 2
      },
    ],
    unitList: [
      {
        cityId: "(int32)城市ID",
        dicCnMsg: "(string)中文",
        dicType: "(string)单位类型"
      }
    ]
  }

  // static nowPositionList={
  //   cityList:[],
  //   provinceList:[],
  //   unitList:[]
  // }
}
