<template>
    <div class="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-5 2xl:grid-cols-7 gap-4 items-end">
        <DateRangeFilter
            class="col-span-2 md:col-span-1"
            label="Khoảng ngày"
            start-of="day"
            :separator="false"
            placeholder="Khoảng ngày"
            query="Date"
        />
        <SelectFilter
            class="col-span-2 md:col-span-1"
            query="status"
            label="Trạng thái duyệt"
            placeholder="Tất cả"
            :options="WITHDRAW_STATUS_OPTIONS"
        />
        <SelectFilter
            class="col-span-2 md:col-span-1"
            query="statusTransfer"
            label="Trạng thái chuyển"
            placeholder="Tất cả"
            :options="WITHDRAW_TRANSFER_STATUS_OPTIONS"
        />
        <div class="col-span-2">
            <SearchFilter
                query="orderId"
                class="xl:max-w-[300px] !w-full"
                label="Tìm kiếm"
                placeholder="Nhập stk, mã giao dịch, tên nhân vật"
            />
        </div>
        <div class="grid grid-cols-3 gap-4 whitespace-nowrap col-span-2 mb-2">
            <div class="flex flex-col gap-1">
                <div class="flex items-center gap-2 flex-wrap">
                    Đã duyệt: <span class="text-green-100">{{ 0 }} GD</span>
                </div>
                <span class="font-semibold text-green-100">{{ 0 | currencyFormat }}</span>
            </div>
            <div class="flex flex-col gap-1">
                <div class="flex items-center gap-2 flex-wrap">
                    Chờ duyệt: <span class="text-yellow-100">{{ 0 }} GD</span>
                </div>
                <span class="font-semibold text-yellow-100">{{ 0 | currencyFormat }}</span>
            </div>
            <div class="flex flex-col gap-1">
                <div class="flex items-center gap-2 flex-wrap">
                    Từ chối: <span class="text-red-100">{{ 0 }} GD</span>
                </div>
                <span class="font-semibold text-red-100">{{ 0 | currencyFormat }}</span>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapState } from 'vuex';
    import { WITHDRAW_STATUS_OPTIONS } from '@/constants/withdraw/status';
    import { WITHDRAW_TRANSFER_STATUS_OPTIONS } from '@/constants/withdraw/transferStatus';
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
                WITHDRAW_STATUS_OPTIONS,
                WITHDRAW_TRANSFER_STATUS_OPTIONS,
            };
        },

        computed: {
            ...mapState('withdraws', ['summary']),
        },

        methods: {
            empty() {
                this.$router.push('/withdraws');
                this.$forceUpdate();
            },
        },
    };
</script>
