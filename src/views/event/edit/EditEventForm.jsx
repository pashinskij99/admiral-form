// ** React Imports
import { Fragment, forwardRef, useState } from 'react'
import * as yup from 'yup'
import { useRouter } from 'next/router'

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
import toast from 'react-hot-toast'

// ** Icon Imports
import { yupResolver } from '@hookform/resolvers/yup'
import { Step, StepLabel, Stepper, Typography } from '@mui/material'
import { Box } from '@mui/system'
import StepperWrapper from 'src/@core/styles/mui/stepper'
import { formatDate } from 'src/@core/utils/formatDate'
import StepperCustomDot from 'src/views/forms/form-wizard/StepperCustomDot'
import axios from 'axios'
import {instanceAxios} from "../../../config/instanceAxios";

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

const CustomInput = forwardRef(({ ...props }, ref) => {
  return <CustomTextField fullWidth inputRef={ref} {...props} sx={{ width: '100%' }} />
})

const EditEventForm = ({ currentFormInfo }) => {
  const { push } = useRouter()
  const date = new Date()
  const tomorrowDate = formatDate(date.setDate(date.getDate() + 1))
  const after5Days = formatDate(date.setDate(date.getDate() + 5))

  const [dateRange, setDateRange] = useState([
    new Date(currentFormInfo.eventStart),
    new Date(currentFormInfo.eventEnd)
  ])
  const [startDate, endDate] = dateRange

  const defaultGeneralValues = {
    ...currentFormInfo,
    eventEndSignIn: new Date(currentFormInfo.eventEndSignIn),
    price: currentFormInfo.price || 0,
    limitMembers: currentFormInfo.limitMembers || 0
  }

  const generalSchema = yup.object().shape({
    name: yup.string(),
    description: yup.string(),
    price: yup.string(),
    limitMembers: yup.string(),
  })

  const defaultSpecificValues = {
    nameRequired: true,
    surnameRequired: true,
    emailRequired: currentFormInfo.emailRequired,
    telephoneRequired: currentFormInfo.telephoneRequired,
    numberInvites: false,
    numberPeople: false,
    numberTickets: false,
  }

  const specificSchema = yup.object().shape({
    nameRequired: yup.boolean(),
    surnameRequired: yup.boolean(),
    emailRequired: yup.boolean(),
    telephoneRequired: yup.boolean(),
    numberInvites: yup.boolean(),
    numberTickets: yup.boolean(),
    numberPeople: yup.boolean(),
  })

  const defaultSocialValues = {
    telegramRequired: currentFormInfo.telegramRequired,
    viberRequired: currentFormInfo.viberRequired,
    whatsappRequired: currentFormInfo.whatsappRequired,
    instagramRequired: currentFormInfo.instagramRequired,
    facebookRequired: currentFormInfo.facebookRequired,
    twitterRequired: currentFormInfo.twitterRequired,
  }

  const socialSchema = yup.object().shape({
    telegramRequired: yup.boolean(),
    viberRequired: yup.boolean(),
    whatsappRequired: yup.boolean(),
    instagramRequired: yup.boolean(),
    facebookRequired: yup.boolean(),
    twitterRequired: yup.boolean(),
  })

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

  const [activeStep, setActiveStep] = useState(0)

  // Handle Stepper
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
          ...getSpecificValues()
        }
        instanceAxios.patch(`/events/${currentFormInfo.id}`, finalData)

        toast.success('Form Submitted')

        setTimeout(() => {
          push('/event/list')
        }, 2000)
      }
    } catch (e) {
      console.log(e.message)
      toast.error('Form is not submitted!')
    }
  }

  const getStepContent = step => {
    switch (step) {
      case 0:
        return (
          <form key={0} onSubmit={handleGeneralSubmit(onSubmit)}>

            <Grid container spacing={5}>
              <Grid item xs={12}>
                <Typography variant='body2' sx={{ fontWeight: 600, color: 'text.primary' }}>
                  {steps[activeStep].title}
                </Typography>
                <Typography variant='caption' component='p'>
                  {steps[activeStep].subtitle}
                </Typography>
              </Grid>

              <Grid item xs={12} sm={12}>
                <Controller
                  name='name'
                  control={generalControl}
                  defaultValue={currentFormInfo.name}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      fullWidth
                      value={value}
                      label='Event Name*'
                      onChange={onChange}
                      placeholder='Event name'
                      error={Boolean(generalErrors.name)}
                      aria-describedby='validation-basic-first-name'
                      {...(generalErrors.name && { helperText: 'This field is required' })}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12}>
                <Controller
                  name='description'
                  control={generalControl}
                  render={({ field: {value, onChange} }) => (
                    <CustomTextField
                      rows={4}
                      fullWidth
                      placeholder='Event description'
                      multiline
                      value={value}
                      onChange={onChange}
                      label='Event Description*'
                      error={Boolean(generalErrors.description)}
                      aria-describedby='validation-basic-textarea'
                      {...(generalErrors.description && { helperText: 'This field is required' })}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Controller
                  name='rangeDate'
                  control={generalControl}
                  render={({ field: { value, onChange } }) => (
                    <DatePicker
                      selectsRange={true}
                      selected={startDate}
                      showYearDropdown
                      showMonthDropdown
                      startDate={startDate}
                      endDate={endDate}
                      onChange={(e) => {
                        setDateRange(e)
                        onChange(e)
                      }}
                      placeholderText={tomorrowDate + '-' + after5Days}
                      customInput={
                        <CustomInput
                          label='Range Date*'
                          error={Boolean(generalErrors.rangeDate)}
                          aria-describedby='validation-basic-dob'
                          {...(generalErrors.rangeDate && { helperText: 'This field is required' })}
                        />
                      }
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Controller
                  name='eventEndSignIn'
                  control={generalControl}
                  render={({ field: { value, onChange } }) => (
                    <DatePicker
                      selected={value}
                      showYearDropdown
                      showMonthDropdown
                      selectsEnd
                      onChange={e => onChange(e)}
                      placeholderText={tomorrowDate}
                      customInput={
                        <CustomInput
                          value={value}
                          onChange={onChange}
                          label='Close Sign In*'
                          error={Boolean(generalErrors.eventEndSignIn)}
                          aria-describedby='validation-basic-dob'
                          {...(generalErrors.eventEndSignIn && { helperText: 'This field is required' })}
                        />
                      }
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Controller
                  name='price'
                  control={generalControl}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      fullWidth
                      value={value}
                      label='Price'
                      onChange={onChange}
                      placeholder='100'
                      aria-describedby='validation-basic-first-name'

                    // {...(errors.price && { helperText: 'This field is required' })}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Controller
                  name='limitMembers'
                  control={generalControl}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      fullWidth
                      value={value}
                      label='Limit Users'
                      onChange={onChange}
                      placeholder='250'
                      aria-describedby='validation-basic-first-name'

                    // {...(errors.price && { helperText: 'This field is required' })}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button variant='tonal' color='secondary' disabled>
                  Back
                </Button>
                <Button type='submit' variant='contained'>
                  Next
                </Button>
              </Grid>

            </Grid>
          </form>
        )
      case 1:
        return (
          <form key={1} onSubmit={handleSpecificSubmit(onSubmit)}>
            <Grid container spacing={5}>
              <Grid item xs={12}>
                <Typography variant='body2' sx={{ fontWeight: 600, color: 'text.primary' }}>
                  {steps[1].title}
                </Typography>
                <Typography variant='caption' component='p'>
                  {steps[1].subtitle}
                </Typography>
              </Grid>
              <Grid display={'flex'} mt={'5px'} flexDirection={'column'} item xs={12} sm={6}>
                <Typography variant='body2' sx={{ fontWeight: 600, color: 'text.primary' }}>
                  User fields:
                </Typography>
                <Controller
                  name='nameRequired'
                  control={specificControl}
                  render={({ field: { value, onChange } }) => (
                    <FormControlLabel label='Name*' control={<Checkbox checked={value} value={value} onChange={(e) => onChange(e.target.checked)} />} />
                  )}
                />
                <Controller
                  name='surnameRequired'
                  control={specificControl}
                  render={({ field: { value, onChange } }) => (
                    <FormControlLabel label='Last Name*' control={<Checkbox checked={value} value={value} onChange={(e) => onChange(e.target.checked)}  />} />
                  )}
                />
                <Controller
                  name='emailRequired'
                  control={specificControl}
                  render={({ field: { value, onChange } }) => (
                    <FormControlLabel label='Email' control={<Checkbox checked={value} value={value} onChange={(e) => onChange(e.target.checked)}  />} />
                  )}
                />
                <Controller
                  name='telephoneRequired'
                  control={specificControl}
                  render={({ field: { value, onChange } }) => (
                    <FormControlLabel label='Telephone number' control={<Checkbox checked={value} value={value} onChange={(e) => onChange(e.target.checked)}  />} />
                  )}
                />

              </Grid>

              <Grid display={'flex'} mt={'5px'} flexDirection={'column'} item xs={12} sm={6}>
                <Typography variant='body2' sx={{ fontWeight: 600, color: 'text.primary' }}>
                  Number of:
                </Typography>

                <Controller
                  name='numberInvites'
                  control={specificControl}
                  rules={{ required: false }}
                  render={({ field: { value, onChange } }) => (
                    <FormControlLabel label='Number of invites' control={<Checkbox checked={value} value={value} onChange={(e) => onChange(e.target.checked)}  />} />
                  )}
                />
                <Controller
                  name='numberTickets'
                  control={specificControl}
                  rules={{ required: false }}
                  render={({ field: { value, onChange } }) => (
                    <FormControlLabel label='Number of tickets' control={<Checkbox checked={value} value={value} onChange={(e) => onChange(e.target.checked)}  />} />
                  )}
                />
                <Controller
                  name='numberPeople'
                  control={specificControl}
                  rules={{ required: false }}
                  render={({ field: { value, onChange } }) => (
                    <FormControlLabel label='Number of people' control={<Checkbox checked={value} value={value} onChange={(e) => onChange(e.target.checked)}  />} />
                  )}
                />
              </Grid>

              <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button variant='tonal' color='secondary' onClick={handleBack}>
                  Back
                </Button>
                <Button type='submit' variant='contained'>
                  Next
                </Button>
              </Grid>
            </Grid>
          </form>
        )
      case 2:
        return (
          <form key={2} onSubmit={handleSocialSubmit(onSubmit)}>
            <Grid container spacing={5}>
              <Grid item xs={12}>
                <Typography variant='body2' sx={{ fontWeight: 600, color: 'text.primary' }}>
                  {steps[2].title}
                </Typography>
                <Typography variant='caption' component='p'>
                  {steps[2].subtitle}
                </Typography>
              </Grid>

              <Grid display={'flex'} mt={'5px'} flexDirection={'column'} item xs={12} sm={6}>
                <Typography variant='body2' sx={{ fontWeight: 600, color: 'text.primary' }}>
                  Messengers:
                </Typography>

                <Controller
                  name='telegramRequired'
                  control={socialControl}
                  render={({ field: { value, onChange } }) => (
                    <FormControlLabel label='Telegram' control={<Checkbox checked={value} value={value} onChange={(e) => onChange(e.target.checked)}  />} />
                  )}
                />
                <Controller
                  name='viberRequired'
                  control={socialControl}

                  render={({ field: { value, onChange } }) => (
                    <FormControlLabel label='Viber' control={<Checkbox checked={value} value={value} onChange={(e) => onChange(e.target.checked)}  />} />
                  )}
                />
                <Controller
                  name='whatsappRequired'
                  control={socialControl}
                  rules={{ required: false }}
                  render={({ field: { value, onChange } }) => (
                    <FormControlLabel label='Whatsapp' control={<Checkbox checked={value} value={value} onChange={(e) => onChange(e.target.checked)}  />} />
                  )}
                />
              </Grid>

              <Grid display={'flex'} mt={'5px'} flexDirection={'column'} item xs={12} sm={6}>
                <Typography variant='body2' sx={{ fontWeight: 600, color: 'text.primary' }}>
                  Social Media:
                </Typography>

                <Controller
                  name='instagramRequired'
                  control={socialControl}
                  rules={{ required: false }}
                  render={({ field: { value, onChange } }) => (
                    <FormControlLabel label='Instagram' control={<Checkbox checked={value} value={value} onChange={(e) => onChange(e.target.checked)}  />} />
                  )}
                />
                <Controller
                  name='facebookRequired'
                  control={socialControl}
                  rules={{ required: false }}
                  render={({ field: { value, onChange } }) => (
                    <FormControlLabel label='Facebook' control={<Checkbox checked={value} value={value} onChange={(e) => onChange(e.target.checked)}  />} />
                  )}
                />
                <Controller
                  name='twitterRequired'
                  control={socialControl}
                  rules={{ required: false }}
                  render={({ field: { value, onChange } }) => (
                    <FormControlLabel label='Twitter' control={<Checkbox checked={value} value={value} onChange={(e) => onChange(e.target.checked)}  />} />
                  )}
                />
              </Grid>

              <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button variant='tonal' color='secondary' onClick={handleBack}>
                  Back
                </Button>
                <Button type='submit' variant='contained'>
                  Submit
                </Button>
              </Grid>
            </Grid>
          </form>
        )
      default:
        return null
    }
  }

  const renderContent = () => {
    if (activeStep === steps.length) {
      return (
        <Fragment>
          <Typography>All steps are completed! You will be redirected to a page with a list of events.</Typography>
        </Fragment>
      )
    } else {
      return getStepContent(activeStep)
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
