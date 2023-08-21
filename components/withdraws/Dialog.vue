<template>
    <a-modal
        v-model="visible"
        destroy-on-close
        :mask-closable="false"
        :title="`${withdraw ? 'Chỉnh sửa' : 'Thêm mới'} yêu cầu`"
        width="650px"
    >
        <WithdrawForm ref="withdrawForm" :withdraw="withdraw" @submit="handleSubmit" />
        <div slot="footer" class="flex justify-center items-center gap-2">
            <a-button class="w-28" @click="close">
                Hủy bỏ
            </a-button>
            <a-button
                :loading="loading"
                class="w-28"
                type="primary"
                @click="$refs.withdrawForm.submit()"
            >
                {{ withdraw ? 'Cập nhật' : 'Thêm mới' }}
            </a-button>
        </div>
    </a-modal>
</template>

<script>
    import WithdrawForm from '@/components/withdraws/Form.vue';

    export default {
        components: {
            WithdrawForm,
        },

        data() {
            return {
                visible: false,
                loading: false,
                withdraw: null,
            };
        },

        methods: {
            open(withdraw) {
                this.withdraw = withdraw;
                this.visible = true;
            },

            close() {
                this.visible = false;
            },

            async handleSubmit(form) {
                if (this.withdraw) {
                    await this.updateWithdraw(form);
                } else {
                    await this.createWithdraw(form);
                }
                this.close();
                await this.$nuxt.refresh();
            },

            async createWithdraw(form) {
                try {
                    this.loading = true;
                    await this.$api.withdraws.create(form);
                    this.close();
                    this.$message.success('Thêm yêu cầu thành công');
                } catch (error) {
                    this.$handleError(error);
                } finally {
                    this.loading = false;
                }
            },

            async updateWithdraw(form) {
                try {
                    this.loading = true;
                    await this.$api.withdraws.update(this.withdraw.id, form);
                    this.close();
                    this.$message.success('Cập nhật yêu cầu thành công');
                } catch (error) {
                    this.$handleError(error);
                } finally {
                    this.loading = false;
                }
            },
        },
    };
</script>
