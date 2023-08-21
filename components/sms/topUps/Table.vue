<template>
    <a-table
        :data-source="data"
        :loading="loading"
        :scroll="{ x: 800 }"
        :pagination="false"
    >
        <a-table-column
            v-if="pagination"
            key="index"
            title="STT"
            :width="60"
            :custom-render="getIndex"
        />
        <a-table-column
            key="id"
            title="MÃ TIN"
            data-index="id"
            :width="100"
        />
        <a-table-column
            key="Bank"
            title="NGÂN HÀNG"
            data-index="Bank.bankName"
            :width="130"
        />
        <a-table-column
            key="content"
            title="NỘI DUNG TIN NHẮN TỪ NGÂN HÀNG"
            data-index="content"
            :width="330"
        />
        <a-table-column
            key="transferAmount"
            title="TIỀN NẠP"
            data-index="transferAmount"
            class="!text-prim-90"
            align="right"
            :width="120"
        >
            <template #default="transferAmount">
                {{ transferAmount | currencyFormat }}
            </template>
        </a-table-column>
        <!-- <a-table-column
            key="partnerReference"
            title="NỘI DUNG"
            :width="130"
        >
            <div slot="default" slot-scope="record" class="flex items-center gap-2">
                <template v-if="_get(record, 'editing.partnerReference') !== true">
                    <span>{{ _get(record, 'TopupRequest.partnerReference') }}</span>
                    <i
                        v-if="
                            _get(record, 'status.value') === SMS_TOP_UP_STATUS.ERROR
                        "
                        class="far fa-edit cursor-pointer text-prim-90"
                        @click="handleEdit('partnerReference', record)"
                    />
                </template>
                <template v-else>
                    <a-input v-model="record.partnerReference" size="small" />
                    <i v-if="_get(record, 'loading.partnerReference')" class="fas fa-spinner animate-spin text-prim-90" />
                    <template v-else>
                        <i class="fas fa-check cursor-pointer text-prim-90" @click="handleUpdate('partnerReference', record)" />
                        <i class="fas fa-times cursor-pointer text-red-100" @click="handleCancelUpdate('partnerReference', record)" />
                    </template>
                </template>
            </div>
        </a-table-column> -->
        <a-table-column
            key="partnerReference"
            title="NỘI DUNG"
            data-index="partnerReference"
            :width="130"
        />
        <!-- <a-table-column
            key="status"
            title="TRẠNG THÁI"
            align="center"
            data-index="status"
            :width="110"
        >
            <template #default="status">
                <a-tag v-if="status && status.color" :color="status.color">
                    {{ status.label }}
                </a-tag>
            </template>
        </a-table-column> -->
        <a-table-column
            key="transferId"
            title="MÃ GD"
            data-index="transferId"
            :width="170"
        >
            <template #default="transferId">
                <div v-if="transferId" class="flex items-center gap-1">
                    <i class="far fa-copy text-prim-90 cursor-pointer" @click="copyText(transferId)" />
                    <span
                        class="overflow-hidden whitespace-nowrap"
                        :title="transferId"
                        style="direction: rtl; text-overflow: ellipsis"
                    >
                        {{ transferId }}
                    </span>
                </div>
            </template>
        </a-table-column>
        <a-table-column
            key="createdAt"
            title="TIME NHẬN SMS"
            data-index="createdAt"
            :width="130"
        >
            <template #default="createdAt">
                <div>{{ createdAt | dateFormat }} {{ createdAt | dateFormat('HH:mm') }}</div>
            </template>
        </a-table-column>
        <!-- <a-table-column
            key="actions"
            align="center"
            title="HÀNH ĐỘNG"
            :width="120"
        >
            <template #default="message">
                <a-button
                    v-if="_get(message, 'status.value') !== SMS_TOP_UP_STATUS.SUCCESS"
                    type="primary"
                    size="small"
                    @click="mappingMessage(message)"
                >
                    Map lại
                </a-button>
            </template>
        </a-table-column> -->
    </a-table>
</template>

<script>
    import _cloneDeep from 'lodash/cloneDeep';
    import _get from 'lodash/get';
    import { SMS_TOP_UP_STATUS } from '@/constants/sms/topUp/status';

    export default {
        props: {
            messages: {
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
        },

        data() {
            return {
                data: [],
                SMS_TOP_UP_STATUS,
            };
        },

        watch: {
            messages() {
                this.data = _cloneDeep(this.messages);
            },
        },

        mounted() {
            this.data = _cloneDeep(this.messages);
        },

        methods: {
            _get,

            getIndex(text, record, index) {
                return (parseInt(+this.pagination.page, 10) - 1) * this.pagination.pageSize + index + 1;
            },

            async mappingMessage(message) {
                try {
                    await this.$api.smsTopUps.mapping(message.id);
                    this.$message.success('Map lại thành công');
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
                        if (key === 'partnerReference') {
                            await this.$api.smsTopUps.mapping(record.id, {
                                [key]: _get(record, key),
                            });
                        } else {
                            await this.$api.smsTopUps.update(record.id, {
                                [key]: _get(record, key),
                            });
                        }
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
                const index = this.messages.findIndex((topUp) => topUp.id === record.id);
                this.data[index] = _cloneDeep(this.messages[index]);
                this.$store.commit('SET_AUTO_FETCH', true);
                this.$forceUpdate();
                this.$emit('editing', false);
            },

            copyText(text) {
                try {
                    const input = document.createElement('input');
                    input.setAttribute('value', text);
                    document.body.appendChild(input);
                    input.select();
                    document.execCommand('copy');
                    document.body.removeChild(input);
                    this.$message.success('Đã sao chép!');
                } catch (error) {
                    this.$handleError(error, this.$message);
                }
            },
        },
    };
</script>
