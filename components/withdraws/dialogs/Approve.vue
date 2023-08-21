<template>
    <a-modal
        v-model="visible"
        destroy-on-close
        title="Duyệt yêu cầu"
    >
        <div>
            Xác nhận duyệt yêu cầu rút cho nickname <span class="text-prim-90 font-semibold">{{ withdraw.partnerReference }}</span> số tiền <strong>{{ withdraw.transferAmount | currencyFormat }}</strong>?
        </div>
        <div slot="footer" class="flex justify-end items-center gap-2">
            <a-button class="w-28" @click="close">
                Hủy
            </a-button>
            <a-button
                :loading="loading"
                class="w-28"
                type="primary"
                @click="handleConfirm"
            >
                Xác nhận
            </a-button>
        </div>
    </a-modal>
</template>

<script>
    import _get from 'lodash/get';
    import { WITHDRAW_STATUS } from '@/constants/withdraw/status';

    export default {
        data() {
            return {
                visible: false,
                loading: false,
                withdraw: {},
            };
        },

        methods: {
            _get,

            open(withdraw) {
                this.withdraw = withdraw;
                this.visible = true;
            },

            close() {
                this.visible = false;
            },

            async handleConfirm() {
                try {
                    this.loading = true;
                    await this.$api.withdraws.update(this.withdraw.id, {
                        status: WITHDRAW_STATUS.SUCCESS,
                    });
                    this.$message.success('Duyệt yêu cầu thành công');
                    this.$nuxt.refresh();
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
