<template>
  <el-card class="form-container" shadow="never">
    <el-steps :active="active" finish-status="success" align-center>
      <el-step title="填写商品信息"></el-step>
      <el-step title="填写商品促销"></el-step>
      <el-step title="填写商品属性"></el-step>
      <!-- <el-step title="选择商品关联"></el-step> -->
    </el-steps>
    <product-info-detail
      v-show="showStatus[0]"
      v-model="productParam"
      :is-edit="isEdit"
      @nextStep="nextStep"
    ></product-info-detail>
    <product-sale-detail
      v-show="showStatus[1]"
      v-model="productParam"
      :is-edit="isEdit"
      @nextStep="nextStep"
      @prevStep="prevStep"
    ></product-sale-detail>
    <product-attr-detail
      v-show="showStatus[2]"
      v-model="productParam"
      :is-edit="isEdit"
      @nextStep="nextStep"
      @prevStep="prevStep"
      @finishCommit="finishCommit"
    ></product-attr-detail>
    <product-relation-detail
      v-show="showStatus[3]"
      v-model="productParam"
      :is-edit="isEdit"
      @prevStep="prevStep"
      @finishCommit="finishCommit"
    ></product-relation-detail>
  </el-card>
</template>
<script>
import ProductInfoDetail from "./ProductInfoDetail";
import ProductSaleDetail from "./ProductSaleDetail";
import ProductAttrDetail from "./ProductAttrDetail";
import ProductRelationDetail from "./ProductRelationDetail";
import { createProduct, getProduct, updateProduct } from "@/api/product";

const defaultProductParam = {
  //第一步参数
  productCategoryId: null,
  name: "",
  subTitle: "",
  brandId: null,
  description: "",
  productSn: "",
  price: 0,
  originalPrice: 0,
  stock: 0,
  unit: "",
  weight: 0,
  sort: 0,
  authorId: null,
  authorName: "",
  designNote: "",
  designPic: "",
  threedUrl: "",
  threedPicUrl: "",
  simSourceUrl: "",
  fullSourceUrl: "",
  featureUrl: "",

  // 第二步参数
  giftPoint: 0,
  giftGrowth: 0,
  usePointLimit: 0,
  previewStatus: 0,
  publishStatus: 0,
  newStatus: 0,
  recommandStatus: 0,
  serviceIds: "",
  detailTitle: "",
  detailDesc: "",
  keywords: "",
  note: "",
  promotionType: 0,
  promotionStartTime: "",
  promotionEndTime: "",
  promotionPrice: null,

  // 会员价格{memberLevelId: 0,memberPrice: 0,memberLevelName: null}
  memberPriceList: [],

  // 商品阶梯价格
  productLadderList: [{ count: 0, discount: 0, price: 0 }],

  // 商品满减
  productFullReductionList: [{ fullPrice: 0, reducePrice: 0 }],

  //第三步参数
  productAttributeCategoryId: null,

  // 商品sku库存信息{lowStock: 0, pic: '', price: 0, sale: 0, skuCode: '', sp1: '', sp2: '', sp3: '', stock: 0}
  skuStockList: [],
  pic: "",
  detailHtml: "",
  detailMobileHtml: "",

  // 商品属性相关{productAttributeId: 0, value: ''}
  productAttributeValueList: [],

  hasSku: null,
  //第四步参数

  // 商品相关专题{subjectId: 0}
  subjectProductRelationList: [],

  // 商品相关优选{prefrenceAreaId: 0}
  prefrenceAreaProductRelationList: [],

  //非提交字段
  brandName: "",
  albumPics: "",
  deleteStatus: 0,
  feightTemplateId: 0,
  flashPromotionCount: 0,
  flashPromotionId: 0,
  flashPromotionPrice: 0,
  flashPromotionSort: 0,
  lowStock: 0,

  productCategoryName: "",
  promotionPerLimit: 0,
  sale: 0,

  verifyStatus: 0
};
export default {
  name: "ProductDetail",
  components: {
    ProductInfoDetail,
    ProductSaleDetail,
    ProductAttrDetail,
    ProductRelationDetail
  },
  props: {
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      active: 0,
      productParam: Object.assign({}, defaultProductParam),
      showStatus: [true, false, false, false]
    };
  },
  created() {
    if (this.isEdit) {
      getProduct(this.$route.query.id).then(response => {
        this.productParam = response.data;
      });
    }
  },
  methods: {
    hideAll() {
      for (let i = 0; i < this.showStatus.length; i++) {
        this.showStatus[i] = false;
      }
    },
    prevStep() {
      if (this.active > 0 && this.active < this.showStatus.length) {
        this.active--;
        this.hideAll();
        this.showStatus[this.active] = true;
      }
    },
    nextStep() {
      if (this.active < this.showStatus.length - 1) {
        this.active++;
        this.hideAll();
        this.showStatus[this.active] = true;
      }
    },
    finishCommit(isEdit) {
      this.$confirm("是否要提交该产品", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        if (isEdit) {
          updateProduct(this.$route.query.id, this.productParam).then(
            response => {
              if (response) {
                this.$message({
                  type: "success",
                  message: "提交成功",
                  duration: 1000
                });
                this.$router.back();
              }
            }
          );
        } else {
          createProduct(this.productParam).then(response => {
            if (response) {
              this.$message({
                type: "success",
                message: "提交成功",
                duration: 1000
              });
              this.$router.back();
            }
          });
        }
      });
    }
  }
};
</script>
<style>
.form-container {
  width: 800px;
}
</style>
