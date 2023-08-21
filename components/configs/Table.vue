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
            :custom-render="(text, record, index) => index + 1"
        />
        <a-table-column
            key="param"
            title="PARAM NAME"
            data-index="param"
            :width="250"
        />
        <a-table-column
            key="value"
            title="VALUE"
            :width="350"
        >
            <div slot="default" slot-scope="record" class="flex items-center gap-2">
                <template v-if="_get(record, 'editing.value') !== true">
                    <i v-if="record.editable && $auth.user.type === 'root'" class="far fa-edit cursor-pointer text-prim-90" @click="handleEdit('value', record)" />
                    <i v-else class="far fa-copy text-prim-90 cursor-pointer" @click="copyText(record.value)" />
                    <span v-if="record.currencyFormat">{{ record.value | currencyFormat }}</span>
                    <span v-else>{{ record.value }}</span>
                </template>
                <template v-else>
                    <a-input v-model="record.value" size="small" />
                    <i v-if="_get(record, 'loading.value')" class="fas fa-spinner animate-spin text-prim-90" />
                    <template v-else>
                        <i class="fas fa-check cursor-pointer text-prim-90" @click="handleUpdate('value', record)" />
                        <i class="fas fa-times cursor-pointer text-red-100" @click="handleCancelUpdate('value', record)" />
                    </template>
                </template>
            </div>
        </a-table-column>
        <a-table-column
            key="note"
            title="NOTE"
            data-index="note"
            :width="250"
        />
    </a-table>
</template>

<script>
    import _cloneDeep from 'lodash/cloneDeep';
    import _get from 'lodash/get';
    import _pick from 'lodash/pick';
    import { CONFIG_KEYS } from '@/constants/configs';

    export default {
        props: {
            configs: {
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
                CONFIG_KEYS,
            };
        },

        watch: {
            configs() {
                this.data = _cloneDeep(this.configs);
            },
        },

        mounted() {
            this.data = _cloneDeep(this.configs);
        },

        methods: {
            _get,

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

                    if ([CONFIG_KEYS.TOPUP_ALERT, CONFIG_KEYS.WITHDRAW_ALERT].includes(record.key) && (record?.value < 1 || record?.value > 10000000)) {
                        this.$message.warning('Chỉ được nhập số trong khoảng 1 - 10.000.000');
                    } else {
                        const data = {};
                        if (record.root) {
                            data[record.key] = _get(record, key);
                        } else {
                            data.settings = [];
                            data.settings.push({
                                ..._pick(record, ['createdAt', 'id', 'key', 'updatedAt', 'value']),
                                [key]: _get(record, key),
                            });
                        }
                        await this.$api.configs.update(data);
                        this.$message.success('Cập nhật thành công');
                        this.$store.commit('SET_AUTO_FETCH', true);

                        record.editing[key] = false;
                        this.$emit('editing', false);
                        this.$forceUpdate();
                    }
                } catch (error) {
                    this.$handleError(error);
                } finally {
                    record.loading[key] = false;
                }
            },

            handleCancelUpdate(key, record) {
                record.editing[key] = false;
                const index = this.configs.findIndex((setting) => setting.key === record.key);
                this.data[index] = _cloneDeep(this.configs[index]);
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
