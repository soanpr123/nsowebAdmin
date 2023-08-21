<template>
    <div class="mt-4 flex flex-wrap md:flex-nowrap justify-center md:justify-between items-center gap-4">
        <div class="text-gray-80 italic">
            Hiển thị {{ length }} trong tổng số {{ pagination.total }} mục
        </div>
        <div class="flex gap-2 items-center">
            <a-select
                v-model="pagination.pageSize"
                size="small"
                class="min-w-[100px]"
                @change="handleChangePage($route.query.page || 1)"
            >
                <a-select-option v-for="_pageSize in [20, 50, 75, 100]" :key="_pageSize" :value="_pageSize">
                    {{ _pageSize }} / page
                </a-select-option>
            </a-select>
            <a-pagination
                v-if="pagination && pagination.total && pagination.pageSize"
                v-model.number="pagination.page"
                class="ct-pagination"
                :total="pagination.total"
                :page-size="pagination.pageSize"
                show-less-items
                @change="handleChangePage"
            />
        </div>
    </div>
</template>

<script>
    import _assign from 'lodash/assign';
    import _clondeDeep from 'lodash/cloneDeep';
    import _omit from 'lodash/omit';

    export default {
        props: {
            data: {
                type: Object,
                required: true,
            },
            length: {
                type: Number,
                required: true,
            },
            queryParam: {
                type: String,
                default: 'page',
            },
        },

        data() {
            return {
                pagination: _clondeDeep(this.data),
            };
        },

        watch: {
            data(value) {
                this.pagination = _clondeDeep(value);
            },
        },

        methods: {
            handleChangePage(page) {
                this.$router.push(this.to(page));
            },

            to(page) {
                const path = this.$route.path;

                const otherParams = _omit(this.$route.query, [this.queryParam]);
                const query = page !== 1
                    ? _assign({}, otherParams, { [this.queryParam]: page })
                    : otherParams;
                query.pageSize = this.pagination.pageSize === 20 ? undefined : this.pagination.pageSize;

                return { path, query };
            },
        },
    };
</script>

<style lang="scss">
.ant-pagination-item {
    &-link {
        i {
            top: -3px;
            @apply relative;
        }
    }
    &-active {
        a {
            color: white !important;
        }
    }
}
</style>
