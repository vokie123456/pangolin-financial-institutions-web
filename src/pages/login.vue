<template>
  <section class="login-page fullScreen" @keydown.enter="submitForm">
    <el-row class="login-background" type="flex" justify="center" align="middle">
      <el-row class="login-main" type="flex" justify="center" align="middle">
        <section class="login-logo">
          <img class="login-logo-img" src="@/assets/images/common/pc-logo.png">
          <hr align="center" width="220px" style="margin-top:19px" />
          <div class="login-logo-title">{{appConfig.name}}</div>
        </section>
        <el-form class="login-form" ref="login-form" :model="loginModel">
          <el-row>
            <div style="font-size:18px;color:#1A7CD6;margin-top:26px;margin-left:28px;">登录</div>
            <hr />
          </el-row>
            <el-row class="form-item" type="flex" justify="center" style="margin-top:20px">
              <el-form-item prop="userName">
                <el-input v-model="loginModel.userName" auto-complete="off" placeholder="账号">
                  <template slot="prefix">
                    <svg-icon iconName="yonghuming" :iconSize="22" style="margin-top:8px"></svg-icon>
                  </template>
                </el-input>
              </el-form-item>
            </el-row>
            <el-row class="form-item" type="flex" justify="center">
              <el-form-item prop="password">
                <el-input type="password" v-model="loginModel.password" placeholder="密码">
                  <template slot="prefix">
                    <svg-icon iconName="mima" :iconSize="22" style="margin-top:8px"></svg-icon>
                  </template>
                </el-input>
              </el-form-item>
            </el-row>
            <!-- <el-row type="flex" justify="center">
           <el-form-item>
          <verify-code ref="verify-code"></verify-code>
          </el-form-item>
          </el-row> -->
            <el-row class="form-item" type="flex" justify="center">
              <el-form-item class="remember">
                <el-checkbox class="remember_cb" v-model="remember">记住用户名和密码</el-checkbox>
              </el-form-item>
            </el-row>
            <el-row type="flex" justify="center">
              <el-form-item label-width="0px" style="text-align:center">
                <el-button class="reset-button btn btns" @click="$refs['login-form'].resetFields()">重置</el-button>
                <el-button class="btn" @click="submitForm">登录</el-button>
              </el-form-item>
            </el-row>
        </el-form>
      </el-row>
      <el-row class="copyright">
        上海指旺信息科技有限公司 © 版权所有
      </el-row>
    </el-row>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';
import AppConfig from '~/config/app.config';
import Component from 'vue-class-component';
import SvgIcon from '~/components/common/svg-icon.vue';
import VerifyCode from '~/components/common/verify-code.vue';
import { Action } from 'vuex-class';
import { Dependencies } from '~/core/decorator';
import { StorageService } from '~/utils/storage.service';
import { FindValueSubscriber } from 'rxjs/operators/find';
import { ReminderService } from '~/utils/reminder.service';
import { LoginService } from '~/services/management-service/login.service';

@Component({
  components: {
    SvgIcon,
    VerifyCode,
  },
})
export default class Login extends Vue {
  @Dependencies(LoginService)
  private loginService: LoginService;

  @Action('updateUserLoginData')
  private updateUserLoginData;
  @Action('updateResourcesData')
  private updateResourcesData;

  private appConfig: any = AppConfig;
  private remember: boolean = false;

  private rules: any = {
    userName: { required: true, message: '用户名不能为空', trigger: 'blur' },
    password: { required: true, message: '密码不能为空', trigger: 'blur' },
  };
  private loginModel: any = {
    userName: '',
    password: '',
  };

  private loginForm: any = {

  }
  private verifyForm: any = {

  }
  private rember: any = {

  }
  public async login() {
    return new Promise((resolve, reject) => {
      this.loginService.login(this.loginModel).subscribe(
        (data) => {
          resolve(data);
        },
        (error) => {
          reject();
        },
      );
    });
  }


  /**
   * 提交登录表单
   */
  public async submitForm() {
    this.loginForm = this.$refs['login-form'];
    this.loginForm.validate((success) => {
      if (!success) {
        return;
      }

      this.verifyForm = this.$refs['verify-code'];

  
      if (this.remember) {
        StorageService.setItem('remember', this.loginModel);
      } else {
        StorageService.removeItem('remember');
      }

      // 用户登录
      this.loginService.login(this.loginModel).subscribe(
        (user) => {
          // 更新登录数据
          this.updateUserLoginData(user);

          // 根据角色列表获取资源
          this.loginService.getAllResourcesByRoleId(user).subscribe(
            (resources) => {
              // 更新资源信息
              this.updateResourcesData(resources);

              // 跳转工作区
              if (user.manager) {
                this.$router.push('/dashboard/admin');
              } else {
                this.$router.push('/dashboard/user');
              }
            }
          );
        }
      );
    });
  }
  private mounted() {
    ReminderService.notifyClean();

    this.rember = StorageService.getItem('remember');
    this.remember = !!this.rember;
    if (this.rember) {
      this.loginModel = this.rember;
    }
  }

}
</script>

<style lang="less" scoped>
.login-page.fullScreen {
  .el-input--prefix .el-input__inner {
    padding-left: 45px;
  }
}
</style>

<style lang="less" scoped>
.fullScreen {
  width: 100%;
  height: 100%;
}

.login-background {
  background: url("../assets/images/common/login_bg.jpg");
  background-repeat: round;
  height: 100%;
}

.login-main {
  height: 380px;
  border-radius: 3px;
}

.login-logo {
  width: 268px;
  height: 380px;
  background-color: #2e313d;
  border-radius: 3px 0 0 3px;
}

.login-logo-img {
  display: block;
  width: 140px;
  height: 43px;
  margin: 0 auto;
  margin-top: 110px;
}
.login-logo-title {
  color: #ffffff;
  width: 267px;
  height: 14px;
  font-size: 14px;
  line-height: 12px;
  margin-top: 30px;
  margin-left: 40px;
  letter-spacing: 12px;
}
.login-form {
  width: 425px;
  height: 380px;
  border-radius: 0px 3px 3px 0px;
  background-color: #ffffff;
}

.el-form-item {
  width: 366px;
  height: 44px;
}

.btn {
  width: 173px;
  height: 35px;
}

.form-item {
  height: 55px;
}

.remember {
  text-align: left;
  color: red;
}

.remember_cb {
  color: #333;
}
.copyright {
  position: absolute;
  bottom: 60px;
  font-size: 14px;
  color: #91918e;
}
.btns {
  background-color: white !important;
  color: #1a7cd6 !important;
}
</style>
