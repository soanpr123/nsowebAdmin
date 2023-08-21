<template>
    <div class="bg-transparent !shadow-none !p-0">
        <TopUpSMSFilter class="bg-white shadow-light p-4" />
        <div class="mt-4 bg-white shadow-light p-4">
            <div class="flex flex-wrap justify-between items-center">
                <span class="text-xl font-semibold text-prim-100">Danh sách SMS rút tiền</span>
                <a-button
                    type="primary"
                    :loading="exportLoading"
                    class="mb-0.5"
                    ghost
                    @click="exportXLSX"
                >
                    <i v-show="!exportLoading" class="far fa-file-excel mr-2" /> Xuất dữ liệu
                </a-button>
            </div>
            <TopUpSMSTable
                :messages="smsWithdraws"
                :loading="loading"
                :pagination="pagination"
                class="mt-4"
            />
            <ct-pagination :length="smsWithdraws.length" :data="pagination" />
        </div>
    </div>
</template>

<script>
    import moment from 'moment';
    import { mapState } from 'vuex';
    import TopUpSMSFilter from '@/components/sms/withdraws/Filter.vue';
    import TopUpSMSTable from '@/components/sms/withdraws/Table.vue';

    export default {
        components: {
            TopUpSMSFilter,
            TopUpSMSTable,
        },

        async fetch() {
            await this.fetchData();
        },

        async asyncData({ query, redirect }) {
            if (!query.fromDate || !query.toDate) {
                redirect('/sms/withdraws', {
                    fromDate: moment().startOf('day').format('x'),
                    toDate: moment().endOf('day').format('x'),
                });
            }
        },

        data() {
            return {
                loading: false,
                fetchInterval: null,
                exportLoading: false,
            };
        },

        computed: {
            ...mapState(['autoFetch']),
            ...mapState('sms/withdraws', ['smsWithdraws', 'pagination']),
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

            async fetchData(options = {}) {
                try {
                    if (options.loading !== false) {
                        this.loading = true;
                    }
                    await this.$store.dispatch('sms/withdraws/fetchAll', this.$route.query);
                } catch (error) {
                    this.$handleError(error);
                } finally {
                    this.loading = false;
                }
            },

            async exportXLSX() {
                try {
                    this.exportLoading = true;
                    await this.$api.smsWithdraws.exportXLSX({
                        ...this.$route.query,
                        download: true,
                        page: undefined,
                    });
                } catch (error) {
                    this.$handleError(error);
                } finally {
                    this.exportLoading = false;
                }
            },
        },

        head() {
            return {
                title: 'Danh sách SMS rút tiền',
            };
        },
    };
</script>
