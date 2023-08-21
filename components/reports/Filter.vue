<template>
    <div>
        <DateRangeFilter
            label="Khoảng ngày"
            class="!max-w-[300px]"
            start-of="day"
            placeholder="Khoảng ngày"
            :separator="false"
            :allow-clear="false"
            query="Date"
        />
    </div>
</template>

<script>
    import DateRangeFilter from '@/components/filters/DateRange.vue';

    export default {
        components: {
            DateRangeFilter,
        },
    };
</script>
