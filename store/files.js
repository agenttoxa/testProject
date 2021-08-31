export const state = () => ({
  list: null
})

export const mutations = {
  setList (state, listOfPaths) {
    state.list = listOfPaths
  }
}

export const actions = {
  async loadList ({ commit }) {
    commit('setList', await this.$axios.$get('/api/files'))
  }
}
