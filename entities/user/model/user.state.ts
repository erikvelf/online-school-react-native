import { atom, useAtom } from "jotai";
import { User } from "./user.model";
import { authAtom } from "../../auth/model/auth.state";
import axios, { AxiosError } from "axios";
import { isLoading } from "expo-font";
import { AuthResponse } from "../../auth/model/auth.interfaces";
import { API } from "../api/api";

// by default uses the description of our atom's state
// setting the default values for the profile atom
export const profileAtom = atom<UserState>({
  profile: null,
  isLoading: false,
  error: null,
});

export const loadProfileAtom = atom(
  async (get) => {
    return get(profileAtom);
  },
  async (get, set) => {
    const { accessToken } = await get(authAtom);
    set(profileAtom, {
      isLoading: true,
      profile: null,
      error: null,
    });

    try {
      const { data } = await axios.get<User>(API.profile, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      set(profileAtom, {
        isLoading: true,
        // TODO fix profile interface since the api changed a little in how it returns the profile data
        profile: data.profile,
        error: null,
      });
    } catch (error) {
      if (error instanceof AxiosError) {
        set(profileAtom, {
          isLoading: false,
          profile: null,
          error: error.response?.data.message,
        });
      }
    }
  },
);

// defining what will the profileAtom store
export interface UserState {
  profile: User | null;
  isLoading: boolean;
  error: string | null;
}
