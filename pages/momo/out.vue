<template>
    <div class="bg-transparent !shadow-none !p-0">
        <WithdrawFilter class="bg-white shadow-light p-4" />
        <div class="mt-4 bg-white shadow-light p-4">
            <div class="flex flex-wrap justify-between items-center">
                <span class="text-xl font-semibold text-prim-100">Danh sách rút tiền</span>
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
                :withdraws="[]"
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
    import { mapState } from 'vuex';
    import WithdrawDialog from '@/components/withdraws/Dialog.vue';
    import WithdrawFilter from '@/components/momo/out/Filter.vue';
    import WithdrawTable from '@/components/withdraws/Table.vue';

    export default {
        components: {
            WithdrawDialog,
            WithdrawFilter,
            WithdrawTable,
        },

        async fetch() {
            await this.fetchData();
        },

        data() {
            return {
                loading: false,
                exportLoading: false,
            };
        },

        computed: {
            ...mapState('withdraws', ['withdraws', 'pagination']),
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
