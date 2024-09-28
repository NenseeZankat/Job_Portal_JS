import { createContext } from 'react';

export const AuthContext = createContext({
  isLoggedIn: false,
  isJobSeeker: false,
  login: () => {},
  logout: () => {},
  setJobSeeker: () => {}
});