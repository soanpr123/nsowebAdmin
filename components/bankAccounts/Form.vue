<template>
    <a-form-model
        ref="form"
        :model="form"
        :rules="rules"
        layout="vertical"
        :colon="false"
    >
        <div class="grid grid-cols-1 md:grid-cols-2 gap-x-4">
            <a-form-model-item label="Ngân hàng" prop="bankId">
                <SelectRemote
                    v-model="form.bankId"
                    fetch-url="banks/fetchAll"
                    option-label="bankFullName"
                    option-value="id"
                    store="banks"
                    store-prop="banks"
                    placeholder="Ngân hàng"
                />
            </a-form-model-item>
            <a-form-model-item label="Chi nhánh" prop="bankBranchName">
                <a-input v-model="form.bankBranchName" placeholder="Chi nhánh" />
            </a-form-model-item>
            <a-form-model-item label="Số tài khoản" prop="bankAccNumber">
                <a-input v-model="form.bankAccNumber" placeholder="Số tài khoản" />
            </a-form-model-item>
            <a-form-model-item label="Tên tài khoản" prop="bankAccName">
                <a-input v-model="form.bankAccName" placeholder="Tên tài khoản" />
            </a-form-model-item>
            <a-form-model-item class="col-span-2" label="Số dư" prop="bankAccBalance">
                <ct-currency-input v-model="form.bankAccBalance" placeholder="Số dư" />
            </a-form-model-item>
            <a-form-model-item label="Trạng thái" prop="status">
                <a-switch :default-checked="form.status === BANK_ACCOUNT_STATUS.ACTIVE" @change="onStatusChange" />
            </a-form-model-item>
            <a-form-model-item label="Loại" prop="type">
                <a-radio-group v-model="form.type">
                    <a-radio v-for="bankType in BANK_ACCOUNT_TYPE_OPTIONS" :key="bankType.value" :value="bankType.value">
                        {{ bankType.label }}
                    </a-radio>
                </a-radio-group>
            </a-form-model-item>
            <a-form-model-item class="col-span-2" label="Callback sang đối tác" prop="callBackUrl">
                <a-input v-model="form.callBackUrl" placeholder="Callback sang đối tác" />
            </a-form-model-item>
            <a-form-model-item
                v-show="form.type === BANK_ACCOUNT_TYPE.TOP_UP"
                class="col-span-2"
                label="Ngưỡng tự động rút"
                prop="topupCashoutMax"
            >
                <a-input v-model="form.topupCashoutMax" placeholder="Nhập số tiền" />
            </a-form-model-item>
            <a-form-model-item class="col-span-2" prop="regexTopupPartnerRef">
                <div slot="label" class="flex items-center gap-2">
                    <span>Regex SMS</span>
                    <a-button size="small" class="!text-prim-90" @click="regexVisible = !regexVisible">
                        <i v-if="regexVisible" class="fas fa-eye" />
                        <i v-else class="fas fa-eye-slash" />
                    </a-button>
                </div>
                <a-input
                    v-show="regexVisible && form.type === BANK_ACCOUNT_TYPE.TOP_UP"
                    v-model="form.regexTopupPartnerRef"
                    type="textarea"
                    :rows="2"
                    placeholder="Regex SMS"
                />
                <a-input
                    v-show="regexVisible && form.type === BANK_ACCOUNT_TYPE.WITHDRAW"
                    v-model="form.regexWithdrawTransId"
                    type="textarea"
                    :rows="2"
                    placeholder="Regex SMS"
                />
            </a-form-model-item>
            <a-form-model-item
                v-show="regexVisible"
                class="col-span-2"
                label="Thứ tự kết quả"
                prop="regexTopupPartnerRefIndex"
            >
                <a-input v-show="form.type === BANK_ACCOUNT_TYPE.TOP_UP" v-model="form.regexTopupPartnerRefIndex" placeholder="Thứ tự kết quả" />
                <a-input v-show="form.type === BANK_ACCOUNT_TYPE.WITHDRAW" v-model="form.regexWithdrawTransIdIndex" placeholder="Thứ tự kết quả" />
            </a-form-model-item>
        </div>
    </a-form-model>
</template>

<script>
    import _cloneDeep from 'lodash/cloneDeep';
    import _pick from 'lodash/pick';
    import { BANK_ACCOUNT_STATUS } from '@/constants/bankAccount/status';
    import { BANK_ACCOUNT_TYPE, BANK_ACCOUNT_TYPE_OPTIONS } from '@/constants/bankAccount/type';
    import SelectRemote from '@/components/filters/SelectRemote.vue';

    const defaultForm = {
        bankAccNumber: '',
        bankAccName: '',
        bankAccBalance: 0,
        bankBranchName: '',
        bankId: undefined,
        callBackUrl: '',
        regexTopupPartnerRef: '',
        regexTopupPartnerRefIndex: '',
        regexWithdrawTransId: '',
        regexWithdrawTransIdIndex: '',
        topupCashoutMax: '',
        status: BANK_ACCOUNT_STATUS.ACTIVE,
        type: BANK_ACCOUNT_TYPE.TOP_UP,
    };

    export default {
        components: {
            SelectRemote,
        },

        props: {
            bankAccount: Object,
        },

        data() {
            return {
                BANK_ACCOUNT_TYPE,
                BANK_ACCOUNT_STATUS,
                BANK_ACCOUNT_TYPE_OPTIONS,
                regexVisible: false,
                form: this.bankAccount
                    ? _cloneDeep(_pick(this.bankAccount, Object.keys(defaultForm)))
                    : _cloneDeep(defaultForm),
                rules: {
                },
            };
        },

        methods: {
            onStatusChange(checked) {
                this.form.status = checked ? BANK_ACCOUNT_STATUS.ACTIVE : BANK_ACCOUNT_STATUS.INACTIVE;
            },

            submit() {
                this.$refs.form.validate((valid) => {
                    if (valid) {
                        if (this.bankAccount) {
                            const before = _cloneDeep(_pick(this.bankAccount, Object.keys(defaultForm)));
                            const keys = Object.keys(before).filter((key) => before[key] !== this.form[key]);
                            this.$emit('submit', _pick(this.form, keys));
                        } else {
                            this.$emit('submit', this.form);
                        }
                    }
                });
            },
        },
    };
</script>
