/**
 * 提供Erp内嵌获取参数的数据方法
 */

export class ErpCommon {
  static erpObj = null;
  constructor() {
    this.erpObj = document.getElementById("delegateObj");
  }

  /**
   * Erp环境初始化 ： 设置全局会话等
   */
    init() {
        if (!this.isErp()) { return; }
    window.clientKey = new ErpCommon().getOperator('CLIENTKEY') || '';
  }

  /**
     * bShowAuditFilter： erp 隐藏展示导航条
     * @param {Boolean} flag true:展示， false:隐藏
     */
    bShowAuditFilter(flag = false) {
      if (!this.isErp()) {
          return;
      }
      this.erpObj.bShowAuditFilter(flag);
    }

    /**
     * @description ERP打开全屏 webview
     * @author LiuChiLei
     * @date 2020-04-14 21:36:59
     */
    openFullScreenWebview(url) {
        console.log('全屏打开网页：', url);
        if (this.isErp()) {
            this.erpObj.openFullScreenWebview(url);
        }
    }

    /**
     * @description 关闭当前webview
     * @author LiuChiLei
     * @date 2020-04-14 21:36:59
     */
    closeCurrentWebview() {
        if (this.isErp()) {
            console.log('关闭当前webview');
            this.erpObj.closeCurrentWebview();
        }
    }

    /**
   * 判断当前是否是在erp中
   * @return Boolean true/false
   */
    isErp() {
    return !!this.erpObj.showMsgBox;
  }

  /**
   * toast
   */
    toast(txt = '', time = 2000) {
        if (!this.isErp()) {
      console.log(txt);
      return;
    }
    this.erpObj.showTips(txt);
  }

  /**
   * exportExcelData： erp 数据导出
   */
  exportExcelData(params) {
      if (!this.isErp()) { return; }
      params.data = params.data ? params.data : [];
      params.data.forEach(item => {
        for (const key in item) {
          if (!!item[key]) {
            item[key] = item[key].toString()
          }
        }
      });
     this.erpObj.exportExcelData(JSON.stringify(params));
  }

  /**
   * showMsgBox
   * erp 确认框
   * @return
   */
  showMsgBox(txt = '') {
        if (!this.isErp()) { return; }
    return new Promise((resolve, reject) => {
      let showMsgBoxCallBack = this.erpObj.showMsgBox(txt);
      resolve()
    });
  }

  /**
   * showConfirmMsgBox
   * erp 确认取消框
   * @return
   */
  showConfirmMsgBox(txt = '') {
        if (!this.isErp()) { return; }
    return new Promise((resolve, reject) => {
      let showMsgBoxCallBack = this.erpObj.showConfirmMsgBox(txt);
            if ('1' == showMsgBoxCallBack) {
        //确认
        resolve()
            } else {
        //取消
        reject()
      }
    });
  }

  /**
   * showOnlineSource ：erp 预览文件
   * @param {String} fileName 文件名
   * @param {String} fileUrl  文件路径
   */
  showOnlineSource(fileName, fileUrl) {
        if (!this.isErp()) { return; }
    let paramsJson = {
      "fileName": fileName,
      "fileUrl": fileUrl,
    }
    this.erpObj.showOnlineSource(JSON.stringify(paramsJson));
  }

  /**
   * getOperator 获取用户参数
   * @param {*} key :USER_ID
   */
  getOperator(key = '') {
        if (!this.isErp()) { return; }
        if (!key) { return; }

    return this.erpObj.getOperator(key);
  }

  /**
   * getSysPara 获取系统参数
   * @param {*} key  ：SHARE_HOUSE_RANGE
   */
  getSysPara(key = '') {
        if (!this.isErp()) { return; }
        if (!key) { return; }
    return this.erpObj.getSysPara(key);
  }


  /**
   * toSeeHouse 去看房源
   * @param {String} caseId  (int32)房源ID
   * @param {String} caseType  (byte)房源类型
   * @param {String} useage  (byte)房屋用途
   */
    showFunDetails(caseId, caseType, useage) {
            if (!this.isErp()) { return; }
            this.erpObj.showFunDetails(caseId.toString(), caseType.toString(), useage.toString());
    }
    /**
     * setClipBoard
     * erp 复制到剪切板
     */
    setClipBoard(txt = '') {
        if (!this.isErp()) {
      console.log(txt);
      return;
    }
    this.erpObj.setClipBoard(txt);
  }

   /**
      * getSysScaleParam
      * erp 获取 dpi:缩放比例
      */
     getSysScaleParam() {
       let sysScaleParam = 1.25
       if (this.isErp()) {
         sysScaleParam = this.erpObj.getSysScaleParam();
         console.log('ERP内缩放比例：', sysScaleParam);
       }
       return sysScaleParam;
     }

    /**
   * refreshData：刷新页面
   */
    refreshData() {
        if (!this.isErp()) { return; }
    this.erpObj.refreshData();
  }




  /**
   * openCefUrl ：erp 预览VR
   * @param {String} qsUrl vr路径
   */
  openCefUrl(qsUrl) {
        if (!this.isErp()) { return; }
    console.log(qsUrl)
    this.erpObj.openCefUrl(qsUrl);
  }

  /**
   * 原生erp选择角色
   * @param param
   */
  selectUserOrRole(param) {
      if (!this.isErp()) { return; }

      this.erpObj.selectUserOrRole(param);
  }

    /**
    * 原生erp选择区域（新房成交报告）
    * 传参数格式{
    * “userId”
    "userName"
    "organizationId"
    "organizationName"
    "selectType":1选人，2选组织
    选多人的就用逗号隔开
    * }
    *返回参数格式
    *{
    *“userId”
    *"userName"
    *"organizationId"
    *"organizationName"
    *“phoneNum”
    *"leaderId"
    *"leaderName"
    *}
    * @param param
    */
   openPerformanceAssignee(param) {
      if (!this.isErp()) { return; }
        return this.erpObj.openPerformanceAssignee(JSON.stringify(param));
  }

    /**
     * 新房成交报告打印（参数：url)
     * @param param
     */
    dealReportPrint(param) {
        if (!this.isErp()) { return; }
        this.erpObj.dealReportPrint(JSON.stringify(param));
    }
  /**
   * exportExcelData： erp 数据导出
   */
  exportExcelData(params) {
    
    if (!this.isErp()){return;}
    //  params = {
    //   "fileName": "表格名字",
    //   "headList": [{
    //       "name": "房源编号",
    //       "key": "houseNo"
    //     }
    //   ],
    //   "data": [{
    //       "houseNo": "123",
    //       "buildName": "英郡",
    //       "houseArea": "60㎡"
    //     },
    //   ]
    // };
    //需要将 data 数组中的val强制转换成字符串
    params.data = params.data ? params.data :[];
    params.data.forEach(item => {
      for (const key in item) {
        if (!!item[key]) {
          item[key] = item[key].toString()
        }
      }
    });
    
    this.erpObj.exportExcelData(JSON.stringify(params));
  }

  /**
   * showFunDetai erp 查看房源详情
   * @param {String} caseId : 房源Id
   * @param {String} caseType : 房源类型
   */
  showFunDetai(caseId = '', caseType = '') {
    if (!this.isErp()) {
      return;
    }
    console.log('showFunDetai.caseId:', caseId);
    console.log('showFunDetai.caseType:', caseType);
    this.erpObj.showFunDetai(caseId.toString(), caseType.toString());
  }

  /**
   * judgePermission erp 判断是否拥有某个权限
   * @param {String} permissionName : 权限名
   * @return {Boolean} true/false
   */
  judgePermission(permissionName = '') {
    if (!this.isErp()) {
      return false;
    }
    return this.erpObj.judgePermission(permissionName);
  }

  /**
   * judgePermission erp 判断是否拥有某个权限
   * @param {String} permissionName : 权限名
   * @return {Boolean} true/false
   */
  hidebut(requestType = 1,tapValue = 1) {
    if (!this.isErp()) {
      return false;
    }
    let params = {
      requestType: requestType,
      tapValue: tapValue,
    };
    
    return this.erpObj.hidebut(JSON.stringify(params));
  }
  
}