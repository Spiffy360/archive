module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  css: {
    loaderOptions: {
      sass: {
        // Required for vue-cli-plugin-vuetify which injects Vuetify styles.
        prependData: ''
      }
    }
  }
}
