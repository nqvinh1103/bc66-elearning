export const storage = {
  save(name, data) {
    localStorage.setItem(name, JSON.stringify(data));
  },
  get(name) {
    const value = localStorage.getItem(name);
    if (value) return JSON.parse(value);
    return null
  },
  remove(name) {
    localStorage.removeItem(name);
  },
};
