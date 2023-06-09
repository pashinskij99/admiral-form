// ** React Imports
import { Fragment, forwardRef } from 'react'

// ** MUI Imports
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import Grid from '@mui/material/Grid'

// ** Custom Component Import
import CustomTextField from 'src/@core/components/mui/text-field'

// ** Third Party Imports
import DatePicker from 'react-datepicker'
import { Controller, useForm } from 'react-hook-form'

// ** Icon Imports
import { yupResolver } from '@hookform/resolvers/yup'
import { Step, StepLabel, Stepper, Typography } from '@mui/material'
import StepperWrapper from 'src/@core/styles/mui/stepper'
import { formatDate } from 'src/@core/utils/formatDate'
import StepperCustomDot from 'src/views/forms/form-wizard/StepperCustomDot'
import { generalSchema, getDefaultValues, socialSchema, specificSchema } from './shemaAndValues'
import { useEditEventForm } from './useEditEventForm'
import { getStepContent } from './stepContent'

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

const EditEventForm = ({ currentFormInfo }) => {
  const date = new Date()
  const tomorrowDate = formatDate(date.setDate(date.getDate() + 1))
  const after5Days = formatDate(date.setDate(date.getDate() + 5))

  const { defaultGeneralValues, defaultSocialValues, defaultSpecificValues } = getDefaultValues({currentFormInfo})

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
    endDate,
    handleBack,
    onSubmit,
    setDateRange,
    startDate
  } = useEditEventForm({
    currentFormInfo,
    getGeneralValues,
    getSocialValues,
    getSpecificValues,
    steps
  })

  const renderContent = () => {
    if (activeStep === steps.length) {
      return (
        <Fragment>
          <Typography>All steps are completed! You will be redirected to a page with a list of events.</Typography>
        </Fragment>
      )
    } else {
      return getStepContent({
        activeStep,
        endDate,
        generalControl,
        handleGeneralSubmit,
        handleSocialSubmit,
        handleSpecificSubmit,
        onSubmit,
        socialControl,
        specificControl,
        startDate,
        step: activeStep,
        steps,
        currentFormInfo,
        after5Days,
        tomorrowDate,
        setDateRange,
        handleBack,
      })
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

      <Card style={{height: 'auto'}}>
        <CardContent>
          {renderContent()}
        </CardContent>
      </Card>
    </>
  )
}



export default EditEventForm
