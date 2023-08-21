<template>
    <a-modal
        v-model="visible"
        destroy-on-close
        :width="1200"
        :title="`Log ${topUp.transferId}`"
        :footer="false"
    >
        <a-table
            :data-source="logs"
            :loading="loading"
            :scroll="{ x: 500 }"
            :pagination="false"
        >
            <a-table-column
                key="index"
                title="STT"
                :width="60"
                :custom-render="(text, record, index) => index + 1"
            />
            <a-table-column
                key="time"
                title="TIME"
                data-index="time"
                :width="140"
            >
                <template #default="time">
                    {{ time | dateFormat('dd/MM/yyyy HH:mm:ss') }}
                </template>
            </a-table-column>
            <a-table-column
                key="action"
                title="ACTION"
                data-index="action"
                :width="100"
            />
            <a-table-column
                key="admin"
                title="ĐỐI TƯỢNG"
                :width="120"
            >
                <template #default="record">
                    {{ record.admin }}
                </template>
            </a-table-column>'
            <a-table-column
                key="note.before"
                title="NỘI DUNG"
                data-index="note"
                :width="250"
            >
                <template #default="note">
                    <template v-if="typeof _get(note, 'before') === 'object'">
                        <div v-for="(content, index) in note.before" :key="index" v-html="content" />
                    </template>
                    <template v-else>
                        {{ _get(note, 'before') }}
                    </template>
                </template>
            </a-table-column>
            <a-table-column
                key="note.after"
                title="KẾT QUẢ"
                data-index="note"
                :width="300"
            >
                <template #default="note">
                    <template v-if="typeof _get(note, 'after') === 'object'">
                        <div v-for="(content, index) in note.after" :key="index" v-html="content" />
                    </template>
                    <template v-else>
                        {{ _get(note, 'after') }}
                    </template>
                </template>
            </a-table-column>
            <a-table-column
                key="adminIp"
                title="IP"
                data-index="adminIp"
                :width="120"
            >
                <template #default="adminIp">
                    <a :href="`https://whatismyipaddress.com/ip/${adminIp}`" class="!text-prim-90 hover:underline" target="_blank">{{ adminIp }}</a>
                </template>
            </a-table-column>
        </a-table>
    </a-modal>
</template>

<script>
    import _get from 'lodash/get';
    import { mapDataFromOptions } from '@/utils/data';
    import { TOP_UP_CALLBACK_STATUS_OPTIONS } from '@/constants/topUp/callbackStatus';

    export default {
        data() {
            return {
                visible: false,
                loading: false,
                topUp: {},
                logs: [],
            };
        },

        computed: {
            systemLogTypes() {
                return {
                    created: 'Create',
                    update: 'Update',
                };
            },

            topUpKeyLabels() {
                return {
                    note: 'Note',
                    partnerReference: 'Nickname',
                    status: 'Trạng thái',
                    statusCallback: 'Trạng thái Callback',
                };
            },

            CALLBACK_STATUS_OPTIONS() {
                return mapDataFromOptions(TOP_UP_CALLBACK_STATUS_OPTIONS);
            },
        },

        methods: {
            _get,

            async open(topUp) {
                this.topUp = topUp;
                this.note = '';
                this.visible = true;
                this.logs = [];
                await this.fetchData();
            },

            async fetchData() {
                try {
                    this.loading = true;
                    const { data: systemLogs } = await this.$api.logs.getSystemLogs({
                        targetId: this.topUp.requestId,
                        type: 'requestTopup',
                    });
                    const { data: callbackLogs } = await this.$api.logs.getCallbackLogs({
                        transferId: this.topUp.requestId,
                    });

                    systemLogs.forEach((systemLog) => {
                        const message = JSON.parse(systemLog.message) || {};
                        this.logs.push({
                            action: this.systemLogTypes[systemLog.type],
                            admin: systemLog.UserId === -1 ? 'System' : systemLog?.User?.username,
                            adminIp: message?.clientIp,
                            note: this.getSystemLogNote(systemLog),
                            time: systemLog.createdAt,
                        });
                    });

                    callbackLogs.forEach((callbackLog) => {
                        const payload = JSON.parse(callbackLog.payload);
                        this.logs.push({
                            action: 'Callback',
                            admin: 'System',
                            note: {
                                before: payload?.data?.partnerReference,
                                after: `${callbackLog.message ? `${callbackLog.message}\n` : ''}${payload?.message !== 'success' ? `Message: ${payload.message}` : ''} \n${callbackLog.response}`,
                            },
                            time: callbackLog.createdAt,
                        });
                    });

                    this.logs = this.logs.sort((a, b) => (new Date(a.time)).getTime() - (new Date(b.time)).getTime());
                } catch (error) {
                    this.$handleError(error);
                } finally {
                    this.loading = false;
                }
            },

            getSystemLogNote(systemLog) {
                if (systemLog.type === 'update') {
                    const before = [];
                    const after = [];
                    const message = JSON.parse(systemLog.message) || {};
                    const keys = Object.keys(message.before).filter((key) => message.before[key] !== message.after[key] && key !== 'updatedAt');
                    keys.forEach((key) => {
                        if (key === 'statusTransfer') {
                            before.push(`${this.topUpKeyLabels[key]}: <span class="!px-2 !py-0.5 ant-tag ant-tag-${this.CALLBACK_STATUS_OPTIONS[message.before[key]]?.color}">${this.CALLBACK_STATUS_OPTIONS[message.before[key]]?.htmlLabel}</span>`);
                            after.push(`${this.topUpKeyLabels[key]}: <span class="!px-2 !py-0.5 ant-tag ant-tag-${this.CALLBACK_STATUS_OPTIONS[message.after[key]]?.color}">${this.CALLBACK_STATUS_OPTIONS[message.after[key]]?.htmlLabel}</span>`);
                        } else if (['partnerReference'].includes(key)) {
                            before.push(`${this.topUpKeyLabels[key]}: <span class="!text-prim-90">${message.before[key] || 'null'}</span>`);
                            after.push(`${this.topUpKeyLabels[key]}: <span class="!text-prim-90">${message.after[key]}</span>`);
                        }
                    });

                    return {
                        before,
                        after,
                    };
                }

                if (systemLog.type === 'created') {
                    return {
                        before: 'Tạo yêu cầu',
                        after: 'Tạo thành công',
                    };
                }
            },

            close() {
                this.visible = false;
            },
        },
    };
</script>
