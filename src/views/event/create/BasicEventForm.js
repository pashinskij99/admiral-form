// ** React Imports
import { Fragment, useState } from 'react'

// ** MUI Imports
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Icon from 'src/@core/components/icon'

// ** Custom Component Import
import CustomTextField from 'src/@core/components/mui/text-field'

// ** Third Party Imports
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

// ** Icon Imports
import styled from '@emotion/styled'
import { yupResolver } from '@hookform/resolvers/yup'
import { IconButton, LinearProgress, Step, StepLabel, Stepper, Tooltip, Typography } from '@mui/material'
import { Box } from '@mui/system'
import Link from 'next/link'
import StepperWrapper from 'src/@core/styles/mui/stepper'
import { formatDate } from 'src/@core/utils/formatDate'
import StepperCustomDot from 'src/views/forms/form-wizard/StepperCustomDot'
import { redirectToAuth } from 'supertokens-auth-react'
import {
  defaultGeneralValues,
  defaultSocialValues,
  defaultSpecificValues,
  generalSchema,
  socialSchema,
  specificSchema
} from './schemaAndValues'
import { getStepContent } from './stepContent'
import { useBasicEventForm } from './useBasicEventForm'

const steps = [
  {
    title: 'General Information',
    subtitle: 'Enter your Event Details'
  },
  {
    title: 'Specific Information',
    subtitle: 'Select specific options'
  },
  {
    title: 'Social Links',
    subtitle: 'Add Social Links'
  }
]

const BasicEventForm = ({ userId }) => {
  const date = new Date()
  const tomorrowDate = formatDate(date.setDate(date.getDate() + 1))
  const after5Days = formatDate(date.setDate(date.getDate() + 5))
  const [dateRange, setDateRange] = useState([null, null])
  const [startDate, endDate] = dateRange

  // ** Hooks
  const {
    getValues: getGeneralValues,
    reset: generalReset,
    control: generalControl,
    handleSubmit: handleGeneralSubmit,
    formState: { errors: generalErrors }
  } = useForm({
    defaultValues: defaultGeneralValues,
    resolver: yupResolver(generalSchema)
  })

  const {
    getValues: getSpecificValues,
    reset: specificReset,
    control: specificControl,
    handleSubmit: handleSpecificSubmit,
    formState: { errors: specificErrors }
  } = useForm({
    defaultValues: defaultSpecificValues,
    resolver: yupResolver(specificSchema)
  })

  const {
    getValues: getSocialValues,
    reset: socialReset,
    control: socialControl,
    handleSubmit: handleSocialSubmit,
    formState: { errors: socialErrors }
  } = useForm({
    defaultValues: defaultSocialValues,
    resolver: yupResolver(socialSchema)
  })

  const {
    activeStep,
    auth,
    createdEventId,
    handleBack,
    handleNext,
    loading,
    onSubmit,
    responseError,
    setActiveStep,
    setResponseError
  } = useBasicEventForm({
    getSocialValues,
    getGeneralValues,
    getSpecificValues,
    startDate,
    endDate,
    userId,
    steps
  })

  const linkInputValue = `${process.env.WEBSITE_DOMAIN}/event/${createdEventId}`

  const handleCopy = () => {
    navigator.clipboard
      .writeText(linkInputValue)
      .then(() => {
        toast.success('The link is copied', {
          position: 'bottom-right'
        })
      })
      .catch(e => {
        console.log(e.message)
        toast.error('The link is not copied', {
          position: 'bottom-right'
        })
      })
  }

  const handleRedirectToSign = show => {
    redirectToAuth({ show })
  }

  const handleAgain = () => {
    socialReset()
    generalReset()
    specificReset()
    setResponseError('')
    setActiveStep(0)
    setDateRange([null, null])
  }

  const renderContent = (activeStep) => {
    if (responseError) {
      return (
        <Fragment>
          <Typography>All steps are completed, but {responseError}</Typography>
          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end', gap: 3 }}>
            <Button variant='contained' onClick={handleAgain}>Try again</Button>
          </Box>
        </Fragment>
      )
    } else {
      if (activeStep === steps.length) {
        if (auth.user) {
          return (
            <Fragment>
              <Typography>
                All steps are completed!
                <br />
                We have generated a link to your event that you can share.
              </Typography>

              {loading ? (
                <LinearProgress sx={{ mt: 4 }} />
              ) : (
                <Box sx={{ mt: 4 }} position={'relative'}>
                  <StyledInputLink fullWidth value={linkInputValue} disabled />
                  <Link href={`/event/statistics/${createdEventId}`} target='_blank'>
                    <Tooltip title='Statistics' placement='top'>
                      <StyledIconButton
                        sx={{ position: 'absolute', right: 35, top: 0, color: 'rgba(47, 43, 61, 0.7)' }}
                      >
                        <Icon icon='majesticons:open' />
                      </StyledIconButton>
                    </Tooltip>
                  </Link>

                  <Tooltip title='Copy' placement='top'>
                    <StyledIconButton
                      onClick={handleCopy}
                      sx={{ position: 'absolute', right: 2, top: 0, color: 'rgba(47, 43, 61, 0.7)' }}
                    >
                      <Icon icon='octicon:copy-16' />
                    </StyledIconButton>
                  </Tooltip>
                </Box>
              )}

              <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end', gap: 3 }}>
                <Button variant='contained' onClick={handleNext}>
                  Next
                </Button>
              </Box>
            </Fragment>
          )
        } else {
          return (
            <Fragment>
              <Typography>
                All steps are completed!
                <br />
                Next, you need to log in or register
              </Typography>

              <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end', gap: 3 }}>
                <Button variant='contained' onClick={() => handleRedirectToSign('signin')}>
                  Login
                </Button>
                <Button variant='contained' onClick={() => handleRedirectToSign('signup')}>
                  Sign Up
                </Button>
              </Box>
            </Fragment>
          )
        }
      } else {
        return getStepContent({
          steps,
          step: activeStep,
          activeStep,
          startDate,
          endDate,
          tomorrowDate,
          after5Days,
          setDateRange,
          handleGeneralSubmit,
          handleSpecificSubmit,
          handleSocialSubmit,
          generalControl,
          specificControl,
          socialControl,
          handleBack,
          onSubmit,
          generalErrors
        })
      }
    }
  }

  return (
    <>
      <StepperWrapper my={'20px'}>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((step, index) => {
            return (
              <Step key={index}>
                <StepLabel StepIconComponent={StepperCustomDot}>
                  <div className='step-label'>
                    <div>
                      <Typography className='step-title'>{step.title}</Typography>
                      <Typography className='step-subtitle'>{step.subtitle}</Typography>
                    </div>
                  </div>
                </StepLabel>
              </Step>
            )
          })}
        </Stepper>
      </StepperWrapper>

      <Card style={{ height: 'auto' }}>
        <CardContent>{renderContent(activeStep)}</CardContent>
      </Card>
    </>
  )
}

const StyledInputLink = styled(CustomTextField)`
  input:disabled {
    -webkit-text-fill-color: rgba(47, 43, 61, 0.7);
  }
`

const StyledIconButton = styled(IconButton)`
  &:hover {
    background-color: transparent;
  }
`

export default BasicEventForm
