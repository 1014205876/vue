<template>
  <div class="app-container">
    <el-card class="filter-container" shadow="never">
      <div>
        <i class="el-icon-search"></i>
        <span>筛选搜索</span>
        <el-button
          style="float: right"
          @click="handleSearchList()"
          type="primary"
          size="small"
          >查询结果</el-button
        >
      </div>
      <div style="margin-top: 15px">
        <el-form
          :inline="true"
          :model="listQuery"
          size="small"
          label-width="140px"
        >
          <el-form-item label="输入搜索：">
            <el-input
              style="width: 203px"
              v-model="listQuery.keyword"
              placeholder="品牌名称/关键字"
            ></el-input>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <span>数据列表</span>
      <el-button
        class="btn-add"
        @click="$routerLink('/pms/addBrand', 'add')"
        size="mini"
        >添加</el-button
      >
    </el-card>
    <div class="table-container">
      <el-table
        ref="brandTable"
        :data="list"
        style="width: 100%"
        @selection-change="handleSelectionChange"
        v-loading="listLoading"
        border
      >
        <el-table-column
          type="selection"
          width="60"
          align="center"
        ></el-table-column>
        <el-table-column label="编号" width="100" align="center">
          <template slot-scope="scope">{{ scope.row.id }}</template>
        </el-table-column>
        <el-table-column label="品牌名称" align="center">
          <template slot-scope="scope">{{ scope.row.name }}</template>
        </el-table-column>
        <el-table-column label="品牌首字母" width="100" align="center">
          <template slot-scope="scope">{{ scope.row.firstLetter }}</template>
        </el-table-column>
        <el-table-column label="排序" width="100" align="center">
          <template slot-scope="scope">{{ scope.row.sort }}</template>
        </el-table-column>
        <el-table-column label="品牌制造商" width="100" align="center">
          <template slot-scope="scope">
            <el-switch
              @change="handleFactoryStatusChange(scope.$index, scope.row)"
              :active-value="1"
              :inactive-value="0"
              v-model="scope.row.factoryStatus"
            ></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="是否显示" width="100" align="center">
          <template slot-scope="scope">
            <el-switch
              @change="handleShowStatusChange(scope.$index, scope.row)"
              :active-value="1"
              :inactive-value="0"
              v-model="scope.row.showStatus"
            ></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="相关" width="220" align="center">
          <template slot-scope="scope">
            <span>商品：</span>
            <el-button
              size="mini"
              type="text"
              @click="getProductList(scope.$index, scope.row)"
              >100</el-button
            >
            <span>评价：</span>
            <el-button
              size="mini"
              type="text"
              @click="getProductCommentList(scope.$index, scope.row)"
              >1000</el-button
            >
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200" align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="
                $routerLink('/pms/updateBrand', 'update', { id: scope.row.id })
              "
              >编辑</el-button
            >
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="batch-operate-container">
      <el-select size="small" v-model="operateType" placeholder="批量操作">
        <el-option
          v-for="item in operates"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <el-button
        style="margin-left: 20px"
        class="search-button"
        @click="handleBatchOperate()"
        type="primary"
        size="small"
        >确定</el-button
      >
    </div>
    <zg-pagination @change="getPage" :total="total"></zg-pagination>
  </div>
</template>
<script>
import {
  fetchList,
  updateShowStatus,
  updateFactoryStatus,
  deleteBrand
} from '@/api/brand'
import list from '@/mixins/list'

const defaultListQuery = {
  keyword: null,
  pageNum: 1,
  pageSize: 5
}

export default {
  name: 'brandList',
  mixins: [list],
  data() {
    return {
      operates: [
        {
          label: '显示品牌',
          value: 'showBrand'
        },
        {
          label: '隐藏品牌',
          value: 'hideBrand'
        }
      ],
      operateType: null,
      listQuery: Object.assign({}, defaultListQuery)
    }
  },
  created() {
    this.getList(fetchList, this.listQuery)
  },
  methods: {
    handleDelete(index, row) {
      this.$confirm('是否要删除该品牌', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteBrand(row.id).then(response => {
          this.$successMessage('删除成功')
          this.getList(fetchList, this.listQuery)
        })
      })
    },
    getProductList(index, row) {
      console.log(index, row)
    },
    getProductCommentList(index, row) {
      console.log(index, row)
    },
    handleFactoryStatusChange(index, row) {
      var data = new URLSearchParams()
      data.append('ids', row.id)
      data.append('factoryStatus', row.factoryStatus)
      updateFactoryStatus(data)
        .then(response => {
          this.$successMessage('修改成功')
        })
        .catch(error => {
          if (row.factoryStatus === 0) {
            row.factoryStatus = 1
          } else {
            row.factoryStatus = 0
          }
        })
    },
    handleShowStatusChange(index, row) {
      let data = new URLSearchParams()
      data.append('ids', row.id)
      data.append('showStatus', row.showStatus)
      updateShowStatus(data)
        .then(response => {
          this.$successMessage('修改成功')
        })
        .catch(error => {
          if (row.showStatus === 0) {
            row.showStatus = 1
          } else {
            row.showStatus = 0
          }
        })
    },

    handleBatchOperate() {
      if (!this.batchStatus) {
        this.$warnMessage('请选择一条记录')
        return
      }
      let showStatus = 0
      if (this.operateType === 'showBrand') {
        showStatus = 1
      } else if (this.operateType === 'hideBrand') {
        showStatus = 0
      } else {
        this.$warnMessage('请选择批量操作类型')
        return
      }
      let ids = []
      for (let i = 0; i < this.multipleSelection.length; i++) {
        ids.push(this.multipleSelection[i].id)
      }
      let data = new URLSearchParams()
      data.append('ids', ids)
      data.append('showStatus', showStatus)
      updateShowStatus(data).then(response => {
        this.getList(fetchList, this.listQuery)

        this.$successMessage('修改成功')
      })
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped></style>
