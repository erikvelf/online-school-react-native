import axios, { AxiosError } from "axios";
import { atom } from "jotai";
import { authAtom } from "../../auth/model/auth.state";
import { API } from "../api/api";
import { StudentCourseDescription } from "./course.model";

export const courseAtom = atom<CourseState>({
  courses: [],
  isLoading: false,
  error: null,
});

export const loadCourseAtom = atom(
  async (get) => {
    return get(courseAtom);
  },
  async (get, set) => {
    try {
      const { accessToken } = await get(authAtom);
      set(courseAtom, {
        isLoading: true,
        courses: [],
        error: null,
      });
      const { data } = await axios.get<{ my: StudentCourseDescription[] }>(
        API.my,
        {
          params: {
            studentCourse: "dontMy",
          },
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      set(courseAtom, {
        isLoading: false,
        courses: data.my,
        error: null,
      });
    } catch (error) {
      if (error instanceof AxiosError) {
        set(courseAtom, {
          isLoading: false,
          courses: [],
          error: error.response?.data.message,
        });
      }
    }
  },
);

export interface CourseState {
  isLoading: boolean;
  courses: StudentCourseDescription[];
  error: null;
}
