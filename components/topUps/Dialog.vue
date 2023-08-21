<template>
    <a-modal
        v-model="visible"
        destroy-on-close
        :mask-closable="false"
        :title="`${topUp ? 'Chỉnh sửa' : 'Thêm mới'} bản ghi nạp`"
        width="450px"
    >
        <TopUpForm ref="topUpForm" :top-up="topUp" @submit="handleSubmit" />
        <div slot="footer" class="flex justify-center items-center gap-2">
            <a-button class="w-28" @click="close">
                Hủy bỏ
            </a-button>
            <a-button
                :loading="loading"
                class="w-28"
                type="primary"
                @click="$refs.topUpForm.submit()"
            >
                {{ topUp ? 'Cập nhật' : 'Thêm mới' }}
            </a-button>
        </div>
    </a-modal>
</template>

<script>
    import TopUpForm from '@/components/topUps/Form.vue';

    export default {
        components: {
            TopUpForm,
        },

        data() {
            return {
                visible: false,
                loading: false,
                topUp: null,
            };
        },

        methods: {
            open(topUp) {
                this.topUp = topUp;
                this.visible = true;
            },

            close() {
                this.visible = false;
            },

            async handleSubmit(form) {
                if (this.topUp) {
                    await this.updateTopUp(form);
                } else {
                    await this.createTopUp(form);
                }
                this.close();
                await this.$nuxt.refresh();
            },

            async createTopUp(form) {
                try {
                    this.loading = true;
                    await this.$api.topUps.createManual(form);
                    this.close();
                    this.$message.success('Thêm yêu cầu thành công');
                } catch (error) {
                    this.$handleError(error);
                } finally {
                    this.loading = false;
                }
            },

            async updateTopUp(form) {
                try {
                    this.loading = true;
                    await this.$api.topUps.update(this.topUp.id, form);
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
