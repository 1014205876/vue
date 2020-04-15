<template>
    <div class="xingkong">
        <el-form :inline="true">
            <el-form-item label="画布宽">
                <el-input-number v-model="canvas.width" label="画布宽"></el-input-number>
            </el-form-item>
            <el-form-item label="画布高">
                <el-input-number v-model="canvas.height" label="画布高"></el-input-number>
            </el-form-item>
            <el-form-item label="星星个数">
                <el-input-number v-model="starsNum" label="星星个数"></el-input-number>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="getStars()">重新生成</el-button>
            </el-form-item>
        </el-form>
        <div class="sky">
            <ul class="stars">
                <li v-for="(item,index) in starsList" :key="'1-'+index" :style="item.rotateZ">
                    <span :style="item.position"></span>
                </li>
            </ul>
        </div>
        <div class="canvas" :style="{width:canvas.width+'px',height:canvas.height+'px'}">
            <canvas id="sky" :width="canvas.width" :height="canvas.height"></canvas>
            <canvas id="stars" :width="canvas.width" :height="canvas.height"></canvas>
        </div>
    </div>
</template>

<script>
export default {
    name: "appXingkong",
    data: () => ({
        timerData: {
            //定时器统一声明，统一销毁
            interval: {
                canvasRotate: null
            },
            timeOut: {}
        },
        starsNum: 100,
        starsList: [],
        canvas: {
            wrap: null,
            sky: null,
            stars: null,
            skyCtx: null,
            starsCtx: null,
            width: 1000,
            height: 400,
            x: 4,
            y: 1
        },
        canvasStarsList: []
    }),
    created() {},
    mounted() {
        //DOM完毕以后
        this.canvas.wrap = document.querySelector(".canvas");
        this.canvas.width = this.canvas.wrap.clientWidth;
        this.canvas.height = this.canvas.wrap.clientHeight;
        this.getStars();
    },
    beforeDestroy() {
        //销毁之前
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
        // 标签实现
        getStars() {
            this.skyDivInit();
            this.skyCanvasInit();
            this.startsCanvasInit();
        },
        skyDivInit() {
            let maxTop = document.querySelector(".stars").clientHeight;
            let maxLeft = document.querySelector(".stars").clientWidth;

            for (let i = 0; i < this.starsNum; i++) {
                let top = this.randomNum(0, maxTop);
                let left = this.randomNum(0, maxLeft);
                this.starsList.push({
                    rotateZ: {
                        transform: `rotateZ(${this.randomNum(0, 360)}deg)`
                    },
                    position: {
                        top: top + "px",
                        left: left + "px"
                    }
                });
            }
        },
        // 画布实现
        skyCanvasInit() {
            this.canvas.sky = document.querySelector("#sky");
            this.canvas.skyCtx = this.canvas.sky.getContext("2d");
            let x = this.canvas.width / 2; // 第一个圆圆心的X坐标
            let y = this.canvas.height * -9; // 第一个圆圆心的Y坐标
            let r1 = this.canvas.height * 9; // 第1个圆的半径
            let r2 = this.canvas.height * 10; // 第2个圆的半径
            let radialGradient = this.canvas.skyCtx.createRadialGradient(
                x,
                y,
                r1,
                x,
                y,
                r2
            );
            radialGradient.addColorStop(0, "#1b2947");
            radialGradient.addColorStop(0.3, "#75517d");
            radialGradient.addColorStop(0.6, "#e96f92");
            radialGradient.addColorStop(1, "#f7f7b6");
            this.canvas.skyCtx.fillStyle = radialGradient;
            this.canvas.skyCtx.fillRect(
                0,
                0,
                this.canvas.width,
                this.canvas.height
            );
        },
        startsCanvasInit() {
            this.canvas.stars = document.querySelector("#stars");
            this.canvas.starsCtx = this.canvas.stars.getContext("2d");
            this.getcanvasStarsList();
        },

        getcanvasStarsList() {
            this.canvasStarsList.length = 0;
            for (let i = 0; i < this.starsNum; i++) {
                this.canvasStarsList.push({
                    color: this.randomColor(0, 255, 1),
                    x: this.randomNum(0, this.canvas.width),
                    y: this.randomNum(0, this.canvas.height)
                });
            }
            clearInterval(this.timerData.interval.canvasRotate);
            this.timerData.interval.canvasRotate = setInterval(() => {
                this.starsMove();
            }, 20);
        },

        starsMove() {
            this.canvas.starsCtx.clearRect(
                0,
                0,
                this.canvas.width,
                this.canvas.height
            );
            this.canvasStarsList.forEach(item => {
                this.canvas.starsCtx.fillStyle = item.color;
                this.canvas.starsCtx.beginPath();
                this.canvas.starsCtx.arc(item.x, item.y, 1, 0, 2 * Math.PI);
                this.canvas.starsCtx.fill();
                item.x = item.x + this.canvas.x;
                item.y = item.y + this.canvas.y;
                if (item.x >= this.canvas.width) {
                    item.x = 0;
                }
                if (item.y >= this.canvas.height) {
                    item.y = 0;
                }
            });
        },
        randomNum(min, max) {
            //生成随机数
            return Math.floor(Math.random() * (max - min) + min);
        },
        randomColor(min, max, a) {
            //生成随机色 rgb
            var r = this.randomNum(min, max);
            var g = this.randomNum(min, max);
            var b = this.randomNum(min, max);
            return "rgba(" + r + "," + g + "," + b + "," + a + ")";
        }
    }
};
</script>

<style scoped lang="less">
@import url("./xingkong.less");
</style>