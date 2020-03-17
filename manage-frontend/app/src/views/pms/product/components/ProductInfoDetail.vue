<template>
  <div style="margin-top: 50px">
    <el-form
      :model="value"
      :rules="rules"
      ref="productInfoForm"
      label-width="120px"
      style="width: 600px"
      size="small"
    >
      <el-form-item label="商品分类：" prop="productCategoryId">
        <el-cascader v-model="selectProductCateValue" :options="productCateOptions"></el-cascader>
      </el-form-item>
      <el-form-item label="商品名称：" prop="name">
        <el-input v-model="value.name"></el-input>
      </el-form-item>
      <el-form-item label="副标题：" prop="subTitle">
        <el-input v-model="value.subTitle"></el-input>
      </el-form-item>
      <!-- <el-form-item label="商品品牌：" prop="brandId">
        <el-select v-model="value.brandId" @change="handleBrandChange" placeholder="请选择品牌">
          <el-option
            v-for="item in brandOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>-->
      <el-form-item label="商品介绍：" prop="description">
        <el-input :autoSize="true" v-model="value.description" type="textarea" placeholder="请输入内容"></el-input>
      </el-form-item>
      <el-form-item label="商品货号：">
        <el-input type="number" v-model="value.productSn"></el-input>
      </el-form-item>
      <el-form-item label="商品售价：">
        <el-input type="number" v-model="value.price"></el-input>
      </el-form-item>
      <el-form-item label="市场价：">
        <el-input type="number" v-model="value.originalPrice"></el-input>
      </el-form-item>
      <el-form-item label="商品库存：">
        <el-input type="number" v-model="value.stock"></el-input>
      </el-form-item>
      <el-form-item label="计量单位：">
        <el-input v-model="value.unit"></el-input>
      </el-form-item>
      <el-form-item label="商品重量：">
        <el-input min="1" type="number" v-model="value.weight" style="width: 300px"></el-input>
        <span style="margin-left: 20px">克</span>
      </el-form-item>
      <el-form-item label="排序：">
        <el-input min="1" type="number" v-model="value.sort"></el-input>
      </el-form-item>

      <el-form-item label="作者信息：" prop="authorId">
        <el-select v-model="value.authorId" @change="handleBrandChange" placeholder="请选择作者">
          <el-option
            v-for="item in authorOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="设计理念：" prop="designNote">
        <el-card shadow="never" class="cardBg">
          <el-form-item label="设计说明：" prop="designNote">
            <el-input v-model="value.designNote" type="textarea"></el-input>
          </el-form-item>
          <el-form-item label="说明图例：" prop="designPic">
            <multi-upload v-model="value.designPic"></multi-upload>
          </el-form-item>
        </el-card>
      </el-form-item>
      <el-form-item label="作品全景图：">
        <el-card shadow="never" class="cardBg">
          <el-form-item label="全景图：">
            <multi-upload v-model="value.threedPicUrl"></multi-upload>
          </el-form-item>
          <el-form-item label="全景图链接：">
            <el-input :disable="true" v-model="value.threedUrl"></el-input>
          </el-form-item>
        </el-card>
      </el-form-item>
      <el-form-item label="作品溯源：">
        <el-card shadow="never" class="cardBg">
          <el-form-item label="溯源短片地址：">
            <el-input v-model="value.simSourceUrl"></el-input>
          </el-form-item>
          <el-form-item label="全片地址：">
            <el-input v-model="value.fullSourceUrl"></el-input>
          </el-form-item>
        </el-card>
      </el-form-item>
      <!-- <el-form-item label="制作工艺说明：">
        <el-card shadow="never" class="cardBg">
          <el-form-item label="工艺名称：">
            <el-input v-model="value.sort"></el-input>
          </el-form-item>
          <el-form-item label="工艺图片：">
            <multi-upload
              v-model="value.prefrenceAreaProductRelationList"
            ></multi-upload>
          </el-form-item>
          <el-form-item label="工艺说明：">
            <el-input v-model="value.sort" type="textarea"></el-input>
          </el-form-item>
        </el-card>
      </el-form-item>-->

      <el-form-item label="特点说明：">
        <el-card shadow="never" class="cardBg">
          <el-form-item label="特点图片：">
            <multi-upload v-model="value.featureUrl"></multi-upload>
          </el-form-item>
          <!-- <div slot="header" style="display:flex;justify-content:flex-end;">
            <el-button>添加</el-button>
          </div>
          <div v-for="(item, index) in specialNotice" :key="index">
            <el-form-item label="特点名称：">
              <el-input v-model="specialNotice[index].name"></el-input>
            </el-form-item>
            <el-form-item label="特点说明：">
              <el-input v-model="specialNotice[index].name" type="textarea"></el-input>
            </el-form-item>
            <el-form-item label="特点图片：">
              <multi-upload v-model="specialNotice[index].pic"></multi-upload>
              <div style="display:flex;justify-content:flex-end;">
                <el-button style="text-align:right">删除</el-button>
              </div>
            </el-form-item>
          </div>-->
        </el-card>
      </el-form-item>
      <el-form-item style="text-align: center">
        <el-button type="primary" size="medium" @click="handleNext('productInfoForm')">下一步，填写商品促销</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { fetchListWithChildren } from "@/api/productCate";
import { fetchList as fetchBrandList } from "@/api/brand";
import { getProduct } from "@/api/product";
import { fetchList as getAuthorList } from "@/api/author";
import MultiUpload from "@/components/Upload/multiUpload";
import rules from "@/rules";

export default {
  name: "ProductInfoDetail",
  components: { MultiUpload },
  props: {
    value: Object,
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      pic: "",
      hasEditCreated: false,
      // 选中商品分类的值
      selectProductCateValue: [],
      productCateOptions: [],
      brandOptions: [],
      authorOptions: [],
      rules: {
        name: [rules.required("请输入商品名称"), rules.len(2, 140)],
        subTitle: [rules.required("请输入商品副标题")],
        productCategoryId: [rules.required("请选择商品分类")],
        brandId: [rules.required("请选择商品品牌")],
        authorId: [rules.required("请选择作者(瓷人)")],
        designNote: [rules.required("请输入设计说明")],
        designPic: [rules.required("请上传说明图例")]
      }
    };
  },
  created() {
    this.getProductCateList();
    this.getBrandList();
    this.getAuthor();
  },
  computed: {
    // 商品的编号
    productId() {
      return this.value.id;
    }
  },
  watch: {
    productId: function(newValue) {
      if (!this.isEdit) return;
      if (this.hasEditCreated) return;
      if (newValue === undefined || newValue == null || newValue === 0) return;
      this.handleEditCreated();
    },
    selectProductCateValue: function(newValue) {
      if (newValue != null && newValue.length === 2) {
        this.value.productCategoryId = newValue[1];
        this.value.productCategoryName = this.getCateNameById(
          this.value.productCategoryId
        );
      } else {
        this.value.productCategoryId = null;
        this.value.productCategoryName = null;
      }
    },
    value: {
      handler() {
        if (this.value.price - 0 < 0) {
          this.value.price = 0;
        }
        if (this.value.originalPrice - 0 < 0) {
          this.value.originalPrice = 0;
        }
        if (this.value.stock - 0 < 0) {
          this.value.stock = 0;
        }
        if (this.value.weight - 0 < 0) {
          this.value.weight = 0;
        }
        if (this.value.productSn - 0 < 0) {
          this.value.productSn = 0;
        }
        if (this.value.sort - 0 < 0) {
          this.value.sort = 0;
        }
      },
      deep: true
    }
  },
  methods: {
    // 处理编辑逻辑
    handleEditCreated() {
      if (this.value.productCategoryId != null) {
        this.selectProductCateValue.push(this.value.cateParentId);
        this.selectProductCateValue.push(this.value.productCategoryId);
      }
      this.hasEditCreated = true;
    },
    // 获取并格式化商品分类信息 -满足cascade的参数
    getProductCateList() {
      fetchListWithChildren().then(response => {
        let list = response.data;
        this.productCateOptions = [];
        for (let i = 0; i < list.length; i++) {
          let children = [];
          if (list[i].children != null && list[i].children.length > 0) {
            for (let j = 0; j < list[i].children.length; j++) {
              children.push({
                label: list[i].children[j].name,
                value: list[i].children[j].id
              });
            }
          }
          this.productCateOptions.push({
            label: list[i].name,
            value: list[i].id,
            children: children
          });
        }
      });
    },
    // 获取并格式化商品品牌信息
    getBrandList() {
      fetchBrandList({ pageNum: 1, pageSize: 100 }).then(response => {
        this.brandOptions = [];
        let brandList = response.data.list;
        for (let i = 0; i < brandList.length; i++) {
          this.brandOptions.push({
            label: brandList[i].name,
            value: brandList[i].id
          });
        }
      });
    },
    //获取作者 新增
    getAuthor() {
      getAuthorList({ pageNum: 1, pageSize: 100 }).then(response => {
        let authorList = [];
        response.data.list.forEach(item => {
          if (item.publishStatus == 1) {
            authorList.push(item);
          }
        });
        for (let i = 0; i < authorList.length; i++) {
          this.authorOptions.push({
            label: authorList[i].userName,
            value: authorList[i].id
          });
        }
      });
    },
    getCateNameById(id) {
      let name = null;
      for (let i = 0; i < this.productCateOptions.length; i++) {
        for (let j = 0; j < this.productCateOptions[i].children.length; j++) {
          if (this.productCateOptions[i].children[j].value === id) {
            name = this.productCateOptions[i].children[j].label;
            return name;
          }
        }
      }
      return name;
    },
    handleNext(formName) {
      let designPic = JSON.parse(this.value.designPic);
      if (!designPic.length) {
        this.value.designPic = null;
      }
        this.$refs[formName].validate(valid => {
          if (valid) {
            this.$emit("nextStep");
          } else {
            this.$message({
              message: "验证失败",
              type: "error",
              duration: 1000
            });
            return false;
          }
        });
    },
    handleBrandChange(val) {
      let authorName = "";
      for (let i = 0; i < this.authorOptions.length; i++) {
        if (this.authorOptions[i].value === val) {
          authorName = this.authorOptions[i].label;
          break;
        }
      }
      this.value.authorName = authorName;
    }
  }
};
</script>

<style scoped></style>
