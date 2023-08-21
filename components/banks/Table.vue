<template>
    <a-table
        :data-source="data"
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
            key="napasID"
            title="NAPAS CODE"
            data-index="napasID"
            :width="110"
        />
        <a-table-column
            key="bankFullName"
            title="TÊN ĐẦY ĐỦ"
            data-index="bankFullName"
            :width="250"
        />
        <a-table-column
            key="bankName"
            title="VIẾT TẮT 1"
            class="font-semibold"
            data-index="bankName"
            :width="140"
        />
        <a-table-column
            key="bankCode"
            title="VIẾT TẮT 2"
            data-index="bankCode"
            :width="90"
        />
        <a-table-column
            key="order"
            :width="90"
        >
            <div slot="title" class="flex gap-1 items-center">
                <span>ORDER</span>
                <a-popover placement="top" :title="false">
                    <div slot="content" class="w-[250px]">
                        Giá trị tỉ lệ nghịch với thứ tự hiển thị. Nếu 2 bank có cùng giá trị, thứ tự hiển thị sẽ theo tên A-Z.
                    </div>
                    <i class="fas fa-info-circle text-prim-90 cursor-pointer" />
                </a-popover>
            </div>
            <div slot="default" slot-scope="record" class="flex items-center gap-2">
                <template v-if="_get(record, 'editing.order') !== true">
                    <i class="far fa-edit cursor-pointer text-prim-90" @click="handleEdit('order', record)" />
                    {{ record.order }}
                </template>
                <template v-else>
                    <a-input v-model.number="record.order" size="small" />
                    <i v-if="_get(record, 'loading.order')" class="fas fa-spinner animate-spin text-prim-90" />
                    <template v-else>
                        <i class="fas fa-check cursor-pointer text-prim-90" @click="handleUpdate('order', record)" />
                        <i class="fas fa-times cursor-pointer text-red-100" @click="handleCancelUpdate('order', record)" />
                    </template>
                </template>
            </div>
        </a-table-column>
        <a-table-column
            key="statusShowWithdraw"
            title="HIỂN THỊ RÚT"
            align="center"
            :width="150"
        >
            <template #default="bank">
                <a-switch :default-checked="bank.statusShowWithdraw === BANK_STATUS.ACTIVE" @change="toggleBankStatus(bank)" />
            </template>
        </a-table-column>
    </a-table>
</template>

<script>
    import _cloneDeep from 'lodash/cloneDeep';
    import _get from 'lodash/get';
    import { BANK_STATUS } from '@/constants/bank/status';

    export default {
        props: {
            banks: {
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
                BANK_STATUS,
                data: [],
            };
        },

        watch: {
            banks() {
                this.data = _cloneDeep(this.banks);
            },
        },

        mounted() {
            this.data = _cloneDeep(this.banks);
        },

        methods: {
            _get,

            getIndex(text, record, index) {
                return (parseInt(+this.pagination.page, 10) - 1) * this.pagination.pageSize + index + 1;
            },

            async toggleBankStatus(bank) {
                try {
                    await this.$api.banks.update(bank.id, {
                        statusShowWithdraw: bank.statusShowWithdraw === BANK_STATUS.ACTIVE ? BANK_STATUS.INACTIVE : BANK_STATUS.ACTIVE,
                    });
                    this.$message.success('Cập nhật trạng thái thành công');
                    await this.$nuxt.refresh();
                } catch (error) {
                    this.$handleError(error);
                }
            },

            handleEdit(key, record) {
                this.$emit('editing', true);
                if (!record.editing) {
                    record.editing = {};
                }

                record.editing[key] = true;
                this.$forceUpdate();
            },

            async handleUpdate(key, record) {
                try {
                    if (!record.loading) {
                        record.loading = {};
                    }
                    record.loading[key] = true;
                    this.$forceUpdate();
                    if (_get(record, key)) {
                        await this.$api.banks.update(record.id, {
                            [key]: _get(record, key),
                        });
                        this.$message.success('Cập nhật thành công');
                        this.$store.commit('SET_AUTO_FETCH', true);
                        record.editing[key] = false;
                        this.$emit('editing', false);
                        this.$forceUpdate();
                    } else {
                        this.$message.warning('Vui lòng nhập nội dung');
                    }
                } catch (error) {
                    this.$handleError(error);
                } finally {
                    record.loading[key] = false;
                }
            },

            handleCancelUpdate(key, record) {
                record.editing[key] = false;
                const index = this.banks.findIndex((bank) => bank.id === record.id);
                this.data[index] = _cloneDeep(this.banks[index]);
                this.$forceUpdate();
                this.$emit('editing', false);
            },
        },
    };
</script>
