tem<template>
    <div class="bank-list bg-transparent !shadow-none !p-0">
        <div class="bg-white shadow-light p-4">
            <a-tabs :active-key="activeTab" default-active-key="bankIn" @change="handleChangeTab">
                <a-tab-pane key="connect" tab="Thông tin đấu nối" />
                <a-tab-pane key="system" tab="Hệ thống" />
                <a-tab-pane key="notification" tab="Thông báo" />
            </a-tabs>
            <ConfigTable :configs="configs" class="mt-4" />
        </div>
    </div>
</template>

<script>
    import { mapState } from 'vuex';
    import { mapDataFromOptions } from '@/utils/data';
    import { CONFIG_KEY_OPTIONS } from '@/constants/configs';
    import ConfigTable from '@/components/configs/Table.vue';

    export default {
        components: {
            ConfigTable,
        },

        async fetch() {
            await this.fetchData();
        },

        data() {
            return {
                loading: false,
                activeTab: this.$route.query.type || 'system',
                connectConfigs: [],
                systemConfigs: [],
                notificationConfigs: [],
                configs: [],
            };
        },

        computed: {
            ...mapState('banks', ['banks', 'pagination']),
            ...mapState('bankAccounts', ['bankAccounts']),

            CONFIG_OPTIONS() {
                return mapDataFromOptions(CONFIG_KEY_OPTIONS);
            },

            NOTIFICATION_CONFIG_KEYS() {
                return CONFIG_KEY_OPTIONS.filter((config) => config.type === 'notification').map((config) => config.value);
            },

            SYSTEM_CONFIG_KEYS() {
                return CONFIG_KEY_OPTIONS.filter((config) => config.type === 'system').map((config) => config.value);
            },
        },

        watch: {
            '$route.query': {
                async handler() {
                    await this.fetchData();
                },
            },
        },

        methods: {
            async fetchData() {
                try {
                    this.loading = true;

                    const { data: settings } = await this.$api.configs.getAll();
                    this.connectConfigs = [{
                        param: 'Callback URL - Nạp tiền',
                        key: 'callBackUrlTopup',
                        editable: true,
                        root: true,
                        value: settings.callBackUrlTopup,
                        note: '',
                    }, {
                        param: 'Callback URL - Rút tiền',
                        key: 'callBackUrlWithdraw',
                        editable: true,
                        root: true,
                        value: settings.callBackUrlWithdraw,
                        note: '',
                    }, {
                        param: 'API URL',
                        key: 'apiUrl',
                        copyable: true,
                        root: true,
                        value: settings.apiUrl,
                        note: '',
                    }, {
                        param: 'API KEY',
                        key: 'apiKey',
                        editable: false,
                        root: true,
                        value: settings?.clientUser?.apiKey,
                        note: '',
                    }];
                    this.notificationConfigs = settings?.settings
                        .filter?.((setting) => this.NOTIFICATION_CONFIG_KEYS.includes(setting.key))
                        .map?.((setting) => ({
                            ...setting,
                            param: this.CONFIG_OPTIONS[setting.key]?.label,
                            key: setting.key,
                            editable: true,
                            value: setting.value,
                            note: this.CONFIG_OPTIONS[setting.key]?.note,
                            currencyFormat: this.CONFIG_OPTIONS[setting.key]?.currencyFormat,
                        }));
                    this.systemConfigs = settings?.settings
                        .filter?.((setting) => this.SYSTEM_CONFIG_KEYS.includes(setting.key))
                        .map?.((setting) => ({
                            ...setting,
                            param: this.CONFIG_OPTIONS[setting.key]?.label,
                            key: setting.key,
                            editable: true,
                            value: setting.value,
                            note: this.CONFIG_OPTIONS[setting.key]?.note,
                            currencyFormat: this.CONFIG_OPTIONS[setting.key]?.currencyFormat,
                        }));
                    switch (this.activeTab) {
                        case 'connect':
                            this.configs = this.connectConfigs;
                            break;
                        case 'system':
                            this.configs = this.systemConfigs;
                            break;
                        case 'notification':
                            this.configs = this.notificationConfigs;
                            break;
                        default:
                            this.configs = this.connectConfigs;
                    }
                } catch (error) {
                    this.$handleError(error);
                } finally {
                    this.loading = false;
                }
            },

            async handleChangeTab(tabKey) {
                this.activeTab = tabKey;
                this.$router.push({
                    path: '/setting/configs',
                    query: {
                        type: tabKey,
                    },
                });
            },
        },

        head() {
            return {
                title: 'Danh sách Bank',
            };
        },
    };
</script>
