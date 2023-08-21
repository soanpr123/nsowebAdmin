<template>
    <div class="grid grid-cols-2 lg:grid-cols-6 2xl:grid-cols-8 gap-4 items-end">
        <DateRangeFilter
            label="Khoảng ngày"
            class="col-span-2 md:col-span-1"
            start-of="day"
            placeholder="Khoảng ngày"
            :separator="false"
            query="Date"
        />
        <SelectFilter
            query="status"
            class="col-span-2 md:col-span-1"
            label="Trạng thái"
            placeholder="Tất cả"
            :options="TOP_UP_STATUS_OPTIONS"
        />
        <SearchFilter
            query="searchKey"
            class="col-span-2 md:col-span-1"
            label="Mã GD"
            placeholder="Nhập transID"
        />
        <SearchFilter
            query="searchKey"
            class="col-span-2 md:col-span-1"
            label="Mã yêu cầu"
            placeholder="Nhập requestID"
        />
        <SearchFilter
            query="searchKey"
            class="col-span-2 md:col-span-1"
            label="Nội dung"
            placeholder="Nhập nội dung"
        />
        <SearchFilter
            query="searchKey"
            class="col-span-2 md:col-span-1"
            label="NickName"
            placeholder="Nhập nickname"
        />
        <div class="grid grid-cols-2 gap-4 whitespace-nowrap col-span-2 mb-2">
            <div class="flex flex-col gap-1">
                <div class="flex items-center gap-2 flex-wrap">
                    Đã nhận: <span class="text-green-100">{{ 0 }} GD</span>
                </div>
                <span class="font-semibold text-green-100">{{ 0 | currencyFormat }}</span>
            </div>
            <div class="flex flex-col gap-1">
                <div class="flex items-center gap-2 flex-wrap">
                    Đang chờ: <span class="text-yellow-100">{{ 0 }} GD</span>
                </div>
                <span class="font-semibold text-yellow-100">{{ 0 | currencyFormat }}</span>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapState } from 'vuex';
    import { TOP_UP_STATUS_OPTIONS } from '@/constants/topUp/status';
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
                TOP_UP_STATUS_OPTIONS,
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
