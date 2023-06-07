import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {baseDataBaseUrl} from "../../../config/baseDataBaseUrl";

export const eventsListRTKApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: baseDataBaseUrl }),
  tagTypes: ['Events'],
  endpoints: (builder) => ({
    getEventsListCurrent: builder.query({
      query: (eventData) => `/users/${eventData.userId}/events/active?page=${eventData.page}&limit=${eventData.limit}`,
      providesTags: ['Events']
    }),
    getEventsListPast: builder.query({
      query: (eventData) => `/users/${eventData.userId}/events/expired?page=${eventData.page}&limit=${eventData.limit}`,
      providesTags: ['Events']
    }),
    getEventMembersList: builder.query({
      query: (eventData) =>
        `/events/${eventData.eventId}/members?page=${eventData.page}&limit=${eventData.limit}`,
    }),
    removeEvent: builder.mutation({
      query: (eventId) => ({
        url: `/events/${eventId}`,
        method: 'DELETE',
    }),
      invalidatesTags: ['Events']
    }),
  })
})

export const {
  useGetEventsListCurrentQuery,
  useGetEventsListPastQuery,
  useGetEventMembersListQuery,
  useRemoveEventMutation
} = eventsListRTKApi
