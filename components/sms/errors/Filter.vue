<template>
    <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 items-end">
        <DateRangeFilter
            label="Khoảng ngày"
            start-of="day"
            placeholder="Khoảng ngày"
            :separator="false"
            query="Date"
            :allow-clear="false"
        />
        <SearchFilter
            query="searchContent"
            class="!w-full"
            label="Tìm kiếm"
            placeholder="Nhập nội dung"
        />
    </div>
</template>

<script>
    import DateRangeFilter from '@/components/filters/DateRange.vue';
    import SearchFilter from '@/components/filters/Search.vue';

    export default {
        components: {
            DateRangeFilter,
            SearchFilter,
        },
    };
</script>
