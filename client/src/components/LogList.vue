<template>
  <div>
    <div class="form-box">
      <el-form ref="form" :inline="true" :model="form" label-width="100px" class="demo-form-inline">
        <el-form-item label="日志创建时间">
          <el-date-picker v-model="logCreateTime" type="datetimerange" placeholder="选择日志创建时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="日志状态">
          <el-select v-model="logStatus" clearable placeholder="日志状态">
            <el-option v-for="status in logStatusList" :key="status.key" :label="status.value" :value="status.key">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="分组创建人">
          <people-input-selector></people-input-selector>
        </el-form-item>
        <el-form-item label="项目选择">
          <el-cascader
            expand-trigger="hover"
            :options="projectStructure"
            v-model="selectedProject"
            @change="selectProjectChange"
          >
          </el-cascader>
        </el-form-item>
        <el-form-item >
          <city-selector :is-multiple-model="true" :city-result="cityResult" @on-result-change="getResultFromCitySelector"  v-on:listenToChildEvent="showResultFromComponent"></city-selector>
        </el-form-item>
      </el-form>
    </div>
  </div>

  <!--<el-row>-->
  <!--<el-table :data="logList">-->
  <!--<el-table-column>-->
  <!--<template scope="props">-->
  <!--<div class="log-table-expand">-->
  <!--<table>-->
  <!--<tr>-->
  <!--<td>-->
  <!--<label>日志编码:</label>-->
  <!--</td>-->
  <!--<td>-->
  <!--<span>{{props.row.logId}}</span>-->
  <!--</td>-->
  <!--<td>-->
  <!--<label>分组编码:</label>-->
  <!--</td>-->
  <!--<td>-->
  <!--<span>{{props.row.groupId}}</span>-->
  <!--</td>-->
  <!--<td>-->
  <!--<label>日志标题:</label>-->
  <!--</td>-->
  <!--<td>-->
  <!--<span>{{props.row.logTitle}}</span>-->
  <!--</td>-->
  <!--</tr>-->
  <!--<tr>-->
  <!--<td>-->
  <!--<label>分组名称:</label>-->
  <!--</td>-->
  <!--<td>-->
  <!--<span>{{props.row.groupName}}</span>-->
  <!--</td>-->
  <!--<td>-->
  <!--<label>日志状态:</label>-->
  <!--</td>-->
  <!--<td>-->
  <!--<span>{{props.row.logStatus}}</span>-->
  <!--</td>-->
  <!--<td>-->
  <!--<label>分组状态:</label>-->
  <!--</td>-->
  <!--<td>-->
  <!--<span>{{props.row.groupStatus}}</span>-->
  <!--</td>-->
  <!--</tr>-->
  <!--<tr>-->
  <!--<td>-->
  <!--<label>日志创建时间:</label>-->
  <!--</td>-->
  <!--<td>-->
  <!--<span>{{props.row.logCreateTime}}</span>-->
  <!--</td>-->
  <!--<td>-->
  <!--<label>日志创建人:</label>-->
  <!--</td>-->
  <!--<td>-->
  <!--<span>{{props.row.logCreator}}</span>-->
  <!--</td>-->
  <!--<td>-->
  <!--<label>分组状态:</label>-->
  <!--</td>-->
  <!--<td>-->
  <!--<span>{{props.row.groupStatus}}</span>-->
  <!--</td>-->
  <!--</tr>-->
  <!--</table>-->
  <!--</div>-->
  <!--</template>-->
  <!--</el-table-column>-->
  <!--<el-table-column label="日志名称" prop="logTitle" sortable>-->
  <!--</el-table-column>-->
  <!--<el-table-column label="分组名称" prop="groupName">-->
  <!--</el-table-column>-->
  <!--<el-table-column label="日志状态" prop="logStatus" :filter="logStatusList">-->
  <!--</el-table-column>-->
  <!--<el-table-column label="创建时间" prop="logCreateTime">-->
  <!--</el-table-column>-->
  <!--</el-table>-->
  <!--&lt;!&ndash;</el-row>&ndash;&gt;-->
</template>

<script>
  import PeopleInputSelector from './PeopleInputSelector.vue'
  import CitySelector from './CitySelector.vue'
  import service from '../axios'
  import core from '../core'
  export default {
    data () {
      return {
        logCreateTime: null,
        logStatus: null,
        form: null,
        selectedProject: null,
        logStatusList: [
          {
            key: 1,
            value: '进行中'
          },
          {
            key: 2,
            value: '已归档'
          },
          {
            key: 3,
            value: '已完成'
          },
          {
            key: 4,
            value: '已删除'
          }
        ],
        logList: [
          {
            logId: '0754',
            groupId: '89374',
            groupName: 'eason管理系统前端开发',
            logTitle: '熟悉vue的使用',
            logContent: '做好本职工作的同时，利用晚上的时间迅速熟悉vue',
            logStatus: '进行中',
            groupStatus: '进行中',
            logCreateTime: '2017-07-20',
            logCreator: '李奕逊'
          },
          {
            logId: '0754',
            groupId: '89374',
            groupName: 'eason管理系统前端开发',
            logTitle: '熟悉vue的使用',
            logContent: '做好本职工作的同时，利用晚上的时间迅速熟悉vue',
            logStatus: '进行中',
            groupStatus: '进行中',
            logCreateTime: '2017-07-20',
            logCreator: '李奕逊'
          },
          {
            logId: '0754',
            groupId: '89374',
            groupName: 'eason管理系统前端开发',
            logTitle: '熟悉vue的使用',
            logContent: '做好本职工作的同时，利用晚上的时间迅速熟悉vue',
            logStatus: '进行中',
            groupStatus: '进行中',
            logCreateTime: '2017-07-20',
            logCreator: '李奕逊'
          },
          {
            logId: '0754',
            groupId: '89374',
            groupName: 'eason管理系统前端开发',
            logTitle: '熟悉vue的使用',
            logContent: '做好本职工作的同时，利用晚上的时间迅速熟悉vue',
            logStatus: '进行中',
            groupStatus: '进行中',
            logCreateTime: '2017-07-20',
            logCreator: '李奕逊'
          },
          {
            logId: '0754',
            groupId: '89374',
            groupName: 'eason管理系统前端开发',
            logTitle: '熟悉vue的使用',
            logContent: '做好本职工作的同时，利用晚上的时间迅速熟悉vue',
            logStatus: '进行中',
            groupStatus: '进行中',
            logCreateTime: '2017-07-20',
            logCreator: '李奕逊'
          },
        ],
        projectStructure: [
          {
            value: 'ochirly',
            label: '欧时力',
            children: [
              {
                value: 'commodity',
                label: '商品部',
                children: []
              },
              {
                value: 'market',
                label: '市场部',
                children: []
              },
              {
                value: 'HR',
                label: '人力资源部',
                children: []
              }
            ]
          },
          {
            value: 'FivePlus',
            label: '5+',
            children: [
              {
                value: 'commodity',
                label: '商品部',
                children: []
              },
              {
                value: 'IT',
                label: '信息技术部',
                children: [
                  {
                    value: 'FPOS',
                    label: 'FPOS'
                  },
                  {
                    value: 'MMS',
                    label: '商品运营中心'
                  },
                  {
                    value: 'CRM',
                    label: 'CRM'
                  },
                  {
                    value: 'MA',
                    label: '手机手持端'
                  }
                ]
              },
              {
                value: 'HR',
                label: '人力资源部',
                children: []
              }
            ]
          },

        ],
        list: ['孙膑', '庞涓', '苏秦', '张仪'],
        cityResult: []
      }
    },
    components: {
      PeopleInputSelector, CitySelector
    },
    watch: {
      logCreateTime: (val, oldVal) => {
        console.log(val);
      },
      logStatus: (val, oldVal) => {
        console.log('newVal:' + val);
        console.log('oldVal:' + oldVal);
      }
    },
    methods: {
      selectProjectChange(value){
        console.log(value);
      },
      goBack(){
        this.$router.go(-1);
      },
      showResultFromComponent(data){
        console.log(data);
      },
      getResultFromCitySelector(val){
        this.cityResult = val;
        console.log('LogList.vue', val);
      }

    },
    computed: {},
    mounted(){
      core.checkSession(this);
    }
  }
</script>

<style lang="less">
  .form-box {
    background-color: #fff;
    padding-top: 20px;
    .line {
      text-align: center;
    }
  }

  .log-table-expand {
    width: 100%;
    height: 100%;
    padding: 0;
    table {
      width: 100%;
      tr {
        td {
          text-align: left;
          border: none;
          label {
            font-weight: bold;
          }
        }
      }
    }
  }
</style>
