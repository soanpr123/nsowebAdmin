<template>
    <a-input-number
        ref="input"
        v-model="inputValue"
        :size="size"
        :min="min"
        :max="max"
        :disabled="disabled"
        class="block !w-full"
        :formatter="formatter"
        :parser="parser"
        placeholder="Nhập nội dung"
        @change="handleChange"
    />
</template>

<script>
    export default {
        model: {
            prop: 'value',
        },

        props: {
            value: {
                type: Number,
                default: null,
            },
            size: String,
            min: {
                type: Number,
                default: 0,
            },
            max: {
                type: Number,
                default: undefined,
            },
            symbol: {
                type: String,
                default: '₫',
            },
            disabled: {
                type: Boolean,
                default: false,
            },
        },

        data() {
            return {
                inputValue: /^-?\d+$/.test(this.value) ? parseInt(this.value, 10) : this.value,
            };
        },

        watch: {
            value(data) {
                this.inputValue = data;
            },
        },

        methods: {
            handleChange(value) {
                const _value = typeof value === 'number' ? value : Number(value?.replace?.(/\D/g, ''));
                this.$emit('input', _value);
                this.$emit('change', _value);
            },

            formatter(value) {
                value = `${value}`;
                const decimal = value.includes('.') ? `.${value.split('.')?.at?.(-1)?.replace(/\D/g, '')}` : '';
                const number = value.split('.')?.[0];

                return `${`${number}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}${decimal}${this.symbol}`;
            },

            parser(value) {
                value = `${value}`.replaceAll(this.symbol, '').replaceAll(',', '');
                const decimal = value.includes('.') ? `.${value.split('.')?.at?.(-1)?.replace(/\D/g, '')}` : '';
                const number = value.split('.')?.[0];

                return `${number}${decimal}`;
            },
        },
    };
</script>
