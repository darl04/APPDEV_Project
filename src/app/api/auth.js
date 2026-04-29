import { Platform } from 'react-native';

// NOTE:
// - Android emulator: use 10.0.2.2 to reach your PC "localhost"
// - iOS simulator: localhost works
// - Real device: replace with your PC's LAN IP (e.g. 192.168.x.x)
const BASE_URL =
  Platform.OS === 'android'
    ? 'http://10.0.2.2:8000/api'
    : 'http://127.0.0.1:8000/api';
const options = {
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
};

export async function Login({ email, password }) {
  const response = await fetch(BASE_URL + '/login', {
    method: 'POST',
    ...options,
    body: JSON.stringify({ email, password }),
  });
  const text = await response.text();
  const data = text ? JSON.parse(text) : null;

  if (response.ok) {
    return data;
  }
  throw new Error(data.message || 'Login failed');
}

export async function Register({ name, email, password, confirmPassword }) {
  const response = await fetch(BASE_URL + '/register', {
    method: 'POST',
    ...options,
    body: JSON.stringify({
      name,
      email,
      password,
      password_confirmation: confirmPassword,
    }),
  });
  const text = await response.text();
  const data = text ? JSON.parse(text) : null;

  if (response.ok) {
    return data;
  }
  throw new Error(data?.message || 'Register failed');
}
