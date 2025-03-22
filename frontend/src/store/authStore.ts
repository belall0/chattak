import { create } from 'zustand';
import axios from 'axios';
import { SignupFormData } from '@/lib/types/auth.type';

// Define the state and actions for the auth store
interface AuthState {
  user: any | null;
  isLoading: boolean;
  error: string | null;
  status: {
    success: boolean;
    message: string;
  } | null;

  signup: (data: SignupFormData) => Promise<void>;
  clearStatus: () => void;
}

// axios instance
const api = axios.create({
  baseURL: 'http://localhost:3000/api',
  withCredentials: true, // for cookie handling
});

export const useAuthStore = create<AuthState>((set) => ({
  // initial state
  user: null,
  isLoading: false,
  error: null,
  status: null,

  // actions
  signup: async (data: SignupFormData) => {
    try {
      set({ isLoading: true, error: null, status: null });

      // Remove confirmPassword as it's not needed for the API
      const { confirmPassword, ...signupData } = data;

      const response = await api.post('/auth/signup', signupData);

      set({
        user: response.data, // store the user data so we can use it in the app for authentication
        isLoading: false,
        status: {
          success: true,
          message: 'Account created successfully!',
        },
      });
    } catch (axiosError: any) {
      set({
        isLoading: false,
        status: {
          success: false,
          message: axiosError.response.data.message || 'An error occured while creating your account',
        },
      });
    }
  },

  clearStatus: () => set({ status: null, error: null }),
}));
