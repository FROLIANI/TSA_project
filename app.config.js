import 'dotenv/config';

export default {
  expo: {
    name: 'Expo Firebase Starter',
    slug: 'expo-firebase',
    privacy: 'public',
    platforms: ['ios', 'android'],
    version: '0.15.0',
    orientation: 'portrait',
    icon: './assets/Tsa.jpeg',
    Tsa: {
      image: './assets/Tsa.jpeg',
      resizeMode: 'cover',
      backgroundColor: '#F57C00'
    },
    updates: {
      fallbackToCacheTimeout: 0
    },
    assetBundlePatterns: ['**/*'],  
    ios: {
      supportsTablet: true
    },
    extra: {
      apiKey: "AIzaSyBadbWypGwvbspbZnETnhRuyGa4Otc4M_M",
      authDomain: "tsa123-76b2e.firebaseapp.com",
      projectId: "tsa123-76b2e",
      storageBucket: "tsa123-76b2e.appspot.com",
      messagingSenderId: "857914660045",
      appId: "1:857914660045:web:e3b944b7898868bf7d8584",
      measurementId: "G-M345CGEJ8K"
    }
  }
};
