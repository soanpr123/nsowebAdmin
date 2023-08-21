require('dotenv').config();

const isProduction = process.env.NODE_ENV === 'production';

export default {
    dev: !isProduction,

    ssr: false,

    // When SPA
    loading: '@/components/shared/Loading.vue',

    // When SSR
    loadingIndicator: {
        name: 'folding-cube',
        color: '#336CCE',
    },

    head: {
        title: 'AutoBank',
        titleTemplate: '%s | AutoBank',
        htmlAttrs: {
            lang: 'en',
        },
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: '' },
            { name: 'format-detection', content: 'telephone=no' },
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        ],
    },

    css: [
        '@/assets/main.scss',
        '@/assets/ant/main.less',
        '@fortawesome/fontawesome-free/css/all.css',
    ],

    plugins: [
        '@/plugins/api',
        { src: '@/plugins/axios', mode: 'client' },
        '@/plugins/ant-design',
        '@/plugins/filters',
        { src: '@/plugins/excel', mode: 'client' },
        '@/plugins/filter-body',
        '@/plugins/global-components',
        '@/plugins/helpers',
    ],

    robots: [
        {
            UserAgent: '*',
            Disallow: process.env.APP_ENV === 'production'
                ? [
                    '/*.json',
                    '/*.xml',
                ]
                : '/',
        },
    ],

    server: {
        host: process.env.HOST || 'localhost',
        port: process.env.PORT || '3000',
    },

    render: {
        http2: {
            push: true,
        },
    },

    buildModules: [
        '@nuxt/postcss8',
        '@nuxtjs/eslint-module',
        '@nuxtjs/fontawesome',
        '@nuxtjs/tailwindcss',
        '@nuxtjs/google-analytics',
    ],

    modules: [
        '@nuxtjs/axios',
        '@nuxtjs/auth-next',
    ],

    axios: {
        baseURL: process.env.API_HOST,
    },

    auth: {
        plugins: ['@/plugins/axios'],
        strategies: {
            local: {
                token: {
                    property: 'token',
                    global: true,
                    required: true,
                    maxAge: 60 * 60 * 24 * 30,
                    type: 'Bearer',
                },
                user: {
                    property: 'user',
                    autoFetch: true,
                },
                endpoints: {
                    login: {
                        url: `${process.env.API_HOST}/a/auth/login`,
                        method: 'POST',
                    },
                    logout: false,
                    user: {
                        url: `${process.env.API_HOST}/a/session/current`,
                        method: 'GET',
                    },
                },
                redirect: {
                    home: '/',
                    login: '/login',
                },
            },
        },
    },

    router: {
        middleware: ['auth'],
    },

    build: {
        transpile: [/@fullcalendar.*/, 'vue-context'],
        postcss: {
            plugins: {
                tailwindcss: 'tailwind.config.js',
                autoprefixer: {},
                ...(process.env.APP_ENV === 'production' ? { cssnano: {} } : {}),
            },
        },
        loaders: {
            less: {
                javascriptEnabled: true,
            },
        },
        babel: {
            plugins: [
                [
                    'import',
                    {
                        libraryName: 'ant-design-vue',
                        libraryDirectory: 'es',
                        style: true,
                    },
                    'ant-design-vue',
                ],
            ],
        },
    },

    publicRuntimeConfig: {
        googleAnalytics: {
            id: process.env.GOOGLE_ANALYTICS_ID,
        },
    },

    env: {
        API_HOST: process.env.API_HOST || 'localhost',
        RSA_PUBLIC_KEY: process.env.RSA_PUBLIC_KEY,
    },
};
