import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../constants";

export const courseApi = createApi({
  reducerPath: "courseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    credentials: "include",
  }),
  tagTypes: ["Course"],
  endpoints: (builder) => ({
    getCourses: builder.query({
      query: () => ({
        url: "/api/courses",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          "Content-Type": "application/json",
        },
      }),
      providesTags: ["Course"],
    }),
    getCourse: builder.query({
      query: (id) => ({
        url: `/api/courses/${id}`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          "Content-Type": "application/json",
        },
      }),
      providesTags: ["Course"],
    }),
    createCourse: builder.mutation({
      query: (course) => ({
        url: `/api/courses/add`,
        method: "POST",
        body: course,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["Course"],
    }),
    editCourse: builder.mutation({
      query: (course) => ({
        url: `/api/courses/edit/${course._id}`,
        method: "PUT",
        body: course.body,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["Course"],
    }),
    deleteCourse: builder.mutation({
      query: (id) => ({
        url: `/api/courses/delete/${id}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["Course"],
    }),
  }),
});

export const {
  useGetCoursesQuery,
  useGetCourseQuery,
  useEditCourseMutation,
  useCreateCourseMutation,
  useDeleteCourseMutation,
} = courseApi;
