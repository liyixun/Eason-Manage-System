<template>
  <div>
    <div class="form-box">
      <el-form ref="form" :inline="true" :model="form" label-width="100px" class="demo-form-inline">
        <el-form-item label="所在城市">
          <city-selector :is-multiple-model="true" :city-result="cityResult"
                         @on-result-change="getResultFromCitySelector"
                         v-on:listenToChildEvent="showResultFromComponent"></city-selector>
        </el-form-item>
        <el-form-item label="仓库类型">
          <type-selector :result-obj="warehouseResultObj" :label-text="'仓库类型'" :is-multiple-model="true"
                         :select-item-list="warehouseTypeList"></type-selector>
        </el-form-item>
        <el-form-item label="仓库地面">
          <type-selector :result-obj="warehouseFloorResultObj" :label-text="'地面类型'" :is-multiple-model="true"
                         :select-item-list="warehouseFloorTypeList" :default-option-size="2"></type-selector>
        </el-form-item>
        <el-form-item label="可租面积">
          <range-selector :label-text="'可租面积'" :unit-text="'平'"></range-selector>
        </el-form-item>
        <el-form-item label="仓库高度">
          <range-selector :label-text="'仓库高度'" :unit-text="'米'" :max-num="10" :min-num="3"
                          :range-step="0.1"></range-selector>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="queryWarehouse">搜索</el-button>
        </el-form-item>
        <el-form-item>
          <el-button>重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="result-view">
      <div class="result-header">
        <span>推荐仓库</span>
      </div>
      <div class="btn-group-area">
        <el-radio-group v-model="selectedRegion">
          <el-radio-button label="华东"></el-radio-button>
          <el-radio-button label="华南"></el-radio-button>
          <el-radio-button label="华中"></el-radio-button>
          <el-radio-button label="华北"></el-radio-button>
          <el-radio-button label="西南"></el-radio-button>
        </el-radio-group>
      </div>
      <div class="result-list-view">
        <div class="content-cell" v-for="warehouse in warehouseList">
          <img :src="warehouse.pictureUrl" alt="">
          <div class="content-detail-info">
            <div class="first-row">
              <span class="price-text pull-left">￥<span class="perPrice">{{warehouse.rentalUnitPrice}}</span>{{warehouse.rentalUnit}}</span>
              <span class="warehouse-type pull-right">{{warehouse.warehoserType}}</span>
            </div>
            <div class="second-row">
              <span class="pull-left">{{warehouse.goodsName}}</span>
            </div>
            <div class="third-row">
              <span class="pull-left">起租：{{warehouse.rentalAre/100}}㎡</span>
              <span class="pull-right">可租：{{warehouse.leasingArea/100}}㎡</span>
            </div>
            <div class="fourth-row">
              <span v-show="warehouse.partner" class="partner-flag pull-left">联盟伙伴</span>
              <span class="pull-right address-info">{{warehouse.city}}/{{warehouse.district}}</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
  import CitySelector from './CitySelector.vue'
  import service from '../axios'
  import TypeSelector from './TypeSelector.vue'
  import RangeSelector from './RangeSelector.vue'
  export default {
    data () {
      return {
        form: {},
        warehouseResultObj: {},
        warehouseFloorResultObj: {},
        warehouseTypeList: [],
        warehouseFloorTypeList: [],
        cityResult: [],
        selectedRegion: '华东',
        warehouseList: []
      }
    },
    methods: {
      findAllWarehouseType(){
        service.findAllWarehouseType({}).then(resp => {
          this.warehouseTypeList = resp.data;
        });
      },
      findAllWarehouseFloorType(){
        service.findAllWarehouseFloorType({}).then(resp => {
          this.warehouseFloorTypeList = resp.data;
        });
      },
      queryWarehouse(){
        console.log(this.cityResult);
        console.log(this.warehouseResultObj);
        let params = {
          region: this.selectedRegion,
          cityList: this.cityResult,
          warehouseTypeList: this.warehouseResultObj.valueList
        };
        service.queryWarehouse(params).then(resp => {
          console.log(resp);
          this.warehouseList = resp.data;
        });
      },
      showResultFromComponent(data){
        console.log(data);
      },
      getResultFromCitySelector(val){
        this.cityResult = val;
        console.log('LogList.vue', val);
      }
    },
    mounted(){
      this.findAllWarehouseType();
      this.findAllWarehouseFloorType();
      this.queryWarehouse();
    },
    components: {
      CitySelector,
      TypeSelector,
      RangeSelector
    }
  }
</script>
<style lang="less">
  @import "../style/mixin.less";
  .form-box {
    padding-top: 20px;
    background: #f5f5f5;
  }
  .result-view{
    margin: 20px 30px;
    background: #f5f5f5;
    .result-header{
      display: flex;
      border-left: 2px blue solid;
      span{
        .sc(20px, #333);
        line-height: 30px;
        margin-left: 10px;
      }
    }
    .btn-group-area{
      background-color: #fcfcfc;
      line-height: 1.5;
      padding-top: 5px;
      display: flex;
      margin-bottom: 10px;
    }
    .result-list-view{
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      .content-cell{
        .wh(230px, 260px);
        background-color: #fcfcfc;
        margin-bottom: 10px;
        flex-direction: column;
        display: flex;
        img {
          .wh(230px, 134px);
        }
        .content-detail-info {
          flex: 1;
          padding: 10px;
          .first-row {
            height: 24px;
            .price-text{
              .sc(14px, #ff4600);
              line-height: 24px;
              .perPrice{
                font-size: 24px;
                margin-left: 2px;
                margin-right: 2px;
              }
            }
            .warehouse-type {
              .sc(12px, #999);
              line-height: 24px;
              text-align: end;
            }
          }
          .second-row{
            height: 18px;
            width: 100%;
            margin-top: 8px;
            margin-bottom: 5px;
            span{
              .sc(12px, #222);
              width: 100%;
              text-align: left;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
          }
          .third-row {
            width: 100%;
            height: 18px;
            display: inline-block;
            span{
              .sc(12px, #999);
            }
          }
          .fourth-row {
            width: 100%;
            height: 18px;
            .partner-flag {
              background: #06f;
              text-align: center;
              .sc(10px, #fff);
              padding-left: 2px;
              padding-right: 2px;
              font-weight:200;
            }
            .address-info{
              .sc(12px, #999);
            }
          }
        }
      }
    }
  }
</style>
