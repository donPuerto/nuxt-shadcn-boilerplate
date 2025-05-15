// You can also declare global types here
declare global {
  interface Window {
    analyticsTracker?: (event: string) => void;
  }
}
