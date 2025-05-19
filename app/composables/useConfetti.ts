import { useNuxtApp } from '#app';

export function useConfetti() {
  const { $confetti } = useNuxtApp();

  /**
   * Tech-related emoji sets
   */
  const emojiSets = {
    vue: ['💚', '🟢', '⚡️', '🌐', '💻', '🚀', '⭐', '🧩'],
    tech: ['🔷', '📱', '💻', '⌨️', '🖱️', '🖥️', '⚙️', '🛠️'],
    web: ['🌐', '📊', '📈', '🔍', '💬', '📱', '🖌️', '🎨'],
    celebration: ['🎉', '🎊', '✨', '💯', '🏆', '🔥', '👏', '🙌'],
    dev: ['👨‍💻', '👩‍💻', '🧠', '💡', '🔧', '📚', '🎓', '💪']
  };

  /**
   * Brand colors for tech frameworks
   */
  const techColors = [
    '#42b883', // Vue green
    '#00DC82', // Nuxt green
    '#38bdf8', // Tailwind blue
    '#0EA5E9', // Tailwind darker blue
    '#3178c6', // TypeScript blue
    '#F7DF1E', // JavaScript yellow
    '#64748b', // Tailwind slate
    '#2dd4bf'  // Tailwind teal
  ];

  /**
   * Trigger confetti with random emojis from available sets
   */
  function randomEmoji(options?: { 
    size?: number;
    count?: number;
    sets?: ('vue' | 'tech' | 'web' | 'celebration' | 'dev')[];
  }) {
    if (!$confetti) return;

    const size = options?.size || 40;
    const count = options?.count || 40;
    
    // Determine which sets to use
    const setsToUse = options?.sets || ['vue', 'tech', 'web', 'dev'];
    
    // Create a pool of emojis from the selected sets
    let emojiPool: string[] = [];
    setsToUse.forEach(setName => {
      if (emojiSets[setName]) {
        emojiPool = [...emojiPool, ...emojiSets[setName]];
      }
    });
    
    // If we have no emojis, use the Vue set
    if (emojiPool.length === 0) {
      emojiPool = emojiSets.vue;
    }
    
    // Select 8 random emojis from the pool
    const randomEmojis: string[] = [];
    for (let i = 0; i < 8; i++) {
      const randomIndex = Math.floor(Math.random() * emojiPool.length);
      randomEmojis.push(emojiPool[randomIndex]);
    }
    
    // Trigger the confetti
    $confetti.trigger({
      emojis: randomEmojis,
      emojiSize: size,
      confettiNumber: count
    });
  }

  /**
   * Trigger confetti with tech framework colors
   */
  function techConfetti(options?: { 
    radius?: number;
    count?: number;
  }) {
    if (!$confetti) return;

    $confetti.trigger({
      confettiColors: techColors,
      confettiRadius: options?.radius || 10,
      confettiNumber: options?.count || 150
    });
  }

  /**
   * Clear the confetti canvas
   */
  function clear() {
    if ($confetti) {
      $confetti.clear();
    }
  }

  return {
    randomEmoji,
    techConfetti,
    clear
  };
}
