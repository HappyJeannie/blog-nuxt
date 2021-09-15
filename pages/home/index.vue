<template>
  <div class="home-page">
    <div class="banner">
      <div class="container">
        <h1 class="logo-font">conduit</h1>
        <p>A place to share your knowledge.</p>
      </div>
    </div>

    <div class="container page">
      <div class="row">
        <div class="col-md-9">
          <div class="feed-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item" v-if="user">
                <nuxt-link
                  class="nav-link"
                  :class="{ active: tab === 'your_feed' }"
                  exact
                  :to="{
                    name: 'home',
                    query: {
                      tab: 'your_feed'
                    }
                  }"
                >
                 Your Feed
                </nuxt-link>
              </li>
              <li class="nav-item">
                <li class="nav-item">
                <nuxt-link
                  class="nav-link"
                  :class="{ active: tab === 'global_feed' }"
                  exact
                  :to="{
                    name: 'home',
                    query: {
                      tab: 'global_feed'
                    }
                  }"
                >
                 Global Feed
                </nuxt-link>
              </li>
              <li class="nav-item" v-if="tag">
                <nuxt-link
                  class="nav-link"
                  :class="{active: tab === tag}"
                  exact
                  :to="{
                    name: 'home',
                    query: {
                      tab: tag
                    }
                  }"
                >
                 #{{ tag }}
                </nuxt-link>
              </li>
            </ul>
          </div>

          <div class="article-preview" v-for="(article, index) in articles" :key="index">
            <div class="article-meta">
              <nuxt-link
                :to="{
                  name: 'profile',
                  params: {
                    username: article.author.username,
                  },
                }"
                ><img :src="article.author.image"
              /></nuxt-link>
              <div class="info">
                <nuxt-link
                  class="author"
                  :to="{
                    name: 'profile',
                    params: {
                      username: article.author.username,
                    },
                  }"
                  >{{ article.author.username }}</nuxt-link
                >
                <span class="date">{{ article.createdAt | date('MMM DD, YYYY') }}</span>
              </div>
              <button
                class="btn btn-outline-primary btn-sm pull-xs-right"
                :class="{ active: article.favorited }"
                @click="onFavorite(article)"
                :disabled="article.disabled"
              >
                <i class="ion-heart"></i> 
                {{ article.favoritesCount }}
              </button>
            </div>
            <nuxt-link :to="`/article/${article.slug}`" class="preview-link">
              <h1>{{ article.title }}</h1>
              <p>{{ article.description }}</p>
              <span>Read more...</span>
            </nuxt-link>
          </div>
          <nav>
            <ul class="pagination">
              <li class="page-item" :class="{ active: page === pageno }" v-for="pageno in pageCount" :key="pageno">
                <nuxt-link
                  class="page-link"
                  :to="{
                    name: 'home',
                    query: {
                      page: pageno,
                      tag: $route.query.tag || '',
                      tab: tab
                    },
                  }"
                  >{{ pageno }}</nuxt-link
                >
              </li>
            </ul>
          </nav>
        </div>

        <div class="col-md-3">
          <div class="sidebar">
            <p>Popular Tags</p>

            <div class="tag-list">
              <nuxt-link
                v-for="tag in tags"
                :key="tag"
                :to="{
                  name: 'home',
                  query: {
                    page: $route.query.page || 1,
                    tag,
                    tab: tag
                  },
                }"
                class="tag-pill tag-default"
              >
                {{ tag }}
              </nuxt-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getArticles,
  getFeedArticles,
  addFavorite,
  deleteFavorite,
} from '@/apis/article.js'
import { getTags } from '@/apis/tags.js'
import { mapState } from 'vuex'
export default {
  name: 'HomePage',
  watchQuery: ['page', 'tag', 'tab'],
  async asyncData({ query, store }) {
    let data = {},
      tags = []
    const limit = 20,
      page = Number.parseInt(query?.page || 1),
      tag = query?.tag || '',
      tab = query?.tab || 'global_feed'
    const loadArticles = store.state.user && tab === 'your_feed' ? getFeedArticles : getArticles;
    try {
      const [articlesRes, tagsRes] = await Promise.all([
        loadArticles({
          limit,
          offset: (page - 1) * limit,
          tag
        }),
        getTags()
      ])
      data = articlesRes.data
      tags = tagsRes.data.tags
      data.articles.forEach(article => {
        article.disabled = false;
      })
    } catch (err) {
      console.log(err)
    }
    return {
      articles: data.articles,
      articlesCount: data.articlesCount,
      limit,
      page,
      tags,
      tag,
      tab
    }
  },
  data() {
    return {}
  },
  computed: {
    ...mapState(['user']),
    pageCount() {
      return Math.ceil(this.articlesCount / this.limit)
    }
  },
  created() {},
  mounted() {},
  methods: {
    async onFavorite(article) {
      article.disabled = true;
      if(article.favorited) {
        await deleteFavorite(article.slug);
        article.favorited = false;
        article.favoritesCount += -1;
      } else {
        await addFavorite(article.slug);
        article.favorited = true;
        article.favoritesCount += 1;
      }
      article.disabled = false;
    }
  }
}
</script>
<style scoped></style>