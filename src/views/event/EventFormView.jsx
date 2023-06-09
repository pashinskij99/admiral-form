// ** React Imports
import { LoadingButton } from '@mui/lab'
import { useState } from 'react'

// ** MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'

// ** Custom Component Import
import CustomTextField from 'src/@core/components/mui/text-field'

// ** Third Party Imports
import { Controller, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

// ** Icon Imports
import { Box, Typography } from '@mui/material'
import Icon from 'src/@core/components/icon'
import { instanceAxios } from 'src/config/instanceAxios'

const EventFormView = ({eventId, inputRequired, handleClose}) => {
  // ** Hooks
  const {
    control,
    handleSubmit,
    formState: {errors}
  } = useForm()

  const [loading, setLoading] = useState(false)

  const onSubmit = (data) => {
    setLoading(true)

    instanceAxios.post(`/events/${eventId}/members`, data)
      .then((res) => {
        console.log(res)
        toast.success('Form Submitted')
      })
      .catch((error) => {
        console.log(error)
        toast.error('Form is not submitted')
      }).finally(() => {
        setLoading(false)
        handleClose()
      })
  }

  return (
    <Card id={'sign-in'}>
      <CardHeader
        component={() => {
          return (
            <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'} px={'24px'} pt={'24px'}>
              <Typography variant='h4'>Sign up for the event</Typography>
              <IconButton onClick={handleClose} sx={{':hover': {background: 'none'} }}>
                <Icon icon='iconamoon:close-bold' style={{fontSize: '30px', color: 'rgba(47, 43, 61, 0.78)'}}/>
              </IconButton>
            </Box>
          )
        }}
      />
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={5}>
            <Grid item xs={12}>
              <Controller
                name='name'
                control={control}
                rules={{required: true}}
                render={({field: {value, onChange}}) => (
                  <CustomTextField
                    fullWidth
                    value={value}
                    label='Name'
                    onChange={onChange}
                    placeholder='Name'
                    error={Boolean(errors.name)}
                    {...(errors.name && {helperText: 'This field is required'})}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name='surname'
                control={control}
                rules={{required: true}}
                render={({field: {value, onChange}}) => (
                  <CustomTextField
                    fullWidth
                    value={value}
                    label='Surname'
                    onChange={onChange}
                    placeholder='Surname'
                    error={Boolean(errors.surname)}
                    {...(errors.surname && {helperText: 'This field is required'})}
                  />
                )}
              />
            </Grid>

            {
              inputRequired.map(({
                                   id, name, type, label, placeholder, helperText
                                 }) => (
                <Grid key={id} item xs={12}>
                  <Controller
                    name={name}
                    control={control}
                    render={({field: {value, onChange}}) => (
                      <CustomTextField
                        fullWidth
                        type={type}
                        value={value}
                        label={label}
                        onChange={onChange}
                        placeholder={placeholder}
                      />
                    )}
                  />
                  {helperText && <Typography variant='caption'>{helperText}</Typography>}
                </Grid>
              ))
            }

            <Grid item xs={12} textAlign={'right'}>
              <LoadingButton loading={loading} type='submit' variant='contained'>
                Register
              </LoadingButton>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  )
}

export default EventFormView
