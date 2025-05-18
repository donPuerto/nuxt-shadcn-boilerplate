export default defineNuxtPlugin((nuxtApp) => {
  // Only run on client side
  if (import.meta.client) {
    
    // Define the JS Confetti types
    interface JSConfettiApi {
      JSConfetti: { 
        new (): {
          addConfetti: (options?: { 
            emojis?: string[];
            confettiColors?: string[];
            confettiRadius?: number;
            confettiNumber?: number;
          }) => void
        } 
      }
    }

    // Declare it for TypeScript
    declare global {
      // eslint-disable-next-line @typescript-eslint/no-empty-object-type
      interface Window extends JSConfettiApi {}
    }
    
    // Track if confetti is loaded
    let confettiInstance = null
    const isLoaded = false;

    // Confetti configuration options
    type ConfettiType = 'default' | 'emoji' | 'colored';

    // Function to trigger confetti with specific type
    const triggerConfetti = (type: ConfettiType = 'default') => {
      if (!isLoaded || !confettiInstance) {
        console.log('Confetti not ready, will try later');
        return;
      }
      
      try {
        if (type === 'emoji') {
          console.log('Triggering emoji confetti');
          confettiInstance.addConfetti({ 
            emojis: ['🌈', '⚡️', '💥', '✨', '💫', '🌸'],
            confettiNumber: 30
          });
        } else if (type === 'colored') {
          console.log('Triggering colored confetti');
          confettiInstance.addConfetti({
            confettiColors: ['#ff0000', '#00ff00', '#0000ff'],
            confettiRadius: 8,
            confettiNumber: 150
          });
        } else {
          console.log('Triggering default confetti');
          confettiInstance.addConfetti();
        }
      } catch (error) {
        console.error('Confetti error:', error);
      }
    };

    // Load JS Confetti
    const { onLoaded } = useScriptNpm<JSConfettiApi>({
      packageName: 'js-confetti',
      file: 'dist/js-confetti.browser.js',
      version: '0.12.0',
      scriptOptions: {
        use() {
          return { JSConfetti: window.JSConfetti }
        },
      },
    })

    // Create confetti instance when script is loaded
    onLoaded(({ JSConfetti }) => {
      // Create the instance directly as shown in docs
      confettiInstance = new JSConfetti();
      console.log('JSConfetti loaded successfully');
      
      // You can choose to show initial confetti here if desired
      // triggerConfetti('default');
    })
    
       
    
    // We'll use a ref to track if navigation confetti has been triggered
      let hasTriggeredInitialConfetti = false;
      
      // This is the only navigation hook - no duplicates
      nuxtApp.hook('page:finish', () => {
        // Only try to trigger confetti if it's loaded
        if (isLoaded && confettiInstance) {
          if (!hasTriggeredInitialConfetti) {
            // First navigation, use default confetti
            triggerConfetti('default');
            hasTriggeredInitialConfetti = true;
          } 
          // You could uncomment this if you want confetti on every navigation
          // else {
          //   triggerConfetti('default');
          // }
        }
      });

    // Provide confetti functionality to components
    return {
      provide: {
        confetti: {
          trigger: triggerConfetti
        }
      }
    }
  }
})
