module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],

  configureWebpack: {
    devServer: {
      host: '0.0.0.0',
      port: '9772',
      disableHostCheck : true
    }
  }
}