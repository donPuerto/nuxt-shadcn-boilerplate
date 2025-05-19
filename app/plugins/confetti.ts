// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default defineNuxtPlugin((nuxtApp) => {
  // Only run on client side
  if (import.meta.client) {
    
    // Define the JS Confetti types
    interface JSConfettiApi {
      JSConfetti: { 
        new (): {
          addConfetti: (options?: { 
            emojis?: string[];
            emojiSize?: number;
            confettiColors?: string[];
            confettiRadius?: number;
            confettiNumber?: number;
          }) => Promise<void>;
          clearCanvas: () => void;
        } 
      }
    }

    // Declare it for TypeScript
    declare global {
      // eslint-disable-next-line @typescript-eslint/no-empty-object-type
      interface Window extends JSConfettiApi {}
    }
    
    // Track if confetti is loaded
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let confettiInstance: any = null;
    let isLoaded = false;

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
      try {
        // Create JSConfetti with default canvas
        confettiInstance = new JSConfetti();
        isLoaded = true;
      } catch (error) {
        console.error('Error initializing confetti:', error);
      }
    });
    
    // Define options type for confetti
    type ConfettiOptions = {
      emojis?: string[];
      emojiSize?: number;
      confettiColors?: string[];
      confettiRadius?: number;
      confettiNumber?: number;
    };

    // Function to trigger confetti with custom options
    const triggerConfetti = (options?: ConfettiOptions) => {
      if (!isLoaded || !confettiInstance) {
        return;
      }
      
      try {
        confettiInstance.addConfetti(options);
      } catch (error) {
        console.error('Confetti error:', error);
      }
    };

    // Provide confetti functionality to components
    return {
      provide: {
        confetti: {
          trigger: triggerConfetti,
          instance: confettiInstance,
          clear: () => {
            if (isLoaded && confettiInstance) {
              confettiInstance.clearCanvas();
            }
          }
        }
      }
    }
  }
})
