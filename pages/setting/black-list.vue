<template>
    <div class="bg-transparent !shadow-none !p-0">
        <BlacklistFilter class="bg-white shadow-light p-4" />
        <div class="mt-4 bg-white shadow-light p-4">
            <div class="flex flex-wrap justify-between items-center gap-4">
                <span class="text-xl font-semibold text-prim-100">Khóa tài khoản</span>
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
                    <a-button type="primary" ghost @click="$refs.blacklistDialog.open()">
                        Thêm tài khoản
                    </a-button>
                </div>
            </div>
            <BlacklistTable
                :blacklists="blacklists"
                :loading="loading"
                :pagination="pagination"
                class="mt-4"
                @editing="isEditing => setAutoFetch(false)"
            />
            <ct-pagination :length="blacklists.length" :data="pagination" />
        </div>
        <BlacklistDialog ref="blacklistDialog" />
    </div>
</template>

<script>
    import { mapState } from 'vuex';
    import BlacklistDialog from '@/components/blacklists/Dialog.vue';
    import BlacklistFilter from '@/components/blacklists/Filter.vue';
    import BlacklistTable from '@/components/blacklists/Table.vue';

    export default {
        components: {
            BlacklistDialog,
            BlacklistFilter,
            BlacklistTable,
        },

        async fetch() {
            await this.fetchData();
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
            ...mapState('blacklists', ['blacklists', 'pagination']),
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
                    await this.$store.dispatch('blacklists/fetchAll', this.$route.query);
                } catch (error) {
                    this.$handleError(error);
                } finally {
                    this.loading = false;
                }
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
        },

        head() {
            return {
                title: 'Khóa tài khoản',
            };
        },
    };
</script>
