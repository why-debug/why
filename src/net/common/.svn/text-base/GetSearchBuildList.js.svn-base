import {APIRequest} from "../../common/net/API";
import {PostRequest} from "../../common/net/PostRequest";
import {Const} from "../../common/utils/Const";

// 搜索楼盘
export class GetSearchBuildListRequest extends APIRequest{
  buildName = "";
  cityId = 1;
  constructor(buildName = "") {
    super();
    this.buildName = buildName;
  }
  
  getBuildName() {
    return this.buildName;
  }
}

class GetSearchBuildListApi extends PostRequest{
  constructor(request = new GetSearchBuildListRequest()) {
    super(request);
  }
  
  getUrl() {
    return "/kdbWeb/openApi/sys/getRegSection"
  }
  
  getNeedToken() {
    return false;
  }

  getApiDomain() {
    return process.env.JAVA;
  };
}

export class SearchBuildItem {
  buildName = "";
  buildId = "";
  regName = "";
  sectionName = "";
}
export class GetSearchBuildList {
  request;
  constructor(request = new GetSearchBuildListRequest()) {
    this.request = request;
  }
  
  send() {
    if (!this.request.getBuildName()) {
      return Promise.resolve([]);
    }
    
    return new GetSearchBuildListApi(this.request).send()
      .then(res => {
        if (res.errCode !== Const.successCode) {
          return Promise.reject(res);
        }
        
        let list = [
          {
            buildName: "划卡寄售点卡速度很快就打",
            buildId: 2545
          },
          {
            buildName: "是利空打击阿卡丽",
            buildId: 3289
          },
          {
            buildName: "划卡寄售点卡速度很快就打",
            buildId: 5645
          },
          {
            buildName: "是利空打击阿卡丽",
            buildId: 4578
          },
          {
            buildName: "划卡寄售点卡速度很快就打",
            buildId: 2789545
          },
          {
            buildName: "是利空打击阿卡丽",
            buildId: 789
          },
          {
            buildName: "划卡寄售点卡速度很快就打",
            buildId: 89
          },
          {
            buildName: "是利空打击阿卡丽",
            buildId: 243
          },
          {
            buildName: "划卡寄售点卡速度很快就打",
            buildId: 45343453
          },
          {
            buildName: "是利空打击阿卡丽",
            buildId: 3245645645689
          },
          {
            buildName: "划卡寄售点卡速度很快就打",
            buildId: 2545445
          },
          {
            buildName: "是利空打击阿卡丽",
            buildId: 3278967789
          },
          {
            buildName: "划卡寄售点卡速度很快就打",
            buildId: 2897545
          },
          {
            buildName: "是利空打击阿卡丽",
            buildId: 7893289
          },
          {
            buildName: "划卡寄售点卡速度很快就打",
            buildId: 2578945
          },
          {
            buildName: "是利空打击阿卡丽",
            buildId: 32456289
          }
        ];
        let newList = [];
        for (let info of list) {
          if (!info.buildName || !info.buildId) continue;
          
          let item = new SearchBuildItem();
          item.buildId = info.buildId || "";
          item.buildName = info.buildName || "";
          item.regName = info.regName || "成华区";
          item.sectionName = info.sectionName || "十里店";
          if (info.buildName.indexOf(this.request.getBuildName()) > -1) {
            newList.push(item);
          }
        }
        return newList;
      });
  }
}
