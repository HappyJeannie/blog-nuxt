<template>
  <div class="profile-page">
    <div class="user-info">
      <div class="container">
        <div class="row">
          <div class="col-xs-12 col-md-10 offset-md-1">
            <img :src="profile.image" class="user-img" />
            <h4>{{ profile.username }}</h4>
            <p>{{ profile.bio }}</p>
            <button class="btn btn-sm btn-outline-secondary action-btn active" @click="followHandler">
              <i class="ion-plus-round"></i>
              &nbsp; Follow {{ profile.username }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="row">
        <div class="col-xs-12 col-md-10 offset-md-1">
          <div class="articles-toggle">
            <ul class="nav nav-pills outline-active">
              <li
                class="nav-item"
                @click="selectedTab='My_Articles'"
              >
                <a class="nav-link" :class="{
                  active: selectedTab === 'My_Articles'
                }" href="javascript:;">My Articles</a>
              </li>
              <li
                class="nav-item"
                @click="selectedTab='Favorited_Articles'"
              >
                <a class="nav-link" href="javascript:;" :class="{
                  active: selectedTab === 'Favorited_Articles'
                }">Favorited Articles</a>
              </li>
            </ul>
          </div>

          <div class="article-preview" v-for="(article,key) in articles" :key="key">
            <div class="article-meta">
              <nuxt-link
                :to="{
                  name: 'profile',
                  params: {
                    username: article.author.username
                  }
                }"
              >
                <img :src="article.author.image" />
              </nuxt-link>
              <div class="info">
                <nuxt-link
                  :to="{
                    name: 'profile',
                    params: {
                      username: article.author.username
                    }
                  }"
                >
                  {{ article.author.username }}
                </nuxt-link>
                <span class="date">J{{ article.date | date('MMM DD, YYYY') }}</span>
              </div>
              <button class="btn btn-outline-primary btn-sm pull-xs-right" @click="favoriteHandler"><i class="ion-heart"></i> {{ article.favoritesCount }}</button>
            </div>
            <nuxt-link
              class="preview-link"
              :to="{
                name: 'article',
                params: {
                  slug: article.slug
                }
              }"
            >
              <h1>{{ article.title }}</h1>
              <p>{{ article.body }}</p>
              <span>Read more...</span>
              <ul class="tag-list">
                <li class="tag-default tag-pill tag-outline" v-for="tag in article.tagList" :key="tag">{{ tag }}</li>
              </ul>
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// 我喜欢的文章：https://conduit.productionready.io/api/articles?favorited=cy085940307&limit=5&offset=0
// 我的文章：https://conduit.productionready.io/api/articles?author=cy085940307&limit=5&offset=0
import { getProfile } from '@/apis/user.js';
import {
  getArticles,
  addFavorite,
  deleteFavorite,
} from '@/apis/article.js'

export default {
  name: 'ProfilePage',
  async asyncData({ route }) {
    const { username } = route.params;
    const [ profileRes, myArticlesRes ] = await Promise.all([
      getProfile(username),
      getArticles({
        limit: 20,
        offset: 0,
        author: username
      })
    ]);
    return {
      profile: profileRes.data.profile,
      articles: myArticlesRes.data.articles
    }
  },
  data() {
    return {
      selectedTab: 'My_Articles'
    }
  },
  computed: {},
  created() {},
  mounted() {},
  methods: {
    followHandler() {
      alert('重复功能，不再开发');
    },
    favoriteHandler() {
      alert('重复功能，不再开发');
    }
  },
  watch: {
    async selectedTab(newval) {
      const { username } = this.profile;
      const params = newval === 'My_Articles' ? {
        limit: 20,
        offset: 0,
        author: username
      }: {
        limit: 20,
        offset: 0,
        favorited: username
      }
      const { data } = await getArticles(params);
      this.articles = data.articles;
    }
  }
}
</script>
<style scoped></style>