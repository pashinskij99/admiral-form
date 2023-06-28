import { useRouter } from "next/router"
import { useState } from "react"
import { toast } from "react-hot-toast"
import { instanceAxios } from "src/config/instanceAxios"

export const useEditEventForm = ({
  getSocialValues,
  getGeneralValues,
  getSpecificValues,
  currentFormInfo,
  steps
}) => {
  const [dateRange, setDateRange] = useState([
    new Date(currentFormInfo.eventStart),
    new Date(currentFormInfo.eventEnd)
  ])
  const [activeStep, setActiveStep] = useState(0)
  const [startDate, endDate] = dateRange
  const { push } = useRouter()

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1)
  }

  const onSubmit = async () => {
    try {
      setActiveStep(activeStep + 1)
      if (activeStep === steps.length - 1) {
        const finalData = {
          ...getSocialValues(),
          ...getGeneralValues(),
          ...getSpecificValues(),
          price: +getGeneralValues().price,
          eventStart: startDate.toISOString(),
          eventEnd: endDate.toISOString(),
          limitMembers: +getGeneralValues().limitMembers
        }
        instanceAxios.patch(`/events/${currentFormInfo.id}`, finalData)

        toast.success('Congratulations, you have successfully changed the event!')

        setTimeout(() => {
          push('/event/list')
        }, 2000)
      }
    } catch (e) {
      console.log(e.message)
      toast.error('Something went wrong with the request, please try again later!')
    }
  }

  return {
    handleBack,
    onSubmit,
    setDateRange,
    startDate,
    endDate,
    activeStep,
  }
}
