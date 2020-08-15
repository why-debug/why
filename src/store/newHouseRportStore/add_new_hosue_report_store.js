export default {
  namespaced: true,
  state: {
    project_info: {
      reportType: '',
      reportClass: '',
      reportCommissionNo: '',
    },
    offerAmount: '',
  },
  mutations: {
    setsProjectInfoReportType(state, payload) {
      state.project_info.reportType = payload
    },
    setsProjectInfoReportClass(state, payload) {
      state.project_info.reportClass = payload
    },
    setsProjectInfoReportCommissionNo(state, payload) {
      state.project_info.reportCommissionNo = payload
    },
    setsProjectInfoOfferAmount(state, payload) {
      state.offerAmount = payload
    }
  },
  actions: {
    aa(context) {
      console.log(context)
    }

  }
}
