<template>
  <div class="zg-pagination">
    <el-pagination
      :style="{ float: align }"
      background
      :page-sizes="[10, 20, 30]"
      :page-size="pageSize"
      :layout="layout"
      :total="total"
      @size-change="getSize"
      @current-change="getChange"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  name: "zg-pagination",
  props: {
    align: {
      type: String,
      default: "right"
    },
    layout: {
      type: String,
      default: "total, sizes,prev, pager, next,jumper"
    },
    total: {
      type: Number,
      default: 0
    },
    size: {
      type: Number,
      default: 10
    }
  },
  data() {
    return {
      current: 1,
      pageSize: 10
    };
  },
  methods: {
    getSize(val) {
      // 每页条数size
      this.pageSize = val;
      this.$emit("change", this.current, val);
    },
    getChange(val) {
      // 当前页
      this.current = val;
      this.$emit("change", val, this.pageSize);
    }
  },
  created() {
    this.pageSize = this.size;
  }
};
</script>

<style lang="scss" scoped>
.zg-pagination {
  padding: 20px 0;
  overflow: hidden;
}
</style>
