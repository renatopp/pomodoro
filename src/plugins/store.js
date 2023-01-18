import { reactive } from 'vue'
import lodash from 'lodash'

const WORK_COLOR = '#D95550'
const SHORT_COLOR = '#226FD3'
const LONG_COLOR = '#228C94'

function _getState() {
  let loaded
  try {
    loaded = JSON.parse(localStorage.getItem('state-v2'))
  } catch(e) {
    console.error(e)
  }

  return lodash.defaultsDeep({}, loaded??{}, {
    application: {
      currentMode: 'work',
      active: true,
      notificationPermission: null,
      countdownTime: (loaded?.settings?.modes?.work?.minutes ?? 25)*60,
      settingsColor: null,
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

const store = {
  state: reactive(_getState()),

  setMode(name) {
    this.state.application.currentMode = name
  },

  getMode(name) {
    name = name ?? this.state.application.currentMode
    return this.state.settings.modes[name]
  },

  setTime(time) {
    this.state.application.countdownTime = time
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

    localStorage.setItem('state-v2', JSON.stringify(state))
  },
}

export default {
  install: (app, options) => {
    app.provide('store', store)
    window.$store = store
    window.$state = store.state
  }
}