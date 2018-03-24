const Koa = require('koa');
const app = new Koa();
const views = require('koa-views');
const json = require('koa-json');
const onerror = require('koa-onerror');
const bodyparser = require('koa-bodyparser');
const logger = require('koa-logger');
const cors = require('koa-cors');

const index = require('./routes/index');
const users = require('./routes/users');
const warehouse = require('./routes/warehouse');

// const logUtil = require('./lib/logUtil');

const responseFormatter = require('./middlewares/responseFormatter');

// error handler
onerror(app);

// middlewares
app.use(cors());
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}));
app.use(json());
app.use(logger());
app.use(require('koa-static')(__dirname + '/public'));

app.use(views(__dirname + '/views', {
  extension: 'pug'
}));

// koa-generator自动生成的logger
app.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
});

//自定义的logger
// app.use(async (ctx, next) => {
//   const start = new Date();             //响应开始的时间
//   var ms;                               //响应时间间隔
//   try {
//     await next();                       //开始进入到下一个中间件
//     ms = new Date() - start;
//     logUtil.logResponse(ctx, ms);       //记录响应日志
//   }catch (error){
//     ms = new Date() - start;
//     logUtil.logError(ctx, error, ms);   //记录异常日志
//   }
//
// });

// app.use(responseFormatter('^/api'));        //对URL前缀为api的路由的返回值进行格式化
// routes
app.use(index.routes(), index.allowedMethods());
app.use(users.routes(), users.allowedMethods());
app.use(warehouse.routes(), warehouse.allowedMethods());

module.exports = app;
