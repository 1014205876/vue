<template>
  <el-dialog title="订单跟踪" :visible.sync="visible" :before-close="handleClose" width="40%">
    <el-steps
      direction="vertical"
      :active="logisticsList.length"
      finish-status="success"
      space="50px"
    >
      <el-step v-for="item in logisticsList" :key="item.name" :title="item.name">
        <div slot="description" class="description">
          <span>{{item.time}}</span>
          <p style="color:#000">{{item.context}}</p>
        </div>
      </el-step>
    </el-steps>
  </el-dialog>
</template>
<script>
export default {
  name: "logisticsDialog",
  props: {
    value: Boolean,
    info: Array
  },
  computed: {
    visible: {
      get() {
        return this.value;
      },
      set(visible) {
        this.value = visible;
      }
    },
    logisticsList() {
      return this.info;
    }
  },
  data() {
    return {};
  },
  methods: {
    emitInput(val) {
      this.$emit("input", val);
    },
    handleClose() {
      this.emitInput(false);
    }
  }
};
</script>
<style></style>
