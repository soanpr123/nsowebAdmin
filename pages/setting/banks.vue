<template>
    <div class="bank-list bg-transparent !shadow-none !p-0">
        <div class="bg-white shadow-light p-4">
            <div class="flex flex-wrap gap-2 justify-between items-center">
                <a-tabs :active-key="activeTab" default-active-key="bankIn" @change="handleChangeTab">
                    <a-tab-pane :key="BANK_ACCOUNT_TYPE.TOP_UP" tab="Bank tự động nạp" />
                    <a-tab-pane :key="BANK_ACCOUNT_TYPE.WITHDRAW" tab="Bank tự động rút" force-render />
                    <a-tab-pane key="bankList" tab="Danh sách Bank" />
                </a-tabs>
                <a-button
                    v-show="[BANK_ACCOUNT_TYPE.TOP_UP, BANK_ACCOUNT_TYPE.WITHDRAW].includes(activeTab)"
                    type="primary"
                    ghost
                    @click="$refs.bankAccountDialog.open()"
                >
                    Thêm mới
                </a-button>
            </div>
            <BankAccountTable
                v-show="activeTab === BANK_ACCOUNT_TYPE.TOP_UP"
                :bank-accounts="bankAccounts"
                :pagination="pagination"
                :loading="loading"
                class="mt-4"
            />
            <BankAccountTable
                v-show="activeTab === BANK_ACCOUNT_TYPE.WITHDRAW"
                :bank-accounts="bankAccounts"
                :pagination="pagination"
                :loading="loading"
                class="mt-4"
            />
            <div v-show="activeTab === 'bankList'">
                <BankTable
                    :banks="banks"
                    :pagination="pagination"
                    :loading="loading"
                    type="out"
                    class="mt-4"
                />
                <ct-pagination :length="banks.length" class="!mt-4" :data="pagination" />
            </div>
        </div>
        <BankAccountDialog ref="bankAccountDialog" />
    </div>
</template>

<script>
    import { mapState } from 'vuex';
    import { BANK_ACCOUNT_TYPE } from '@/constants/bankAccount/type';
    import BankAccountDialog from '@/components/bankAccounts/Dialog.vue';
    import BankAccountTable from '@/components/bankAccounts/Table.vue';
    import BankTable from '@/components/banks/Table.vue';

    export default {
        components: {
            BankAccountDialog,
            BankTable,
            BankAccountTable,
        },

        async fetch() {
            await this.fetchData();
        },

        async asyncData({ query, redirect }) {
            if (!query.type) {
                redirect('/setting/banks', {
                    type: BANK_ACCOUNT_TYPE.TOP_UP,
                });
            }
        },

        data() {
            return {
                loading: false,
                activeTab: this.$route.query.type || BANK_ACCOUNT_TYPE.TOP_UP,
                BANK_ACCOUNT_TYPE,
            };
        },

        computed: {
            ...mapState('banks', ['banks', 'pagination']),
            ...mapState('bankAccounts', ['bankAccounts']),
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
                    if (this.$route.query.type === 'bankList') {
                        await this.$store.dispatch('banks/fetchAll', this.$route.query);
                    } else {
                        await this.$store.dispatch('bankAccounts/fetchAll', this.$route.query);
                    }
                } catch (error) {
                    this.$handleError(error);
                } finally {
                    this.loading = false;
                }
            },

            async handleChangeTab(tabKey) {
                this.activeTab = tabKey;
                await this.$router.push({
                    path: '/setting/banks',
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

<style lang="scss">
    .bank-list {
        .ant-tabs-bar {
            @apply mb-0 #{!important};
        }
    }
</style>
