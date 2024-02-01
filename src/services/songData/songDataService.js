import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query";

export const songDataApi = createApi({
  reducerPath: "uploadSong",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://127.0.0.1:8000/",
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.userToken;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
        return headers;
      }
    },
  }),
  endpoints: (builder) => ({
    createSong: builder.mutation({
      query: ({ title, lyrics_chords }) => ({
        url: "save_lyrics_and_chords2",
        method: "POST",
        body: {
          title,
          lyrics_chords,
        },
      }),
    }),
  }),
});

export const { useCreateSongMutation } = authApi;
