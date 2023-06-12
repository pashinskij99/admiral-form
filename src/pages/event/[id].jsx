import { instanceAxios } from "src/config/instanceAxios"
import { inputsRequiredMockArray } from "src/views/event/inputRequiredMock"
import EventPageView from "../../views/event/EventPageView";
import { useLayoutEffect } from "react";
import { useDispatch } from "react-redux";
import { setAppBarState } from "../../store/apps/appBar";
import { SessionAuth } from "supertokens-auth-react/recipe/session";

export const getServerSideProps = async (ctx) => {
  const { id } = ctx.query
  try {
    const eventResponse = await instanceAxios.get(`/events/${id}`)
    const { data } = eventResponse

    const resultRequiredInput = []

    for (let i = 0; i < Object.entries(data).length; i++) {
      const socialFromBackEnd = Object.entries(data)[i];

      for (let j = 0; j < inputsRequiredMockArray.length; j++) {
        const mockElement = inputsRequiredMockArray[j];
        if (typeof socialFromBackEnd[1] === 'boolean' && socialFromBackEnd[1]) {
          if (socialFromBackEnd[0] === mockElement['dataBaseName']) {
            resultRequiredInput.push(mockElement)
          }
        }
      }
    }

    console.log(data);

    return {
      props: {
        eventId: id,
        inputRequired: resultRequiredInput,
        eventData: data
      }
    }
  } catch (error) {
    return {
      notFound: true,
    }
  }

}

const EventSignInUserPage = ({ eventId, inputRequired, eventData }) => {

  const dispatch = useDispatch()

  useLayoutEffect(() => {
    dispatch(setAppBarState(false))

    return () => {
      dispatch(setAppBarState(true))
    }
  }, [])

  return (
    <EventPageView
      eventId={eventId}
      eventData={eventData}
      inputRequired={inputRequired}
    />
  )
}

export default EventSignInUserPage
