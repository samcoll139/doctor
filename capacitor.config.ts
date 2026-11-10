import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.suhacare.app',
  appName: 'Suha Care',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
