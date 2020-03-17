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
        <el-form-item label="用户名称">
          <el-input v-model="searchForm.username" placeholder="用户名称"></el-input>
        </el-form-item>
        <el-form-item label="用户账号">
          <el-input v-model="searchForm.phone" placeholder="用户账号"></el-input>
        </el-form-item>
      </el-form>
    </el-card>
    <div class="table-container">
      <el-card>
        <el-table :data="tableData" border>
          <el-table-column label="序号" align="center">
            <template
              slot-scope="scope"
            >{{ (searchForm.pageNum-1)*searchForm.pageSize + scope.$index +1 }}</template>
          </el-table-column>
          <el-table-column label="用户名称" align="center">
            <template slot-scope="scope">{{ scope.row.username }}</template>
          </el-table-column>
          <el-table-column label="注册手机号码" align="center">
            <template slot-scope="scope">{{ scope.row.phone }}</template>
          </el-table-column>
          <el-table-column label="订单数" align="center">
            <template slot-scope="scope">
              <span class="pointer" @click="allOrder(scope.row)">{{ scope.row.orderCount}}</span>
            </template>
          </el-table-column>
          <el-table-column label="收货地址" align="center">
            <template slot-scope="scope">
              <span
                class="pointer"
                @click="allAddress(scope.row)"
              >{{ scope.row.receiveAddressCount }}</span>
            </template>
          </el-table-column>
          <el-table-column label="最近登录时间" align="center">
            <template slot-scope="scope">{{ scope.row.lastLoginTime }}</template>
          </el-table-column>
          <el-table-column label="状态" align="center">
            <template slot-scope="scope">
              <el-switch
                @change="handleUpdateStatus(scope.$index, scope.row)"
                :active-value="1"
                :inactive-value="0"
                v-model="scope.row.status"
              ></el-switch>
            </template>
          </el-table-column>
        </el-table>
        <zg-pagination @change="changePage" :total="total" :size="searchForm.pageSize"></zg-pagination>
        <el-dialog :visible.sync="orderVisible" width="50%" :before-close="handleClose">
          <el-table :data="omsOrderList" border>
            <el-table-column label="订单编号" align="center">
              <template slot-scope="scope">{{ scope.row.orderSn }}</template>
            </el-table-column>
            <el-table-column label="订单类型" align="center">
              <template slot-scope="scope">
                <span v-if="scope.row.orderType==0">正常订单</span>
                <span v-if="scope.row.orderType==2">预约订单</span>
              </template>
            </el-table-column>
            <el-table-column label="订单状态" align="center">
              <template slot-scope="scope">{{scope.row.status | formatStatus}}</template>
            </el-table-column>
            <el-table-column label="下单时间" align="center">
              <template slot-scope="scope">{{scope.row.createTime}}</template>
            </el-table-column>
          </el-table>
        </el-dialog>
        <el-dialog :visible.sync="addressVisible" width="50%" :before-close="handleClose">
          <el-table :data="addressList" border>
            <el-table-column label="收货人" align="center">
              <template slot-scope="scope">{{ scope.row.name }}</template>
            </el-table-column>
            <el-table-column label="所在地区" align="center">
              <template
                slot-scope="scope"
              >{{scope.row.province}}{{scope.row.city}}{{scope.row.region}}</template>
            </el-table-column>
            <el-table-column label="详细地址" align="center">
              <template
                slot-scope="scope"
              >{{scope.row.province}}{{scope.row.city}}{{scope.row.region}}{{scope.row.detailAddress}}</template>
            </el-table-column>
            <el-table-column label="手机号码" align="center">
              <template slot-scope="scope">{{scope.row.phoneNumber}}</template>
            </el-table-column>
            <el-table-column label="是否默认" align="center">
              <template slot-scope="scope">
                <span v-if="scope.row.defaultStatus==0">否</span>
                <span v-if="scope.row.defaultStatus==1">是</span>
              </template>
            </el-table-column>
          </el-table>
        </el-dialog>
      </el-card>
    </div>
  </div>
</template>

<script>
import list from "@/mixins/list";
import {
  fetchList,
  patchStatus,
  getOrderList,
  getAddressList
} from "@/api/user";

let defaultSearchForm = {
  pageNum: 1,
  pageSize: 10,
  username: "",
  phone: null
};
export default {
  mixins: [list],

  data() {
    return {
      searchForm: Object.assign({}, defaultSearchForm),
      tableData: [],
      total: null,
      addressList: [],
      omsOrderList: [],
      orderVisible: false,
      addressVisible: false
    };
  },
  created() {
    this.getData();
  },
  filters: {
    formatStatus(value) {
      if (value === 1) {
        return "待发货";
      } else if (value === 2) {
        return "已发货";
      } else if (value === 3) {
        return "已完成";
      } else if (value === 4) {
        return "已关闭";
      } else if (value === 5) {
        return "无效订单";
      } else {
        return "待付款";
      }
    }
  },
  methods: {
    async allAddress(row) {
      let res = await getAddressList(row);
      if (res) {
        this.addressVisible = true;
        this.addressList = res.data;
      }
    },
    async allOrder(row) {
      let res = await getOrderList(row);
      if (res) {
        this.orderVisible = true;
        this.omsOrderList = res.data;
      }
    },
    handleClose(done) {
      done();
    },
    changePage(pageNum, pageSize) {
      this.searchForm.pageNum = pageNum;
      this.searchForm.pageSize = pageSize;
      this.getData();
    },
    async getData() {
      let res = await fetchList(this.searchForm);
      if (res) {
        this.tableData = res.data.list;
        this.total = res.data.total;
      }
    },
    search() {
      if (!this.searchForm.phone) {
        this.searchForm.phone = null;
      }
      this.getData();
    },
    handleResetSearch() {
      this.searchForm = Object.assign({}, defaultSearchForm);
    },
    async switchStatus(row) {
      let res = await patchStatus(row);
      if (res) {
        this.$message({
          type: "success",
          message: "修改成功!"
        });
      } else {
        this.getData();
      }
    },
    handleUpdateStatus(index, row) {
      let text;
      if (row.status == 0) {
        text = "是否下架该用户会员？";
      } else {
        text = "是否上架该用户会员";
      }
      this.$confirm(text, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.switchStatus(row);
        })
        .catch(() => {
          this.getData();
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.pointer {
  cursor: pointer;

  color: blue;
}
</style>