<template>
  <div class="dashboard">
    <el-row>
      <el-col :span="24">
        <x-chart :id="columnChartId" :option="columnChartOption"></x-chart>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <x-chart :id="personalPieId" :option="personalPieOption"></x-chart>
      </el-col>
      <el-col :span="12">
        <x-chart :id="projectPieId" :option="projectPieOption"></x-chart>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import XChart from './chart.vue'
  import PersonPieChart from './chart.vue'
  export default {
    data () {
      return {
        columnChartId: 'weeklyColumnChart',
        personalPieId: 'personalPieChart',
        projectPieId: 'projectPieChart',
        columnChartOption: {
          chart: {
            type: 'column',
            height: 500
          },
          tooltip: {
            shared: true
          },
          title: {
            text: '近一周日志累计'
          },
          series: [{
            name: '新建 ',
            data: [],
            color: '#ed5565'
          }, {
            name: '归档 ',
            data: [],
            color: '#009944'
          }, {
            name: '完成 ',
            data: [],
            color: '#3366cc'
          }, {
            name: '删除 ',
            data: [],
            color: '#58666e'
          }],
          loading: false,
          yAxis: {
            title: {
              text: '操作数'
            }
          },
          credits: {
            enabled: false
          },
          plotOptions: {
            areaspline: {
              fillOpacity: 1
            }
          },
          xAxis: {
            categories: ['周一', '周一', '周一', '周一', '周一', '周一', '周一'],
            tickColor: '#FFffff'
          },
          useHighStocks: false,
          func: function (chart) {
          }
        },
        personalPieOption: {
          chart: {
            type: 'pie',
            height: 340
          },
          tooltip: {
            shared: true
          },
          title: {
            text: '个人日志情况'
          },
          series: [{
            data: [
              ['进行中', 2],
              ['已归档', 3],
              ['已完成', 4],
              ['已删除', 1]
            ]
          }],
          loading: false,
          credits: {
            enabled: false
          },
          plotOptions: {
            areaspline: {
              fillOpacity: 1
            }
          },
          useHighStocks: false,
          func: function (chart) {
          }
        },
        projectPieOption: {
          chart: {
            type: 'pie',
            height: 340
          },
          tooltip: {
            shared: true
          },
          title: {
            text: '团队日志情况'
          },
          series: [ {
            name: "日志数",
            data: [
              ['进行中', 2],
              ['已归档', 3],
              ['已完成', 4],
              ['已删除', 1]
            ],
            "type": "pie",
            "id": "s3"
          }],
          loading: false,
          credits: {
            enabled: false
          },
          plotOptions: {
            areaspline: {
              fillOpacity: 1
            }
          },
          useHighStocks: false,
          func: function (chart) {
          }
        }
      }
    },
    methods: {
      initChartOption: function () {
        for(let i = 0; i < 4; i++){
          for(let j = 0; j < 7; j++){
            this.columnChartOption.series[i].data.push(Math.ceil(Math.random() * 15));
          }
        }
      }
    },
    created: function () {
      this.initChartOption();
    },
    components: {
      XChart,PersonPieChart
    }
  }
</script>

<style lang="less">
  .dashboard{

  }
</style>
