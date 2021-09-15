<template>
  <div class="article-page">
    <div class="banner">
      <div class="container">
        <h1>{{ article.title }}</h1>

        <ArticleMeta :article="article"></ArticleMeta>
      </div>
    </div>

    <div class="container page">
      <div class="row article-content">
        <div class="col-md-12" v-html="article.body">
        </div>
      </div>

      <hr />

      <div class="article-actions">
        <ArticleMeta :article="article"></ArticleMeta>
      </div>

      <div class="row">
        <ArticleComment :article="article"></ArticleComment>
      </div>
    </div>
  </div>
</template>

<script>
import {getArticleDetail} from '@/apis/article.js'
import MarkdownIt from 'markdown-it';
import ArticleMeta from './components/article-meta'
import ArticleComment from './components/article-comment'
export default {
  name: 'ArticlePage',
  components: {
    ArticleMeta,
    ArticleComment
  },
  async asyncData({ route }) {
    const { data } = await getArticleDetail(route.params.slug);
    const md = new MarkdownIt();
    let { article } = data;
    article.body = md.render(article.body);
    return {
      article,
    }
  },
  data() {
    return {}
  },
  computed: {
    
  },
  created() {},
  mounted() {},
  methods: {},
  head() {
    return {
      title: `${this.article.title} - RealWorld`,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.article.description
        }
      ]
    }
  }
}
</script>
<style scoped></style>