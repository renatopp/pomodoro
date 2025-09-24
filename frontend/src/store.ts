import { reactive } from "vue";
import chroma from "chroma-js";
import formatTime from "format-duration";

export type Pages = "timer" | "settings";
export type Sounds = "bell";

interface Settings {
  historyEnabled: boolean;
  historyMax: number;
  notificationEnabled: boolean;
  notificationPermission: NotificationPermission;
  notificationSound: string;
  notificationVolume: number;
  displayChangeTitle: boolean;
  displayLightColor: string;
  displayDarkColor: string;
  profiles: Profile[];
}

class Profile {
  public id = crypto.randomUUID();
  public name: string = "Default";
  public duration: number = 25 * 60; // in seconds
  public color: string = chroma.random().hex();

  constructor(name: string, duration: number, color: string) {
    this.name = name;
    this.duration = duration;
    this.color = color;
  }
}

const defaultProfiles = {
  Work: new Profile("Work", 25 * 60, "#FF5D5D"),
  Short: new Profile("Short", 5 * 60, "#087E8B"),
  Long: new Profile("Long", 15 * 60, "#6CC551"),
};

export class State {
  public version: number = 1;
  public page: Pages = "timer";
  public timer: number = defaultProfiles.Work.duration * 1000 + 999; // in milliseconds
  public isRunning: boolean = false;
  public currentProfile: string = defaultProfiles.Work.id;
  public history: number[] = [];
  public settings: Settings = {
    historyEnabled: true,
    historyMax: 9,
    notificationEnabled: false,
    notificationPermission: "default",
    notificationSound: "bell",
    notificationVolume: 100,
    displayChangeTitle: true,
    displayLightColor: "#FFFCEA",
    displayDarkColor: "#1A1A1A",
    profiles: [
      defaultProfiles.Work,
      defaultProfiles.Short,
      defaultProfiles.Long,
    ],
  };

  public callbacks: (() => void)[] = [];
}

const data = reactive(loadState());

// APPLICATION CONTROLS -------------------------------------------------------
function setPage(page: Pages) {
  pauseTimer();
  data.page = page;
}

function saveState() {
  localStorage.setItem("state", JSON.stringify(data));
}

function loadState(): State {
  const saved = localStorage.getItem("state");
  const data = reactive(new State());
  if (saved) {
    Object.assign(data, JSON.parse(saved));
  }
  return data;
}

// SETTINGS CONTROLS ----------------------------------------------------------
function newProfile(): Profile {
  const profile = new Profile("New Profile", 10 * 60, chroma.random().hex());
  data.settings.profiles.push(profile);
  return profile;
}

function deleteProfile(profileId: string): boolean {
  if (data.settings.profiles.length <= 1) return false; // Prevent deleting the last profile

  const index = data.settings.profiles.findIndex((p) => p.id === profileId);
  if (index !== -1) {
    data.settings.profiles.splice(index, 1);
    if (data.currentProfile === profileId) {
      data.currentProfile = data.settings.profiles[0].id;
    }
  }
  return true;
}

function getCurrentProfile(): Profile {
  return (
    data.settings.profiles.find((p) => p.id === data.currentProfile) ||
    data.settings.profiles[0]
  );
}

// HISTORY CONTROLS -----------------------------------------------------------
function addToHistory(duration: number) {
  if (!data.settings.historyEnabled) return;

  data.history.unshift(duration);
  if (data.history.length > data.settings.historyMax) {
    data.history.pop();
  }
}

function clearHistory() {
  data.history = [];
}

// TIMER CONTROLS -------------------------------------------------------------
function startTimer(profileId: string) {
  const profile = data.settings.profiles.find((p) => p.id === profileId);
  if (!profile) return;

  data.currentProfile = profileId;
  data.timer = profile.duration * 1000 + 999; // Add 999ms to account for the first tick
  data.isRunning = true;
}

function pauseTimer() {
  data.isRunning = false;
}

function resumeTimer() {
  if (data.timer > 0) {
    data.isRunning = true;
  }
}

function toggleTimer() {
  if (data.isRunning) {
    pauseTimer();
  } else {
    resumeTimer();
  }
}

function onTimerEnd(cb: () => void) {
  data.callbacks.push(cb);
}

function offTimerEnd(cb: () => void) {
  const index = data.callbacks.indexOf(cb);
  if (index !== -1) {
    data.callbacks.splice(index, 1);
  }
}

function _tick() {
  if (!data.isRunning) return;

  data.timer -= 50;
  if (data.timer <= 0) {
    data.timer = 0;
    data.isRunning = false;
    addToHistory(getCurrentProfile().duration);
    data.callbacks.forEach((cb) => cb());
  }
  _updateTitle();
}
function _updateTitle() {
  if (!data.settings.displayChangeTitle) {
    document.title = "Pomodoro";
    return;
  }
  document.title = `${formatTime(data.timer, { leading: true })} - Pomodoro`;
}
setInterval(_tick, 50);
_updateTitle();

export default {
  state: data,

  setPage,
  saveState,
  loadState,

  newProfile,
  deleteProfile,
  getCurrentProfile,

  addToHistory,
  clearHistory,

  startTimer,
  pauseTimer,
  resumeTimer,
  toggleTimer,
  onTimerEnd,
  offTimerEnd,
};
