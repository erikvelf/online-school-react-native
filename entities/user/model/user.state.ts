import { atom, useAtom } from "jotai";
import { User } from "./user.model";

// by default uses the description of our atom's state
// setting the default values for the profile atom
export const profileAtom = atom<UserState>({
  profile: {
    name: "newUser",
    id: 1,
  },
  isLoading: false,
  error: null,
});

// defining what will the profileAtom store
export interface UserState {
  profile: User | null;
  isLoading: boolean;
  error: string | null;
}
