import { reactive } from "vue";
import chroma from "chroma-js";
import formatTime from "format-duration";
import formatDuration from "format-duration";

const DEFAULT_LIGHT_COLOR = "#FFFCEA";
const DEFAULT_DARK_COLOR = "#1A1A1A";
const DEFAULT_WORK_COLOR = "#FF5D5D";
const DEFAULT_SHORT_COLOR = "#087E8B";
const DEFAULT_LONG_COLOR = "#AA00FF";

export type Pages = "timer" | "settings";
export const SoundSources = [
  { id: "none", name: "None", path: "" },
  {
    id: "acoustic-guitar",
    name: "Acoustic Guitar",
    path: "assets/sounds/acoustic-guitar.mp3",
  },
  {
    id: "achievement",
    name: "Achievement",
    path: "assets/sounds/achievement.mp3",
  },
  { id: "beep", name: "Beep", path: "assets/sounds/beep.mp3" },
  { id: "bells", name: "Bells", path: "assets/sounds/bells.mp3" },
  { id: "drums", name: "Drums", path: "assets/sounds/drums.mp3" },
  { id: "guitar", name: "Guitar", path: "assets/sounds/guitar.mp3" },
  { id: "hawk", name: "Hawk", path: "assets/sounds/hawk.mp3" },
  { id: "interface", name: "Interface", path: "assets/sounds/interface.mp3" },
  { id: "pop", name: "Pop", path: "assets/sounds/pop.mp3" },
  { id: "reward", name: "Reward", path: "assets/sounds/reward.mp3" },
  { id: "water", name: "Water", path: "assets/sounds/water.mp3" },
];

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

export class Profile {
  public id = crypto.randomUUID();
  public name: string = "Default";
  public duration: number = 25 * 60 * 1000; // in milliseconds
  public color: string = chroma.random().hex();

  constructor(name: string, duration: number, color: string) {
    this.name = name;
    this.duration = duration;
    this.color = color;
  }

  copy(): Profile {
    const p = new Profile(this.name, this.duration, this.color);
    p.id = this.id;
    return p;
  }

  static from(p: Partial<Profile>): Profile {
    const profile = new Profile(
      p.name || "Default",
      p.duration || 25 * 60 * 1000,
      p.color || chroma.random().hex()
    );
    profile.id = p.id || crypto.randomUUID();
    return profile;
  }
}

const defaultProfiles = {
  Work: new Profile("Work", 25 * 60 * 1000, DEFAULT_WORK_COLOR),
  Short: new Profile("Short", 5 * 60 * 1000, DEFAULT_SHORT_COLOR),
  Long: new Profile("Long", 15 * 60 * 1000, DEFAULT_LONG_COLOR),
  // Test: new Profile("Test", 5 * 1000, "#6CC551"),
};

export class State {
  public version: number = 1;
  public page: Pages = "timer";
  public timer: number = defaultProfiles.Work.duration + 999; // in milliseconds
  public isRunning: boolean = false;
  public currentProfile: string = defaultProfiles.Work.id;
  public history: number[] = [];
  public settings: Settings = newSettings();
  public callbacks: (() => void)[] = [];
}

const data = reactive(loadState());

function newSettings(): Settings {
  return {
    historyEnabled: true,
    historyMax: 9,
    notificationEnabled: false,
    notificationPermission: "default",
    notificationSound: "acoustic-guitar",
    notificationVolume: 100,
    displayChangeTitle: true,
    displayLightColor: DEFAULT_LIGHT_COLOR,
    displayDarkColor: DEFAULT_DARK_COLOR,
    profiles: Object.values(defaultProfiles).map((p) => p.copy()),
  };
}

function resetAll() {
  data.settings = newSettings();
  setColors();
}

// APPLICATION CONTROLS -------------------------------------------------------
function setPage(page: Pages) {
  pauseTimer();
  data.page = page;
}

function saveState() {
  localStorage.setItem(
    "state",
    JSON.stringify({
      version: data.version,
      settings: data.settings,
    })
  );
}

function loadState(): State {
  const saved = localStorage.getItem("state");
  const data = reactive(new State());
  if (saved) {
    const parsed = JSON.parse(saved);
    parsed.settings.profiles = parsed.settings.profiles.map((p: any) =>
      Profile.from(p)
    );
    data.version = parsed.version || 1;
    data.settings = { ...data.settings, ...parsed.settings };
    data.currentProfile = data.settings.profiles[0].id;
  }
  return data;
}

function clearState() {
  localStorage.removeItem("state");
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

function getTextColor(bg?: string): [string, string] {
  bg = bg ?? getCurrentProfile().color;

  const light = data.settings.displayLightColor;
  const dark = data.settings.displayDarkColor;
  const lightContrast = chroma.contrast(bg, light);
  const darkContrast = chroma.contrast(bg, dark);

  if (lightContrast >= 2) {
    return [light, dark];
  } else {
    return lightContrast >= darkContrast ? [light, dark] : [dark, light];
  }
}

function setColors(bg?: string, fg?: string, fgAlt?: string) {
  const profile = getCurrentProfile();
  bg = bg ?? profile.color;
  const [light, dark] = getTextColor(bg);
  fg = fg ?? light;
  fgAlt = fgAlt ?? dark;

  const app = document.getElementById("app")!;
  app.style.setProperty("--js-color-background", bg);
  app.style.setProperty("--js-color-text", fg);
  app.style.setProperty("--js-color-text-inv", fgAlt);
}

function resetTextColors() {
  data.settings.displayLightColor = DEFAULT_LIGHT_COLOR;
  data.settings.displayDarkColor = DEFAULT_DARK_COLOR;
  const app = document.getElementById("app")!;
  app.style.setProperty("--js-color-text", DEFAULT_LIGHT_COLOR);
  app.style.setProperty("--js-color-text-inv", DEFAULT_DARK_COLOR);
}

function resetProfiles() {
  data.settings.profiles = Object.values(defaultProfiles).map((p) => p.copy());
}

// HISTORY CONTROLS -----------------------------------------------------------
function addToHistory(duration: number) {
  data.history.unshift(duration);
  if (data.history.length > data.settings.historyMax) {
    data.history.pop();
  }
}

function clearHistory() {
  data.history = [];
}

// NOTIFICATION CONTROLS ------------------------------------------------------

async function requestBrowserNotification() {
  const permission = await Notification.requestPermission();
  data.settings.notificationPermission = permission;
}

async function showToastNotification(
  title: string,
  message: string,
  icon: string
) {
  if (!window.Notification) return;

  if (!data.settings.notificationPermission) {
    await requestBrowserNotification();
  }
  const notification = new Notification(title, {
    body: message,
    icon: icon,
    silent: true,
  });
  setTimeout(() => notification.close(), 5 * 1000);
}

async function playSound(sound: string, volume: number) {
  if (!sound) return;
  try {
    const audio = new Audio(sound);
    audio.volume = volume / 100;
    audio.play();
  } catch (e) {
    console.error("Failed to play sound:", e);
  }
}

async function showNotification(
  enabled?: boolean,
  message?: string,
  sound?: string,
  volume?: number
) {
  const profile = getCurrentProfile();
  enabled = enabled ?? data.settings.notificationEnabled;
  sound =
    sound ??
    SoundSources.find((s) => s.id === data.settings.notificationSound)?.path;
  volume = volume ?? data.settings.notificationVolume;
  message =
    message ??
    `Your ${profile.name} (${formatDuration(profile.duration, {
      leading: true,
    })}) time has ended.`;

  playSound(sound!, volume);

  const title = "Time's up!";
  const icon = `assets/icon.png`;
  if (enabled) showToastNotification(title, message, icon);
}

// TIMER CONTROLS -------------------------------------------------------------
function startTimer(profileId: string) {
  const profile = data.settings.profiles.find((p) => p.id === profileId);
  if (!profile) return;

  data.currentProfile = profileId;
  data.timer = profile.duration + 999; // Add 999ms to account for the first tick
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
    showNotification();
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
setColors();

export default {
  state: data,

  resetAll,

  setPage,
  saveState,
  loadState,
  clearState,

  newProfile,
  deleteProfile,
  getCurrentProfile,
  getTextColor,
  setColors,
  resetTextColors,
  resetProfiles,

  addToHistory,
  clearHistory,

  requestBrowserNotification,
  showToastNotification,
  playSound,
  showNotification,

  startTimer,
  pauseTimer,
  resumeTimer,
  toggleTimer,
  onTimerEnd,
  offTimerEnd,
};
