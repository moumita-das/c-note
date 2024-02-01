import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://127.0.0.1:8000/",
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.userToken;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
        return headers;
      }
    },
  }),
  endpoints: (builder) => ({
    getUserDetails: builder.query({
      query: () => ({
        url: "fetch_user_details",
        method: "GET",
      }),
      transformResponse: (response, meta, arg) => response,
      transformErrorResponse: (response, meta, arg) => response.detail,
    }),
  }),
});

export const { useGetUserDetailsQuery } = authApi;
