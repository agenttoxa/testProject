<template lang="pug">
  .site-news(v-show="active")
    .site-news-header
      nuxt-link.site-news-cross(to="#")

    .site-news-container
      el-collapse(accordion v-model="activeName")
        el-collapse-item(v-for="(newsItem, index) in news" :key="index" :name="index")
          div(slot="title") {{ newsItem.title }}
          img(:src="newsItem.image")
          .site-news-item__desc {{ newsItem.desc }}
          .site-news-item__text {{ newsItem.text }}
</template>

<script>
  import ElCollapse from 'element-ui/lib/collapse'
  import ElCollapseItem from 'element-ui/lib/collapse-item'

  export default {
    name: 'site-section-news',

    data () {
      return {
        active: false,
        activeName: 0
      }
    },

    computed: {
      news () {
        return this.$store.state.news.list
      }
    },

    mounted () {
      if (this.$route && this.$route.hash === '#news') {
        this.active = true
      }
    },

    watch: {
      '$route.hash' (newVal) {
        this.active = newVal === '#news'
      }
    },

    components: {
      ElCollapse,
      ElCollapseItem
    }
  }
</script>

<style lang="sass">
  .site-news
    position: fixed
    top: 0
    left: 0
    width: 100%
    height: 100vh
    transition: all .3s ease
    background-color: gray
    overflow-y: auto

    &-header
      height: 3rem
      width: 100%
      background-color: white
      border-bottom: 1px solid gray

    &-cross
      position: absolute
      top: 2px
      right: 10px
      width: 2rem
      height: 2rem
      cursor: pointer

      &:after, &:before
        content: ''
        position: absolute
        width: 100%
        height: 0
        top: 19px
        border-top: 2px solid black

      &:after
        transform: rotate(45deg)

      &:before
        transform: rotate(-45deg)

    &-container
      width: 900px
      margin: auto
      background-color: white
      height: 100%
</style>
