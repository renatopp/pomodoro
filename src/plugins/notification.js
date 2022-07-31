const { default: configs } = require('@/configs');

import store from '../store'
import NotificationSound from '../types/NotificationSounds'
import { LocalNotifications } from '@capacitor/local-notifications'

async function _requestBrowserNotification() {
  const permission = await Notification.requestPermission();
  store.state.application.notificationPermission = permission
}

async function _showBrowserNotification(type) {
  if (!window.Notification) return

  if (!store.state.application.notificationPermission) {
    await _requestBrowserNotification()
  }
  const mode = store.state.settings.modes[type]
  const notification = new Notification('Time\'s up!', {
    body: `Your ${mode?.name ?? type} time has ended.`,
    icon: `${configs.publicPath}assets/icon/icon.png`
  });
  setTimeout(() => notification.close(), 5*1000);
}

async function _scheduleMobileNotification(type) {
  const mode = store.state.settings.modes[type]
  LocalNotifications.schedule({
    notifications: [
      {
        id: 0,
        title: `Time's up!`,
        body: `Your ${mode?.name ?? type} time has ended.`,
        iconColor: mode?.accent,
        smallIcon: 'ic_launcher',
        largeIcon: 'ic_launcher',
      }
    ]
  })
  if (store.state.application.active) {
    setTimeout(() => LocalNotifications.removeAllDeliveredNotifications(), 5*1000);
  }
}

export default {
  install(app) {
    app.config.globalProperties.$notification = {
      requestPermission() {
        _requestBrowserNotification()
      },
      
      show(type) {
        const audio = new Audio(NotificationSound[store.state.settings.notificationSound].path); // path to file
        audio.volume = store.state.settings.notificationVolume ?? 1
        audio.play();

        if (!store.state.settings.showNotification) return

        if (window.Notification)
          _showBrowserNotification(type)
        else
          _scheduleMobileNotification(type)
      }
    }
  }
}
