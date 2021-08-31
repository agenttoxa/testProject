<template lang="pug">
 .site-page
    section.site-page-section-header
      h1 Шапка сайта
      nuxt-link(to="#news").site-page-button Показать новости
</template>

<script>
export default {
  name: 'site-page-index'
}
</script>

<style lang="sass">
  .site-page
    width: 100%

    &-section-header
      height: 500px
      width: 100%
      display: flex
      justify-content: space-around
      align-content: center
      padding-top: 2rem

    &-button
      padding: .5rem 2rem
      height: 2rem
      border: 1px solid black
      margin-left: 1rem
      cursor: pointer
</style>
