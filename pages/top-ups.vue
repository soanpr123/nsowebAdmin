<template>
    <div class="bg-transparent !shadow-none !p-0">
        <TopUpFilter class="bg-white shadow-light p-4" />
        <div class="mt-4 bg-white shadow-light p-4">
            <div class="flex flex-wrap justify-between items-center gap-4">
                <div class="flex-grow flex justify-between items-center flex-wrap">
                    <span class="text-xl font-semibold text-prim-100" @click="openTopUpDialog">Danh sách nạp tiền</span>
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
                            Lỗ/Lãi: <span
                                class="font-semibold"
                                :class="[partnerReference.diff >= 0 ? 'text-green-100' : 'text-red-100']"
                            >
                                {{ partnerReference.diff | currencyFormat }}</span>
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
                    <!-- <a-button
                        v-if="$auth.user.type === 'root'"
                        type="primary"
                        ghost
                    >
                        <i class="fas fa-plus" />
                    </a-button> -->
                </div>
            </div>
            <TopUpTable
                :top-ups="topUps"
                :loading="loading"
                :pagination="pagination"
                class="mt-4"
                @editing="isEditing => setAutoFetch(false)"
            />
            <ct-pagination :length="topUps.length" :data="pagination" />
        </div>
        <TopUpDialog ref="topUpDialog" />
    </div>
</template>

<script>
    import moment from 'moment';
    import { mapState } from 'vuex';
    import TopUpFilter from '@/components/topUps/Filter.vue';
    import TopUpTable from '@/components/topUps/Table.vue';
    import TopUpDialog from '@/components/topUps/Dialog.vue';

    export default {
        components: {
            TopUpFilter,
            TopUpTable,
            TopUpDialog,
        },

        async fetch() {
            await this.$store.commit('topUps/SET_TOP_UPS', []);
            await this.$store.commit('partnerReferences/SET_PARTNER_REFERENCE', {});
            await this.fetchData();
        },

        async asyncData({ query, redirect }) {
            if (!query.fromDate || !query.toDate) {
                redirect('/top-ups', {
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
            ...mapState('topUps', ['topUps', 'pagination']),
            ...mapState('partnerReferences', ['partnerReference']),
        },

        watch: {
            '$route.query': {
                async handler() {
                    if (!this.$route.query.fromDate || !this.$route.query.toDate) {
                        this.$router.push({
                            path: '/top-ups',
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
                    await this.$store.dispatch('topUps/fetchAll', this.$route.query);
                } catch (error) {
                    this.$handleError(error);
                } finally {
                    this.loading = false;
                }
            },

            setAutoFetch(value) {
                this.$store.commit('SET_AUTO_FETCH', value);
            },

            async exportXLSX() {
                try {
                    this.exportLoading = true;
                    await this.$api.topUps.exportXLSX({
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

            openTopUpDialog() {
                if (this.$auth.user.type === 'root') {
                    this.$refs.topUpDialog.open();
                }
            },
        },

        head() {
            return {
                title: 'Danh sách nạp tiền',
            };
        },
    };
</script>
