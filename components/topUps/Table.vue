<template>
    <div>
        <a-table
            :data-source="data"
            :loading="loading"
            :scroll="{ x: 800 }"
            :pagination="false"
            @change="(pagination, filters, sorter) => handleChange(sorter)"
        >
            <a-table-column
                v-if="pagination"
                key="index"
                title="STT"
                :width="60"
                :custom-render="getIndex"
            />
            <a-table-column
                key="transferId"
                title="MÃ GD"
                data-index="transferId"
                :width="160"
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
                key="bank"
                title="BANK"
                data-index="AccBank.BankInfo.bankCode"
                :width="60"
            />
            <a-table-column
                key="bankAccName"
                title="CHỦ TK"
                data-index="AccBank.bankAccName"
                :width="140"
            />
            <a-table-column
                key="bankAccNumber"
                title="SỐ TK"
                data-index="AccBank.bankAccNumber"
                :width="130"
            />
            <a-table-column
                key="transferMessage"
                title="TIN NHẮN"
                :width="150"
            >
                <template #default="record">
                    <a-tooltip placement="top" title="Chi tiết">
                        <i class="fas fa-info-circle cursor-pointer text-lg text-prim-90 mr-1" @click="showSMSMessage(record)" />
                    </a-tooltip>
                    {{ record.transferMessage }}
                </template>
            </a-table-column>
            <a-table-column
                key="requestAmount"
                title="SỐ TIỀN"
                align="right"
                :sorter="true"
                :width="100"
            >
                <div slot="default" slot-scope="record" class="flex items-center justify-end gap-2">
                    <span>{{ record.requestAmount | currencyFormat }}</span>
                </div>
            </a-table-column>
            <a-table-column
                key="partnerReference"
                title="NICKNAME"
                class="!text-prim-90"
                :sorter="true"
                :width="120"
            >
                <div slot="default" slot-scope="record" class="flex items-center gap-2">
                    <template v-if="_get(record, 'editing.partnerReference') !== true">
                        <span class="underline cursor-pointer" @click="handleFilter('partnerReference', record.partnerReference)">{{ record.partnerReference }}</span>
                        <i
                            v-if="
                                (_get(record, 'callbackStatus.value') === TOP_UP_CALLBACK_STATUS.ERROR || _get(record, 'callbackStatus.value') === TOP_UP_CALLBACK_STATUS.WAITING)
                                    && _get(record, 'transferStatus.value') === TOP_UP_TRANSFER_STATUS.SUCCESS
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
            </a-table-column>
            <!-- <a-table-column
            key="transferStatus"
            title="NHẬN TIỀN"
            align="center"
            data-index="transferStatus"
            :width="90"
        >
            <template #default="transferStatus">
                <a-tag v-if="transferStatus" :color="transferStatus.color" class="!px-2 !py-0.5">
                    {{ transferStatus.label }}
                </a-tag>
            </template>
        </a-table-column> -->
            <a-table-column
                key="callbackStatus"
                title="CALLBACK"
                align="center"
                data-index="callbackStatus"
                :width="100"
            >
                <template #default="callbackStatus">
                    <a-tag
                        v-if="callbackStatus"
                        :color="callbackStatus.color"
                        class="!px-2 !py-0.5 !cursor-pointer !select-none"
                        @click="handleFilter('statusCallback', callbackStatus.value)"
                    >
                        <span v-html="callbackStatus.htmlLabel" />
                    </a-tag>
                </template>
            </a-table-column>
            <a-table-column
                key="createdAt"
                title="TIME TẠO"
                data-index="createdAt"
                :sorter="true"
                :width="125"
            >
                <template #default="createdAt">
                    <div>{{ createdAt | dateFormat }} {{ createdAt | dateFormat('HH:mm') }}</div>
                </template>
            </a-table-column>
            <!-- <a-table-column
                key="updatedAt"
                title="TIME XỬ LÝ"
                data-index="updatedAt"
                :width="125"
            >
                <template #default="updatedAt">
                    <div>{{ updatedAt | dateFormat }} {{ updatedAt | dateFormat('HH:mm') }}</div>
                </template>
            </a-table-column> -->
            <a-table-column
                key="timespan"
                title="TIMESPAN"
                align="right"
                :width="85"
            >
                <template #default="record">
                    <a-tooltip
                        v-if="_get(record, 'callbackStatus.value') === TOP_UP_CALLBACK_STATUS.SUCCESS || _get(record, 'callbackStatus.value') === TOP_UP_CALLBACK_STATUS.ERROR"
                        key=""
                        placement="top"
                        :title="dateFormat(record.updatedAt, 'dd/MM/yyyy HH:mm')"
                    >
                        {{ getProcessTime(record) / 1000 | humanizeTimeRange }}
                    </a-tooltip>
                </template>
            </a-table-column>
            <!-- <a-table-column
            key="requestId"
            title="MÃ YÊU CẦU"
            data-index="requestId"
            :width="125"
        >
            <template #default="requestId">
                <div v-if="requestId" class="flex items-center gap-1">
                    <i class="far fa-copy text-prim-90 cursor-pointer" @click="copyText(requestId)" />
                    <span
                        class="overflow-hidden whitespace-nowrap"
                        :title="requestId"
                        style="direction: rtl; text-overflow: ellipsis"
                    >
                        {{ requestId }}
                    </span>
                </div>
            </template>
        </a-table-column> -->
            <a-table-column
                key="actions"
                :fixed="isMobile ? false : 'right'"
                title="ACTION"
                :width="110"
            >
                <template #default="record">
                    <a-tooltip placement="top" title="Logs">
                        <a-button
                            type="primary"
                            class="mr-1 !font-normal"
                            size="small"
                            @click="$refs.topUpLogsDialog.open(record)"
                        >
                            <i class="far fa-file-alt" />
                        </a-button>
                    </a-tooltip>
                    <a-button
                        v-if="
                            (_get(record, 'callbackStatus.value') === TOP_UP_CALLBACK_STATUS.ERROR || _get(record, 'callbackStatus.value') === TOP_UP_CALLBACK_STATUS.WAITING)
                                && _get(record, 'transferStatus.value') === TOP_UP_TRANSFER_STATUS.SUCCESS
                                && !!record.partnerReference
                                && !_get(record, 'editing.partnerReference')
                        "
                        type="primary"
                        class="!font-normal"
                        size="small"
                        @click="reCallback(record)"
                    >
                        ReCall
                    </a-button>
                </template>
            </a-table-column>
        </a-table>
        <a-modal
            v-model="smsContentVisible"
            title="Nội dung SMS"
            :footer="false"
        >
            <p v-if="smsContent">
                {{ smsContent }}
            </p>
            <a-empty v-else />
        </a-modal>
        <TopUpLogsDialog ref="topUpLogsDialog" />
    </div>
</template>

<script>
    import _cloneDeep from 'lodash/cloneDeep';
    import _get from 'lodash/get';
    import { mapState } from 'vuex';
    import dateFormat from '@/plugins/filters/dateFormat';
    import { TOP_UP_TRANSFER_STATUS } from '@/constants/topUp/transferStatus';
    import { TOP_UP_CALLBACK_STATUS } from '@/constants/topUp/callbackStatus';
    import TopUpLogsDialog from '@/components/topUps/dialogs/Logs.vue';

    export default {
        components: {
            TopUpLogsDialog,
        },

        props: {
            topUps: {
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
                smsContentVisible: false,
                smsContent: null,
                TOP_UP_CALLBACK_STATUS,
                TOP_UP_TRANSFER_STATUS,
            };
        },

        computed: {
            ...mapState(['isMobile']),
        },

        watch: {
            topUps() {
                this.data = _cloneDeep(this.topUps);
            },
        },

        mounted() {
            this.data = _cloneDeep(this.topUps);
        },

        methods: {
            _get,
            dateFormat,

            showSMSMessage(topUp) {
                this.smsContent = topUp.SmsTopup?.content;
                this.smsContentVisible = true;
            },

            getIndex(text, record, index) {
                return (parseInt(+this.pagination.page, 10) - 1) * this.pagination.pageSize + index + 1;
            },

            getProcessTime(topUp) {
                return new Date(topUp.updatedAt).getTime() - (new Date(topUp.createdAt).getTime());
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
                        await this.$api.topUps.update(record.id, {
                            [key]: _get(record, key),
                        });
                        record.editing[key] = false;
                        this.$emit('editing', false);
                        this.$forceUpdate();
                        this.$message.success('Sửa thành công');
                        this.$store.commit('SET_AUTO_FETCH', true);
                    } else {
                        this.$message.warning('Nickname không được để trống');
                    }
                } catch (error) {
                    this.$handleError(error);
                } finally {
                    record.loading[key] = false;
                }
            },

            handleCancelUpdate(key, record) {
                record.editing[key] = false;
                const index = this.topUps.findIndex((topUp) => topUp.id === record.id);
                this.data[index] = _cloneDeep(this.topUps[index]);
                this.$store.commit('SET_AUTO_FETCH', true);
                this.$forceUpdate();
                this.$emit('editing', false);
            },

            handleFilter(key, value) {
                this.$router.push({
                    query: {
                        ...this.$route.query,
                        [key]: value,
                        page: 1,
                    },
                });
            },

            handleChange(sorter) {
                const query = {
                    ...this.$route.query,
                    orderBy: sorter.order ? sorter.columnKey : undefined,
                };
                switch (sorter.order) {
                    case 'ascend':
                        query.sort = 'ASC';
                        break;
                    case 'descend':
                        query.sort = 'DESC';
                        break;
                    default:
                        query.sort = undefined;
                }
                this.$router.push({
                    path: this.$route.path,
                    query,
                });
            },

            async reCallback(topUp) {
                try {
                    await this.$api.topUps.callback(topUp.id);
                    this.$message.success('ReCall thành công');
                    await this.$nuxt.refresh();
                } catch (error) {
                    this.$handleError(error);
                }
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
