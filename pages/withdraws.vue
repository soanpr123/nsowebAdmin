<template>
    <div class="bg-transparent !shadow-none !p-0">
        <WithdrawFilter />
        <div class="mt-4 bg-white shadow-light p-4">
            <div class="flex flex-wrap justify-between items-center gap-4">
                <div class="flex-grow flex justify-between items-center flex-wrap">
                    <span class="text-xl font-semibold text-prim-100">Danh sách rút tiền</span>
                    <div v-if="partnerReference && partnerReference.sumTopup !== null" class="flex justify-between gap-4 border border-prim-90 rounded-sm px-2 py-1">
                        <div>
                            Nickname: <span class="font-semibold">{{ $route.query.partnerReference }}</span>
                        </div>
                        <div>
                            Tổng nạp: <span class="font-semibold text-green-100">{{ partnerReference.sumTopup | currencyFormat }}</span>
                        </div>
                        <div>
                            Tổng rút: <span class="font-semibold text-yellow-100">{{ partnerReference.sumWithdraw | currencyFormat }}</span>
                        </div>
                        <div>
                            Lỗ/Lãi: <span class="font-semibold" :class="[partnerReference.diff >= 0 ? 'text-green-100' : 'text-red-100']">{{ partnerReference.diff | currencyFormat }}</span>
                        </div>
                    </div>
                </div>
                <div class="flex gap-2">
                    <a-button
                        type="primary"
                        :loading="exportLoading"
                        class="mb-0.5"
                        ghost
                        @click="exportXLSX"
                    >
                        <i v-show="!exportLoading" class="far fa-file-excel mr-2" /> Xuất dữ liệu
                    </a-button>
                    <!-- <a-button type="primary" ghost @click="$refs.withdrawDialog.open()">
                        Tạo yêu cầu
                    </a-button> -->
                </div>
            </div>
            <WithdrawTable
                :withdraws="withdraws"
                :loading="loading"
                :pagination="pagination"
                class="mt-4"
            />
            <ct-pagination :length="withdraws.length" :data="pagination" />
        </div>
        <WithdrawDialog ref="withdrawDialog" />
    </div>
</template>

<script>
    import moment from 'moment';
    import { mapState } from 'vuex';
    import WithdrawDialog from '@/components/withdraws/Dialog.vue';
    import WithdrawFilter from '@/components/withdraws/Filter.vue';
    import WithdrawTable from '@/components/withdraws/Table.vue';

    export default {
        components: {
            WithdrawDialog,
            WithdrawFilter,
            WithdrawTable,
        },

        async fetch() {
            await this.$store.commit('withdraws/SET_WITHDRAWS', []);
            await this.$store.commit('partnerReferences/SET_PARTNER_REFERENCE', {});
            await this.fetchData();
        },

        async asyncData({ query, redirect }) {
            if (!query.fromDate || !query.toDate) {
                redirect('/withdraws', {
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
            ...mapState('withdraws', ['withdraws', 'pagination']),
            ...mapState('partnerReferences', ['partnerReference']),
        },

        watch: {
            '$route.query': {
                async handler() {
                    if (!this.$route.query.fromDate || !this.$route.query.toDate) {
                        this.$router.push({
                            path: '/withdraws',
                            query: {
                                fromDate: moment().startOf('day').format('x'),
                                toDate: moment().endOf('day').format('x'),
                            },
                        });
                    } else {
                        await this.fetchData();
                    }
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
                    await this.$store.dispatch('withdraws/fetchAll', this.$route.query);
                } catch (error) {
                    this.$handleError(error);
                } finally {
                    this.loading = false;
                }
            },

            async exportXLSX() {
                try {
                    this.exportLoading = true;
                    await this.$api.withdraws.exportXLSX({
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
                title: 'Danh sách rút tiền',
            };
        },
    };
</script>
