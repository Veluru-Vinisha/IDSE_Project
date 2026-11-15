const STORAGE_KEY = 'data_detective_game_state_v1';

const INITIAL_STATE = {
  currentCaseId: 1,
  unlockedCases: [1],
  completedCases: {},
  totalScore: 0,
  badges: [],
  notebookEntries: [],
  hasSeenBriefing: false,
};

export function loadGameState() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return INITIAL_STATE;
    const parsed = JSON.parse(data);
    return { ...INITIAL_STATE, ...parsed };
  } catch {
    return INITIAL_STATE;
  }
}

export function saveGameState(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (err) {
    console.error('Failed to save game state', err);
  }
}

export function resetGameState() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (err) {
    console.error('Failed to reset game state', err);
  }
  return INITIAL_STATE;
}
