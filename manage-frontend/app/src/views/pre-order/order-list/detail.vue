<template>
  <div class="app-container">
    <el-card>
      <div slot="header" class="clearfix">
        <span>订单状态</span>
      </div>
      <div class="step-box">
        <el-steps :space="200" :active="active" finish-status="success">
          <el-step title="已预约">
            <div slot="description" class="description">
              <p>{{orderInfo.createTime}}</p>
              <p>订单编号：{{orderInfo.orderSn}}</p>
            </div>
          </el-step>
          <el-step v-if="active==1" title="待付款"></el-step>
          <el-step v-if="active>=2&&active!=7" title="已付款">
            <div slot="description" class="description">
              <p>{{orderInfo.payTime}}</p>
              <p>支付金额：{{orderInfo.totalAmount}}</p>
            </div>
          </el-step>
          <el-step v-if="active>=3&&active!=6" title="未被抽中">
            <div slot="description" class="description">
              <p>{{orderInfo.missedTime}}</p>
              <p>未得到商品</p>
            </div>
          </el-step>
          <el-step v-if="active>=4&&active!=6&&active!=8" title="已退本金">
            <div slot="description" class="description">
              <p>{{orderInfo.waitRefundTime}}</p>
              <p>系统退款</p>
            </div>
          </el-step>
          <el-step v-if="active>=5&&active!=6&&active!=8" title="已退款">
            <div slot="description" class="description">
              <p>{{orderInfo.date}}</p>
              <p>退款账号：{{orderInfo.refundTime}}</p>
            </div>
          </el-step>
          <el-step v-if="active==6" title="抽中关闭订单"></el-step>
          <el-step v-if="active==7" title="超时关闭订单"></el-step>
          <el-step v-if="active==8" title="退款异常"></el-step>
        </el-steps>
      </div>
    </el-card>
    <el-card style="margin-top:20px">
      <div slot="header" class="clearfix">
        <span>预约信息</span>
      </div>
      <el-form size="small" label-width="140px">
        <el-form-item label="收货人:">
          <span class="form-item">{{orderInfo.receiverName}}</span>
        </el-form-item>
        <el-form-item label="联系电话:">
          <span class="form-item">{{orderInfo.receiverPhone}}</span>
        </el-form-item>
        <el-form-item label="收货地址:">
          <span
            class="form-item"
          >{{orderInfo.receiverProvince}} {{orderInfo.receiverCity}} {{orderInfo.receiverRegion}} {{orderInfo.receiverDetailAddress}}</span>
        </el-form-item>
        <el-form-item label="订单编号:">
          <span class="form-item">{{orderInfo.orderSn}}</span>
        </el-form-item>
        <el-form-item label="付款方式:">
          <span class="form-item">{{orderInfo.payWay}}</span>
        </el-form-item>
        <el-form-item label="付款渠道:">
          <span class="form-item" v-if="orderInfo.payType==1">微信支付</span>
          <span class="form-item" v-if="orderInfo.payType==2">支付宝支付</span>
        </el-form-item>
        <el-form-item label="预约时间:">
          <span class="form-item">{{orderInfo.createTime}}</span>
        </el-form-item>
        <el-form-item label="商品总价:">
          <span class="form-item">{{orderInfo.productAmount}}</span>
        </el-form-item>
        <el-form-item label="运费:">
          <span class="form-item">{{orderInfo.freightAmount}}</span>
        </el-form-item>
        <el-form-item label="订单总价:">
          <span class="form-item">{{orderInfo.payAmount}}</span>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card style="margin-top:20px" v-if="active>=3&&active<9&&active!=7">
      <div slot="header" class="clearfix">
        <span>退款信息</span>
      </div>
      <el-form size="small" label-width="140px">
        <el-form-item label="用户名称:">
          <span class="form-item">{{orderInfo.refundName}}</span>
        </el-form-item>
        <el-form-item label="申请时间:">
          <span class="form-item">{{orderInfo.refundTime}}</span>
        </el-form-item>
        <el-form-item label="退款单号:">
          <span class="form-item">{{orderInfo.refundSn}}</span>
        </el-form-item>
        <el-form-item label="收款帐号:">
          <span class="form-item">{{orderInfo.refundAccount}}</span>
        </el-form-item>
        <el-form-item label="应退金额:">
          <span class="form-item">{{orderInfo.refundAmount}}</span>
        </el-form-item>
        <el-form-item label="实退金额:">
          <span class="form-item">{{orderInfo.realAmount}}</span>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card style="margin-top:20px" v-if="active==2">
      <div slot="header" class="clearfix">
        <span>付款信息</span>
      </div>
      <el-form size="small" label-width="140px">
        <el-form-item label="用户名称:">
          <span class="form-item">{{orderInfo.account}}</span>
        </el-form-item>
        <el-form-item label="支付时间:">
          <span class="form-item">{{orderInfo.payTime}}</span>
        </el-form-item>
        <el-form-item label="支付单号:">
          <span class="form-item">{{orderInfo.paySn}}</span>
        </el-form-item>
        <el-form-item label="支付帐号:">
          <span class="form-item">{{orderInfo.refundAccount}}</span>
        </el-form-item>
        <el-form-item label="应付金额:">
          <span class="form-item">{{orderInfo.productAmount}}</span>
        </el-form-item>
        <el-form-item label="实付金额:">
          <span class="form-item">{{orderInfo.realAmount}}</span>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card style="margin-top:20px">
      <div slot="header" class="clearfix">
        <span>预约商品信息</span>
      </div>
      <div class="table-container">
        <el-card>
          <el-table :data="tableData">
            <el-table-column label="序号" align="center">
              <template
                slot-scope="scope"
              >{{ (searchForm.pageNum-1)*searchForm.pageSize + scope.$index +1 }}</template>
            </el-table-column>
            <el-table-column label="商品图片" align="center">
              <template slot-scope="scope" class="table-img">
                <img :src="scope.row.productPic" width="200" height="120" alt="暂无图片" />
              </template>
            </el-table-column>
            <el-table-column label="商品名称" align="center">
              <template slot-scope="scope">{{ scope.row.productName }}</template>
            </el-table-column>
            <el-table-column label="单价（元）" align="center">
              <template slot-scope="scope">{{ scope.row.productPrice }}</template>
            </el-table-column>
            <el-table-column label="数量" align="center">
              <template slot-scope="scope">{{ scope.row.productQuantity }}</template>
            </el-table-column>
            <el-table-column label="小计" align="center">
              <template
                slot-scope="scope"
              >{{ (scope.row.productPrice)*(scope.row.productQuantity) }}</template>
            </el-table-column>
          </el-table>
        </el-card>
      </div>
    </el-card>
  </div>
</template>

<script>
import { getSingleData } from "@/api/preOrder";
import list from "@/mixins/list";
let defaultSearchForm = {
  pageNum: 1,
  pageSize: 10
};
export default {
  mixins: [list],
  data() {
    return {
      searchForm: Object.assign({}, defaultSearchForm),
      active: 1,
      id: "",
      orderInfo: {
        status: 5,
        orderNo: 456,
        date: 2456
      },
      tableData: [],
      total: 0
    };
  },
  created() {
    this.id = this.$route.query.id;
    this.getData();
  },
  methods: {
    async getData() {
      let res = await getSingleData(this.id);
      if (res) {
        this.resolcePic(res.data.orderItemList);
        this.tableData = res.data.orderItemList;
        this.orderInfo = res.data;
        this.active = res.data.status;
        this.total = this.tableData.length;
      }
    },
    resolcePic(list) {
      list.map(item => {
        if (item.productPic.indexOf("[") >= 0) {
          item.productPic = JSON.parse(item.productPic)[0];
        }
      });
    },
    changePage(pageNum, pageSize) {
      this.searchForm.pageNum = pageNum;
      this.searchForm.pageSize = pageSize;
      this.getData();
    }
  }
};
</script>

<style lang="scss" scoped>
.step-box {
  margin-left: 100px;
  .description {
    color: black;
    line-height: 25px;
    p {
      margin: 0;
    }
  }
}
.form-item {
  margin-left: 50px;
}
.table-img {
  width: 100px;
  height: 100px;
  background-color: red;
  img {
    width: 100%;
    height: 100%;
  }
}
.el-table__row {
  background-color: red;
}
</style>