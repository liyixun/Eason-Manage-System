<template>
  <div class="login-wrap">
    <div class="ms-title">EMS管理系统</div>
    <div class="ms-login">
      <el-form :model="EMSForm" ref="EMSForm" :rules="rules" label-width="0px" class="demo-EMSForm">
        <el-form-item prop="email">
          <el-input v-model="EMSForm.email" placeholder="邮箱"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" placeholder="密码" v-model="EMSForm.password" @keyup.enter.native="submitForm('EMSForm')"></el-input>
        </el-form-item>
        <div class="login-btn">
          <el-button type="primary" @click="submitForm('EMSForm')">登录</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
  import {mapState, mapMutations, mapActions} from 'vuex'
  import CONFIG from '../../config/config'
  import service from '../axios';
  import qs from 'qs'
  export default {
    data () {
      return {
        EMSForm: {
          email: '',
          password: ''
        },
        rules: {
          email: [
            {required: true, message: '请输入邮箱', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '请输入密码', trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      ...mapActions(['login']),
//      ...mapMutations({login: 'LOGIN'}),
      submitForm(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let params = {
              email: this.EMSForm.email,
              password: this.EMSForm.password
            };
            let _this = this;
            service.checkUserLogin(params).then(function (resp) {
              if(resp.data.result){
                let userInfo = resp.data.userInfo;
                userInfo.timeStamp = new Date().getTime().toString();
                _this.login(userInfo);
                _this.$router.push('/dashboard');
              }else {
                if(resp.data.msg && resp.data.msg === 'errorPW'){
                  console.log('密码错误');
                }else if(resp.data.msg && resp.data.msg === 'emailNoExist'){
                  console.log('登录邮箱不存在！');
                }else {

                }
              }
            });
//            this.axios.post(CONFIG.prefixUrl + '/test/post', params).then(function (resp) {
//              console.log(resp);
//            });
//            if(this.EMSForm.email === 'eason.li@trendy-global.com' && this.EMSForm.password === '123456'){
//              this.login({email: this.EMSForm.email, userName: 'eason.li'});
//              this.$router.push('/dashboard');
//            }

          } else {
            console.log('error submit!!!');
            return false;
          }
        });
      }
    },
    components: {}
  }
</script>
<style lang="less">
  .login-wrap {
    width: 100%;
    height: 100%;
    margin-left: 35%;
    margin-top: 15%;
    .ms-title {
      width: 300px;
    }
    .ms-login {
      width: 300px;
    }
    .login-btn {
      text-align: center;
      button {
        width: 100%;
        height: 36px;
      }
    }
  }

</style>
