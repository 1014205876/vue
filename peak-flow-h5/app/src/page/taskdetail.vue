<template>
  <div class="taskdetail">
    <div class="companyinfo">
      <div class="top" v-on:click='look'>
        <div class="name">{{companyinfo.entName}}</div>
        <div class="seereport" v-if='cant'>
          查看报告<img src="static/img/icon/right_gray.png" alt="">
        </div>
      </div>
      <ul class='data'>
        <li>
          <span>企业法人 ：</span>{{companyinfo.legalRep}}<!-- {{companyinfo.legalName}} -->
        </li>
        <li>
          <span>项目编号 ：</span>{{companyinfo.projectNumber}}
        </li>
        <li>
          <span>贷款金额 ：</span>{{companyinfo.amount}}万元
        </li>
        <li>
          <span>贷款期限 ：</span>{{companyinfo.term}}个月
        </li>
        <li>
          <span>联系电话 ：</span><a :href="'tel:'+companyinfo.legalPhone">{{companyinfo.legalPhone}}</a>
        </li>
        <li>
          <span>预约时间 ：</span><datechange v-bind:date='companyinfo.guestAppointTime' v-bind:noon='true' style='color:#000'></datechange>
        </li>
      </ul>
    </div>
    <div class="shenpi"  v-if='cant'>审批记录<img src="static/img/icon/fengkongshenpi.png" alt=""></div>
    <ul class='list'  v-if='cant'>
      <li v-for='list in data' v-bind:key='list.id' v-if='list.name'>
        <div class="top">
          <div class="name">
            <img src="static/img/icon/task_blue.png" alt="">{{list.name}}
          </div>
          <div class="time">
            <span>{{list.endTime}}</span>
            <img v-if='list.status=="通过"' src="static/img/pass.png" alt="通过图片">
            <img v-if='list.status=="回退"' src="static/img/backspace.png" alt="回退图片">
            <img v-if='list.status=="拒绝"' src="static/img/nopass.png" alt="拒绝图片">
          </div>
        </div>
        <ul class="bottom">
          <li v-for="(item,index) in list.fields" :key='item.id+index' v-if='item.placeholder!="hidden"' :class='{remark:item.type=="multi-line-text"}'>
          <!-- <li v-for="item in list.fields" :key='item.id'> -->
            <span class='left'>{{item.name}}</span>
            <span class='right' v-if='item.type=="dayTime"'>
              <datechange v-bind:date='item.value' v-bind:noon='true'></datechange>
            </span>
            <span class='right' v-else>
              <!-- <span v-if='item.value=="yes"||item.value=="pass"||item.value=="no"||item.value=="reject"'>{{(item.value=="yes"||item.value=="pass")?'通过':'拒绝'}}</span> -->
              <span>{{item.value}}</span>
            </span>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
// 引入时间标准化组件
import datechange from "@/components/datechange";
export default {
  name: "taskdetail",
  data() {
    return {
      cant: true,
      actName: "",
      taskId: "",
      processInstanceId: "",
      // 获取公司信息
      companyinfo: {
        // legalPhone: "13697919058",
        // legalRep: "李新宇",
        // legalName: "李新宇",
        // legalCardNo: "360103199408051774",
        // legalSex: "男",
        // legalBirth: "1994/8/5",
        // legalAddress: "江西省南昌市西湖区",
        // projectNumber: "229919636794249216",
        // province: "江西省",
        // productName: "征信贷",
        // productId: "267c12f4-cc00-4f7d-a633-0b980f5fa253",
        // infoAuthNum: "20180927000113",
        // controllerIdCode: "360103199408051774",
        // entName: "江西省新新美容咨询服务有限公司1",
        // city: "南昌市",
        // creditTaskId: "1043456",
        // productName: "征信贷",
        // authUrl:
        //   "https://masspick-1255853614.cos-website.ap-shanghai.myqcloud.com/masspick/develop/peak-guest/c7481486-4040-4090-bcd5-96e8f6e2cd50.jpg",
        // controllerCreditUrls:
        //   "https://masspick-1255853614.cos-website.ap-shanghai.myqcloud.com/masspick/develop/peak-guest/个人征信9a559c57-53fc-438e-9f5d-3d267d210739.zip",
        // corporateCreditUrls:
        //   "https://masspick-1255853614.cos-website.ap-shanghai.myqcloud.com/masspick/develop/peak-guest/企业征信387c2fb8-7fe9-426e-a70a-91e3cac2c95c.zip",
        // creditCode: "911401057480908051",
        // replyMethod: "按月付息，到期还本",
        // controllerName: "李新宇",
        // regCap: "贰仟万圆整",
        // term: "2",
        // busScope:
        //   "消防设施工程、建筑智险化工程、机电设备安装工程的设计、施工及技术咨询;电子产品的开发、销售:酒防设施、设备的维护、保养、检料;消防设施维修:消防设备、安防设备、制冷设备,空调通风设备,电控设备、防火门.店火春饰门、店火饰料、装饰材料、电线电缆、五金交电的销售。(依法须批准的项目,经相关部门批准后方可开展经营活动)",
        // area: "红谷新区",
        // amount: "12",
        // address: "江西省南昌市红谷新区世贸路333号星大厦楼",
        // appointTime: "2018-09-29 14:00:00",
        // assignee: "riskAssistant",
        // controllerPhone: "13697919058",
        // ddTask: "ufinish",
        // bodyUrl:
        //   "https://masspick-1255853614.cos-website.ap-shanghai.myqcloud.com/masspick/develop/peak-guest/15dea291-7656-4abd-9cb1-5f005c1a8f0d.jpg",
        // busUrl:
        //   "https://masspick-1255853614.cos-website.ap-shanghai.myqcloud.com/masspick/develop/peak-guest/8c55f4ea-9778-4df2-8b16-4337f5b448fc.jpg",
        // legalNation: "汉",
        // controllerUrl:
        //   "https://masspick-1255853614.cos-website.ap-shanghai.myqcloud.com/masspick/develop/peak-guest/0ef685a3-e90b-46d5-9f94-24a9a696a1f2.jpg",
        // register: "unfinish",
        // status: "未完成"
      },
      data: [
        // {
        //   key: "riskApprove",
        //   name: "准入审核",
        //   outcomes: [],
        //   version: 0,
        //   fields: [
        //     {
        //       fieldType: "OptionFormField",
        //       hasEmptyValue: null,
        //       id: "creditConformRequest",
        //       layout: null,
        //       name: "客户征信是否符合产品准入要求",
        //       optionType: null,
        //       options: [],
        //       optionsExpression: "${conformity}",
        //       overrideId: true,
        //       placeholder: null,
        //       readOnly: false,
        //       required: true,
        //       type: "radio-buttons",
        //       value: "符合"
        //     },
        //     {
        //       fieldType: "FormField",
        //       id: "approveRemark",
        //       layout: null,
        //       name: "备注",
        //       overrideId: true,
        //       placeholder: null,
        //       readOnly: false,
        //       required: false,
        //       type: "multi-line-text",
        //       value: "132132333333333333333333333333333333333333333333333333333333333333333"
        //     }
        //   ],
        // }
      ],
      item: []
    };
  },
  components: {
    datechange
  }, //引入组件
  methods: {
    // change() {
    //   let that = this;
    //   let date = new Date(that.companyinfo.appointTime);
    //   let year = date.getFullYear();
    //   let month = date.getMonth() + 1;
    //   let day = date.getDate();
    //   let hour = date.getHours();
    //   if (month < 10) {
    //     month = "0" + month;
    //   }
    //   if (day < 10) {
    //     day = "0" + day;
    //   }
    //   if (hour <= 12) {
    //     that.companyinfo.appointTime =
    //       year + "-" + month + "-" + day + " " + "AM";
    //   } else {
    //     that.companyinfo.appointTime =
    //       year + "-" + month + "-" + day + " " + "PM";
    //   }
    // },
    look() {
      let that = this;
      // that.find(that);
      // let name = localStorage.getItem("name");
      // console.log(name);
      if (that.actName == "预约确认") {
        that.$router.push({
          path: "/enterpriseinfo", //企业信息页面
          query: {
            entName: that.companyinfo.entName
          }
        });
      } else {
        if (that.actName == "风控审批" || that.actName == "准入审核") {
          that.$router.push({
            path: "/report", //客户信息报告页面
            query: {
              title: "客户信息报告",
              type: "customer",
              processInstanceId: that.processInstanceId
            }
          });
        } else {
          if (that.actName == "综合审批") {
            that.$router.push({
              path: "/report", //信息采集报告页面
              query: {
                title: "信息采集报告",
                type: "collection",
                processInstanceId: that.processInstanceId
              }
            });
          } else {
            that.$router.push({
              path: "/report", //综合审批报告页面
              query: {
                title: "综合审批报告",
                type: "comprehensive",
                processInstanceId: that.processInstanceId
              }
            });
          }
        }
      }
    },
    // find(that) {
    //   // let that = this;
    //   console.log(that.item);
    //   for (let i = 0; i < that.item.length; i++) {
    //     if (that.item[i].taskId == that.taskId) {
    //       console.log(that.item[i].actName);
    //       that.actName = that.item[i].actName;
    //       if (that.actName == "征信拆解" || that.actName == "资产推送") {
    //         that.cant = false;
    //       } else {
    //         that.cant = true;
    //       }
    //     }
    //   }
    // },
    toenterpriseinfo() {
      let that = this;
    }
  },
  created() {
    let that = this;
    let token = localStorage.getItem("token");
    that.taskId = that.$route.query.taskId;
    that.processInstanceId = that.$route.query.processInstanceId;
    //获取公司信息
    that
      .$http({
        method: "get",
        header: {
          "Content-Type": "application/json;charset=utf-8"
        },
        headers: {
          authorization: token
        },
        url:
          "api/peak-flow/v1/flow/process/" +
          that.processInstanceId +
          "/variables"
      })
      .then(function(res) {
        that.companyinfo = res.data.data;
        // that.change();
        console.log(res);
      })
      .catch(function(err) {
        console.log(err);
      });
    //获取审批记录
    that
      .$http({
        method: "get",
        header: {
          "Content-Type": "application/json;charset=utf-8"
        },
        headers: {
          authorization: token
        },
        url: "api/peak-flow/v1/flow/historic-task/" + that.taskId
      })
      .then(function(res) {
        that.data = res.data.data;
        console.log(res);
      })
      .catch(function(err) {
        console.log(err);
      });
    //获取审批记录节点
    that
      .$http({
        method: "get",
        header: {
          "Content-Type": "application/json;charset=utf-8"
        },
        headers: {
          authorization: token
        },
        url:
          "api/peak-flow/v1/flow/historic-task/detail?processInstanceId=" +
          that.processInstanceId
      })
      .then(function(res) {
        that.item = res.data.data;
        for (let i = 0; i < that.item.length; i++) {
          if (that.item[i].taskId == that.taskId) {
            console.log(that.item[i].actName);
            that.actName = that.item[i].actName;
            if (that.actName == "征信拆解" || that.actName == "资产推送") {
              that.cant = false;
            } else {
              that.cant = true;
            }
          }
        }
        console.log(res);
      })
      .catch(function(err) {
        console.log(err);
      });
    // console.log("createdend");
  }
};
</script>

<style lang="less" scoped>
.taskdetail {
  .companyinfo {
    background: #fff;
    .top {
      padding: 0 0.4rem;
      height: 1.2rem;
      line-height: 1.2rem;
      display: flex;
      justify-content: space-between;
      .name {
        width: 5rem;
        // height: 1rem;
        padding: 0.1rem 0;
        line-height: 0.5rem;
        font-size: 0.36rem;
        color: #333333;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        display: flex;
        align-items: center;
      }
      .seereport {
        display: flex;
        align-items: center;
        color: #999999;
        font-size: 0.28rem;
        img {
          width: 10px;
          height: 16px;
          margin-left: 0.2rem;
        }
      }
    }
    .data {
      border-top: 1px solid #cacaca;
      padding: 0.2rem 0.4rem;
      li {
        line-height: 0.56rem;
        color: #000000;
        font-size: 0.3rem;
        span {
          color: #999999;
        }
      }
    }
  }
  .shenpi {
    width: 100%;
    height: 0.9rem;
    line-height: 0.9rem;
    text-align: center;
    background: #f1f1f1;
    color: #999999;
    font-size: 0.3rem;
    position: relative;
    img {
      width: 110px;
      height: 3px;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      margin: auto;
    }
  }
  .list {
    > li {
      margin-top: 0.2rem;
      background: #fff;
      font-size: 0.3rem;
      .top {
        line-height: 1.2rem;
        padding: 0 0.44rem;
        display: flex;
        justify-content: space-between;
        .name {
          display: flex;
          align-items: center;
          color: #3674b2;
          img {
            width: 0.3rem;
            height: 0.4rem;
            margin-right: 0.2rem;
          }
        }
        .time {
          color: #c6c6c6;
          font-size: 0.28rem;
          position: relative;
          img {
            width: 1.5rem;
            height: 1rem;
            position: absolute;
            top: 0.7rem;
            right: 0;
          }
        }
      }
      .bottom {
        // border-top: 1px solid #cacaca;
        border-top: 1px solid #eaeaea;
        padding: 0.3rem 0.5rem;
        font-size: 0.28rem;
        > li {
          line-height: 0.64rem;
          display: flex;
          justify-content: space-between;
          .left {
            width: 3.4rem;
            line-height: 0.5rem;
            padding: 0.07rem 0;
            color: #999999;
            white-space: normal;
            word-break: break-all;
          }
          .right {
            text-align: right;
            width: 2.3rem;
            line-height: 0.5rem;
            padding: 0.07rem 0;
            color: #333333;
            white-space: normal;
            word-break: break-all;
          }
          .right.no {
            color: #f35535;
          }
        }
        > li.remark {
          display: block;
          span {
            width: 100%;
            text-align: left;
            display: block;
            line-height: 0.5rem;
            white-space: normal;
            word-break: break-all;
          }
        }
      }
    }
    > li:first-child {
      margin-top: 0;
    }
  }
}
</style>
