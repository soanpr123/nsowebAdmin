<template>
    <div>
        <div v-if="label" class="text-gray-80">
            {{ label }}
        </div>
        <div>
            <a-date-picker
                v-model="selectedValue"
                class="w-full"
                :allow-clear="allowClear"
                :disabled="disabled"
                :placeholder="placeholder"
                :size="size"
                :default-value="defaultValue"
                :format="format"
                :value-format="valueFormat"
                :disabled-date="disabledDate"
                @change="onChange"
            >
                <a-icon slot="suffixIcon" type="calendar" />
            </a-date-picker>
        </div>
    </div>
</template>

<script>
    import moment from 'moment';
    import _assign from 'lodash/assign';
    import _omit from 'lodash/omit';

    export default {
        model: {
            prop: 'value',
            event: 'input.value',
        },

        props: {
            query: String,
            label: String,
            disabledDate: Function,
            router: {
                type: Boolean,
                default: true,
            },
            allowClear: {
                type: Boolean,
                default: true,
            },
            disabled: {
                type: Boolean,
                default: false,
            },
            placeholder: {
                type: String,
                default: 'Nhập nội dung',
            },
            customHandler: {
                type: Boolean,
                default: false,
            },
            size: {
                type: String,
                default: 'default',
            },
            value: {
                type: [Number, String],
                default: null,
            },
            defaultValue: {
                type: Array,
                default: undefined,
            },
            format: {
                type: String,
                default: 'DD/MM/YYYY',
            },
            valueFormat: {
                type: String,
                default: 'x',
            },
            startOf: {
                type: String,
                default: 'day',
            },
        },

        data() {
            return {
                selectedValue: this.router ? this.$route.query[this.query] : this.defaultValue || (this.value ? `${this.value}` : undefined),
            };
        },

        computed: {
            presetRanges() {
                return {
                    'Hôm nay': [moment(), moment()],
                    'Tuần này': [moment().startOf('isoWeek'), moment().endOf('isoWeek')],
                    'Tháng này': [moment().startOf('month'), moment().endOf('month')],
                    'Năm này': [moment().startOf('year'), moment().endOf('year')],
                };
            },
        },

        watch: {
            '$route.query': {
                handler(query) {
                    if (this.router) {
                        this.$emit('input', query[this.query]);
                        this.selectedValue = query[this.query];
                    }
                },
                deep: true,
                immediate: true,
            },

            value(data) {
                this.selectedValue = data ? `${data}` : undefined;
            },
        },

        methods: {
            onChange(date) {
                if (!date) {
                    this.clear();
                } else if (this.startOf) {
                    date = moment(date, 'x')?.startOf(this.startOf).format('x');
                }
                this.$emit('input.value', date);
                this.$emit('change', date);

                if (!this.customHandler && this.router) {
                    this.$router.push({
                        query: _assign({}, this.$route.query, {
                            [this.query]: date,
                        }),
                    });
                }
            },

            clear() {
                if (this.router) {
                    this.$router.push({
                        query: _assign({}, _omit(this.$route.query, [this.query]), {}),
                    });
                }
            },
        },
    };
</script>
