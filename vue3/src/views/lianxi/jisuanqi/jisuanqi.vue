<template>
    <div class="jisuanqi">
        <div class="box">
            <el-row :gutter="16" class="box">
                <el-col :span="6">
                    <div class="left">
                        <div class="head">
                            <div v-if="valueType=='1'" class="lastNum">{{lastNum}}</div>
                            <div v-if="valueType=='2'" class="nextNum">{{nextNum}}</div>
                            <div v-if="valueType=='3'" class="historyNum">{{historyNum}}</div>
                        </div>
                        <el-row :gutter="20" class="num">
                            <el-col
                                :span="8"
                                class="li"
                                v-for="(item,index) in numArr"
                                :key="'1-'+index"
                            >
                                <div class="btn" @click="getNum(item)">{{item.name}}</div>
                            </el-col>
                        </el-row>
                        <el-row :gutter="20" class="num">
                            <el-col
                                :span="8"
                                class="li"
                                v-for="(item,index) in symbolArr"
                                :key="'2-'+index"
                            >
                                <div class="btn" @click="getsymbol(item)">{{item.name}}</div>
                            </el-col>
                            <el-col :span="16" class="li">
                                <div class="btn" @click="dengyu()">=</div>
                            </el-col>
                        </el-row>
                    </div>
                </el-col>
                <el-col :span="18">
                    <ul class="content">
                        <li
                            v-for="(item,index) in formulaArr"
                            :key="'3-'+index"
                        >{{index+1}}、{{item.value}}</li>
                        <li v-if="formula">{{formulaArr.length+1}}、{{formula}}</li>
                    </ul>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
export default {
    name: "appJisuanqi",
    data: () => ({
        formulaArr: [],
        formula: "", //计算记录
        lastNum: "0", //运算符之前的数字
        nextNum: "0", //运算符之前的数字
        historyNum: "0", //上次的结果
        symbolType: "", //运算符的类型
        valueType: "1", //需要显示的数字类型
        numArr: [
            //数字数组
            {
                name: "一",
                value: "1"
            },
            {
                name: "二",
                value: "2"
            },
            {
                name: "三",
                value: "3"
            },
            {
                name: "四",
                value: "4"
            },
            {
                name: "五",
                value: "5"
            },
            {
                name: "六",
                value: "6"
            },
            {
                name: "七",
                value: "7"
            },
            {
                name: "八",
                value: "8"
            },
            {
                name: "九",
                value: "9"
            },
            {
                name: "零",
                value: "0"
            }
        ],
        symbolArr: [
            //运算符数组
            {
                name: "加",
                type: "1",
                value: "+"
            },
            {
                name: "减",
                type: "2",
                value: "-"
            },
            {
                name: "乘",
                type: "3",
                value: "*"
            },
            {
                name: "除",
                type: "4",
                value: "/"
            }
        ]
    }),
    created() {},
    mounted() {},
    methods: {
        getNum(item) {
            this.formula = this.formula + item.value;
            if (!this.symbolType) {
                this.valueType = "1";
                this.lastNum = this.lastNum - 0 + "" + item.value;
                this.lastNum = this.lastNum - 0 + "";
            } else {
                this.valueType = "2";
                this.nextNum = this.nextNum - 0 + "" + item.value;
                this.nextNum = this.nextNum - 0 + "";
            }
        },

        getsymbol(item) {
            this.formula = this.formula + item.value;
            if (this.symbolType) {
                this.jisuan();
            }
            if (this.lastNum == "0") {
                this.lastNum = this.historyNum;
            }
            this.symbolType = item.type;
        },

        dengyu() {
            this.jisuan();
            this.formula = this.formula + "=" + this.historyNum;
            this.formulaArr.push({ value: this.formula });
            this.formula = "";
        },

        jisuan() {
            if (this.symbolType == "1") {
                this.historyNum = this.lastNum - 0 + (this.nextNum - 0);
            }
            if (this.symbolType == "2") {
                this.historyNum = this.lastNum - 0 - (this.nextNum - 0);
            }
            if (this.symbolType == "3") {
                this.historyNum = (this.lastNum - 0) * (this.nextNum - 0);
            }
            if (this.symbolType == "4") {
                this.historyNum = (this.lastNum - 0) / (this.nextNum - 0);
            }
            this.nextNum = "0";
            this.lastNum = "0";
            this.valueType = "3";
            this.symbolType = "";
        }
    }
};
</script>

<style scoped lang="less">
@import url("./jisuanqi.less");
</style>