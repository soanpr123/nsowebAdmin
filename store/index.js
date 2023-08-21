export const state = () => ({
    autoFetch: true,
    isMobile: false,
});

export const getters = {
};

export const mutations = {
    SET_AUTO_FETCH(state, payload) {
        state.autoFetch = payload;
        localStorage.setItem('autoFetch', payload);
    },

    SET_IS_MOBILE(state, payload) {
        state.isMobile = payload;
    },
};
