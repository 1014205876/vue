<template>
    <div class="calendar">
        <ul class="box">
            <div class="header">
                <button @click="toOtherMonth(-12)">上年</button>
                <button @click="toOtherMonth(-1)">上月</button>
                <p>{{calendarYear}}年{{calendarMonth}}月</p>
                <button @click="toOtherMonth(1)">下月</button>
                <button @click="toOtherMonth(12)">下年</button>
            </div>
            <li v-for="(item,index) in weakArr" :key="index">
                <div class="classStyle">{{item}}</div>
            </li>
            <li v-for="( item,index) in calendaArr" :key="index">
                <div
                    class="classStyle"
                    :class="{
                        'classStyle':true,
                        'lastMonth':item.year<calendarYear||(item.year==calendarYear&&item.month<calendarMonth),
                        'nowMonth':item.year==calendarYear&&item.month==calendarMonth,
                        'nextMonth':item.year>calendarYear||(item.year==calendarYear&&item.month>calendarMonth),
                        'timeInterval':item.time>=startTime&&item.time<=endTime,
                        'saturday':item.weak==6,
                        'sunday':item.weak==0
                    }"
                    @click="getThisDay(item)"
                >
                    <div
                        class="border"
                        :class="{
                            'otherMonthToday':item.year==calendarYear&&item.month==calendarMonth&&item.day==nowDay,
                            'today':item.year==nowYear&&item.month==nowMonth&&item.day==nowDay
                        }"
                    >
                        <p>{{item.day}}</p>
                    </div>
                </div>
            </li>
        </ul>
        <p>
            去哪年：
            <input placeholder="请选择年份" type="number" v-model="toYearNum" />
        </p>
        <p>
            去哪月：
            <input placeholder="请选择月份" type="number" v-model="toMonthNum" />
        </p>
        <button @click="toOtherMonth((toYearNum-calendarYear)*12+toMonthNum-calendarMonth)">跳转</button>
        <p>
            开始时间：
            <input placeholder="请选择开始时间" type="date" v-model="startDate" />
        </p>
        <p>
            结束时间：
            <input placeholder="请选择结束时间" type="date" v-model="endDate" />
        </p>
        <button @click="useInterval()">使用</button>
    </div>
</template>

<script>
export default {
    name: "appCalendar",
    data() {
        return {
            nowYear: null, //今天的年份
            nowMonth: null, //今天的月份
            nowWeak: null, //今天的星期
            nowDay: null, //今天的日期
            nowTime: null, //今天的时间戳
            monthObj: {
                //月份英文对象
                Jan: 0,
                Feb: 1,
                Mar: 2,
                Apr: 3,
                May: 4,
                Jun: 5,
                Jul: 6,
                Aug: 7,
                Sep: 8,
                Oct: 9,
                Nov: 10,
                Dec: 11
            },
            weakArr: ["日", "一", "二", "三", "四", "五", "六"],
            calendaArr: [], //日历数组
            calendarYear: null, //日历展示的的年份
            calendarMonth: null, //日历展示的月份
            toYearNum: new Date().getFullYear(), //将要跳转的年份
            toMonthNum: new Date().getMonth() + 1, //将要跳转的月份
            startDate: null, //区间开始日期
            endDate: null, //区间结束日期
            startTime: null, //区间开始时间
            endTime: null //区间结束时间
        };
    },
    methods: {},
    created() {},
    mounted() {},
    beforeDestroy() {}
};
</script>

<style scoped lang="less">
.calendar {
    .box {
        width: 350px;
        margin: 0 auto;
        display: flex;
        flex-wrap: wrap;

        .header {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;

            p {
                font-size: 20px;
            }
        }

        > li {
            width: 50px;
            height: 40px;
            border: 1px solid #000;

            .classStyle {
                width: 100%;
                height: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 20px;
                cursor: pointer;

                .border {
                    width: 100%;
                    height: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 40px;

                    &.otherMonthToday {
                        //其他月份今天的样式
                        background: pink;
                        color: #fff;
                    }

                    &.today {
                        //今天的样式
                        background: red;
                        color: #fff;
                    }
                }

                &.lastMonth {
                    //上月的样式
                    background: yellow;
                }

                &.nowMonth {
                    //本月的样式
                    background: #fff;
                }

                &.nextMonth {
                    //下月的样式
                    background: greenyellow;
                }

                &.saturday {
                    //周六的样式
                    background: tan;
                }

                &.sunday {
                    //周日的样式
                    background: gray;
                    color: #fff;
                }

                &.timeInterval {
                    //某个时间区间的样式
                    background: blue;
                    color: #fff;
                }
            }
        }
    }
}
</style>