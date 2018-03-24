<template>
  <div class="city-selector">
    <input placeholder="请选择城市" style="width: 200px" class="form-control" v-on:focus="showSelectList=true" v-model="cityResultText" >
    <!--<input type="text" class="form-control" placeholder="请选择城市" v-on:focus="showSelectList=true" v-model="cityResultText" readonly>-->
    <div v-show="showSelectList" class="dropSelectedArea" @mouseleave="showSelectList=false">
      <el-row type="flex">
        <el-col :span="4">
          <div>
            <a @click="selectTypeFlag.showRegionSelect = !selectTypeFlag.showRegionSelect"><i
              :class="{'el-icon-caret-right': !selectTypeFlag.showRegionSelect, 'el-icon-caret-bottom': selectTypeFlag.showRegionSelect}"></i><span>所处区域</span></a>
          </div>
        </el-col>
      </el-row>
      <el-row type="flex" v-show="selectTypeFlag.showRegionSelect">
        <el-col :span="24">
          <el-checkbox-group v-model="selectCityRegions" @change="queryProvinceList">
            <el-checkbox v-for="region in regionList" :label="region.value" :key="region.key"></el-checkbox>
          </el-checkbox-group>
        </el-col>
      </el-row>
      <el-row type="flex">
        <el-col :span="4">
          <div>
            <a @click="selectTypeFlag.showProvinceType = !selectTypeFlag.showProvinceType"><i
              :class="{'el-icon-caret-right':!selectTypeFlag.showProvinceType, 'el-icon-caret-bottom':selectTypeFlag.showProvinceType}"></i><span>省份类型</span></a>
          </div>
        </el-col>
      </el-row>
      <el-row type="flex" v-show="selectTypeFlag.showProvinceType">
        <el-col :span="24">
          <el-checkbox-group v-model="selectProvinceTypes" @change="queryProvinceList">
            <el-checkbox v-for="provinceType in provinceTypeList" :label="provinceType.value"
                         :key="provinceType.key"></el-checkbox>
          </el-checkbox-group>
        </el-col>
      </el-row>
      <el-row type="flex"
              v-show="(selectProvinceTypes && selectProvinceTypes.length)||(selectCityRegions && selectCityRegions.length)">
        <el-col :span="4">
          <div>
            <a @click="selectTypeFlag.showCityProvince = !selectTypeFlag.showCityProvince"><i
              :class="{'el-icon-caret-right': !selectTypeFlag.showCityProvince, 'el-icon-caret-bottom': selectTypeFlag.showCityProvince}"></i><span>所属省份</span></a>
          </div>
        </el-col>
      </el-row>
      <el-row type="flex" v-show="selectTypeFlag.showCityProvince">
        <el-col :span="24">
          <el-checkbox-group v-model="selectProvinces" @change="queryCityList(selectProvinces)">
            <el-checkbox v-for="province in provinceList" :label="province" :key="province"></el-checkbox>
          </el-checkbox-group>
        </el-col>
      </el-row>

      <el-row type="flex" style="border-top: 5px solid #eeeeee;">
        <el-col :span="24">
          <el-input placeholder="查询城市名" v-model="filterKeyword"></el-input>
        </el-col>
      </el-row>

      <el-row type="flex" class="bottom-selector">
        <el-col :span="12" class="drop-city-list">
          <ul class="list-group " v-for="city in filterCityList">
            <li class="list-group-item text-primary" :class="{'bg-primary text-info':city.isSelected}"
                @click="city.isSelected = !city.isSelected" @dblclick="selectCity(city.cityName)"
                @click.shift="chosenCityBetweenSection(filterCityList, 'left', city.index)">
              {{city.cityName}}
            </li>
          </ul>
        </el-col>
        <el-col :span="12" class="drop-city-right">
          <div style="height: 100%;" class="select-city-area">
            <ul class="list-group" v-for="city in selectCityList">
              <li class="list-group-item text-primary" :class="{'bg-primary text-info':city.isSelected}"
                  @click="city.isSelected = !city.isSelected"
                  @click.shift="chosenCityBetweenSection(selectCityList, 'right', city.index)">{{city.cityName}}
              </li>
            </ul>
          </div>
        </el-col>
      </el-row>
      <el-row style="height: 35px;background-color: #F2F2F2">
        <el-col :span="12" style="border-right: 3px solid #4b73eb;">
          <a class="text-primary" @click="selectAll(filterCityList)">全选</a>
          <a class="text-primary" @click="reverseSelect(filterCityList)" style="margin-right: 5px">反选</a>
          <a class="text-primary" @click="chosenCityList(filterCityList)">添加到右边>></a>
        </el-col>
        <el-col :span="12">
          <a class="text-primary" @click="selectAll(selectCityList)">全选</a>
          <a class="text-primary" @click="reverseSelect(selectCityList)" style="margin-right: 5px">反选</a>
          <a class="text-primary" @click="clearChosenCityList()">清除选中</a>
        </el-col>
      </el-row>
      <el-row style="height: 35px;background-color: #F2F2F2">
        <el-col :span="12" style="border-right: 3px solid #4b73eb;">
          <span class="text-primary">共{{chosenInfo.totalCity}}个城市</span>
        </el-col>
        <el-col :span="12">
          <span class="text-primary">共选择了{{chosenInfo.chosenCity}}个城市</span>
          <button type="button" class="btn btn-primary btn-sm" @click="commitSelectCityResult()">提交</button>
          <button type="button" class="btn btn-default btn-sm" @click="closeSelector()">关闭</button>
        </el-col>
      </el-row>
    </div>

  </div>
</template>

<script>
  import service from '../axios'
  import _ from 'lodash'
  export default {
    name: 'citySelector',
    data () {
      return {
        selectTypeFlag: {
          showRegionSelect: false,
          showProvinceType: false,
          showCityProvince: false
        },
        chosenInfo: {
          totalCity: 0,
          chosenCity: 0
        },
        keyMapFlag: {
          leftSelectStartIndex: null,
          rightSelectStartIndex: null
        },
        filterKeyword: '',
        selectCityRegions: [],
        selectProvinceTypes: [],
        selectProvinces: [],
        showSelectList: false,
        regionList: [
          {
            key: 'HN',
            value: '华南'
          }, {
            key: 'HB',
            value: '华北'
          }, {
            key: 'HZ',
            value: '华中'
          }, {
            key: 'HD',
            value: '华东'
          }, {
            key: 'XB',
            value: '西北'
          }, {
            key: 'DB',
            value: '东北'
          }, {
            key: 'XN',
            value: '西南'
          }
        ],
        provinceTypeList: [
          {
            key: 'ZXS',
            value: '直辖市'
          }, {
            key: 'XZS',
            value: '行政省'
          }, {
            key: 'TBXZQ',
            value: '特别行政区'
          }, {
            key: 'ZZQ',
            value: '自治区'
          }
        ],
        provinceList: [],
        cityList: [],
        selectCityList: [],
        cityResultText: '',
        selectorCityResult: this.cityResult             //创建副本
      }
    },
    methods: {
      closeSelector(){
        this.showSelectList = false;
        this.keyMapFlag.leftSelectStartIndex = null;
        this.keyMapFlag.rightSelectStartIndex = null;
      },
      queryCityList(provinceList){
        let _this = this;
        let cityParams = {
          provinceList: provinceList
        };
        service.queryCityByProvinceList(cityParams).then(function (cityResp) {
          _this.cityList = [];
          _.forEach(cityResp.data, (city, index) => {
            let cityObj = {
              cityName: city,
              isSelected: false,
              index: index
            };
            _this.cityList.push(cityObj);
          });
          _this.chosenInfo.totalCity = _this.cityList.length
        });
      },
      selectCity(cityName){
        let city = {
          cityName: cityName,
          isSelected: false,
          index: this.selectCityList.length
        };
        this.selectCityList.push(city);
        this.selectCityList = _.uniq(this.selectCityList);
        this.chosenInfo.chosenCity = this.selectCityList.length;
        this.keyMapFlag.leftSelectStartIndex = null;
      },
      selectAll(cityList){
        _.forEach(cityList, (city) => {
          city.isSelected = true;
        });
      },
      reverseSelect(cityList){
        _.forEach(cityList, (city) => {
          city.isSelected = !city.isSelected;
        });
      },
      calculateListIndex(list){
        _.forEach(list, (item, index) => {
          item.index = index;
        });
      },
      chosenCityList(cityList){
        let _this = this;
        _.forEach(cityList, (city) => {
          if (city.isSelected) {
            let item = {
              cityName: city.cityName,
              isSelected: false,
              index: _this.selectCityList.length
            };
            _this.selectCityList.push(item);
          }
        });
        this.chosenInfo.chosenCity = this.selectCityList.length;
        this.keyMapFlag.leftSelectStartIndex = null;
        this.calculateListIndex(cityList);
      },
      chosenCityBetweenSection(cityList, flag, index){
        if (flag === 'left') {
          if (_.isNull(this.keyMapFlag.leftSelectStartIndex)) {
            this.keyMapFlag.leftSelectStartIndex = index;
            return;
          }
          if (_.isNumber(this.keyMapFlag.leftSelectStartIndex) && this.keyMapFlag.leftSelectStartIndex <= index) {
            let startIndex = this.keyMapFlag.leftSelectStartIndex;
            for (let i = startIndex; i <= index; i++) {
              cityList[i].isSelected = true;
            }
          }
        } else {
          if (_.isNull(this.keyMapFlag.rightSelectStartIndex)) {
            this.keyMapFlag.rightSelectStartIndex = index;
            return;
          }
          if (_.isNumber(this.keyMapFlag.rightSelectStartIndex) && this.keyMapFlag.rightSelectStartIndex <= index) {
            let startIndex = this.keyMapFlag.rightSelectStartIndex;
            for (let i = startIndex; i <= index; i++) {
              cityList[i].isSelected = true;
            }
          }
        }
      },
      clearChosenCityList(){
        let result = [];
        _.forEach(this.selectCityList, (city) => {
          if (!city.isSelected) {
            let item = {
              cityName: city.cityName,
              isSelected: false,
              index: result.length
            };
            result.push(item);
          }
        });
        this.selectCityList = result;
        this.queryCityList(this.selectProvinces);
        this.calculateListIndex(this.selectCityList);
      },
      queryProvinceList(){
        let regionList = [];
        let provinceTypeList = [];
        let _this = this;
        _.forEach(this.selectCityRegions, (item) => {
          let result = _.find(this.regionList, (subItem) => {
            return subItem.value === item;
          });
          if (result) {
            regionList.push(result.key);
          }
        });

        _.forEach(this.selectProvinceTypes, (item) => {
          let result = _.find(this.provinceTypeList, (subItem) => {
            return subItem.value === item;
          });
          if (result) {
            provinceTypeList.push(result.key);
          }
        });

        let params = {
          regionList: regionList,
          provinceTypeList: provinceTypeList
        };
        service.queryProvinceByKeyword(params).then(function (resp) {
          _this.provinceList = [];
          if (resp && resp.data && resp.data.length) {
            _.forEach(resp.data, (item) => {
              _this.provinceList.push(item.province);
            });
            if (_this.provinceList.length) {
              _this.queryCityList(_this.provinceList);
            }
          }
        });
      },
      commitSelectCityResult(){
        if (this.isMultipleModel) {
          this.selectorCityResult = _.map(this.selectCityList, (city) => {
            return city.cityName;
          });
        } else {
          this.selectorCityResult = this.selectCityList.length > 0 ? [this.selectCityList[0].cityName] : []
        }
        this.cityResultText = this.selectorCityResult.join(',');
        this.showSelectList = false;
      }
    },
    props: {
      isMultipleModel: {
        type: Boolean,
        default: true
      },
      cityResult: {
        type: Array,
        default: []
      }
    },
    mounted() {
      this.queryCityList([]);
    },
    computed: {
      filterCityList: function () {
        let keyword = this.filterKeyword;
        let cityList = this.cityList;
        let _this = this;
        let result = cityList.filter((city) => {
          return -1 !== (city.cityName).indexOf(keyword);
        });
        result = result.filter((city) => {
          return -1 === _.findIndex(_this.selectCityList, (item) => {
              return item.cityName === city.cityName;
            });
        });
        _.forEach(result, (item, index) => {
          item.index = index;
        });
        this.chosenInfo.totalCity = result.length;
        return result;
      }
    },
    components: {},
    watch: {
      'keyMapFlag.leftSelectStartIndex': {
        handler(curVal, oldVal){
          let _this = this;
          if (curVal) {
            setTimeout(() => {
              _this.keyMapFlag.leftSelectStartIndex = null;
            }, 3000);
          }
        },
        deep: true
      },
      'keyMapFlag.rightSelectStartIndex': {
        handler(curVal, oldVal){
          let _this = this;
          if (curVal) {
            setTimeout(() => {
              _this.keyMapFlag.rightSelectStartIndex = null;
            }, 3000);
          }
        },
        deep: true
      },
      cityResult(val){
        this.selectorCityResult = val;                      //监听外部对props属性cityResult的变更，并同步到组件data属性selectorCityResult
      },
      selectorCityResult(val){
        this.$emit('on-result-change', val);                //组件内部对selectorCityResult变更后向外部发送事件通知
      }
    }
  }
</script>
<style lang="less">
  .city-selector {
    input {
      width: 450px;
    }
    .dropSelectedArea {
      width: 450px;
      background-color: azure;
      border: 1px solid #4b73eb;
      z-index: 999999;
      position:absolute;
      margin-top: -3px;
      .bottom-selector {
        height: 300px;
        .drop-city-list {
          text-align: center;
          overflow-y: scroll;
          border-right: 3px solid #4b73eb;
          ul {
            li {
              height: 25px;
              text-align: center;
            }
          }
        }
        .drop-city-right {
          .select-city-area {
            overflow-y: scroll;
            ul {
              li {
                height: 25px;
                text-align: center;
              }
            }
          }
          .button-group {
            div {
              margin-bottom: 5px;
              padding-right: 5px;
            }
          }
        }
      }
    }


  }
</style>
