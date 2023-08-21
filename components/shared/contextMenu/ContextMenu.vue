<template>
    <div
        v-show="isVisible"
        ref="popper"
        v-click-outside="close"
        class="context-menu"
        tabindex="-1"
        @contextmenu.capture.prevent
    >
        <ul>
            <slot :contextData="contextData" />
        </ul>
    </div>
</template>

<script>
    import Popper from 'popper.js';
    import ClickOutside from 'vue-click-outside';
    // @vue/component
    export default {
        directives: {
            ClickOutside,
        },
        props: {
            boundariesElement: {
                type: String,
                default: 'body',
            },
        },
        data() {
            return {
                opened: false,
                contextData: {},
            };
        },
        computed: {
            isVisible() {
                return this.opened;
            },
        },
        beforeDestroy() {
            if (this.popper !== undefined) {
                this.popper.destroy();
            }
        },
        methods: {
            open(evt, contextData) {
                evt.stopPropagation();
                this.opened = true;
                this.contextData = contextData;

                if (this.popper) {
                    this.popper.destroy();
                }

                this.popper = new Popper(this.referenceObject(evt), this.$refs.popper, {
                    placement: 'right-start',
                    modifiers: {
                        preventOverflow: {
                            boundariesElement: document.querySelector(this.boundariesElement),
                        },
                    },
                });

                // Recalculate position
                this.$nextTick(() => {
                    this.popper.scheduleUpdate();
                });
            },
            close() {
                this.opened = false;
                this.contextData = null;
            },
            isOpen() {
                return this.opened;
            },
            referenceObject(evt) {
                const left = evt.clientX;
                const top = evt.clientY;
                const right = left + 1;
                const bottom = top + 1;
                const clientWidth = 1;
                const clientHeight = 1;

                function getBoundingClientRect() {
                    return {
                        left,
                        top,
                        right,
                        bottom,
                    };
                }

                const obj = {
                    getBoundingClientRect,
                    clientWidth,
                    clientHeight,
                };
                return obj;
            },
        },
    };

</script>

<style lang="scss" scoped>

.context-menu {
    position: fixed;
    z-index: 999;
    overflow: hidden;
    background: #FFF;
    border-radius: 4px;
    box-shadow: 0 1px 4px 0 #eee;

    &:focus {
        outline: none;
    }

    ul {
      padding:0px;
      margin:0px;
    }
}

</style>
