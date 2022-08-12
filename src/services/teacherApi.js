import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../constants";

export const teacherApi = createApi({
  reducerPath: "teacherApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    credentials: "include",
  }),
  tagTypes: ["Teacher"],
  endpoints: (builder) => ({
    getTeachers: builder.query({
      query: () => ({
        url: "/api/teachers",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      }),
      providesTags: ["Teacher"],
    }),
    getTeacher: builder.query({
      query: (id) => ({
        url: `/api/teachers/get_teacher/${id}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      }),
      providesTags: ["Teacher"],
    }),
    createTeacher: builder.mutation({
      query: (teacher) => ({
        url: `/api/teachers/add_teacher`,
        method: "POST",
        body: teacher,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      }),
      invalidatesTags: ["Teacher"],
    }),
    editTeacher: builder.mutation({
      query: (teacher) => ({
        url: `/api/teachers/update_teacher`,
        method: "PUT",
        body: teacher,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      }),
      invalidatesTags: ["Teacher"],
    }),
    deleteTeacher: builder.mutation({
      query: (id) => ({
        url: `/api/teachers/delete_teacher/${id}`,
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: document.cookie.replace("authToken=", ""),
        },
      }),
      invalidatesTags: ["Teacher"],
    }),
  }),
});

export const {
  useGetTeachersQuery,
  useGetTeacherQuery,
  useCreateTeacherMutation,
  useDeleteTeacherMutation,
  useEditTeacherMutation,
} = teacherApi;
