<template>
    <a-modal
        v-model="visible"
        destroy-on-close
        :mask-closable="false"
        :title="`${bankAccount ? 'Chỉnh sửa' : 'Thêm mới'} tài khoản bank`"
        width="650px"
    >
        <BankAccountForm ref="bankAccountForm" :bank-account="bankAccount" @submit="handleSubmit" />
        <div slot="footer" class="flex justify-center items-center gap-2">
            <a-button class="w-28" @click="close">
                Hủy bỏ
            </a-button>
            <a-button
                :loading="loading"
                class="w-28"
                type="primary"
                @click="$refs.bankAccountForm.submit()"
            >
                {{ bankAccount ? 'Cập nhật' : 'Thêm mới' }}
            </a-button>
        </div>
    </a-modal>
</template>

<script>
    import BankAccountForm from '@/components/bankAccounts/Form.vue';

    export default {
        components: {
            BankAccountForm,
        },

        data() {
            return {
                visible: false,
                loading: false,
                bankAccount: null,
            };
        },

        methods: {
            open(bankAccount) {
                this.bankAccount = bankAccount;
                this.visible = true;
            },

            close() {
                this.visible = false;
            },

            async handleSubmit(form) {
                if (this.bankAccount) {
                    await this.updateBankAccounts(form);
                } else {
                    await this.createBankAccounts(form);
                }
                this.close();
                await this.$nuxt.refresh();
            },

            async createBankAccounts(form) {
                try {
                    this.loading = true;
                    await this.$api.bankAccounts.create(form);
                    this.close();
                    this.$message.success('Thêm tài khoản bank thành công');
                } catch (error) {
                    this.$handleError(error);
                } finally {
                    this.loading = false;
                }
            },

            async updateBankAccounts(form) {
                try {
                    this.loading = true;
                    if (Object.keys(form).length > 0) {
                        await this.$api.bankAccounts.update(this.bankAccount.id, form);
                    }
                    this.$message.success('Cập nhật tài khoản bank thành công');
                    this.close();
                } catch (error) {
                    this.$handleError(error);
                } finally {
                    this.loading = false;
                }
            },
        },
    };
</script>
