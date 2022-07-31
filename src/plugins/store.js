import store from '../store'

export default {
  install(app) {
    window.$store = store;
    window.$state = store.state;
    app.config.globalProperties.$store = store;
  }
}
