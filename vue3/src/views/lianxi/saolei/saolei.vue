<template>
    <div class="saolei">
        <p>
            行数：
            <el-input-number v-model="trNum" label="请选择行数"></el-input-number>
        </p>
        <p>
            列数：
            <el-input-number v-model="tdNum" label="请选择列数"></el-input-number>
        </p>
        <p>
            雷数：
            <el-input-number v-model="leiNum" label="请选择雷数"></el-input-number>
        </p>
        <el-button type="primary" @click="getLeiArr()">生成游戏</el-button>
        <ul class="lei">
            <li v-for="(list,trIndex) in leiArr" :key="'1-'+trIndex">
                <div class="box" v-for="(item,tdIndex) in list" :key="'2-'+tdIndex">
                    <template v-if="item.open">
                        <p v-if="item.has" class="lei">雷</p>
                        <template v-if="!item.has">
                            <p v-if="item.num!=0" class="num">{{item.num}}</p>
                            <p v-if="item.num==0" class="none"></p>
                        </template>
                    </template>
                    <template v-if="!item.open">
                        <p
                            class="close"
                            :class="{'flag':item.flag}"
                            @click="openOther(item)"
                            @contextmenu="giveFlag($event,item)"
                        ></p>
                    </template>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: "appSaolei",
    data: () => ({
        trNum: 20,
        tdNum: 30,
        leiNum: 10,
        leiArr: []
    }),
    created() {
        this.getLeiArr();
        },
    mounted() {
    },
    methods: {
        getLeiArr() {
            //生成雷的数组
            let leiArr = [];
            for (let i = 0; i < this.trNum; i++) {
                leiArr[i] = [];
                for (let j = 0; j < this.tdNum; j++) {
                    leiArr[i].push({
                        tr: i,
                        td: j,
                        open: false,
                        has: false,
                        num: 0,
                        flag: false
                    });
                }
            }
            this.leiArr = leiArr;

            for (let i = 0; i < this.leiNum; i++) {
                this.giveLei();
            }
        },

        openOther(item) {
            //点击标签（将该标签周围所有数字为0的标签都显示出来
            item.open = true;
            if (item.has) {
                this.$pop.createMessage(this, {
                    type:'error',
                    message: "扫雷失败"
                });
                return;
            }
            let closeNum = 0;
            this.leiArr.forEach(item => {
                item.forEach(list => {
                    if (!list.open) {
                        closeNum++;
                    }
                });
            });
            if (closeNum <= this.leiNum) {
                this.$pop.createMessage(this, {
                    type:'success',
                    message: "扫雷成功"
                });
                return;
            }

            let lastTr = item.tr > 0; //判断该标签是否在最上边
            let nextTr = item.tr + 1 < this.trNum; //判断该标签是否在最下边
            let lastTd = item.td > 0; //判断该标签是否在最左边
            let nextTd = item.td + 1 < this.tdNum; //判断该标签是否在最右边

            if (item.num == 0) {
                if (lastTr) {
                    if (lastTd) {
                        if (!this.leiArr[item.tr - 1][item.td - 1].open) {
                            this.openOther(
                                this.leiArr[item.tr - 1][item.td - 1]
                            );
                        }
                    }
                    if (!this.leiArr[item.tr - 1][item.td].open) {
                        this.openOther(this.leiArr[item.tr - 1][item.td]);
                    }
                    if (nextTd) {
                        if (!this.leiArr[item.tr - 1][item.td + 1].open) {
                            this.openOther(
                                this.leiArr[item.tr - 1][item.td + 1]
                            );
                        }
                    }
                }
                if (lastTd) {
                    if (!this.leiArr[item.tr][item.td - 1].open) {
                        this.openOther(this.leiArr[item.tr][item.td - 1]);
                    }
                }
                if (nextTd) {
                    if (!this.leiArr[item.tr][item.td + 1].open) {
                        this.openOther(this.leiArr[item.tr][item.td + 1]);
                    }
                }
                if (nextTr) {
                    if (lastTd) {
                        if (!this.leiArr[item.tr + 1][item.td - 1].open) {
                            this.openOther(
                                this.leiArr[item.tr + 1][item.td - 1]
                            );
                        }
                    }
                    if (!this.leiArr[item.tr + 1][item.td].open) {
                        this.openOther(this.leiArr[item.tr + 1][item.td]);
                    }
                    if (nextTd) {
                        if (!this.leiArr[item.tr + 1][item.td + 1].open) {
                            this.openOther(
                                this.leiArr[item.tr + 1][item.td + 1]
                            );
                        }
                    }
                }
            } else {
                if (lastTr) {
                    if (lastTd) {
                        if (!this.leiArr[item.tr - 1][item.td - 1].open) {
                            if (
                                this.leiArr[item.tr - 1][item.td - 1].num == 0
                            ) {
                                this.openOther(
                                    this.leiArr[item.tr - 1][item.td - 1]
                                );
                            }
                        }
                    }
                    if (!this.leiArr[item.tr - 1][item.td].open) {
                        if (this.leiArr[item.tr - 1][item.td].num == 0) {
                            this.openOther(this.leiArr[item.tr - 1][item.td]);
                        }
                    }
                    if (nextTd) {
                        if (!this.leiArr[item.tr - 1][item.td + 1].open) {
                            if (
                                this.leiArr[item.tr - 1][item.td + 1].num == 0
                            ) {
                                this.openOther(
                                    this.leiArr[item.tr - 1][item.td + 1]
                                );
                            }
                        }
                    }
                }
                if (lastTd) {
                    if (!this.leiArr[item.tr][item.td - 1].open) {
                        if (this.leiArr[item.tr][item.td - 1].num == 0) {
                            this.openOther(this.leiArr[item.tr][item.td - 1]);
                        }
                    }
                }
                if (nextTd) {
                    if (!this.leiArr[item.tr][item.td + 1].open) {
                        if (this.leiArr[item.tr][item.td + 1].num == 0) {
                            this.openOther(this.leiArr[item.tr][item.td + 1]);
                        }
                    }
                }
                if (nextTr) {
                    if (lastTd) {
                        if (!this.leiArr[item.tr + 1][item.td - 1].open) {
                            if (
                                this.leiArr[item.tr + 1][item.td - 1].num == 0
                            ) {
                                this.openOther(
                                    this.leiArr[item.tr + 1][item.td - 1]
                                );
                            }
                        }
                    }
                    if (!this.leiArr[item.tr + 1][item.td].open) {
                        if (this.leiArr[item.tr + 1][item.td].num == 0) {
                            this.openOther(this.leiArr[item.tr + 1][item.td]);
                        }
                    }
                    if (nextTd) {
                        if (!this.leiArr[item.tr + 1][item.td + 1].open) {
                            if (
                                this.leiArr[item.tr + 1][item.td + 1].num == 0
                            ) {
                                this.openOther(
                                    this.leiArr[item.tr + 1][item.td + 1]
                                );
                            }
                        }
                    }
                }
            }
        },
        giveFlag(e, item) {
            //右键插旗
            item.flag = !item.flag;
            e.preventDefault();
        },
        getRandom(min, max) {
            //取随机整数
            let num = Math.round(Math.random() * (max - min) + min);
            return num;
        },

        giveLei() {
            //将雷复制到指定标签中
            let trIndex = this.getRandom(0, this.trNum - 1); //获取雷在哪行
            let tdIndex = this.getRandom(0, this.tdNum - 1); //获取雷在哪列
            if (!this.leiArr[trIndex][tdIndex].has) {
                this.leiArr[trIndex][tdIndex].has = true;
                this.leiArr[trIndex][tdIndex].num = 1;
                this.addNum(this.leiArr[trIndex][tdIndex]);
            } else {
                this.giveLei();
            }
        },

        addNum(item) {
            //该对象有雷 给目标周围的格子添加数字1
            let lastTr = item.tr > 0; //判断该标签是否在最上边
            let nextTr = item.tr + 1 < this.trNum; //判断该标签是否在最下边
            let lastTd = item.td > 0; //判断该标签是否在最左边
            let nextTd = item.td + 1 < this.tdNum; //判断该标签是否在最右边
            if (lastTr) {
                if (lastTd) {
                    this.leiArr[item.tr - 1][item.td - 1].num++;
                }
                this.leiArr[item.tr - 1][item.td].num++;
                if (nextTd) {
                    this.leiArr[item.tr - 1][item.td + 1].num++;
                }
            }
            if (lastTd) {
                this.leiArr[item.tr][item.td - 1].num++;
            }
            if (nextTd) {
                this.leiArr[item.tr][item.td + 1].num++;
            }
            if (nextTr) {
                if (lastTd) {
                    this.leiArr[item.tr + 1][item.td - 1].num++;
                }
                this.leiArr[item.tr + 1][item.td].num++;
                if (nextTd) {
                    this.leiArr[item.tr + 1][item.td + 1].num++;
                }
            }
        }
    }
};
</script>

<style scoped lang="less">
@import url("./saolei.less");
</style>