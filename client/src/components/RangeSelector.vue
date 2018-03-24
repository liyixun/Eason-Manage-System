<template>
  <div>
    <input type="text" style="width: 200px" class="selector-input" v-on:focus="showDropSelectArea=true"
           v-model="rangeResult" :placeholder="'请选择' + labelText">
    <div v-show="showDropSelectArea" class="drop-selected-area" @mouseleave="showDropSelectArea=false">
      <b class="font-bold pull-left">全部{{labelText}}&nbsp;单位({{unitText}})</b><br>
      <span class="demonstration">{{labelText}}范围</span>
      <el-slider
        v-model="rangeList"
        range
        :show-stops="true"
        :show-tooltip="true"
        :step="rangeStep"
        :max="maxNum">
      </el-slider>
      <div class="result-view">
        <div>
          <span>最小{{labelText}}: </span>
          <span>{{rangeList[0]}}</span>
          <span class="unit-span" v-if="unitText">{{unitText}}</span>

        </div>
        <div>
          <span>最大{{labelText}}: </span>
          <span>{{rangeList[1]}}</span>
          <span class="unit-span" v-if="unitText">{{unitText}}</span>
        </div>
      </div>

      <!--<el-slider v-model="rangeResult" :show-tooltip="true" :show-input="true" :show-input-controls="false" :format-tooltip="formatTooltip"></el-slider>-->

      <div>
        <button type="button" class="btn btn-primary btn-sm" @click="commitRangeResult()">提交</button>
        <button type="button" class="btn btn-default btn-sm" @click="resetRangeResult()">重置</button>
      </div>
    </div>
  </div>
</template>

<script>
  import _ from 'lodash'
  export default {
    data () {
      return {
        showDropSelectArea: false,
        rangeResult: null,
        rangeList: [this.minNum, this.minNum]
      }
    },
    props: {
      labelText: {
        type: String,
        default: ''
      },
      unitText: {
        type: String,
        default: ''
      },
      rangeStep: {
        type: Number,
        default: 10
      },
      maxNum: {
        type: Number,
        default: 10000
      },
      minNum: {
        type: Number,
        default: 0
      }
    },
    methods: {
      commitRangeResult(){
        this.rangeResult = this.rangeList[0] + '~' + this.rangeList[1] + this.unitText;
        this.showDropSelectArea = false;
      },
      resetRangeResult(){
        this.rangeList = [this.minNum, this.minNum];
        this.rangeResult = null;
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

  .drop-selected-area {
    width: 350px;
    background-color: azure;
    border: 1px solid #4b73eb;
    z-index: 99999;
    position: absolute;
    padding: 5px 15px 0 15px;
    .result-view {
      display: flex;
      flex-direction: column;
      div {
        display: flex;
        span {
          flex: 2;
        }
        input {
          flex: 2;
        }
        .unit-span {
          flex: 1;
        }
      }
    }
  }
</style>
