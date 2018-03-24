#### EMS eason管理后台管理系统
Vue2.0 + KOA

### 使用
```
git clone
cd client && npm install
cd server && npm install
cd client && npm run dev
cd server && npm start
浏览器打开http://localhost:8080，推荐使用chrome浏览器
```

### 架构
```
Vue2.0 + KOA2
```

### 开发环境
```
Mac OS （window下没有试过。。。）
Node 版本管理工具 n/nvm (两个都可以，任选一个都行，如果自己本地node版本够高的话也可以不用使用这两个工具)
```


### 项目搭建过程
```
前端Vue使用脚手架工具vue-cli(全局安装)
vue init webpack projectName
Node端采用Koa脚手架工具koa-generator
全局安装koa-generator
sudo npm install -g koa-generator
切换到工作目录下：
koa2 projectName
```

### 项目运行模式介绍
```
因为一开始开发是在本地进行的，所以用了很多本地的服务，自己还没有线上的服务，所以将项目分为两种模式，
一种是本地开发模式，用本地的MySQL和MongoDB，另外一种是demo模式，使用mock产生的数据来代替。
本地开发模式：
1.修改server/assests/config.js里面数据库的配置信息；
2.启动MongoDB服务；
3.这里MongoDB是用来存放登录记录的，MySQL是用来存储基础数据的，包括登录者的账号密码等，因为本人是做前端的，对数据库这部分不熟悉，这里就不对数据库做过多的说明了。
demo模式：
1.在登录页勾上demo模式，账号密码都为guest，采用mock产生的数据；（1.0.0暂未实现）；
```

### 更新日志
#### 1.0.0
```
时间：2018-3-24
描述：将本地代码提交到GitHub
```
