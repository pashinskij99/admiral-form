// ** MUI Imports
import { Typography } from '@mui/material'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import Grid from '@mui/material/Grid'

// ** Custom Component Import
import CustomTextField from 'src/@core/components/mui/text-field'

// ** Third Party Imports
import { forwardRef } from 'react'
import DatePicker from 'react-datepicker'
import { Controller } from 'react-hook-form'

// ** Icon Imports
export const getStepContent = ({
  steps,
  step,
  activeStep,
  handleGeneralSubmit,
  handleSpecificSubmit,
  handleSocialSubmit,
  generalControl,
  onSubmit,
  generalErrors,
  startDate,
  endDate,
  tomorrowDate,
  setDateRange,
  specificControl,
  socialControl,
  handleBack,
  after5Days
}) => {
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
                rules={{ required: true }}
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
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
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
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <DatePicker
                    selectsRange={true}
                    selected={startDate}
                    showYearDropdown
                    showMonthDropdown
                    startDate={startDate}
                    endDate={endDate}
                    onChange={e => {
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
                        label='Close Sign In'
                        aria-describedby='validation-basic-dob'
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
                rules={{ required: false }}
                render={({ field: { value, onChange } }) => (
                  <CustomTextField
                    fullWidth
                    value={value}
                    label='Price'
                    onChange={onChange}
                    placeholder='100'
                    aria-describedby='validation-basic-first-name'
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Controller
                name='limitMembers'
                control={generalControl}
                rules={{ required: false }}
                render={({ field: { value, onChange } }) => (
                  <CustomTextField
                    fullWidth
                    value={value}
                    label='Limit Users'
                    onChange={onChange}
                    placeholder='250'
                    aria-describedby='validation-basic-first-name'
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
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <FormControlLabel
                    label='Name*'
                    control={<Checkbox checked={value} value={value} onChange={e => onChange(e.target.checked)} />}
                  />
                )}
              />
              <Controller
                name='surnameRequired'
                control={specificControl}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <FormControlLabel
                    label='Last Name*'
                    control={<Checkbox checked={value} value={value} onChange={e => onChange(e.target.checked)} />}
                  />
                )}
              />
              <Controller
                name='emailRequired'
                control={specificControl}
                rules={{ required: false }}
                render={({ field: { value, onChange } }) => (
                  <FormControlLabel
                    label='Email'
                    control={<Checkbox checked={value} value={value} onChange={e => onChange(e.target.checked)} />}
                  />
                )}
              />
              <Controller
                name='telephoneRequired'
                control={specificControl}
                rules={{ required: false }}
                render={({ field: { value, onChange } }) => (
                  <FormControlLabel
                    label='Telephone number'
                    control={<Checkbox checked={value} value={value} onChange={e => onChange(e.target.checked)} />}
                  />
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
                  <FormControlLabel
                    label='Number of invites'
                    control={<Checkbox checked={value} value={value} onChange={e => onChange(e.target.checked)} />}
                  />
                )}
              />
              <Controller
                name='numberTickets'
                control={specificControl}
                rules={{ required: false }}
                render={({ field: { value, onChange } }) => (
                  <FormControlLabel
                    label='Number of tickets'
                    control={<Checkbox checked={value} value={value} onChange={e => onChange(e.target.checked)} />}
                  />
                )}
              />
              <Controller
                name='numberPeople'
                control={specificControl}
                rules={{ required: false }}
                render={({ field: { value, onChange } }) => (
                  <FormControlLabel
                    label='Number of people'
                    control={<Checkbox checked={value} value={value} onChange={e => onChange(e.target.checked)} />}
                  />
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
                rules={{ required: false }}
                render={({ field: { value, onChange } }) => (
                  <FormControlLabel
                    label='Telegram'
                    control={<Checkbox checked={value} value={value} onChange={e => onChange(e.target.checked)} />}
                  />
                )}
              />
              <Controller
                name='viberRequired'
                control={socialControl}
                rules={{ required: false }}
                render={({ field: { value, onChange } }) => (
                  <FormControlLabel
                    label='Viber'
                    control={<Checkbox checked={value} value={value} onChange={e => onChange(e.target.checked)} />}
                  />
                )}
              />
              <Controller
                name='whatsappRequired'
                control={socialControl}
                rules={{ required: false }}
                render={({ field: { value, onChange } }) => (
                  <FormControlLabel
                    label='Whatsapp'
                    control={<Checkbox checked={value} value={value} onChange={e => onChange(e.target.checked)} />}
                  />
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
                  <FormControlLabel
                    label='Instagram'
                    control={<Checkbox checked={value} value={value} onChange={e => onChange(e.target.checked)} />}
                  />
                )}
              />
              <Controller
                name='facebookRequired'
                control={socialControl}
                rules={{ required: false }}
                render={({ field: { value, onChange } }) => (
                  <FormControlLabel
                    label='Facebook'
                    control={<Checkbox checked={value} value={value} onChange={e => onChange(e.target.checked)} />}
                  />
                )}
              />
              <Controller
                name='twitterRequired'
                control={socialControl}
                rules={{ required: false }}
                render={({ field: { value, onChange } }) => (
                  <FormControlLabel
                    label='Twitter'
                    control={<Checkbox checked={value} value={value} onChange={e => onChange(e.target.checked)} />}
                  />
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

const CustomInput = forwardRef(({ ...props }, ref) => {
  return <CustomTextField fullWidth inputRef={ref} {...props} sx={{ width: '100%' }} />
})