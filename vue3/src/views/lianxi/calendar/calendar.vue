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
            <li v-for="(item,index) in weakArr" :key="'1-'+index">
                <div class="classStyle">{{item}}</div>
            </li>
            <li v-for="(item,index) in calendaArr" :key="'2-'+index">
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
    data: () => ({
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
    }),
    created() {
        this.nowYear = new Date().getFullYear();
        this.nowMonth = new Date().getMonth() + 1;
        this.nowWeak = new Date().getDay();
        this.nowDay = new Date().getDate();
        this.nowTime = new Date().getTime();

        this.calendarYear = new Date().getFullYear();
        this.calendarMonth = new Date().getMonth() + 1;
        this.getCalendarArr(this.calendarYear, this.calendarMonth);
    },
    mounted() {},
    methods: {
        getMonthDays(year, month) {
            //获取该月天数
            //判断2月份天数
            let days = 30;
            if (month == 2) {
                days =
                    (year % 4 == 0 && year % 100 != 0) || year % 400 == 0
                        ? 29
                        : 28;
            } else {
                //1-7月 单数月为31日
                if (month < 7) {
                    days = month % 2 == 1 ? 31 : 30;
                } else {
                    //8-12月 双月为31日
                    days = month % 2 == 0 ? 31 : 30;
                }
            }
            return days;
        },

        getCalendarArr(year, month) {
            //获取日历数组
            let calendaArr = []; //日历数组
            let monthDays = this.getMonthDays(year, month); //获取该月天数
            let firstDayWeak = new Date(year, month - 1, 1).getDay(); //获取该月第一天是礼拜几（礼拜日为0）
            let nextMonthDays = 42 - monthDays - firstDayWeak; //获取剩下的月份的日期
            for (let i = 0; i < firstDayWeak; i++) {
                //插入上月时间
                calendaArr.push({
                    year: new Date(
                        year,
                        month - 1,
                        i - firstDayWeak + 1
                    ).getFullYear(),
                    month:
                        new Date(
                            year,
                            month - 1,
                            i - firstDayWeak + 1
                        ).getMonth() + 1,
                    day: new Date(
                        year,
                        month - 1,
                        i - firstDayWeak + 1
                    ).getDate(),
                    weak: new Date(
                        year,
                        month - 1,
                        i - firstDayWeak + 1
                    ).getDay(),
                    time:
                        new Date(
                            year,
                            month - 1,
                            i - firstDayWeak + 1
                        ).getTime() + 28800000 //该方法计算时间戳时会少8个小时的时间
                });
            }
            for (let i = 0; i < monthDays; i++) {
                //插入本月时间
                calendaArr.push({
                    year: new Date(year, month - 1, i + 1).getFullYear(),
                    month: new Date(year, month - 1, i + 1).getMonth() + 1,
                    day: new Date(year, month - 1, i + 1).getDate(),
                    weak: new Date(year, month - 1, i + 1).getDay(),
                    time: new Date(year, month - 1, i + 1).getTime() + 28800000 //该方法计算时间戳时会少8个小时的时间
                });
            }
            for (let i = 0; i < nextMonthDays; i++) {
                //插入下月时间
                calendaArr.push({
                    year: new Date(year, month, i + 1).getFullYear(),
                    month: new Date(year, month, i + 1).getMonth() + 1,
                    day: new Date(year, month, i + 1).getDate(),
                    weak: new Date(year, month, i + 1).getDay(),
                    time: new Date(year, month, i + 1).getTime() + 28800000 //该方法计算时间戳时会少8个小时的时间
                });
            }
            this.calendaArr = calendaArr;
        },

        toOtherMonth(num) {
            //去其他月份
            this.calendarMonth = this.calendarMonth + num; //切换日历展示的月份
            if (this.calendarMonth > 12) {
                //如果月份大于12（超过12月，类似2019年13月就是2020年1月）
                this.calendarYear =
                    this.calendarYear + Math.floor(this.calendarMonth / 12); //标准化年份
                this.calendarMonth = this.calendarMonth % 12; //标准化月份
            }
            if (this.calendarMonth == 0) {
                //如果月份等于0（等于0月，2019年0月就是2018年11月）
                this.calendarYear = this.calendarYear - 1; //标准化年份
                this.calendarMonth = 12; //标准化月份
            }
            if (this.calendarMonth < 0) {
                //如果月份小于1（小于1月，类似2019年-1月就是2018年10月）
                this.calendarYear =
                    this.calendarYear + Math.floor(this.calendarMonth / 12); //标准化年份
                this.calendarMonth = (this.calendarMonth % 12) + 12; //标准化月份
            }
            this.getCalendarArr(this.calendarYear, this.calendarMonth);
        },
        getThisDay(item) {
            this.$pop.createMessage(this,{
                message:
                    "2选中的是:" +
                    item.year +
                    "年," +
                    item.month +
                    "月," +
                    item.day +
                    "日," +
                    "周" +
                    this.weakArr[item.weak],
                    duration:1000
            });
            this.toOtherMonth(
                (item.year - this.calendarYear) * 12 +
                    item.month -
                    this.calendarMonth
            );
        },
        useInterval() {
            this.startTime = new Date(this.startDate).getTime();
            this.endTime = new Date(this.endDate).getTime();
        }
    },
    beforeDestroy() {}
};
</script>

<style scoped lang="less">
@import url("./calendar.less");
</style>