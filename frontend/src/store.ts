import { reactive } from "vue";

export type Pages = "timer" | "settings";

class State {
  public page: Pages = "timer";
}

const data = reactive(loadState());

function setPage(page: Pages) {
  pauseTimer();
  data.page = page;
}

// function startTimer(duration: number) {}
function pauseTimer() {}
// function resetTimer() {}
// function setProfile() {}

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

export default {
  data,
  setPage,
  saveState,
  loadState,
};
