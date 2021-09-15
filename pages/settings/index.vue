<template>
  <div class="settings-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Your Settings</h1>

          <form @submit.prevent="sumbitHandler">
            <fieldset>
              <fieldset class="form-group">
                <input class="form-control" type="text" placeholder="URL of profile picture"  v-model="user.image"/>
              </fieldset>
              <fieldset class="form-group">
                <input class="form-control form-control-lg" type="text" placeholder="Your Name" v-model="user.username"/>
              </fieldset>
              <fieldset class="form-group">
                <textarea class="form-control form-control-lg" rows="8" placeholder="Short bio about you" v-model="user.bio"></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input class="form-control form-control-lg" type="text" placeholder="Email"  v-model="user.email" />
              </fieldset>
              <!-- <fieldset class="form-group">
                <input class="form-control form-control-lg" type="password" placeholder="Password" />
              </fieldset> -->
              <button class="btn btn-lg btn-primary pull-xs-right">Update Settings</button>
            </fieldset>
          </form>
          <hr></hr>
          <button class="btn btn-outline-danger" @click="logout">
            Or click here to logout.
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const Cookie = process.client ? require('js-cookie'): undefined;
import { getCurrentUser, updateCurrentUser } from '@/apis/user.js';
import { mapMutations } from 'vuex';
export default {
  middleware: ['auth'],
  name: 'Settings',
  async asyncData({ route }){
    const { data } = await getCurrentUser();
    return {
      user: Object.assign({image: '', bio: ''}, data.user)
    };
  },
  data() {
    return {}
  },
  computed: {},
  created() {},
  mounted() {},
  methods: {
    ...mapMutations(['setUser']),
    logout() {
      Cookie.remove('user');
      this.setUser(null);
      this.$router.push({
        name: 'home'
      })
    },
    async sumbitHandler() {
      console.log('提交表单')
      const { data } = await updateCurrentUser({
        user: {
          email: this.user.email,
          bio: this.user.bio,
          image: this.user.image
        }
      });
      console.log('更新成功');
      console.log(data);
    }
  }
}
</script>
<style scoped></style>