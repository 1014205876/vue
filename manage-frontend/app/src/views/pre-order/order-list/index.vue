<template>
  <div class="app-container">
    <el-card>
      <div style="margin-bottom:15px">
        <i class="el-icon-search"></i>
        <span>筛选搜索</span>
        <el-button style="float: right" @click="search()" type="primary" size="small">查询结果</el-button>
        <el-button
          style="float: right;margin-right: 15px"
          @click="handleResetSearch()"
          size="small"
        >重置</el-button>
      </div>
      <el-form :inline="true" size="small" label-width="140px">
        <el-form-item label="瓷器名称">
          <el-input placeholder="瓷器名称" v-model="searchForm.name"></el-input>
        </el-form-item>
        <el-form-item label="预约用户">
          <el-input placeholder="预约用户" v-model="searchForm.phone"></el-input>
        </el-form-item>
        <el-form-item label="活动编号">
          <el-input placeholder="活动编号" v-model="searchForm.activityId"></el-input>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <span>数据列表</span>
      <el-button size="mini" class="btn-add" @click="exportExcel()">导出退款表</el-button>
    </el-card>
    <div class="table-container">
      <el-card>
        <el-table :data="tableData" border>
          <el-table-column label="序号" align="center">
            <template
              slot-scope="scope"
            >{{ (searchForm.pageNum-1)*searchForm.pageSize + scope.$index +1 }}</template>
          </el-table-column>
          <el-table-column label="预约用户" align="center">
            <template slot-scope="scope">{{ scope.row.memberAccount }}</template>
          </el-table-column>
          <el-table-column label="活动编号" align="center">
            <template slot-scope="scope">{{ scope.row.activityId }}</template>
          </el-table-column>
          <el-table-column label="瓷器名称" align="center">
            <template slot-scope="scope">{{ scope.row.productName }}</template>
          </el-table-column>
          <el-table-column label="预约金额" align="center">
            <template slot-scope="scope">{{ scope.row.totalAmount }}</template>
          </el-table-column>
          <el-table-column label="支付方式" align="center">
            <template slot-scope="scope">
              <span v-if="scope.row.payType==1">微信</span>
              <span v-if="scope.row.payType==2">支付宝</span>
            </template>
          </el-table-column>
          <el-table-column label="订单来源" align="center">
            <template slot-scope="scope">
              <span v-if="scope.row.sourceType==0">PC订单</span>
              <span v-if="scope.row.sourceType==1">app订单</span>
            </template>
          </el-table-column>
          <el-table-column label="提交时间" align="center">
            <template slot-scope="scope">{{ scope.row.createTime }}</template>
          </el-table-column>
          <el-table-column label="状态" align="center">
            <template slot-scope="scope">
              <span v-if="scope.row.status==1">未付款</span>
              <span v-if="scope.row.status==2">已付款</span>
              <span v-if="scope.row.status==3">待退款（未退本金）</span>
              <span v-if="scope.row.status==4">待退款（未退补偿金）</span>
              <span v-if="scope.row.status==5">已退款（已退全部）</span>
              <span v-if="scope.row.status==6">关闭订单（已抽中）</span>
              <span v-if="scope.row.status==7">关闭订单（付款超时）</span>
              <span v-if="scope.row.status==8">关闭订单（退款异常）</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" width="250">
            <template slot-scope="scope">
              <el-button size="mini" @click="toDetail(scope.row.id)">查看订单</el-button>
              <el-button
                v-if="scope.row.status==4"
                @click="lookBackMoney(scope.row)"
                size="mini"
              >确认补偿退款</el-button>
            </template>
          </el-table-column>
        </el-table>
        <zg-pagination @change="changePage" :total="total" :size="searchForm.pageSize"></zg-pagination>
        <el-dialog
          title="确认补偿退款信息"
          :visible.sync="dialogVisible"
          width="30%"
          :before-close="handleClose"
        >
          <el-form class="form-box" size="small" label-width="140px">
            <el-form-item label="应退金额：">
              <span>{{refundAmount}}</span>
            </el-form-item>
          </el-form>
          <el-form class="form-box" size="small" label-width="140px">
            <el-form-item label="实退金额：">
              <el-input :min="0" v-model="realAmount"></el-input>
            </el-form-item>
          </el-form>

          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="confuseBackMoney()">确 定</el-button>
          </span>
        </el-dialog>
      </el-card>
    </div>
  </div>
</template>

<script>
import list from "@/mixins/list";
import { fetchList, downLoad, lookBackingMoney } from "@/api/preOrder";

let defaultSearchForm = {
  pageNum: 1,
  pageSize: 10,
  name: "",
  phone: "",
  activityId: ""
};
export default {
  mixins: [list],

  data() {
    return {
      searchForm: Object.assign({}, defaultSearchForm),
      tableData: [
        {
          id: 1
        }
      ],
      total: 0,
      dialogVisible: false,
      refundAmount: null,
      realAmount: null,
      backRow: null
    };
  },
  created() {
    this.getData();
  },
  methods: {
    search() {
      this.getData();
    },
    handleResetSearch() {
      this.searchForm = Object.assign({}, defaultSearchForm);
    },
    async exportExcel() {
      downLoad(this.searchForm).then(res => {
        if (res) {
          const blob = new Blob([res.data]);
          var a = document.createElement("a");
          a.download = "退款表.xls";
          a.href = window.URL.createObjectURL(blob);
          a.click();
        }
      });
    },
    async getData() {
      let res = await fetchList(this.searchForm);
      if (res) {
        this.tableData = res.data.list;
        this.total = res.data.total;
      }
    },
    lookBackMoney(row) {
      this.dialogVisible = true;
      this.refundAmount = row.refundAmount;
      this.realAmount = row.realAmount;
      this.backRow = row;
    },
    async confuseBackMoney() {
      let params = {
        id: this.backRow.id,
        returnRecoupAmount: this.realAmount-0
      };
      let res = await lookBackingMoney(params);
      if (res) {
        this.$message({
          type: "success",
          message: "修改成功!"
        });
        this.dialogVisible = false;
        this.getData();
      }
    },
    toDetail(id) {
      this.$router.push({
        path: "/preOrder/preOrderDetail",
        query: {
          id: id
        }
      });
    },
    changePage(pageNum, pageSize) {
      this.searchForm.pageNum = pageNum;
      this.searchForm.pageSize = pageSize;
      this.getData();
    },
    handleClose(done) {
      done();
    }
  }
};
</script>

<style lang="scss" scoped>
.btn-box {
  display: flex;
  flex-direction: row;
  background-color: red;
}
.backInput {
  display: flex;
  flex-direction: row;
}
</style>