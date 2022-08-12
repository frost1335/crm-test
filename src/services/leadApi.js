import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../constants";

export const leadApi = createApi({
  reducerPath: "leadApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    credentials: "include",
  }),
  tagTypes: ["Lead"],
  endpoints: (builder) => ({
    getLeads: builder.query({
      query: () => ({
        url: "/api/leads",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          "Content-Type": "application/json",
        },
      }),
      providesTags: ["Lead"],
    }),
    getLeadList: builder.query({
      query: () => ({
        url: `/api/leads/get_list`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          "Content-Type": "application/json",
        },
      }),
      providesTags: ["Lead"],
    }),
    createLead: builder.mutation({
      query: (student) => ({
        url: `/api/leads/add_lead`,
        method: "POST",
        body: student,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["Lead"],
    }),
    editLead: builder.mutation({
      query: (lead) => ({
        url: "/api/leads/update_lead",
        method: "PUT",
        body: lead,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["Lead"],
    }),
    deleteLead: builder.mutation({
      query: (id) => ({
        url: `/api/leads/delete_lead/${id}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["Lead"],
    }),
  }),
});

export const {
  useGetLeadsQuery,
  useGetLeadListQuery,
  useCreateLeadMutation,
  useDeleteLeadMutation,
  useEditLeadMutation,
} = leadApi;
