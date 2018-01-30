<template>
  <el-form :model="loginForm" ref="loginForm" :rules="loginRules" label-position="left" label-width="0px"
           class="login-container">
    <h3 class="title">系统登录</h3>
    <el-form-item prop="account">
      <el-input type="text" v-model="loginForm.account" auto-complete="off" planceholder="帐号"></el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input type="password" v-model="loginForm.password" auto-complete="off" planceholder="密码"></el-input>
    </el-form-item>
    <el-form-item class="checked">
      <el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox>
    </el-form-item>
    <el-form-item>
      <el-button class="button" type="primary" @click.native.prevent="login" :loading="logining">登录
      </el-button>
    </el-form-item>
    <el-form-item>
      <el-button class="button" type="primary" @click.native.prevent="reset">重置
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script>
  export default {
    data: function () {
      return {
        loginForm: {
          account: 'admin',
          password: '123456'
        },
        logining: false,
        checked: true,
        loginRules: {
          account: [
            {required: true, message: '请输入账号', trigger: 'blur'},
            {min: 3, message: '账号至少为3个字符', trigger: 'blur'}
            //{ validator: validaePass }
          ],
          password: [
            {required: true, message: '请输入密码', trigger: 'blur'},
          ]
        }
      }
    },
    methods: {
      login: function () {
        this.$refs.loginForm.validate((valid) => {
          if (valid) {
            this.logining = true
            //NProgress.start();
            var loginParams = {account: this.loginForm.account, password: this.loginForm.password}
            //this.$router.replace({name: 'home'})
            this.$axios.get('/index', {
              params:{
                "userId": 1,
                "receiveTimeFrom": "2018-01-16 00:33:03",
                "receiveTimeTo": "2018-01-20 00:33:03",
                "status": "01",
                "expired": 1
              }
            })
              .then(function (response) {
                console.log(response);
              })
              .catch(function (response) {
                console.log(response);
              });
          }

        })
      },
      reset: function () {
        this.$refs['loginForm'].resetFields();
      }
    }
  }
</script>

<style lang="scss" scoped>
  .login-container {
    /*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    margin: 180px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;

    .checked {
      margin: 0;
    }

    .title {
      margin: 0px auto 40px auto;
      text-align: center;
      color: #505458;
    }
    .button {
      width: 100%;
    }
  }


</style>
