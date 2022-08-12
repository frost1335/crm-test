import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../constants";

export const studentApi = createApi({
  reducerPath: "studentApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    credentials: "include",
  }),
  tagTypes: ["Student"],
  endpoints: (builder) => ({
    getStudents: builder.query({
      query: () => ({
        url: "/api/students",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          "Content-Type": "application/json",
        },
      }),
      providesTags: ["Student"],
    }),
    getStudent: builder.query({
      query: (id) => ({
        url: `/api/students/${id}`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          "Content-Type": "application/json",
        },
      }),
      providesTags: ["Student"],
    }),
    createStudent: builder.mutation({
      query: (student) => ({
        url: `/api/students/add`,
        method: "POST",
        body: student,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["Student"],
    }),
    editStudent: builder.mutation({
      query: (student) => ({
        url: `/api/students/edit/${student._id}`,
        method: "PUT",
        body: student.student,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["Student"],
    }),
    deleteStudent: builder.mutation({
      query: (id) => ({
        url: `/api/students/delete/${id}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["Student"],
    }),
    // payment requests
    createPayment: builder.mutation({
      query: (payment) => ({
        url: `/api/payments/pay`,
        method: "POST",
        body: payment,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["Student"],
    }),
    getAttandance: builder.query({
      query: (id) => ({
        url: `/api/attendance/${id}`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          "Content-Type": "application/json",
        },
      }),
      providesTags: ["Student"],
    }),
    editAttendance: builder.mutation({
      query: (attandance) => ({
        url: `/api/attendance/${attandance._id}`,
        method: "PUT",
        body: attandance,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["Student"],
    }),
  }),
});

export const {
  useGetStudentsQuery,
  useGetStudentQuery,
  useCreateStudentMutation,
  useDeleteStudentMutation,
  useEditStudentMutation,
  useCreatePaymentMutation,
} = studentApi;
