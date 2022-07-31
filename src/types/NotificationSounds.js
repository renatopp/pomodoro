const { default: configs } = require('@/configs');

export default {
  none: {
    name: 'None',
  },
  bell: {
    name: 'Bell',
    path: `${configs.publicPath}assets/sfxs/bell.mp3`
  },
  acoustic_guitar: {
    name: 'Acoustic Guitar',
    path: `${configs.publicPath}assets/sfxs/acoustic-guitar.mp3`
  },
  clear_guitar: {
    name: 'Clear Guitar',
    path: `${configs.publicPath}assets/sfxs/clear-guitar.mp3`
  },
  harmonica: {
    name: 'Harmonica',
    path: `${configs.publicPath}assets/sfxs/harmonica.mp3`
  },
}