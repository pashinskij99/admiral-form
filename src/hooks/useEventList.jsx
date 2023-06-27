import {useEffect, useState} from "react";
import {instanceAxios} from "../config/instanceAxios";

export const useEventList = (userId) => {
  const [eventList, setEventList] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  // useEffect(async () => {
  //   try {
  //     const resultEventsFetch = await fetchEvents(userId, 1, 10)

  //     // console.log(resultEventsFetch)

  //   } catch (e) {

  //   }
  // }, [])

}

const fetchEvents = async (userId, page, limit) => {
  const eventListResponse = await instanceAxios.get(`/users/${userId}/events?page=${page}&limit=${limit}`)
  const {data: {data}} = await eventListResponse

  return data
}
