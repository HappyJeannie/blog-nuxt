<template>
  <div class="container">
    <template v-if="isArticleOwner">
      <nuxt-link
        class="btn btn-outline-secondary btn-sm"
       :to="{
        name: 'editArticle',
        params: {
          slug: article.slug
        }
      }"><i class="ion-edit"></i> Edit Article</nuxt-link>
      &nbsp;&nbsp;
      <button class="btn btn-outline-danger btn-sm" @click="deleteArticleHandler">
        <i class="ion-trash-a"></i> Delete Article
      </button>
    </template>
    <template v-else>
      <button class="btn btn-sm btn-outline-secondary" :class="{active: article.author.following}">
      <i class="ion-plus-round"></i>
        &nbsp; Follow {{ article.author.username }} <span class="counter">(10)</span>
      </button>
      &nbsp;&nbsp;
      <button class="btn btn-sm btn-outline-primary" :class="{active: article.author.favorited}">
        <i class="ion-heart"></i>
        &nbsp; Favorite Post <span class="counter">({{ article.favoritesCount }})</span>
      </button>
    </template>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { deleteArticle } from '@/apis/article.js'

export default {
  name:"FollowOrEdit",
  props: {
    article: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {}
  },
  computed:{
     ...mapState(['user']),
    isArticleOwner() {
      return this.user.username === this.article.author.username;
    }
  },
  created(){},
  mounted(){},
  methods:{
    async deleteArticleHandler() {
      await deleteArticle(this.article.slug);
      this.$router.push({
        name: 'home',
        query: {
          tab: 'global_feed'
        }
      })
    }
  }
}
</script>
<style scoped>
.container {
  display: inline-block;
}
</style>