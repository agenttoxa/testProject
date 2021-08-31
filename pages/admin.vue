<template lang="pug">
  .site-page-admin
    .site-page-admin-header

    .site-page-admin-container
      el-collapse(accordion v-model="activeName")
        el-collapse-item(v-for="(newsItem, index) in news" :key="index" :name="index")
          div(slot="title") {{ newsItem.title }}

          el-form(:ref="`form-${index}`" :rules="formRules" :model="newsItem")
            el-form-item(label="Заголовок" prop="title")
              el-input(:value="newsItem.title" @input="updateNews($event, index, 'title')")

            el-form-item(label="Описание")
              el-input(
                type="textarea" :autosize="{ minRows: 2 }"
                :value="newsItem.desc" @input="updateNews($event, index, 'desc')"
              )

            el-form-item(label="Текст")
              el-input(
                type="textarea" :autosize="{ minRows: 2 }"
                :value="newsItem.text" @input="updateNews($event, index, 'text')"
              )

            el-form-item.site-page-admin__image-block(label="Картинка")
              img.site-page-admin__img(
                v-if="newsItem.image"
                :src="newsItem.image"
              )
              .site-section-admin-products__plus-image(v-else @click="filesListVisible = trure")
                i.el-icon-plus

              input-image(
                :value="newsItem.image"
                path="/files"
                placeholder="Изменить картинку"
                :modal-append-to-body="false"
                @input="updateNews($event, index, 'image')"
              )

            el-button.site-section-admin__save-item(@click="save(`form-${index}`, newsItem)" type="success") Сохранить Новость
            el-button(@click="deleteSection(index)" type="danger") Удалить Новость

      .site-section-admin__new-item(@click="setSection")
        span Добавить Новость
        .site-section-admin__new-item-plus +

      a(href="/")
        el-button Выйти из админки
</template>

<script>
  import ElCollapse from 'element-ui/lib/collapse'
  import ElCollapseItem from 'element-ui/lib/collapse-item'
  import ElNotification from 'element-ui/lib/notification'
  import ElForm from 'element-ui/lib/form'
  import ElFormItem from 'element-ui/lib/form-item'
  import ElInput from 'element-ui/lib/input'
  import ElButton from 'element-ui/lib/button'
  import ElDialog from 'element-ui/lib/dialog'
  import ElUpload from 'element-ui/lib/upload'
  import ElMessageBox from 'element-ui/lib/message-box'

  export default {
    name: 'site-page-admin',

    data () {
      return {
        /* Видимость списка файлов */
        filesListVisible: false,

        activeName: 0,

        activeImagePath: '',

        mimeList: ['image/png', 'image/jpeg', 'image/gif'],

        /* Правила формы */
        formRules: {
          title: [
            { required: true, message: 'Поле обязательно для заполнения', trigger: 'blur' },
            { min: 3, max: 100, message: 'Длина от 3 до 100', trigger: 'blur' }
          ],
          text: [
            { required: true, message: 'Поле обязательно для заполнения', trigger: 'blur' }
          ]
        }
      }
    },

    computed: {
      news () {
        let newsList = this.$store.state.news.list

        let list = []
        newsList.forEach(item => {
          let obj = {}
          Object.keys(item).forEach(key => {
            obj[key] = item[key]
          })
          list.push(obj)
        })

        return list
      },

      filesList () {
        return this.$store.state.files.list
      }
    },

    methods: {
      updateNews (value, index, key) {
        this.$store.commit('news/updateNews', { value: value, index: index, key: key })
      },

      setSection () {
        this.arrayForms.push({
          name: 'Новая новость',
          desc: '',
          image: '',
          text: ''
        })
        this.activeName = parseInt(this.arrayForms.length - 1)
      },

      /**
       * Сохранить изменения Новости
       * @param formName
       */
      save (formName, newsItem) {
        this.$refs[formName][0].validate(async (valid) => {
          if (valid) {
            this.$axios.$put('/news', { newsItem: newsItem }).then(() => {
              ElNotification({
                message: 'Новость успешно сохранёна',
                type: 'success'
              })
            })
          } else {
            console.log('inValid')
          }
        })
      },

      /**
       * Удалить автомобиль
       * @param index
       */
      deleteSection (index) {
        ElMessageBox.confirm(`Вы действительно хотите удалить Новость?`, 'Warning', {
          confirmButtonText: 'ДА',
          cancelButtonText: 'НЕТ',
          type: 'warning'
        }).then(async () => {
          this.arrayForms.splice(index, 1)

          const news = this.arrayForms
          this.$store.dispatch('news/loadList')
          this.$axios.$put('/api/news', { news: news })

          ElNotification({
            message: 'Автомобиль успешно удален',
            type: 'success'
          })
        }).catch(() => {
          console.log('Отменено')
        })
      },

      /**
       * выбрать и установить картинку
       */
      selectImage () {
        this.arrayForms[parseInt(this.activeName)].image = this.filesList[this.activeFile].path
        this.filesListVisible = false
      }
    },

    components: {
      ElCollapse,
      ElCollapseItem,
      ElForm,
      ElFormItem,
      ElInput,
      ElButton,
      ElDialog,
      ElUpload
    }
  }
</script>

<style lang="sass">
  .site-page-admin
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

    &-container
      width: 900px
      margin: auto
      background-color: white
      height: auto
      padding: 0 2rem

    &__image-block
      .el-form-item__content
      margin-top: 2.5rem

    &__img
      max-width: 900px
      max-height: 500px
      margin: .5rem 1rem

    &__plus-image
      border: 1px dashed #d9d9d9
      border-radius: 6px
      cursor: pointer
      position: relative
      overflow: hidden
      width: 150px
      height: 150px
      line-height: 150px
      text-align: center
      font-size: 2rem
      margin: .5rem 1rem

      &:hover
        border-color: #409EFF

    &__save-item
      margin-bottom: 1rem

    &__new-item
      border-radius: 0
      border: 1px dashed #d9d9d9
      width: 100%
      display: flex
      justify-content: space-between
      line-height: 1
      cursor: pointer
      background: white
      color: #303133
      padding: 12px 1rem
      font-size: 14px
      margin-bottom: 1rem

      &:hover
        border-color: #409EFF

      &-plus
        margin-right: 8px
        font-size: 1.1rem
</style>
