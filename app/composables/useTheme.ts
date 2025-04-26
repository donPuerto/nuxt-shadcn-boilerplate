import { ref, watch, onMounted } from 'vue';

export function useTheme() {
  const theme = ref('system');
  const availableThemes = ["light", "dark", "system", "pink", "blue", "green"];

  // Load theme from localStorage on mount
  onMounted(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme && availableThemes.includes(savedTheme)) {
      theme.value = savedTheme;
      applyTheme(savedTheme);
    } else {
      applyTheme('system');
    }
  });

  // Watch for theme changes
  watch(theme, (newTheme) => {
    localStorage.setItem('theme', newTheme);
    applyTheme(newTheme);
  });

  // Apply theme to document
  function applyTheme(newTheme: string) {
    const root = document.documentElement;
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    
    // Remove all existing theme classes
    root.classList.remove('light', 'dark', 'pink', 'blue', 'green');
    
    // Apply the new theme
    if (newTheme === 'system') {
      root.classList.add(systemTheme);
    } else {
      root.classList.add(newTheme);
    }
  }

  return {
    theme,
    availableThemes,
    setTheme: (newTheme: string) => {
      theme.value = newTheme;
    }
  };
}
