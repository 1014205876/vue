<template>
  <div>
    <el-upload
      action="/upload"
      list-type="picture-card"
      :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove"
      :on-success="uploadResult"
      :on-change="beforeUpload"
      :file-list="fileList"
      :limit="limit"
      :class="{disabled:hideUpload}"
    >
      <i class="el-icon-plus"></i>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt />
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: String
    },
    limit: {
      type: Number
    }
  },
  computed: {
    fileList() {
      if (this.value) {
        let list = JSON.parse(this.value);
        let outlist = list.map(item => {
          return { url: item };
        });
        return outlist;
      }
    }
  },
  data() {
    return {
      dialogImageUrl: "",
      dialogVisible: false,
      hideUpload: false
    };
  },
  methods: {
    handleRemove(file, fileList) {
      if (fileList.length >= this.limit) {
        this.hideUpload = true;
      } else {
        this.hideUpload = false;
      }
      let list = fileList.map(item => {
        return item.url;
      });
      this.pushFather(list);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    uploadResult(file, fileList1, fileList) {
      this.resovleList(fileList1, fileList);
    },
    beforeUpload(file, fileList) {
      if (fileList.length >= this.limit) {
        this.hideUpload = true;
      }
    },
    resovleList(fileList1, fileList) {
      let list = fileList.map(item => {
        if (item.response) {
          return item.response.location;
        } else {
          return item.url;
        }
      });
      this.pushFather(list);
    },
    pushFather(list) {
      let listString = JSON.stringify(list);
      this.$emit("input", listString);
    }
  }
};
</script>

<style lang="scss">
.disabled .el-upload--picture-card {
  display: none;
}
</style>