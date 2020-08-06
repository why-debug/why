import GetInitInfo from '../../net/newHouseDealReport/add/selection/GetInitInfo'

export default{
  namespaced: true, 
  state: {
    country_list:[], 
    city_list:[], 
    province_list:[],
    unit_list:[],  
  },
  mutations: { 
    set_country_list(state, payload) {
      state.country_list= payload.countryList
      state.city_list= payload.cityList
      state.province_list= payload.provinceList
      state.unit_list= payload.unitList
    }

  },
  actions: {
    getInitInfo(context) {
      if(!!context.state.country_list&&context.state.country_list.length!=0) return
      new GetInitInfo().send()
      .then(res => {
        context.commit('set_country_list', res)
      })
      .catch(res => {
        console.error (res)
      })
    }
  }
}
