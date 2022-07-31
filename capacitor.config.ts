import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'dev.r2p.pomodoro',
  appName: 'R2P Pomodoro Time',
  webDir: 'dist',
  bundledWebRuntime: false,
  backgroundColor: '#D95550',
  plugins: {
    LocalNotifications: {
      smallIcon: "icon",
      iconColor: "#97281C",
      sound: "beep.wav"
    }
  }
};

export default config;
