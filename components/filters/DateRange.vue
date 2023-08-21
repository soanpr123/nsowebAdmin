<template>
    <div>
        <div v-if="label" class="text-gray-80">
            {{ label }}
        </div>
        <div>
            <a-range-picker
                v-model="selectedValue"
                class="!w-full max-w-full"
                :allow-clear="allowClear"
                :show-time="{ format: 'HH:mm' }"
                :ranges="presetRanges"
                :disabled-date="isFutureDay ? disabledDate : () => false"
                :placeholder="['Từ ngày', 'Đến ngày']"
                :size="size"
                :default-value="defaultValue"
                format="DD/MM/YYYY"
                :value-format="valueFormat"
                @change="onFilter"
                @ok="onFilter"
            >
                <a-icon slot="suffixIcon" type="calendar" />
            </a-range-picker>
        </div>
    </div>
</template>

<script>
    import moment from 'moment';
    import _assign from 'lodash/assign';
    import _omit from 'lodash/omit';
    import _split from 'lodash/split';

    export default {
        model: {
            prop: 'value',
        },

        props: {
            query: String,
            label: String,
            allowClear: {
                type: Boolean,
                default: true,
            },
            customHandler: {
                type: Boolean,
                default: false,
            },
            size: {
                type: String,
                default: 'default',
            },
            separator: {
                type: [String, Boolean],
                default: '##TO##',
            },
            prefix: {
                type: String,
                default: 'from',
            },
            suffix: {
                type: String,
                default: 'to',
            },
            value: {
                type: Array,
                default: () => [],
            },
            defaultValue: {
                type: Array,
                default: () => [],
            },
            isFutureDay: {
                type: Boolean,
                default: false,
            },
            valueFormat: {
                type: String,
                default: 'x',
            },
        },

        data() {
            let selectedValue = '';
            if (this.separator) {
                selectedValue = this.$route.query[this.query] ? _split(this.$route.query[this.query], this.separator, 2) : this.defaultValue;
            } else {
                selectedValue = [
                    this.$route.query[`${this.prefix}${this.query}`],
                    this.$route.query[`${this.suffix}${this.query}`],
                ] || this.defaultValue;
            }

            return {
                selectedValue,
            };
        },

        computed: {
            presetRanges() {
                return {
                    'Hôm nay': [moment().startOf('day'), moment().endOf('day')],
                    'Tuần này': [moment().startOf('isoWeek'), moment().endOf('isoWeek')],
                    'Tháng này': [moment().startOf('month'), moment().endOf('month')],
                    'Năm này': [moment().startOf('year'), moment().endOf('year')],
                };
            },
        },

        watch: {
            '$route.query': {
                handler(query) {
                    let dates = [];
                    if (this.separator) {
                        dates = _split(query[this.query], this.separator, 2);
                    } else {
                        dates = [
                            this.$route.query[`${this.prefix}${this.query}`],
                            this.$route.query[`${this.suffix}${this.query}`],
                        ] || [];
                    }
                    if (!dates[0] && !dates[1]) {
                        dates = [];
                    }
                    this.$emit('input', dates);
                    this.selectedValue = dates;
                },
                deep: true,
                immediate: true,
            },

            value(data) {
                this.selectedValue = data;
            },
        },

        methods: {
            onFilter(dates) {
                if (!dates?.[0] || !dates?.[1]) {
                    this.clear();
                } else {
                    const from = moment(dates[0], this.valueFormat)?.format('x');
                    const to = moment(dates[1], this.valueFormat)?.format('x');

                    if (this.customHandler) {
                        this.$emit('onChange', { from, to });
                    } else {
                        const query = this.separator
                            ? {
                                [this.query]: `${from}${this.separator}${to}`,
                            }
                            : {
                                [`${this.prefix}${this.query}`]: from,
                                [`${this.suffix}${this.query}`]: to,
                            };

                        this.$router.push({
                            query: _assign({}, this.$route.query, query),
                        });
                    }
                }
            },

            disabledDate(current) {
                // Can not select days before today and today
                return current && current < moment().endOf('day');
            },

            // disabledRangeTime(_, type) {
            //     if (type === 'start') {
            //         return {
            //             disabledHours: () => this.range(0, 60).splice(4, 20),
            //             disabledMinutes: () => this.range(30, 60),
            //             disabledSeconds: () => [55, 56],
            //         };
            //     }
            //     return {
            //         disabledHours: () => this.range(0, 60).splice(20, 4),
            //         disabledMinutes: () => this.range(0, 31),
            //         disabledSeconds: () => [55, 56],
            //     };
            // },

            clear() {
                this.$router.push({
                    query: _assign({}, _omit(this.$route.query, this.separator ? [this.query] : [`${this.prefix}${this.query}`, `${this.suffix}${this.query}`]), {
                        page: 1,
                    }),
                });
            },
        },
    };
</script>
