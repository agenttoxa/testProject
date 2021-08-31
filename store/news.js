export const state = () => ({
  list: null
})

export const mutations = {
  /**
   *
   * @param state
   * @param pages
   */
  setList (state, news) {
    state.list = []

    if (news && Array.isArray(news)) {
      news.forEach(item => {
        state.list.push({
          id: item.id,
          title: typeof item.title === 'string' ? item.title : '',
          desc: typeof item.desc === 'string' ? item.desc : '',
          text: typeof item.text === 'string' ? item.text : '',
          image: typeof item.image === 'string' ? item.image : '',
          published: item.published,
          deleted: item.deleted
        })
      })
    }
  },

  updateNews (state, payload) {
    state.list[payload.index][payload.key] = payload.value
  }
}

export const actions = {
  /***
   *
   * @param state
   * @param commit
   * @return {Promise<void>}
   */
  async loadList ({ state, commit }) {
    if (state.list === null) {
      commit('setList', await this.$axios.$get('/news.json'))
    }
  }
}
