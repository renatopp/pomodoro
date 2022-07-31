import store from '../store'
import NotificationSound from '../types/NotificationSounds'

export default {
  install(app) {
    app.config.globalProperties.$notification = {
      show(type) {
        const audio = new Audio(NotificationSound[store.state.settings.notificationSound].path); // path to file
        audio.volume = store.state.settings.notificationVolume ?? 1
        audio.play();

        if (!store.state.settings.showNotification) return
        // window.alert(type);
      }
    }
  }
}
