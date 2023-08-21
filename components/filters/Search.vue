<template>
    <div>
        <div v-if="label" class="text-gray-80">
            {{ label }}
        </div>
        <a-input-search
            v-model="keySearch"
            :placeholder="placeholder"
            class="search-filter"
            :size="size"
            :enter-button="false"
            :allow-clear="clearable"
            @keyup.native.enter="onSearch"
            @change="onSearch"
            @search="onSearch"
        />
    </div>
</template>

<script>
    import _assign from 'lodash/assign';
    import _map from 'lodash/map';
    import _omit from 'lodash/omit';
    import _debounce from 'lodash/debounce';

    export default {
        props: {
            label: String,
            value: String,
            icon: String,
            placeholder: {
                type: String,
                default: 'Tìm kiếm',
            },
            size: {
                type: String,
                default: 'default',
            },
            query: {
                type: String,
                default: 'freeWord',
            },
            clearable: {
                type: Boolean,
                default: true,
            },
            mode: {
                type: String,
                default: 'string',
            },
        },

        data() {
            return {
                searchDebounce: null,
                keySearch: this.$route.query[this.query] || this.value,
            };
        },

        watch: {
            '$route.query': {
                handler(query) {
                    this.keySearch = query[this.query];
                },
                deep: true,
                immediate: true,
            },
        },

        async mounted() {
            await this.onSearch();
        },

        methods: {
            async onSearch() {
                if (this.searchDebounce) {
                    await this.searchDebounce.cancel();
                }
                this.searchDebounce = _debounce(async () => {
                    if (this.mode === 'number' && !!this.keySearch) {
                        this.keySearch = this.keySearch.replace(/\D/g, '');
                    }
                    this.$emit('input', this.keySearch);
                    this.$emit('change', this.keySearch);
                    if (this.query && this.keySearch) {
                        this.$router.push({
                            query: _assign({}, _omit(this.$route.query, _map(this.options, 'value')), {
                                [this.query]: this.keySearch.trim(),
                                page: 1,
                            }),
                        });
                    }

                    if (!this.keySearch) {
                        this.$router.push({
                            query: _assign({}, _omit(this.$route.query, [this.query])),
                        });
                    }
                }, 200);
                await this.searchDebounce();
            },

            onChange() {
                if (!this.keySearch) {
                    this.$router.push({
                        query: _assign({}, _omit(this.$route.query, [this.query])),
                    });
                }
            },
        },
    };
</script>
