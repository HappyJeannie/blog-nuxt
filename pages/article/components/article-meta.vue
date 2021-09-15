<template>
  <div class="article-meta">
    <nuxt-link :to="{
      name: 'profile',
      params: {
        username: article.author.username
      }
    }">
      <img :src="article.author.image" />
    </nuxt-link>
    <div class="info">
      <nuxt-link :to="{
        name: 'profile',
        params: {
          username: article.author.username
        }
      }">
        {{ article.author.username }}
      </nuxt-link>
      <span class="date">{{article.author.createdAt | date('MMM DD,YYYY')}}</span>
    </div>
    <FollowOrEdit :article="article"></FollowOrEdit>
  </div>
</template>

<script>
import FollowOrEdit from './followOrEdit';
export default {
  name:"Article-Meta",
  components: {
    FollowOrEdit
  },
  props: {
    article: {
      type: Object,
      required: true,
      default: () => ({})
    }
  },
  data() {
    return {}
  },
  computed:{},
  created(){},
  mounted(){},
  methods:{}
}
</script>
<style scoped></style>