<template>
    <div class="heike">
        <div class="canvas" :style="{width:canvas.width+'px',height:canvas.height+'px'}">
            <canvas id="canvas" ref="canvas" :width="canvas.width" :height="canvas.height"></canvas>
        </div>
        <!-- <div :style="{'font-size':fontSize+'px'}">{{word}}</div> -->
        <el-input-number v-model="canvas.width" label="画布宽"></el-input-number>
        <el-input-number v-model="canvas.height" label="画布高"></el-input-number>

        <el-input v-model="word" placeholder="请输入内容"></el-input>
        <el-button type="primary" @click="canvasInit()">重新生成</el-button>
    </div>
</template>

<script>
export default {
    name: "appHeike",
    data: () => ({
        timerData: {
            //定时器统一声明，统一销毁
            interval: {
                fall: null
            },
            timeOut: {}
        },
        canvas: {
            wrap: null,
            self: null,
            ctx: null,
            width: 600,
            height: 300
        },
        letterList: "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",
        word: "黑客帝国文字下落特效",
        words: [],
        fontSize: 30,
        margin: 0
    }),
    created() {},
    mounted() {
        this.canvasInit();
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
        canvasInit() {
            this.canvas.wrap = document.querySelector(".canvas");
            this.canvas.width = this.canvas.wrap.clientWidth;
            this.canvas.height = this.canvas.wrap.clientHeight;
            this.canvas.self = document.querySelector("#canvas");
            this.canvas.ctx = this.canvas.self.getContext("2d");
            this.canvas.ctx.fillStyle = this.randomColor(0, 255, 1);

            let wordArr;
            if (this.word) {
                wordArr = this.word.split("");
                this.words = this.word.split("").map(item => {
                    return {
                        text: item,
                        top:
                            this.fontSize *
                            this.randomNum(1, wordArr.length / 2)
                    };
                });
            } else {
                wordArr = Array(
                    Math.floor(
                        this.canvas.width / (this.fontSize + this.margin)
                    )
                )
                    .join("1")
                    .split("");
                this.words = wordArr.map(item => {
                    return {
                        text: this.letterList[
                            this.randomNum(0, this.letterList.length)
                        ],
                        top:
                            this.fontSize *
                            this.randomNum(1, wordArr.length / 2)
                    };
                });
            }

            clearInterval(this.timerData.interval.fall);
            this.timerData.interval.fall = setInterval(() => {
                this.canvasDram();
            }, 100);
        },

        canvasDram() {
            this.canvas.ctx.font = this.fontSize + "px MicrosoftYaHei";
            this.canvas.ctx.fillStyle = "rgba(0,0,0,0.25)";
            this.canvas.ctx.fillRect(
                0,
                0,
                this.canvas.width,
                this.canvas.height
            );
            this.canvas.ctx.fillStyle = this.randomColor(0, 255, 1);
            this.words.map((item, index) => {
                this.canvas.ctx.fillText(
                    item.text,
                    index * (this.fontSize - 0 + this.margin),
                    item.top
                );
                this.words[index].top =
                    item.top > this.canvas.height
                        ? this.fontSize
                        : item.top + this.fontSize;
            });
        },

        randomColor(min, max, a) {
            //生成随机色 rgb
            var r = this.randomNum(min, max);
            var g = this.randomNum(min, max);
            var b = this.randomNum(min, max);
            return "rgba(" + r + "," + g + "," + b + "," + a + ")";
        },

        randomNum(min, max) {
            //生成随机数
            return Math.floor(Math.random() * (max - min) + min);
        }
    }
};
</script>

<style scoped lang="less">
@import url("./heike.less");
</style>