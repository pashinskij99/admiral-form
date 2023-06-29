import { useRouter } from "next/router"
import { useState } from "react"
import { toast } from "react-hot-toast"
import { instanceAxios } from "src/config/instanceAxios"
import { useAuthSuperToken } from "src/hooks/useAuth"

export const useBasicEventForm = ({
  getSocialValues,
  getGeneralValues,
  getSpecificValues,
  startDate,
  endDate,
  userId,
  steps
}) => {
  const [loading, setLoading] = useState(false)
  const [responseError, setResponseError] = useState(false)
  const [activeStep, setActiveStep] = useState(0)
  const [createdEventId, setCreatedEventId] = useState('')
  const auth = useAuthSuperToken()
  const { push } = useRouter()

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1)
  }

  const handleNext = () => {
    push(`/event/statistics/${createdEventId}`)
  }

  const onSubmit = () => {
    try {
      setActiveStep(activeStep + 1)
      if (activeStep === steps.length - 1) {
        setLoading(true)

        const finalData = {
          ...getSocialValues(),
          ...getGeneralValues(),
          ...getSpecificValues(),
          price: +getGeneralValues().price,
          eventStart: startDate.toISOString(),
          eventEnd: endDate.toISOString(),
          limitMembers: +getGeneralValues().limitMembers
        }

        if (!auth.user) {
          localStorage.setItem('newEvent', JSON.stringify(finalData))
          setLoading(false)
        } else {
          instanceAxios
            .post(`/users/${userId}/events`, finalData)
            .then(res => {
              toast.success('Congratulations, you have successfully created an event!')
              setCreatedEventId(res?.data?.id)
              setResponseError('')
            })
            .catch(error => {
              if (error.response) {
                console.log(error.response.data)
                console.log(error.response.status)
                console.log(error.response.headers)
              } else if (error.request) {
                console.log(error.request)
              } else {
                console.log('Error', error.message)
              }
              console.log(error.config)
              setResponseError('something went wrong with the request, please try again later')
            })
            .finally(() => {
              setLoading(false)
            })
        }
      }
    } catch (e) {
      console.log(e.message)
      toast.error('Something went wrong with the request, please try again later!')
    }
  }

  return {
    loading,
    activeStep,
    createdEventId,
    auth,
    handleBack,
    handleNext,
    onSubmit,
    responseError,
    setActiveStep,
    setResponseError
  }
}

