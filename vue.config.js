module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],

  configureWebpack: {
    devServer: {
      host: 'http://service.tasio.io/',
      port: '9772'
    }
  }
}

'use strict'