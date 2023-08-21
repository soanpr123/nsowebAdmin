<template>
    <div class="grid grid-cols-2 lg:grid-cols-3 2xl:grid-cols-6 gap-4 items-end">
        <div class="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-4 col-span-2">
            <DateRangeFilter
                label="Khoảng ngày"
                class="col-span-1 2xl:col-span-2"
                start-of="day"
                placeholder="Khoảng ngày"
                :separator="false"
                :allow-clear="false"
                query="Date"
            />
            <SelectFilter
                query="statusCallback"
                label="Trạng thái"
                placeholder="Tất cả"
                :options="TOP_UP_CALLBACK_STATUS_OPTIONS"
            />
        </div>
        <SearchFilter
            query="transferId"
            class="col-span-2 md:col-span-1"
            label="Mã GD"
            placeholder="Nhập TransID"
        />
        <SearchFilter
            query="transferMessage"
            class="col-span-2 md:col-span-1"
            label="Nội dung"
            placeholder="Nhập nội dung"
        />
        <SearchFilter
            query="partnerReference"
            class="col-span-2 md:col-span-1"
            label="NickName"
            placeholder="Nhập nickname"
        />
        <div class="whitespace-nowrap col-span-1 lg:col-span-1 2xl:col-span-1 mb-2">
            <div class="flex flex-col gap-1">
                <div class="flex items-center gap-2 flex-wrap">
                    Đã nhận: <span class="text-green-100">{{ summary.countSuccess }} GD</span>
                </div>
                <span class="font-semibold text-green-100">{{ summary.sumSuccess | currencyFormat }}</span>
            </div>
            <!-- <div class="flex flex-col gap-1">
                <div class="flex items-center gap-2 flex-wrap">
                    Đang chờ: <span class="text-yellow-100">{{ summary.countPendding }} GD</span>
                </div>
                <span class="font-semibold text-yellow-100">{{ summary.sumPendding | currencyFormat }}</span>
            </div> -->
        </div>
    </div>
</template>

<script>
    import { mapState } from 'vuex';
    import { TOP_UP_CALLBACK_STATUS_OPTIONS } from '@/constants/topUp/callbackStatus';
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
                TOP_UP_CALLBACK_STATUS_OPTIONS,
            };
        },

        computed: {
            ...mapState('topUps', ['summary']),
        },

        methods: {
            empty() {
                this.$router.push('/topUps');
                this.$forceUpdate();
            },
        },
    };
</script>
