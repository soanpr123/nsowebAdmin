<template>
    <a-modal
        v-model="visible"
        destroy-on-close
        title="Hủy yêu cầu"
    >
        <div class="mb-2">
            Lý do:
        </div>
        <a-textarea
            v-model="note"
            placeholder="Nhập lý do"
            :auto-size="{ minRows: 3, maxRows: 5 }"
        />
        <div slot="footer" class="flex justify-end items-center gap-2">
            <a-button class="w-28" @click="close">
                Hủy
            </a-button>
            <a-button
                :loading="loading"
                class="w-28"
                type="danger"
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
                note: '',
            };
        },

        methods: {
            _get,

            open(withdraw) {
                this.withdraw = withdraw;
                this.note = '';
                this.visible = true;
            },

            close() {
                this.visible = false;
            },

            async handleConfirm() {
                try {
                    this.loading = true;
                    await this.$api.withdraws.update(this.withdraw.id, {
                        status: WITHDRAW_STATUS.CANCELED,
                        note: this.note,
                    });
                    this.$nuxt.refresh();
                    this.$message.success('Hủy yêu cầu thành công');
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
