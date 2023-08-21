import { message as $message } from 'ant-design-vue';

const { JSEncrypt } = require('jsencrypt');

const encryptor = (message) => {
    const encrypt = new JSEncrypt();
    encrypt.setPublicKey(process.env.RSA_PUBLIC_KEY);

    return encrypt.encrypt(message);
};

export default async function ({ $axios, redirect, app }, inject) {
    if (process.client) {
        const ip = await fetch('https://jsonip.com/')
            .then((results) => results.json())
            .then((data) => data.ip);
        console.log(encryptor(ip));

        $axios.onRequest((config) => {
            config.headers.common['x-client-ip'] = encryptor('34.143.241.44');
        });
    }

    $axios.onResponse((response) => response?.data || { data: {} });

    $axios.onError(async (error) => {
        const code = error?.response ? parseInt(error.response?.status, 10) : null;

        if (code === 401) {
            await app.$auth.logout();
            redirect('/login');
        }

        throw error;
    });

    const handleError = (error, callback = null) => {
        console.log(error);

        const errorData = error?.response?.data;
        if (callback) {
            callback(error);
        } else if (errorData?.error) {
            $message.error(errorData?.error);
        } else if (!error?.response) {
            $message.warning('Checking && updating...');
        } else {
            $message.error('Có lỗi xảy ra vui lòng thử lại sau');
        }
    };

    inject('handleError', handleError);
}
