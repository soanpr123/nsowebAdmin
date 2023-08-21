<template>
    <a-modal
        class="print-dialog"
        :visible="visible"
        :width="width"
        :mask-closable="false"
        destroy-on-close
        :title="title"
        @cancel="$emit('close')"
    >
        <div id="print-zone">
            <div class="print-dialog print:h-full">
                <div class="grid grid-cols-3 gap-4 items-center">
                    <div class="space-y-4">
                        <div>
                            <div class="text-gray-60">
                                Địa chỉ
                            </div>
                            <div class="text-gray-100 font-semibold">
                                {{ hotel.address }}, {{ _get(hotel, 'ward.name') }}, {{ _get(hotel, 'district.name') }}, {{ _get(hotel, 'province.name') }}
                            </div>
                        </div>
                        <div class="flex gap-4">
                            <div>
                                <div class="text-gray-60">
                                    Số điện thoại:
                                </div>
                                <div class="text-gray-100 font-semibold">
                                    {{ hotel.phone | phoneFormat }}
                                </div>
                            </div>
                            <div>
                                <div class="text-gray-60">
                                    Email:
                                </div>
                                <div class="text-gray-100 font-semibold">
                                    {{ hotel.email }}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <img src="/images/logo-2.png" class="mx-auto min-w-[150px] w-2/3 max-w-[300px]">
                    </div>
                    <div class="text-right space-y-4">
                        <div>
                            <div class="text-gray-60">
                                {{ subText }}
                            </div>
                            <div class="text-gray-100 font-semibold">
                                {{ subTextValue }}
                            </div>
                        </div>
                        <div>
                            <div class="text-gray-60">
                                Print date:
                            </div>
                            <div class="text-gray-100 font-semibold">
                                {{ new Date() | dateFormat('dd/MM/yyyy HH:mm:ss') }}
                            </div>
                        </div>
                    </div>
                </div>
                <div class="my-4 !text-3xl text-prim-100 font-semibold text-center">
                    {{ title }}
                </div>
                <div class="mt-6">
                    <slot />
                </div>
            </div>
        </div>
        <div slot="footer" class="flex justify-center items-center gap-2">
            <a-button class="w-28" @click="$emit('close')">
                Hủy bỏ
            </a-button>
            <a-button
                :loading="loading"
                class="w-28"
                type="primary"
                @click="print"
            >
                {{ printBtnText }}
            </a-button>
        </div>
    </a-modal>
</template>

<script>
    import _get from 'lodash/get';
    import dateFormat from '@/plugins/filters/dateFormat';

    export default {
        props: {
            title: String,
            visible: {
                type: Boolean,
                default: false,
            },
            width: {
                type: String,
                default: '950px',
            },
            loading: {
                type: Boolean,
                default: false,
            },
            printBtnText: {
                type: String,
                default: 'In phiếu',
            },
            subText: String,
            subTextValue: String,
        },

        async fetch() {
            const { data: hotel } = await this.$api.hotels.getDetail(this.$auth.user.hotels?.[0]?.id);

            this.hotel = hotel;
        },

        data() {
            return {
                hotel: {},
            };
        },

        computed: {
            authUserHotel() {
                return this.$auth.user.hotels?.[0] || {};
            },
        },

        methods: {
            _get,
            dateFormat,

            print() {
                // window.print();
                const innerHTML = document.getElementById('print-zone').innerHTML;
                const fileName = 'print.pdf';

                document.body.style.overflow = 'scroll';
                document.body.innerHTML = innerHTML;
                document.title = fileName;

                // const parents = [...document?.getElementsByClassName('input__question')];
                // parents.forEach((_parent, _parentIndex) => {
                //     const inputs = [..._parent.getElementsByTagName('input'), ..._parent.getElementsByTagName('textarea')];
                //     for (let i = 0; i < inputs.length; i += 1) {
                //         inputs[i].value = valueInputs[i + _parentIndex];
                //     }
                // });

                setTimeout(() => {
                    window.print();
                    window.location.reload();
                }, 1000);
            },
        },
    };
</script>
