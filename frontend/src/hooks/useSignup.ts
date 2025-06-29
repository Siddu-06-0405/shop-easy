// src/hooks/useSignup.ts
import { useAuth } from '../context/AuthContext';
import { User } from '../types/User';
import API from '@/utils/api'; // ✅ use shared API instance

interface SignupData {
  name: string;
  email: string;
  password: string;
  contact: string;
  location?: string;
}

export const useSignup = () => {
  const { login } = useAuth();

  const signupUser = async (data: SignupData): Promise<void> => {
    try {
      const response = await API.post<User>('/auth/register', data); // ✅ consistent endpoint
      login(response.data); // ✅ logs in right after signup
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Signup failed');
    }
  };

  return { signupUser };
};
