import lodash from 'lodash'
import { reactive } from 'vue';

const WORK_COLOR = '#97281C'
const SHORT_COLOR = '#35521C'
const LONG_COLOR = '#1C5338'

function _getState() {
  let loaded
  try {
    loaded = JSON.parse(localStorage.getItem('state'))
  } catch(e) {
    console.error(e)
  }

  return lodash.defaultsDeep({}, loaded??{}, {
    application: {
      currentMode: 'work',
      countdownTime: loaded?.settings?.modes?.work?.minutes*60 ?? 25*60,
      history: [
      ]
    },
    settings: {
      backgroundGradient: true,
      backgroundAnimated: true,
      maxHistory: 9,
      notificationSound: 'bell',
      showNotification: true,
      notificationVolume: 1,
      modes: {
        work: {
          name: 'work',
          minutes: 25,
          accent: WORK_COLOR
        },
        short: {
          name: 'short',
          minutes: 5,
          accent: SHORT_COLOR
        }, 
        long: {
          name: 'long',
          minutes: 15,
          accent: LONG_COLOR
        }
      }
    }
  })
}

export default {
  state: reactive(_getState()),

  getModeData(name) {
    name = name ?? this.state.application.currentMode

    return this.state.settings.modes[name]
  },

  setMode(name) {
    this.state.application.currentMode = name
  },

  addHistory(mode) {
    this.state.application.history.push(mode)
    this.pruneHistory()
  },

  pruneHistory() {
    while (this.state.application.history.length > this.state.settings.maxHistory) {
      this.state.application.history.shift()
    }
  },

  resetState() {
    this.state.settings.backgroundGradient = true
    this.state.settings.backgroundAnimated = true
    this.state.settings.maxHistory = 9
    this.state.settings.notificationSound = 'bell'
    this.state.settings.showNotification = true
    this.state.settings.notificationVolume = 1
    this.state.settings.modes.work.name = 'work'
    this.state.settings.modes.work.minutes = 25
    this.state.settings.modes.work.accent = WORK_COLOR
    this.state.settings.modes.short.name = 'short'
    this.state.settings.modes.short.minutes = 5
    this.state.settings.modes.short.accent = SHORT_COLOR
    this.state.settings.modes.long.name = 'long'
    this.state.settings.modes.long.minutes = 15
    this.state.settings.modes.long.accent = LONG_COLOR
    this.save()
  },

  save() {
    this.pruneHistory()
    
    const state = {
      settings: this.state.settings
    }

    localStorage.setItem('state', JSON.stringify(state))
  },
}