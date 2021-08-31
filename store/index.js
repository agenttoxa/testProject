export const actions = {
  async nuxtServerInit ({ dispatch }) {
    await dispatch('news/loadList')
    // await dispatch('files/loadList')
  }
}
