import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../constants";

export const adminApi = createApi({
  reducerPath: "adminApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    credentials: "include",
  }),
  tagTypes: ["Admin"],
  endpoints: (builder) => ({
    getAdmin: builder.query({
      query: () => ({
        url: "/api/dashboard",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          "Content-Type": "application/json",
        },
      }),
      providesTags: ["Admin"],
    }),
    createAdmin: builder.mutation({
      query: (admin) => ({
        url: `/api/auth/register`,
        method: "POST",
        body: admin,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["Admin"],
    }),
    editAdmin: builder.mutation({
      query: (admin) => ({
        url: `/api/auth/update/${admin._id}`,
        method: "POST",
        body: admin.admin,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["Admin"],
    }),
  }),
});

export const {
  useGetAdminQuery,
  useEditAdminMutation,
  useCreateAdminMutation,
} = adminApi;
