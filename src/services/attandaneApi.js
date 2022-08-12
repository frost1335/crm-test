import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../constants";

export const attandanceApi = createApi({
  reducerPath: "attandanceApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    credentials: "include",
  }),
  tagTypes: ["Attandance"],
  endpoints: (builder) => ({
    getAttandance: builder.query({
      query: (id) => ({
        url: `/api/attendance/${id}`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          "Content-Type": "application/json",
        },
      }),
      providesTags: ["Attandance"],
    }),
    editAttendance: builder.mutation({
      query: (course) => ({
        url: `/api/attendance/${course._id}`,
        method: "PUT",
        body: course,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["Attandance"],
    }),
  }),
});

export const { useGetAttandanceQuery, useEditAttendanceMutation } =
  attandanceApi;
