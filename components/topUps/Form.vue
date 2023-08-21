<template>
    <a-form-model
        ref="form"
        :model="form"
        :rules="rules"
        layout="vertical"
        :colon="false"
    >
        <div class="grid grid-cols-1 md:grid-cols-2 gap-x-4">
            <a-form-model-item class="col-span-2" label="Ngân hàng" prop="accBankID">
                <SelectRemote
                    v-model="form.accBankID"
                    fetch-url="bankAccounts/fetchAll"
                    option-label="bankAccName"
                    option-value="id"
                    store="bankAccounts"
                    store-prop="bankAccounts"
                    placeholder="Chọn ngân hàng"
                    :search-params="{
                        type: 'topup',
                    }"
                >
                    &nbsp;
                    <template slot-scope="item">
                        {{ item.bankBranchName }} - {{ item.bankAccName }}
                    </template>
                </SelectRemote>
            </a-form-model-item>
            <a-form-model-item label="Nickname" prop="partnerReference">
                <a-input v-model="form.partnerReference" placeholder="Nhập nickname" />
            </a-form-model-item>
            <a-form-model-item label="Số tiền" prop="requestAmount">
                <ct-currency-input v-model="form.requestAmount" placeholder="Số tiền rút" />
            </a-form-model-item>
        </div>
    </a-form-model>
</template>

<script>
    import _cloneDeep from 'lodash/cloneDeep';
    import _pick from 'lodash/pick';
    import { BANK_ACCOUNT_STATUS } from '@/constants/bankAccount/status';
    import SelectRemote from '@/components/filters/SelectRemote.vue';

    const defaultForm = {
        partnerReference: '',
        requestAmount: undefined,
        accBankID: undefined,
    };

    export default {
        components: {
            SelectRemote,
        },

        props: {
            topUp: Object,
        },

        data() {
            return {
                BANK_ACCOUNT_STATUS,
                form: this.topUp
                    ? _cloneDeep(_pick(this.topUp, Object.keys(defaultForm)))
                    : _cloneDeep(defaultForm),
                rules: {
                    partnerReference: [
                        { required: true, message: 'Vui lòng nhập nickname', trigger: 'blur' },
                    ],
                    requestAmount: [
                        { required: true, message: 'Vui lòng nhập số tiền', trigger: 'blur' },
                    ],
                    accBankID: [
                        { required: true, message: 'Vui lòng chọn ngân hàng', trigger: 'blur' },
                    ],
                },
            };
        },

        methods: {
            submit() {
                this.$refs.form.validate((valid) => {
                    if (valid) {
                        this.$emit('submit', this.form);
                    }
                });
            },
        },
    };
</script>
