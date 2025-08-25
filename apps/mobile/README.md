# mobile

This is the mobile application for the e-commerce platform, built with React Native and Expo.

## Features

- **React Native & Expo**: A cross-platform mobile application that runs on iOS and Android.
- **NativeWind**: Styled using Tailwind CSS syntax for a consistent design system with the web app.
- **tRPC Integration**: Type-safe API calls to the backend service using `@trpc/react-query`.
- **Shared UI**: Uses components from the `@repo/ui` package.

## How to Use

### Development

To start the mobile application in development mode, you will need the Expo Go app on your physical device or an emulator running.

1.  **Install Dependencies**: From the monorepo root, run `npm install`.
2.  **Start the Metro Bundler**: From the monorepo root, run the following command:

    ```bash
    npm run start --workspace=mobile
    ```

3.  **Run the App**:
    -   Scan the QR code with the Expo Go app on your phone.
    -   Or, press `a` to run on an Android emulator, or `i` to run on an iOS simulator.

### Prerequisites

- You will need to have a development environment set up for React Native. See the [React Native documentation](https://reactnative.dev/docs/environment-setup) for more details.
- For the application to run correctly and fetch data from the API, you must have the API service running and have a `.env` file at the monorepo root with the `EXPO_PUBLIC_API_URL` variable correctly set. See the root `README.md` for more details.
