export const state = () => ({
    partnerReference: null,
});

export const mutations = {
    SET_PARTNER_REFERENCE(state, payload) {
        state.partnerReference = payload;
    },
};

export const actions = {
    async fetchDetail({ commit }, query) {
        const { data: partnerReference } = await this.$api.partnerReferences.getDetail(query);

        commit('SET_PARTNER_REFERENCE', {
            sumTopup: partnerReference?.sumTopup?.[0]?.total_amount || 0,
            sumWithdraw: partnerReference?.sumWithdraw?.[0]?.total_amount || 0,
            diff: (partnerReference?.sumWithdraw?.[0]?.total_amount || 0) - (partnerReference?.sumTopup?.[0]?.total_amount || 0),
        });
    },
};
