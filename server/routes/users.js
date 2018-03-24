const router = require('koa-router')();
const controller = require('../controllers/user.server.controller');
const validLogin = require('../middlewares/validLogin');


router.options('/upload', function* (){
  this.set('Access-Control-Allow-Method', '*');
  this.set('Access-Control-Allow-Origin', 'http://localhost:3002');
  this.status = 204;
});

router.prefix('/api/users');
// router.all('/api', validLogin);

router.post('/getUser', controller.getUser)
      .post('/registerUser', controller.registerUser)
      .post('/checkUserLogin', controller.checkUserLogin)
      .post('/checkSession', validLogin, controller.checkSession)
      .post('/queryCityByProvinceList', validLogin, controller.queryCityByProvinceList)
      .post('/queryProvinceByKeyword', validLogin, controller.queryProvinceByKeyword);

module.exports = router;
