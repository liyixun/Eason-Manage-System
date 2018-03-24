<template>
  <el-autocomplete
    popper-class="people-autocomplete"
    v-model="selectedPeople"
    :fetch-suggestions="querySearch"
    custom-item="my-item-zh"
    placeholder="请选择分组创建人"
    @select="handleSelect"
    icon="pencil"
    :on-icon-click="handleIconClick"
  >

  </el-autocomplete>
</template>

<script>
  import Vue from 'vue'
  Vue.component('my-item-zh', {
    functional: true,
    render: function (h, ctx) {
      var item = ctx.props.item;
      return h('li', ctx.data, [
        h('span', {attrs: {class: 'name'}}, [item.name]),
//        h('i', {attrs: {class: 'el-icon-star-off more-info'}}),
        h('el-rate', {attrs: {class: 'rate-start'}}, [item.rate]),
        h('br'),
        h('span', {attrs: {class: 'email'}}, [item.email])
      ]);
    },
    props: {
      item: {
        type: Object,
        required: true
      }
    }
  });
  export default {
    name: 'people-input-selector',
    data () {
      return {
        peopleList: [],
        selectedPeople: ''
      };
    },
    methods: {
      querySearch(queryString, cb){
        var peopleList = this.peopleList;
        var results = queryString ? peopleList.filter(this.createFilter(queryString)) : peopleList;
        cb(results);
      },
      createFilter(queryString){
        return (people) => {
          return (people.value.indexOf(queryString.toLowerCase()) === 0);
        }
      },
      loadAll() {
        return [
          {"name": "李奕逊", "email": "eason.li@trendy-global.com", "rate": 1},
          {"name": "韩思敏", "email": "simin.han@trendy-global.com", "rate": 1},
          {"name": "于东升", "email": "dongsheng.yu@trendy-global.com", "rate": 1},
          {"name": "黄健", "email": "hackam.huang@trendy-global.com", "rate": 1},
          {"name": "洪晓华", "email": "mandy.hong@trendy-global.com", "rate": 1},
          {"name": "董鸿华", "email": "honghua.dong@trendy-global.com", "rate": 1},
          {"name": "张海彪", "email": "haibiao.zhange@trendy-global.com", "rate": 1},
        ];
      },
      handleSelect(item) {
        console.log(item);
      },
      handleIconClick(ev) {
        console.log(ev);
      }
    },
    mounted() {
      this.peopleList = this.loadAll();
    },
    components: {}
  }
</script>


<style lang="less">
  .people-autocomplete {
    li {
      line-height: normal;
      padding: 7px;
      &:hover{
        border-top: 1px solid #c88577;
        border-bottom: 1px solid #c88577;
      }
      .name {
        text-overflow: ellipsis;
        overflow: hidden;
      }

      .email {
        font-size: 12px;
        color: #b4b4b4;
      }

      .highlighted .email {
        color: #ddd;
      }
      .more-info {
        &:hover{
          background-color: #00B7FF;
        }
        text-decoration: none;
        margin-left: 10px;
      }
      .rate-start {
        margin-bottom: -20px;
      }
    }
  }
</style>
