const sharedConfig = require('@repo/ui/tailwind.config.ts');

module.exports = {
  // Use the shared config
  ...sharedConfig,
  // Configure content paths for this specific app
  content: [
    './App.tsx',
    './src/**/*.{js,ts,jsx,tsx}',
    '../../packages/ui/src/**/*.{js,ts,jsx,tsx}',
  ],
};
