<template>
    <div>
        <a-table
            :data-source="bankAccounts"
            :loading="loading"
            :scroll="{ x: 500 }"
            :pagination="false"
        >
            <a-table-column
                key="index"
                title="STT"
                :width="60"
                :custom-render="getIndex"
            />
            <a-table-column
                key="napCode"
                title="NAPAS CODE"
                data-index="BankInfo.bankBID"
                :width="110"
            />
            <a-table-column
                key="fullName"
                title="TÊN ĐẦY ĐỦ"
                data-index="BankInfo.bankFullName"
                :width="250"
            />
            <a-table-column
                key="shortName"
                title="VIẾT TẮT 1"
                class="font-semibold"
                data-index="BankInfo.bankName"
                :width="140"
            />
            <a-table-column
                key="code"
                title="VIẾT TẮT 2"
                data-index="BankInfo.bankCode"
                :width="90"
            />
            <a-table-column
                key="bankAccBalance"
                title="SỐ DƯ"
                :width="150"
                align="right"
                data-index="bankAccBalance"
            >
                <template #default="bankAccBalance">
                    <div>{{ bankAccBalance | currencyFormat }}</div>
                </template>
            </a-table-column>
            <a-table-column
                key="accountName"
                title="CHỦ TÀI KHOẢN"
                :width="150"
            >
                <template #default="bankAccount">
                    <div class="line-clamp-1" title="bankAccount.">
                        {{ bankAccount.bankAccName }}
                    </div>
                    <div class="whitespace-nowrap text-sm text-gray-80">
                        {{ bankAccount.bankAccNumber }}
                    </div>
                </template>
            </a-table-column>
            <a-table-column
                key="sub"
                title="CHI NHÁNH"
                data-index="bankBranchName"
                :width="120"
            />
            <a-table-column
                key="topUpStatus"
                title="HIỂN THỊ RÚT"
                align="center"
                :width="150"
            >
                <template #default="bankAccount">
                    <a-switch :default-checked="bankAccount.status === BANK_ACCOUNT_STATUS.ACTIVE" @change="toggleStatus(bankAccount)" />
                </template>
            </a-table-column>
            <a-table-column
                v-if="type !== 'out'"
                key="actions"
                align="center"
                title="ACTION"
                :width="110"
            >
                <template #default="bankAccount">
                    <a-button type="primary" ghost @click="$refs.bankAccountDialog.open(bankAccount)">
                        <i class="fas fa-edit text-sm" />
                    </a-button>
                    <a-button type="danger" ghost @click="$refs.bankAccountDeleteDialog.open(bankAccount)">
                        <i class="fas fa-trash-alt text-sm" />
                    </a-button>
                </template>
            </a-table-column>
        </a-table>
        <BankAccountDialog ref="bankAccountDialog" />
        <BankAccountDeleteDialog ref="bankAccountDeleteDialog" />
    </div>
</template>

<script>
    import { BANK_ACCOUNT_STATUS } from '@/constants/bankAccount/status';
    import BankAccountDialog from '@/components/bankAccounts/Dialog.vue';
    import BankAccountDeleteDialog from '@/components/bankAccounts/dialogs/Delete.vue';

    export default {
        components: {
            BankAccountDialog,
            BankAccountDeleteDialog,
        },

        props: {
            bankAccounts: {
                type: Array,
                required: true,
            },
            loading: {
                type: Boolean,
                default: false,
            },
            pagination: {
                type: Object,
                required: false,
            },
            type: String,
        },

        data() {
            return {
                BANK_ACCOUNT_STATUS,
            };
        },

        methods: {
            getIndex(text, record, index) {
                return index + 1;
            },

            async toggleStatus(bankAccount) {
                try {
                    await this.$api.bankAccounts.update(bankAccount.id, {
                        status: bankAccount.status === BANK_ACCOUNT_STATUS.ACTIVE ? BANK_ACCOUNT_STATUS.INACTIVE : BANK_ACCOUNT_STATUS.ACTIVE,
                    });
                    this.$message.success('Cập nhật trạng thái thành công');
                } catch (error) {
                    this.$handleError(error);
                }
            },
        },
    };
</script>
