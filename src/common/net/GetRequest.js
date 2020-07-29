import {API, ApiPrivateData} from "./API";
import axios from "axios";

export class GetRequest extends API{
  constructor(request) {
    super(request);
  }

  run() {
    let headers = this.getHeader();
    return axios.get(this.getApiDomain() + this.getUrl(),
      {params: this.request})
      .then((res) => {
        let response = res.data;
        return response;
      });
  }
}
