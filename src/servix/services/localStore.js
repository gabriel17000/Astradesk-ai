const KEY = 'servix.workspace.v1';

export function loadWorkspace(seed) {
  try {
    const saved = localStorage.getItem(KEY);
    if (!saved) return seed;
    const parsed = JSON.parse(saved);
    return { ...seed, ...parsed };
  } catch {
    return seed;
  }
}

export function saveWorkspace(workspace) {
  try { localStorage.setItem(KEY, JSON.stringify(workspace)); return true; }
  catch { return false; }
}

