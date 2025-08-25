# @repo/ui

This package contains the shared UI components for the monorepo, built with React and Tailwind CSS. It ensures a consistent design system across all applications (web and mobile).

## Features

- **Shared Components**: Reusable React components like `Button`, `Input`, etc.
- **Tailwind CSS Config**: A centralized Tailwind CSS configuration (`tailwind.config.ts`) that is used by all apps. This includes the color palette, fonts, and other design tokens.
- **Global Styles**: A `styles.css` file with the base Tailwind directives.

## How to Use

### Installing Components

To use a component from this package, import it directly. For example, to use the `Button` component:

```tsx
import { Button } from '@repo/ui/Button';

function MyComponent() {
  return <Button>إضافة إلى السلة</Button>; // "Add to Cart"
}
```

### Setting up Tailwind CSS in an App

To use the shared Tailwind CSS configuration in a consumer application (e.g., in `apps/web`), you need to import it in the app's `tailwind.config.js` file:

```js
const sharedConfig = require('@repo/ui/tailwind.config.ts');

module.exports = {
  // Spread the shared config
  ...sharedConfig,
  // Add app-specific content paths
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    // Make sure to include the UI package's components
    '../../packages/ui/src/**/*.{js,ts,jsx,tsx}',
  ],
};
```

You also need to import the shared styles in your app's main CSS file:

```css
@import '@repo/ui/styles.css';

/* Add any app-specific styles here */
```
