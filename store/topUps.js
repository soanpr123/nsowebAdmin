import { mapDataFromOptions } from '@/utils/data';
import { TOP_UP_CALLBACK_STATUS_OPTIONS } from '@/constants/topUp/callbackStatus';
import { TOP_UP_TRANSFER_STATUS_OPTIONS } from '@/constants/topUp/transferStatus';

export const state = () => ({
    topUps: [],
    summary: {},
    pagination: {},
});

export const mutations = {
    SET_TOP_UPS(state, payload) {
        state.topUps = payload;
    },

    SET_SUMMARY(state, payload) {
        state.summary = payload;
    },

    SET_PAGINATION(state, payload) {
        state.pagination = payload;
    },
};

export const actions = {
    async fetchAll({ commit, dispatch }, query) {
        const {
            data: {
                data,
                pagination,
                countError,
                countPendding,
                countSuccess,
                sumError,
                sumPendding,
                sumSuccess,
            },
        } = await this.$api.topUps.getAll(query);
        if (query.partnerReference) {
            await dispatch('partnerReferences/fetchDetail', {
                partnerReference: query.partnerReference,
            }, { root: true });
        } else {
            commit('partnerReferences/SET_PARTNER_REFERENCE', null, { root: true });
        }
        const CALLBACK_STATUS_OPTIONS = mapDataFromOptions(TOP_UP_CALLBACK_STATUS_OPTIONS);
        const TRANSFER_STATUS_OPTIONS = mapDataFromOptions(TOP_UP_TRANSFER_STATUS_OPTIONS);
        const topUps = data?.map?.((topUp) => ({
            ...topUp,
            callbackStatus: CALLBACK_STATUS_OPTIONS[topUp.statusCallback],
            transferStatus: TRANSFER_STATUS_OPTIONS[topUp.statusTransfer],
        }));

        commit('SET_TOP_UPS', topUps);
        commit('SET_PAGINATION', pagination);
        commit('SET_SUMMARY', {
            countError,
            countPendding,
            countSuccess,
            sumError,
            sumPendding,
            sumSuccess,
        });
    },
};
