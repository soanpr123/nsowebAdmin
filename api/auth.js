export default (axios) => ({
    getMenuItems: () => axios.get('/user/menus'),
    updateProfile: (data) => axios.post('/user/update_profile', data),
    updatePassword: (data) => axios.post('/user/change_password', data),
});
