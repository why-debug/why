export default{
  namespaced: true, 
  state: {
    project_info:{}, 
  },
  mutations: {
    setsProjectInfoReportType(state, payload) {
      state.project_info= {
        reportType: payload
      }
    }
  },
  actions: {
    aa(context) {
      console.log (context)
    }
    
  }
}
