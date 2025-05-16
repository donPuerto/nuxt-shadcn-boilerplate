import { ref } from 'vue';

/**
 * Composable for creating a wave animation effect when switching UI modes/options
 */
export function useWaveAnimation() {
  const animationInProgress = ref(false);
  
  // Wave animation state
  const showWave = ref(false);
  const waveX = ref(0);
  const waveY = ref(0);
  const waveSize = ref(0);
  const waveOpacity = ref(1);
  const waveColor = ref('');
  
  /**
   * Trigger a wave animation from the clicked position
   * @param event - The click event that triggered the animation
   * @param color - The color of the wave
   * @param callback - Function to call when animation reaches the point to execute the change
   * @returns Promise that resolves when animation completes
   */
  const triggerWave = (event, color, callback) => {
    return new Promise((resolve) => {
      // Skip if animation is already in progress
      if (animationInProgress.value) {
        resolve();
        return;
      }
      
      // Set animation flag
      animationInProgress.value = true;
      
      // Get click position
      const clickX = event.clientX;
      const clickY = event.clientY;
      
      // Calculate max distance to farthest corner
      const maxX = Math.max(clickX, window.innerWidth - clickX);
      const maxY = Math.max(clickY, window.innerHeight - clickY);
      const maxRadius = Math.sqrt((maxX * maxX) + (maxY * maxY)) * 1.5;
      
      // Set wave properties
      waveColor.value = color;
      waveX.value = clickX;
      waveY.value = clickY;
      waveSize.value = 10; // Start small
      waveOpacity.value = 0.9;
      
      // Show the wave
      showWave.value = true;
      
      // Animation steps
      setTimeout(() => {
        // Expand wave
        waveSize.value = maxRadius * 2;
        
        // Execute callback (e.g., change theme or language)
        setTimeout(() => {
          if (callback) callback();
          
          // Fade out wave
          waveOpacity.value = 0;
          
          // Clean up
          setTimeout(() => {
            showWave.value = false;
            animationInProgress.value = false;
            resolve();
          }, 500);
        }, 200);
      }, 30);
    });
  };
  
  return {
    animationInProgress,
    showWave,
    waveX,
    waveY,
    waveSize,
    waveOpacity,
    waveColor,
    triggerWave
  };
}
