import NotificationSounds from '../types/NotificationSounds';

async function _requestBrowserNotification() {
  const permission = await Notification.requestPermission();
  $store.state.application.notificationPermission = permission
}

async function _showNotification(type) {
  if (!window.Notification) return

  if (!$store.state.application.notificationPermission) {
    await _requestBrowserNotification()
  }
  const mode = $store.getMode()
  const notification = new Notification('Time\'s up!', {
    body: `Your ${mode?.name ?? type} time has ended.`,
    icon: `/apps/pomodoro/assets/icon/icon.png`
  });
  setTimeout(() => notification.close(), 5*1000);
}

const notification = {
  show(type) {
    const audio = new Audio(NotificationSounds[$store.state.settings.notificationSound].path);
    audio.volume = $store.state.settings.notificationVolume ?? 1
    audio.play();

    if (!$store.state.settings.showNotification) return

    if (window.Notification) {
      _showNotification(type)
    }
  }
}

export default {
  install: (app, options) => {
    app.provide('notification', notification)
    window.$notification = notification
  }
}