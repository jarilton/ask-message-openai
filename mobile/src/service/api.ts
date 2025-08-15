import axios from 'axios';
import Constants from 'expo-constants';

export const api = axios.create({
  baseURL: Constants.expoConfig?.extra?.EXPO_PUBLIC_API_URL || 'http://localhost:3333',
  timeout: 10000,
});
