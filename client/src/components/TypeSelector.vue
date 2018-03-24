<template>
  <div>
    <input type="text" style="width: 200px" class="selector-input" v-on:focus="showDropSelectArea=true"
           v-model="selectedResult" :placeholder="'请选择' + labelText">
    <div class="form-inline selector-default-options pull-right">
      <a href="javascript:0;" @click="selectDefaultOption(option)" v-for="option in defaultSelectOptions">{{option.value}}</a>
    </div>
    <div v-show="showDropSelectArea" class="drop-selected-area" @mouseleave="showDropSelectArea=false">
      <b class="font-bold pull-left">全部{{labelText}}</b><br>
      <div v-for="item in selectList" class="select-item" :class="{'selected-item': item.isSelected}">
        <span><a href="javascript:0;" @click="choiceDropSelectItem(item)">{{item.value}}</a></span>
      </div>
      <div>
        <button type="button" class="btn btn-primary btn-sm" @click="showDropSelectArea=false">提交</button>
        <button type="button" class="btn btn-default btn-sm" @click="resetSelectResult()">重置</button>
      </div>
    </div>

  </div>
</template>

<script>
  import _ from 'lodash'
  export default {
    data () {
      return {
        selectedResult: '',
        showDropSelectArea: false,
      }
    },
    props: {
      isMultipleModel: {
        type: Boolean,
        default: true
      },
      labelText: {
        type: String,
        default: ''
      },
      selectItemList: {
        type: Array,
        default: function () {
          return [];
        }
      },
      resultObj: {
        type: Object,
        default: function () {
          return {};
        }
      },
      defaultOptions: {
        type: Array,
        default: function () {
          return [];
        }
      },
      defaultOptionSize: {
        type: Number,
        default: 4
      }
    },
    methods: {
      resetSelectResult(){
        this.resultObj.keyList = [];
        this.resultObj.valueList = [];
        this.resultObj.objList = [];
        this.selectedResult = '';
        _.forEach(this.selectList, item => {
          item.isSelected = false;
        });
      },
      removeSelectResultItem(index){
        let keyList = [];
        let valueList = [];
        let objList = [];
        _.forEach(this.resultObj.keyList, (item, idx) => {
          if (idx !== index) {
            keyList.push(item);
          }
        });
        _.forEach(this.resultObj.valueList, (item, idx) => {
          if (idx !== index) {
            valueList.push(item);
          }
        });
        _.forEach(this.resultObj.objList, (item, idx) => {
          if (idx !== index) {
            objList.push(item);
          }
        });
        this.resultObj.keyList = keyList;
        this.resultObj.valueList = valueList;
        this.resultObj.objList = objList;
      },
      choiceDropSelectItem(option){
        option.isSelected = !option.isSelected;
        if (_.isUndefined(this.resultObj.objList)) {
          this.resultObj.keyList = [];
          this.resultObj.valueList = [];
          this.resultObj.objList = [];
        }
        let index = _.findIndex(this.resultObj.valueList, item => {
          return item === option.value;
        });
        if (index === -1) {
          this.resultObj.keyList.push(option.key);
          this.resultObj.valueList.push(option.value);
          this.resultObj.objList.push({
            key: option.key,
            value: option.value
          });
        } else {
          this.removeSelectResultItem(index);
        }
        this.handleShowResult();
      },
      selectDefaultOption(option){
        if (_.isUndefined(this.resultObj.objList)) {
          this.resultObj.keyList = [];
          this.resultObj.valueList = [];
          this.resultObj.objList = [];
        }
        let index = _.findIndex(this.resultObj.valueList, item => {
          return item === option.value;
        });
        if (index === -1) {
          this.resultObj.keyList.push(option.key);
          this.resultObj.valueList.push(option.value);
          this.resultObj.objList.push({
            key: option.key,
            value: option.value
          });

          let result = _.find(this.selectList, item => {
            return item.value === option.value;
          });
          if (result) {
            result.isSelected = !result.isSelected;
          }
        } else {
          this.removeSelectResultItem(index);
        }
        this.handleShowResult();
      },
      handleShowResult(){
        if (!_.isUndefined(this.resultObj.valueList)) {
          let result = '';
          _.forEach(this.resultObj.valueList, item => {
            result += item + ',';
          });
          this.selectedResult = result;
        }
      }
    },
    mounted(){

    },
    computed: {
      selectList: function () {
        return _.map(this.selectItemList, (item) => {
          if (_.isObject(item)) {
            let obj = _.cloneDeep(item);
            obj.isSelected = false;
            return obj;
          } else {
            return {
              isSelected: false,
              value: item
            }
          }
        });
      },
      defaultSelectOptions: function () {
        if (_.isUndefined(this.defaultOptions) || !this.defaultOptions.length) {
          let list = [];
          if (this.selectItemList.length >= 4) {
            for (let i = 0; i < this.defaultOptionSize; i++) {
              list.push(_.cloneDeep(this.selectList[i]));
            }
          } else {
            for (let i = 0; i < this.selectItemList.length; i++) {
              list.push(_.cloneDeep(this.selectList[i]));
            }
          }
          return list;
        } else {
          return this.defaultOptions;
        }
      }
    },
    components: {}
  }
</script>
<style lang="less">
  .selector-input {
    display: block;
    width: 100%;
    padding: 0.5rem 0.75rem;
    font-size: 1rem;
    line-height: 1.25;
    color: #464a4c;
    background-color: #fff;
    background-image: none;
    -webkit-background-clip: padding-box;
    background-clip: padding-box;
    border: 1px solid rgba(0, 0, 0, 0.15);
    border-radius: 0.25rem;
    transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s, -webkit-box-shadow ease-in-out 0.15s;
  }

  .selector-default-options {
    a {
      margin-right: 5px;
      text-decoration: none;
      &:hover {
        color: #CC3300;
        text-decoration: underline;
      }
    }
  }

  .drop-selected-area {
    width: 350px;
    background-color: azure;
    border: 1px solid #4b73eb;
    z-index: 99999;
    position: absolute;
    padding: 5px 15px 0 15px;
    .select-item {
      display: inline-block;
      margin-right: 10px;
      padding-right: 5px;
      padding-left: 5px;
      height: 30px;
      span {
        display: block;
        margin: auto;
        a {
          text-decoration: none;
          text-align: center;
        }
      }
    }
    .selected-item {
      background-color: #0066FF;
      a {
        color: white;
      }
    }
  }
</style>
