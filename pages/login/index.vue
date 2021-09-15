<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">

        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">{{ isLogin ? "Sign In" : "Sign up" }}</h1>
          <p class="text-xs-center">
            <nuxt-link v-if="isLogin" to="/register">Need an account?</nuxt-link>
            <nuxt-link v-else  to="/login">Have an account?</nuxt-link>
          </p>

          <ul class="error-messages">
            <template v-for="(error, field) in errors">
              <li v-for="(message, index) in error" :key="index">{{field}} {{message}}</li>
            </template>
          </ul>

          <form @submit.prevent="onSubmit">
            <fieldset class="form-group" v-if="!isLogin">
              <input v-model="user.username" class="form-control form-control-lg" type="text" placeholder="Your Name">
            </fieldset>
            <fieldset class="form-group">
              <input v-model="user.email" class="form-control form-control-lg" type="text" placeholder="Email">
            </fieldset>
            <fieldset class="form-group">
              <input v-model="user.password" class="form-control form-control-lg" type="password" placeholder="Password">
            </fieldset>
            <button class="btn btn-lg btn-primary pull-xs-right">
              {{ isLogin ? "Sign In" : "Sign up" }}
            </button>
          </form>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
const Cookie = process.client ? require('js-cookie'): undefined;
import { login, register } from '@/apis/user.js';
export default {
  middleware: ['notauth'],
  name:"LoginIndex",
  computed: {
    isLogin() {
      return this.$route.name === 'login';
    }
  },
  data() {
    return {
      user: {
        username: "",
        email: "",
        password: ""
      },
      errors: {
        // email: ["a", "b"],
        // password: ["c", "d"]
      }
    }
  },
  methods: {
    async onSubmit() {
      // 网络太慢，异常就不验证了
      try {
        const { user } = this;
        const fun = this.isLogin ? login : register;
        const { data } = await fun({user})
        if(data?.user) {
          this.$router.push('/')
          // 为了防止刷新页面数据丢失，使用 js-cookie 存储数据
          this.$store.commit('setUser', data.user)
          Cookie.set('user', JSON.stringify(data.user))
        }
      } catch (err) {
        this.errors = err.response.data.errors;
      }
    }
  }
}
</script>
<style scoped></style>