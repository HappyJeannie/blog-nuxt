<template>
  <div class="editor-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-10 offset-md-1 col-xs-12">
          <form @submit.prevent="submitHandler">
            <fieldset>
              <fieldset class="form-group">
                <input type="text" class="form-control form-control-lg" placeholder="Article Title" v-model="article.title" />
              </fieldset>
              <fieldset class="form-group">
                <input type="text" class="form-control" placeholder="What's this article about?"  v-model="article.description" />
              </fieldset>
              <fieldset class="form-group">
                <textarea class="form-control" rows="8" placeholder="Write your article (in markdown)" v-model="article.body" ></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input type="text" class="form-control" placeholder="Enter tags"  v-model="article.tag" />
                <div class="tag-list"></div>
              </fieldset>
              <button class="btn btn-lg pull-xs-right btn-primary" type="submit">Publish Article</button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { createArticle } from '@/apis/article.js';
export default {
  middleware: ['auth'],
  name: 'EditPage',
  data() {
    return {
      article: {
        title: '',
        description: '',
        body: '',
        tag: ''
      }
    }
  },
  computed: {},
  created() {},
  mounted() {},
  methods: {
    formatTags() {
      return this.article.tag.split(',');
    },
    async submitHandler() {
      const { title, description, body, tag } = this.article;
      if (!title || !description || !body || !tag) {
        console.log("不能为空");
        return;
      }
      const { data } = await createArticle({
        article: {
          title,
          description,
          body,
          tagList: this.formatTags()
        }
      })
      data && this.$router.push({
        name: 'home',
        query: {
          tab: 'global_feed'
        }
      })
    }
  }
}
</script>
<style scoped></style>