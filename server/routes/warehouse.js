/**
 * Created by eason on 17/8/20.
 */
const router = require('koa-router')();
const validLogin = require('../middlewares/validLogin');
const controller = require('../controllers/warehouse.server.controller');

router.options('/upload', function* (){
  this.set('Access-Control-Allow-Method', '*');
  this.set('Access-Control-Allow-Origin', 'http://localhost:3002');
  this.status = 204;
});

router.prefix('/api/warehouse');

router.post('/findAllWarehouseType', controller.findAllWarehouseType)
  .post('/findAllWarehouseFloorType', controller.findAllWarehouseFloorType)
  .post('/queryWarehouse', controller.queryWarehouse);


module.exports = router;
