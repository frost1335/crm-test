import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../constants";

export const groupApi = createApi({
  reducerPath: "groupApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    credentials: "include",
  }),
  tagTypes: ["Group"],
  endpoints: (builder) => ({
    getGroups: builder.query({
      query: (status) => ({
        url: "/api/groups/" + status,
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          "Content-Type": "application/json",
        },
      }),
      providesTags: ["Group"],
    }),
    getGroup: builder.query({
      query: (id) => ({
        url: `/api/groups/getOne/${id}`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          "Content-Type": "application/json",
        },
      }),
      providesTags: ["Group"],
    }),
    createGroup: builder.mutation({
      query: (group) => ({
        url: "/api/groups/add",
        method: "POST",
        body: group,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["Group"],
    }),
    editGroup: builder.mutation({
      query: (group) => ({
        url: `/api/groups/edit/${group._id}`,
        method: "PUT",
        body: group.group,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["Group"],
    }),
    deleteGroup: builder.mutation({
      query: (id) => ({
        url: `/api/groups/delete/${id}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["Group"],
    }),
  }),
});

export const {
  useCreateGroupMutation,
  useDeleteGroupMutation,
  useEditGroupMutation,
  useGetGroupQuery,
  useGetGroupsQuery,
} = groupApi;
