<template lang="pug">
  div
    nuxt
    site-news
</template>

<script>
import MyFooter from '~/components/Footer.vue'
import SiteNews from '~/components/news.vue'

export default {
  components: {
    MyFooter,
    SiteNews
  }
}
</script>

<style>
</style>
