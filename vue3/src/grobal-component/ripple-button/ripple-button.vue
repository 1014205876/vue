<template>
    <!-- <div
        class="btn"
        ref="btn"
        :class="{
        disabled:disabled,
        
        }"
        @click="getRipple1($event)"
    >-->
    <div
        class="btn"
        :class="{
            disabled:disabled,
            plain:plain,
            round:round,
        }"
        @click="getRipple2($event)"
    >123
        <span
            :class="{ripple_animation:span.has}"
            :style="{
                top:span.top,
                left:span.left,
                'animation-duration':span.time+'s',
            }"
        ></span>
    </div>
</template>

<script>
export default {
    name: "appRippleButton",
    props: {
        round: {
            type: Boolean,
            default: false
        },
        plain: {
            type: Boolean,
            default: false
        },
        disabled: {
            type: Boolean,
            default: false
        }
    },
    data: () => ({
        timerData: {
            //定时器统一声明，统一销毁
            interval: {},
            timeOut: {
                animation: null
            }
        },
        btn: {
            self: null
        },
        span: {
            self: null,
            has: false,
            top: 0,
            left: 0,
            time: 0.6
        }
    }),
    created() {},
    mounted() {
        //DOM完毕以后
        // this.btn.self = this.$refs.btn;
        console.log(this.round);
    },
    beforeDestroy() {
        for (let key in this.timerData.interval) {
            //销毁循环定时器
            clearInterval(this.timerData.interval[key]);
            this.timerData.interval[key] = null;
        }
        for (let key in this.timerData.timeOut) {
            //销毁延时定时器
            clearTimeout(this.timerData.timeOut[key]);
            this.timerData.timeOut[key] = null;
        }
    },
    methods: {
        getRipple1(e) {
            // let span = document.createElement("span");
            // span.style.top = e.offsetY + "px";
            // span.style.left = e.offsetX + "px";
            // span.classList.add("ripple_animation");
            // this.btn.self.appendChild(span);
            // setTimeout(() => {
            //     span.remove();
            // }, this.span.time * 1000);
        },
        getRipple2(e) {
            this.animationEnd();
            this.span.has = true;
            this.span.top = e.offsetY + "px";
            this.span.left = e.offsetX + "px";
            this.timerData.timeOut.animation = setTimeout(() => {
                this.animationEnd();
            }, this.span.time * 1000);
        },
        animationEnd() {
            clearInterval(this.timerData.timeOut.animation);
            this.span.has = false;
        }
    }
};
</script>

<style scoped lang="less">
@import url("./ripple-button.less");
</style>