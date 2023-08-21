<template>
    <div class="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-5 2xl:grid-cols-6 gap-4 items-end">
        <DateRangeFilter
            class="col-span-2 sm:col-span-1"
            label="Khoảng ngày"
            start-of="day"
            placeholder="Khoảng ngày"
            :separator="false"
            query="Date"
            :allow-clear="false"
        />
        <SelectFilter
            class="col-span-2 sm:col-span-1"
            query="status"
            label="Trạng thái"
            placeholder="Tất cả"
            :options="SMS_WITHDRAW_STATUS_OPTIONS"
        />
        <SearchFilter
            query="searchContent"
            class="xl:max-w-[300px] !w-full"
            label="Tìm kiếm"
            placeholder="Nội dung từ ngân hàng"
        />
        <SearchFilter
            query="transferId"
            class="xl:max-w-[300px] !w-full"
            label="Mã giao dịch"
            placeholder="Nhập TransID"
        />
        <div class="grid grid-cols-1 lg:col-span-4 2xl:col-span-2 gap-4 whitespace-nowrap lg:grid-cols-2 mb-2">
            <div>
                Thành công: <span class="font-semibold text-green-100">{{ summary.sumSuccess | currencyFormat }}</span>
            </div>
            <div>
                Thất bại: <span class="font-semibold text-yellow-100">{{ summary.sumPendding | currencyFormat }}</span>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapState } from 'vuex';
    import { SMS_WITHDRAW_STATUS_OPTIONS } from '@/constants/sms/withdraw/status';
    import DateRangeFilter from '@/components/filters/DateRange.vue';
    import SearchFilter from '@/components/filters/Search.vue';
    import SelectFilter from '@/components/filters/Select.vue';

    export default {
        components: {
            DateRangeFilter,
            SearchFilter,
            SelectFilter,
        },

        data() {
            return {
                SMS_WITHDRAW_STATUS_OPTIONS,
            };
        },

        computed: {
            ...mapState('sms/withdraws', ['summary']),
        },

        methods: {
            empty() {
                this.$router.push('/withdraws');
                this.$forceUpdate();
            },
        },
    };
</script>
