import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        goodslist: [],
        num: 0
    },
    mutations: {
        initGoods(state, newArr) {
            state.goodslist = newArr

        },

    },
    getters: {

        getsum(state) {
            // state.goodslist.forEach((item) => {
            //     item.foods.forEach(v => {
            //         return v.num * v.price
            //     });
            // });
            for (const item of state.goodslist) {
                for (const v of item.foods) {
                    var sum = 0
                    sum += v.num * v.price
                    return sum

                }
            }
        }
    }
})
