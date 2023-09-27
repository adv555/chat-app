import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_URL }),
  reducerPath: 'main',
  tagTypes: [],
  endpoints: (builder) => ({
    postAiText: builder.mutation({
      query: (payload) => ({
        url: 'openai/text',
        method: 'POST',
        body: payload,
      }),
    }),
    postAiCode: builder.mutation({
      query: (payload) => ({
        url: 'openai/code',
        method: 'POST',
        body: payload,
      }),
    }),
    postAiAssist: builder.mutation({
      query: (payload) => ({
        url: 'openai/assist',
        method: 'POST',
        body: payload,
      }),
    }),
  }),
});

export const {
  usePostAiTextMutation,
  usePostAiCodeMutation,
  usePostAiAssistMutation,
} = api;
