/**
 * Created by eason on 17/8/3.
 */
import axios from 'axios'
import qs from 'qs'
import CONFIG from '../config/config'
import _ from 'lodash'

//设置全局axios默认值
axios.defaults.timeout = 5000;  //5000的超时验证
axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';

//创建一个axios实例
const instant = axios.create();
instant.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';

axios.interceptors.request.use = instant.interceptors.request.use;

function handleQueryParams(data) {
  let userInfo = window.sessionStorage.getItem('userInfo');
  let timeStamp = null;
  if (userInfo) {
    userInfo = JSON.parse(userInfo);
    timeStamp = userInfo.timeStamp;
  }
  data.timeStamp = timeStamp;
  return qs.stringify(data);
}


export default {
  //用户登录
  checkUserLogin(data){
    return instant.post(CONFIG.prefixUrl + '/users/checkUserLogin', qs.stringify(data));
  },
  checkSession(data){
    return instant.post(CONFIG.prefixUrl + '/users/checkSession', handleQueryParams(data))
  },
  queryProvinceByKeyword(data){
    return instant.post(CONFIG.prefixUrl + '/users/queryProvinceByKeyword', handleQueryParams(data))
  },
  queryCityByProvinceList(data){
    return instant.post(CONFIG.prefixUrl + '/users/queryCityByProvinceList', handleQueryParams(data))
  },
  findAllWarehouseType(data){
    return instant.post(CONFIG.prefixUrl + '/warehouse/findAllWarehouseType', handleQueryParams(data))
  },
  findAllWarehouseFloorType(data){
    return instant.post(CONFIG.prefixUrl + '/warehouse/findAllWarehouseFloorType', handleQueryParams(data))
  },
  queryWarehouse(data){
    return instant.post(CONFIG.prefixUrl + '/warehouse/queryWarehouse', handleQueryParams(data))
  }
}

