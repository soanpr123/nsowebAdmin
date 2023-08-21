<template>
    <div class="bg-transparent !shadow-none !p-0">
        <ErrorSMSFilter class="bg-white shadow-light p-4" />
        <div class="mt-4 bg-white shadow-light p-4">
            <div class="flex flex-wrap justify-between items-center">
                <a-tabs :active-key="activeTab" default-active-key="all" @change="handleChangeTab">
                    <a-tab-pane key="all" tab="Tất cả" />
                    <a-tab-pane key="bankIn" tab="Bank In" force-render />
                    <a-tab-pane key="bankOut" tab="Bank Out" />
                    <a-tab-pane key="orther" tab="Khác" />
                </a-tabs>
            </div>
            <ErrorSMSTable
                :messages="smsErrors"
                :loading="loading"
                :pagination="pagination"
            />
            <ct-pagination :length="smsErrors.length" :data="pagination" />
        </div>
    </div>
</template>

<script>
    import moment from 'moment';
    import { mapState } from 'vuex';
    import ErrorSMSFilter from '@/components/sms/errors/Filter.vue';
    import ErrorSMSTable from '@/components/sms/errors/Table.vue';

    export default {
        components: {
            ErrorSMSFilter,
            ErrorSMSTable,
        },

        async fetch() {
            await this.fetchData();
        },

        async asyncData({ query, redirect }) {
            if (!query.fromDate || !query.toDate) {
                redirect('/sms/orther', {
                    fromDate: moment().startOf('day').format('x'),
                    toDate: moment().endOf('day').format('x'),
                });
            }
        },

        data() {
            return {
                loading: false,
                activeTab: 'all',
                fetchInterval: null,
                exportLoading: false,
            };
        },

        computed: {
            ...mapState(['autoFetch']),
            ...mapState('sms/errors', ['smsErrors', 'pagination']),
        },

        watch: {
            '$route.query': {
                async handler() {
                    await this.fetchData();
                },
            },
        },

        mounted() {
            this.fetchInterval = setInterval(() => {
                this.syncData();
            }, 3000);
        },

        beforeDestroy() {
            clearInterval(this.fetchInterval);
        },

        methods: {
            async syncData() {
                if (this.autoFetch && document.visibilityState === 'visible') {
                    await this.fetchData({ loading: false });
                }
            },

            async handleChangeTab(tabKey) {
                this.activeTab = tabKey;
                this.$router.push({
                    path: '/sms/orther',
                    query: {
                        ...this.$route.query,
                        type: tabKey,
                    },
                });
            },

            async fetchData(options = {}) {
                try {
                    if (options.loading !== false) {
                        this.loading = true;
                    }
                    await this.$store.dispatch('sms/errors/fetchAll', this.$route.query);
                } catch (error) {
                    this.$handleError(error);
                } finally {
                    this.loading = false;
                }
            },
        },

        head() {
            return {
                title: 'Danh sách SMS khác',
            };
        },
    };
</script>
