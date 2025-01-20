import { atom, useAtom } from "jotai";
import { User, UserRequest } from "./user.model";
import { authAtom } from "../../auth/model/auth.state";
import axios, { AxiosError } from "axios";
import { isLoading } from "expo-font";
import { AuthResponse } from "../../auth/model/auth.interfaces";
import { API } from "../api/api";
import { setNativeProps } from "react-native-reanimated";

// by default uses the description of our atom's state
// setting the default values for the profile atom
export const profileAtom = atom<UserState>({
  profile: null,
  isLoading: false,
  error: null,
});

export const updateProfileAtom = atom(
  async (get) => {
    return get(profileAtom);
  },
  async (get, set, { photo }: { photo: string }) => {
    try {
      const { accessToken } = await get(authAtom);
      const { data } = await axios.patch(
        API.profile,
        {
          photo: photo,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      set(profileAtom, {
        isLoading: false,
        error: null,
        profile: data,
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
      const { data } = await axios.get<UserRequest>(API.profile, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      set(profileAtom, {
        isLoading: true,
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
