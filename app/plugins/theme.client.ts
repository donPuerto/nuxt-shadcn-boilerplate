export default defineNuxtPlugin(() => {
  if (import.meta.client) {
    const savedTheme = localStorage.getItem('theme');
    const root = document.documentElement;
    
    if (savedTheme && ["light", "dark", "pink", "blue", "green"].includes(savedTheme)) {
      root.classList.add(savedTheme);
    } else if (savedTheme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      root.classList.add(systemTheme);
    } else {
      // Default
      root.classList.add('light');
    }
  }
});
