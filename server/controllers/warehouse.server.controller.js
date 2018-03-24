/**
 * Created by eason on 17/8/20.
 */
const db = require('../dao/mongo');
const moment = require('moment');
const _ = require('lodash');


exports.findAllWarehouseType = async (ctx, next) => {
  let result = await db.findAllWarehouseType();
  let list = _.map(result, item => {
    return {
      key: item.key,
      value: item.value
    };
  });
  ctx.body = list;
};

exports.findAllWarehouseFloorType = async (ctx, next) => {
  let result = await db.findAllWarehouseFloorType();
  let list = _.map(result, item => {
    return {
      key: item.key,
      value: item.value
    };
  });
  ctx.body = list;
};

exports.queryWarehouse = async (ctx, next) => {
  let inputParams = ctx.request.body;
  let params = {
    region: inputParams.region
  };
  if(inputParams.cityList && inputParams.cityList.length){
    params.city = {'$in': inputParams.cityList};
  }
  if(inputParams.warehouseTypeList && inputParams.warehouseTypeList.length){
    params.warehouseType = {'$in': inputParams.warehouseTypeList};
  }
  if(!_.isUndefined(inputParams.leasingAreaFrom) && !_.isUndefined(inputParams.leasingAreaTo)){
    let leasingAreaFrom = parseInt(inputParams.leasingAreaFrom) * 100;
    let leasingAreaTo = parseInt(inputParams.leasingAreaTo) * 100;
    params.leasingArea = {'$gte': leasingAreaFrom, '$lte': leasingAreaTo};
  }
  console.log(params);
  let result = await db.queryWarehouse(params);
  ctx.body = result;
};
