// we want a persistent atom that updates
import { atomWithStorage, createJSONStorage } from "jotai/utils";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { atom } from "jotai";
import { AuthResponse, LoginRequest } from "./auth.interfaces";
import axios, { AxiosError } from "axios";
import { API } from "../api/api";

// '() => AsyncStorage' means that we want the createJSONStorage function to work with AsyncStorage
const storage = createJSONStorage<AuthState>(() => AsyncStorage);

// arguments of atom: (getterFunc, setterFunc)
export const loginAtom = atom(
  (get) => get(authAtom),
  async (_get, set, { email, password }: LoginRequest) => {
    set(authAtom, {
      isLoading: true,
      accessToken: null,
      error: null,
    });
    try {
      const { data } = await axios.post<AuthResponse>(API.login, {
        email: email,
        password: password,
      });
      set(authAtom, {
        isLoading: false,
        accessToken: data.accessToken,
        error: null,
      });
    } catch (error) {
      if (error instanceof AxiosError) {
        set(authAtom, {
          isLoading: false,
          accessToken: null,
          error: error.response?.data.message,
        });
      }
    }
  },
);

export const authAtom = atomWithStorage<AuthState>(
  "auth",
  {
    accessToken: null,
    isLoading: false,
    error: null,
  },
  storage,
);

export interface AuthState {
  accessToken: string | null;
  isLoading: boolean;
  error: string | null;
}
